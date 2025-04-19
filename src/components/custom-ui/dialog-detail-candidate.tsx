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
            <Button onClick={() => setOpen(true)} className="h-[56px] w-[248px] flex-1 text-[16px] md:flex-none">
                View Detail
                <ChevronRight className="ml-2 h-6 w-6" />
            </Button>
            <DialogContent className="h-[90vh] max-h-[900px] w-[1024px] max-w-none overflow-hidden rounded-lg">
                {/* Div wrapper để scrollbar bo tròn */}
                <div className="scrollbar-thumb-rounded-full h-full overflow-y-auto pr-2 scrollbar-thin scrollbar-track-gray-100/30 scrollbar-thumb-gray-300">
                    <div className="space-y-6 pt-2">
                        <SingleCandidate id={temp} />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
