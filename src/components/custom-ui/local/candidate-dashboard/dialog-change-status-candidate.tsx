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
import { cn } from '@/lib/utils';
import { CandidateStatus } from '../../../../lib/common-enum';

type Props = {
    nodeTrigger: React.ReactNode;
    onClose: () => void;
    currentStatus: CandidateStatus;
    onSubmit: (status: CandidateStatus, reason?: string) => void;
};

export const DialogChangeCandidateStatus = memo(({ nodeTrigger, onClose, onSubmit, currentStatus }: Props) => {
    const [activeStatus, setActiveStatus] = useState<CandidateStatus>(currentStatus);
    const [reason, setReason] = useState<string>('');

    useEffect(() => {
        setActiveStatus(currentStatus);
    }, [currentStatus]);

    const handleActiveStatus = (status: CandidateStatus) => {
        setActiveStatus(status);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{nodeTrigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Change Candidate Status</DialogTitle>
                    <DialogDescription>
                        Select a new status for this candidate. This will update the candidate&apos;s visibility and
                        access level in the system.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-5">
                    <div className="space-y-1">
                        <Label>Candidate Status</Label>
                        <div className="flex gap-4">
                            <button
                                onClick={() => handleActiveStatus(CandidateStatus.PENDING)}
                                className={cn(
                                    'rounded-md border-2 border-warning-50 px-4 py-2 text-warning transition-all hover:bg-warning-50',
                                    activeStatus === CandidateStatus.PENDING
                                        ? 'bg-warning-100 font-semibold'
                                        : 'bg-white'
                                )}
                            >
                                {activeStatus === CandidateStatus.PENDING
                                    ? upperCase(CandidateStatus.PENDING)
                                    : capitalize(CandidateStatus.PENDING)}
                            </button>
                            <button
                                onClick={() => handleActiveStatus(CandidateStatus.ACTIVE)}
                                className={cn(
                                    'rounded-md border-2 border-green-50 bg-green-100 px-4 py-2 text-green transition-all hover:bg-green-50',
                                    activeStatus === CandidateStatus.ACTIVE ? 'bg-green-100 font-semibold' : 'bg-white'
                                )}
                            >
                                {activeStatus === CandidateStatus.ACTIVE
                                    ? upperCase(CandidateStatus.ACTIVE)
                                    : capitalize(CandidateStatus.ACTIVE)}
                            </button>
                            <button
                                onClick={() => handleActiveStatus(CandidateStatus.BLOCKED)}
                                className={cn(
                                    'rounded-md border-2 border-danger-50 bg-danger-100 px-4 py-2 text-danger transition-all hover:bg-danger-50',
                                    activeStatus === CandidateStatus.BLOCKED
                                        ? 'bg-danger-100 font-semibold'
                                        : 'bg-white'
                                )}
                            >
                                {activeStatus === CandidateStatus.BLOCKED
                                    ? upperCase(CandidateStatus.BLOCKED)
                                    : capitalize(CandidateStatus.BLOCKED)}
                            </button>
                            {/* <button
                                onClick={() => handleActiveStatus(CandidateStatus.REJECTED)}
                                className={cn(
                                    'rounded-md border-2 border-purple-50 px-4 py-2 text-purple-700 transition-all hover:bg-purple-50',
                                    activeStatus === CandidateStatus.REJECTED
                                        ? 'bg-purple-100 font-semibold'
                                        : 'bg-white'
                                )}
                            >
                                {activeStatus === CandidateStatus.REJECTED
                                    ? upperCase(CandidateStatus.REJECTED)
                                    : capitalize(CandidateStatus.REJECTED)}
                            </button> */}
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
                        aria-label="Reason for status change"
                    />
                </div>
                <DialogFooter className="justify-end gap-2">
                    <DialogClose asChild>
                        <Button type="reset" onClick={onClose} variant="ghost">
                            Cancel
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type="submit" onClick={() => onSubmit(activeStatus, reason)}>
                            {' '}
                            Change
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
});

DialogChangeCandidateStatus.displayName = 'DialogChangeCandidateStatus';
