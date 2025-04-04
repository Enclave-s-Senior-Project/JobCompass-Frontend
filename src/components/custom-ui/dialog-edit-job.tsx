'use client';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { ChevronRight } from 'lucide-react';

export function DialogEditJob() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Button onClick={() => setOpen(true)} className="flex-1 md:flex-none w-[248px] h-[56px] text-[16px]">
                Edit Job
                <ChevronRight className="ml-2 h-6 w-6" />
            </Button>
            <DialogContent className="w-[1024px] max-w-none h-[90vh] max-h-[900px] rounded-lg overflow-hidden">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                </DialogHeader>
                <div
                    className="h-full overflow-y-auto 
    scrollbar-thin 
    scrollbar-thumb-rounded-full 
    scrollbar-thumb-gray-300 
    scrollbar-track-gray-100/30
    pr-2"
                >
                    <div className="space-y-6 pt-2">{/* <EditJob /> */}</div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
