'use client';

import dynamic from 'next/dynamic';
import { queryKey } from '@/lib/react-query/keys';
import { handleErrorToast } from '@/lib/utils';
import { ApplyJobService } from '@/services/apply-job.service';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { DetailedRequest, Meta } from '@/types';
import { PrimaryPagination } from '@/components/ui/pagination';
import { useSearchParams } from 'next/navigation';
import { AppliedJobList } from '@/components/custom-ui/local/applied-job-list';
import { useMemo } from 'react';

// Lazy load mobile job list as it's not critical for desktop users
const AppliedJobListMobile = dynamic(() => import('@/components/custom-ui/local/applied-job-list-mobile'), {
    ssr: false,
});

export default function AppliedJobPage() {
    const search = useSearchParams();
    const pagination: DetailedRequest.Pagination = useMemo(
        () => ({
            page: Number(search.get('page') || 1),
            order: 'ASC',
            take: 5,
        }),
        [search]
    );

    const { data, isPending } = useQuery({
        queryKey: [queryKey.appliedJob, pagination],
        queryFn: async ({ queryKey }) => {
            try {
                return await ApplyJobService.getOwnAppliedJobs(queryKey[1] as DetailedRequest.Pagination);
            } catch (error) {
                handleErrorToast(error);
            }
        },
        staleTime: 1000 * 60 * 5, // Increase stale time to reduce fetches,
        placeholderData: keepPreviousData,
    });

    return (
        <div className="flex min-h-[500px] flex-col justify-between space-y-2">
            <div className="space-y-5">
                <div className="flex items-center">
                    <h5 className="text-lg font-medium text-gray-900">Applied Jobs</h5>&nbsp;
                    <span className="text-base font-normal text-gray-400">({data?.meta.itemCount || 0})</span>
                </div>
                <div>
                    <AppliedJobList items={data?.data || []} isPending={isPending} />
                    <AppliedJobListMobile items={data?.data || []} isPending={isPending} />
                </div>
            </div>
            {Number(data?.meta?.pageCount) > 1 && (
                <PrimaryPagination
                    meta={data?.meta as Meta}
                    pagination={{
                        page: pagination.page,
                        order: pagination.order || 'ASC',
                    }}
                    totalPages={data?.meta?.pageCount || 0}
                />
            )}
        </div>
    );
}
