'use client';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { ChevronRight } from 'lucide-react';
import { FormAddEnterprises } from './form-add-enterprises';

export function DialogAddEnterprises({ refetch }: { refetch: () => void }) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Button
                type="button"
                onClick={() => setOpen(true)}
                className="h-12 w-[248px] flex-1 text-[16px] md:flex-none"
            >
                Register Enterprise
                <ChevronRight className="ml-2 h-6 w-6" />
            </Button>
            <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[800px]">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-[18px]">Register Enterprise</DialogTitle>
                    </div>
                </DialogHeader>
                <div className="space-y-6 pt-4">
                    <FormAddEnterprises setOpen={setOpen} refetch={refetch} />
                </div>
            </DialogContent>
        </Dialog>
    );
}
