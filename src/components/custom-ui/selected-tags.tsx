import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Tag } from '@/types';
import clsx from 'clsx';
import { TagService } from '@/services/tag.service';
import { useDebounce } from '@/hooks/useDebounce';

interface MultiSelectSearchInputProps {
    onChange: (selectedItems: string[]) => void;
    error?: string;
}
enum OrderType {
    ASC = 'ASC',
    DESC = 'DESC',
}

const MultiSelectSearchInput: React.FC<MultiSelectSearchInputProps> = ({ onChange, error }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItems, setSelectedItems] = useState<{ tagId: string; name: string }[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { data: options = [], isLoading } = useQuery({
        queryKey: ['searchTags', debouncedSearchTerm],
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
        enabled: showDropdown, // Kích hoạt request khi dropdown được hiển thị
        staleTime: 1000 * 60,
        refetchOnWindowFocus: false,
    });

    const handleSelect = (item: Tag) => {
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
        if (e.key === 'Escape') setShowDropdown(false);
        if (e.key === 'Backspace' && searchTerm === '' && selectedItems.length > 0) {
            const lastItem = selectedItems[selectedItems.length - 1];
            handleRemove(lastItem.tagId);
        }
    };

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <div
                className={clsx(
                    'flex items-center flex-wrap gap-1 border-2 rounded-md p-2 bg-white h-12',
                    error
                        ? 'border-2 border-danger ring-danger'
                        : ' focus-within:border-primary focus-within:ring-primary'
                )}
            >
                {selectedItems.map((item) => (
                    <div key={item.tagId} className="flex items-center bg-gray-100 px-2 py-1 rounded-md text-sm">
                        <span className="mr-1 truncate max-w-[100px]">{item.name}</span>
                        <button type="button" className="text-black-500 ml-1" onClick={() => handleRemove(item.tagId)}>
                            x
                        </button>
                    </div>
                ))}
                <input
                    className="flex-1 border-none outline-none min-w-[200px] "
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setShowDropdown(true)} // Hiển thị dropdown khi input được focus
                    onKeyDown={handleKeyDown}
                    aria-expanded={showDropdown}
                    aria-controls="search-dropdown"
                    aria-haspopup="listbox"
                />
            </div>

            {showDropdown && (
                <Card
                    className="absolute z-10 w-full mt-1 max-h-60 overflow-auto shadow-lg rounded-sm"
                    id="search-dropdown"
                    role="listbox"
                >
                    <CardContent className="p-1">
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : options.length > 0 ? (
                            options.map((option) => (
                                <div
                                    key={option.tagId}
                                    className="p-2 flex items-center justify-between cursor-pointer hover:bg-gray-50 hover:animate-in rounded-sm transition-all"
                                    onClick={() => handleSelect(option)}
                                    role="option"
                                    aria-selected={selectedItems.some((i) => i.tagId === option.tagId)}
                                >
                                    <span>{option.name}</span>
                                    {selectedItems.some((i) => i.tagId === option.tagId) && (
                                        <Check className="w-4 h-4" />
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="p-2 text-gray-500 text-sm">No tags found</p>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default MultiSelectSearchInput;
