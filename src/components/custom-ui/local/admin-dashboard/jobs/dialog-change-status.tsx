'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { JobStatusEnum } from '@/lib/common-enum';
import { cn } from '@/lib/utils';
import { DialogClose } from '@radix-ui/react-dialog';
import { capitalize, upperCase } from 'lodash';
import { memo, useState } from 'react';

type DialogChangeStatusProps = {
    nodeTrigger: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    jobStatus: JobStatusEnum;
    onApply?: (status: JobStatusEnum, reason: string) => void;
    onCancel?: () => void;
};

export const DialogChangeStatus = memo(
    ({ nodeTrigger, onOpenChange, open, jobStatus, onApply, onCancel }: DialogChangeStatusProps) => {
        const [reason, setReason] = useState<string>('');
        const [activeStatus, setActiveStatus] = useState<JobStatusEnum>(jobStatus);

        const handleActiveStatus = (status: JobStatusEnum) => {
            setActiveStatus(status);
        };

        const handleApplyChange = () => {
            if (onApply) onApply(activeStatus, reason);
            setReason('');
            setActiveStatus(jobStatus);
        };

        const handleCancelChange = () => {
            if (onCancel) onCancel();
            setReason('');
            setActiveStatus(jobStatus);
        };

        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogTrigger asChild>{nodeTrigger}</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <h2 className="text-lg font-semibold">Change Status</h2>
                        <p className="text-sm text-muted-foreground">Change the status of the job.</p>
                    </DialogHeader>
                    <div className="space-y-5">
                        <div className="space-y-1">
                            <Label>Enterprise Status</Label>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => handleActiveStatus(JobStatusEnum.OPEN)}
                                    className={cn(
                                        'rounded-md border-2 border-green-50 bg-green-100 px-4 py-2 text-green transition-all hover:bg-green-50',
                                        activeStatus === JobStatusEnum.OPEN ? 'bg-green-100 font-semibold' : 'bg-white'
                                    )}
                                >
                                    {activeStatus === JobStatusEnum.OPEN
                                        ? upperCase(JobStatusEnum.OPEN)
                                        : capitalize(JobStatusEnum.OPEN)}
                                </button>
                                <button
                                    onClick={() => handleActiveStatus(JobStatusEnum.CLOSED)}
                                    className={cn(
                                        'rounded-md border-2 border-purple-50 px-4 py-2 text-purple-500 transition-all hover:bg-purple-50',
                                        activeStatus === JobStatusEnum.CLOSED
                                            ? 'bg-purple-100 font-semibold'
                                            : 'bg-white'
                                    )}
                                >
                                    {activeStatus === JobStatusEnum.CLOSED
                                        ? upperCase(JobStatusEnum.CLOSED)
                                        : capitalize(JobStatusEnum.CLOSED)}
                                </button>
                                <button
                                    onClick={() => handleActiveStatus(JobStatusEnum.EXPIRED)}
                                    className={cn(
                                        'rounded-md border-2 border-danger-50 bg-danger-100 px-4 py-2 text-danger transition-all hover:bg-danger-50',
                                        activeStatus === JobStatusEnum.EXPIRED
                                            ? 'bg-danger-100 font-semibold'
                                            : 'bg-white'
                                    )}
                                >
                                    {activeStatus === JobStatusEnum.EXPIRED
                                        ? upperCase(JobStatusEnum.EXPIRED)
                                        : capitalize(JobStatusEnum.EXPIRED)}
                                </button>
                            </div>
                            <span className="mt-2 text-sm text-gray-700">
                                Current status: <strong>{capitalize(activeStatus)}</strong>
                            </span>
                        </div>

                        <Textarea
                            rows={5}
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="rounded-md"
                            placeholder="Write your reason for this action..."
                        ></Textarea>
                    </div>
                    <DialogFooter className="justify-end gap-2">
                        <DialogClose asChild>
                            <Button variant="ghost" onClick={handleCancelChange}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button onClick={handleApplyChange}>Apply</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    }
);

DialogChangeStatus.displayName = 'DialogChangeStatus';
