'use client';

import { queryKey } from '@/lib/react-query/keys';
import { handleErrorToast } from '@/lib/utils';
import { ApplyJobService } from '@/services/apply-job.service';
import { useQuery } from '@tanstack/react-query';
import { DetailedRequest, Meta } from '@/types';
import { PrimaryPagination } from '@/components/ui/pagination';
import { useSearchParams } from 'next/navigation';
import { AppliedJobList } from '@/components/custom-ui/local/applied-job-list';
import { AppliedJobListMobile } from '@/components/custom-ui/local/applied-job-list-mobile';

export default function AppliedJobPage() {
    const search = useSearchParams();
    const pagination: DetailedRequest.Pagination = {
        page: Number(search.get('page') || 1),
        order: 'ASC',
        take: 5,
    };
    const { data, isPending } = useQuery({
        queryKey: [queryKey.appliedJob, pagination],
        queryFn: async ({ queryKey }) => {
            try {
                return await ApplyJobService.getOwnAppliedJobs(queryKey[1] as DetailedRequest.Pagination);
            } catch (error) {
                handleErrorToast(error);
            }
        },
        staleTime: 1000 * 60 * 2,
    });

    return (
        <div className="min-h-[500px] flex flex-col justify-between space-y-2">
            <div className="space-y-5">
                <div className="flex items-center">
                    <h5 className="text-lg text-gray-900 font-medium">Applied Jobs</h5>&nbsp;
                    <span className="text-base text-gray-400 font-normal">({data?.meta.itemCount})</span>
                </div>
                <div>
                    <div>
                        <AppliedJobList items={data?.data || []} isPending={isPending} />
                    </div>
                    <div>
                        <AppliedJobListMobile items={data?.data || []} isPending={isPending} />
                    </div>
                </div>
            </div>
            {Number(data?.meta?.pageCount) > 1 && (
                <div>
                    <PrimaryPagination
                        meta={data?.meta as Meta}
                        pagination={{
                            page: pagination.page,
                            order: pagination.order,
                        }}
                        totalPages={data?.meta?.pageCount || 0}
                    />
                </div>
            )}
        </div>
    );
}
