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
    Clock8,
    BriefcaseBusiness,
    Wallet,
    MapPin,
    FileX,
} from 'lucide-react';
import ShareProfile from '@/components/custom-ui/share-profile';
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { DialogApplyJob } from '@/components/custom-ui/dialog-apply-job';
import Link from 'next/link';
import { routes } from '@/configs/routes';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/lib/react-query/keys';
import { JobService } from '@/services/job.service';
import moment from 'moment';
import DOMPurify from 'dompurify';
import { Suspense, useContext, useEffect, useRef } from 'react';
import { handleErrorToast } from '@/lib/utils';
import { NotFound } from '@/components/custom-ui/not-found';
import { UserContext } from '@/contexts';
import { ListTag } from '@/components/custom-ui/list-tags';
import { toast } from '@/lib/toast';
import { RichTextContent } from '@/components/custom-ui/global/rich-text-content';

export default function SingleJob() {
    return (
        <Suspense fallback={<span>Loading...</span>}>
            <PageContentOfSingleJob />
        </Suspense>
    );
}

function PageContentOfSingleJob() {
    const router = useRouter();
    const pathname = usePathname();
    const isLog = localStorage.getItem('logged') ?? false;
    const { userInfo } = useContext(UserContext);
    const { id } = useParams<{ id: string }>();
    const descriptionRef = useRef<HTMLDivElement>(null);
    const responsibilityRef = useRef<HTMLDivElement>(null);
    const benefitsRef = useRef<HTMLDivElement>(null);
    const enterpriseDescRef = useRef<HTMLDivElement>(null);
    const bioEnterpriseRef = useRef<HTMLDivElement>(null);

    const { data: resultQuery, refetch } = useQuery({
        queryKey: [queryKey.detailJob, id],
        queryFn: async () => {
            try {
                const payload = await JobService.detailJob(id, { userId: userInfo?.profileId ?? '' });
                return payload;
            } catch (error: any) {
                handleErrorToast(error);
            }
        },
        enabled: !!id,
    });

    const removeFavoriteJobMutation = async (jobId: string) => {
        try {
            await JobService.removeFavoriteJob({ jobId });
            await refetch();
            toast.success('Job remove to favorite list');
        } catch (error: any) {
            handleErrorToast(error);
            toast.error('Oops! Something went wrong');
        }
    };
    useEffect(() => {
        if (resultQuery) {
            if (descriptionRef.current) {
                descriptionRef.current.innerHTML = DOMPurify.sanitize(resultQuery.description || '');
            }
            if (responsibilityRef.current) {
                responsibilityRef.current.innerHTML = DOMPurify.sanitize(resultQuery.responsibility || '');
            }
            if (benefitsRef.current) {
                benefitsRef.current.innerHTML = DOMPurify.sanitize(resultQuery.enterpriseBenefits || '');
            }
            if (enterpriseDescRef.current) {
                enterpriseDescRef.current.innerHTML = DOMPurify.sanitize(resultQuery.enterprise?.description || '');
            }
            if (bioEnterpriseRef.current) {
                bioEnterpriseRef.current.innerHTML = DOMPurify.sanitize(resultQuery.enterprise?.bio || '');
            }
        }
    }, [resultQuery]);
    const handleAddFavoriteJob = async (jobId: string) => {
        try {
            await JobService.addFavoriteJob({ jobId });
            await refetch();
            toast.success('Job added to favorite list');
        } catch (error: any) {
            handleErrorToast(error);
            toast.error('Oops! Something went wrong');
        }
    };

    const isFavorite = resultQuery?.isFavorite;

    if (!id) {
        return <NotFound />;
    }

    return (
        <div className="min-h-screen">
            <div className="flex h-[76px] w-full items-center bg-[#F1F2F4]">
                <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 2xl:px-0">
                    <h1 className="text-[18px] leading-[28px]">Find Job</h1>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Link href="/">Home</Link>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-gray-900">Find Job</span>
                    </div>
                </div>
            </div>

            <main className="mx-auto max-w-7xl space-y-8 pt-5">
                {/* Header Section */}
                <div className="rounded-lg bg-white">
                    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                        <div className="flex items-center gap-4">
                            <div className="relative h-[96px] w-[96px] overflow-hidden rounded-full bg-gradient-to-br from-pink-500 to-orange-400">
                                <img
                                    src={resultQuery?.enterprise?.logoUrl}
                                    alt="Company logo"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-xl">{resultQuery?.name}</h1>
                                    <ListTag tag={resultQuery?.tags ?? []} />
                                </div>
                                <div className="mt-2 flex flex-wrap gap-5 text-sm text-muted-foreground">
                                    <span className="flex flex-row gap-1 text-[#474C54]">
                                        <Phone className="h-5 w-5 text-[#0066FF]" />
                                        {resultQuery?.enterprise?.phone}
                                    </span>
                                    <span className="flex flex-row gap-1 text-[#474C54]">
                                        <Mail className="h-5 w-5 text-[#0066FF]" />
                                        {resultQuery?.enterprise?.email}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full gap-3 md:w-auto">
                            <Button
                                variant="outline"
                                size="icon-lg"
                                className={`h-[56px] w-[56px] hover:bg-[#E7F0FA] ${isFavorite ? 'bg-[#E7F0FA]' : ''}`}
                                onClick={async () => {
                                    if (!isLog) {
                                        router.push(`/sign-in?redirect=${pathname}`);
                                        return;
                                    }
                                    if (isFavorite) {
                                        await removeFavoriteJobMutation(id);
                                    } else {
                                        await handleAddFavoriteJob(id);
                                    }
                                }}
                            >
                                <Bookmark
                                    className={`h-[24px] w-[24px] ${isFavorite ? 'text-blue-500' : 'text-gray-500'}`}
                                />
                            </Button>
                            <DialogApplyJob
                                nameJob={resultQuery?.name || 'Unknown Job'}
                                jobId={resultQuery?.jobId || id}
                                trigger={
                                    <Button className="h-[56px] w-[248px] flex-1 text-[16px] md:flex-none">
                                        Apply Now
                                        <ChevronRight className="ml-2 h-6 w-6" />
                                    </Button>
                                }
                            />
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-12 gap-4 px-2 sm:px-0 md:gap-8 lg:gap-14">
                    <div className="col-span-12 space-y-9 md:col-span-7">
                        <div className="space-y-4">
                            <p className="text-xl font-semibold text-primary-700">Job Description</p>
                            <RichTextContent content={resultQuery?.description || 'No description.'} />
                        </div>
                        <div className="space-y-4">
                            <p className="text-xl font-semibold text-primary-700">Responsibilities</p>
                            <RichTextContent content={resultQuery?.responsibility || 'No responsibility.'} />
                        </div>
                        <div className="space-y-4">
                            <p className="text-xl font-semibold text-primary-700">Benefits</p>
                            <RichTextContent content={resultQuery?.enterpriseBenefits || 'No benefit.'} />
                        </div>
                        <div className="space-y-4">
                            <p className="text-xl font-semibold text-primary-700">Requirements</p>
                            <RichTextContent content={resultQuery?.requirements || 'No requirement.'} />
                        </div>
                        {/* Share profile for breakpoint from md */}
                        <div className="hidden md:block">
                            <ShareProfile />
                        </div>
                    </div>
                    <div className="col-span-12 space-y-6 md:col-span-5">
                        <div className="flex flex-col gap-y-6 rounded-md border-2 border-primary-50 p-6">
                            <h1 className="mb-4 text-2xl">Job Overview</h1>
                            <div className="grid w-full grid-cols-3 gap-y-6">
                                <div className="flex flex-col items-start">
                                    <NotepadText className="mb-3 size-6 text-primary" />
                                    <p className="mb-1 text-[12px] uppercase text-gray-500">JOB POSTED</p>
                                    <p className="text-sm font-medium">
                                        {moment(resultQuery?.createdAt).format('YYYY-MM-DD')}
                                    </p>
                                </div>
                                <div className="flex flex-col items-start">
                                    <Clock8 className="mb-3 size-6 text-primary" />
                                    <p className="mb-1 text-[12px] uppercase text-gray-500">JOB EXPIRE IN</p>
                                    <p className="text-sm font-medium">{resultQuery?.deadline}</p>
                                </div>
                                <div className="flex flex-col items-start">
                                    <BriefcaseBusiness className="mb-3 size-6 text-primary" />
                                    <p className="mb-1 text-[12px] uppercase text-gray-500">EDUCATION</p>
                                    <p className="text-sm font-medium">{resultQuery?.education}</p>
                                </div>
                                <div className="flex flex-col items-start">
                                    <Wallet className="mb-3 size-6 text-primary" />
                                    <p className="mb-1 text-[12px] uppercase text-gray-500">SALARY</p>
                                    <p className="text-sm">
                                        ${resultQuery?.lowestWage} - {resultQuery?.highestWage}
                                    </p>
                                </div>
                                <div className="flex flex-col items-start">
                                    <MapPin className="mb-3 size-6 text-primary" />
                                    <p className="mb-1 text-[12px] uppercase text-gray-500">LOCATION</p>
                                    <p className="text-sm font-medium">
                                        {resultQuery?.addresses?.[0]?.country ?? 'Unknown Country'} -
                                        {resultQuery?.addresses?.[0]?.city ?? 'Unknown City'}
                                    </p>
                                </div>
                                <div className="flex flex-col items-start">
                                    <BriefcaseBusiness className="mb-3 size-6 text-primary" />
                                    <p className="mb-1 text-[12px] uppercase text-gray-700">JOB TYPE</p>
                                    <p className="text-sm font-medium">{resultQuery?.type}</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact information */}
                        <Card className="mx-auto max-w-2xl border-2 border-primary-50 shadow-none">
                            <CardHeader className="space-y-2">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={resultQuery?.enterprise?.logoUrl}
                                        alt="Instagram logo"
                                        width={56}
                                        height={56}
                                        className="h-14 w-14 rounded-full object-cover"
                                    />

                                    <div>
                                        <h2 className="text-[20px]">{resultQuery?.enterprise?.name}</h2>
                                        <div ref={bioEnterpriseRef}></div>
                                        {/* <p className="text-[14px] text-[#767F8C]">
                                            {resultQuery?.enterprise?.description}
                                        </p> */}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <p className="text-[16px] text-muted-foreground">Founded in:</p>
                                        <p className="text-[16px]">
                                            {resultQuery?.enterprise.foundedIn
                                                ? moment(resultQuery.enterprise.foundedIn).format('YYYY-MM-DD')
                                                : 'Unknown'}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-[16px] text-muted-foreground">Organization type:</p>
                                        <p className="text-[16px]">{resultQuery?.enterprise?.organizationType}</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-[16px] text-muted-foreground">Company size:</p>
                                        <p className="text-[16px]">{resultQuery?.enterprise?.teamSize}</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-[16px] text-muted-foreground">Phone:</p>
                                        <p className="text-[16px]">{resultQuery?.enterprise?.phone}</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-[16px] text-muted-foreground">Email:</p>
                                        <p className="text-[16px]">{resultQuery?.enterprise?.email}</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-[16px] text-muted-foreground">Industry:</p>
                                        <p className="text-[16px]">
                                            {resultQuery?.enterprise?.categories?.map((c) => c.categoryName).join(',')}
                                        </p>
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
                    <div className="mb-6 flex items-center justify-between">
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
                    <div>
                        <div className="grid gap-4 pb-8 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="col-span-full flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50 py-12 text-center">
                                <FileX className="mb-4 h-16 w-16 text-muted-foreground" />
                                <h3 className="mb-2 text-lg font-semibold text-foreground">No related jobs found</h3>
                                <p className="max-w-[500px] text-muted-foreground">
                                    We couldn&apos;t find any related job listings at the moment. Please check back
                                    later or explore other job categories.
                                </p>
                                <Button variant="outline" className="mt-4">
                                    <Link href="/jobs">Browse All Jobs</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
