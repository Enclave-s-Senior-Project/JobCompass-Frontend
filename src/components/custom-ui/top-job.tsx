import { JobsList } from './job-list';
import { Job } from '@/types';

interface JobsListProps {
    jobs: Job[];
    isLoading?: boolean;
    refetchJob: () => void;
    refetchDetailJob: () => void;
}
export function TopJob({ jobs = [], isLoading = false, refetchJob, refetchDetailJob }: JobsListProps) {
    return (
        <div className="rounded-md bg-white shadow-sm">
            <h2 className="mb-4 text-xl font-bold">Job openings</h2>

            <div className="max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
                <JobsList
                    refetchJob={refetchJob}
                    jobs={jobs || []}
                    isLoading={isLoading}
                    refetchDetailJob={refetchDetailJob}
                    temp={false}
                />
            </div>
        </div>
    );
}
