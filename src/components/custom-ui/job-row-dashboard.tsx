'use client';
import { Job } from '@/types';
import { motion } from 'framer-motion';
import { toFormattedDate } from '@/lib/utils';

type props = {
    job: Job;
    handleViewDetails?: () => void;
};

export default function JobRowDashboard({ job, handleViewDetails }: props) {
    return (
        <motion.tr initial="hidden" animate="visible" whileHover={{ backgroundColor: '#f9fafb' }}>
            <td className="whitespace-nowrap px-6 py-4">{job.name}</td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                <motion.span whileHover={{ scale: 1.05 }} className={`ml-4 rounded-md px-2 py-1 text-xs`}>
                    {job.status}
                </motion.span>
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{toFormattedDate(job?.createdAt)}</td>
            <td className="whitespace-nowrap px-6 py-4">
                <motion.span whileHover={{ scale: 1.05 }} className="flex items-center text-sm text-green-600">
                    <svg className="mr-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Active
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
