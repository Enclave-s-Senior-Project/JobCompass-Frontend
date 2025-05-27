'use client';

import React from 'react';
import { HomePart } from './home-part';
import { ArrowRight, Building2, CircleDollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { LuArrowRight } from 'react-icons/lu';
import { motion } from 'framer-motion';
import { motionVariant } from '@/lib/motion-variants';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/lib/react-query/keys';
import { DashboardService } from '@/services/dashboard.service';
import { handleErrorToast } from '@/lib/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export function FeatureJobs() {
    const router = useRouter();
    const { data } = useQuery({
        queryKey: [queryKey.getJobHomePage],
        queryFn: async () => {
            try {
                return await DashboardService.getJobHomePage();
            } catch (error) {
                handleErrorToast(error);
            }
        },
        retry: 1,
    });
    return (
        <HomePart
            title="Featured jobs"
            linkNode={
                <Link href="#" className="flex items-center gap-2 text-primary">
                    View all <ArrowRight className="h-4 w-4" />
                </Link>
            }
        >
            <motion.div
                className="space-y-6"
                variants={motionVariant.itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {data?.map((job, index) => (
                    <div
                        key={index}
                        className="flex flex-wrap items-center justify-between gap-8 rounded-xl border-2 border-gray-100 p-8 transition-colors hover:border-primary"
                    >
                        <div className="flex items-center gap-5">
                            <div className="h-w-16 flex w-16 items-center justify-center rounded-lg bg-slate-100">
                                <Image src={job.enterprise.logoUrl} alt={job.jobName} width={68} height={68} />
                            </div>
                            <div className="space-y-3">
                                <h3 className="flex items-center gap-2 text-xl font-semibold">
                                    {job.jobName}&nbsp;
                                    <Badge className="rounded-xl border-none bg-primary-100 px-4 text-primary shadow-none">
                                        {job.type}
                                    </Badge>
                                </h3>
                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1 text-sm">
                                        <Building2 className="h-5 w-5" /> {job.enterprise.name}
                                    </span>
                                    <span className="flex items-center gap-1 text-sm">
                                        <CircleDollarSign className="h-5 w-5" /> {job.lowestWage} USD -{' '}
                                        {job.highestWage} USD
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-1 items-center justify-end gap-3">
                            <Button
                                className="group"
                                variant="secondary"
                                size="xl"
                                onClick={() => {
                                    router.push(`/single-job/${job.jobId}`);
                                }}
                            >
                                View Detail
                                <LuArrowRight className="transition-all group-hover:translate-x-2" />
                            </Button>
                        </div>
                    </div>
                ))}
            </motion.div>
        </HomePart>
    );
}
