'use client';
import { Job } from '@/types';
import { motion } from 'framer-motion';
import { motionVariant } from '@/lib/motion-variants';
import { Building2, Calendar, CircleX, DollarSign, MapPin } from 'lucide-react';
import { ButtonMark } from '../custom-ui/button-mark';
import { Button } from '@/components/ui/button';
import { LuArrowRight } from 'react-icons/lu';
import clsx from 'clsx';
import { JobTypeEnum } from '@/lib/common-enum';
import { toFormattedDate } from '@/lib/utils';
import { BadgeJobType } from './global/badge-job-type';
import Link from 'next/link';
import { DialogApplyJob } from './dialog-apply-job';

export default function CardJobHorizontal(props: {
    job: Job;
    border?: boolean;
    mark?: boolean;
    handleUnMark?: () => void;
    handleMark?: () => void;
    showMarkButton?: boolean;
}) {
    const { job } = props;
    const addresses =
        job?.addresses?.[0]?.city && job?.addresses?.[0]?.country
            ? `${job?.addresses[0].city}, ${job?.addresses[0].country}`
            : 'Unknown location';
    return (
        <motion.div
            className="w-full space-y-6 rounded-md border-2 border-input bg-white hover:border-primary"
            variants={motionVariant.containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -2 }}
        >
            <div
                className={clsx(
                    'flex w-full flex-wrap items-center justify-between gap-8 rounded-xl border-2 p-5 transition-colors hover:shadow-lg',
                    props.border ? 'border-2' : 'border-transparent'
                )}
            >
                <div className="flex items-center gap-5">
                    <div className="h-w-16 flex w-16 items-center justify-center rounded-lg bg-slate-100">
                        <Link href={`/single-job/${job?.jobId}`}>
                            <img
                                loading="lazy"
                                src={job?.enterprise?.logoUrl || ''}
                                alt={job?.enterprise?.name || 'Company Logo'}
                                className="h-[68px] w-[68px] rounded-md object-cover"
                            />
                        </Link>
                    </div>
                    <div className="space-y-3">
                        <Link href={`/single-job/${job?.jobId}`}>
                            <h3 className="flex items-center gap-2 text-xl font-semibold hover:underline">
                                {job?.name}&nbsp;
                                {job?.type && <BadgeJobType type={job.type as JobTypeEnum} />}
                            </h3>
                        </Link>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1 text-sm">
                                <Building2 className="h-5 w-5" /> {job?.enterprise?.name}
                            </span>
                            <span className="flex items-center gap-1 text-sm">
                                <MapPin className="h-5 w-5" /> {addresses}
                            </span>
                            <span className="flex items-center gap-1 text-sm">
                                <DollarSign className="h-5 w-5" /> $
                                {Number(job?.lowestWage) > 1000
                                    ? `${Number(job?.lowestWage) / 1000}K`
                                    : job?.lowestWage}{' '}
                                - $
                                {Number(job?.highestWage) > 1000
                                    ? `${Number(job?.highestWage) / 1000}K`
                                    : job?.highestWage}
                            </span>
                            {new Date(job?.deadline).getTime() < Date.now() ? (
                                <span className="flex items-center gap-1 text-sm text-danger">
                                    <CircleX className="h-5 w-5" /> Job Expire
                                </span>
                            ) : (
                                <span className="flex items-center gap-1 text-sm">
                                    <Calendar className="h-5 w-5" />{' '}
                                    {job?.deadline ? toFormattedDate(job?.deadline) : 'Not specified'}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 items-center justify-end gap-3">
                    {props.showMarkButton && (
                        <ButtonMark
                            handleUnMark={props.handleUnMark}
                            handleMark={props.handleMark}
                            mark={!!props.mark}
                        />
                    )}

                    <DialogApplyJob
                        nameJob={job?.name || 'Unknown Job'}
                        jobId={job?.jobId}
                        trigger={
                            <Button
                                className="group"
                                variant="third"
                                size="lg"
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            >
                                Apply Now <LuArrowRight className="transition-all group-hover:translate-x-2" />
                            </Button>
                        }
                    />
                </div>
            </div>
        </motion.div>
    );
}
