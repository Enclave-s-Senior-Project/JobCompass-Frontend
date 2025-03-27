'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SocialLink, User } from '@/types';
import { Mail, MapPinHouse, PhoneCall } from 'lucide-react';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaLinkedin, FaXTwitter, FaYoutube } from 'react-icons/fa6';

type Props = {
    contactInfo: Pick<User, 'nationality' | 'phone'>;
    socialLinks: SocialLink[];
};

export function UserContactInformation({ contactInfo, socialLinks }: Props) {
    return (
        <div className="p-6 rounded-md border-2 border-primary-50 space-y-4">
            <p className="text-base font-medium">Contact Information</p>
            {/* location */}
            <div>
                <div className="flex items-center gap-4">
                    <MapPinHouse className="size-8 text-primary" />
                    <div className="space-y-1">
                        <p className="uppercase text-[12px] text-gray-600">location</p>
                        <p className="text-black text-sm font-medium">{contactInfo?.nationality}</p>
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
                                <a href="tel:+1-202-555-0141">{contactInfo?.phone}</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Separator />
            {false && (
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
            )}
            <p className="mb-5 text-base font-medium">Or Contact Via</p>
            <div className="flex items-center gap-3">
                {socialLinks.map((social) => {
                    const Icon = {
                        FACEBOOK: FaFacebookF,
                        TWITTER: FaXTwitter,
                        INSTAGRAM: FaInstagram,
                        YOUTUBE: FaYoutube,
                        LINKEDIN: FaLinkedin,
                    }[social.socialType];

                    return (
                        <Button key={social.websiteId} variant="third" className="size-12 p-0 md:p-0">
                            <Link href={social.socialLink} target="_blank" className="p-4">
                                <Icon />
                            </Link>
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}
