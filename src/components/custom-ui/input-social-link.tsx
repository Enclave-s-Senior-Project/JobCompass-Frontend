import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import clsx from 'clsx';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { CircleX } from 'lucide-react';
import { FaXTwitter, FaFacebookF, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa6';
import { cn } from '@/lib/utils';
import { SocialType } from '@/types';
import { ChangeEvent } from 'react';

type Props = {
    name: string;
    valueInput?: string;
    valueSelect?: SocialType;
    error?: string | null;
    defaultSocial?: SocialType;
    defaultValue?: string;
    handleRemove?: () => void;
    onChangeSelect?: (value: SocialType) => void;
    onChangeInput?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const socials: Array<{ key: SocialType; value: string; icon: React.ReactElement }> = [
    { key: 'FACEBOOK', value: 'Facebook', icon: <FaFacebookF className="size-5 text-primary" /> },
    { key: 'TWITTER', value: 'X - Twitter', icon: <FaXTwitter className="size-5 text-primary" /> },
    { key: 'INSTAGRAM', value: 'Instagram', icon: <FaInstagram className="size-5 text-primary" /> },
    { key: 'YOUTUBE', value: 'Youtube', icon: <FaYoutube className="size-5 text-primary" /> },
    { key: 'LINKEDIN', value: 'LinkedIn', icon: <FaLinkedin className="size-5 text-primary" /> },
];

export function InputSocialLink({
    name,
    valueInput,
    valueSelect,
    error,
    handleRemove,
    onChangeSelect,
    onChangeInput,
    defaultSocial,
    defaultValue,
}: Props) {
    return (
        <div className="flex items-center gap-3">
            <div
                className={cn(
                    'flex flex-1 items-center rounded-sm border border-input',
                    error
                        ? 'border-danger ring-1 ring-danger'
                        : 'focus-within:border focus-within:border-primary focus-within:ring-1 focus-within:ring-primary'
                )}
            >
                <Select name={name} defaultValue={defaultSocial} value={valueSelect} onValueChange={onChangeSelect}>
                    <SelectTrigger
                        className={clsx(
                            'h-12 max-w-52 border-0 text-base ring-0 focus-within:ring-0 focus:ring-0 focus-visible:ring-0'
                        )}
                    >
                        <SelectValue
                            defaultValue={valueSelect}
                            placeholder={
                                <div className="flex items-center gap-2 text-sm">
                                    {socials.find((s) => s.key === valueSelect)?.icon}
                                    {socials.find((s) => s.key === valueSelect)?.value}
                                </div>
                            }
                        />
                    </SelectTrigger>
                    <SelectContent defaultValue={valueSelect}>
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
                <Input
                    name={name}
                    defaultValue={defaultValue}
                    value={valueInput}
                    onChange={onChangeInput}
                    className="h-12 border-0 ring-0 focus-within:ring-0 focus:ring-0 focus-visible:ring-0"
                />
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
