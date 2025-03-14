'use client';

import JobsList from '@/components/custom-ui/job-list';
import { EnterpriseContext } from '@/contexts';
import { queryKey } from '@/lib/react-query/keys';
import { useQuery } from '@tanstack/react-query';
import * as services from '@/services/enterprises.service';
import { useContext, useState } from 'react';
import CountUp from 'react-countup';

export default function JobsPage() {
    const { enterpriseInfo } = useContext(EnterpriseContext);
    const [jobStatus, setJobStatus] = useState<string>('All Jobs');
    const { data: countJobs } = useQuery({
        queryKey: [queryKey.countTotalJobsOfEnterpriseId, enterpriseInfo?.enterpriseId],
        queryFn: async () => {
            if (!enterpriseInfo?.enterpriseId) return { value: 0 };

            try {
                return await services.EnterpriseService.countJobsByEnterpriseId(enterpriseInfo.enterpriseId);
            } catch {
                return { value: 0 };
            }
        },
        staleTime: 1000 * 60, // 1 minute
        refetchInterval: 1000 * 60,
        retry: 2,
        enabled: Boolean(enterpriseInfo?.enterpriseId),
    });

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">
                    My Jobs{' '}
                    <span className="text-gray-500 text-lg">
                        (<CountUp start={0} end={+countJobs?.value || 0} duration={2.5} separator="," />)
                    </span>
                </h1>
                <div className="flex items-center gap-2">
                    <span className="text-sm">Job status</span>
                    <div className="relative">
                        <select
                            className="appearance-none border rounded-md px-4 py-2 pr-8 bg-white"
                            value={jobStatus}
                            onChange={(e) => setJobStatus(e.target.value)}
                        >
                            <option value="All Jobs">All Jobs</option>
                            <option value="Active Jobs">Active Jobs</option>
                            <option value="Expired Jobs">Expired Jobs</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                                className="fill-current h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <JobsList jobStatus={jobStatus} />
        </div>
    );
}
