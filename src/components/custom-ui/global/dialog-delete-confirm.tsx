import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { DialogClose, DialogTrigger } from '@radix-ui/react-dialog';
import { memo } from 'react';

type DeleteConfirmDialogProps = {
    triggerNode: React.ReactNode;
    title?: string;
    description?: string;
    onDelete: () => void;
    onClose: () => void;
};

export const DeleteConfirmDialog = memo(
    ({ triggerNode, onClose, onDelete, title, description }: DeleteConfirmDialogProps) => {
        return (
            <Dialog>
                <DialogTrigger asChild>{triggerNode}</DialogTrigger>
                <DialogContent className="space-y-4">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>{description}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex justify-end gap-2">
                        <DialogClose asChild>
                            <Button onClick={onClose} variant="ghost">
                                Cancel
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button
                                onClick={onDelete}
                                className="border-danger bg-danger hover:border-danger hover:bg-danger-600"
                            >
                                Delete
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    }
);

DeleteConfirmDialog.displayName = 'DeleteConfirmDialog';
