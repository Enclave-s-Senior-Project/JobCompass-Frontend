'use client';

import { memo, useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

type ConfirmRejectDialogProps = {
    nodeTrigger: React.ReactNode;
    onConfirm: (reason: string) => void;
    onCancel: () => void;
};

export const ConfirmRejectEnterpriseDialog = memo(({ nodeTrigger, onCancel, onConfirm }: ConfirmRejectDialogProps) => {
    const [reason, setReason] = useState('');
    return (
        <Dialog>
            <DialogTrigger asChild>{nodeTrigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm Rejection</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to reject this enterprise registration? Please provide a reason for the
                        rejection below.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <Label htmlFor="reason" className="mb-2 text-sm font-normal text-gray-700">
                        Reject reason
                    </Label>
                    <Textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        rows={5}
                        placeholder="If you want to provide a reason for rejection, please write it here. Otherwise, you can leave it blank."
                        className="rounded-sm"
                    />
                </div>
                <DialogFooter className="ms-auto gap-2">
                    <DialogClose asChild>
                        <Button size="icon-md" variant="ghost" onClick={onCancel}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            size="icon-md"
                            variant="primary"
                            className="border-danger bg-danger text-white hover:border-danger hover:bg-danger-600"
                            onClick={() => onConfirm(reason)}
                        >
                            Reject
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
});

ConfirmRejectEnterpriseDialog.displayName = 'ConfirmRejectEnterpriseDialog';
