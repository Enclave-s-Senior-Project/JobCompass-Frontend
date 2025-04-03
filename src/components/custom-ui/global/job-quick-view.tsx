import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
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

type Props = {
    job: Job;
};

export function JobQuickView({ job }: Props) {
    const daysLeft = differenceInDays(new Date(job?.deadline), Date.now());

    return (
        <Card className="w-full max-w-3xl overflow-hidden hover:shadow-lg transition-all duration-300 group rounded-md">
            {/* Colorful top border based on job status */}
            <div className="h-1.5 w-full" />

            <div className="p-2">
                {/* Header with company info and actions */}
                <div className="flex items-start justify-between mb-5">
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
                            <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-700 text-white text-lg">
                                {job?.enterprise?.name}
                            </AvatarFallback>
                        </Avatar>

                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-xl text-gray-800">{job?.name}</h3>
                                {job?.isBoost && (
                                    <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white border-0">
                                        <Star className="h-3 w-3 mr-1 fill-white" /> Boosted
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

                            <div className="flex flex-wrap gap-2 mt-2">
                                <Badge
                                    variant="outline"
                                    className={cn(
                                        'rounded-full px-3 py-0.5 text-xs font-medium bg-primary-50 text-primary-500 border-primary-200'
                                    )}
                                >
                                    {job?.type}
                                </Badge>

                                <Badge
                                    variant="outline"
                                    className="rounded-full bg-blue-50 text-blue-700 border-blue-200 px-3 py-0.5 text-xs font-medium"
                                >
                                    <Users className="h-3 w-3 mr-1" /> {job?.applicationCount || 0} applications
                                </Badge>

                                <Badge
                                    variant="outline"
                                    className="rounded-full bg-warning-50 text-warning-700 border-warning-200 px-3 py-0.5 text-xs font-medium"
                                >
                                    <Eye className="h-3 w-3 mr-1" /> {job?.views || 0} views
                                </Badge>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon-md"
                                    className="rounded-full h-9 w-9 hover:bg-gray-100"
                                >
                                    <Share2 className="h-5 w-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                                <DropdownMenuItem className="cursor-pointer">
                                    <div className="flex items-center gap-2 text-blue-600">
                                        <div className="bg-blue-100 p-1.5 rounded-full">
                                            <FaFacebookF />
                                        </div>
                                        Facebook
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
                                    <div className="flex items-center gap-2 text-gray-900">
                                        <div className="bg-gray-100 p-1.5 rounded-full">
                                            <FaXTwitter />
                                        </div>
                                        Twitter
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
                                    <div className="flex items-center gap-2 text-blue-700">
                                        <div className="bg-blue-100 p-1.5 rounded-full">
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
                <CardContent className="p-0 mb-5">
                    {/* Job details grid */}
                    <div className="grid grid-cols-2 gap-2 mb-5">
                        <div className="bg-cyan-50 border border-cyan-100 rounded-md p-2 flex flex-col">
                            <span className="text-xs text-cyan-500 font-medium mb-1">Salary Range</span>
                            <div className="flex items-center text-cyan-700">
                                <DollarSign className="h-5 w-5 mr-1.5" />
                                <span className="font-semibold">
                                    {Number(job?.lowestWage) ?? 0}&nbsp;-&nbsp;
                                    {Number(job?.highestWage) ?? 0}
                                </span>
                            </div>
                        </div>

                        <div className="bg-amber-50 border border-amber-100 rounded-md p-2 flex flex-col">
                            <span className="text-xs text-amber-500 font-medium mb-1">Experience</span>
                            <div className="flex items-center text-amber-700">
                                <Briefcase className="h-5 w-5 mr-1.5" />
                                <span className="font-semibold">
                                    {job?.experience} {job?.experience === 1 ? 'year' : 'years'}
                                </span>
                            </div>
                        </div>

                        <div className="bg-rose-50 border border-rose-100 rounded-md p-2 flex flex-col">
                            <span className="text-xs text-rose-500 font-medium mb-1">Posted On</span>
                            <div className="flex items-center text-rose-700">
                                <Calendar className="h-5 w-5 mr-1.5" />
                                <span className="font-semibold">{toFormattedDate(job?.createdAt)}</span>
                            </div>
                        </div>

                        <div
                            className={cn(
                                'rounded-md p-2 flex flex-col',
                                daysLeft <= 3 ? 'bg-red-50 border border-red-100' : 'bg-blue-50 border border-blue-100'
                            )}
                        >
                            <span
                                className={cn(
                                    'text-xs font-medium mb-1',
                                    daysLeft <= 3 ? 'text-red-500' : 'text-blue-500'
                                )}
                            >
                                Application Deadline
                            </span>
                            <div className={cn('flex items-center', daysLeft <= 3 ? 'text-red-700' : 'text-blue-700')}>
                                <Clock className="h-5 w-5 mr-1.5" />
                                <span className="font-semibold">
                                    {daysLeft < 0 ? JobStatusEnum.EXPIRED : `${daysLeft} days left`}
                                </span>
                            </div>
                        </div>

                        <div className="col-span-2 bg-violet-50 border border-violet-100 rounded-md p-2 flex flex-col">
                            <span className="text-xs text-violet-500 font-medium mb-1">Location</span>
                            <div className="flex items-center text-violet-700">
                                <MapPin className="h-5 w-5 mr-1.5" />
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

                        <div className="col-span-2 bg-emerald-50 border border-emerald-100 rounded-md p-2 flex flex-col">
                            <span className="text-xs text-emerald-500 font-medium mb-1">Education</span>
                            <div className="flex items-center text-emerald-700">
                                <GraduationCap className="h-5 w-5 mr-1.5" />
                                <span className="font-semibold">{job?.education || 'Not specified'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Description and responsibilities */}
                    <div className="space-y-4">
                        <div>
                            <h4 className="text-sm font-semibold text-primary-800 mb-2 flex items-center">
                                <div className="h-4 w-1 bg-gradient-to-b from-purple-500 to-indigo-600 rounded-full mr-2 text-base"></div>
                                Description
                            </h4>
                            <RichTextContent
                                className="text-gray-600 line-clamp-2"
                                content={job?.description || 'No responsible.'}
                            />
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold text-primary-800 mb-2 flex items-center">
                                <div className="h-4 w-1 bg-gradient-to-b from-amber-500 to-orange-600 rounded-full mr-2 text-base"></div>
                                Responsibilities
                            </h4>
                            <RichTextContent
                                className="text-gray-600 line-clamp-2"
                                content={job?.responsibility || 'No responsible.'}
                            />
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold text-primary-800 mb-2 flex items-center">
                                <div className="h-4 w-1 bg-gradient-to-b from-lime-500 to-green-600 rounded-full mr-2 text-base"></div>
                                Benefits
                            </h4>
                            <RichTextContent
                                className="text-gray-600 line-clamp-2"
                                content={job?.enterpriseBenefits || 'No benefits.'}
                            />
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-primary-800 mb-2 flex items-center">
                                <div className="h-4 w-1 bg-gradient-to-b from-warning-500 to-orange-500 rounded-full mr-2 text-base"></div>
                                Requirements
                            </h4>
                            <RichTextContent
                                className="text-gray-600 line-clamp-2"
                                content={job?.requirements || 'No requirements.'}
                            />
                        </div>
                    </div>

                    {/* Tags */}
                    {job?.tags && job?.tags.length > 0 && (
                        <div className="mt-5">
                            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Tags</h4>
                            <div className="flex flex-wrap gap-2">
                                {job?.tags.map((tag, index) => {
                                    const { bg, text } = getRandomFeatureColor();
                                    return (
                                        <Badge key={index} className={cn('rounded-full px-3 py-0.5', bg, text)}>
                                            {tag.name}
                                        </Badge>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-2">
                        {/* Categories */}
                        {job?.categories && job?.categories.length > 0 && (
                            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-md p-4 border border-indigo-100">
                                <h4 className="text-xs font-semibold text-indigo-600 uppercase mb-2 flex items-center">
                                    <div className="h-3 w-3 bg-indigo-500 rounded-full mr-2"></div>
                                    Categories
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {job?.categories.map((category, index) => (
                                        <Badge
                                            key={index}
                                            className="bg-white bg-opacity-60 text-indigo-700 hover:bg-white border border-indigo-200 rounded-full px-3 py-0.5"
                                        >
                                            {category.categoryName}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Specializations */}
                        {job?.specializations && job?.specializations.length > 0 && (
                            <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-md p-4 border border-teal-100">
                                <h4 className="text-xs font-semibold text-teal-600 uppercase mb-2 flex items-center">
                                    <div className="h-3 w-3 bg-teal-500 rounded-full mr-2"></div>
                                    Specializations
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {job?.specializations.map((specialization, index) => (
                                        <Badge
                                            key={index}
                                            className="bg-white bg-opacity-60 text-teal-700 hover:bg-white border border-teal-200 rounded-full px-3 py-0.5"
                                        >
                                            {specialization.categoryName}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>

                {/* Footer with apply button */}
                <CardFooter className="flex justify-between items-center p-0 pt-4 border-t">
                    <div className="ml-auto">
                        <Button variant="outline" size="md">
                            <Link href={`/single-job/${job?.jobId}`} className="w-full h-full">
                                View Details
                            </Link>
                        </Button>
                    </div>
                </CardFooter>
            </div>
        </Card>
    );
}
