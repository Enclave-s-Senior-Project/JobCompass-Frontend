import { linkFooterData } from '@/lib/data/link-footer.data';
import Link from 'next/link';
import { LuArrowRight } from 'react-icons/lu';
import { FaFacebookF, FaYoutube, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import footerLogo from '@/assets/svgs/footer-logo.svg';
import Image from 'next/image';

export function FooterSection() {
    return (
        <footer className="bg-gray-950">
            <div className="container mx-auto grid max-w-screen-xl grid-cols-5 gap-10 px-3 pb-20 pt-24 lg:px-0">
                <div className="col-span-5 mx-auto max-w-80 text-gray-500 lg:col-span-2">
                    <div className="mb-6">
                        <Image src={footerLogo} alt="JobCompass" height={26} width={180} />
                    </div>
                    <p className="mb-3 text-lg">
                        Call now: <span className="font-medium text-white">(319) 555-0115</span>
                    </p>
                    <p>6391 Elgin St. Celina, Delaware 10299, New York, United States of America</p>
                </div>
                <div className="col-span-5 flex flex-wrap items-start justify-between gap-y-5 lg:col-span-3 [&_div]:basis-1/2 xl:[&_div]:basis-1/4">
                    {linkFooterData.map((section, index) => (
                        <div key={index}>
                            <p className="mb-4 text-xl font-medium text-white">{section.title}</p>
                            {section.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.href}
                                    className="group mb-2 flex -translate-x-4 items-center text-base font-normal text-gray-500 transition-all hover:translate-x-0"
                                >
                                    <LuArrowRight className="text-transparent transition-all group-hover:text-white" />
                                    <span className="transition-all group-hover:translate-x-0.5 group-hover:text-white">
                                        {link.name}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className="border-t border-t-gray-800">
                <div className="container mx-auto flex max-w-screen-xl flex-wrap items-center justify-center gap-5 px-3 py-6 text-gray-500 md:justify-between">
                    <span className="text-sm">@ 2024 MyJob - Job Portal. All rights Reserved</span>
                    <div className="flex items-center gap-4">
                        <Link
                            href="https://facebook.com/"
                            target="_blank"
                            className="size-5 transition-all hover:scale-110 hover:text-white"
                        >
                            <FaFacebookF />
                        </Link>
                        <Link
                            href="https://www.youtube.com/"
                            target="_blank"
                            className="size-5 transition-all hover:scale-110 hover:text-white"
                        >
                            <FaYoutube />
                        </Link>
                        <Link
                            href="https://www.instagram.com/"
                            target="_blank"
                            className="size-5 transition-all hover:scale-110 hover:text-white"
                        >
                            <FaInstagram />
                        </Link>
                        <Link
                            href="https://x.com/"
                            target="_blank"
                            className="size-5 transition-all hover:scale-110 hover:text-white"
                        >
                            <FaXTwitter />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
