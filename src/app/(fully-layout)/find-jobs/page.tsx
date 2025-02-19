'use client';
import { useEffect, useState } from 'react';
import { LayoutGrid, List, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchForm from '@/components/custom-ui/search-bar';
import { DetailedRequest } from 'api-types';
import JobCard from '@/components/custom-ui/job-card';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const jobs = [
    {
        company: 'Reddit',
        logo: '/next.svg',
        title: 'Marketing Officer',
        location: 'United Kingdom of Great Britain',
        type: 'Full Time',
        salary: '$50k-$70k',
        applicants: 'test',
        featured: true,
    },
    // Add more job listings...
];
export default function Page() {
    const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
    const [activeFilters, setActiveFilters] = useState<DetailedRequest.SearchFilterListJobsCredentials>({
        keyword: '',
        location: '',
        category: '',
        advance: '',
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    // Calculate pagination
    const totalPages = Math.ceil(jobs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentJobs = jobs.slice(startIndex, endIndex);

    // Generate page numbers
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    const handleSearch = (filters: DetailedRequest.SearchFilterListJobsCredentials) => {
        setActiveFilters(filters);
        setCurrentPage(1);
    };

    const removeFilter = (key: keyof DetailedRequest.SearchFilterListJobsCredentials) => {
        setActiveFilters((prev) => ({
            ...prev,
            [key]: '',
        }));
    };

    useEffect(() => {
        console.log('so luong', jobs.length, totalPages);
    }, []);
    return (
        <main className="min-h-screen bg-white">
            <SearchForm onSearch={handleSearch} />
            <div className="flex flex-col md:flex-row justify-between items-center max-w-screen-xl mx-auto mb-6 mt-6 gap-28">
                {/* Div bên trái */}
                <div className="flex flex-wrap items-center gap-2">
                    {Object.entries(activeFilters).map(([key, value]) => {
                        if (!value) return null;
                        return (
                            <Button
                                key={key}
                                variant="outline"
                                size="sm"
                                className="rounded-[30px]"
                                onClick={() =>
                                    removeFilter(key as keyof DetailedRequest.SearchFilterListJobsCredentials)
                                }
                            >
                                {value}
                                <span className="ml-1 text-xs bg-gray-100 px-1.5 py-0.5 rounded-full">×</span>
                            </Button>
                        );
                    })}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <Select>
                        <SelectTrigger className="text-sm border-[1px] rounded-md px-2 py-1.5 h-[48px] w-[180px] bg-[#FFFFFF] focus:ring-0 focus:ring-offset-0">
                            <SelectValue placeholder="Lastest" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="Lastest">Lastest</SelectItem>
                                <SelectItem value="Oldest">Oldest</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="text-sm border rounded-md px-2 py-1.5 h-[48px] w-[180px] bg-[#FFFFFF] focus:ring-0 focus:ring-offset-0">
                            <SelectValue placeholder="12 per page" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="12">12 per page</SelectItem>
                                <SelectItem value="24">24 per page</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <div className="flex items-center justify-center border rounded-md h-[48px] w-[88px]">
                        <Button
                            variant="ghost"
                            size="sm"
                            className={`px-2 h-[32px] w-[32px] ${viewType === 'grid' ? 'bg-gray-100' : ''}`}
                            onClick={() => setViewType('grid')}
                        >
                            <LayoutGrid className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className={`px-2 h-[32px] w-[32px] ${viewType === 'list' ? 'bg-gray-100' : ''}`}
                            onClick={() => setViewType('list')}
                        >
                            <List className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <div className={viewType === 'grid' ? 'flex items-center justify-center' : ''}>
                <div className={viewType === 'grid' ? 'container mx-auto max-w-screen-xl' : ''}>
                    <div
                        className={
                            viewType === 'grid'
                                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 place-items-center'
                                : 'flex flex-col place-items-center gap-y-6'
                        }
                    >
                        {currentJobs.map((job) => (
                            <JobCard job={job} viewType={viewType} />
                        ))}
                    </div>
                </div>
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center mt-8 pb-6">
                    <nav className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full w-10 h-10"
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>

                        {getPageNumbers().map((page) => (
                            <Button
                                key={page}
                                variant={page === currentPage ? 'default' : 'outline'}
                                size="icon"
                                className="rounded-full w-10 h-10"
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </Button>
                        ))}

                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full w-10 h-10"
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </nav>
                </div>
            )}
        </main>
    );
}
