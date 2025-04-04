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
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">
                    My Jobs&nbsp;
                    <span className="text-gray-500 text-lg">({data?.meta?.itemCount || 0})</span>
                </h1>
            </div>
            {/* Search bar */}
            <div className="flex items-center flex-wrap gap-2">
                <div
                    className="h-12 flex-1 flex items-center border border-primary-100 rounded-sm 
                            focus-within:border-primary focus-within:ring-1 focus-within:ring-primary"
                >
                    <label htmlFor={inputId} className="p-2">
                        <HiMiniMagnifyingGlass className="size-6 text-primary" />
                    </label>
                    <Input
                        type="search"
                        id={inputId}
                        value={search}
                        onChange={handleSearch}
                        className="flex-1 h-12 border-none shadow-none focus-visible:ring-0 text-sm font-normal"
                        placeholder="Job title, tags..."
                    />
                </div>

                <Select value={sortBy} onValueChange={handleOrderChange}>
                    <SelectTrigger
                        className={clsx(
                            'max-w-40 h-12 rounded-sm border border-primary-100 focus:border-primary focus:ring-1 focus:ring-primary'
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
                    className="shadow-none min-h-12 text-sm max-h-10 text-gray-900"
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
                        />
                    </div>
                    {/* Job quick view details */}
                    {isPendingQuerySpecifiedJob ? (
                        <div className="flex flex-col lg:col-span-3 h-full gap-2">
                            <Skeleton className="w-full h-1/4" />
                            <Skeleton className="w-full h-2/4" />
                            <Skeleton className="w-full h-1/4" />
                        </div>
                    ) : (
                        <div
                            className={cn(
                                'hidden lg:block col-span-3 h-[calc(100vh-50px)]', // Adjust height based on your layout
                                selectedJobId ? 'sticky top-4' : 'relative' // Sticky when a job is selected
                            )}
                        >
                            {jobDetails && data?.data && data?.data.length > 0 && <JobQuickView job={jobDetails} />}
                        </div>
                    )}
                </div>
            ) : (
                <p className="text-center text-gray-700 text-sm">There are no available jobs.</p>
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
