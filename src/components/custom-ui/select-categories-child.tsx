import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Categories } from '@/types';
import clsx from 'clsx';
import { useDebounce } from '@/hooks/useDebounce';
import { CategoryService } from '@/services/categories.service';
import { queryKey } from '@/lib/react-query/keys';

interface MultiSelectSearchInputProps {
    categoryId: string;
    onChange: (selectedItems: string[]) => void;
    error?: string;
    defaultValue?: Categories[];
}

enum OrderType {
    ASC = 'ASC',
    DESC = 'DESC',
}

const MultiSelectCategoriesChildSearchInput: React.FC<MultiSelectSearchInputProps> = ({
    onChange,
    error,
    categoryId,
    defaultValue = [],
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItems, setSelectedItems] = useState<{ categoriesId: string; name: string }[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { data: options, isLoading } = useQuery({
        queryKey: [queryKey.categoriesChild, debouncedSearchTerm, categoryId],
        queryFn: async () => {
            const searchValue = (debouncedSearchTerm ?? '').trim();
            const id = categoryId;
            const data = {
                name: searchValue,
                order: OrderType.ASC,
                page: 1,
                take: 5,
                options: '',
            };
            return await CategoryService.getCategoriesChildren(id, data);
        },
        enabled: showDropdown && !!categoryId,
        staleTime: 1000 * 60,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (defaultValue.length > 0 && selectedItems.length === 0) {
            const initialItems = defaultValue.map((category) => ({
                categoriesId: category.categoryId,
                name: category.categoryName,
            }));
            setSelectedItems(initialItems);
            onChange(initialItems.map((i) => i.categoriesId));
        }
    }, [defaultValue, onChange]);

    const handleSelect = (item: Categories) => {
        if (!selectedItems.find((i) => i.categoriesId === item.categoryId)) {
            const updatedItems = [...selectedItems, { categoriesId: item.categoryId, name: item.categoryName }];
            setSelectedItems(updatedItems);
            onChange(updatedItems.map((i) => i.categoriesId));
        }
        setShowDropdown(false);
        setSearchTerm('');
    };

    const handleRemove = (categoriesID: string) => {
        const updatedItems = selectedItems.filter((i) => i.categoriesId !== categoriesID);
        setSelectedItems(updatedItems);
        onChange(updatedItems.map((i) => i.categoriesId));
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
        if (e.key === 'Escape') setShowDropdown(false);
        if (e.key === 'Backspace' && searchTerm === '' && selectedItems.length > 0) {
            const lastItem = selectedItems[selectedItems.length - 1];
            handleRemove(lastItem.categoriesId);
        }
    };

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <div
                className={clsx(
                    'flex items-center gap-1 border-2 rounded-md p-2 bg-white h-12 overflow-hidden',
                    error
                        ? 'border-2 border-danger ring-danger'
                        : 'focus-within:border-primary focus-within:ring-primary'
                )}
            >
                <div className="flex items-center gap-1 overflow-hidden flex-nowrap max-w-full">
                    {selectedItems.map((item) => (
                        <div
                            key={item.categoriesId}
                            className="flex items-center bg-gray-100 px-2 py-1 rounded-md text-sm"
                        >
                            <span className="mr-1 truncate max-w-[100px]">{item.name}</span>
                            <button
                                type="button"
                                className="text-black-500 ml-1"
                                onClick={() => handleRemove(item.categoriesId)}
                            >
                                x
                            </button>
                        </div>
                    ))}
                </div>
                <input
                    className="flex-1 border-none outline-none min-w-0 truncate"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setShowDropdown(true)}
                    onKeyDown={handleKeyDown}
                />
            </div>

            {showDropdown && (
                <Card
                    className="absolute z-10 w-full mt-1 max-h-60 overflow-auto shadow-lg rounded-sm"
                    id="search-dropdown"
                    role="listbox"
                >
                    <CardContent className="p-1">
                        {!categoryId ? (
                            <p className="p-2 text-gray-500 text-sm">Please select a Job Category first.</p>
                        ) : isLoading ? (
                            <p>Loading...</p>
                        ) : options && options?.data && options?.data?.length > 0 ? (
                            options.data.map((option) => (
                                <div
                                    key={option.categoryId}
                                    className="p-2 flex items-center justify-between cursor-pointer hover:bg-gray-50 hover:animate-in rounded-sm transition-all"
                                    onClick={() => handleSelect(option)}
                                    role="option"
                                    aria-selected={selectedItems.some((i) => i.categoriesId === option.categoryId)}
                                >
                                    <span>{option.categoryName}</span>
                                    {selectedItems.some((i) => i.categoriesId === option.categoryId) && (
                                        <Check className="w-4 h-4" />
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

export default MultiSelectCategoriesChildSearchInput;
