'use client';
import CardCandidateHorizontal from '@/components/custom-ui/card-candidate-horizontal';
import FilterSidebar from '@/components/custom-ui/filter-search-candidates';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AnimatePresence, motion } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

export default function ListCandidates() {
    const [showFilter, setShowFilter] = useState(false);
    const [option, setOption] = useState('ASC');
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [filters, setFilters] = useState({
        maritalStatus: undefined,
        categories: [] as string[],
        gender: undefined,
    });

    const handleFilterChange = (filterName: string, value: any) => {
        setFilters({
            ...filters,
            [filterName]: value,
        });
    };
    const toggleFilterSidebar = () => {
        setShowFilter((prev) => !prev);
    };
    return (
        <main className="min-h-dvh bg-white">
            <div className="flex flex-col md:flex-row  justify-between items-center max-w-screen-xl mx-auto mb-6 mt-6 gap-5">
                <div className="flex md:flex-col">
                    <Button
                        type="submit"
                        variant="primary"
                        className="text-white w-full md:w-[130px] rounded-sm text-[16px]"
                        onClick={toggleFilterSidebar}
                    >
                        <SlidersHorizontal />
                        Filter
                    </Button>
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
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start max-w-screen-xl mx-auto mb-6 mt-6 gap-5">
                {showFilter && (
                    <div className="w-full md:w-64">
                        <AnimatePresence>
                            <motion.div
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.3 }}
                                className="border rounded-md p-4"
                            >
                                <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                )}
                <div className={`w-full ${showFilter ? 'md:w-[calc(100%-16rem)]' : 'md:w-full'}`}>
                    <CardCandidateHorizontal
                        perPage={itemsPerPage || 6}
                        option={option}
                        maritalStatus={filters?.maritalStatus}
                        gender={filters?.gender}
                        categories={filters.categories}
                    />
                </div>
            </div>
        </main>
    );
}
