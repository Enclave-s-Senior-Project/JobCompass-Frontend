'use client';
import { CheckCircle, Clock, MoreVertical, Award, Info, XCircle, Users } from 'lucide-react';
import { Button } from '../ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { motion } from 'framer-motion';
import { motionVariant } from '@/lib/motion-variants';
import { useRouter } from 'next/navigation';
import * as services from '@/services/boost-job.service';

interface JobItemProps {
    job: {
        jobId: string;
        name: string;
        type: string;
        timeRemaining: string;
        status: string;
        applications: number;
    };
    isMenuOpen: boolean;
    onToggleMenu: () => void;
}

export default function JobItem({ job }: JobItemProps) {
    const router = useRouter();
    async function handleButtonBoostJob() {
        try {
            await services.BoostJobService.bootJob({
                jobId: job.jobId,
            });
        } catch (error) {
            console.error('Error boosting job:', error);
        }
    }
    return (
        <motion.div
            className="py-4 px-8 md:px-0 bg-white cursor-pointer border-none"
            variants={motionVariant.itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center p-5 border-2 rounded-xl border-gray-100 hover:border-primary hover:shadow-lg transition-colors">
                {/* Job Title and Info */}
                <div className="col-span-12 md:col-span-4 flex flex-col">
                    <h3 className="font-medium text-lg">{job.name}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                        <span>{job.type}</span>
                        <span className="mx-2 hidden md:inline-block">•</span>
                        <div className="flex items-center">
                            {job.status === 'Expire' ? <Clock className="h-3 w-3 mr-1" /> : null}
                            <span>{job.timeRemaining}</span>
                        </div>
                    </div>
                </div>

                {/* Status */}
                <div className="col-span-6 md:col-span-2 flex md:justify-center items-center text-sm">
                    {job.status === 'Active' ? (
                        <div className="flex items-center text-green-500">
                            <CheckCircle className="w-5 h-5 mr-1" />
                            <span>Active</span>
                        </div>
                    ) : (
                        <div className="flex items-center text-danger-500">
                            <XCircle className="w-5 h-5 mr-1" />
                            <span>Expire</span>
                        </div>
                    )}
                </div>

                {/* Applications */}
                <div className="col-span-6 md:col-span-3 flex md:justify-center items-center text-sm">
                    <Users className="w-5 h-5 mr-2 text-gray-600" />
                    <span className="text-gray-600">{job.applications} Applications</span>
                </div>

                {/* Actions */}
                <div className="col-span-12 md:col-span-3 flex flex-col md:flex-row md:justify-between items-start md:items-center space-y-3 md:space-y-0">
                    <Button
                        size="md"
                        variant="third"
                        className="text-base font-semibold w-full md:w-auto"
                        onClick={() => {
                            router.push(`/employer-dashboard/my-jobs/${job.jobId}/applications`);
                        }}
                    >
                        View Applications
                    </Button>

                    <div className="md:ml-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon-md" className="shadow-none">
                                    <MoreVertical className="h-5 w-5 text-gray-500" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuItem className="p-0" onClick={handleButtonBoostJob}>
                                    <div className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary hover:bg-primary-50 w-full text-left transition-all">
                                        <Award className="size-5 mr-2" />
                                        Promote Job
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="p-0"
                                    onClick={() => router.push(`/single-job/${job.jobId}`)}
                                >
                                    <div className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary hover:bg-primary-50 w-full text-left transition-all">
                                        <Info className="size-5 mr-2" />
                                        View Detail
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="p-0">
                                    <div className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary hover:bg-primary-50 w-full text-left transition-all">
                                        <XCircle className="size-5 mr-2" />
                                        Make it Expire
                                    </div>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
