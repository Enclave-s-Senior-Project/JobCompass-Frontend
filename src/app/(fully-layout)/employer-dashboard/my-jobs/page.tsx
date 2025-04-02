'use client';

import { JobsList } from '@/components/custom-ui/job-list';
import { queryKey } from '@/lib/react-query/keys';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useId, useState } from 'react';
import clsx from 'clsx';
import CountUp from 'react-countup';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { handleErrorToast } from '@/lib/utils';
import { EnterpriseService } from '@/services/enterprises.service';
import { PrimaryPagination } from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';
import { Button } from '@/components/ui/button';
import { ChevronDown, ListFilterPlus } from 'lucide-react';
import { FilterMyJobs, FilterValues, defaultFilters } from '@/components/custom-ui/local/filter-my-jobs';
import { useDebounce } from '@/hooks/useDebounce';

type OrderByType = 'latest' | 'oldest' | 'deadline' | 'boosted';

const orderByOptions: Array<{ label: string; value: OrderByType }> = [
    { label: 'Latest', value: 'latest' },
    { label: 'Oldest', value: 'oldest' },
    { label: 'Deadline', value: 'deadline' },
    { label: 'Boosted', value: 'boosted' },
];

export default function JobsPage() {
    const [showFilter, setShowFilter] = useState(false);
    const [sortBy, setSortBy] = useState<OrderByType>('latest');
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState<FilterValues>({ ...defaultFilters });
    const [pagination, setPagination] = useState({
        page: 1,
        take: 5,
    });

    const searchDebounced = useDebounce(search, 700);

    const inputId = useId();

    // Handle applying filters
    const handleApplyFilters = (newFilters: FilterValues) => {
        setFilters(newFilters);
        // Reset to first page when filters change
        setPagination((prev) => ({ ...prev, page: 1 }));
    };

    // Get jobs with filters
    const { data, isLoading } = useQuery({
        queryKey: [queryKey.ownEnterpriseJobs, filters, sortBy, searchDebounced, pagination],
        queryFn: () => {
            try {
                return EnterpriseService.getOwnJobs({
                    ...pagination,
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
        retry: 2,
    });

    // Handle search
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPagination((prev) => ({ ...prev, page: 1 }));
    };

    // Handle order change
    const handleOrderChange = (value: OrderByType) => {
        setSortBy(value);
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">
                    My Jobs&nbsp;
                    <span className="text-gray-500 text-lg">
                        (<CountUp start={0} end={data?.meta.itemCount || 0} duration={2.5} separator="," />)
                    </span>
                </h1>
            </div>
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

            <JobsList jobs={data?.data || []} isLoading={isLoading} />

            {/* Pagination */}
            {data?.meta && data?.meta.pageCount > 1 && (
                <div className="bg-white px-4 py-3 flex items-center justify-between border-gray-200 sm:px-6 mt-4">
                    <PrimaryPagination meta={data?.meta} pagination={pagination} totalPages={data?.meta.pageCount} />
                </div>
            )}

            <FilterMyJobs
                open={showFilter}
                onOpenChange={setShowFilter}
                filters={filters}
                onApplyFilters={handleApplyFilters}
            />
        </div>
    );
}
