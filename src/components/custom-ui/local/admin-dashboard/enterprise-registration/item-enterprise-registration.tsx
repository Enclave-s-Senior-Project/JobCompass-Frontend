'use client';

import { memo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Check, Clock, Info, PhoneCall, ShieldCheck, UsersRound, X } from 'lucide-react';
import Image from 'next/image';
import { toFormattedDate } from '@/lib/utils';
import { Enterprise } from '@/types';
import { toast } from '@/lib/toast';
import { ConfirmApproveEnterpriseDialog } from './confirm-approve-enterprise-dialog';
import { ConfirmRejectEnterpriseDialog } from './confirm-reject-enterprise-dialog';

const EnterpriseRegistrationItem = memo(
    ({
        enterprise,
        handleApprove,
        handleReject,
    }: {
        enterprise: Enterprise;
        handleApprove: (enterpriseId: string) => void;
        handleReject: (enterpriseId: string, reason: string) => void;
    }) => (
        <TableRow key={enterprise.enterpriseId}>
            <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-muted">
                        <Image
                            src={enterprise.logoUrl || '/placeholder.svg'}
                            alt={enterprise.name}
                            width={40}
                            height={40}
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <div className="font-semibold">{enterprise.name}</div>
                        <div className="text-sm text-muted-foreground">{enterprise.email}</div>
                    </div>
                </div>
            </TableCell>
            <TableCell>
                <Badge variant="outline">{enterprise.organizationType}</Badge>
            </TableCell>
            <TableCell>
                {enterprise.addresses && enterprise.addresses.length > 0 ? (
                    <div>
                        <p className="text-nowrap">{enterprise.addresses[0].city}</p>
                        <p className="text-nowrap text-sm text-muted-foreground">{enterprise.addresses[0].country}</p>
                    </div>
                ) : (
                    <span className="text-muted-foreground">No address</span>
                )}
            </TableCell>
            <TableCell>
                <div className="flex flex-wrap gap-1">
                    {enterprise.categories.map((category: any) => (
                        <Badge key={category.categoryId} variant="secondary">
                            {category.categoryName}
                        </Badge>
                    ))}
                </div>
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-1">
                    <UsersRound className="h-4 w-4 text-muted-foreground" />
                    <span className="text-nowrap text-[12px]">{enterprise.teamSize}</span>
                </div>
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-1">
                    <PhoneCall className="h-4 w-4 text-muted-foreground" />
                    <span className="text-nowrap text-[12px]">{enterprise.phone}</span>
                </div>
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-1">
                    <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                    <span className="text-nowrap text-[12px]">{toFormattedDate(enterprise.foundedIn)}</span>
                </div>
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-nowrap text-[12px]">{toFormattedDate(enterprise.createdAt)}</span>
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
                                        window.open(
                                            `/admin-dashboard/enterprise/registration/${enterprise.enterpriseId}`,
                                            '_blank'
                                        )
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
                            <ConfirmApproveEnterpriseDialog
                                nodeTrigger={
                                    <TooltipTrigger asChild>
                                        <Button
                                            size="icon-md"
                                            className="border-green-500 bg-green-500 hover:border-green-500 hover:bg-green-600"
                                        >
                                            <Check className="h-4 w-4" />
                                        </Button>
                                    </TooltipTrigger>
                                }
                                onCancel={() => {
                                    toast.info('Approval cancelled!');
                                }}
                                onConfirm={() => handleApprove(enterprise.enterpriseId)}
                            />

                            <TooltipContent
                                side="bottom"
                                className="rounded-2xl border border-green-200 bg-green-50 px-3 py-1 text-green shadow-sm drop-shadow-sm"
                            >
                                <p>Approve</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip delayDuration={200}>
                            <ConfirmRejectEnterpriseDialog
                                nodeTrigger={
                                    <TooltipTrigger asChild>
                                        <Button
                                            className="border-danger-500 bg-danger-500 hover:border-danger-500 hover:bg-danger-600"
                                            size="icon-md"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </TooltipTrigger>
                                }
                                onConfirm={(reason: string) => handleReject(enterprise.enterpriseId, reason)}
                                onCancel={() => {
                                    toast.info('Rejection cancelled!');
                                }}
                            />

                            <TooltipContent
                                side="bottom"
                                className="rounded-2xl border border-danger-200 bg-danger-50 px-3 py-1 text-danger shadow-sm drop-shadow-sm"
                            >
                                <p>Reject</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </TableCell>
        </TableRow>
    )
);

EnterpriseRegistrationItem.displayName = 'EnterpriseRegistrationItem';

export { EnterpriseRegistrationItem };
