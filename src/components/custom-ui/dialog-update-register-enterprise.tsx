'use client';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { ChevronRight } from 'lucide-react';
import { FormUpdateRegisterEnterprises } from './form-update-register-enterprise';
import { Enterprise } from '@/types';

export function DialogUpdateEnterprises(props: { enterprises: Enterprise | null }) {
    const [open, setOpen] = useState(false);
    if (!props.enterprises) {
        return <p>No data available</p>;
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Button
                type="button"
                onClick={() => setOpen(true)}
                className="flex-1 md:flex-none w-[150px] h-12 text-[16px]"
            >
                Update
                <ChevronRight className="ml-2 h-6 w-6" />
            </Button>
            <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-[18px]">Update Register Enterprises</DialogTitle>
                    </div>
                </DialogHeader>
                <div className="space-y-6 pt-4">
                    <FormUpdateRegisterEnterprises setOpen={setOpen} enterprise={props.enterprises} />
                </div>
            </DialogContent>
        </Dialog>
    );
}
