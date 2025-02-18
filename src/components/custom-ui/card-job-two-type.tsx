'use client';
import { DetailedResponse, Job } from 'api-types';
import CardJobHorizontal from './card-job-horizontal';
import CardJob from './card-job';
import { useEffect } from 'react';

export function JobCardTwoType(props: { job: Job; viewType: string }) {
    const { job, viewType } = props;
    useEffect(() => {
        console.log('Du lieu', job);
    });
    if (viewType === 'list') {
        return <CardJobHorizontal job={job} />;
    }

    return <CardJob job={job} />;
}
