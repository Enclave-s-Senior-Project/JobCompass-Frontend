'use client';
import { Job } from '@/types';
import { motion } from 'framer-motion';
import { Building2, Calendar, HandCoins, MapPin } from 'lucide-react';
import Link from 'next/link';
import { motionVariant } from '@/lib/motion-variants';
import { ListTag } from './list-tags';

export default function CardJob(props: { job: Job }) {
    const { job } = props;
    const addresses =
        job.addresses?.[0]?.city && job.addresses?.[0]?.country
            ? `${job.addresses[0].city}, ${job.addresses[0].country}`
            : 'Unknown location';
    const infoItems = [];

    if (job.type) {
        infoItems.push(
            <div key="type" className="flex flex-row items-center gap-1">
                <Calendar className="h-4 w-4" /> <span>{job.type}</span>
            </div>
        );
    }

    if (job.lowestWage && job.highestWage) {
        infoItems.push(
            <div key="wage" className="flex flex-row items-center gap-1">
                <HandCoins className="h-4 w-4" />
                <span>
                    ${job.lowestWage}-${job.highestWage}
                </span>
            </div>
        );
    }

    if (job?.enterprise?.name) {
        infoItems.push(
            <div key="enterprise" className="flex flex-row items-center gap-1">
                <Building2 className="h-4 w-4" /> {job.enterprise.name}
            </div>
        );
    }
    return (
        <Link href={`/single-job/${job.jobId}`}>
            <motion.div
                className="flex h-[204px] w-[414px] flex-col justify-center rounded-md border-2 bg-white p-6 transition-shadow hover:border-[#0A65CC] sm:h-[180px] sm:w-[350px] md:h-[200px] md:w-[400px] lg:h-[204px] lg:w-[414px] xl:h-[204px] xl:w-[414px]"
                variants={motionVariant.containerVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
            >
                <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-start gap-4">
                        <div className="relative flex-shrink-0 overflow-hidden rounded-lg border-none bg-gray-50">
                            <img
                                src={job.enterprise?.logoUrl || ''}
                                width={48}
                                height={48}
                                className="h-14 w-14 rounded-sm object-cover"
                                alt={job.enterprise?.name}
                            />
                        </div>

                        <div className="gap-4">
                            <div className="mb-1 flex min-h-[20px] items-center gap-2">
                                <ListTag tag={job?.tags ?? []} />
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                                <MapPin className="mr-1 h-4 w-4 flex-shrink-0 text-[#939AAD]" />
                                <span className="text-[#939AAD]">{addresses}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-[8px]">
                    <h2 className="text-[20px]/[32px] font-medium text-blue-600">{job.name}</h2>
                    {infoItems.length > 0 && (
                        <div className="flex items-center gap-2 text-sm text-[#636A80]">
                            {infoItems.map((item, index) => (
                                <span key={index} className="flex items-center gap-2">
                                    {index > 0 && <span> | </span>}
                                    {item}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>
        </Link>
    );
}
