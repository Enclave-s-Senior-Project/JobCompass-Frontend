import React, { memo } from 'react';
import { Card } from '@/components/ui/card';
import { AppliedJob } from '@/types';
import { Calendar, Check, DollarSign, MapPin, X } from 'lucide-react';
import Image from 'next/image';
import jobPlaceholder from '@/assets/images/placeholder/job-placeholder.jpg';
import { BadgeJobType } from '../global/badge-job-type';
import { JobTypeEnum } from '@/lib/common-enum';
import { getAppliedJobStatus, getJobAddress, toDollarK, toFormattedDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
    items: AppliedJob[];
    isPending?: boolean;
};

const AppliedJobListMobile = memo(({ items = [], isPending }: Props) => {
    return (
        <div className="space-y-4 md:hidden">
            {isPending
                ? Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} className="h-20 w-full" />)
                : items.map((appliedJob) => {
                      const jobAddresses = getJobAddress(appliedJob?.job.addresses || []);
                      const status = getAppliedJobStatus(appliedJob);
                      return (
                          <Card key={appliedJob.appliedJobId} className="mb-3 rounded-sm bg-white p-2 shadow-sm">
                              <div className="flex items-start gap-2">
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
                                  <div className="flex-1">
                                      <div className="flex items-center text-base font-semibold">
                                          {appliedJob?.job?.name}&nbsp;
                                          <BadgeJobType type={appliedJob?.job?.type as JobTypeEnum} />
                                      </div>

                                      <div className="mt-3 flex flex-col gap-2">
                                          <div className="flex items-center text-sm text-gray-600">
                                              <MapPin />
                                              {jobAddresses}
                                          </div>
                                          <div className="flex items-center text-sm text-gray-600">
                                              <DollarSign />
                                              {toDollarK(Number(appliedJob?.job?.lowestWage) || 0)} - $
                                              {toDollarK(Number(appliedJob?.job?.highestWage) || 0)}
                                              /month
                                          </div>
                                          <div className="flex items-center text-sm text-gray-600">
                                              <Calendar />
                                              {toFormattedDate(appliedJob.createdAt, true)}
                                          </div>
                                      </div>

                                      <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                                          {status ? (
                                              <span className="flex items-center gap-1 text-sm text-green-500">
                                                  <Check className="size-4" /> Active
                                              </span>
                                          ) : (
                                              <span className="flex items-center gap-1 text-sm text-danger-500">
                                                  <X className="size-4" /> Inactive
                                              </span>
                                          )}
                                          <Button
                                              size="md"
                                              onClick={() => alert(`View details for job ${appliedJob.appliedJobId}`)}
                                          >
                                              View Details
                                          </Button>
                                      </div>
                                  </div>
                              </div>
                          </Card>
                      );
                  })}
        </div>
    );
});
AppliedJobListMobile.displayName = 'AppliedJobListMobile';

export default AppliedJobListMobile;
