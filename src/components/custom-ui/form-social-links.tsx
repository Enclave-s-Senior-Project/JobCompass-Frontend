'use client';

import React, { useActionState, useContext, useState } from 'react';
import { InputSocialLink } from './input-social-link';
import { Button } from '../ui/button';
import { CirclePlus } from 'lucide-react';
import { SocialLink } from '@/types';
import clsx from 'clsx';
import { updateCandidateSocialLinks } from '@/lib/action';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/lib/react-query/keys';
import { UserContext } from '@/contexts/user-context';
import { WebsiteService } from '@/services/website.service';
import { handleErrorToast } from '@/lib/utils';

export function FormSocialLinks() {
    const { userInfo } = useContext(UserContext);

    const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

    const [state, onSubmit, isPending] = useActionState(updateCandidateSocialLinks, {
        success: false,
        errors: {},
        socialLinks: [],
        socialTypes: [],
    });

    useQuery({
        queryKey: [queryKey.candidateSocialLinks, userInfo?.profileId],
        queryFn: async ({ queryKey }) => {
            try {
                if (queryKey[1]) {
                    const data = await WebsiteService.getCandidateSocialLinks({ profileId: queryKey[1] });
                    setSocialLinks(data as SocialLink[]);
                    return data;
                }
                return null;
            } catch (error) {
                handleErrorToast(error);
            }
        },
        retry: 2,
    });

    const handleAddSocialLink = () => {
        if (socialLinks.length < 7) {
            setSocialLinks((prev) => [
                ...prev,
                { socialType: 'FACEBOOK', socialLink: '', websiteId: Math.random().toString() },
            ]);
        }
    };

    const handleRemoveSocialLink = (id: string) => {
        setSocialLinks((prev) => prev.filter((social) => social.websiteId !== id));
    };

    return (
        <form className="space-y-6" action={onSubmit}>
            <div className="space-y-4">
                {socialLinks.map((socialLink, index) => {
                    return (
                        <div key={socialLink.websiteId} className="relative">
                            <label className="text-sm text-gray-900 cursor-default">Social Link {index + 1}</label>
                            <InputSocialLink
                                defaultValue={state.socialLinks[index] ?? socialLink.socialLink}
                                nameInput="link"
                                nameSelect="typeSocial"
                                defaultSocial={state.socialTypes[index] || socialLink.socialType}
                                error={state.errors?.[index]?.[0]}
                                handleRemove={() => handleRemoveSocialLink(socialLink.websiteId ?? '')}
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
