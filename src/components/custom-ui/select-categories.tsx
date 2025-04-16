import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useDebounce } from '@/hooks/useDebounce';
import { CategoryService } from '@/services/categories.service';

interface MultiSelectSearchInputProps {
    onChange: (selectedItems: Categories[]) => void;
    error?: string;
    defaultValue?: string[] | Categories[];
    disabled?: boolean;
}

export interface Categories {
    isActive: any;
    categoryId: string;
    categoryName: string;
    parent?: any;
}

enum OrderType {
    ASC = 'ASC',
    DESC = 'DESC',
}

const queryKey = {
    categoriesPrimary: 'categories-primary',
};

const MultiSelectCategoriesSearchInput: React.FC<MultiSelectSearchInputProps> = ({
    onChange,
    error,
    defaultValue = [],
    disabled = false,
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItems, setSelectedItems] = useState<Categories[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState<'top' | 'bottom'>('bottom');
    const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dropdownCardRef = useRef<HTMLDivElement>(null);
    const isInitialized = useRef(false);

    const { data: options, isLoading } = useQuery({
        queryKey: [queryKey.categoriesPrimary, debouncedSearchTerm],
        queryFn: async () => {
            const searchValue = (debouncedSearchTerm ?? '').trim();
            const data = {
                name: searchValue,
                order: OrderType.ASC,
                page: 1,
                take: 10,
                options: '',
            };
            return await CategoryService.getPrimaryCategories(data);
        },
        enabled: (showDropdown || (!!defaultValue && defaultValue.length > 0)) && !disabled,
        staleTime: 1000 * 60,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (defaultValue && defaultValue.length > 0 && !isInitialized.current) {
            let initialItems: Categories[] = [];
            if (typeof defaultValue[0] === 'string') {
                if (options?.data) {
                    initialItems = (defaultValue as string[])
                        .map((id) => {
                            const category = options.data.find((opt: Categories) => opt.categoryId === id);
                            return category ? { categoryId: id, categoryName: category.categoryName } : null;
                        })
                        .filter((item): item is Categories => item !== null);
                }
            } else {
                initialItems = (defaultValue as Categories[]).filter(
                    (category) => category.categoryId && category.categoryName
                );
            }

            if (initialItems.length > 0) {
                setSelectedItems(initialItems);
                onChange(initialItems);
                isInitialized.current = true;
            }
        }
    }, [defaultValue, options, onChange]);

    useEffect(() => {
        if (showDropdown && dropdownRef.current && dropdownCardRef.current) {
            const inputRect = dropdownRef.current.getBoundingClientRect();
            const dropdownRect = dropdownCardRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            const spaceBelow = viewportHeight - inputRect.bottom;
            const spaceAbove = inputRect.top;

            const dropdownHeight = Math.min(dropdownRect.height, 240);

            if (spaceBelow >= dropdownHeight || spaceBelow >= spaceAbove) {
                setDropdownPosition('bottom');
                if (spaceBelow < dropdownHeight) {
                    dropdownCardRef.current.style.maxHeight = `${spaceBelow - 8}px`;
                }
            } else {
                setDropdownPosition('top');
                if (spaceAbove < dropdownHeight) {
                    dropdownCardRef.current.style.maxHeight = `${spaceAbove - 8}px`;
                }
            }
        }
    }, [showDropdown]);

    const handleSelect = (item: Categories) => {
        if (!disabled && !selectedItems.find((i) => i.categoryId === item.categoryId)) {
            const updatedItems = [...selectedItems, item];
            setSelectedItems(updatedItems);
            onChange(updatedItems);
        }
        setShowDropdown(false);
        setSearchTerm('');
    };

    const handleRemove = (categoryId: string) => {
        if (!disabled) {
            const updatedItems = selectedItems.filter((i) => i.categoryId !== categoryId);
            console.log('Removing item:', categoryId, 'Updated items:', updatedItems);
            setSelectedItems(updatedItems);
            onChange(updatedItems);
        }
    };

    const handleClickOutside = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (disabled) return;
        if (e.key === 'Escape') setShowDropdown(false);
        if (e.key === 'Backspace' && searchTerm === '' && selectedItems.length > 0) {
            const lastItem = selectedItems[selectedItems.length - 1];
            handleRemove(lastItem.categoryId);
        }
    };

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <div
                className={clsx(
                    'flex items-center gap-1 border-2 rounded-md p-2 bg-white h-12 overflow-hidden',
                    error
                        ? 'border-1 border-danger ring-danger'
                        : disabled
                          ? 'border-gray-50'
                          : 'focus-within:border-primary focus-within:ring-primary'
                )}
            >
                <div className="flex items-center gap-1 overflow-hidden flex-nowrap max-w-full">
                    {selectedItems.map((item) => (
                        <div
                            key={item.categoryId}
                            className="flex items-center bg-gray-100 px-2 py-1 rounded-md text-sm"
                        >
                            <span className="mr-1 truncate max-w-[100px]">{item.categoryName}</span>
                            {!disabled && (
                                <button
                                    type="button"
                                    className="text-black-500 ml-1"
                                    onClick={() => handleRemove(item.categoryId)}
                                >
                                    ×
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                <input
                    className={clsx(
                        'flex-1 border-none outline-none min-w-0 truncate',
                        disabled && 'cursor-not-allowed'
                    )}
                    value={searchTerm}
                    onChange={(e) => !disabled && setSearchTerm(e.target.value)}
                    onFocus={() => !disabled && setShowDropdown(true)}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                />
            </div>

            {showDropdown && !disabled && (
                <Card
                    className={clsx(
                        'absolute z-10 w-full overflow-auto shadow-lg rounded-sm',
                        dropdownPosition === 'top' ? 'bottom-full mb-1' : 'top-full mt-1'
                    )}
                    id="search-dropdown"
                    role="listbox"
                    ref={dropdownCardRef}
                >
                    <CardContent className="p-1">
                        {isLoading ? (
                            <div className="p-2 flex justify-center">
                                <Loader2 className="animate-spin" />
                            </div>
                        ) : options?.data && options.data.length > 0 ? (
                            options.data.map((option: Categories) => (
                                <div
                                    key={option.categoryId}
                                    className="p-2 flex items-center justify-between cursor-pointer hover:bg-gray-50 hover:animate-in rounded-sm transition-all"
                                    onClick={() => handleSelect(option)}
                                    role="option"
                                    aria-selected={selectedItems.some((i) => i.categoryId === option.categoryId)}
                                >
                                    <span>{option.categoryName}</span>
                                    {selectedItems.some((i) => i.categoryId === option.categoryId) && (
                                        <Check className="w-4 h-4 text-primary" />
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="p-2 text-gray-500 text-sm">No categories found</p>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
};
export default MultiSelectCategoriesSearchInput;
