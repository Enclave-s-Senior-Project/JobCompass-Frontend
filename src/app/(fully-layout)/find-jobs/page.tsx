'use client';
import { Suspense, useState, useCallback, useContext } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchForm } from '@/components/custom-ui/search-bar';
import { DetailedRequest, Meta } from '@/types';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ListCardJobs from '@/components/custom-ui/list-card-jobs';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import * as services from '@/services/job.service';
import { useSearchParams } from 'next/navigation';
import { queryKey } from '@/lib/react-query/keys';
import { handleErrorToast } from '@/lib/utils';
import { UserContext } from '@/contexts';

export default function Page() {
    const { userInfo } = useContext(UserContext);

    const search = useSearchParams();
    const page = Number(search.get('page') || 1);
    const order = (search.get('order')?.toUpperCase() as 'ASC' | 'DESC') || 'ASC';
    const title = search.get('search')?.toString() || '';
    const country = search.get('country')?.toString() || '';

    const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [option, setOption] = useState('ASC');
    const [totalPages, setTotalPages] = useState(0);

    const [activeFilters, setActiveFilters] = useState<DetailedRequest.SearchFilterListJobsCredentials>({
        keyword: title || '',
        location: country || '',
        parentCategoryId: userInfo?.industry
            ? { categoryId: userInfo.industry.categoryId, categoryName: userInfo.industry.categoryName, isActive: true }
            : null,
        childrenCategoryId: userInfo?.majority
            ? { categoryId: userInfo.majority.categoryId, categoryName: userInfo.majority.categoryName, isActive: true }
            : null,
        experience: '',
        salary: '',
        jobType: [],
        education: [],
    });

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
            experience: filters.experience || undefined,
            type: filters.jobType.length > 0 ? filters.jobType : undefined,
            education: filters.education.length > 0 ? filters.education : undefined,
        };
    };

    const {
        refetch,
        data: resultQuery,
        isPending,
        isFetching,
    } = useQuery({
        queryKey: [queryKey.listJobs, { order, page, take: itemsPerPage, options: option }, activeFilters],
        queryFn: async ({ queryKey }) => {
            const { order, page, take, options } = queryKey[1] as any;
            const appliedFilters = queryKey[2] as DetailedRequest.SearchFilterListJobsCredentials;
            try {
                if (
                    !appliedFilters.childrenCategoryId &&
                    !appliedFilters.parentCategoryId &&
                    !appliedFilters.keyword &&
                    !appliedFilters.location &&
                    !appliedFilters.experience &&
                    !appliedFilters.salary &&
                    appliedFilters.jobType.length === 0 &&
                    appliedFilters.education.length === 0
                )
                    return null;
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
                return null;
            }
        },
        // staleTime: 1000 * 60, // 1 minute
        retry: 2,
        enabled: true,
        placeholderData: keepPreviousData,
    });

    const removeFilter = useCallback(
        (key: keyof DetailedRequest.SearchFilterListJobsCredentials) => {
            setActiveFilters((prev) => {
                const newFilters = {
                    ...prev,
                    [key]: Array.isArray(prev[key]) ? [] : '',
                };
                setActiveFilters(newFilters);
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
        refetch();
    }, [refetch]);
    return (
        <main className="min-h-dvh bg-white">
            <SearchForm filters={activeFilters} setFilters={setActiveFilters} />
            <div className="mx-auto mb-6 mt-6 flex max-w-screen-xl flex-col items-center justify-between gap-6 md:flex-row">
                <div className="flex flex-1 flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1">
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
                                        <span className="ml-1 rounded-full bg-gray-100 px-1.5 py-0.5 text-xs">×</span>
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
                                        <span className="ml-1 rounded-full bg-gray-100 px-1.5 py-0.5 text-xs">×</span>
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
                                        <span className="ml-1 rounded-full bg-gray-100 px-1.5 py-0.5 text-xs">×</span>
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
                                        <span className="ml-1 rounded-full bg-gray-100 px-1.5 py-0.5 text-xs">×</span>
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
                                        <span className="ml-1 rounded-full bg-gray-100 px-1.5 py-0.5 text-xs">×</span>
                                    </Button>
                                );
                            }
                            if (key === 'experience' && typeof value === 'string' && value) {
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
                                        {value} years
                                        <span className="ml-1 rounded-full bg-gray-100 px-1.5 py-0.5 text-xs">×</span>
                                    </Button>
                                );
                            }
                            if (key === 'salary' && typeof value === 'string' && value) {
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
                                        {value} $
                                        <span className="ml-1 rounded-full bg-gray-100 px-1.5 py-0.5 text-xs">×</span>
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
                                className="rounded-[30px] border-danger-100 text-danger-500 hover:border-danger-500"
                                onClick={clearAllFilters}
                            >
                                Clear All <span className="ml-1 rounded-full bg-gray-200 px-1.5 py-0.5 text-xs">×</span>
                            </Button>
                        )}
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <Select onValueChange={setOption}>
                        <SelectTrigger className="h-[48px] w-[180px] rounded-md border bg-white px-2 py-1.5 text-sm focus:ring-0 focus:ring-offset-0">
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
                        <SelectTrigger className="h-[48px] w-[180px] rounded-md border bg-white px-2 py-1.5 text-sm focus:ring-0 focus:ring-offset-0">
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
                    <div className="flex h-[48px] w-[88px] items-center justify-center gap-2 rounded-md border">
                        <Button
                            variant="ghost"
                            size="icon-md"
                            className={`flex h-[36px] w-[36px] items-center justify-center ${viewType === 'grid' ? 'bg-gray-100' : ''}`}
                            onClick={() => setViewType('grid')}
                        >
                            <LayoutGrid className="h-3 w-3" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon-md"
                            className={`flex h-[36px] w-[36px] items-center justify-center ${viewType === 'list' ? 'bg-gray-100' : ''}`}
                            onClick={() => setViewType('list')}
                        >
                            <List className="h-3 w-3" />
                        </Button>
                    </div>
                </div>
            </div>
            <div className="container mx-auto max-w-screen-xl pb-4">
                <Suspense fallback={<span>Loading...</span>}>
                    <ListCardJobs
                        viewType={viewType}
                        perPage={itemsPerPage}
                        option={option}
                        data={resultQuery?.data}
                        isPending={isPending || isFetching}
                        meta={resultQuery?.meta as Meta}
                        totalPages={totalPages}
                        refetch={refetch}
                    />
                </Suspense>
            </div>
        </main>
    );
}
