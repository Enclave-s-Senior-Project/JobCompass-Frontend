'use client';
import { Job } from '@/types';
import { motion } from 'framer-motion';
import { cn, toFormattedDate } from '@/lib/utils';
import { IoIosCheckmarkCircle, IoIosClock, IoMdCloseCircle } from 'react-icons/io';
import { capitalize } from 'lodash';
import { JobStatusEnum } from '@/lib/common-enum';

type props = {
    job: Job;
    handleViewDetails?: () => void;
};

export default function JobRowDashboard({ job, handleViewDetails }: props) {
    return (
        <motion.tr initial="hidden" animate="visible" whileHover={{ backgroundColor: '#f9fafb' }}>
            <td className="whitespace-nowrap px-6 py-4">{job.name}</td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                <motion.span whileHover={{ scale: 1.05 }} className={`ml-4 rounded-md px-2 py-1 text-xs`}></motion.span>
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{toFormattedDate(job?.createdAt)}</td>
            <td className="whitespace-nowrap px-6 py-4">
                <motion.span
                    whileHover={{ scale: 1.05 }}
                    className={cn(
                        'flex items-center gap-1 text-sm [&_svg]:size-4',
                        job.status === JobStatusEnum.OPEN
                            ? 'text-green-600'
                            : job.status === JobStatusEnum.EXPIRED
                              ? 'text-purple-600'
                              : 'text-danger-600'
                    )}
                >
                    {job.status === JobStatusEnum.OPEN ? (
                        <IoIosCheckmarkCircle />
                    ) : job.status === JobStatusEnum.EXPIRED ? (
                        <IoIosClock />
                    ) : (
                        <IoMdCloseCircle />
                    )}

                    {capitalize(job.status)}
                </motion.span>
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                <motion.button
                    whileHover={{ scale: 1.05, x: 3 }}
                    className="text-blue-600 transition-colors hover:text-blue-900"
                    onClick={handleViewDetails}
                >
                    View Details
                </motion.button>
            </td>
        </motion.tr>
    );
}
