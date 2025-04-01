'use client';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { TextEditorApplyJob } from './form-apply-job-dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';

interface DialogApplyJobProps {
    nameJob: string;
    jobId: string;
    trigger: React.ReactNode;
}

export function DialogApplyJob({ nameJob, jobId, trigger }: DialogApplyJobProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="sm:max-w-[648px]">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-[18px]">Apply Job: {nameJob}</DialogTitle>
                    </div>
                </DialogHeader>
                <div className="space-y-6 pt-4">
                    <TextEditorApplyJob setOpen={setOpen} jobId={jobId} />
                </div>
            </DialogContent>
        </Dialog>
    );
}
