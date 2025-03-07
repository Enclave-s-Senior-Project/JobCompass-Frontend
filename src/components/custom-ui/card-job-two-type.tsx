'use client';
import { Job } from '@/types';
import CardJobHorizontal from './card-job-horizontal';
import CardJob from './card-job';
import { useMutation } from '@tanstack/react-query';
import { JobService } from '@/services/job.service';
import { handleErrorToast } from '@/lib/utils';
import { toast } from 'sonner';
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
            try {
                await JobService.removeFavoriteJob({ jobId });
                await refetch();
            } catch (error: any) {
                handleErrorToast(error);
            }
        },
        onSuccess: () => {
            toast.success('Job added to favorite list');
        },
        onError: () => {
            toast.error('Failed to add job to favorite list');
        },
    });

    const addFavoriteJobMutation = useMutation({
        mutationFn: async ({ jobId }: { jobId: string }) => {
            try {
                await JobService.addFavoriteJob({ jobId });
                await refetch();
            } catch (error: any) {
                handleErrorToast(error);
            }
        },
        onSuccess: () => {
            toast.success('Job added to favorite list');
        },
        onError: () => {
            toast.error('Failed to add job to favorite list');
        },
    });
    return viewType === 'list' ? (
        <>
            <CardJobHorizontal
                job={job}
                handleUnMark={() => removeFavoriteJobMutation.mutate({ jobId: job.jobId })}
                handleMark={() => addFavoriteJobMutation.mutate({ jobId: job.jobId })}
                mark={job.isFavorite || false}
                showMarkButton={false}
            />
            <Separator className="my-4" />
        </>
    ) : (
        <CardJob job={job} />
    );
}
