import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Tag } from '@/types';
import clsx from 'clsx';
import { TagService } from '@/services/tag.service';
import { useDebounce } from '@/hooks/useDebounce';
import { queryKey } from '@/lib/react-query/keys';

interface MultiSelectSearchInputProps {
    onChange: (selectedItems: string[]) => void;
    error?: string;
    defaultValue?: Tag[];
}

enum OrderType {
    ASC = 'ASC',
    DESC = 'DESC',
}

const MultiSelectSearchInput: React.FC<MultiSelectSearchInputProps> = ({ onChange, error, defaultValue = [] }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItems, setSelectedItems] = useState<{ tagId: string; name: string }[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const debouncedSearchTerm = useDebounce(searchTerm, 300);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const isInitialized = useRef(false);

    const { data: options = [], isLoading } = useQuery({
        queryKey: [queryKey.tagList, debouncedSearchTerm],
        queryFn: async () => {
            const searchValue = (debouncedSearchTerm ?? '').trim();
            const data = {
                name: searchValue,
                order: OrderType.ASC,
                page: 1,
                take: 5,
                options: '',
            };
            return await TagService.searchTag(data);
        },
        enabled: showDropdown,
        staleTime: 1000 * 60,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (!isInitialized.current && defaultValue.length > 0) {
            const initialItems = defaultValue.map((tag) => ({
                tagId: tag.tagId,
                name: tag.name,
            }));
            setSelectedItems(initialItems);
            onChange(initialItems.map((i) => i.tagId));
            isInitialized.current = true;
        }
    }, [defaultValue, onChange]);

    const handleSelect = (item: Tag) => {
        if (selectedItems.length >= 3) return;

        if (!selectedItems.find((i) => i.tagId === item.tagId)) {
            const updatedItems = [...selectedItems, { tagId: item.tagId, name: item.name }];
            setSelectedItems(updatedItems);
            onChange(updatedItems.map((i) => i.tagId));
        }
        setShowDropdown(false);
        setSearchTerm('');
    };

    const handleRemove = (tagId: string) => {
        const updatedItems = selectedItems.filter((i) => i.tagId !== tagId);
        setSelectedItems(updatedItems);
        onChange(updatedItems.map((i) => i.tagId));
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
            handleRemove(lastItem.tagId);
        }
    };

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <div
                className={clsx(
                    'flex h-12 w-full flex-wrap items-center gap-2 rounded-md border bg-white p-2 shadow-sm transition-all',
                    error
                        ? 'border-2 border-danger ring-danger'
                        : 'focus-within:border-primary focus-within:ring-1 focus-within:ring-primary'
                )}
            >
                {selectedItems.map((item) => (
                    <div
                        key={item.tagId}
                        className="flex max-w-[120px] items-center truncate rounded-md bg-gray-100 px-2 py-1 text-sm"
                        title={item.name}
                    >
                        <span className="mr-2 truncate">{item.name}</span>
                        <button
                            type="button"
                            className="flex h-4 w-4 items-center justify-center text-gray-500 hover:text-gray-700"
                            onClick={() => handleRemove(item.tagId)}
                        >
                            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    className="min-w-[100px] flex-1 border-none bg-transparent text-sm outline-none sm:min-w-[120px]"
                    placeholder={selectedItems.length === 0 ? 'Select tags...' : ''}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setShowDropdown(true)}
                    onKeyDown={handleKeyDown}
                />
            </div>

            {showDropdown && (
                <Card
                    className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg"
                    id="search-dropdown"
                    role="listbox"
                >
                    <CardContent className="p-1">
                        {isLoading ? (
                            <p className="p-2 text-sm text-gray-500">Loading...</p>
                        ) : options.length > 0 ? (
                            options.map((option) => (
                                <div
                                    key={option.tagId}
                                    className="flex cursor-pointer items-center justify-between rounded-sm p-2 transition-all hover:bg-gray-100"
                                    onClick={() => handleSelect(option)}
                                    role="option"
                                    aria-selected={selectedItems.some((i) => i.tagId === option.tagId)}
                                >
                                    <span className="truncate">{option.name}</span>
                                    {selectedItems.some((i) => i.tagId === option.tagId) && (
                                        <Check className="h-4 w-4 text-primary" />
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="p-2 text-sm text-gray-500">No tags found</p>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default MultiSelectSearchInput;
