'use client';
import type React from 'react';
import { useState, useRef, useEffect } from 'react';
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

interface SearchFormProps {
    onSearch: (filters: DetailedRequest.SearchFilterListJobsCredentials) => void;
    filters: DetailedRequest.SearchFilterListJobsCredentials;
    setFilters: React.Dispatch<React.SetStateAction<DetailedRequest.SearchFilterListJobsCredentials>>;
}

export default function SearchForm({ onSearch, filters, setFilters }: SearchFormProps) {
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [showAdvanceDropdown, setShowAdvanceDropdown] = useState(false);
    const [activeParentCategory, setActiveParentCategory] = useState<Categories | null>(null);
    const [selectedAdvanceText] = useState('Advance Filter');

    const categoryRef = useRef<HTMLDivElement>(null);
    const advanceRef = useRef<HTMLDivElement>(null);

    const { data: primaryCategoryData } = useQuery({
        queryKey: [queryKey.categoriesPrimary],
        queryFn: async () => {
            try {
                return await CategoryService.getPrimaryCategories({ take: 20 });
            } catch {
                console.error('Error fetching primary categories');
            }
        },
    });

    const { data: childrenCategoryData } = useQuery({
        queryKey: [queryKey.categoriesChild, activeParentCategory?.categoryId],
        queryFn: async () => {
            if (!activeParentCategory) return null;
            try {
                return await CategoryService.getCategoriesChildren(activeParentCategory.categoryId, { take: 20 });
            } catch {
                console.error('Error fetching child categories');
            }
        },
        enabled: !!activeParentCategory,
        staleTime: 1000 * 60 * 5,
    });

    const EXPERIENCE_OPTIONS = [
        { id: 'freshers', label: 'Freshers' },
        { id: '1-2', label: '1 - 2 Years' },
        { id: '2-4', label: '2 - 4 Years' },
        { id: '4-6', label: '4 - 6 Years' },
        { id: '6-8', label: '6 - 8 Years' },
        { id: '8-10', label: '8 - 10 Years' },
        { id: '10-15', label: '10 - 15 Years' },
        { id: '15+', label: '15+ Years' },
    ];

    const SALARY_OPTIONS = [
        { id: '50-1000', label: '$50 - $1000' },
        { id: '1000-2000', label: '$1000 - $2000' },
        { id: '3000-4000', label: '$3000 - $4000' },
        { id: '4000-6000', label: '$4000 - $6000' },
        { id: '6000-8000', label: '$6000 - $8000' },
        { id: '8000-10000', label: '$8000 - $10000' },
        { id: '10000-15000', label: '$10000 - $15000' },
        { id: '15000+', label: '$15000+' },
    ];

    const JOB_TYPE_OPTIONS = [
        { id: 'full-time', label: 'Full Time' },
        { id: 'part-time', label: 'Part Time' },
        { id: 'internship', label: 'Internship' },
        { id: 'remote', label: 'Remote' },
        { id: 'temporary', label: 'Temporary' },
        { id: 'contract', label: 'Contract Base' },
    ];

    const EDUCATION_OPTIONS = [
        { id: 'high-school', label: 'High School' },
        { id: 'intermediate', label: 'Intermediate' },
        { id: 'graduation', label: 'Graduation' },
        { id: 'masters', label: 'Master Degree' },
        { id: 'bachelors', label: 'Bachelor Degree' },
    ];

    const JOB_LEVEL_OPTIONS = [
        { id: 'entry', label: 'Entry Level' },
        { id: 'mid', label: 'Mid Level' },
        { id: 'expert', label: 'Expert Level' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(filters);
    };
    const handleParentCategorySelect = (category: any) => {
        setFilters((prev) => ({
            ...prev,
            parentCategoryId: { categoryId: category.categoryId, categoryName: category.categoryName },
        }));
        setActiveParentCategory(category);
    };

    const handleChildrenCategorySelect = (category: any) => {
        setFilters((prev) => ({
            ...prev,
            childrenCategoryId: { categoryId: category.categoryId, categoryName: category.categoryName },
        }));
        setShowCategoryDropdown(false);
    };

    const handleExperienceChange = (value: string) => {
        setFilters((prev) => ({ ...prev, experience: value }));
    };

    const handleSalaryChange = (value: string) => {
        setFilters((prev) => ({ ...prev, salary: value }));
    };

    const handleJobTypeChange = (value: string) => {
        setFilters((prev) => {
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
        setFilters((prev) => {
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

    const handleJobLevelChange = (value: string) => {
        setFilters((prev) => ({ ...prev, jobLevel: value }));
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
                setShowCategoryDropdown(false);
                setActiveParentCategory(null);
            }
            if (advanceRef.current && !advanceRef.current.contains(event.target as Node)) {
                setShowAdvanceDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="w-full bg-[#F1F2F4]">
            <form onSubmit={handleSubmit} className="w-full max-w-[1320px] p-4 flex flex-col mx-auto pb-[32px]">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                    <h1 className="text-[18px]/[28px]">Find Job</h1>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Link href="/">Home</Link>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-gray-900">Find Job</span>
                    </div>
                </div>

                <div className="p-3 flex flex-wrap justify-between w-full bg-[#FFFFFF] md:h-[80px] items-center rounded-sm">
                    <div className="flex-1 flex items-center flex-wrap">
                        <div className="flex">
                            <div className="relative flex-1">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                    <Search className="h-4 w-4 text-[#0066FF]" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Job title, Keyword..."
                                    className="w-full h-[56px] pl-10 pr-4 border-r border-[#F1F2F4] focus:outline-none rounded-l-lg text-[16px] leading-[24px]"
                                    value={filters.keyword}
                                    onChange={(e) => setFilters((prev) => ({ ...prev, keyword: e.target.value }))}
                                />
                            </div>
                            <Separator orientation="vertical" className="h-auto" />

                            <div className="relative flex-1">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                    <MapPin className="h-4 w-4 text-[#0066FF]" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Location"
                                    className="w-full h-[56px] pl-10 pr-4 border-r border-[#F1F2F4] focus:outline-none text-[16px] leading-[24px]"
                                    value={filters.location}
                                    onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value }))}
                                />
                            </div>
                            <Separator orientation="vertical" className="h-auto" />

                            <div className="relative flex-1 min-w-[250px] md:min-w-[300px]" ref={categoryRef}>
                                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                    <ChartBarStacked className="h-4 w-4 text-[#0066FF]" />
                                </div>
                                <button
                                    type="button"
                                    className="w-full h-[56px] pl-10 pr-4 text-left border-r border-[#F1F2F4] focus:outline-none text-[16px] leading-[24px] text-[#9199A3]"
                                    onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                                >
                                    {filters.childrenCategoryId
                                        ? childrenCategoryData?.data?.find(
                                              (c) => c.categoryId === filters.childrenCategoryId
                                          )?.categoryName
                                        : filters.parentCategoryId
                                          ? primaryCategoryData?.data?.find(
                                                (c) => c.categoryId === filters.parentCategoryId?.categoryId
                                            )?.categoryName
                                          : 'Category'}
                                </button>

                                <Card
                                    className={clsx(
                                        'absolute z-30 p-1 w-[300px] bg-white shadow-lg rounded-sm border border-input transition-all origin-top',
                                        showCategoryDropdown
                                            ? 'visible opacity-100 [transform:scale(1)]'
                                            : 'invisible opacity-0 [transform:scale(0.95)]'
                                    )}
                                >
                                    {primaryCategoryData?.data?.map((category) => (
                                        <div
                                            key={category.categoryId}
                                            className="relative group px-4 py-1.5 hover:bg-zinc-100 cursor-pointer rounded-sm transition-all"
                                            onMouseEnter={() => setActiveParentCategory(category)}
                                            onClick={() => handleParentCategorySelect(category)}
                                        >
                                            <span className="font-normal text-gray-900 line-clamp-1">
                                                {category.categoryName}
                                            </span>

                                            {activeParentCategory?.categoryId === category.categoryId &&
                                                childrenCategoryData?.data && (
                                                    <Card className="absolute left-[295px] top-0 w-[250px] bg-white shadow-lg rounded-sm border border-input z-40">
                                                        <h3 className="px-4 text-gray-900 font-medium mb-3">
                                                            {category.categoryName}
                                                        </h3>
                                                        <div className="max-h-[200px] overflow-y-auto scrollbar">
                                                            {childrenCategoryData.data.map((child: Categories) => (
                                                                <div
                                                                    key={child.categoryId}
                                                                    className="cursor-pointer px-4 py-1.5 hover:bg-zinc-100 rounded-sm transition-all"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleChildrenCategorySelect(child);
                                                                    }}
                                                                >
                                                                    <span className="text-gray-900 text-sm line-clamp-1">
                                                                        {child.categoryName}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </Card>
                                                )}
                                        </div>
                                    ))}
                                </Card>
                            </div>
                            <Separator orientation="vertical" className="h-auto" />

                            <div className="relative flex-1 min-w-[250px] md:min-w-[178px]" ref={advanceRef}>
                                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                    <Filter className="h-4 w-4 text-[#0066FF]" />
                                </div>
                                <button
                                    type="button"
                                    className="w-full h-[56px] pl-10 pr-4 text-left focus:outline-none text-[16px] leading-[24px] text-[#9199A3]"
                                    onClick={() => setShowAdvanceDropdown(!showAdvanceDropdown)}
                                >
                                    {selectedAdvanceText}
                                </button>

                                {showAdvanceDropdown && (
                                    <Card className="absolute z-30 mt-1 w-[calc(100vw-2rem)] md:w-[800px] lg:w-[1000px] bg-white shadow-lg rounded-md border border-gray-200 p-6 right-0">
                                        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                                            {/* Experience */}
                                            <div>
                                                <h3 className="font-medium text-gray-900 mb-4">Experience</h3>
                                                <div className="space-y-3">
                                                    {EXPERIENCE_OPTIONS.map((option) => (
                                                        <div
                                                            key={option.id}
                                                            className="flex items-center cursor-pointer"
                                                        >
                                                            <div className="relative flex items-center">
                                                                <input
                                                                    id={`experience-${option.id}`}
                                                                    type="radio"
                                                                    name="experience"
                                                                    value={option.id}
                                                                    checked={filters.experience === option.id}
                                                                    onChange={() => handleExperienceChange(option.id)}
                                                                    className="h-4 w-4 rounded-full border-gray-300 text-primary focus:ring-primary"
                                                                />
                                                                <div
                                                                    className={`absolute w-4 h-4 rounded-full border flex items-center justify-center ${filters.experience === option.id ? 'border-primary' : 'border-gray-300'}`}
                                                                >
                                                                    {filters.experience === option.id && (
                                                                        <div className="w-2 h-2 rounded-full bg-primary"></div>
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
                                                <h3 className="font-medium text-gray-900 mb-4">Salary</h3>
                                                <div className="space-y-3">
                                                    {SALARY_OPTIONS.map((option) => (
                                                        <div key={option.id} className="flex items-center">
                                                            <div className="relative flex items-center">
                                                                <input
                                                                    id={`salary-${option.id}`}
                                                                    type="radio"
                                                                    name="salary"
                                                                    value={option.id}
                                                                    checked={filters.salary === option.id}
                                                                    onChange={() => handleSalaryChange(option.id)}
                                                                    className="h-4 w-4 rounded-full border-gray-300 text-primary focus:ring-primary"
                                                                />
                                                                <div
                                                                    className={`absolute w-4 h-4 rounded-full border flex items-center justify-center ${filters.salary === option.id ? 'border-primary' : 'border-gray-300'}`}
                                                                >
                                                                    {filters.salary === option.id && (
                                                                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <label
                                                                htmlFor={`salary-${option.id}`}
                                                                className="ml-6 text-sm text-gray-700 cursor-pointer"
                                                            >
                                                                {option.label}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Job Type */}
                                            <div>
                                                <h3 className="font-medium text-gray-900 mb-4">Job Type</h3>
                                                <div className="space-y-3">
                                                    {JOB_TYPE_OPTIONS.map((option) => (
                                                        <div key={option.id} className="flex items-center">
                                                            <div className="relative flex items-center">
                                                                <input
                                                                    id={`job-type-${option.id}`}
                                                                    type="checkbox"
                                                                    value={option.id}
                                                                    checked={filters.jobType.includes(option.id)}
                                                                    onChange={() => handleJobTypeChange(option.id)}
                                                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                                                />
                                                                <div
                                                                    className={`absolute w-4 h-4 rounded border flex items-center justify-center ${filters.jobType.includes(option.id) ? 'border-primary bg-primary' : 'border-gray-300'}`}
                                                                >
                                                                    {filters.jobType.includes(option.id) && (
                                                                        <svg
                                                                            className="w-2 h-2 text-white"
                                                                            fill="currentColor"
                                                                            viewBox="0 0 20 20"
                                                                        >
                                                                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                                                                        </svg>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <label
                                                                htmlFor={`job-type-${option.id}`}
                                                                className="ml-6 text-sm text-gray-700 cursor-pointer"
                                                            >
                                                                {option.label}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Education */}
                                            <div>
                                                <h3 className="font-medium text-gray-900 mb-4">Education</h3>
                                                <div className="space-y-3">
                                                    {EDUCATION_OPTIONS.map((option) => (
                                                        <div key={option.id} className="flex items-center">
                                                            <div className="relative flex items-center">
                                                                <input
                                                                    id={`education-${option.id}`}
                                                                    type="checkbox"
                                                                    value={option.id}
                                                                    checked={filters.education.includes(option.id)}
                                                                    onChange={() => handleEducationChange(option.id)}
                                                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                                                />
                                                                <div
                                                                    className={`absolute w-4 h-4 rounded border flex items-center justify-center ${filters.education.includes(option.id) ? 'border-primary bg-primary' : 'border-gray-300'}`}
                                                                >
                                                                    {filters.education.includes(option.id) && (
                                                                        <svg
                                                                            className="w-2 h-2 text-white"
                                                                            fill="currentColor"
                                                                            viewBox="0 0 20 20"
                                                                        >
                                                                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                                                                        </svg>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <label
                                                                htmlFor={`education-${option.id}`}
                                                                className="ml-6 text-sm text-gray-700 cursor-pointer"
                                                            >
                                                                {option.label}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Job Level */}
                                            <div>
                                                <h3 className="font-medium text-gray-900 mb-4">Job Level</h3>
                                                <div className="space-y-3">
                                                    {JOB_LEVEL_OPTIONS.map((option) => (
                                                        <div key={option.id} className="flex items-center">
                                                            <div className="relative flex items-center">
                                                                <input
                                                                    id={`job-level-${option.id}`}
                                                                    type="radio"
                                                                    name="jobLevel"
                                                                    value={option.id}
                                                                    checked={filters.jobLevel === option.id}
                                                                    onChange={() => handleJobLevelChange(option.id)}
                                                                    className="h-4 w-4 rounded-full border-gray-300 text-primary focus:ring-primary"
                                                                />
                                                                <div
                                                                    className={`absolute w-4 h-4 rounded-full border flex items-center justify-center ${filters.jobLevel === option.id ? 'border-primary' : 'border-gray-300'}`}
                                                                >
                                                                    {filters.jobLevel === option.id && (
                                                                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <label
                                                                htmlFor={`job-level-${option.id}`}
                                                                className="ml-6 text-sm text-gray-700"
                                                            >
                                                                {option.label}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="relative flex-1 min-w-[250px] md:min-w-[131px] max-w-[131px] pl-3">
                        <Button
                            type="submit"
                            className="text-white w-full rounded-sm text-[16px] bg-[#0066FF] hover:bg-[#0055DD]"
                        >
                            Find Job
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
