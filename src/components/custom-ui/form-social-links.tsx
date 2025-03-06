'use client';

import { v4 } from 'uuid';
import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { InputSocialLink } from './input-social-link';
import { Button } from '../ui/button';
import { CirclePlus } from 'lucide-react';
import { SocialLink } from '@/types';
import clsx from 'clsx';
import { updateCandidateSocialLinks } from '@/lib/action';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryKey } from '@/lib/react-query/keys';
import { UserContext } from '@/contexts/user-context';
import { WebsiteService } from '@/services/website.service';
import { handleErrorToast } from '@/lib/utils';
import { toast } from 'sonner';

export function FormSocialLinks() {
    const { userInfo } = useContext(UserContext);

    const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
    const [errors, setErrors] = useState<(string[] | null)[]>([]);
    const [canSubmit, setCanSubmit] = useState(false);

    const { data, refetch } = useQuery({
        queryKey: [queryKey.candidateSocialLinks, userInfo?.profileId],
        queryFn: async ({ queryKey }) => {
            try {
                if (queryKey[1]) {
                    const data = await WebsiteService.getCandidateSocialLinks({ profileId: queryKey[1] });
                    if (data) {
                        const modifiedData = data.map<SocialLink>((link) => ({
                            socialLink: link.socialLink,
                            socialType: link.socialType,
                            websiteId: link.websiteId,
                        }));
                        setSocialLinks(modifiedData);
                        return modifiedData;
                    }
                }
                return null;
            } catch (error) {
                handleErrorToast(error);
            }
        },
        retry: 2,
    });

    const { mutate: submitMutate, isPending } = useMutation({
        mutationFn: () => updateCandidateSocialLinks({ links: socialLinks }),
        onSuccess: (result) => {
            if (!result.success) {
                setErrors(result.errors);
            } else {
                toast.success('Updated!');
                refetch();
                setErrors([]);
            }
        },
        onError: () => {
            toast.error('Oops! Please try again');
        },
    });

    useEffect(() => {
        const timeout = setTimeout(checkFormChanged, 200); // Check after 200ms delay
        return () => clearTimeout(timeout);
    }, [socialLinks]);

    const checkFormChanged = () => {
        const hasChanges = JSON.stringify(data) !== JSON.stringify(socialLinks);
        setCanSubmit(hasChanges);
    };

    const handleAddSocialLink = () => {
        if (socialLinks.length < 7) {
            setSocialLinks((prev) => [...prev, { socialType: 'FACEBOOK', socialLink: '', websiteId: v4() }]);
        }
    };

    const handleRemoveSocialLink = (id: string) => {
        setSocialLinks((prev) => prev.filter((social) => social.websiteId !== id));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        submitMutate();
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
                {socialLinks.map((socialLink, index) => {
                    return (
                        <div key={socialLink.websiteId} className="relative">
                            <label className="text-sm text-gray-900 cursor-default">Social Link {index + 1}</label>
                            <InputSocialLink
                                name="link"
                                valueInput={socialLink.socialLink}
                                valueSelect={socialLink.socialType}
                                onChangeInput={(e) => {
                                    setSocialLinks((prev) =>
                                        prev.map((link) => {
                                            if (link.websiteId === socialLink.websiteId)
                                                return { ...link, socialLink: e.target.value };
                                            else return link;
                                        })
                                    );
                                }}
                                onChangeSelect={(value) => {
                                    setSocialLinks((prev) =>
                                        prev.map((link) => {
                                            if (link.websiteId === socialLink.websiteId)
                                                return { ...link, socialType: value };
                                            else return link;
                                        })
                                    );
                                }}
                                error={errors?.[index]?.[0]}
                                handleRemove={() => handleRemoveSocialLink(socialLink.websiteId ?? '')}
                            />
                            {errors?.[index]?.[0] && (
                                <p className="absolute top-full bottom-0 line-clamp-1 text-red-500 text-[12px] font-medium mb-1 min-h-5">
                                    {errors[index][0]}
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

            <Button type="submit" variant="primary" isPending={isPending} disabled={!canSubmit}>
                Save Changes
            </Button>
        </form>
    );
}
