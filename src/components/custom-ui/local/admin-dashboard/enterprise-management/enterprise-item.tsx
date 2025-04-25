'use client';

import { memo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ArrowDownUp, Ban, Check, Clock, Info, PhoneCall, ShieldCheck, UsersRound, X } from 'lucide-react';
import Image from 'next/image';
import { cn, handleErrorToast, toFormattedDate } from '@/lib/utils';
import { DetailedRequest, Enterprise } from '@/types';
import { EnterpriseStatus } from '@/lib/common-enum';
import { DialogChangeEnterpriseStatus } from './dialog-change-enteprise-status';
import { useMutation } from '@tanstack/react-query';
import { EnterpriseService } from '@/services/enterprises.service';
import { toast } from '@/lib/toast';

const EnterpriseItem = memo(({ enterprise, refetch }: { enterprise: Enterprise; refetch: () => void }) => {
    const [loadingToastId, setLoadingToastId] = useState<string | null>(null);

    const updateStatusEnterpriseMutation = useMutation({
        mutationFn: async (data: DetailedRequest.UpdateEnterpriseStatus) => {
            setLoadingToastId(toast.loading('Promising...'));
            await EnterpriseService.updateEnterpriseStatus(data);
        },
        onSuccess: () => {
            toast.success('Update enterprise status successfully!');
        },
        onError: (error) => {
            handleErrorToast(error);
        },
        onSettled: () => {
            if (loadingToastId) toast.remove(loadingToastId);
            refetch();
        },
    });

    const handleUpdateEnterpriseStatus = (status: EnterpriseStatus, reason?: string) => {
        updateStatusEnterpriseMutation.mutate({
            enterpriseId: enterprise.enterpriseId,
            status,
            reason,
        });
    };

    return (
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
            <TableCell>
                <div className="flex items-center gap-1">
                    {enterprise.status === EnterpriseStatus.ACTIVE ? (
                        <Check className="h-4 w-4 text-green" />
                    ) : enterprise.status === EnterpriseStatus.PENDING ? (
                        <Clock className="h-4 w-4 text-warning" />
                    ) : enterprise.status === EnterpriseStatus.BLOCKED ? (
                        <Ban className="h-4 w-4 text-danger" />
                    ) : enterprise.status === EnterpriseStatus.REJECTED ? (
                        <X className="h-4 w-4 text-purple-800" />
                    ) : (
                        <></>
                    )}

                    <span
                        className={cn(
                            'text-nowrap text-[12px] font-semibold',
                            enterprise.status === EnterpriseStatus.ACTIVE
                                ? 'text-green'
                                : enterprise.status === EnterpriseStatus.PENDING
                                  ? 'text-warning'
                                  : enterprise.status === EnterpriseStatus.BLOCKED
                                    ? 'text-danger'
                                    : enterprise.status === EnterpriseStatus.REJECTED
                                      ? 'text-purple-800'
                                      : ''
                        )}
                    >
                        {enterprise.status}
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
                                        window.open(`/admin-dashboard/enterprise/${enterprise.enterpriseId}`, '_blank')
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
                            <DialogChangeEnterpriseStatus
                                nodeTrigger={
                                    <TooltipTrigger asChild>
                                        <Button size="icon-md">
                                            <ArrowDownUp className="h-4 w-4" />
                                        </Button>
                                    </TooltipTrigger>
                                }
                                onClose={() => {}}
                                onSubmit={handleUpdateEnterpriseStatus}
                                currentStatus={enterprise.status || EnterpriseStatus.PENDING}
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
});

EnterpriseItem.displayName = 'EnterpriseItem';

export { EnterpriseItem };
