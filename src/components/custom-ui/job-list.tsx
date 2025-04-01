'use client';

import { useContext, useState, useMemo, useCallback } from 'react';
import JobItem from '@/components/custom-ui/job-item';
import { PrimaryPagination } from '@/components/ui/pagination';
import { queryKey } from '@/lib/react-query/keys';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { handleErrorToast } from '@/lib/utils';
import * as services from '@/services/enterprises.service';
import { DetailedRequest, Meta } from '@/types';
import { EnterpriseContext } from '@/contexts';
import { memo } from 'react';

// Memoize JobItem to prevent unnecessary re-renders
const MemoizedJobItem = memo(JobItem);

// Define props interface for JobsList
interface JobsListProps {
    jobStatus?: string; // Optional prop for filtering jobs
}

export default function JobsList({ jobStatus = 'All Jobs' }: JobsListProps) {
    const { enterpriseInfo } = useContext(EnterpriseContext);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
    const search = useSearchParams();
    const page = Number(search.get('page') || 1);
    let query: any = {};
    switch (jobStatus) {
        case 'All Jobs':
            break;
        case '1':
            query.status = true;
            break;
        case '2':
            query.status = false;
            break;
        case '3':
            query.deadline = false;
            break;
        default:
            query = {};
    }
    console.log('query', query);
    const { data: resultQuery } = useQuery({
        queryKey: [queryKey.jobsOfEnterprise, { page, take: 5, enterpriseId: enterpriseInfo?.enterpriseId, query }],
        queryFn: async ({ queryKey }) => {
            try {
                const params = queryKey[1];

                if (typeof params !== 'object' || !params.enterpriseId) {
                    throw new Error('Invalid query parameters');
                }

                const payload = await services.EnterpriseService.getAllJobsByEnterpriseId({
                    ...(params as DetailedRequest.ParamListJobsOfEnterprise),
                    query,
                });

                setTotalPages((prev) => {
                    const newTotal = Number(payload?.meta.pageCount ?? 0);
                    return newTotal !== prev ? newTotal : prev;
                });

                return payload;
            } catch (error: any) {
                handleErrorToast(error);
                return { data: [], meta: { pageCount: 0 } };
            }
        },
        staleTime: 1000 * 60,
        refetchInterval: 1000 * 60 * 5,
        retry: 2,
        enabled: Boolean(enterpriseInfo?.enterpriseId),
    });

    const toggleJobMenu = useCallback((jobId: number) => {
        setSelectedJobId((prev) => (prev === jobId ? null : jobId));
    }, []);

    const jobs = useMemo(() => {
        return Array.isArray(resultQuery?.data)
            ? resultQuery.data.map((job: any) => ({
                  jobId: job.jobId,
                  name: job.name,
                  type: job.type,
                  timeRemaining: job.status ? 'Active' : 'Expired',
                  status: job.status ? 'Active' : 'Expire',
                  applications: job.applicationCount,
              }))
            : [];
    }, [resultQuery?.data]);

    return (
        <div className="bg-gray-100 rounded-lg overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-12 bg-gray-100 py-4 px-6 text-sm text-gray-500 font-medium">
                <div className="col-span-4">JOBS</div>
                <div className="col-span-2 text-center">STATUS</div>
                <div className="col-span-3 text-center">APPLICATIONS</div>
                <div className="col-span-3 text-center">ACTIONS</div>
            </div>

            {/* Job List */}
            <div className="divide-y divide-gray-200">
                {jobs.length > 0 ? (
                    jobs.map((job) => (
                        <MemoizedJobItem
                            key={job.jobId}
                            job={job}
                            isMenuOpen={selectedJobId === job.jobId}
                            onToggleMenu={() => toggleJobMenu(job.jobId)}
                        />
                    ))
                ) : (
                    <div className="p-4 text-center text-gray-500">No jobs found</div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="bg-white px-4 py-3 flex items-center justify-between border-gray-200 sm:px-6">
                    <PrimaryPagination
                        meta={resultQuery?.meta as Meta}
                        pagination={{
                            page,
                            take: 5,
                        }}
                        totalPages={totalPages}
                    />
                </div>
            )}
        </div>
    );
}
