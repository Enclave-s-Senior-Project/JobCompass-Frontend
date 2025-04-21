'use client';
import { useEffect, useState } from 'react';
import { Dialog, DialogClose, DialogContent, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Rocket } from 'lucide-react';
import { Input } from '../ui/input';
import { BoostJobService, JobService } from '@/services';
import clsx from 'clsx';
import { successKeyMessage } from '@/lib/message-keys';
import { toast } from '@/lib/toast';
import { handleErrorToast } from '@/lib/utils';

interface DialogBoostJobProps {
    isOpen?: boolean;
    onClose?: () => void;
    jobTitle?: string;
    jobId: string;
    refetchJob: () => void;
    refetchDetailJob: () => void;
}

export function DialogBoostJob({
    isOpen = false,
    onClose = () => {},
    jobTitle,
    jobId,
    refetchDetailJob,
    refetchJob,
}: DialogBoostJobProps) {
    const [points, setPoints] = useState<number>(0);
    const [rankPosition, setRankPosition] = useState<number | null>(null);
    const isChecking = false;
    useEffect(() => {
        if (!isOpen) {
            setPoints(0);
            setRankPosition(null);
        }
    }, [isOpen]);
    const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number.parseInt(e.target.value) || 0;
        setPoints(value >= 0 ? value : 0);
    };

    const handlePromote = async () => {
        try{
            await BoostJobService.bootJob({ jobId: jobId, pointsUsed: points });
        refetchDetailJob();
        refetchJob();
        toast.success(successKeyMessage.JOB_BOOST_SUCCESSFUL);
        onClose();
        }catch (error) {
            handleErrorToast(error);
        }
    };

    const checkRanking = async (point: number) => {
        const temp = await JobService.checkPosition(jobId, point);
        if (temp) {
            setRankPosition(temp?.value?.estimatedRank ?? null);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="overflow-hidden rounded-xl border-0 p-0 shadow-xl sm:max-w-[400px]">
                <div className="border- relative bg-primary-500 p-6 pb-12 text-white">
                    <h2 className="mb-1 text-xl font-semibold">Promote Job</h2>
                    <p className="text-sm text-blue-100">
                        Enter points to boost &quot;{jobTitle}&quot; to premium status.
                    </p>
                    <div className="absolute -bottom-6 right-6">
                        <div className="rounded-full bg-yellow-400 p-3 shadow-lg">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="#FFF"
                                stroke="#000"
                                strokeWidth="1"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="p-6 pt-10">
                    <div className="space-y-6">
                        <div className="flex items-end gap-3">
                            <div className="flex-1">
                                <label className="mb-1 block text-sm font-medium">Points</label>
                                <Input
                                    type="number"
                                    min="0"
                                    value={points || ''}
                                    onChange={handlePointsChange}
                                    className="h-10 text-lg"
                                    placeholder="0"
                                />
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    checkRanking(points);
                                }}
                                disabled={points <= 0 || isChecking}
                                className="h-10 min-w-[137px] whitespace-pre-line transition-colors hover:bg-gray-100"
                            >
                                {isChecking ? 'Checking...' : 'Check'}
                            </Button>
                        </div>

                        <div
                            className={clsx(
                                'flex min-h-[70px] items-center gap-3 rounded-lg',
                                rankPosition !== null && 'border border-gray-200 bg-gray-50 p-4'
                            )}
                        >
                            {rankPosition !== null ? (
                                <>
                                    <Rocket className="h-5 w-5 text-blue-600" />
                                    <div>
                                        <div className="text-lg font-bold">Top {rankPosition}</div>
                                        <div className="text-xs text-gray-500">in Position search results</div>
                                    </div>
                                </>
                            ) : (
                                <div className="h-5 w-full opacity-0">Loading position...</div>
                            )}
                        </div>
                    </div>
                </div>

                <DialogFooter className="flex justify-between border-t border-gray-100 bg-gray-50 p-4">
                    <DialogClose asChild>
                        <Button variant="outline" className="h-10 transition-colors hover:bg-gray-100">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={handlePromote}
                        disabled={points <= 0}
                        className="h-10 bg-blue-600 transition-colors hover:bg-primary-500"
                    >
                        Boost Job
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
