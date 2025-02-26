'use client';

import React, { useState } from 'react';
import { InputSocialLink } from './input-social-link';
import { Button } from '../ui/button';
import { CirclePlus } from 'lucide-react';
import { SocialType } from '@/types';
import clsx from 'clsx';

export function FormSocialLinks() {
    const [socialLinks, setSocialLinks] = useState<Array<{ type: SocialType; link: string, order: number }>>([]);

    const handleAddSocialLink = () => {
        if (socialLinks.length < 7) setSocialLinks((prev) => [...prev, { type: 'FACEBOOK', link: '', order: prev.length > 0 ? prev.length + 1: 1 }]);
    };

    const handleRemoveSocialLink = (index: number) => {
        setSocialLinks((prev) => prev.filter((social) => social.order !== index));
    };

    return (
        <form className="space-y-6">
            <div className="space-y-4">
                {socialLinks.map((socialLink, index) => (
                    <div key={index}>
                        <label className="text-sm text-gray-900 cursor-default">Social Link {socialLink.order}</label>
                        <InputSocialLink
                            name="link1"
                            defaultSocial={socialLink.type}
                            handleRemove={() => handleRemoveSocialLink(socialLink.order)}
                        />
                        <p className="absolute top-full bottom-0 line-clamp-1 text-red-500 text-[12px] font-medium mb-1 min-h-5">
                            {/* {state.errors?.nationality && state.errors.nationality[0]} */}
                        </p>
                    </div>
                ))}
            </div>
            <div>
                {socialLinks.length >= 7 && (
                    <p className="line-clamp-1 text-warning-500 text-[12px] font-medium mb-1 min-h-5">
                        The maximum number of social links is 7
                    </p>
                )}
                <Button
                    type="button"
                    variant="ghost"
                    className={clsx(
                        'w-full bg-gray-50 text-gray-900 hover:bg-white active:opacity-80',
                        socialLinks.length >= 7 ? 'pointer-events-none opacity-70' : ''
                    )}
                    onClick={handleAddSocialLink}
                >
                    <CirclePlus /> Add New Social Link
                </Button>
            </div>

            <Button type="submit" variant="primary">
                Save Changes
            </Button>
        </form>
    );
}
