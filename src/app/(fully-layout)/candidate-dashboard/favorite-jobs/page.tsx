'use client';

import React, { Fragment, Suspense, useState } from 'react';
import { PrimaryPagination } from '@/components/ui/pagination';
import { useSearchParams } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryKey } from '@/lib/react-query/keys';
import { JobService } from '@/services/job.service';
import { DetailedRequest, Meta } from '@/types';
import { Separator } from '@/components/ui/separator';
import { handleErrorToast } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'react-toastify';
import CardJobHorizontal from '@/components/custom-ui/card-job-horizontal';

const ITEM_PER_PAGE = 10;

export default function JobWishListPage() {
    return (
        <Suspense fallback={<span>Loading...</span>}>
            <PageContent />
        </Suspense>
    );
}

function PageContent() {
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
                const payload = await JobService.getFavoriteJobs(queryKey[1] as DetailedRequest.Pagination);
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

    const removeFavoriteJobMutation = useMutation({
        mutationFn: async ({ jobId }: { jobId: string }) => {
            try {
                await JobService.removeFavoriteJob({ jobId });
                await refetch();
            } catch (error: any) {
                handleErrorToast(error);
            }
        },
        onSuccess: () => {
            toast.success('Job added to favorite list');
        },
        onError: () => {
            toast.error('Failed to add job to favorite list');
        },
    });

    return (
        <div className="min-h-[500px] flex flex-col justify-between p-6 md:pt-12 md:pl-12 md:pb-12 md:pr-0 space-y-2">
            <div>
                <div className="flex items-center">
                    <h5 className="text-lg text-gray-900 font-medium">Favorite Jobs</h5>&nbsp;
                    <span className="text-base text-gray-400 font-normal">({resultQuery?.meta.itemCount})</span>
                </div>
                <div className="space-y-2">
                    {isPending
                        ? [...Array(ITEM_PER_PAGE)].map((_, i) => (
                              <div key={i} className="flex items-center space-x-2">
                                  <Skeleton className="h-56 w-56 lg:h-28 lg:w-30 rounded-sm" />
                                  <div className="space-y-2 h-56 lg:h-28 flex-1 flex flex-col">
                                      <Skeleton className="h-9 w-full" />
                                      <Skeleton className="flex-1 w-full" />
                                  </div>
                              </div>
                          ))
                        : resultQuery?.data.map((job) => (
                              <Fragment key={job.jobId}>
                                  <CardJobHorizontal
                                      job={job}
                                      handleUnMark={() => removeFavoriteJobMutation.mutate({ jobId: job.jobId })}
                                      mark={true}
                                      showMarkButton={true}
                                  />
                                  <Separator />
                              </Fragment>
                          ))}
                </div>
            </div>
            {Number(totalPages) > 1 && (
                <div>
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
    );
}
