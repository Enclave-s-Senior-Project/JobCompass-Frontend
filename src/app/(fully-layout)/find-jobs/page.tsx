'use client';
import { Suspense, useState, useCallback } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchForm from '@/components/custom-ui/search-bar';
import { DetailedRequest, Meta } from '@/types';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ListCardJobs from '@/components/custom-ui/list-card-jobs';
import { useQuery } from '@tanstack/react-query';
import * as services from '@/services/job.service';
import { useSearchParams } from 'next/navigation';
import { queryKey } from '@/lib/react-query/keys';
import { handleErrorToast } from '@/lib/utils';

export default function Page() {
    const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [option, setOption] = useState('ASC');
    const [totalPages, setTotalPages] = useState(0);

    const [activeFilters, setActiveFilters] = useState<DetailedRequest.SearchFilterListJobsCredentials>({
        keyword: '',
        location: '',
        parentCategoryId: null,
        childrenCategoryId: null,
        experience: '',
        salary: '',
        jobType: [],
        education: [],
        jobLevel: '',
    });

    const [appliedFilters, setAppliedFilters] = useState<DetailedRequest.SearchFilterListJobsCredentials>({
        keyword: '',
        location: '',
        parentCategoryId: null,
        childrenCategoryId: null,
        experience: '',
        salary: '',
        jobType: [],
        education: [],
        jobLevel: '',
    });

    const search = useSearchParams();
    const page = Number(search.get('page') || 1);
    const order = (search.get('order')?.toUpperCase() as 'ASC' | 'DESC') || option;

    const transformFiltersToDto = (filters: DetailedRequest.SearchFilterListJobsCredentials) => {
        const salaryRange = filters.salary?.split('-').map(Number) || [];
        return {
            name: filters.keyword || undefined,
            country: filters.location ? filters.location.split(',')[1]?.trim() : undefined,
            city: filters.location ? filters.location.split(',')[0]?.trim() : undefined,
            industryCategoryId: filters.parentCategoryId?.categoryId || undefined,
            majorityCategoryId: filters.childrenCategoryId?.categoryId || undefined,
            minWage: salaryRange[0] || undefined,
            maxWage: salaryRange[1] || undefined,
            experience: filters.experience ? parseInt(filters.experience, 10) : undefined,
            type: filters.jobType.length > 0 ? filters.jobType : undefined,
            education: filters.education.length > 0 ? filters.education : undefined,
            jobLevel: filters.jobLevel || undefined,
        };
    };

    const {
        refetch,
        data: resultQuery,
        isPending,
    } = useQuery({
        queryKey: [queryKey.listJobs, { order, page, take: itemsPerPage, options: option }],
        queryFn: async ({ queryKey }) => {
            const { order, page, take, options } = queryKey[1] as any;
            try {
                const payload = await services.JobService.getAllJobs({
                    order,
                    page,
                    take,
                    options,
                    ...transformFiltersToDto(appliedFilters),
                });
                if (Number(payload?.meta.pageCount) > 0) setTotalPages(Number(payload?.meta.pageCount) || 0);
                return payload;
            } catch (error: any) {
                handleErrorToast(error);
            }
        },
        staleTime: 1000 * 60, // 1 minute
        refetchInterval: 1000 * 60, // 1 minute
        retry: 2,
        enabled: true,
    });

    const handleSearch = useCallback(
        (filters: DetailedRequest.SearchFilterListJobsCredentials) => {
            setActiveFilters(filters);
            setAppliedFilters(filters);
            refetch();
        },
        [refetch]
    );

    const removeFilter = useCallback(
        (key: keyof DetailedRequest.SearchFilterListJobsCredentials) => {
            setActiveFilters((prev) => {
                const newFilters = {
                    ...prev,
                    [key]: Array.isArray(prev[key]) ? [] : '',
                };
                setAppliedFilters(newFilters);
                refetch();
                return newFilters;
            });
        },
        [refetch]
    );

    const clearAllFilters = useCallback(() => {
        const clearedFilters = {
            keyword: '',
            location: '',
            parentCategoryId: null,
            childrenCategoryId: null,
            experience: '',
            salary: '',
            jobType: [],
            education: [],
            jobLevel: '',
        };
        setActiveFilters(clearedFilters);
        setAppliedFilters(clearedFilters);
        refetch();
    }, [refetch]);
    return (
        <main className="min-h-dvh bg-white">
            <SearchForm filters={activeFilters} setFilters={setActiveFilters} onSearch={handleSearch} />
            <div className="flex flex-col md:flex-row justify-between items-center max-w-screen-xl mx-auto mb-6 mt-6 gap-6">
                <div className="flex-1 flex flex-wrap items-center justify-between gap-2">
                    <div>
                        {Object.entries(activeFilters).map(([key, value]) => {
                            // Xử lý keyword
                            if (key === 'keyword' && value) {
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
                            }
                            if (key === 'location' && value) {
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
                            }
                            if (key === 'jobType' || key === 'education') {
                                return (value as string[]).map((val, index) => (
                                    <Button
                                        key={index}
                                        variant="outline"
                                        size="md"
                                        className="rounded-[30px]"
                                        onClick={() =>
                                            setActiveFilters((prev) => ({
                                                ...prev,
                                                [key]: (prev[key] as string[]).filter((v) => v !== val),
                                            }))
                                        }
                                    >
                                        {val}
                                        <span className="ml-1 text-xs bg-gray-100 px-1.5 py-0.5 rounded-full">×</span>
                                    </Button>
                                ));
                            }
                            if (!value || (Array.isArray(value) && value.length === 0)) return null;
                            if (key === 'parentCategoryId' && typeof value === 'object' && value !== null) {
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
                                        {value.categoryName}
                                        <span className="ml-1 text-xs bg-gray-100 px-1.5 py-0.5 rounded-full">×</span>
                                    </Button>
                                );
                            }

                            if (key === 'childrenCategoryId' && typeof value === 'object' && value !== null) {
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
                                        {value.categoryName}
                                        <span className="ml-1 text-xs bg-gray-100 px-1.5 py-0.5 rounded-full">×</span>
                                    </Button>
                                );
                            }
                        })}
                    </div>
                    <div>
                        {Object.values(activeFilters).some(
                            (value) => value && (Array.isArray(value) ? value.length > 0 : true)
                        ) && (
                            <Button
                                variant="outline"
                                size="md"
                                className="rounded-[30px] border-danger-100 hover:border-danger-500 text-danger-500"
                                onClick={clearAllFilters}
                            >
                                Clear All <span className="ml-1 text-xs bg-gray-200 px-1.5 py-0.5 rounded-full">×</span>
                            </Button>
                        )}
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <Select onValueChange={setOption}>
                        <SelectTrigger className="text-sm border rounded-md px-2 py-1.5 h-[48px] w-[180px] bg-white focus:ring-0 focus:ring-offset-0">
                            <SelectValue placeholder={option === 'ASC' ? 'Latest' : 'Oldest'} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="ASC">Latest</SelectItem>
                                <SelectItem value="DESC">Oldest</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select onValueChange={(value) => setItemsPerPage(Number(value))}>
                        <SelectTrigger className="text-sm border rounded-md px-2 py-1.5 h-[48px] w-[180px] bg-white focus:ring-0 focus:ring-offset-0">
                            <SelectValue placeholder={`${itemsPerPage} per page`} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {[2, 4, 6, 8].map((num) => (
                                    <SelectItem key={num} value={String(num)}>
                                        {num} per page
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <div className="flex justify-center items-center border rounded-md h-[48px] w-[88px] gap-2">
                        <Button
                            variant="ghost"
                            size="icon-md"
                            className={`w-[36px] h-[36px] flex items-center justify-center ${viewType === 'grid' ? 'bg-gray-100' : ''}`}
                            onClick={() => setViewType('grid')}
                        >
                            <LayoutGrid className="h-3 w-3" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon-md"
                            className={`w-[36px] h-[36px] flex items-center justify-center ${viewType === 'list' ? 'bg-gray-100' : ''}`}
                            onClick={() => setViewType('list')}
                        >
                            <List className="h-3 w-3" />
                        </Button>
                    </div>
                </div>
            </div>
            <div className="mx-auto container max-w-screen-xl pb-4">
                <Suspense fallback={<span>Loading...</span>}>
                    <ListCardJobs
                        viewType={viewType}
                        perPage={itemsPerPage}
                        option={option}
                        data={resultQuery?.data}
                        isPending={isPending}
                        meta={resultQuery?.meta as Meta}
                        totalPages={totalPages}
                        refetch={refetch}
                    />
                </Suspense>
            </div>
        </main>
    );
}
