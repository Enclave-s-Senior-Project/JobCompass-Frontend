'use client';

import { DetailedRequest } from '@/types';
import { JobCardTwoType } from './card-job-two-type';
import { useState } from 'react';
import * as services from '@/services/job.service';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

export default function ListCardJobs(props: { viewType: 'list' | 'grid' }) {
    const [currentPage, setCurrentPage] = useState(1);
    const take = 1;
    const {
        isLoading,
        data: jobCards = {
            data: [],
            meta: {
                page: '0',
                take: '0',
                itemCount: 0,
                pageCount: 0,
                hasPreviousPage: false,
                hasNextPage: false,
            },
        },
    } = useQuery({
        queryKey: ['list-card', { order: 'DESC', page: currentPage, take, option: '' }],
        queryFn: async ({ queryKey }) => {
            try {
                const temp = await services.JobService.getAllJobs(
                    queryKey[1] as DetailedRequest.ParamListJobsCredentials
                );
                return temp.value;
            } catch (error) {
                console.log(error);
            }
        },
        // staleTime: 1 * 60 * 1000,
        enabled: true,
        retry: 2,
    });
    const { viewType } = props;
    const totalPages = jobCards?.meta?.pageCount || 1;

    return (
        <div className={viewType === 'grid' ? 'flex items-center justify-center' : ''}>
            <div className={viewType === 'grid' ? 'container mx-auto max-w-screen-xl' : ''}>
                {isLoading ? (
                    <div className="flex justify-center items-center min-h-[50vh]">
                        <Skeleton className="w-[424px] h-[204px] rounded-full" />
                    </div>
                ) : (
                    <div
                        className={
                            viewType === 'grid'
                                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 place-items-center'
                                : 'flex flex-col place-items-center gap-y-6'
                        }
                    >
                        {jobCards?.data.map((job, index) => (
                            <JobCardTwoType job={job} viewType={viewType} key={index} />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-8 pb-6">
                        <nav className="flex items-center gap-2">
                            <button
                                className="rounded-full w-10 h-10 flex items-center justify-center border border-gray-300 bg-white disabled:opacity-50"
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors ${
                                        page === currentPage
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-transparent text-gray-700 hover:bg-gray-200'
                                    }`}
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                className="rounded-full w-10 h-10 flex items-center justify-center border border-gray-300 bg-white disabled:opacity-50"
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </nav>
                    </div>
                )}
            </div>
        </div>
    );
}
