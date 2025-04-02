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
                className="bg-white rounded-md p-6 border-2 hover:border-[#0A65CC] transition-shadow flex flex-col justify-center 
                w-[414px] h-[204px] 
                sm:w-[350px] sm:h-[180px] 
                md:w-[400px] md:h-[200px] 
                lg:w-[414px] lg:h-[204px] 
                xl:w-[414px] xl:h-[204px]"
                variants={motionVariant.containerVariants}
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
                                alt={job.enterprise?.name}
                            />
                        </div>

                        <div className="gap-4">
                            <div className="flex items-center gap-2 mb-1 min-h-[20px]">
                                <ListTag tag={job?.tags ?? []} />
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
