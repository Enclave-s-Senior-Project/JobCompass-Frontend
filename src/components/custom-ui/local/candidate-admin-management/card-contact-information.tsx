import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SocialLink } from '@/types';
import { Separator } from '@radix-ui/react-select';
import { Link, Mail, MapPin, Phone } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedin, FaXTwitter, FaYoutube } from 'react-icons/fa6';

type props = {
    location?: string;
    phone?: string;
    email?: string;
    socialLinks?: SocialLink[];
};
export function CardContactInformation({ location, phone, email, socialLinks }: props) {
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
                        <p className="text-sm font-medium">{location}</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-5 w-5 text-muted-foreground text-primary" />
                    <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="text-sm font-medium">{phone}</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-5 w-5 text-muted-foreground text-primary" />
                    <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="text-sm font-medium">{email}</p>
                    </div>
                </div>

                <Separator />

                <div>
                    <p className="mb-3 text-sm text-muted-foreground">Social Profiles</p>
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
                                    <Button key={social.websiteId} variant="third" className="size-12 p-0 md:p-0">
                                        <Link href={social.socialLink} target="_blank" className="p-4">
                                            <Icon />
                                        </Link>
                                    </Button>
                                );
                            })
                        ) : (
                            <span className="text-sm font-medium italic">&lt;Unknown&gt;</span>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
