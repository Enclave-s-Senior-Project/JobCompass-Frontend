'use client';

import { memo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ArrowDownUp, Ban, Check, Clock, Info, PhoneCall, X } from 'lucide-react';
import Image from 'next/image';
import { Account, User } from '@/types';
import { toast } from '@/lib/toast';
import { DialogChangeCandidateStatus } from './local/candidate-dashboard/dialog-change-status-candidate';
import { CandidateStatus } from '@/lib/common-enum';
import { useMutation } from '@tanstack/react-query';
import { cn, handleErrorToast } from '@/lib/utils';
import { UserService } from '@/services';

const CandidateItem = memo(
    ({ candidate, account, refetch }: { candidate: User; account?: Account; refetch: () => void }) => {
        const updateEnterpriseStatusMutation = useMutation({
            mutationFn: async (params: { enterpriseId: string; status: CandidateStatus; reason?: string }) => {
                const defaultRejectMessage = `We regret to inform you that your account was not approved at this time. Thank you for your interest in ${process.env.NEXT_PUBLIC_WEBSITE_NAME}.`;
                const reason =
                    params.status === CandidateStatus.BLOCKED ? params.reason || defaultRejectMessage : undefined;
                await UserService.updateUserStatus({
                    enterpriseId: params.enterpriseId,
                    status: params.status,
                    reason,
                });
            },
            onSuccess: () => {
                toast.success('Updated candidate status!');
                refetch();
            },
            onError: (error) => {
                handleErrorToast(error);
            },
        });
        const handleUpdateCandidateStatus = (status: CandidateStatus, reason?: string) => {
            updateEnterpriseStatusMutation.mutate({
                enterpriseId: candidate.profileId,
                status,
                reason,
            });
        };
        return (
            <TableRow key={candidate.profileId}>
                <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 overflow-hidden rounded-full bg-muted">
                            <Image
                                src={candidate.profileUrl || '/placeholder.svg'}
                                alt={candidate.fullName}
                                width={40}
                                height={40}
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <div className="font-semibold">{candidate.fullName}</div>
                            <div className="text-sm text-muted-foreground">{account?.email}</div>
                        </div>
                    </div>
                </TableCell>
                <TableCell>
                    {candidate.gender ? (
                        <Badge
                            variant="outline"
                            className={
                                candidate.gender.toLowerCase() === 'male'
                                    ? 'border-blue-500 text-blue-500'
                                    : candidate.gender.toLowerCase() === 'female'
                                      ? 'border-pink-500 text-pink-500'
                                      : ''
                            }
                        >
                            {candidate.gender.toUpperCase()}
                        </Badge>
                    ) : (
                        <span className="text-[12px] italic text-muted-foreground">Gender not provided</span>
                    )}
                </TableCell>

                <TableCell>
                    {candidate.nationality ? (
                        candidate.nationality
                    ) : (
                        <span className="text-[12px] italic text-muted-foreground">Nationality not provided</span>
                    )}
                </TableCell>

                <TableCell>
                    {candidate.maritalStatus ? (
                        <div className="flex flex-wrap gap-1">{candidate.maritalStatus}</div>
                    ) : (
                        <span className="text-[12px] italic text-muted-foreground">Marital status not provided</span>
                    )}
                </TableCell>

                <TableCell>
                    <div className="flex items-center gap-1">
                        {candidate?.isPremium ? (
                            <Check className="h-4 w-4 text-green" />
                        ) : (
                            <X className="h-4 w-4 text-danger" />
                        )}

                        <span
                            className={cn(
                                'text-nowrap text-[12px] font-semibold',
                                candidate?.isPremium ? 'text-green' : 'text-danger'
                            )}
                        >
                            {candidate?.isPremium ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                </TableCell>

                <TableCell>
                    <div className="flex items-center gap-1">
                        {candidate.phone ? (
                            <>
                                <PhoneCall className="h-4 w-4 text-muted-foreground" />
                                <span className="text-nowrap text-[12px]">{candidate.phone}</span>
                            </>
                        ) : (
                            <span className="text-[12px] italic text-muted-foreground">Phone number not provided</span>
                        )}
                    </div>
                </TableCell>

                <TableCell>
                    <div className="flex items-center gap-1">
                        {candidate?.dateOfBirth ? (
                            <>
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="text-nowrap text-[12px]">{candidate.dateOfBirth}</span>
                            </>
                        ) : (
                            <span className="text-[12px] italic text-muted-foreground">Date of birth not provided</span>
                        )}
                    </div>
                </TableCell>
                <TableCell>
                    <div className="flex items-center gap-1">
                        {candidate?.account?.status === CandidateStatus.ACTIVE ? (
                            <Check className="h-4 w-4 text-green" />
                        ) : candidate?.account?.status === CandidateStatus.PENDING ? (
                            <Clock className="h-4 w-4 text-warning" />
                        ) : candidate?.account?.status === CandidateStatus.BLOCKED ? (
                            <Ban className="h-4 w-4 text-danger" />
                        ) : candidate?.account?.status === CandidateStatus.REJECTED ? (
                            <X className="h-4 w-4 text-purple-800" />
                        ) : (
                            <></>
                        )}

                        <span
                            className={cn(
                                'text-nowrap text-[12px] font-semibold',
                                candidate?.account?.status === CandidateStatus.ACTIVE
                                    ? 'text-green'
                                    : candidate?.account?.status === CandidateStatus.PENDING
                                      ? 'text-warning'
                                      : candidate?.account?.status === CandidateStatus.BLOCKED
                                        ? 'text-danger'
                                        : candidate?.account?.status === CandidateStatus.REJECTED
                                          ? 'text-purple-800'
                                          : ''
                            )}
                        >
                            {candidate?.account?.status}
                        </span>
                    </div>
                </TableCell>
                <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                        <TooltipProvider>
                            <Tooltip delayDuration={200}>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon-md"
                                        onClick={() =>
                                            window.open(`/admin-dashboard/candidate/${candidate.profileId}`, '_blank')
                                        }
                                    >
                                        <Info className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent
                                    side="bottom"
                                    className="rounded-2xl border border-primary-200 bg-primary-50 px-3 py-1 text-primary shadow-sm drop-shadow-sm"
                                >
                                    <p>View details</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip delayDuration={200}>
                                <DialogChangeCandidateStatus
                                    nodeTrigger={
                                        <TooltipTrigger asChild>
                                            <Button size="icon-md">
                                                <ArrowDownUp className="h-4 w-4" />
                                            </Button>
                                        </TooltipTrigger>
                                    }
                                    onClose={() => {}}
                                    currentStatus={candidate.account?.status || CandidateStatus.PENDING}
                                    onSubmit={handleUpdateCandidateStatus}
                                />
                                <TooltipContent
                                    side="bottom"
                                    className="rounded-2xl border border-primary-200 bg-primary-50 px-3 py-1 text-primary shadow-sm drop-shadow-sm"
                                >
                                    <p>Change status</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </TableCell>
            </TableRow>
        );
    }
);

CandidateItem.displayName = 'EnterpriseRegistrationItem';

export { CandidateItem };
