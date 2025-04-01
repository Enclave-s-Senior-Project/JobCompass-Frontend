'use client';

import JobsList from '@/components/custom-ui/job-list';
import { EnterpriseContext } from '@/contexts';
import { queryKey } from '@/lib/react-query/keys';
import { useQuery } from '@tanstack/react-query';
import * as services from '@/services/enterprises.service';
import { useContext, useState } from 'react';
import clsx from 'clsx';
import CountUp from 'react-countup';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function JobsPage() {
    const { enterpriseInfo } = useContext(EnterpriseContext);
    const [jobStatus, setJobStatus] = useState<string>('All Jobs');

    const { data: countJobs } = useQuery({
        queryKey: [queryKey.countTotalJobsOfEnterpriseId, enterpriseInfo?.enterpriseId],
        queryFn: async () => {
            if (!enterpriseInfo?.enterpriseId) return { value: 0 };

            try {
                return await services.EnterpriseService.countJobsByEnterpriseId(enterpriseInfo.enterpriseId);
            } catch (error) {
                console.error('Error fetching job count:', error);
                return { value: 0 };
            }
        },
        staleTime: 1000 * 60, // 1 minute
        refetchInterval: 1000 * 60,
        retry: 2,
        enabled: Boolean(enterpriseInfo?.enterpriseId),
    });

    const handleStatusChange = (value: string) => {
        setJobStatus(value);
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">
                    My Jobs{' '}
                    <span className="text-gray-500 text-lg">
                        (<CountUp start={0} end={countJobs?.value || 0} duration={2.5} separator="," />)
                    </span>
                </h1>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Select name="jobStatus" value={jobStatus} onValueChange={handleStatusChange}>
                            <SelectTrigger className={clsx('h-12 text-base rounded-sm')}>
                                <SelectValue placeholder="Job status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All Jobs">All Jobs</SelectItem>
                                <SelectItem value="1">Active Jobs</SelectItem>
                                <SelectItem value="2">Closed Jobs</SelectItem>
                                <SelectItem value="3">Expired job</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <JobsList jobStatus={jobStatus} />
        </div>
    );
}
