import Image from 'next/image';
import defaultBackgroundImage from '@/assets/images/avatar/default-background.jpg';
import defaultResumeImage from '@/assets/images/avatar/default-resume-image.jpg';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { ButtonMark } from '@/components/custom-ui/button-mark';
import { Button } from '@/components/ui/button';
import {
    CircleArrowRight,
    CircleUserRound,
    Download,
    Mail,
    Map,
    MapPinHouse,
    NotepadText,
    PhoneCall,
} from 'lucide-react';
import { FaXTwitter, FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa6';
import { PiCake } from 'react-icons/pi';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import ShareProfile from '@/components/custom-ui/share-profile';
import { routes } from '@/configs/routes';

export default function FindCandidatesPage() {
    return (
        <div className="container mx-auto">
            <div className="z-0 max-w-screen-2xl h-56 border overflow-hidden rounded-b-lg">
                <Image src={defaultBackgroundImage} alt="Background image" className="w-full h-full object-cover" />
            </div>
            <div className="z-10 mx-auto max-w-screen-xl -translate-y-20 space-y-12">
                {/* user card */}
                <div className="p-10 flex items-center flex-wrap justify-between gap-5 bg-white border rounded-xl">
                    <div className="flex items-center gap-6">
                        <Avatar className="size-20">
                            <AvatarImage src="https://github.com/shadcn.png" />
                        </Avatar>
                        <div className="space-y-2">
                            <p className="text-2xl font-medium">Esther Howard</p>
                            <p className="text-base text-gray-600">Website Designer (UI/UX)</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <ButtonMark variant="secondary" className="border-2" />
                        <Button
                            variant="outline-secondary"
                            size="lg"
                            className="rounded-sm [&_svg]:size-6 border-2 border-primary"
                        >
                            <Mail className="hidden md:block" /> Send Mail
                        </Button>
                        <Button variant="primary" size="lg" className="border-2 rounded-sm [&_svg]:size-6">
                            <CircleArrowRight className="hidden md:block" /> Hire Candidates
                        </Button>
                    </div>
                </div>

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
                        <div className="p-6 flex flex-wrap gap-y-6 rounded-md border-2 border-primary-50">
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
                        {/* Download Resume */}
                        <div className="p-6 rounded-md border-2 border-primary-50 space-y-4">
                            <p className="text-base font-medium">Download Resume</p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Image src={defaultResumeImage} alt="" />
                                    <div className="space-y-1">
                                        <p className="text-[12px] text-gray-600">Esther Howard</p>
                                        <p className="text-sm font-medium uppercase">PDF</p>
                                    </div>
                                </div>
                                <Button size="lg" variant="secondary" className="[&_svg]:size-6">
                                    <Download /> <span className="sm:hidden block lg:block">Download</span>
                                </Button>
                            </div>
                        </div>
                        {/* Contact information */}
                        <div className="p-6 rounded-md border-2 border-primary-50 space-y-4">
                            <p className="text-base font-medium">Contact Information</p>
                            {/* location */}
                            <div>
                                <div className="flex items-center gap-4">
                                    <MapPinHouse className="size-8 text-primary" />
                                    <div className="space-y-1">
                                        <p className="uppercase text-[12px] text-gray-600">location</p>
                                        <p className="text-black text-sm font-medium">
                                            Beverly Hills, California 90202
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <Separator />
                            <div>
                                <div className="flex items-start gap-4">
                                    <PhoneCall className="size-8 text-primary" />
                                    <div className="space-y-2">
                                        <div className="space-y-1">
                                            <p className="uppercase text-[12px] text-gray-600">PRIMARY PHONE</p>
                                            <p className="text-black text-sm font-medium">
                                                <a href="tel:+1-202-555-0141">+1-202-555-0141</a>
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="uppercase text-[12px] text-gray-600">SECONDARY PHONE</p>
                                            <p className="text-black text-sm font-medium">
                                                <a href="tel:+1-202-555-0141">+1-202-555-0141</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Separator />
                            <div>
                                <div className="flex items-center gap-4">
                                    <Mail className="size-8 text-primary" />
                                    <div className="space-y-1">
                                        <p className="uppercase text-[12px] text-gray-600">email address</p>
                                        <p className="text-black text-sm font-medium">
                                            <a href="mailto:ester.howard@gmail.com">ester.howard@gmail.com</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <p className="mb-5 text-base font-medium">Or Contact Via</p>
                            <div className="flex items-center gap-3">
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
                        </div>
                    </div>
                    {/* Share profile for breakpoint below md  */}
                    <div className="col-span-12 block md:hidden">
                        <ShareProfile />
                    </div>
                </div>
            </div>
        </div>
    );
}
