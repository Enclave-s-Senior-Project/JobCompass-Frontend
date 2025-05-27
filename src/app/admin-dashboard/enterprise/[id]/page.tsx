'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    MapPin,
    Phone,
    Mail,
    DollarSign,
    Clock,
    GraduationCap,
    Briefcase,
    CalendarArrowUpIcon,
    CircleFadingArrowUp,
    Scaling,
    Building,
} from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useQueries } from '@tanstack/react-query';
import { queryKey } from '@/lib/react-query/keys';
import { cn, handleErrorToast, toFormattedDate } from '@/lib/utils';
import { EnterpriseService } from '@/services/enterprises.service';
import defaultBackgroundImage from '@/assets/images/avatar/default-background.jpg';
import { NotFound } from '@/app/not-found';
import { capitalize } from 'lodash';
import { EnterpriseStatus } from '@/lib/common-enum';
import { FaFacebookF, FaInstagram, FaLinkedin, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { RichTextContent } from '@/components/custom-ui/global/rich-text-content';
import { DetailedResponse, Enterprise, SocialLink } from '@/types';
import { WebsiteService } from '@/services';

export default function CompanyProfile() {
    const { id } = useParams<{ id: string }>();

    return id ? <DetailInformation enterpriseId={id} /> : <NotFound />;
}

function DetailInformation({ enterpriseId }: { enterpriseId: string }) {
    const {
        '0': { data: details },
        '1': { data: socialLinks },
    } = useQueries({
        queries: [
            {
                queryKey: [queryKey.detailEnterprise, enterpriseId],
                queryFn: async ({ queryKey }) => {
                    try {
                        if (!queryKey[1] || typeof queryKey[1] !== 'string') {
                            return null;
                        }
                        const result = await EnterpriseService.getEnterpriseById(queryKey[1] as string);
                        return result?.value;
                    } catch (error) {
                        handleErrorToast(error);
                    }
                },
            },
            {
                queryKey: [queryKey.enterpriseSocialLinks, enterpriseId],
                queryFn: async ({ queryKey }) => {
                    try {
                        if (!queryKey[1] || typeof queryKey[1] !== 'string') {
                            return null;
                        }
                        const result = await WebsiteService.getEmployerSocialLinks({ enterpriseId: queryKey[1] });
                        return result;
                    } catch (error) {
                        handleErrorToast(error);
                    }
                },
            },
        ],
    });
    return (
        <div className="container mx-auto py-6">
            <div className="z-0 h-56 max-w-screen-2xl overflow-hidden rounded-b-lg border">
                <Image
                    src={details?.backgroundImageUrl || defaultBackgroundImage}
                    alt="Background image"
                    width={1280}
                    height={720}
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="z-10 mx-auto max-w-screen-xl -translate-y-20 space-y-12">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="space-y-6 lg:col-span-1">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex flex-col items-center text-center">
                                    <Avatar className="mb-4 h-24 w-24">
                                        <AvatarImage src={details?.logoUrl} />
                                        <AvatarFallback className="text-2xl">{details?.name}</AvatarFallback>
                                    </Avatar>
                                    <h1 className="text-2xl font-bold">
                                        {details?.name}{' '}
                                        <span className="rounded-full border-0 bg-gradient-to-r from-amber-400 to-orange-500 px-2 py-0.5 text-sm font-normal text-white hover:from-amber-500 hover:to-orange-600">
                                            Premium
                                        </span>
                                    </h1>

                                    <div className="mt-2 flex gap-2">
                                        {details?.categories.map((cat) => (
                                            <Badge
                                                key={cat.categoryId}
                                                variant="outline"
                                                className="mb-2 text-muted-foreground"
                                            >
                                                {cat.categoryName}
                                            </Badge>
                                        ))}
                                    </div>

                                    <div className="w-full">
                                        <span className="text-sm">Status:</span>&nbsp;
                                        {details?.status ? (
                                            <div
                                                className={cn(
                                                    'inline-block rounded-full border px-3 py-0.5 text-sm font-bold',
                                                    details.status === EnterpriseStatus.ACTIVE
                                                        ? 'border-green-200 bg-green-50 text-green-600'
                                                        : details.status === EnterpriseStatus.PENDING
                                                          ? 'border-warning-200 bg-warning-50 text-warning-600'
                                                          : details.status === EnterpriseStatus.BLOCKED
                                                            ? 'border-danger-200 bg-danger-50 text-danger-600'
                                                            : 'border-purple-200 bg-purple-50 text-purple-600'
                                                )}
                                            >
                                                {capitalize(details?.status)}
                                            </div>
                                        ) : (
                                            <span className="italic text-muted-foreground opacity-70">
                                                &lt;Unknown&gt;
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <CardContactInformation
                            enterprise={details as Enterprise}
                            socialLinks={socialLinks as SocialLink[]}
                        />
                        <CardEnterpriseDetails enterprise={details as Enterprise} />
                    </div>
                    <div className="space-y-6 lg:col-span-2">
                        <CardEnterpriseDescription enterprise={details as DetailedResponse.GetDetailEnterprise} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function CardContactInformation({ enterprise, socialLinks }: { enterprise: Enterprise; socialLinks: SocialLink[] }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground text-primary" />
                    <div>
                        <p className="text-sm text-muted-foreground">Location</p>

                        {enterprise?.addresses?.map((addr) => (
                            <p className="text-sm font-medium" key={addr.addressId}>
                                {addr.street}, {addr.city}, {addr.zipCode}, {addr.country}
                            </p>
                        ))}
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-5 w-5 text-muted-foreground text-primary" />
                    <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="text-sm font-medium">{enterprise?.phone}</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-5 w-5 text-muted-foreground text-primary" />
                    <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="text-sm font-medium">{enterprise?.email}</p>
                    </div>
                </div>

                <Separator />

                <div>
                    <p className="mb-3 text-sm text-muted-foreground">Social Contact</p>
                    <div className="flex items-center gap-3">
                        {Array.isArray(socialLinks) && socialLinks.length > 0 ? (
                            socialLinks.map((social) => {
                                const Icon = {
                                    FACEBOOK: FaFacebookF,
                                    TWITTER: FaXTwitter,
                                    INSTAGRAM: FaInstagram,
                                    YOUTUBE: FaYoutube,
                                    LINKEDIN: FaLinkedin,
                                }[social.socialType];

                                return (
                                    <TooltipProvider key={social.websiteId}>
                                        <Tooltip delayDuration={200}>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    key={social.websiteId}
                                                    variant="third"
                                                    className="size-12 p-0 md:p-0"
                                                >
                                                    <Link href={social.socialLink} target="_blank" className="p-4">
                                                        <Icon />
                                                    </Link>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent align="center" side="bottom" asChild>
                                                <span>{social.socialLink}</span>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                );
                            })
                        ) : (
                            <span className="text-sm font-medium italic text-gray-500">&lt;No contacts&gt;</span>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function CardEnterpriseDetails({ enterprise }: { enterprise: Enterprise }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Enterprise Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <CalendarArrowUpIcon className="mb-3 size-6 text-primary" />
                        <p className="text-sm text-muted-foreground">Found In</p>
                        <p className="text-sm font-medium">{toFormattedDate(enterprise?.foundedIn || '')}</p>
                    </div>
                    <div>
                        <Building className="mb-3 size-6 text-primary" />
                        <p className="text-sm text-muted-foreground">Org. Type</p>
                        <p className="text-sm font-medium capitalize">{capitalize(enterprise?.organizationType)}</p>
                    </div>
                    <div>
                        <Scaling className="mb-3 size-6 text-primary" />
                        <p className="text-sm text-muted-foreground">Enterprise Size</p>
                        <p className="text-sm font-medium capitalize">{enterprise?.teamSize}</p>
                    </div>
                    <div>
                        <CircleFadingArrowUp className="mb-3 size-6 text-primary" />
                        <p className="text-sm text-muted-foreground">Promoted Points</p>
                        <p className="text-sm font-medium capitalize">{enterprise?.totalPoints}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function CardEnterpriseDescription({ enterprise }: { enterprise: DetailedResponse.GetDetailEnterprise }) {
    return (
        <Card>
            <CardContent className="p-0">
                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="flex h-auto w-full justify-start rounded-none border-b bg-transparent p-0">
                        <TabsTrigger
                            value="overview"
                            className="flex-1 rounded-none border-b-2 border-transparent px-4 py-3 text-base data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                        >
                            Overview
                        </TabsTrigger>
                        <TabsTrigger
                            value="benefits"
                            className="flex-1 rounded-none border-b-2 border-transparent px-4 py-3 text-base data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                        >
                            Benefits
                        </TabsTrigger>
                        <TabsTrigger
                            value="jobs"
                            className="flex-1 rounded-none border-b-2 border-transparent px-4 py-3 text-base data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                        >
                            Jobs
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-0 p-6">
                        <div className="space-y-6">
                            <div>
                                <p className="text-xl font-semibold">About {enterprise?.name}</p>
                                <p className="py-6 text-center text-2xl font-semibold text-primary-500">
                                    {enterprise?.companyVision}
                                </p>
                                <RichTextContent
                                    className="space-y-2 break-normal text-gray-700"
                                    content={enterprise?.description || 'No About'}
                                />
                                <p className="mt-6 text-xl font-semibold">Bio</p>
                                <RichTextContent
                                    className="space-y-2 break-normal text-gray-700"
                                    content={enterprise?.bio || 'No Bio'}
                                />
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="benefits" className="mt-0 p-6">
                        <p className="pb-6 text-xl font-semibold">Benefits</p>
                        <RichTextContent
                            className="space-y-2 break-normal text-gray-700"
                            content={enterprise?.benefit || 'No Benefits'}
                        />
                        {}
                    </TabsContent>
                    <TabsContent value="jobs" className="mt-0 space-y-4 p-6">
                        <p className="pb-4 text-xl font-semibold">Recent Opening Jobs</p>
                        {enterprise?.jobs.map((job) => (
                            <Card key={job.jobId} className="relative">
                                {job.isBoost && (
                                    <div className="absolute right-3 top-3">
                                        <Badge variant="default" className="bg-orange-500">
                                            Boosted
                                        </Badge>
                                    </div>
                                )}
                                <CardHeader>
                                    <CardTitle className="text-lg">{job.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <p className="text-xs text-muted-foreground">Salary</p>
                                                <p className="text-sm font-medium">
                                                    {job.lowestWage} - {job.highestWage} (USD)
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <p className="text-xs text-muted-foreground">Type</p>
                                                <p className="text-sm font-medium">{job.type}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <p className="text-xs text-muted-foreground">Experience</p>
                                                <p className="text-sm font-medium">{job.experience} years</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <p className="text-xs text-muted-foreground">Education</p>
                                                <p className="text-sm font-medium">{job.education}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <Separator className="my-4" />
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-muted-foreground">
                                            Deadline: {toFormattedDate(job.deadline)}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
