'use client';
import {
    BellIcon,
    BookmarkIcon,
    BriefcaseIcon,
    Calendar,
    ChevronDownIcon,
    ChevronRightIcon,
    ContactRound,
    MapPinIcon,
    User,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/lib/react-query/keys';
import { handleErrorToast, toFormattedDate } from '@/lib/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { UserService } from '@/services';
import JobRowDashboardUser from './job-row-dashboard-candidate';

export default function OverviewCandidate() {
    const router = useRouter();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isProfileExpanded, setIsProfileExpanded] = useState(false);
    const { data: resultQuery } = useQuery({
        queryKey: [queryKey.dashboard],
        queryFn: async () => {
            try {
                const temp = await UserService.getUserProfileById();
                return temp;
            } catch (error: any) {
                console.log(error);
                handleErrorToast(error);
            }
        },
    });
    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } },
    };

    const handleViewDetails = (jobId: string) => {
        router.push(`/single-job/${jobId}`);
    };

    return (
        <div className="mx-auto min-h-screen max-w-5xl bg-white pl-6 pr-6">
            {/* Header with Enterprise Score */}
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Hello,&nbsp;
                        {resultQuery?.fullName}&nbsp;
                    </h1>
                    <p className="text-gray-500">Here is your daily activities and applications</p>
                </motion.div>
            </div>

            {/* Stats Cards */}
            <motion.div
                variants={container}
                initial="hidden"
                animate={isLoaded ? 'show' : 'hidden'}
                className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3"
            >
                <motion.div
                    variants={item}
                    whileHover={{ scale: 1.03, boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.1)' }}
                    className="flex items-center justify-between rounded-lg bg-blue-50 p-4 transition-all duration-300"
                >
                    <div>
                        <motion.h2
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-2xl font-bold text-gray-900"
                        >
                            {resultQuery?.totalAppliedJob}
                        </motion.h2>
                        <p className="text-sm text-gray-600">Applied Jobs</p>
                    </div>
                    <motion.div whileHover={{ rotate: 15 }} className="rounded-lg bg-blue-100 p-3">
                        <BriefcaseIcon className="h-6 w-6 text-blue-600" />
                    </motion.div>
                </motion.div>

                <motion.div
                    variants={item}
                    whileHover={{ scale: 1.03, boxShadow: '0 10px 25px -5px rgba(245, 158, 11, 0.1)' }}
                    className="flex items-center justify-between rounded-lg bg-amber-50 p-4 transition-all duration-300"
                >
                    <div>
                        <motion.h2
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-2xl font-bold text-gray-900"
                        >
                            {resultQuery?.totalFavoriteJob}
                        </motion.h2>
                        <p className="text-sm text-gray-600">Favorite Jobs</p>
                    </div>
                    <motion.div whileHover={{ rotate: 15 }} className="rounded-lg bg-amber-100 p-3">
                        <BookmarkIcon className="h-6 w-6 text-amber-600" />
                    </motion.div>
                </motion.div>

                <motion.div
                    variants={item}
                    whileHover={{ scale: 1.03, boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.1)' }}
                    className="flex items-center justify-between rounded-lg bg-green-50 p-4 transition-all duration-300"
                >
                    <div>
                        <motion.h2
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-2xl font-bold text-gray-900"
                        >
                            22
                        </motion.h2>
                        <p className="text-sm text-gray-600">Job Alerts</p>
                    </div>
                    <motion.div whileHover={{ rotate: 15 }} className="rounded-lg bg-green-100 p-3">
                        <BellIcon className="h-6 w-6 text-green-600" />
                    </motion.div>
                </motion.div>
            </motion.div>

            <div className="mb-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="rounded-lg bg-gradient-to-r from-indigo-600 to-blue-500 p-4 text-white shadow-md"
                >
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-4">
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.7 }}
                                className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white/20"
                            >
                                <Image
                                    src={resultQuery?.profileUrl || '/placeholder.svg'}
                                    alt="Profile"
                                    width={48}
                                    height={48}
                                    className="rounded-full"
                                />
                            </motion.div>
                            <div>
                                <p className="font-medium">Your profile</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsProfileExpanded(!isProfileExpanded)}
                                className="flex items-center gap-1 rounded-md bg-white/20 px-4 py-2 text-white transition-colors hover:bg-white/30"
                            >
                                {isProfileExpanded ? 'Hide Details' : 'Show Enterprise Details'}
                                <motion.div
                                    animate={{ rotate: isProfileExpanded ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ChevronDownIcon className="h-4 w-4" />
                                </motion.div>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05, backgroundColor: '#ffffff' }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-1 rounded-md bg-white px-4 py-2 text-indigo-600 transition-colors hover:bg-gray-100"
                                onClick={() => {
                                    router.push('/candidate-dashboard/settings/personal-profile');
                                }}
                            >
                                Edit Profile
                                <motion.div
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ repeat: Number.POSITIVE_INFINITY, repeatDelay: 2, duration: 0.8 }}
                                >
                                    <ChevronRightIcon className="h-4 w-4" />
                                </motion.div>
                            </motion.button>
                        </div>
                    </div>

                    <AnimatePresence>
                        {isProfileExpanded && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="mt-4 border-t border-white/20 pt-4">
                                    <h3 className="mb-3 font-medium">Enterprise Information</h3>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="flex items-center gap-2">
                                            <MapPinIcon className="h-5 w-5 text-blue-200" />
                                            <div>
                                                <p className="text-sm text-blue-100">National</p>
                                                <p className="font-medium">{resultQuery?.nationality}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <User className="h-5 w-5 text-blue-200" />
                                            <div>
                                                <p className="text-sm text-blue-100">Gender</p>
                                                <p className="font-medium">{resultQuery?.gender}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-5 w-5 text-blue-200" />
                                            <div>
                                                <p className="text-sm text-blue-100">Date of birth</p>
                                                <p className="font-medium">
                                                    {resultQuery?.dateOfBirth
                                                        ? toFormattedDate(resultQuery.dateOfBirth)
                                                        : 'Date of birth not available'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <ContactRound className="h-5 w-5 text-blue-200" />
                                            <div>
                                                <p className="text-sm text-blue-100">Marital Status</p>
                                                <p className="font-medium">{resultQuery?.maritalStatus}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Recently Applied */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mb-6"
            >
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Recently Applied</h2>
                    <motion.a
                        whileHover={{ x: 3 }}
                        href="/candidate-dashboard/applied-jobs"
                        className="flex items-center text-gray-500 hover:text-gray-700"
                    >
                        View all
                        <motion.div
                            animate={{ x: [0, 3, 0] }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, repeatDelay: 2, duration: 0.8 }}
                        >
                            <ChevronRightIcon className="ml-1 h-4 w-4" />
                        </motion.div>
                    </motion.a>
                </div>

                <div className="overflow-x-auto rounded-lg border shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                >
                                    Job
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                ></th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                >
                                    Date Applied
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                >
                                    Status
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                >
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {resultQuery?.appliedJob?.map((temp) => (
                                <JobRowDashboardUser
                                    temp={temp}
                                    key={temp.job.jobId}
                                    handleViewDetails={() => handleViewDetails(temp.job.jobId)}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
