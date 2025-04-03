'use client';

import { JobsList } from '@/components/custom-ui/job-list';
import { queryKey } from '@/lib/react-query/keys';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useId, useState } from 'react';
import clsx from 'clsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { handleErrorToast } from '@/lib/utils';
import { EnterpriseService } from '@/services/enterprises.service';
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronLeft, ChevronRight, ListFilterPlus } from 'lucide-react';
import { FilterMyJobs, FilterValues, defaultFilters } from '@/components/custom-ui/local/filter-my-jobs';
import { useDebounce } from '@/hooks/useDebounce';
import { Meta } from '@/types';

type OrderByType = 'latest' | 'oldest' | 'deadline' | 'boosted';

const orderByOptions: Array<{ label: string; value: OrderByType }> = [
    { label: 'Latest', value: 'latest' },
    { label: 'Oldest', value: 'oldest' },
    { label: 'Deadline', value: 'deadline' },
    { label: 'Boosted', value: 'boosted' },
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
    const [sortBy, setSortBy] = useState<OrderByType>('latest');
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState<FilterValues>({ ...defaultFilters });
    const [page, setPage] = useState(1);

    const searchDebounced = useDebounce(search, 700);

    const inputId = useId();

    // Handle applying filters
    const handleApplyFilters = (newFilters: FilterValues) => {
        setFilters(newFilters);
        // Reset to first page when filters change
    };

    // Get jobs with filters
    const { data, isPending } = useQuery({
        queryKey: [queryKey.ownEnterpriseJobs, filters, sortBy, searchDebounced, page],
        queryFn: async () => {
            try {
                return await EnterpriseService.getOwnJobs({
                    page: page,
                    take: LIMIT_ITEMS,
                    jobType: filters.jobType,
                    jobStatus: filters.jobStatus,
                    jobLocation: filters.jobLocation,
                    jobExperience: filters.jobExperience,
                    jobBoost: filters.jobBoost,
                    search: searchDebounced || '',
                    sort: sortBy,
                });
            } catch (error) {
                console.error('Error fetching my jobs(enterprise):', error);
                handleErrorToast(error);
            }
        },
        placeholderData: keepPreviousData,
        retry: 2,
    });

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
                <Button
                    variant="outline-secondary"
                    size="md"
                    onClick={() => setShowFilter((prev) => !prev)}
                    className="shadow-none min-h-12 text-sm max-h-10 text-gray-900"
                >
                    <ListFilterPlus />
                    Filter <ChevronDown className={clsx('transition-all', showFilter ? 'rotate-90' : '-rotate-90')} />
                </Button>
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
            </div>

            <div>
                <SimplePagination meta={data?.meta || defaultMeta} onPageChange={setPage} />
            </div>

            <div className="grid grid-cols-5 gap-2">
                <div className="col-span-2">
                    <JobsList jobs={data?.data || []} isLoading={isPending} />
                </div>
                <div className="quick-show-single-job-details sticky col-span-3 bg-warning-50 h-full rounded-md">
                    
                </div>
            </div>

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

const SimplePagination = ({
    meta,
    onPageChange,
}: {
    meta: Meta;
    onPageChange: React.Dispatch<React.SetStateAction<number>>;
}) => {
    const handleNextPage = () => {
        if (meta.hasNextPage) {
            onPageChange((page) => page + 1);
        }
    };

    const handleBackPage = () => {
        if (meta.hasPreviousPage) {
            onPageChange((page) => page - 1);
        }
    };

    return (
        <Pagination className="justify-start">
            <PaginationContent className="gap-1">
                <PaginationItem>
                    <Button
                        size="icon-md"
                        variant="outline-secondary"
                        onClick={handleBackPage}
                        disabled={!meta.hasPreviousPage}
                    >
                        <ChevronLeft />
                    </Button>
                </PaginationItem>
                <PaginationItem>
                    <Button
                        size="icon-md"
                        variant="outline-secondary"
                        onClick={handleNextPage}
                        disabled={!meta.hasNextPage}
                    >
                        <ChevronRight />
                    </Button>
                </PaginationItem>
                <PaginationItem>
                    <p className="text-nowrap text-sm italic text-gray-600">
                        {meta.page} of {meta.pageCount} pages
                    </p>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};
