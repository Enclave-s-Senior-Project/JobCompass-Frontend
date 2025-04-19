'use client';

import React, { Fragment, Suspense, useState } from 'react';
import { PrimaryPagination } from '@/components/ui/pagination';
import { useSearchParams } from 'next/navigation';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { queryKey } from '@/lib/react-query/keys';
import { JobService } from '@/services/job.service';
import { DetailedRequest, Meta } from '@/types';
import { handleErrorToast } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import CardJobHorizontal from '@/components/custom-ui/card-job-horizontal';
import { toast } from '@/lib/toast';

const ITEM_PER_PAGE = 5;

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
        retry: 2,
        enabled: true,
        placeholderData: keepPreviousData,
    });

    const removeFavoriteJobMutation = useMutation({
        mutationFn: async ({ jobId }: { jobId: string }) => {
            await JobService.removeFavoriteJob({ jobId });
            await refetch();
        },
        onSuccess: () => {
            toast.success('Job added to favorite list');
        },
        onError: (error) => {
            handleErrorToast(error);
        },
    });

    return (
        <div className="flex min-h-[500px] flex-col justify-between space-y-2">
            <div className="space-y-4">
                <div className="flex items-center">
                    <h5 className="text-lg font-medium text-gray-900">Favorite Jobs</h5>&nbsp;
                    <span className="text-base font-normal text-gray-400">({resultQuery?.meta?.itemCount})</span>
                </div>
                <div className="space-y-2">
                    {isPending
                        ? [...Array(ITEM_PER_PAGE)].map((_, i) => (
                              <div key={i} className="flex items-center space-x-2">
                                  <Skeleton className="lg:w-30 h-56 w-56 rounded-sm lg:h-28" />
                                  <div className="flex h-56 flex-1 flex-col space-y-2 lg:h-28">
                                      <Skeleton className="h-9 w-full" />
                                      <Skeleton className="w-full flex-1" />
                                  </div>
                              </div>
                          ))
                        : resultQuery?.data.map((job) => (
                              <Fragment key={job.jobId}>
                                  <CardJobHorizontal
                                      job={job}
                                      handleUnMark={() => removeFavoriteJobMutation.mutate({ jobId: job?.jobId })}
                                      mark={true}
                                      showMarkButton={true}
                                  />
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
