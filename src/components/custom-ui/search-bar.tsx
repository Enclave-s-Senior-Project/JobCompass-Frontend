'use client';

import type React from 'react';
import { useState, memo, useEffect, useContext } from 'react';
import { Search, MapPin, BarChartIcon as ChartBarStacked, ChevronRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '../ui/separator';
import { Card } from '../ui/card';
import clsx from 'clsx';
import { queryKey } from '@/lib/react-query/keys';
import { CategoryService } from '@/services/categories.service';
import { useQuery } from '@tanstack/react-query';
import type { Categories, DetailedRequest } from '@/types';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '../ui/sheet';
import { EducationJobLevelEnum, JobTypeEnum } from '@/lib/common-enum';
import { handleErrorToast } from '@/lib/utils';
import { UserContext } from '@/contexts';
import { DropdownMenu, DropdownMenuContent } from '@radix-ui/react-dropdown-menu';
import { DropdownMenuTrigger } from '../ui/dropdown-menu';

interface SearchFormProps {
    filters: DetailedRequest.SearchFilterListJobsCredentials;
    setFilters: React.Dispatch<React.SetStateAction<DetailedRequest.SearchFilterListJobsCredentials>>;
}

const SearchForm = memo(({ filters, setFilters }: SearchFormProps) => {
    const { userInfo } = useContext(UserContext);

    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [showAdvanceDropdown, setShowAdvanceDropdown] = useState(false);
    const [activeParentCategory, setActiveParentCategory] = useState<Categories | null>(null);
    const [localFilters, setLocalFilters] = useState(filters);

    useEffect(() => {
        setLocalFilters(filters);
    }, [filters]);

    const { data: primaryCategoryData } = useQuery({
        queryKey: [queryKey.categoriesPrimary],
        queryFn: async () => {
            try {
                return await CategoryService.getPrimaryCategories({ take: 20 });
            } catch (error) {
                handleErrorToast(error);
            }
        },
    });

    const { data: childrenCategoryData } = useQuery({
        queryKey: [queryKey.categoriesChild, activeParentCategory?.categoryId],
        queryFn: async () => {
            if (!activeParentCategory) return null;
            try {
                return await CategoryService.getCategoriesChildren(activeParentCategory.categoryId, { take: 20 });
            } catch (error) {
                handleErrorToast(error);
            }
        },
        enabled: !!activeParentCategory,
        staleTime: 1000 * 60 * 5,
    });

    const EXPERIENCE_OPTIONS = [
        { id: '0-1', label: '0 - 1 year' },
        { id: '1-2', label: '1 - 2 years' },
        { id: '2-4', label: '2 - 4 years' },
        { id: '4-8', label: '4 - 8 years' },
        { id: '8-10', label: '8 - 10 years' },
        { id: '10+', label: '10+ years' },
    ];

    const SALARY_OPTIONS = [
        { id: '50-1000', label: '$50-$1000' },
        { id: '1000-2000', label: '$1000-$2000' },
        { id: '3000-4000', label: '$3000-$4000' },
        { id: '4000-6000', label: '$4000-$6000' },
        { id: '6000-8000', label: '$6000-$8000' },
        { id: '8000-10000', label: '$8000-$10000' },
        { id: '10000-15000', label: '$10000-$15000' },
        { id: '15000-999999', label: '$15000+' },
    ];

    const JOB_TYPE_OPTIONS = Object.entries(JobTypeEnum);

    const EDUCATION_OPTIONS = Object.entries(EducationJobLevelEnum);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFilters(localFilters);
    };
    const handleParentCategorySelect = (category: any) => {
        setLocalFilters((prev) => ({
            ...prev,
            parentCategoryId: { categoryId: category.categoryId, categoryName: category.categoryName, isActive: true },
            childrenCategoryId: null,
        }));
        setActiveParentCategory(category);
        setShowCategoryDropdown(false);
    };

    const handleChildrenCategorySelect = (category: Categories) => {
        setLocalFilters((prev) => ({
            ...prev,
            parentCategoryId: { categoryId: category.parent?.categoryId, categoryName: category.parent?.categoryName },
            childrenCategoryId: { categoryId: category.categoryId, categoryName: category.categoryName },
        }));
        setShowCategoryDropdown(false);
    };

    const handleExperienceChange = (value: string) => {
        setLocalFilters((prev) => ({ ...prev, experience: value }));
    };

    const handleSalaryChange = (value: string) => {
        setLocalFilters((prev) => ({ ...prev, salary: value }));
    };

    const handleJobTypeChange = (value: string) => {
        setLocalFilters((prev) => {
            const currentJobTypes = [...prev.jobType];
            if (value === 'all') {
                return { ...prev, jobType: [] };
            }
            if (currentJobTypes.includes(value)) {
                return { ...prev, jobType: currentJobTypes.filter((type) => type !== value) };
            }
            return { ...prev, jobType: [...currentJobTypes, value] };
        });
    };

    const handleEducationChange = (value: string) => {
        setLocalFilters((prev) => {
            const currentEducation = [...prev.education];
            if (value === 'all') {
                return { ...prev, education: [] };
            }
            if (currentEducation.includes(value)) {
                return { ...prev, education: currentEducation.filter((edu) => edu !== value) };
            }
            return { ...prev, education: [...currentEducation, value] };
        });
    };

    const handleResetAdvancedFilter = () => {
        setLocalFilters((prev) => ({
            ...prev,
            experience: '',
            salary: '',
            jobType: [],
            education: [],
        }));
    };

    return (
        <div className="w-full bg-[#F1F2F4]">
            <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-[1320px] flex-col p-4 pb-[32px]">
                <div className="mb-4 flex flex-col items-center justify-between md:flex-row">
                    <h1 className="text-[18px]/[28px]">Find Job</h1>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Link href="/">Home</Link>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-gray-900">Find Job</span>
                    </div>
                </div>

                <div className="flex w-full flex-wrap items-center justify-between rounded-sm bg-[#FFFFFF] p-3 md:h-[80px]">
                    <div className="flex flex-1 flex-wrap items-center justify-end sm:justify-between">
                        <div className="flex flex-1 items-center gap-2">
                            <div className="relative flex-1">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                    <Search className="h-4 w-4 text-primary" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Job title, Keyword..."
                                    className="h-[56px] w-full rounded-l-lg border-r border-[#F1F2F4] pl-10 pr-4 text-[16px] leading-[24px] focus:outline-none"
                                    value={localFilters.keyword}
                                    onChange={(e) => setLocalFilters((prev) => ({ ...prev, keyword: e.target.value }))}
                                />
                            </div>
                            <Separator orientation="vertical" className="h-auto" />

                            <div className="relative flex-1">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                    <MapPin className="h-4 w-4 text-primary" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Location"
                                    className="h-[56px] w-full border-r border-[#F1F2F4] pl-10 pr-4 text-[16px] leading-[24px] focus:outline-none"
                                    value={localFilters.location}
                                    onChange={(e) => setLocalFilters((prev) => ({ ...prev, location: e.target.value }))}
                                />
                            </div>
                            <Separator orientation="vertical" className="h-auto" />
                            <DropdownMenu open={showCategoryDropdown} onOpenChange={setShowCategoryDropdown}>
                                <DropdownMenuTrigger asChild>
                                    <div className="relative flex-1">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                            <ChartBarStacked className="h-4 w-4 text-primary" />
                                        </div>
                                        <button
                                            type="button"
                                            className={clsx(
                                                'h-[56px] w-full border-r border-[#F1F2F4] pl-10 pr-4 text-left text-[16px] leading-[24px] focus:outline-none',
                                                localFilters.childrenCategoryId || localFilters.parentCategoryId
                                                    ? 'text-gray-900'
                                                    : 'text-gray-400'
                                            )}
                                            onClick={() => setShowCategoryDropdown(true)}
                                        >
                                            {localFilters.childrenCategoryId
                                                ? (localFilters.childrenCategoryId as Categories)?.categoryName
                                                : localFilters.parentCategoryId
                                                  ? (localFilters.parentCategoryId as Categories)?.categoryName
                                                  : 'Category'}
                                        </button>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <div
                                        className={clsx(
                                            'z-10 w-[300px] origin-top rounded-sm border border-input bg-white p-1 shadow-lg transition-all'
                                        )}
                                    >
                                        {primaryCategoryData?.data?.map((category) => (
                                            <div
                                                key={category.categoryId}
                                                className="group relative z-10 cursor-pointer rounded-sm px-4 py-1.5 transition-all hover:bg-zinc-100"
                                                onMouseEnter={() => setActiveParentCategory(category)}
                                                onClick={() => handleParentCategorySelect(category)}
                                            >
                                                <span className="line-clamp-1 font-normal text-gray-900">
                                                    {category.categoryName}
                                                </span>

                                                {activeParentCategory?.categoryId === category.categoryId &&
                                                    childrenCategoryData?.data && (
                                                        <Card className="absolute left-[295px] top-0 z-40 w-[250px] rounded-sm border border-input bg-white shadow-lg">
                                                            <h3 className="mb-3 px-4 font-medium text-gray-900">
                                                                {category.categoryName}
                                                            </h3>
                                                            <div className="max-h-[200px] overflow-y-auto scrollbar">
                                                                {childrenCategoryData.data.map((child: Categories) => (
                                                                    <div
                                                                        key={child.categoryId}
                                                                        className="cursor-pointer rounded-sm px-4 py-1.5 transition-all hover:bg-zinc-100"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleChildrenCategorySelect(child);
                                                                        }}
                                                                    >
                                                                        <span className="line-clamp-1 text-sm text-gray-900">
                                                                            {child.categoryName}
                                                                        </span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </Card>
                                                    )}
                                            </div>
                                        ))}
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div className="flex items-center gap-2">
                            {userInfo?.fullName && userInfo.createdAt && (
                                <Button
                                    type="button"
                                    onClick={() => setShowAdvanceDropdown(!showAdvanceDropdown)}
                                    variant="outline"
                                >
                                    <Filter /> Advanced
                                </Button>
                            )}
                            <Button type="submit" variant="primary">
                                Find Job
                            </Button>
                        </div>
                    </div>
                    <div>
                        <Sheet open={showAdvanceDropdown} onOpenChange={setShowAdvanceDropdown}>
                            <SheetContent className="flex flex-col justify-between">
                                <SheetHeader>
                                    <SheetTitle>Advanced Filter</SheetTitle>
                                    <SheetDescription></SheetDescription>
                                </SheetHeader>
                                <div className="flex-1 space-y-4 overflow-y-auto scrollbar">
                                    {/* Experience */}
                                    <div>
                                        <h3 className="mb-2 font-medium text-gray-900">Experience</h3>
                                        <div className="space-y-3">
                                            {EXPERIENCE_OPTIONS.map((option) => (
                                                <div key={option.id} className="flex cursor-pointer items-center">
                                                    <div className="relative flex items-center">
                                                        <input
                                                            id={`experience-${option.id}`}
                                                            type="radio"
                                                            name="experience"
                                                            value={option.id}
                                                            checked={localFilters.experience === option.id}
                                                            onChange={() => handleExperienceChange(option.id)}
                                                            className="h-4 w-4 rounded-full border-gray-300 text-primary focus:ring-primary"
                                                        />
                                                        <div
                                                            className={`absolute flex h-4 w-4 items-center justify-center rounded-full border ${localFilters.experience === option.id ? 'border-primary' : 'border-gray-300'}`}
                                                        >
                                                            {localFilters.experience === option.id && (
                                                                <div className="h-2 w-2 rounded-full bg-primary"></div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <label
                                                        htmlFor={`experience-${option.id}`}
                                                        className="ml-6 cursor-pointer text-sm text-gray-700"
                                                    >
                                                        {option.label}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Salary */}
                                    <div>
                                        <h3 className="mb-2 font-medium text-gray-900">Salary</h3>
                                        <div className="space-y-3">
                                            {SALARY_OPTIONS.map((option) => (
                                                <div key={option.id} className="flex items-center">
                                                    <div className="relative flex items-center">
                                                        <input
                                                            id={`salary-${option.id}`}
                                                            type="radio"
                                                            name="salary"
                                                            value={option.id}
                                                            checked={localFilters.salary === option.id}
                                                            onChange={() => handleSalaryChange(option.id)}
                                                            className="h-4 w-4 rounded-full border-gray-300 text-primary focus:ring-primary"
                                                        />
                                                        <div
                                                            className={`absolute flex h-4 w-4 items-center justify-center rounded-full border ${localFilters.salary === option.id ? 'border-primary' : 'border-gray-300'}`}
                                                        >
                                                            {localFilters.salary === option.id && (
                                                                <div className="h-2 w-2 rounded-full bg-primary"></div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <label
                                                        htmlFor={`salary-${option.id}`}
                                                        className="ml-6 cursor-pointer text-sm text-gray-700"
                                                    >
                                                        {option.label}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Job Type */}
                                    <div>
                                        <h3 className="mb-2 font-medium text-gray-900">Job Type</h3>
                                        <div className="space-y-3">
                                            {JOB_TYPE_OPTIONS.map((option) => (
                                                <div key={option[0]} className="flex items-center">
                                                    <div className="relative flex items-center">
                                                        <input
                                                            id={`job-type-${option[0]}`}
                                                            type="checkbox"
                                                            checked={localFilters.jobType.includes(option[1])}
                                                            onChange={() => handleJobTypeChange(option[1])}
                                                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                                        />
                                                    </div>
                                                    <label
                                                        htmlFor={`job-type-${option[0]}`}
                                                        className="ml-6 cursor-pointer text-sm text-gray-700"
                                                    >
                                                        {option[1]}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Education */}
                                    <div>
                                        <h3 className="mb-2 font-medium text-gray-900">Education</h3>
                                        <div className="space-y-3">
                                            {EDUCATION_OPTIONS.map((option) => (
                                                <div key={option[0]} className="flex items-center">
                                                    <div className="relative flex items-center">
                                                        <input
                                                            id={`education-${option[0]}`}
                                                            type="checkbox"
                                                            checked={localFilters.education.includes(option[1])}
                                                            onChange={() => handleEducationChange(option[1])}
                                                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                                        />
                                                    </div>
                                                    <label
                                                        htmlFor={`education-${option[0]}`}
                                                        className="ml-6 cursor-pointer text-sm text-gray-700"
                                                    >
                                                        {option[1]}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <SheetFooter>
                                    <SheetClose asChild>
                                        <Button type="reset" variant="outline" onClick={handleResetAdvancedFilter}>
                                            Reset
                                        </Button>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Button
                                            type="submit"
                                            onClick={() => {
                                                setFilters(localFilters);
                                            }}
                                            variant="primary"
                                        >
                                            Filter
                                        </Button>
                                    </SheetClose>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </form>
        </div>
    );
});

SearchForm.displayName = 'SearchForm';

export { SearchForm };
