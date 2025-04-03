'use client';

import { Job, Tag } from '@/types';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { JobStatusEnum } from '@/lib/common-enum';
import { capitalize } from 'lodash';
import clsx from 'clsx';
import { Award, Calendar, Info, MapPin, MoreVerticalIcon, UsersRound, XCircle, Zap, ZapOff } from 'lucide-react';
import { handleErrorToast, toDollarK, toFormattedDate } from '@/lib/utils';
import { getRandomFeatureColor } from '@/lib/random-color';
import { Button } from '@/components/ui/button';
import { Separator } from '@radix-ui/react-select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { memo } from 'react';
import { useRouter } from 'next/navigation';
import { BoostJobService } from '@/services';

interface JobItemProps {
    job: Job;
}

const JobItem = memo(({ job }: JobItemProps) => {
    const router = useRouter();
    async function handleButtonBoostJob() {
        try {
            await BoostJobService.bootJob({
                jobId: job.jobId,
            });
        } catch (error) {
            handleErrorToast(error);
        }
    }
    return (
        <Card key={job.jobId} className="p-2 md:p-4 rounded-md shadow-sm hover:drop-shadow-md hover:shadow-lg cursor-pointer transition-all">
            <div className="space-y-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2">
                        <Image
                            src={job?.enterprise?.logoUrl || job?.introImg}
                            alt={job?.name}
                            className="size-16 rounded-md object-cover object-center"
                            width={64}
                            height={64}
                        />
                        <div>
                            <h3 className="text-lg font-semibold">{job?.name}</h3>
                            <p className="text-sm text-gray-500 flex items-center flex-wrap">
                                <span className="text-nowrap">{job?.categories?.[0]?.categoryName}</span>&nbsp;•&nbsp;
                                {job?.type}&nbsp;•&nbsp;
                                <i
                                    className={clsx(
                                        'not-italic text-white py-0.5 px-2 rounded-lg',
                                        job?.status === JobStatusEnum.OPEN
                                            ? 'bg-green-400'
                                            : job?.status === JobStatusEnum.CLOSED
                                              ? 'bg-warning-400'
                                              : 'bg-danger-400'
                                    )}
                                >
                                    {capitalize(job.status)}
                                </i>
                            </p>
                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon-md" className="shadow-none">
                                <MoreVerticalIcon className="h-5 w-5 text-gray-500" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuItem className="p-0" onClick={handleButtonBoostJob}>
                                <div className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary hover:bg-primary-50 w-full text-left transition-all">
                                    <Award className="size-5 mr-2" />
                                    Promote Job
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="p-0" onClick={() => router.push(`/single-job/${job.jobId}`)}>
                                <div className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary hover:bg-primary-50 w-full text-left transition-all">
                                    <Info className="size-5 mr-2" />
                                    View Detail
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="p-0">
                                <div className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary hover:bg-primary-50 w-full text-left transition-all">
                                    <XCircle className="size-5 mr-2" />
                                    Make it Expire
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="space-y-2 text-sm text-gray-800">
                    <div className="flex items-start">
                        <MapPin className="size-5" />
                        &nbsp;
                        {job?.addresses && job?.addresses.length > 0
                            ? job.addresses
                                  ?.map((address) => `${address.street}, ${address.city}, ${address.country}`)
                                  .join('\n')
                            : 'Unknown location'}
                    </div>
                    <div className="flex items-start">
                        <Award className="size-5" />
                        &nbsp;
                        {job?.experience} years of experience
                    </div>
                    <div className="flex items-start">
                        <Calendar className="size-5" />
                        &nbsp;
                        {toFormattedDate(job?.deadline)} (
                        {job?.status === JobStatusEnum.EXPIRED
                            ? 'Expired'
                            : `${new Date(Date.now() - new Date(job?.deadline).getTime()).getDate()} days left`}
                        )
                    </div>
                    <div className="flex items-start gap-2 flex-wrap">
                        {job.tags?.map((tag) => <TagBadge key={tag.tagId} tag={tag} />)}
                    </div>
                </div>
                <div className="flex flex-col items-end mt-4 text-end gap-4">
                    <div>
                        <p className="text-sm text-gray-500">Salary range</p>
                        <p>
                            {toDollarK(Number(job?.lowestWage) || 0)} - {toDollarK(Number(job?.highestWage) || 0)} /
                            month
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Applications</p>
                        <div className="flex items-center justify-end gap-1">
                            <UsersRound className="size-4" /> {job?.applicationCount}
                        </div>
                    </div>
                    <Separator className="w-full border-b" />
                </div>
                <div className="flex items-center justify-between">
                    {job?.isBoost ? (
                        <div className="flex items-center gap-2 text-base text-warning-500 font-semibold uppercase">
                            <Zap className="size-6" />
                            Boosted
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 text-base text-gray-500">
                            <ZapOff className="size-6" /> Not boosted
                        </div>
                    )}
                    <Button
                        onClick={() => {
                            router.push(`/employer-dashboard/my-jobs/${job.jobId}/applications`);
                        }}
                    >
                        View Applications
                    </Button>
                </div>
            </div>
        </Card>
    );
});

const TagBadge = ({ tag }: { tag: Tag }) => {
    const color = getRandomFeatureColor();
    return (
        <span
            key={tag.tagId}
            className={clsx('px-2 py-0.5 rounded-lg', `text-${color.text} ${color.bg}`)}
        >
            {tag.name}
        </span>
    );
}

export { JobItem };
