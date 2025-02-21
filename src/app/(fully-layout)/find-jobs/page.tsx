'use client';
import { useState } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchForm from '@/components/custom-ui/search-bar';
import { DetailedRequest } from '@/types';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ListCardJobs from '@/components/custom-ui/list-card-jobs';

export default function Page() {
    const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
    const [activeFilters, setActiveFilters] = useState<DetailedRequest.SearchFilterListJobsCredentials>({
        keyword: '',
        location: '',
        category: '',
        advance: '',
    });
    const handleSearch = (filters: DetailedRequest.SearchFilterListJobsCredentials) => {
        setActiveFilters(filters);
    };

    const removeFilter = (key: keyof DetailedRequest.SearchFilterListJobsCredentials) => {
        setActiveFilters((prev) => ({
            ...prev,
            [key]: '',
        }));
    };
    return (
        <main className="min-h-dvh bg-white">
            <SearchForm onSearch={handleSearch} />
            <div className="flex flex-col md:flex-row justify-between items-center max-w-screen-xl mx-auto mb-6 mt-6 gap-28">
                <div className="flex flex-wrap items-center gap-2">
                    {Object.entries(activeFilters).map(([key, value]) => {
                        if (!value) return null;
                        return (
                            <Button
                                key={key}
                                variant="outline"
                                size="md"
                                className="rounded-[30px]"
                                onClick={() =>
                                    removeFilter(key as keyof DetailedRequest.SearchFilterListJobsCredentials)
                                }
                            >
                                {value}
                                <span className="ml-1 text-xs bg-gray-100 px-1.5 py-0.5 rounded-full">×</span>
                            </Button>
                        );
                    })}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <Select>
                        <SelectTrigger className="text-sm border-[1px] rounded-md px-2 py-1.5 h-[48px] w-[180px] bg-[#FFFFFF] focus:ring-0 focus:ring-offset-0">
                            <SelectValue placeholder="Lastest" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="Lastest">Lastest</SelectItem>
                                <SelectItem value="Oldest">Oldest</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="text-sm border rounded-md px-2 py-1.5 h-[48px] w-[180px] bg-[#FFFFFF] focus:ring-0 focus:ring-offset-0">
                            <SelectValue placeholder="12 per page" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup className="space-y-2 py-2">
                                <SelectItem value="12">12 per page</SelectItem>
                                <SelectItem value="24">24 per page</SelectItem>
                                <SelectItem value="36">36 per page</SelectItem>
                                <SelectItem value="48">48 per page</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <div className="flex items-center justify-center border rounded-md h-[48px] w-[88px] gap-2">
                        <Button
                            variant="ghost"
                            size="md"
                            className={`px-2 h-[32px] w-[32px] ${viewType === 'grid' ? 'bg-gray-100' : ''}`}
                            onClick={() => setViewType('grid')}
                        >
                            <LayoutGrid className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="md"
                            className={`px-2 h-[32px] w-[32px] ${viewType === 'list' ? 'bg-gray-100' : ''}`}
                            onClick={() => setViewType('list')}
                        >
                            <List className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="mx-auto container max-w-screen-xl">
                <ListCardJobs viewType={viewType} />
            </div>
        </main>
    );
}
