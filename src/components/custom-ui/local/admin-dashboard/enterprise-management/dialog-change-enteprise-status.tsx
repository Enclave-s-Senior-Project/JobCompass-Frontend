import { memo, useState, useEffect } from 'react';
import { capitalize, upperCase } from 'lodash';
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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { EnterpriseStatus } from '@/lib/common-enum';
import { cn } from '@/lib/utils';

type Props = {
    nodeTrigger: React.ReactNode;
    onSubmit: (status: EnterpriseStatus, reason?: string) => void;
    onClose: () => void;
    currentStatus: EnterpriseStatus;
};

export const DialogChangeEnterpriseStatus = memo(({ nodeTrigger, onClose, onSubmit, currentStatus }: Props) => {
    const [activeStatus, setActiveStatus] = useState<EnterpriseStatus>(currentStatus);
    const [reason, setReason] = useState<string>('');

    // To sync activeStatus with currentStatus when it changes
    useEffect(() => {
        setActiveStatus(currentStatus);
    }, [currentStatus]);

    const handleActiveStatus = (status: EnterpriseStatus) => {
        setActiveStatus(status);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{nodeTrigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Change Enterprise Status</DialogTitle>
                    <DialogDescription>
                        Select a new status for this enterprise. This will update the enterprise&apos;s visibility and
                        access level in the system.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-5">
                    <div className="space-y-1">
                        <Label>Enterprise Status</Label>
                        <div className="flex gap-4">
                            <button
                                onClick={() => handleActiveStatus(EnterpriseStatus.PENDING)}
                                className={cn(
                                    'rounded-md border-2 border-warning-50 px-4 py-2 text-warning transition-all hover:bg-warning-50',
                                    activeStatus === EnterpriseStatus.PENDING
                                        ? 'bg-warning-100 font-semibold'
                                        : 'bg-white'
                                )}
                            >
                                {activeStatus === EnterpriseStatus.PENDING
                                    ? upperCase(EnterpriseStatus.PENDING)
                                    : capitalize(EnterpriseStatus.PENDING)}
                            </button>
                            <button
                                onClick={() => handleActiveStatus(EnterpriseStatus.ACTIVE)}
                                className={cn(
                                    'rounded-md border-2 border-green-50 bg-green-100 px-4 py-2 text-green transition-all hover:bg-green-50',
                                    activeStatus === EnterpriseStatus.ACTIVE ? 'bg-green-100 font-semibold' : 'bg-white'
                                )}
                            >
                                {activeStatus === EnterpriseStatus.ACTIVE
                                    ? upperCase(EnterpriseStatus.ACTIVE)
                                    : capitalize(EnterpriseStatus.ACTIVE)}
                            </button>
                            <button
                                onClick={() => handleActiveStatus(EnterpriseStatus.BLOCKED)}
                                className={cn(
                                    'rounded-md border-2 border-danger-50 bg-danger-100 px-4 py-2 text-danger transition-all hover:bg-danger-50',
                                    activeStatus === EnterpriseStatus.BLOCKED
                                        ? 'bg-danger-100 font-semibold'
                                        : 'bg-white'
                                )}
                            >
                                {activeStatus === EnterpriseStatus.BLOCKED
                                    ? upperCase(EnterpriseStatus.BLOCKED)
                                    : capitalize(EnterpriseStatus.BLOCKED)}
                            </button>
                            <button
                                onClick={() => handleActiveStatus(EnterpriseStatus.REJECTED)}
                                className={cn(
                                    'rounded-md border-2 border-purple-50 px-4 py-2 text-purple-700 transition-all hover:bg-purple-50',
                                    activeStatus === EnterpriseStatus.REJECTED
                                        ? 'bg-purple-100 font-semibold'
                                        : 'bg-white'
                                )}
                            >
                                {activeStatus === EnterpriseStatus.REJECTED
                                    ? upperCase(EnterpriseStatus.REJECTED)
                                    : capitalize(EnterpriseStatus.REJECTED)}
                            </button>
                        </div>

                        <span className="mt-2 text-sm text-gray-700">
                            Current status: <strong>{capitalize(activeStatus)}</strong>
                        </span>
                    </div>

                    <Textarea
                        rows={5}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="rounded-md"
                        placeholder="Write your reason for this action..."
                    ></Textarea>
                </div>
                <DialogFooter className="justify-end gap-2">
                    <DialogClose asChild>
                        <Button type="reset" onClick={onClose} variant="ghost">
                            Cancel
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type="submit" onClick={() => onSubmit(activeStatus, reason)}>
                            Update
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
});

DialogChangeEnterpriseStatus.displayName = 'DialogChangeEnterpriseStatus';
