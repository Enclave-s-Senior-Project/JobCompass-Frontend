'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
    Mail,
    ChevronLeft,
    ChevronRight,
    Phone,
    Bookmark,
    NotepadText,
    Link2,
    Clock8,
    BriefcaseBusiness,
    Wallet,
    MapPin,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ShareProfile from '@/components/custom-ui/share-profile';
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { DialogApplyJob } from '@/components/custom-ui/dialog-apply-job';
import Link from 'next/link';
import { routes } from '@/configs/routes';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/lib/react-query/keys';
import { JobService } from '@/services/job.service';
import moment from 'moment';
import DOMPurify from 'dompurify';
export default function SingleJob() {
    const jobId = useSearchParams();
    const id = jobId.get('id') || '';
    const { data: resultQuery } = useQuery({
        queryKey: [queryKey.detailJob],
        queryFn: async () => {
            try {
                const payload = await JobService.detailJob(id);
                return payload;
            } catch (error: any) {
                console.log(error);
            }
        },
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
                                <img src={resultQuery?.introImg} alt="Company logo" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-xl">{resultQuery?.name}</h1>
                                    {resultQuery?.tags?.map((temp) => {
                                        return (
                                            <Badge
                                                key={temp.tagId}
                                                variant="secondary"
                                                className={`h-[26px] px-3 font-normal text-[14px] whitespace-nowrap`}
                                                style={{
                                                    backgroundColor: temp.backgroundColor || '#E8F1FF',
                                                    color: temp.color || '#0066FF',
                                                }}
                                            >
                                                {temp.name}
                                            </Badge>
                                        );
                                    })}
                                </div>
                                <div className="flex flex-wrap gap-5 text-sm text-muted-foreground mt-2">
                                    <span className="flex flex-row gap-1 text-[#474C54]">
                                        <Link2 className="w-5 h-5 text-[#0066FF]" />
                                        {resultQuery?.enterprise.bio}
                                    </span>
                                    <span className="flex flex-row gap-1 text-[#474C54]">
                                        <Phone className="w-5 h-5 text-[#0066FF] " />
                                        {resultQuery?.enterprise.phone}
                                    </span>
                                    <span className="flex flex-row gap-1 text-[#474C54]">
                                        <Mail className="w-5 h-5 text-[#0066FF]" />
                                        {resultQuery?.enterprise.email}
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
                            <article
                                className="text-gray-700 break-normal"
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(resultQuery?.description || '') }}
                            ></article>
                        </div>
                        <div className="space-y-4">
                            <p className="text-xl font-medium">Education</p>
                            <article
                                className="text-gray-700 break-normal"
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(resultQuery?.responsibility || ''),
                                }}
                            ></article>
                        </div>
                        {/* Share profile for breakpoint from md */}
                        <div className="hidden md:block">
                            <ShareProfile />
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-5 space-y-6">
                        <div className="p-6 flex flex-col gap-y-6 rounded-md border-2 border-primary-50">
                            <h1 className="text-2xl mb-4">Job Overview</h1>
                            <div className="w-full grid grid-cols-3 gap-y-6">
                                <div className="flex flex-col items-start">
                                    <NotepadText className="mb-3 size-6 text-primary" />
                                    <p className="mb-1 uppercase text-gray-500 text-[12px]">JOB POSTED:</p>
                                    <p className="text-sm font-medium">
                                        {moment(resultQuery?.createdAt).format('YYYY-MM-DD')}
                                    </p>
                                </div>
                                <div className="flex flex-col items-start">
                                    <Clock8 className="mb-3 size-6 text-primary" />
                                    <p className="mb-1 uppercase text-gray-500 text-[12px]">JOB EXPIRE IN:</p>
                                    <p className="text-sm font-medium">{resultQuery?.deadline}</p>
                                </div>
                                <div className="flex flex-col items-start">
                                    <BriefcaseBusiness className="mb-3 size-6 text-primary" />
                                    <p className="mb-1 uppercase text-gray-500 text-[12px]">EDUCATION:</p>
                                    <p className="text-sm font-medium">{resultQuery?.education}</p>
                                </div>
                                <div className="flex flex-col items-start">
                                    <Wallet className="mb-3 size-6 text-primary" />
                                    <p className="mb-1 uppercase text-gray-500 text-[12px]">SALARY:</p>
                                    <p className="text-sm">
                                        ${resultQuery?.lowestWage} - {resultQuery?.highestWage}
                                    </p>
                                </div>
                                <div className="flex flex-col items-start">
                                    <MapPin className="mb-3 size-6 text-primary" />
                                    <p className="mb-1 uppercase text-gray-500 text-[12px]">LOCATION:</p>
                                    <p className="text-sm font-medium">
                                        {resultQuery?.addresses?.[0]?.country ?? 'Unknown Country'} -
                                        {resultQuery?.addresses?.[0]?.city ?? 'Unknown City'}
                                    </p>
                                </div>
                                <div className="flex flex-col items-start">
                                    <BriefcaseBusiness className="mb-3 size-6 text-primary" />
                                    <p className="mb-1 uppercase text-gray-700 text-[12px]">JOB TYPE:</p>
                                    <p className="text-sm font-medium">{resultQuery?.type}</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact information */}
                        <Card className="max-w-2xl mx-auto border-primary-50 border-2 shadow-none">
                            <CardHeader className="space-y-2">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={resultQuery?.enterprise.logoUrl}
                                        alt="Instagram logo"
                                        width={56}
                                        height={56}
                                        className="rounded-xl"
                                    />
                                    <div>
                                        <h2 className="text-[20px]">{resultQuery?.enterprise.name}</h2>
                                        <p className="text-[14px] text-[#767F8C]">
                                            {resultQuery?.enterprise.description}
                                        </p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <p className="text-[16px] text-muted-foreground">Founded in:</p>
                                        <p className="text-[16px]">{resultQuery?.enterprise.foundedIn}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-[16px] text-muted-foreground">Organization type:</p>
                                        <p className="text-[16px]">{resultQuery?.enterprise.industryType}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-[16px] text-muted-foreground">Company size:</p>
                                        <p className="text-[16px]">{resultQuery?.enterprise.teamSize}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-[16px] text-muted-foreground">Phone:</p>
                                        <p className="text-[16px]">{resultQuery?.enterprise.phone}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-[16px] text-muted-foreground">Email:</p>
                                        <p className="text-[16px]">{resultQuery?.enterprise.email}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-[16px] text-muted-foreground">Website:</p>
                                        <p className="text-[16px]">{resultQuery?.enterprise.bio}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 pt-4">
                                    <Button size="icon-lg" variant="third" className="size-12">
                                        <Link href={routes.home}>
                                            <FaFacebookF />
                                        </Link>
                                    </Button>
                                    <Button size="icon-lg" variant="third" className="size-12">
                                        <Link href={routes.home}>
                                            <FaXTwitter />
                                        </Link>
                                    </Button>
                                    <Button size="icon-lg" variant="third" className="size-12">
                                        <Link href={routes.home}>
                                            <FaInstagram />
                                        </Link>
                                    </Button>
                                    <Button size="icon-lg" variant="third" className="size-12">
                                        <Link href={routes.home}>
                                            <FaYoutube />
                                        </Link>
                                    </Button>
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
                        <span className="text-[30px]">Related Jobs</span>
                        <nav className="flex items-center gap-2">
                            <Button className="h-[38px] w-[38px]" variant="outline">
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" className="h-[40px] w-[40px]">
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </nav>
                    </div>
                    {/* <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
                        {isLoading ? (
                            <div className="col-span-full flex items-center justify-center min-h-[50vh]">
                                <Skeleton className="w-[424px] h-[204px] rounded-full" />
                            </div>
                        ) : !jobCards?.data?.length ? (
                            <div className="col-span-full flex flex-col items-center justify-center min-h-[50vh] text-center">
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
                    </div> */}
                </div>
            </main>
        </div>
    );
}
