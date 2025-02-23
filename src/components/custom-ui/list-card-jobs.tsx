'use client';

import { DetailedRequest, Meta } from '@/types';
import { JobCardTwoType } from './card-job-two-type';
import { useState } from 'react';
import * as services from '@/services/job.service';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight, FileX } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { useSearchParams } from 'next/navigation';
import { queryKey } from '@/lib/react-query/keys';
import { handleErrorToast } from '@/lib/utils';
import { PrimaryPagination } from '../ui/pagination';

const ITEM_PER_PAGE = 2;
export default function ListCardJobs(props: { viewType: 'list' | 'grid' }) {
    const [totalPages, setTotalPages] = useState(0);
    const search = useSearchParams();
    const page = Number(search.get('page') || 1);
    const order = (search.get('order')?.toUpperCase() as 'ASC' | 'DESC') || 'ASC';
    const {
        refetch,
        data: resultQuery,
        isPending,
    } = useQuery({
        queryKey: [queryKey.favoriteJobs, { order, page, take: ITEM_PER_PAGE }],
        queryFn: async ({ queryKey }) => {
            try {
                const payload = await services.JobService.getAllJobs(queryKey[1] as DetailedRequest.Pagination);
                if (Number(payload?.meta.pageCount) > 0) setTotalPages(Number(payload?.meta.pageCount) || 0);
                return payload;
            } catch (error: any) {
                handleErrorToast(error);
            }
        },
        staleTime: 1000 * 60, // 1 minute
        refetchInterval: 1000 * 60, // 1 minute
        retry: 2,
        enabled: true,
    });
    const { viewType } = props;

    return (
        <div className={viewType === 'grid' ? 'flex items-center justify-center' : ''}>
            <div className={viewType === 'grid' ? 'container mx-auto max-w-screen-xl' : ''}>
                {isPending ? (
                    [...Array(ITEM_PER_PAGE)].map((_, i) => (
                        <div key={i} className="flex items-center space-x-2">
                            <Skeleton className="h-56 w-56 lg:h-28 lg:w-30 rounded-sm" />
                            <div className="space-y-2 h-56 lg:h-28 flex-1 flex flex-col">
                                <Skeleton className="h-9 w-full" />
                                <Skeleton className="flex-1 w-full" />
                            </div>
                        </div>
                    ))
                ) : !resultQuery?.data?.length ? (
                    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
                        <FileX className="h-16 w-16 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold text-foreground mb-2">No jobs found</h3>
                        <p className="text-muted-foreground max-w-[500px]">
                            Currently, there are no jobs posted. Please check back later or try searching with different
                            criteria.
                        </p>
                    </div>
                ) : (
                    <div
                        className={
                            viewType === 'grid'
                                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 place-items-center'
                                : 'flex flex-col place-items-center gap-y-6'
                        }
                    >
                        {resultQuery.data.map((job, index) => (
                            <JobCardTwoType job={job} viewType={viewType} key={index} refetch={refetch} />
                        ))}
                    </div>
                )}
                {/* Pagination */}
                {Number(totalPages) > 1 && (
                    <div className="pt-5">
                        <PrimaryPagination
                            meta={resultQuery?.meta as Meta}
                            pagination={{
                                page,
                                order,
                            }}
                            totalPages={totalPages}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
