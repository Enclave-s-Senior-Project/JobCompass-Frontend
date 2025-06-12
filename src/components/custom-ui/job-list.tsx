import { Job } from '@/types';
import { JobItem } from './job-item';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { motionVariant } from '@/lib/motion-variants';

interface JobsListProps {
    jobs: Job[];
    isLoading?: boolean;
    onSelectItem?: (jobId: string) => void;
    refetchJob: () => void;
    refetchDetailJob: () => void;
    temp?: boolean;
    isOwn?: boolean;
}

export function JobsList({
    jobs = [],
    isLoading = false,
    onSelectItem,
    refetchJob,
    refetchDetailJob,
    temp = true,
    isOwn,
}: JobsListProps) {
    return (
        <div className="space-y-4 overflow-hidden">
            {isLoading ? (
                <div className="space-y-4">
                    <Skeleton className="h-64 w-full"></Skeleton>
                    <Skeleton className="h-64 w-full"></Skeleton>
                    <Skeleton className="h-64 w-full"></Skeleton>
                </div>
            ) : (
                jobs.map((job) => (
                    <motion.div
                        key={job.jobId}
                        className="bg-white- w-full space-y-6 rounded-md border-2 border-input"
                        variants={motionVariant.containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        // whileHover={{ y: -2 }}
                    >
                        {/* <Link href={`/single-job/${job.jobId}`} key={job.jobId}> */}
                        <JobItem
                            refetchDetailJob={refetchDetailJob}
                            refetchJob={refetchJob}
                            key={job.jobId}
                            job={job}
                            onSelect={onSelectItem}
                            temp={temp}
                            isOwn={isOwn}
                        />
                        {/* </Link> */}
                    </motion.div>
                ))
            )}
        </div>
    );
}
