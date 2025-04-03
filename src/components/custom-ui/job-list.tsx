import { Job } from '@/types';
import { JobItem } from './job-item';
import { Skeleton } from '@/components/ui/skeleton';
interface JobsListProps {
    jobs: Job[];
    isLoading?: boolean;
    onSelectItem?: (jobId: string) => void;
}

export function JobsList({ jobs = [], isLoading = false, onSelectItem }: JobsListProps) {
    return (
        <div className="overflow-hidden space-y-4">
            {isLoading ? (
                <div className="space-y-4">
                    <Skeleton className="w-full h-64"></Skeleton>
                    <Skeleton className="w-full h-64"></Skeleton>
                    <Skeleton className="w-full h-64"></Skeleton>
                </div>
            ) : (
                jobs.map((job) => <JobItem key={job.jobId} job={job} onSelect={onSelectItem} />)
            )}
        </div>
    );
}
