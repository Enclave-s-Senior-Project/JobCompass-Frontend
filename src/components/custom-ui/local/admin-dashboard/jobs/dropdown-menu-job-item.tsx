'use client';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { JobStatusEnum } from '@/lib/common-enum';
import { toast } from '@/lib/toast';
import { handleErrorToast } from '@/lib/utils';
import { JobService } from '@/services';
import { DetailedRequest, Job } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { ArrowRightLeft, Info } from 'lucide-react';
import { memo, useState } from 'react';
import { DialogChangeStatus } from './dialog-change-status';
import Link from 'next/link';

type DropdownMenuJobItemProps = {
    children: React.ReactNode;
    job: Job;
    refetchList?: () => void;
};

export const DropdownMenuJobItem = memo(({ children, job, refetchList }: DropdownMenuJobItemProps) => {
    const [showDialog, setShowDialog] = useState(false);
    const [toastId, setToastId] = useState<string | null>(null);

    const changeStatusMutation = useMutation({
        mutationFn: async (payload: DetailedRequest.ChangeStatusJob) => {
            const toastId = toast.loading('Changing status...');
            setToastId(toastId);
            return await JobService.changeStatusJob(job.jobId, payload);
        },
        onSuccess: () => {
            toast.success('Change status successfully!');
            if (refetchList) refetchList();
        },
        onError: (error) => {
            handleErrorToast(error);
        },
        onSettled: () => {
            if (toastId) {
                toast.dismiss(toastId);
            }
        },
    });

    const handleChangeStatus = (status: JobStatusEnum, reason: string) => {
        changeStatusMutation.mutate({
            status,
            reason,
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem className="hover:bg-primary-50">
                    <Link
                        target="_blank"
                        href={`/single-job/${job.jobId}`}
                        className="flex items-center gap-2 text-primary hover:text-primary"
                    >
                        <Info className="size-4" />
                        <span>View details</span>
                    </Link>
                </DropdownMenuItem>
                <Separator />
                <DialogChangeStatus
                    jobStatus={job.status}
                    open={showDialog}
                    onOpenChange={setShowDialog}
                    onApply={handleChangeStatus}
                    nodeTrigger={
                        <DropdownMenuItem
                            onClick={(e) => {
                                e.preventDefault();
                                setShowDialog(true);
                            }}
                            className="hover:bg-primary-50"
                        >
                            <div className="flex items-center gap-2 text-primary hover:text-primary">
                                <ArrowRightLeft className="size-4" />
                                <span>Change status</span>
                            </div>
                        </DropdownMenuItem>
                    }
                />
            </DropdownMenuContent>
        </DropdownMenu>
    );
});

DropdownMenuJobItem.displayName = 'DropdownMenuJobItem';
