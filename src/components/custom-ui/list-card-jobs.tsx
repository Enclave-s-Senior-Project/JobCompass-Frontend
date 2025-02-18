'use client';

import { DetailedRequest, Job } from 'api-types';
import { JobCardTwoType } from './card-job-two-type';
import { useEffect } from 'react';
import * as services from '@/services/job.service';
import { useQuery } from '@tanstack/react-query';

export default function ListCardJobs(props: { viewType: string }) {
    const {
        isPending,
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
        queryKey: ['list-card', { order: 'DESC', page: 1, take: 10, option: '' }],
        queryFn: async ({ queryKey }) => {
            try {
                const temp = await services.JobService.getAllJobs(
                    queryKey[1] as DetailedRequest.ParamListJobsCredentials
                );
                return temp.value;
            } catch (error) {
                // throw loi
            }
        },
        staleTime: 1 * 60 * 1000,
        enabled: true,
        retry: 2,
    });
    const { viewType } = props;

    useEffect(() => {
        console.log(jobCards.meta);
    }, [jobCards]);

    return (
        <div className={viewType === 'grid' ? 'flex items-center justify-center' : ''}>
            <div className={viewType === 'grid' ? 'container mx-auto max-w-screen-xl' : ''}>
                <div
                    className={
                        viewType === 'grid'
                            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 place-items-center'
                            : 'flex flex-col place-items-center gap-y-6'
                    }
                >
                    {jobCards?.data.map((job, index) => <JobCardTwoType job={job} viewType={viewType} key={index} />)}
                </div>
            </div>
        </div>
    );
}
