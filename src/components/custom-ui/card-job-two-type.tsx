'use client';
import { Job } from '@/types';
import CardJobHorizontal from './card-job-horizontal';
import CardJob from './card-job';

export function JobCardTwoType(props: { job: Job; viewType: string }) {
    const { job, viewType } = props;
    if (viewType === 'list') {
        return <CardJobHorizontal job={job} />;
    }

    return <CardJob job={job} />;
}
