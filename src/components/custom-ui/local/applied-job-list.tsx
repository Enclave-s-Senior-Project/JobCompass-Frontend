import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Image from 'next/image';
import jobPlaceholder from '@/assets/images/placeholder/job-placeholder.jpg';
import { Check, DollarSign, MapPin, X } from 'lucide-react';
import { Address, AppliedJob } from '@/types';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { BadgeJobType } from '@/components/custom-ui/global/badge-job-type';
import { JobTypeEnum } from '@/lib/common-enum';
import { toFormattedDate } from '@/lib/utils';

type Props = {
    items: AppliedJob[];
    isPending?: boolean;
};
export function AppliedJobList({ items = [], isPending = false }: Props) {
    return (
        <Table>
            {items.length === 0 && <TableCaption>There are no applications</TableCaption>}
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
                              <TableCell>
                                  <Skeleton className="w-full h-20" />
                              </TableCell>

                              <TableCell>
                                  <Skeleton className="w-full h-20" />
                              </TableCell>
                              <TableCell>
                                  <Skeleton className="w-full h-20" />
                              </TableCell>
                              <TableCell>
                                  <Skeleton className="w-full h-20" />
                              </TableCell>
                          </TableRow>
                      ))
                    : Array.isArray(items) &&
                      items.map((appliedJob) => {
                          const jobAddresses =
                              appliedJob?.job.addresses && appliedJob?.job.addresses?.length > 0
                                  ? appliedJob?.job.addresses
                                        ?.map((address: Address) => `${address?.city}, ${address?.country}`)
                                        .join('| ')
                                  : 'Unknown location';

                          const status =
                              new Date(appliedJob?.job.deadline).getTime() > new Date().getTime() &&
                              appliedJob.isActive &&
                              !appliedJob.isDenied;

                          return (
                              <TableRow key={appliedJob.appliedJobId}>
                                  <TableCell className="py-5">
                                      <div className="flex items-center gap-4">
                                          <Image
                                              loading="lazy"
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
                                              <p className="text-gray-900 font-medium text-base">
                                                  {appliedJob?.job?.name}&nbsp;
                                                  {appliedJob?.job?.type && (
                                                      <BadgeJobType type={appliedJob?.job?.type as JobTypeEnum} />
                                                  )}
                                              </p>
                                              <div className="flex items-center text-sm text-gray-600 gap-4">
                                                  <span className="flex items-center gap-1 text-sm">
                                                      <MapPin className="h-5 w-5" />{' '}
                                                      <span className="line-clamp-1">{jobAddresses}</span>
                                                  </span>
                                                  <span className="flex items-center gap-1 text-sm">
                                                      <DollarSign className="h-5 w-5" /> $
                                                      {Number(appliedJob?.job?.lowestWage) >= 1000
                                                          ? `${Number(appliedJob?.job?.lowestWage) / 1000}K`
                                                          : appliedJob?.job?.lowestWage}{' '}
                                                      - $
                                                      {Number(appliedJob?.job?.highestWage) > 1000
                                                          ? `${Number(appliedJob?.job?.highestWage) / 1000}K`
                                                          : appliedJob?.job?.highestWage}
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
}
