'use client';
import CardCandidateHorizontal from '@/components/custom-ui/card-candidate-horizontal';
import FilterSidebarCandidate, {
    defaultFiltersSidebar,
    FilterValuesSidebar,
} from '@/components/custom-ui/local/filter-candidate';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

export default function ListCandidates() {
    const [showFilter, setShowFilter] = useState(false);
    const [option, setOption] = useState('ASC');
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [filters, setFilters] = useState<FilterValuesSidebar>({ ...defaultFiltersSidebar });
    const [refetchFn, setRefetchFn] = useState<(() => void) | null>(null);

    // Handle applying filters
    const handleApplyFilters = (newFilters: FilterValuesSidebar) => {
        setFilters(newFilters);
        if (refetchFn) {
            refetchFn();
        }
    };

    return (
        <main className="min-h-dvh bg-white">
            <div className="flex flex-col md:flex-row justify-between items-center max-w-screen-xl mx-auto mb-6 mt-6 gap-5">
                <div className="flex md:flex-col">
                    <Button
                        type="submit"
                        variant="primary"
                        className="text-white w-full md:w-[130px] rounded-sm text-[16px]"
                        onClick={() => setShowFilter((prev) => !prev)}
                    >
                        <SlidersHorizontal />
                        Filter
                    </Button>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <Select onValueChange={(value) => setOption(value)}>
                        <SelectTrigger className="text-sm border-[1px] rounded-md px-2 py-1.5 h-[48px] w-[180px] bg-[#FFFFFF] focus:ring-0 focus:ring-offset-0">
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
                </div>
                <FilterSidebarCandidate
                    open={showFilter}
                    onOpenChange={setShowFilter}
                    filters={filters}
                    onApplyFilters={handleApplyFilters}
                />
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start max-w-screen-xl mx-auto mb-6 mt-6 gap-5">
                <div className="w-full">
                    <CardCandidateHorizontal
                        perPage={itemsPerPage || 6}
                        option={option}
                        maritalStatus={filters.maritalStatus === 'all' ? undefined : filters.maritalStatus}
                        gender={filters.gender === 'all' ? undefined : filters.gender}
                        categories={filters.categories.length ? filters.categories : undefined}
                        onRefetch={(refetch) => setRefetchFn(() => refetch)}
                    />
                </div>
            </div>
        </main>
    );
}
