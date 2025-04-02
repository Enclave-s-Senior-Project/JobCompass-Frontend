'use client';
import { Job } from '@/types';
import CardJobHorizontal from './card-job-horizontal';
import CardJob from './card-job';
import { useMutation } from '@tanstack/react-query';
import { JobService } from '@/services/job.service';
import { handleErrorToast } from '@/lib/utils';
import { toast } from '@/lib/toast';
import { Separator } from '@/components/ui/separator';

export function JobCardTwoType(props: {
    job: Job;
    viewType?: 'list' | 'grid';
    refetch: () => Promise<any>;
    handleUnMark?: () => void;
    handleMark?: () => void;
}) {
    const { job, viewType, refetch } = props;
    const removeFavoriteJobMutation = useMutation({
        mutationFn: async ({ jobId }: { jobId: string }) => {
            await JobService.removeFavoriteJob({ jobId });
            await refetch();
        },
        onSuccess: () => {
            toast.success('Job added to favorite list');
        },
        onError: (error) => {
            handleErrorToast(error);
        },
    });

    const addFavoriteJobMutation = useMutation({
        mutationFn: async ({ jobId }: { jobId: string }) => {
            await JobService.addFavoriteJob({ jobId });
            await refetch();
        },
        onSuccess: () => {
            toast.success('Job added to favorite list');
        },
        onError: (error) => {
            handleErrorToast(error);
        },
    });
    return viewType === 'list' ? (
        <CardJobHorizontal
            job={job}
            handleUnMark={() => removeFavoriteJobMutation.mutate({ jobId: job.jobId })}
            handleMark={() => addFavoriteJobMutation.mutate({ jobId: job.jobId })}
            mark={job.isFavorite || false}
            showMarkButton={false}
        />
    ) : (
        <CardJob job={job} />
    );
}
