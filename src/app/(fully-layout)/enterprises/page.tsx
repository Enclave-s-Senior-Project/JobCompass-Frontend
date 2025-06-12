'use client';
import { CardListEnterprise } from '@/components/custom-ui/local/list-enterprise/card-list-enterprise';
import {
    defaultFiltersSidebarEnterprise,
    FilterListEnterprise,
    FilterValuesSidebarEnterprise,
} from '@/components/custom-ui/local/list-enterprise/filter-list-enterprise';
import { PrimaryPagination } from '@/components/ui/pagination';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDebounce } from '@/hooks/useDebounce';
import { queryKey } from '@/lib/react-query/keys';
import { handleErrorToast } from '@/lib/utils';
import { EnterpriseService } from '@/services/enterprises.service';
import { DetailedRequest, Meta } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function Enterprises() {
    const [totalPages, setTotalPages] = useState(0);
    const [name, setName] = useState<string>('');
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [filters, setFilters] = useState<FilterValuesSidebarEnterprise & DetailedRequest.Pagination>({
        ...defaultFiltersSidebarEnterprise,
    });
    const search = useSearchParams();
    const page = Number(search.get('page') || 1);
    const debouncedName = useDebounce(name, 500);
    // Handle applying filters
    const handleApplyFilters = (newFilters: FilterValuesSidebarEnterprise) => {
        setFilters(newFilters);
    };
    const { data: resultQuery, isPending } = useQuery({
        queryKey: [
            queryKey.favoriteJobs,
            {
                page,
                take: itemsPerPage,
                name: debouncedName,
                organizationType: filters.enterpriseTypes ? filters.enterpriseTypes : undefined,
                address: filters.locations ? filters.locations : undefined,
            },
        ],
        queryFn: async ({ queryKey }) => {
            try {
                const payload = await EnterpriseService.getListEnterprise(queryKey[1] as DetailedRequest.Pagination);
                if (Number(payload?.meta.pageCount) > 0) setTotalPages(Number(payload?.meta.pageCount) || 0);
                return payload;
            } catch (error: any) {
                handleErrorToast(error);
            }
        },
        staleTime: 1000 * 60,
        refetchInterval: 1000 * 60,
        retry: 2,
        enabled: true,
    });
    return (
        <div className="container mx-auto max-w-screen-xl">
            <main className="py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col gap-6 md:flex-row">
                        {/* Sidebar Filters */}
                        <FilterListEnterprise onApplyFilters={handleApplyFilters} />
                        <div className="flex-1">
                            <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
                                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-800">Enterprise Listings</h2>
                                        <p className="text-sm text-slate-500">
                                            Showing {resultQuery?.data.length || 0} results
                                        </p>
                                    </div>
                                    <div className="flex w-full flex-col gap-4 sm:flex-row md:w-auto">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-slate-500">Search:</span>
                                            <input
                                                type="text"
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Search by name"
                                                className="h-[40px] w-[170px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 hover:border-slate-300 focus:outline-none focus:ring-0"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-slate-500">Show:</span>
                                            <Select onValueChange={(value) => setItemsPerPage(Number(value))}>
                                                <SelectTrigger className="h-[40px] w-[140px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 hover:border-slate-300 focus:ring-0 focus:ring-offset-0">
                                                    <SelectValue placeholder={`${itemsPerPage} per page`} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup className="space-y-1 py-2">
                                                        <SelectItem value="2">2 per page</SelectItem>
                                                        <SelectItem value="4">4 per page</SelectItem>
                                                        <SelectItem value="6">6 per page</SelectItem>
                                                        <SelectItem value="8">8 per page</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <CardListEnterprise enterprise={resultQuery?.data || []} isPending={isPending} />
                            {resultQuery?.data && resultQuery.data.length > 0 && (
                                <div className="pt-4">
                                    <PrimaryPagination
                                        meta={resultQuery?.meta as Meta}
                                        pagination={{
                                            page,
                                        }}
                                        totalPages={totalPages}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
