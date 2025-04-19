'use client';

import { JobsList } from '@/components/custom-ui/job-list';
import { queryKey } from '@/lib/react-query/keys';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useEffect, useId, useState } from 'react';
import clsx from 'clsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn, handleErrorToast } from '@/lib/utils';
import { EnterpriseService } from '@/services/enterprises.service';
import { SimplePagination } from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';
import { Button } from '@/components/ui/button';
import { ChevronDown, ListFilterPlus } from 'lucide-react';
import { FilterMyJobs, FilterValues, defaultFilters } from '@/components/custom-ui/local/filter-my-jobs';
import { useDebounce } from '@/hooks/useDebounce';
import { Meta } from '@/types';
import { JobService } from '@/services';
import { JobQuickView } from '@/components/custom-ui/global/job-quick-view';
import { Skeleton } from '@/components/ui/skeleton';

type OrderByType = 'ASC' | 'DESC' | 'LATEST' | 'NEWEST' | 'DEADLINE';

const orderByOptions: Array<{ label: string; value: OrderByType }> = [
    { label: 'Newest', value: 'NEWEST' },
    { label: 'Latest', value: 'LATEST' },
    { label: 'Deadline', value: 'DEADLINE' },
    { label: 'Name (A-Z)', value: 'ASC' },
    { label: 'Name (Z-A)', value: 'DESC' },
];

const LIMIT_ITEMS = 5;

const defaultMeta: Meta = {
    itemCount: 0,
    page: 0,
    take: LIMIT_ITEMS,
    hasNextPage: false,
    hasPreviousPage: false,
    pageCount: 0,
};

export default function JobsPage() {
    const [showFilter, setShowFilter] = useState(false);
    const [sortBy, setSortBy] = useState<OrderByType>('NEWEST');
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState<FilterValues>({ ...defaultFilters });
    const [page, setPage] = useState(1);
    const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

    const searchDebounced = useDebounce(search, 700);

    const inputId = useId();

    // Handle applying filters
    const handleApplyFilters = (newFilters: FilterValues) => {
        setFilters(newFilters);
        // Reset to first page when filters change
    };

    // Get jobs with filters
    const {
        data,
        isFetching,
        refetch: refetchJobs,
    } = useQuery({
        queryKey: [queryKey.ownEnterpriseJobs, filters, sortBy, searchDebounced, page],
        queryFn: async () => {
            try {
                return await EnterpriseService.getOwnJobs({
                    page: page,
                    take: LIMIT_ITEMS,
                    jobType: filters.jobType === 'all' ? undefined : filters.jobType.toString(),
                    jobStatus: filters.jobStatus === 'all' ? undefined : filters.jobStatus.toString(),
                    jobLocation: filters.jobLocation === 'all' ? undefined : filters.jobLocation.toString(),
                    jobExperience: filters.jobExperience === 'all' ? undefined : filters.jobExperience.toString(),
                    jobBoost: filters.jobBoost === 'all' ? undefined : filters.jobBoost.toString(),
                    search: searchDebounced || undefined,
                    sort: sortBy,
                });
            } catch (error) {
                handleErrorToast(error);
            }
        },
        placeholderData: keepPreviousData,
        retry: 2,
    });

    const {
        data: jobDetails,
        isPending: isPendingQuerySpecifiedJob,
        refetch: refetchDetailJob,
    } = useQuery({
        queryKey: [queryKey.detailJob, selectedJobId],
        queryFn: async () => {
            try {
                if (selectedJobId) return await JobService.detailJob(selectedJobId, { userId: '' });
            } catch (error: any) {
                handleErrorToast(error);
            }
        },
        enabled: !!selectedJobId,
        staleTime: 1000 * 60 * 1,
    });

    useEffect(() => {
        if (data?.data?.[0]?.jobId) {
            setSelectedJobId(data?.data?.[0]?.jobId);
        }
    }, [data?.data]);

    // Handle search
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    // Handle order change
    const handleOrderChange = (value: OrderByType) => {
        setSortBy(value);
    };

    return (
        <div className="container mx-auto space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">
                    My Jobs&nbsp;
                    <span className="text-lg text-gray-500">({data?.meta?.itemCount || 0})</span>
                </h1>
            </div>
            {/* Search bar */}
            <div className="flex flex-wrap items-center gap-2">
                <div className="flex h-12 flex-1 items-center rounded-sm border border-primary-100 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                    <label htmlFor={inputId} className="p-2">
                        <HiMiniMagnifyingGlass className="size-6 text-primary" />
                    </label>
                    <Input
                        type="search"
                        id={inputId}
                        value={search}
                        onChange={handleSearch}
                        className="h-12 flex-1 border-none text-sm font-normal shadow-none focus-visible:ring-0"
                        placeholder="Job title, tags..."
                    />
                </div>

                <Select value={sortBy} onValueChange={handleOrderChange}>
                    <SelectTrigger
                        className={clsx(
                            'h-12 max-w-40 rounded-sm border border-primary-100 focus:border-primary focus:ring-1 focus:ring-primary'
                        )}
                    >
                        <SelectValue className="text-sm" placeholder="Latest" />
                    </SelectTrigger>
                    <SelectContent>
                        {orderByOptions.map((orderByOption) => (
                            <SelectItem key={orderByOption.value} value={orderByOption.value}>
                                {orderByOption.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Button
                    variant="outline-secondary"
                    size="md"
                    onClick={() => setShowFilter((prev) => !prev)}
                    className="max-h-10 min-h-12 text-sm text-gray-900 shadow-none"
                >
                    <ListFilterPlus />
                    Filter <ChevronDown className={clsx('transition-all', showFilter ? 'rotate-90' : '-rotate-90')} />
                </Button>
            </div>

            <div>
                <SimplePagination meta={data?.meta || defaultMeta} onPageChange={setPage} />
            </div>

            {/* Main content of jobs management */}
            {data?.data && data?.data.length > 0 ? (
                <div className="grid grid-cols-5 gap-2">
                    {/* Show list own jobs */}
                    <div className={cn('col-span-5 lg:col-span-2')}>
                        <JobsList
                            refetchJob={refetchJobs}
                            jobs={data?.data || []}
                            isLoading={isFetching}
                            onSelectItem={setSelectedJobId}
                            refetchDetailJob={refetchDetailJob}
                            isOwn={true}
                            temp={true}
                        />
                    </div>
                    {/* Job quick view details */}
                    {isPendingQuerySpecifiedJob ? (
                        <div className="flex h-full flex-col gap-2 lg:col-span-3">
                            <Skeleton className="h-1/4 w-full" />
                            <Skeleton className="h-2/4 w-full" />
                            <Skeleton className="h-1/4 w-full" />
                        </div>
                    ) : (
                        <div
                            className={cn(
                                'col-span-3 hidden h-[calc(100vh-50px)] lg:block', // Adjust height based on your layout
                                selectedJobId ? 'sticky top-4' : 'relative' // Sticky when a job is selected
                            )}
                        >
                            {jobDetails && data?.data && data?.data.length > 0 && <JobQuickView job={jobDetails} />}
                        </div>
                    )}
                </div>
            ) : (
                <p className="text-center text-sm text-gray-700">There are no available jobs.</p>
            )}

            {/* For filter jobs */}
            <FilterMyJobs
                open={showFilter}
                onOpenChange={setShowFilter}
                filters={filters}
                onApplyFilters={handleApplyFilters}
            />

            <div>
                <SimplePagination meta={data?.meta || defaultMeta} onPageChange={setPage} />
            </div>
        </div>
    );
}
