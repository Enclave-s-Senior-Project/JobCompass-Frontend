'use client';
import { Job } from '@/types';
import CardJobHorizontal from './card-job-horizontal';
import CardJob from './card-job';

export function JobCardTwoType(props: {
    job: Job;
    viewType?: 'list' | 'grid';
    marked?: boolean;
    handleUnMark?: () => void;
    handleMark?: () => void;
}) {
    const { job, viewType } = props;
    return viewType === 'list' ? (
        <CardJobHorizontal
            job={job}
            handleUnMark={props.handleUnMark}
            handleMark={props.handleMark}
            mark={props.marked}
        />
    ) : (
        <CardJob job={job} />
    );
}
