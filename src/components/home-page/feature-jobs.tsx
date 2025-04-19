'use client';

import React from 'react';
import { HomePart } from './home-part';
import { ArrowRight, Building2, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { LuArrowRight } from 'react-icons/lu';
import { motion } from 'framer-motion';
import { motionVariant } from '@/lib/motion-variants';
import { ButtonMark } from '../custom-ui/button-mark';

const jobs = [
    {
        title: 'Senior UX Designer',
        company: 'Google Inc',
        location: 'Mountain View, CA',
        type: 'Full Time',
        applicants: '56',
    },
    {
        title: 'Software Engineer',
        company: 'Microsoft',
        location: 'Seattle, WA',
        type: 'Full Time',
        applicants: '43',
    },
    {
        title: 'Product Manager',
        company: 'Apple',
        location: 'Cupertino, CA',
        type: 'Full Time',
        applicants: '38',
    },
];

export function FeatureJobs() {
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
                {jobs.map((job, index) => (
                    <div
                        key={index}
                        className="flex flex-wrap items-center justify-between gap-8 rounded-xl border-2 border-gray-100 p-8 transition-colors hover:border-primary"
                    >
                        <div className="flex items-center gap-5">
                            <div className="h-w-16 flex w-16 items-center justify-center rounded-lg bg-slate-100">
                                <svg
                                    width="68"
                                    height="68"
                                    viewBox="0 0 68 68"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect width="68" height="68" rx="6" fill="#191F33" />
                                    <path
                                        d="M35.1808 22.437C37.0196 20.0123 39.5759 20.0005 39.5759 20.0005C39.5759 20.0005 39.9562 22.2801 38.1294 24.4761C36.1789 26.821 33.9619 26.4373 33.9619 26.4373C33.9619 26.4373 33.5456 24.5932 35.1808 22.437ZM34.1958 28.0342C35.1418 28.0342 36.8974 26.7332 39.1826 26.7332C43.1163 26.7332 44.6637 29.5336 44.6637 29.5336C44.6637 29.5336 41.6371 31.0818 41.6371 34.8383C41.6371 39.0761 45.4075 40.5365 45.4075 40.5365C45.4075 40.5365 42.7719 47.9582 39.2119 47.9582C37.5769 47.9582 36.3057 46.8559 34.5829 46.8559C32.8272 46.8559 31.085 47.9994 29.9503 47.9994C26.6995 47.9995 22.5927 40.9592 22.5927 35.2999C22.5927 29.7321 26.0688 26.8113 29.3294 26.8113C31.449 26.8113 33.0938 28.0342 34.1958 28.0342Z"
                                        fill="white"
                                    />
                                </svg>
                            </div>
                            <div className="space-y-3">
                                <h3 className="flex items-center gap-2 text-xl font-semibold">
                                    {job.title}&nbsp;
                                    <Badge className="rounded-xl border-none bg-primary-100 px-4 text-primary shadow-none">
                                        {job.type}
                                    </Badge>
                                </h3>
                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1 text-sm">
                                        <Building2 className="h-5 w-5" /> {job.company}
                                    </span>
                                    <span className="flex items-center gap-1 text-sm">
                                        <MapPin className="h-5 w-5" /> {job.location}
                                    </span>
                                    <span className="flex items-center gap-1 text-sm">
                                        <Users className="h-5 w-5" /> {job.applicants} Applicants
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-1 items-center justify-end gap-3">
                            <ButtonMark />
                            <Button className="group" variant="secondary" size="xl">
                                Apply Now <LuArrowRight className="transition-all group-hover:translate-x-2" />
                            </Button>
                        </div>
                    </div>
                ))}
            </motion.div>
        </HomePart>
    );
}
