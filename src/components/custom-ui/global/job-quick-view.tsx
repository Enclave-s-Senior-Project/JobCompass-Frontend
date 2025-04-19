import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { JobStatusEnum } from '@/lib/common-enum';
import { cn, toFormattedDate } from '@/lib/utils';
import { Job } from '@/types';
import {
    Briefcase,
    Building,
    Calendar,
    Clock,
    DollarSign,
    Eye,
    GraduationCap,
    MapPin,
    Share2,
    Star,
    Users,
} from 'lucide-react';
import React from 'react';
import { differenceInDays } from 'date-fns';
import { RichTextContent } from './rich-text-content';
import Link from 'next/link';
import { FaFacebookF, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { getRandomFeatureColor } from '@/lib/random-color';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type Props = {
    job: Job;
};

export function JobQuickView({ job }: Props) {
    const daysLeft = differenceInDays(new Date(job?.deadline), Date.now());

    return (
        <Card className="group h-full w-full max-w-3xl overflow-y-auto rounded-md transition-all duration-300 scrollbar hover:shadow-lg">
            {/* Colorful top border based on job status */}
            <div className="h-1.5 w-full" />

            <div className="p-2">
                {/* Header with company info and actions */}
                <div className="mb-5 flex items-start justify-between">
                    <div className="flex gap-4">
                        <Avatar className="h-24 w-24 rounded-lg border-2 shadow-sm">
                            <AvatarImage
                                height={500}
                                width={500}
                                loading="lazy"
                                className="object-cover object-center"
                                src={job?.enterprise?.logoUrl}
                                alt={job?.enterprise?.name}
                            />
                            <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-700 text-lg text-white">
                                {job?.enterprise?.name}
                            </AvatarFallback>
                        </Avatar>

                        <div>
                            <div className="mb-1 flex items-center gap-2">
                                <h3 className="text-xl font-bold text-gray-800">{job?.name}</h3>
                                {job?.boostedJob && (
                                    <Badge className="border-0 bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:from-amber-500 hover:to-orange-600">
                                        <Star className="mr-1 h-3 w-3 fill-white" /> Boosted
                                    </Badge>
                                )}
                            </div>

                            <div className="flex items-center gap-1.5 text-gray-600">
                                <Building className="h-3.5 w-3.5" />
                                <span className="text-sm font-medium">{job?.enterprise.name}</span>

                                {job?.categories?.[0] && (
                                    <>
                                        <span className="text-gray-400">•</span>
                                        <span className="text-sm">{job?.categories?.[0].categoryName}</span>
                                    </>
                                )}
                            </div>

                            <div className="mt-2 flex flex-wrap gap-2">
                                <Badge
                                    variant="outline"
                                    className={cn(
                                        'rounded-full border-primary-200 bg-primary-50 px-3 py-0.5 text-xs font-medium text-primary-500'
                                    )}
                                >
                                    {job?.type}
                                </Badge>

                                <Badge
                                    variant="outline"
                                    className="rounded-full border-blue-200 bg-blue-50 px-3 py-0.5 text-xs font-medium text-blue-700"
                                >
                                    <Users className="mr-1 h-3 w-3" /> {job?.applicationCount || 0} applications
                                </Badge>

                                <Badge
                                    variant="outline"
                                    className="rounded-full border-warning-200 bg-warning-50 px-3 py-0.5 text-xs font-medium text-warning-700"
                                >
                                    <Eye className="mr-1 h-3 w-3" /> {job?.views || 0} views
                                </Badge>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <TooltipProvider>
                            <Tooltip delayDuration={200}>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon-md"
                                        className="h-9 w-9 rounded-full hover:bg-gray-100"
                                    >
                                        <Link href={`/single-job/${job?.jobId}`} className="p-2">
                                            <Eye className="h-5 w-5" />
                                        </Link>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">View details</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon-md"
                                    className="h-9 w-9 rounded-full hover:bg-gray-100"
                                >
                                    <Share2 className="h-5 w-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                                <DropdownMenuItem className="cursor-pointer">
                                    <div className="flex items-center gap-2 text-blue-600">
                                        <div className="rounded-full bg-blue-100 p-1.5">
                                            <FaFacebookF />
                                        </div>
                                        Facebook
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
                                    <div className="flex items-center gap-2 text-gray-900">
                                        <div className="rounded-full bg-gray-100 p-1.5">
                                            <FaXTwitter />
                                        </div>
                                        Twitter
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
                                    <div className="flex items-center gap-2 text-blue-700">
                                        <div className="rounded-full bg-blue-100 p-1.5">
                                            <FaLinkedin />
                                        </div>
                                        LinkedIn
                                    </div>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Main content */}
                <CardContent className="mb-5 p-0">
                    {/* Job details grid */}
                    <div className="mb-5 grid grid-cols-2 gap-2">
                        <div className="flex flex-col rounded-md border border-cyan-100 bg-cyan-50 p-2">
                            <span className="mb-1 text-xs font-medium text-cyan-500">Salary Range</span>
                            <div className="flex items-center text-cyan-700">
                                <DollarSign className="mr-1.5 h-5 w-5" />
                                <span className="font-semibold">
                                    {Number(job?.lowestWage) ?? 0}&nbsp;-&nbsp;
                                    {Number(job?.highestWage) ?? 0}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col rounded-md border border-amber-100 bg-amber-50 p-2">
                            <span className="mb-1 text-xs font-medium text-amber-500">Experience</span>
                            <div className="flex items-center text-amber-700">
                                <Briefcase className="mr-1.5 h-5 w-5" />
                                <span className="font-semibold">
                                    {job?.experience} {job?.experience === 1 ? 'year' : 'years'}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col rounded-md border border-rose-100 bg-rose-50 p-2">
                            <span className="mb-1 text-xs font-medium text-rose-500">Posted On</span>
                            <div className="flex items-center text-rose-700">
                                <Calendar className="mr-1.5 h-5 w-5" />
                                <span className="font-semibold">{toFormattedDate(job?.createdAt)}</span>
                            </div>
                        </div>

                        <div
                            className={cn(
                                'flex flex-col rounded-md p-2',
                                daysLeft <= 3 ? 'border border-red-100 bg-red-50' : 'border border-blue-100 bg-blue-50'
                            )}
                        >
                            <span
                                className={cn(
                                    'mb-1 text-xs font-medium',
                                    daysLeft <= 3 ? 'text-red-500' : 'text-blue-500'
                                )}
                            >
                                Application Deadline
                            </span>
                            <div className={cn('flex items-center', daysLeft <= 3 ? 'text-red-700' : 'text-blue-700')}>
                                <Clock className="mr-1.5 h-5 w-5" />
                                <span className="font-semibold">
                                    {daysLeft < 0 ? JobStatusEnum.EXPIRED : `${daysLeft} days left`}
                                </span>
                            </div>
                        </div>

                        <div className="col-span-2 flex flex-col rounded-md border border-violet-100 bg-violet-50 p-2">
                            <span className="mb-1 text-xs font-medium text-violet-500">Location</span>
                            <div className="flex items-center text-violet-700">
                                <MapPin className="mr-1.5 h-5 w-5" />
                                <div>
                                    <span className="font-semibold">
                                        {job?.addresses && job?.addresses.length > 0
                                            ? job?.addresses
                                                  ?.map(
                                                      () =>
                                                          `${job?.addresses?.[0]?.street}, ${job?.addresses?.[0]?.city}, ${job?.addresses?.[0]?.country}`
                                                  )
                                                  .join('\n')
                                            : 'Unknown location'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-2 flex flex-col rounded-md border border-emerald-100 bg-emerald-50 p-2">
                            <span className="mb-1 text-xs font-medium text-emerald-500">Education</span>
                            <div className="flex items-center text-emerald-700">
                                <GraduationCap className="mr-1.5 h-5 w-5" />
                                <span className="font-semibold">{job?.education || 'Not specified'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Description and responsibilities */}
                    <div className="space-y-4">
                        <div>
                            <h4 className="mb-2 flex items-center text-sm font-semibold text-primary-800">
                                <div className="mr-2 h-4 w-1 rounded-full bg-gradient-to-b from-purple-500 to-indigo-600 text-base"></div>
                                Description
                            </h4>
                            <RichTextContent
                                className="line-clamp-2 text-gray-600"
                                content={job?.description || 'No responsible.'}
                            />
                        </div>

                        <div>
                            <h4 className="mb-2 flex items-center text-sm font-semibold text-primary-800">
                                <div className="mr-2 h-4 w-1 rounded-full bg-gradient-to-b from-amber-500 to-orange-600 text-base"></div>
                                Responsibilities
                            </h4>
                            <RichTextContent
                                className="line-clamp-2 text-gray-600"
                                content={job?.responsibility || 'No responsible.'}
                            />
                        </div>

                        <div>
                            <h4 className="mb-2 flex items-center text-sm font-semibold text-primary-800">
                                <div className="mr-2 h-4 w-1 rounded-full bg-gradient-to-b from-lime-500 to-green-600 text-base"></div>
                                Benefits
                            </h4>
                            <RichTextContent
                                className="line-clamp-2 text-gray-600"
                                content={job?.enterpriseBenefits || 'No benefits.'}
                            />
                        </div>
                        <div>
                            <h4 className="mb-2 flex items-center text-sm font-semibold text-primary-800">
                                <div className="mr-2 h-4 w-1 rounded-full bg-gradient-to-b from-warning-500 to-orange-500 text-base"></div>
                                Requirements
                            </h4>
                            <RichTextContent
                                className="line-clamp-2 text-gray-600"
                                content={job?.requirements || 'No requirements.'}
                            />
                        </div>
                    </div>

                    {/* Tags */}
                    {job?.tags && job?.tags.length > 0 && (
                        <div className="mt-5">
                            <h4 className="mb-2 text-xs font-semibold uppercase text-gray-500">Tags</h4>
                            <div className="flex flex-wrap gap-2">
                                {job?.tags.map((tag, index) => {
                                    const { bg, text } = getRandomFeatureColor();
                                    return (
                                        <Badge
                                            key={index}
                                            className={cn(
                                                `rounded-full px-3 py-0.5 hover:${bg} hover:${text}`,
                                                bg,
                                                text
                                            )}
                                        >
                                            {tag.name}
                                        </Badge>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    <div className="mt-5 grid grid-cols-1 gap-2 md:grid-cols-2">
                        {/* Categories */}
                        {job?.categories && job?.categories.length > 0 && (
                            <div className="rounded-md border border-indigo-100 bg-gradient-to-r from-indigo-50 to-purple-50 p-4">
                                <h4 className="mb-2 flex items-center text-xs font-semibold uppercase text-indigo-600">
                                    <div className="mr-2 h-3 w-3 rounded-full bg-indigo-500"></div>
                                    Categories
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {job?.categories.map((category, index) => (
                                        <Badge
                                            key={index}
                                            className="rounded-full border border-indigo-200 bg-white bg-opacity-60 px-3 py-0.5 text-indigo-700 hover:bg-white"
                                        >
                                            {category.categoryName}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Specializations */}
                        {job?.specializations && job?.specializations.length > 0 && (
                            <div className="rounded-md border border-teal-100 bg-gradient-to-r from-teal-50 to-emerald-50 p-4">
                                <h4 className="mb-2 flex items-center text-xs font-semibold uppercase text-teal-600">
                                    <div className="mr-2 h-3 w-3 rounded-full bg-teal-500"></div>
                                    Specializations
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {job?.specializations.map((specialization, index) => (
                                        <Badge
                                            key={index}
                                            className="rounded-full border border-teal-200 bg-white bg-opacity-60 px-3 py-0.5 text-teal-700 hover:bg-white"
                                        >
                                            {specialization.categoryName}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </div>
        </Card>
    );
}
