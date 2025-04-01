'use client';

import type React from 'react';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/lib/react-query/keys';
import { CategoryService } from '@/services/categories.service';
import { toast } from '@/lib/toast';
interface FilterSidebarProps {
    filters: {
        maritalStatus: string | undefined;
        categories: string[] | undefined;
        gender: string | undefined;
    };
    onFilterChange: (filterName: string, value: any) => void;
}

export default function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
    const [showAllNationalities, setShowAllNationalities] = useState(false);
    const [expandedSections, setExpandedSections] = useState({
        maritalStatus: true,
        categories: true,
        gender: true,
    });
    const { data: primaryCategoryData } = useQuery({
        queryKey: [queryKey.categoriesPrimary],
        queryFn: async ({ queryKey }) => {
            try {
                const temp = await CategoryService.getPrimaryCategories({ options: queryKey[1], take: 20 });
                return temp?.data;
            } catch {
                toast.error('Oops! Something went wrong');
                return [];
            }
        },
    });
    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections({
            ...expandedSections,
            [section]: !expandedSections[section],
        });
    };

    const handleRadioChange = (filterName: string, value: string) => {
        onFilterChange(filterName, value);
    };

    const handleCheckboxChange = (filterName: string, value: string, checked: boolean) => {
        const currentValues = Array.isArray(filters.categories) ? [...filters.categories] : [];
        if (checked) {
            onFilterChange('categories', [...currentValues, value]);
        } else {
            onFilterChange(
                'categories',
                currentValues.filter((item) => item !== value)
            );
        }
    };

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <div
                    className="flex justify-between items-center cursor-pointer mb-4"
                    onClick={() => toggleSection('gender')}
                >
                    <span>Gender</span>
                    {expandedSections.gender ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
                {expandedSections.gender && (
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <input
                                id="Male"
                                type="radio"
                                name="gender"
                                value="MALE"
                                checked={filters.gender === 'MALE'}
                                onChange={() => handleRadioChange('gender', 'MALE')}
                                className="h-4 w-4 border-[1.5px] border-[#DADDE5] text-blue-600 focus:ring-[#DADDE5] bg-white checked:bg-blue-600 checked:border-blue-600"
                            />

                            <label htmlFor="Male" className="ml-2 text-sm">
                                Male
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="Female"
                                type="radio"
                                name="gender"
                                value="FEMALE"
                                checked={filters.gender === 'FEMALE'}
                                onChange={() => handleRadioChange('gender', 'FEMALE')}
                                className="h-4 w-4 border-[1.5px] border-[#DADDE5] text-blue-600 focus:ring-[#DADDE5] bg-white checked:bg-blue-600 checked:border-blue-600"
                            />

                            <label htmlFor="Female" className="ml-2 text-sm">
                                Female
                            </label>
                        </div>
                    </div>
                )}
            </div>

            <div className="border-b pb-4">
                <div
                    className="flex justify-between items-center cursor-pointer mb-4"
                    onClick={() => toggleSection('maritalStatus')}
                >
                    <span className="font-medium">Marital Status</span>
                    {expandedSections.maritalStatus ? (
                        <ChevronUp className="h-4 w-4" />
                    ) : (
                        <ChevronDown className="h-4 w-4" />
                    )}
                </div>
                {expandedSections.maritalStatus && (
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <input
                                id="ALONE"
                                type="radio"
                                name="maritalStatus"
                                value="ALONE"
                                checked={filters.maritalStatus === 'ALONE'}
                                onChange={() => handleRadioChange('maritalStatus', 'ALONE')}
                                className="h-4 w-4 border-[1.5px] border-[#DADDE5] text-blue-600 focus:ring-[#DADDE5] bg-white checked:bg-blue-600 checked:border-blue-600"
                            />
                            <label htmlFor="ALONE" className="ml-2 text-sm">
                                Alone
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="MARRIED"
                                type="radio"
                                name="maritalStatus"
                                value="MARRIED"
                                checked={filters.maritalStatus === 'MARRIED'}
                                onChange={() => handleRadioChange('maritalStatus', 'MARRIED')}
                                className="h-4 w-4 border-[1.5px] border-[#DADDE5] text-blue-600 focus:ring-[#DADDE5] bg-white checked:bg-blue-600 checked:border-blue-600"
                            />
                            <label htmlFor="MARRIED" className="ml-2 text-sm">
                                Married
                            </label>
                        </div>
                    </div>
                )}
            </div>

            <div className="border-b pb-4">
                <div
                    className="flex justify-between items-center cursor-pointer mb-4"
                    onClick={() => toggleSection('categories')}
                >
                    <span>Nationality</span>
                    {expandedSections.categories ? (
                        <ChevronUp className="h-4 w-4" />
                    ) : (
                        <ChevronDown className="h-4 w-4" />
                    )}
                </div>
                {expandedSections.categories && (
                    <div className="space-y-2">
                        {Array.isArray(primaryCategoryData) &&
                            primaryCategoryData?.slice(0, showAllNationalities ? undefined : 5).map((category: any) => (
                                <div key={category.categoryId} className="flex items-center">
                                    <input
                                        id={`categories_${category.categoryId}`}
                                        type="checkbox"
                                        value={category?.categoryId}
                                        checked={
                                            Array.isArray(filters.categories) &&
                                            filters.categories.includes(category.categoryId)
                                        }
                                        onChange={(e) =>
                                            handleCheckboxChange('categories', category.categoryId, e.target.checked)
                                        }
                                        className="h-4 w-4 border-[1.5px] border-[#DADDE5] text-blue-600 focus:ring-[#DADDE5] bg-white checked:bg-blue-600 checked:border-blue-600"
                                    />
                                    <label htmlFor={`categories_${category.id}`} className="ml-2 text-sm">
                                        {category?.categoryName}
                                    </label>
                                </div>
                            ))}

                        {Array.isArray(primaryCategoryData) && primaryCategoryData.length > 5 && (
                            <button
                                type="button"
                                onClick={() => setShowAllNationalities(!showAllNationalities)}
                                className="text-blue-600 text-sm mt-2 focus:outline-none"
                            >
                                {showAllNationalities ? 'Show Less' : 'Show More...'}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
