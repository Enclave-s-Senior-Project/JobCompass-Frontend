import { DetailedResponse } from 'api-types';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import CardJobHorizontal from './card-job-horizontal';

export default function JobCard(props: { job: DetailedResponse.JobCardProps; viewType: string }) {
    const { job, viewType } = props;

    if (viewType === 'list') {
        return <CardJobHorizontal job={job} />;
    }

    return (
        // <Link href={"/"}>
        <motion.div
            className="bg-white rounded-3xl p-6 border hover:border-[#0A65CC] hover:shadow-lg transition-shadow flex flex-col justify-center"
            style={{ width: '424px', height: '204px' }}
            whileHover={{ y: -5 }}
        >
            <div className="flex items-start justify-between mb-4 ">
                <div className="flex items-start gap-4">
                    <div className=" relative rounded-lg overflow-hidden border flex-shrink-0 bg-gray-50">
                        <Image
                            src={job.logo || '/placeholder.svg'}
                            alt={job.company}
                            width={48}
                            height={48}
                            className="object-contain size-14 rounded-sm"
                        />
                    </div>

                    <div className="gap-4">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{job.company}</h3>
                            {job.featured && (
                                <span className="text-xs bg-red-50 text-red-500 px-2 py-1 rounded-full">Featured</span>
                            )}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="h-4 w-4 mr-1 flex-shrink-0 text-[#939AAD]" />
                            <span className=" text-[#939AAD]">{job.location}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-[8px] ">
                <h2 className=" text-blue-600 text-[20px]/[32px] font-medium">{job.title}</h2>
                <div className="flex items-center gap-2 text-sm text-[#636A80]">
                    <span>{job.type}</span>
                    <span>•</span>
                    <span>{job.salary}</span>
                </div>
            </div>
        </motion.div>
        // </Link>
    );
}
