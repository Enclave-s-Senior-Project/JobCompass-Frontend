import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
    Mail,
    ChevronLeft,
    ChevronRight,
    Link,
    Phone,
    Bookmark,
    Map,
    NotepadText,
    CircleUserRound,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PiCake } from 'react-icons/pi';
import ShareProfile from '@/components/custom-ui/share-profile';
import { FaFacebookF, FaXTwitter } from 'react-icons/fa6';
import { DialogApplyJob } from '@/components/custom-ui/dialog-apply-job';
export default function SingleJob() {
    return (
        <div className="min-h-screen p-4 md:p-8">
            <main className="max-w-6xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="bg-white rounded-lg  ">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="relative w-[96px] h-[96px] rounded-full overflow-hidden bg-gradient-to-br from-pink-500 to-orange-400">
                                <Image src="/placeholder.svg" alt="Company logo" fill className="object-cover" />
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
                                        <Link className="w-5 h-5 text-[#0066FF]" />
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
                        <Card className="max-w-2xl mx-auto">
                            <CardHeader className="space-y-2">
                                <div className="flex items-center gap-4">
                                    <Image
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
                        <h2 className="text-2xl font-semibold">Related Jobs</h2>
                        <div className="flex gap-2">
                            <Button variant="outline" size="icon-lg">
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon-lg">
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            {
                                company: 'Freepik',
                                role: 'Visual Designer',
                                type: 'Full Time',
                                salary: '$50k-$55k',
                                logo: '/placeholder.svg',
                            },
                            {
                                company: 'Instagram',
                                role: 'Front End Developer',
                                type: 'Contract Base',
                                salary: '$60k-$65k',
                                logo: '/placeholder.svg',
                            },
                            {
                                company: 'Upwork',
                                role: 'Technical Support Specialist',
                                type: 'Full Time',
                                salary: '$55k-$60k',
                                logo: '/placeholder.svg',
                            },
                        ].map((job, i) => (
                            <Card key={i}>
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                                            <Image
                                                src={job.logo || '/placeholder.svg'}
                                                alt={`${job.company} logo`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">{job.role}</h3>
                                            <p className="text-sm text-muted-foreground">{job.company}</p>
                                            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                                                <span>{job.type}</span>
                                                <span>•</span>
                                                <span>{job.salary}</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
