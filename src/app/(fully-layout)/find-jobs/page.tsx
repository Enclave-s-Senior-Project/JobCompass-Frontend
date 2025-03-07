'use client';
import { Suspense, useState } from 'react';
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
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [option, setOption] = useState('ASC');
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
                    <Select onValueChange={(value) => setOption(value)}>
                        <SelectTrigger className="text-sm border-[1px] rounded-md px-2 py-1.5 h-[48px] w-[180px] bg-[#FFFFFF] focus:ring-0 focus:ring-offset-0">
                            <SelectValue placeholder={option === 'ASC' ? 'Lastest' : 'Oldest'} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="ASC">Lastest</SelectItem>
                                <SelectItem value="DESC">Oldest</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select onValueChange={(value) => setItemsPerPage(Number(value))}>
                        <SelectTrigger className="text-sm border rounded-md px-2 py-1.5 h-[48px] w-[180px] bg-[#FFFFFF] focus:ring-0 focus:ring-offset-0">
                            <SelectValue placeholder={`${itemsPerPage} per page`} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup className="space-y-2 py-2">
                                <SelectItem value="2">2 per page</SelectItem>
                                <SelectItem value="4">4 per page</SelectItem>
                                <SelectItem value="6">6 per page</SelectItem>
                                <SelectItem value="8">8 per page</SelectItem>
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

            <div className="mx-auto container max-w-screen-xl pb-4">
                <Suspense fallback={<span>Loading...</span>}>
                    <ListCardJobs viewType={viewType} perPage={itemsPerPage || 6} option={option} />
                </Suspense>
            </div>
        </main>
    );
}
