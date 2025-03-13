'use client';
import { Job } from '@/types';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import Link from 'next/link';
import { motionVariant } from '@/lib/motion-variants';
import { getRandomFeatureColor } from '@/lib/random-color';

export default function CardJob(props: { job: Job }) {
    const { job } = props;
    const addresses =
        job.addresses?.[0]?.city && job.addresses?.[0]?.country
            ? `${job.addresses[0].city}, ${job.addresses[0].country}`
            : 'Unknown location';

    return (
        <Link href={`/single-job?id=${job.jobId}`}>
            <motion.div
                className="bg-white rounded-3xl p-6 border hover:border-[#0A65CC] transition-shadow flex flex-col justify-center xl:w-[424px] xl:h-[204px]"
                variants={motionVariant.cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
            >
                <div className="flex items-start justify-between mb-4 ">
                    <div className="flex items-start gap-4">
                        <div className=" relative rounded-lg overflow-hidden border-none flex-shrink-0 bg-gray-50">
                            <img
                                src={job.enterprise?.logoUrl || ''}
                                width={48}
                                height={48}
                                className="w-14 h-14 object-cover rounded-sm"
                            />
                        </div>

                        <div className="gap-4">
                            <div className="flex items-center gap-2 mb-1">
                                {job.tags?.map((feature, index) => {
                                    const color = getRandomFeatureColor(index);
                                    console.log(color.bg, color.text);
                                    return (
                                        <span
                                            key={feature.tagId}
                                            className={`text-xs px-2 py-1 rounded-full ${color.bg} ${color.text} border border-opacity-50`}
                                        >
                                            {feature.name}
                                        </span>
                                    );
                                })}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                                <MapPin className="h-4 w-4 mr-1 flex-shrink-0 text-[#939AAD]" />
                                <span className=" text-[#939AAD]">{addresses}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-[8px] ">
                    <h2 className=" text-blue-600 text-[20px]/[32px] font-medium">{job.name}</h2>
                    <div className="flex items-center gap-2 text-sm text-[#636A80]">
                        <span>{job.type}</span>
                        <span>•</span>
                        <span>
                            ${job.lowestWage}-${job.highestWage}
                        </span>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
