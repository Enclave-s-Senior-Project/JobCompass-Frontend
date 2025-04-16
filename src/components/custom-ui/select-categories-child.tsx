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
    const isFirstRender = useRef(true);
    const [selectedItems, setSelectedItems] = useState<{ categoriesId: string; name: string }[]>(
        defaultValue.map((category) => ({
            categoriesId: category.categoryId,
            name: category.categoryName,
        }))
    );
    const [showDropdown, setShowDropdown] = useState(false);
    const debouncedSearchTerm = useDebounce(searchTerm, 300);
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
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        setSelectedItems([]);
    }, [categoryId]);

    useEffect(() => {
        setSearchTerm('');
        setShowDropdown(false);
    }, [categoryId]);

    const handleSelect = (item: Categories) => {
        if (selectedItems.length >= 3) return;
        if (!selectedItems.find((i) => i.categoriesId === item.categoryId)) {
            const updatedItems = [...selectedItems, { categoriesId: item.categoryId, name: item.categoryName }];
            setSelectedItems(updatedItems);
            onChange(updatedItems.map((i) => i.categoriesId));
        }
        setShowDropdown(false);
        setSearchTerm('');
    };

    const handleRemove = (categoriesId: string) => {
        const updatedItems = selectedItems.filter((i) => i.categoriesId !== categoriesId);
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
        if (e.key === 'Escape') {
            setShowDropdown(false);
        }
        if (e.key === 'Backspace' && searchTerm === '' && selectedItems.length > 0) {
            const lastItem = selectedItems[selectedItems.length - 1];
            handleRemove(lastItem.categoriesId);
        }
    };

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <div
                className={clsx(
                    'flex items-center flex-wrap gap-2 border shadow-sm rounded-md p-2 bg-white h-12 transition-all w-full',
                    error
                        ? 'border-2 border-danger ring-danger'
                        : 'focus-within:border-primary focus-within:ring-1 focus-within:ring-primary'
                )}
            >
                {selectedItems.map((item) => (
                    <div
                        key={item.categoriesId}
                        className="flex items-center bg-gray-100 px-2 py-1 rounded-md text-sm max-w-[120px] truncate"
                        title={item.name}
                    >
                        <span className="mr-2 truncate">{item.name}</span>
                        <button
                            type="button"
                            className="text-gray-500 hover:text-gray-700 w-4 h-4 flex items-center justify-center"
                            onClick={() => handleRemove(item.categoriesId)}
                        >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                ))}
                <input
                    className="flex-1 border-none outline-none min-w-[100px] sm:min-w-[120px] bg-transparent text-sm"
                    placeholder={selectedItems.length === 0 ? 'Select categories...' : ''}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setShowDropdown(true)}
                    onKeyDown={handleKeyDown}
                />
            </div>

            {showDropdown && (
                <Card
                    className="absolute z-10 w-full mt-1 max-h-60 overflow-auto shadow-lg rounded-md bg-white"
                    id="search-dropdown"
                    role="listbox"
                >
                    <CardContent className="p-1">
                        {!categoryId ? (
                            <p className="p-2 text-gray-500 text-sm">Please select a Job Category first.</p>
                        ) : isLoading ? (
                            <p className="p-2 text-gray-500 text-sm">Loading...</p>
                        ) : options && options?.data && options?.data?.length > 0 ? (
                            options.data.map((option) => (
                                <div
                                    key={option.categoryId}
                                    className="p-2 flex items-center justify-between cursor-pointer hover:bg-gray-100 rounded-sm transition-all"
                                    onClick={() => handleSelect(option)}
                                    role="option"
                                    aria-selected={selectedItems.some((i) => i.categoriesId === option.categoryId)}
                                >
                                    <span className="truncate">{option.categoryName}</span>
                                    {selectedItems.some((i) => i.categoriesId === option.categoryId) && (
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

export default MultiSelectCategoriesChildSearchInput;
