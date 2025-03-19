'use client';
import type React from 'react';
import { useState } from 'react';
import { Search, MapPin, ChartBarStacked, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DetailedRequest } from '@/types';
import Link from 'next/link';

interface SearchFormProps {
    onSearch: (filters: DetailedRequest.SearchFilterListJobsCredentials) => void;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
    const [filters, setFilters] = useState<DetailedRequest.SearchFilterListJobsCredentials>({
        keyword: '',
        location: '',
        category: '',
        advance: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(filters);
    };
    return (
        <div className="w-full bg-[#F1F2F4]">
            <form onSubmit={handleSubmit} className="w-full max-w-[1320px] p-4 flex flex-col mx-auto pb-[32px]">
                {/* Header */}
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
                            {/* Job Titile Input */}
                            <div className="relative flex-1">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 ">
                                    <Search className="h-4 w-4 text-[#0066FF]" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Job title, Keyword..."
                                    className="w-full h-[56px] pl-10 pr-4 border-r border-[#F1F2F4] focus:outline-none rounded-l-lg text-[156px]-[24px]"
                                    value={filters.keyword}
                                    onChange={(e) => setFilters((prev) => ({ ...prev, keyword: e.target.value }))}
                                />
                            </div>

                            {/* Location Input */}
                            <div className="relative flex-1">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                    <MapPin className="h-4 w-4 text-[#0066FF]" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Location"
                                    className="w-full h-[56px] pl-10 pr-4 border-r border-[#F1F2F4] focus:outline-none text-[66px]-[24px]"
                                    value={filters.location}
                                    onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value }))}
                                />
                            </div>
                        </div>

                        <div className="flex flex-1">
                            {/* Select Category */}
                            <div className="relative flex-1">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                    <ChartBarStacked className="h-4 w-4 text-[#0066FF]" />
                                </div>
                                <Select
                                    value={filters.category}
                                    onValueChange={(value) => setFilters((prev) => ({ ...prev, category: value }))}
                                >
                                    <SelectTrigger className="h-[56px] pl-10 pr-4 text-[#9199A3] bg-[#FFFF] shadow-none rounded-none border-0 border-r focus:ring-0 focus:ring-offset-0">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="Front End">Front End</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Advance Filter */}
                            <div className="relative flex-1">
                                <Select
                                    value={filters.advance}
                                    onValueChange={(value) => setFilters((prev) => ({ ...prev, advance: value }))}
                                >
                                    <SelectTrigger className="h-[56px] pl-10 pr-4 text-[#9199A3] shadow-none bg-[#FFFF]  border-0  focus:ring-0 focus:ring-offset-0">
                                        <SelectValue placeholder="Advance Filter" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="2">2</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <Button
                        type="submit"
                        variant="primary"
                        className="text-white w-full md:w-[130px] rounded-sm text-[16px]"
                    >
                        Find Job
                    </Button>
                </div>
            </form>
        </div>
    );
}
