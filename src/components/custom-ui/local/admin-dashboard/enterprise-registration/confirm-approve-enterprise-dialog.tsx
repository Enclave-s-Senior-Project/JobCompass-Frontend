'use client';

import { memo } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

type ConfirmApprovalDialogProps = {
    nodeTrigger: React.ReactNode;
    onConfirm: () => void;
    onCancel: () => void;
};

export const ConfirmApproveEnterpriseDialog = memo(function ConfirmApproveEnterpriseDialog({
    nodeTrigger,
    onCancel,
    onConfirm,
}: ConfirmApprovalDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>{nodeTrigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm Approval</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to approve this enterprise registration?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="ms-auto gap-2">
                    <DialogClose asChild>
                        <Button size="icon-md" variant="ghost" onClick={onCancel}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button size="icon-md" variant="primary" onClick={onConfirm}>
                            Approve
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
});

ConfirmApproveEnterpriseDialog.displayName = 'ConfirmApproveEnterpriseDialog';
