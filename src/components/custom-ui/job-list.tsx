import { Job } from '@/types';
import { JobItem } from './job-item';
interface JobsListProps {
    jobs: Job[];
    isLoading?: boolean;
}

export function JobsList({ jobs = [], isLoading = false }: JobsListProps) {
    return (
        <div className="overflow-hidden py-4 space-y-4">
            {jobs.map((job) => (
                <JobItem key={job.jobId} job={job} />
            ))}
        </div>
    );
}
