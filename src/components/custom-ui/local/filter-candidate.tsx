'use client';

import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery } from '@tanstack/react-query';
import { CategoryService } from '@/services';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export type FilterValuesSidebar = {
    maritalStatus: string;
    categories: string[];
    gender: string;
};

type Props = {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    filters: FilterValuesSidebar;
    onApplyFilters: (filters: FilterValuesSidebar) => void;
};

export const defaultFiltersSidebar: FilterValuesSidebar = {
    maritalStatus: 'all',
    categories: [],
    gender: 'all',
};

const filterConfig = {
    maritalStatus: {
        label: 'Marital Status',
        name: 'maritalStatus',
        defaultValue: 'all',
        options: [
            { label: 'All statuses', value: 'all' },
            { label: 'Alone', value: 'ALONE' },
            { label: 'Married', value: 'MARRIED' },
        ],
    },
    gender: {
        label: 'Gender',
        name: 'gender',
        defaultValue: 'all',
        options: [
            { label: 'All genders', value: 'all' },
            { label: 'Male', value: 'MALE' },
            { label: 'Female', value: 'FEMALE' },
        ],
    },
};

export default function FilterSidebarCandidate({ onOpenChange, open, filters, onApplyFilters }: Props) {
    const [tempFilters, setTempFilters] = useState<FilterValuesSidebar>(filters);

    const { data: primaryCategoryData, isLoading: isLoadingCategories } = useQuery({
        queryKey: ['categoriesPrimary'],
        queryFn: async () => {
            try {
                const temp = await CategoryService.getPrimaryCategories({ take: 20 });
                return temp?.data || [];
            } catch {
                toast.error('Oops! Something went wrong');
                return [];
            }
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    // Reset filters to default
    const resetFilters = () => {
        setTempFilters({ ...defaultFiltersSidebar });
    };

    // Handle filter change for single-select fields
    const handleFilterChange = (name: keyof FilterValuesSidebar, value: string | string[]) => {
        setTempFilters((prev) => ({ ...prev, [name]: value }));
    };

    // Handle category checkbox-like selection (multi-select)
    const handleCategoryChange = (value: string) => {
        const currentCategories = Array.isArray(tempFilters.categories) ? [...tempFilters.categories] : [];
        if (value === 'all') {
            // If "All categories" is selected, clear the categories array
            handleFilterChange('categories', []);
        } else if (currentCategories.includes(value)) {
            // If category is already selected, remove it
            handleFilterChange(
                'categories',
                currentCategories.filter((cat) => cat !== value)
            );
        } else {
            // If category is not selected, add it
            handleFilterChange('categories', [...currentCategories, value]);
        }
    };

    const applyFilters = () => {
        onApplyFilters(tempFilters);
        if (onOpenChange) {
            onOpenChange(false);
        }
    };

    // Sync tempFilters with filters prop
    useEffect(() => {
        setTempFilters(filters);
    }, [filters]);

    const getSelectedCategoriesLabel = () => {
        if (isLoadingCategories) return 'Loading categories...';
        if (!tempFilters.categories || tempFilters.categories.length === 0) return 'All categories';
        return tempFilters.categories
            .map((catId) => primaryCategoryData?.find((cat) => cat.categoryId === catId)?.categoryName || catId)
            .join(', ');
    };

    return (
        <Sheet onOpenChange={onOpenChange} open={open}>
            <SheetContent side="left">
                <SheetHeader className="mb-6">
                    <SheetTitle>Filter Sidebar</SheetTitle>
                    <SheetDescription>
                        Filter your listings by marital status, categories, and gender. Apply filters to see matching
                        results.
                    </SheetDescription>
                </SheetHeader>
                <div className="space-y-4">
                    {/* Marital Status Filter */}
                    <FilterSelectSidebar
                        config={filterConfig.maritalStatus}
                        value={tempFilters.maritalStatus}
                        onChange={(value) => handleFilterChange('maritalStatus', value)}
                    />

                    {/* Gender Filter */}
                    <FilterSelectSidebar
                        config={filterConfig.gender}
                        value={tempFilters.gender}
                        onChange={(value) => handleFilterChange('gender', value)}
                    />

                    {/* Categories Filter (Multi-select with "All" option) */}
                    <div>
                        <label className="text-sm font-light">Categories</label>
                        <Select
                            name="categories"
                            value={undefined} // Multi-select doesn't use a single value
                            onValueChange={handleCategoryChange}
                        >
                            <SelectTrigger className="h-12 rounded-sm border border-primary-100 focus:border-primary focus:ring-1 focus:ring-primary">
                                {/* Directly render the label to ensure it updates */}
                                <span className="text-sm">{getSelectedCategoriesLabel()}</span>
                            </SelectTrigger>
                            <SelectContent>
                                {/* Add "All categories" option */}
                                <SelectItem value="all">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={tempFilters.categories.length === 0}
                                            readOnly
                                            className="mr-2"
                                        />
                                        All categories
                                    </div>
                                </SelectItem>
                                {primaryCategoryData?.map((category: any) => (
                                    <SelectItem key={category.categoryId} value={category.categoryId}>
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={tempFilters.categories.includes(category.categoryId)}
                                                readOnly
                                                className="mr-2"
                                            />
                                            {category.categoryName}
                                        </div>
                                    </SelectItem>
                                ))}
                                {isLoadingCategories && (
                                    <SelectItem value="loading" disabled>
                                        Loading categories...
                                    </SelectItem>
                                )}
                                {!isLoadingCategories && primaryCategoryData?.length === 0 && (
                                    <SelectItem value="none" disabled>
                                        No categories found
                                    </SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <SheetFooter className="mt-6 flex-col sm:flex-row gap-2">
                    <Button variant="outline" onClick={resetFilters} className="w-full sm:w-auto">
                        Reset Filters
                    </Button>
                    <Button
                        size="lg"
                        onClick={applyFilters}
                        disabled={isLoadingCategories}
                        className="w-full sm:w-auto"
                    >
                        Apply Filters
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

// Reusable Filter Select Component
export const FilterSelectSidebar = ({
    config,
    value,
    onChange,
}: {
    config: typeof filterConfig.maritalStatus;
    value: string;
    onChange: (value: string) => void;
}) => (
    <div>
        <label className="text-sm font-light">{config.label}</label>
        <Select name={config.name} value={value} onValueChange={onChange}>
            <SelectTrigger className="h-12 rounded-sm border border-primary-100 focus:border-primary focus:ring-1 focus:ring-primary">
                <SelectValue className="text-sm" />
            </SelectTrigger>
            <SelectContent>
                {config.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
);
