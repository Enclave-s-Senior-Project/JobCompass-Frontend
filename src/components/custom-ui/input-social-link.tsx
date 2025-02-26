import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import clsx from 'clsx';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { CircleX } from 'lucide-react';
import { FaXTwitter, FaFacebookF, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa6';
import { cn } from '@/lib/utils';
import { SocialType } from '@/types';

type Props = {
    name: string;
    error?: string | null;
    defaultSocial?: SocialType;
    handleRemove?: () => void;
};

const socials: Array<{ key: SocialType; value: string; icon: React.ReactElement }> = [
    { key: 'FACEBOOK', value: 'Facebook', icon: <FaFacebookF className="text-primary size-5" /> },
    { key: 'TWITTER', value: 'X - Twitter', icon: <FaXTwitter className="text-primary size-5" /> },
    { key: 'INSTAGRAM', value: 'Instagram', icon: <FaInstagram className="text-primary size-5" /> },
    { key: 'YOUTUBE', value: 'Youtube', icon: <FaYoutube className="text-primary size-5" /> },
    { key: 'LINKEDIN', value: 'LinkedIn', icon: <FaLinkedin className="text-primary size-5" /> },
];

export function InputSocialLink({ name, error, defaultSocial, handleRemove }: Props) {
    const defaultSocialChose = socials.find((social) => social.key === defaultSocial);
    return (
        <div className="flex items-center gap-3">
            <div
                className={cn(
                    'flex-1 flex items-center border-input border rounded-sm',
                    error
                        ? 'border-danger ring-danger ring-1'
                        : 'focus-within:border-primary focus-within:ring-primary focus-within:border focus-within:ring-1'
                )}
            >
                <Select name={name}>
                    <SelectTrigger
                        className={clsx(
                            'h-12 max-w-52 text-base border-0 ring-0 focus:ring-0 focus-within:ring-0 focus-visible:ring-0'
                        )}
                    >
                        <SelectValue
                            placeholder={
                                <div className="flex items-center gap-2 text-sm">
                                    {defaultSocialChose?.icon} {defaultSocialChose?.value}
                                </div>
                            }
                        />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {socials.map((social) => (
                                <SelectItem key={social.key} value={social.key}>
                                    <div className="flex items-center gap-2 text-sm">
                                        {social.icon} {social.value}
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Separator orientation="vertical" className="h-8" />
                <Input className="h-12 border-0 ring-0 focus:ring-0 focus-within:ring-0 focus-visible:ring-0" />
            </div>
            <Button
                size="icon-lg"
                type="button"
                variant="ghost"
                onClick={handleRemove}
                className="bg-gray-50 text-gray-900 hover:bg-white active:opacity-80"
            >
                <CircleX />
            </Button>
        </div>
    );
}
