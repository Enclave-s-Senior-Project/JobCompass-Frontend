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
        <div className="bg-white rounded-md shadow-sm">
            <h2 className="text-xl font-bold mb-4">Job openings</h2>

            <div className="max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 pr-2">
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
