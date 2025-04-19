'use client';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { ChevronRight } from 'lucide-react';
import { FormUpdateRegisterEnterprises } from './form-update-register-enterprise';
import { Enterprise } from '@/types';
import { EnterpriseService } from '@/services/enterprises.service';

export function DialogUpdateEnterprises(props: { enterprises: Enterprise | null }) {
    const [enterprise, setEnterprise] = useState<Enterprise | null>(null);
    const [open, setOpen] = useState(false);
    const handleDataEnterprise = async () => {
        const payload = await EnterpriseService.checkEnterprise();
        if (payload?.value) {
            setEnterprise(payload?.value ?? null);
            setOpen(true);
        }
    };
    if (!props.enterprises) {
        return <p>No data available</p>;
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Button
                type="button"
                variant="outline-secondary"
                onClick={handleDataEnterprise}
                className="h-12 w-[150px] flex-1 text-[16px] shadow-none md:flex-none"
            >
                Update
                <ChevronRight className="ml-2 h-6 w-6" />
            </Button>
            <DialogContent className="px-2 sm:max-w-[800px]">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-[18px]">Update Register Enterprise</DialogTitle>
                    </div>
                </DialogHeader>
                <div className="max-h-[80vh] space-y-6 overflow-y-auto px-4 pt-4">
                    <FormUpdateRegisterEnterprises setOpen={setOpen} enterprises={enterprise} />
                </div>
            </DialogContent>
        </Dialog>
    );
}
