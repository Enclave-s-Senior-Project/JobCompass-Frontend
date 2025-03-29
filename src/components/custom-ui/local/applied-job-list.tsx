import React, { memo } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Image from 'next/image';
import jobPlaceholder from '@/assets/images/placeholder/job-placeholder.jpg';
import { Check, DollarSign, MapPin, X } from 'lucide-react';
import { AppliedJob } from '@/types';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { BadgeJobType } from '@/components/custom-ui/global/badge-job-type';
import { JobTypeEnum } from '@/lib/common-enum';
import { getAppliedJobStatus, getJobAddress, toDollarK, toFormattedDate } from '@/lib/utils';

type Props = {
    items: AppliedJob[];
    isPending?: boolean;
};

export const AppliedJobList = memo(({ items = [], isPending = false }: Props) => {
    return (
        <Table className="hidden md:table">
            {items.length === 0 && !isPending && <TableCaption>There are no applications</TableCaption>}
            <TableHeader>
                <TableRow className="uppercase">
                    <TableHead>jobs</TableHead>
                    <TableHead>date applied</TableHead>
                    <TableHead>status</TableHead>
                    <TableHead>action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {isPending
                    ? Array.from({ length: 5 }).map((_, index) => (
                          <TableRow key={index} className="border-p-primary">
                              <TableCell colSpan={4}>
                                  <Skeleton className="w-full h-20" />
                              </TableCell>
                          </TableRow>
                      ))
                    : items.map((appliedJob) => {
                          const jobAddresses = getJobAddress(appliedJob?.job.addresses || []);
                          const status = getAppliedJobStatus(appliedJob);

                          return (
                              <TableRow key={appliedJob.appliedJobId}>
                                  <TableCell className="py-5">
                                      <div className="flex items-center gap-4">
                                          <Image
                                              loading="lazy"
                                              priority={false} // Preload the first image
                                              className="flex size-14 rounded-sm"
                                              width={56}
                                              height={56}
                                              src={
                                                  appliedJob?.job?.introImg ||
                                                  appliedJob?.job?.enterprise?.logoUrl ||
                                                  jobPlaceholder
                                              }
                                              alt={appliedJob?.job?.name}
                                          />
                                          <div className="space-y-2">
                                              <div className="text-gray-900 font-medium text-base">
                                                  {appliedJob?.job?.name}&nbsp;
                                                  {appliedJob?.job?.type && (
                                                      <BadgeJobType type={appliedJob?.job?.type as JobTypeEnum} />
                                                  )}
                                              </div>
                                              <div className="flex items-center text-sm text-gray-600 gap-4">
                                                  <span className="flex items-center gap-1 text-sm">
                                                      <MapPin className="h-5 w-5" />{' '}
                                                      <span className="line-clamp-1">{jobAddresses}</span>
                                                  </span>
                                                  <span className="flex items-center gap-1 text-sm">
                                                      <DollarSign className="h-5 w-5" /> $
                                                      {toDollarK(Number(appliedJob?.job?.lowestWage) || 0)} - $
                                                      {toDollarK(Number(appliedJob?.job?.highestWage) || 0)}
                                                      /month
                                                  </span>
                                              </div>
                                          </div>
                                      </div>
                                  </TableCell>
                                  <TableCell className="py-5 text-gray-600 text-sm">
                                      {appliedJob?.job?.deadline
                                          ? toFormattedDate(appliedJob?.createdAt, true)
                                          : 'Not specified'}
                                  </TableCell>
                                  <TableCell>
                                      {status ? (
                                          <span className="flex items-center gap-1 text-sm text-green-500">
                                              <Check className="size-4" /> Active
                                          </span>
                                      ) : (
                                          <span className="flex items-center gap-1 text-sm text-danger-500">
                                              <X className="size-4" /> Inactive
                                          </span>
                                      )}
                                  </TableCell>
                                  <TableCell className="py-5">
                                      <Button size="md">View Details</Button>
                                  </TableCell>
                              </TableRow>
                          );
                      })}
            </TableBody>
        </Table>
    );
});
AppliedJobList.displayName = 'AppliedJobList';
