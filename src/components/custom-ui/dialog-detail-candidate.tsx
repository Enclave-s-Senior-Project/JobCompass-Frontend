'use client';
import { useState } from 'react';
import { Dialog, DialogContent } from '../ui/dialog';
import { Button } from '../ui/button';
import { ChevronRight } from 'lucide-react';
import SingleCandidate from './single-candidate';

export function DialogDetailCandidate(props: { id: string }) {
    const [open, setOpen] = useState(false);
    const temp = props.id;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Button onClick={() => setOpen(true)} className="flex-1 md:flex-none w-[248px] h-[56px] text-[16px]">
                View Detail
                <ChevronRight className="ml-2 h-6 w-6" />
            </Button>
            <DialogContent className="w-[1024px] h-[900px] max-w-none">
                <div className="space-y-6 pt-4">
                    <SingleCandidate id={temp} />
                </div>
            </DialogContent>
        </Dialog>
    );
}
