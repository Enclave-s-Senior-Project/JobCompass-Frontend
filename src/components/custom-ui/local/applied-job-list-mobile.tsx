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
export function AppliedJobListMobile({ items = [], isPending }: Props) {
    return (
        <div className="md:hidden space-y-4">
            {isPending
                ? Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} className="w-full h-20" />)
                : items.map((appliedJob) => {
                      const jobAddresses = getJobAddress(appliedJob?.job.addresses || []);
                      const status = getAppliedJobStatus(appliedJob);
                      return (
                          <Card key={appliedJob.appliedJobId} className="bg-white rounded-sm p-2 mb-3 shadow-sm">
                              <div className="flex items-start gap-2">
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
                                  <div className="flex-1">
                                      <div className="text-base font-semibold flex items-center">
                                          {appliedJob?.job?.name}&nbsp;
                                          <BadgeJobType type={appliedJob?.job?.type as JobTypeEnum} />
                                      </div>

                                      <div className="flex flex-col gap-2 mt-3">
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

                                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
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
}
