'use client';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { ChevronRight } from 'lucide-react';
import { TextEditorApplyJob } from './form-apply-job-dialog';

export function DialogApplyJob(props: { nameJob: string }) {
    const [open, setOpen] = useState(false);
    const name = props.nameJob;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Button onClick={() => setOpen(true)} className="flex-1 md:flex-none w-[248px] h-[56px] text-[16px]">
                Apply Now
                <ChevronRight className="ml-2 h-6 w-6" />
            </Button>
            <DialogContent className="sm:max-w-[648px]">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-[18px]">Apply Job: {name}</DialogTitle>
                    </div>
                </DialogHeader>
                <div className="space-y-6 pt-4">
                    <TextEditorApplyJob setOpen={setOpen} />
                </div>
            </DialogContent>
        </Dialog>
    );
}
