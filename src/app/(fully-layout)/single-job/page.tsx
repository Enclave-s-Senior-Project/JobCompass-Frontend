'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
    Mail,
    ChevronLeft,
    ChevronRight,
    Phone,
    Bookmark,
    Map,
    NotepadText,
    CircleUserRound,
    Link2,
    FileX,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PiCake } from 'react-icons/pi';
import ShareProfile from '@/components/custom-ui/share-profile';
import { FaFacebookF, FaXTwitter } from 'react-icons/fa6';
import { DialogApplyJob } from '@/components/custom-ui/dialog-apply-job';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { DetailedRequest } from '@/types';
import * as services from '@/services/job.service';
import CardJob from '@/components/custom-ui/card-job';
import { Skeleton } from '@/components/ui/skeleton';
export default function SingleJob() {
    const [currentPage, setCurrentPage] = useState(1);
    const take = 6;
    const {
        isLoading,
        data: jobCards = {
            data: [],
            meta: {
                page: '0',
                take: '0',
                itemCount: 0,
                pageCount: 0,
                hasPreviousPage: false,
                hasNextPage: false,
            },
        },
    } = useQuery({
        queryKey: ['list-card', { order: 'DESC', page: currentPage, take, option: '' }],
        queryFn: async ({ queryKey }) => {
            try {
                const temp = await services.JobService.getAllJobs(
                    queryKey[1] as DetailedRequest.ParamListJobsCredentials
                );
                return temp.value;
            } catch (error) {
                console.log(error);
            }
        },
        staleTime: 1 * 60 * 1000,
        enabled: true,
        retry: 2,
    });
    return (
        <div className="min-h-screen ">
            <div className="w-full h-[76px] bg-[#F1F2F4] flex items-center">
                <div className="flex  max-w-7xl mx-auto w-full items-center justify-between">
                    <h1 className="text-[18px] leading-[28px]">Find Job</h1>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Link href="/">Home</Link>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-gray-900">Find Job</span>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto space-y-8 pt-5">
                {/* Header Section */}
                <div className="bg-white rounded-lg  ">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="relative w-[96px] h-[96px] rounded-full overflow-hidden bg-gradient-to-br from-pink-500 to-orange-400">
                                <img src="/placeholder.svg" alt="Company logo" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-xl">Senior UX Designer</h1>
                                    <Badge
                                        variant="secondary"
                                        className="h-[26px] w-[83px] font-normal bg-[#FFEDED] text-[#FF4F4F] text-[14px]"
                                    >
                                        Featured
                                    </Badge>
                                    <Badge
                                        variant="secondary"
                                        className="h-[26px] px-3 font-normal bg-[#E8F1FF] text-[#0066FF] text-[14px] whitespace-nowrap"
                                    >
                                        Full Time
                                    </Badge>
                                </div>
                                <div className="flex flex-wrap gap-5 text-sm text-muted-foreground mt-2">
                                    <span className="flex flex-row gap-1 text-[#474C54]">
                                        <Link2 className="w-5 h-5 text-[#0066FF]" />
                                        https://instagram.com
                                    </span>
                                    <span className="flex flex-row gap-1 text-[#474C54]">
                                        <Phone className="w-5 h-5 text-[#0066FF] " />
                                        (406) 555-0120
                                    </span>
                                    <span className="flex flex-row gap-1 text-[#474C54]">
                                        <Mail className="w-5 h-5 text-[#0066FF]" />
                                        career@instagram.com
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 w-full md:w-auto">
                            <Button variant="outline" size="icon-lg" className="h-[56px] w-[56px] hover:bg-[#E7F0FA]">
                                <Bookmark className="h-[24px] w-[24px]" />
                            </Button>
                            <DialogApplyJob nameJob="Senior UX Designer" />
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="px-2 sm:px-0 grid grid-cols-12 gap-4 md:gap-8 lg:gap-14">
                    <div className="col-span-12 md:col-span-7 space-y-9">
                        <div className="space-y-4">
                            <article className="text-gray-700 break-normal">
                                Fusce et erat at nibh maximus fermentum. Mauris ac justo nibh. Praesent nec lorem lorem.
                                Donec ullamcorper lacus mollis tortor pretium malesuada. In quis porta nisi, quis
                                fringilla orci. Donec porttitor, odio a efficitur blandit, orci nisl porta elit, eget
                                vulputate quam nibh ut tellus. Sed ut posuere risus, vitae commodo velit. Nullam in
                                lorem dolor.
                            </article>
                        </div>
                        <div className="space-y-4">
                            <p className="text-xl font-medium">Education</p>
                            <article className="text-gray-700 break-normal">
                                Fusce et erat at nibh maximus fermentum. Mauris ac justo nibh. Praesent nec lorem lorem.
                                Donec ullamcorper lacus mollis tortor pretium malesuada. In quis porta nisi, quis
                                fringilla orci. Donec porttitor, odio a efficitur blandit, orci nisl porta elit, eget
                                vulputate quam nibh ut tellus. Sed ut posuere risus, vitae commodo velit. Nullam in
                                lorem dolor.
                            </article>
                        </div>
                        <div className="space-y-4">
                            <p className="text-xl font-medium">Experience</p>
                            <article className="text-gray-700 break-normal">
                                Fusce et erat at nibh maximus fermentum. Mauris ac justo nibh. Praesent nec lorem lorem.
                                Donec ullamcorper lacus mollis tortor pretium malesuada. In quis porta nisi, quis
                                fringilla orci. Donec porttitor, odio a efficitur blandit, orci nisl porta elit, eget
                                vulputate quam nibh ut tellus. Sed ut posuere risus, vitae commodo velit. Nullam in
                                lorem dolor.
                            </article>
                        </div>
                        {/* Share profile for breakpoint from md */}
                        <div className="hidden md:block">
                            <ShareProfile />
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-5 space-y-6">
                        <div className="p-6 flex items-center justify-center flex-wrap gap-y-6 rounded-md border-2 border-primary-50">
                            <div className="basis-1/2 w-1/2">
                                <PiCake className="mb-3 size-6 text-primary" />
                                <p className="mb-1 uppercase text-gray-500 text-[12px]">date of birth</p>
                                <p className="text-sm font-medium">14 June, 2003</p>
                            </div>
                            <div className="basis-1/2 w-1/2">
                                <Map className="mb-3 size-6 text-primary" />
                                <p className="mb-1 uppercase text-gray-500 text-[12px]">nationality</p>
                                <p className="text-sm">American</p>
                            </div>
                            <div className="basis-1/2 w-1/2">
                                <NotepadText className="mb-3 size-6 text-primary" />
                                <p className="mb-1 uppercase text-gray-500 text-[12px]">marital status</p>
                                <p className="text-sm font-medium">Single</p>
                            </div>
                            <div className="basis-1/2 w-1/2">
                                <CircleUserRound className="mb-3 size-6 text-primary" />
                                <p className="mb-1 uppercase text-gray-700 text-[12px]">gender</p>
                                <p className="text-sm font-medium">Male</p>
                            </div>
                        </div>
                        {/* Contact information */}
                        <Card className="max-w-2xl mx-auto border-primary-50 border-2">
                            <CardHeader className="space-y-2">
                                <div className="flex items-center gap-4">
                                    <img
                                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VgcKFFBPX6qxbUE9wWcn0O8kezjAsY.png"
                                        alt="Instagram logo"
                                        width={56}
                                        height={56}
                                        className="rounded-xl"
                                    />
                                    <div>
                                        <h2 className="text-[20px]">Instagram</h2>
                                        <p className="text-[14px] text-[#767F8C]">Social networking service</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <p className="text-[16px] text-muted-foreground">Founded in:</p>
                                        <p className="text-[16px]">March 21, 2006</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-[16px] text-muted-foreground">Organization type:</p>
                                        <p className="text-[16px]">Private Company</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-[16px] text-muted-foreground">Company size:</p>
                                        <p className="text-[16px]">120-300 Employers</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-[16px] text-muted-foreground">Phone:</p>
                                        <p className="text-[16px]">(406) 555-0120</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-[16px] text-muted-foreground">Email:</p>
                                        <p className="text-[16px]">twitter@gmail.com</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-[16px] text-muted-foreground">Website:</p>
                                        <p className="text-[16px]">twitter@gmail.com</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 pt-4">
                                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#1877F2] text-white hover:bg-[#1877F2]/90">
                                        <FaFacebookF size={20} />
                                        <span className="sr-only">Facebook</span>
                                    </div>
                                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#1DA1F2] text-white hover:bg-[#1DA1F2]/90">
                                        <FaXTwitter size={20} />
                                        <span className="sr-only">Twitter</span>
                                    </div>
                                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#FF008C] to-[#FFCD1E] text-white hover:opacity-90">
                                        <FaXTwitter size={20} />
                                        <span className="sr-only">Instagram</span>
                                    </div>
                                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#FF0000] text-white hover:bg-[#FF0000]/90">
                                        <FaXTwitter size={20} />
                                        <span className="sr-only">YouTube</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    {/* Share profile for breakpoint below md  */}
                    <div className="col-span-12 block md:hidden">
                        <ShareProfile />
                    </div>
                </div>

                {/* Related Jobs Section */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-[40px]">Related Jobs</span>
                        <nav className="flex items-center gap-2">
                            <Button className="h-[48px] w-[48px]" variant="outline">
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" className="h-[48px] w-[48px]">
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </nav>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
                        {isLoading ? (
                            <div className="col-span-full flex items-center justify-center min-h-[50vh]">
                                <Skeleton className="w-[424px] h-[204px] rounded-full" />
                            </div>
                        ) : !jobCards?.data?.length ? (
                            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
                                <FileX className="h-16 w-16 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-semibold text-foreground mb-2">No jobs found</h3>
                                <p className="text-muted-foreground max-w-[500px]">
                                    Currently, there are no jobs posted. Please check back later or try searching with
                                    different criteria.
                                </p>
                            </div>
                        ) : (
                            jobCards.data.map((job, index) => <CardJob key={index} job={job} />)
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
