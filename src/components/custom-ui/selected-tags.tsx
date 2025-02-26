import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { TagService } from '@/services/tag.service';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce'; // Thêm debounce
import { Tag } from '@/types';

interface MultiSelectSearchInputProps {
    onChange: (selectedItems: string[]) => void; // Chuyển từ string thành string[]
}

const MultiSelectSearchInput: React.FC<MultiSelectSearchInputProps> = ({ onChange }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItems, setSelectedItems] = useState<{ tagId: string; name: string }[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { data: options = [], isLoading } = useQuery({
        queryKey: ['searchTags', debouncedSearchTerm],
        queryFn: async () => {
            if (debouncedSearchTerm.trim()) {
                return await TagService.searchTag(debouncedSearchTerm);
            }
            return [];
        },
        enabled: !!debouncedSearchTerm,
        staleTime: 1000 * 60,
        refetchOnWindowFocus: false,
    });

    const handleSelect = (item: Tag) => {
        if (!selectedItems.find((i) => i.tagId === item.tagId)) {
            const updatedItems = [...selectedItems, { tagId: item.tagId, name: item.name }];
            setSelectedItems(updatedItems);
            onChange(updatedItems.map((i) => i.tagId)); // Trả về mảng ID cho `onChange`
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
    };

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <div className="flex items-center flex-wrap gap-1 border rounded-md p-2 bg-white focus-within:ring-2 ring-primary-500 h-12">
                {selectedItems.map((item) => (
                    <div key={item.tagId} className="flex items-center bg-gray-100 px-2 py-1 rounded-md text-sm">
                        <span className="mr-1 truncate max-w-[100px]">{item.name}</span>
                        <button type="button" className="text-black-500 ml-1" onClick={() => handleRemove(item.tagId)}>
                            x
                        </button>
                    </div>
                ))}
                <input
                    className="flex-1 border-none outline-none min-w-[200px]"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setShowDropdown(true)}
                    onKeyDown={handleKeyDown}
                    aria-expanded={showDropdown}
                    aria-controls="search-dropdown"
                    aria-haspopup="listbox"
                />
            </div>

            {showDropdown && options.length > 0 && (
                <Card
                    className="absolute z-10 w-full mt-1 max-h-60 overflow-auto shadow-lg"
                    id="search-dropdown"
                    role="listbox"
                >
                    <CardContent>
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            options.map((option) => (
                                <div
                                    key={option.tagId}
                                    className="p-2 flex items-center justify-between cursor-pointer hover:bg-gray-100 hover:rounded-2xl hover:m-1"
                                    onClick={() => handleSelect(option)}
                                    role="option"
                                    aria-selected={selectedItems.some((i) => i.tagId === option.tagId)}
                                >
                                    <span>{option.name}</span>
                                    {selectedItems.some((i) => i.tagId === option.tagId) && (
                                        <Check className="w-4 h-4 " />
                                    )}
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default MultiSelectSearchInput;
