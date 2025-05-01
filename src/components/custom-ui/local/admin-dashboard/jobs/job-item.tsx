import { ListTag } from '@/components/custom-ui/list-tags';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { JobStatusEnum } from '@/lib/common-enum';
import { cn, toDollarK, toFormattedDate } from '@/lib/utils';
import { Job } from '@/types';
import { capitalize } from 'lodash';
import { EllipsisVertical } from 'lucide-react';
import Image from 'next/image';
import { memo } from 'react';
import { DropdownMenuJobItem } from './dropdown-menu-job-item';

type Props = {
    job: Job;
    refetchList: () => void;
};

export const JobItem = memo(({ job, refetchList }: Props) => {
    return (
        <TableRow>
            <TableCell>
                <div className="flex items-center gap-2">
                    <Image
                        src={job?.enterprise?.logoUrl}
                        alt={job?.enterprise?.name}
                        width={40}
                        height={40}
                        className="size-10 rounded-full"
                    />
                    <div>
                        <p>{job?.name}</p>
                        <p className="text-[12px] font-semibold italic">{job?.enterprise?.name}</p>
                    </div>
                </div>
            </TableCell>
            <TableCell>
                <span
                    className={cn(
                        'rounded-full px-2 py-1',
                        job?.status === JobStatusEnum.OPEN
                            ? 'bg-green-100 text-green-600'
                            : job?.status === JobStatusEnum.EXPIRED
                              ? 'bg-danger-100 text-danger-600'
                              : job?.status === JobStatusEnum.CLOSED
                                ? 'bg-purple-100 text-purple-600'
                                : ''
                    )}
                >
                    {capitalize(job?.status)}
                </span>
            </TableCell>
            <TableCell>
                <Badge variant="outline">{job?.type}</Badge>
            </TableCell>
            <TableCell>
                <Badge variant="secondary">{job?.categories?.[0].categoryName}</Badge>
            </TableCell>
            <TableCell>
                <div className="flex flex-wrap gap-1">
                    {job?.specializations?.map((s) => (
                        <Badge key={s.categoryId} variant="secondary">
                            {s.categoryName}
                        </Badge>
                    ))}
                </div>
            </TableCell>
            <TableCell>
                <span>{job?.education}</span>
            </TableCell>
            <TableCell>
                <span className="text-nowrap">{job?.experience} years</span>
            </TableCell>
            <TableCell>
                <span className="text-nowrap">
                    ${toDollarK(Number(job?.lowestWage))}&nbsp;-&nbsp;${toDollarK(Number(job?.highestWage))}
                </span>
            </TableCell>
            <TableCell>
                <ListTag tag={job?.tags || []} />
            </TableCell>
            <TableCell>
                {job?.addresses && job?.addresses.length > 0 ? (
                    <div>
                        <p className="text-nowrap">{job?.addresses[0]?.city}</p>
                        <p className="text-nowrap text-sm text-muted-foreground">{job?.addresses[0]?.country}</p>
                    </div>
                ) : (
                    <span className="text-muted-foreground">No address</span>
                )}
            </TableCell>
            <TableCell>
                <span>{toFormattedDate(job?.deadline)}</span>
            </TableCell>
            <TableCell>
                <span>{toFormattedDate(job?.createdAt)}</span>
            </TableCell>
            <TableCell>
                <DropdownMenuJobItem job={job} refetchList={refetchList}>
                    <Button variant="ghost" size="icon-md">
                        <EllipsisVertical className="size-4" />
                    </Button>
                </DropdownMenuJobItem>
            </TableCell>
        </TableRow>
    );
});

JobItem.displayName = 'JobItem';
