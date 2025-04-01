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
            className="space-y-6 w-full rounded-md border-2 border-input hover:border-primary bg-white"
            variants={motionVariant.containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -2 }}
        >
            <div
                className={clsx(
                    'w-full flex gap-8 flex-wrap items-center justify-between p-5 border-2 rounded-xl hover:shadow-lg transition-colors',
                    props.border ? 'border-2' : 'border-transparent'
                )}
            >
                <div className="flex items-center gap-5">
                    <div className="w-16 h-w-16 bg-slate-100 rounded-lg flex items-center justify-center">
                        <Link href={`/single-job/${job?.jobId}`}>
                            <img
                                loading="lazy"
                                src={job?.enterprise?.logoUrl || ''}
                                alt={job?.enterprise?.name || 'Company Logo'}
                                className="w-[68px] h-[68px] object-cover rounded-md"
                            />
                        </Link>
                    </div>
                    <div className="space-y-3">
                        <Link href={`/single-job/${job?.jobId}`}>
                            <h3 className="font-semibold text-xl flex items-center gap-2 hover:underline">
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
                <div className="flex-1 flex items-center justify-end gap-3">
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
                                Apply Now <LuArrowRight className="group-hover:translate-x-2 transition-all" />
                            </Button>
                        }
                    />
                </div>
            </div>
        </motion.div>
    );
}
