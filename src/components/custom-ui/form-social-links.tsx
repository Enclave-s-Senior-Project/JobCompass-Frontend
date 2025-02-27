'use client';

import React, { useActionState, useState } from 'react';
import { InputSocialLink } from './input-social-link';
import { Button } from '../ui/button';
import { CirclePlus } from 'lucide-react';
import { SocialType } from '@/types';
import clsx from 'clsx';
import { updateCandidateSocialLinks } from '@/lib/action';

export function FormSocialLinks() {
    const [socialLinks, setSocialLinks] = useState<Array<{ type: SocialType; id: number }>>([]);

    const [state, onSubmit, isPending] = useActionState(updateCandidateSocialLinks, {
        success: false,
        errors: {},
        socialLinks: [],
        socialTypes: [],
    });

    const handleAddSocialLink = () => {
        if (socialLinks.length < 7) {
            setSocialLinks((prev) => [...prev, { type: 'FACEBOOK', link: '', id: Math.random() }]);
        }
    };

    const handleRemoveSocialLink = (id: number) => {
        setSocialLinks((prev) => prev.filter((social) => social.id !== id));
    };

    return (
        <form className="space-y-6" action={onSubmit}>
            <div className="space-y-4">
                {socialLinks.map((socialLink, index) => {
                    return (
                        <div key={socialLink.id} className="relative">
                            <label className="text-sm text-gray-900 cursor-default">Social Link {index + 1}</label>
                            <InputSocialLink
                                defaultValue={state.socialLinks[index]}
                                nameInput="link"
                                nameSelect="typeSocial"
                                defaultSocial={state.socialTypes[index] || socialLink.type}
                                error={state.errors?.[index]?.[0]}
                                handleRemove={() => handleRemoveSocialLink(socialLink.id)}
                            />
                            {state.errors?.[index]?.[0] && (
                                <p className="absolute top-full bottom-0 line-clamp-1 text-red-500 text-[12px] font-medium mb-1 min-h-5">
                                    {state.errors[index][0]}
                                </p>
                            )}
                        </div>
                    );
                })}
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

            <Button type="submit" variant="primary" isPending={isPending}>
                Save Changes
            </Button>
        </form>
    );
}
