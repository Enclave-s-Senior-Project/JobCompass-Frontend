'use client';
import CardCandidateHorizontal from '@/components/custom-ui/card-candidate-horizontal';
import FilterSidebarCandidate, {
    defaultFiltersSidebar,
    FilterValuesSidebar,
} from '@/components/custom-ui/local/filter-candidate';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DetailedRequest } from '@/types';
import { SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ListCandidates() {
    const [showFilter, setShowFilter] = useState(false);
    const [option, setOption] = useState<'ASC' | 'DESC'>('ASC');
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [filters, setFilters] = useState<FilterValuesSidebar & DetailedRequest.Pagination>({
        ...defaultFiltersSidebar,
    });

    // Handle applying filters
    const handleApplyFilters = (newFilters: FilterValuesSidebar) => {
        setFilters(newFilters);
    };

    useEffect(() => {
        setFilters((prev) => ({ ...prev, order: option }));
    }, [option]);

    return (
        <main className="min-h-dvh bg-white">
            <div className="mx-auto mb-6 mt-6 flex max-w-screen-xl flex-col items-center justify-between gap-5 md:flex-row">
                <div className="flex md:flex-col">
                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full rounded-sm text-[16px] text-white md:w-[130px]"
                        onClick={() => setShowFilter((prev) => !prev)}
                    >
                        <SlidersHorizontal />
                        Filter
                    </Button>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <Select onValueChange={(value: 'ASC' | 'DESC') => setOption(value)}>
                        <SelectTrigger className="h-[48px] w-[180px] rounded-md border-[1px] bg-[#FFFFFF] px-2 py-1.5 text-sm focus:ring-0 focus:ring-offset-0">
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
                        <SelectTrigger className="h-[48px] w-[180px] rounded-md border bg-[#FFFFFF] px-2 py-1.5 text-sm focus:ring-0 focus:ring-offset-0">
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
                </div>
                <FilterSidebarCandidate
                    open={showFilter}
                    onOpenChange={setShowFilter}
                    filters={filters}
                    onApplyFilters={handleApplyFilters}
                />
            </div>

            <div className="mx-auto mb-6 mt-6 flex max-w-screen-xl flex-col items-start justify-between gap-5 md:flex-row">
                <div className="w-full">
                    <CardCandidateHorizontal
                        perPage={itemsPerPage || 6}
                        order={option}
                        maritalStatus={filters.maritalStatus === 'all' ? undefined : filters.maritalStatus}
                        gender={filters.gender === 'all' ? undefined : filters.gender}
                        categories={filters.categories.length ? filters.categories : undefined}
                    />
                </div>
            </div>
        </main>
    );
}
