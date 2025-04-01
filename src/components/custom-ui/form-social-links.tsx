'use client';

import { v4 } from 'uuid';
import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { InputSocialLink } from './input-social-link';
import { Button } from '../ui/button';
import { CirclePlus } from 'lucide-react';
import { SocialLink } from '@/types';
import clsx from 'clsx';
import { updateCandidateSocialLinks, updateEnterpriseSocialLinks } from '@/lib/action';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryKey } from '@/lib/react-query/keys';
import { UserContext } from '@/contexts/user-context';
import { WebsiteService } from '@/services/website.service';
import { handleErrorToast } from '@/lib/utils';
import { toast } from '@/lib/toast';
import { EnterpriseContext } from '@/contexts';
import { Skeleton } from '../ui/skeleton';

export function FormSocialLinks({ useType }: { useType: 'candidate' | 'employer' }) {
    const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
    const [errors, setErrors] = useState<(string[] | null)[]>([]);
    const [canSubmit, setCanSubmit] = useState(false);

    const { userInfo } = useContext(UserContext);
    const { enterpriseInfo } = useContext(EnterpriseContext);
    // Candidate Query
    const {
        data: candidateData,
        refetch: candidateRefetch,
        isPending: isPendingQuerySLCandidate,
        isFetching: isLoadingQuerySLCandidate,
    } = useQuery({
        queryKey: [queryKey.candidateSocialLinks, userInfo?.profileId],
        queryFn: async ({ queryKey }) => {
            if (useType !== 'candidate' || !queryKey[1]) return null;
            try {
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
                return null;
            } catch (error) {
                handleErrorToast(error);
                return null;
            }
        },
        retry: 2,
        enabled: useType === 'candidate' && !!userInfo?.profileId,
    });

    // Employer Query
    const {
        data: employerData,
        refetch: employerRefetch,
        isPending: isPendingQuerySLEnterprise,
        isFetching: isLoadingQuerySLEnterprise,
    } = useQuery({
        queryKey: [queryKey.enterpriseSocialLinks, enterpriseInfo?.enterpriseId],
        queryFn: async ({ queryKey }) => {
            if (useType !== 'employer' || !queryKey[1]) return null;
            try {
                const data = await WebsiteService.getEmployerSocialLinks({ enterpriseId: queryKey[1] });
                if (data) {
                    const modifiedData = data.map<SocialLink>((link) => ({
                        socialLink: link.socialLink,
                        socialType: link.socialType,
                        websiteId: link.websiteId || v4(),
                    }));
                    setSocialLinks(modifiedData);
                    return modifiedData;
                }
                return null;
            } catch (error) {
                handleErrorToast(error);
                return null;
            }
        },
        retry: 2,
        enabled: useType === 'employer' && !!userInfo?.profileId,
    });

    // Candidate Mutation
    const { mutate: candidateMutate, isPending: candidatePending } = useMutation({
        mutationFn: () => updateCandidateSocialLinks({ links: socialLinks }),
        onSuccess: (result) => {
            if (!result.success) {
                setErrors(result.errors);
            } else {
                toast.success('User links update is successful!');
                candidateRefetch();
                setErrors([]);
            }
        },
        onError: (error) => {
            handleErrorToast(error);
            return null;
        },
    });

    // Employer Mutation
    const { mutate: employerMutate, isPending: employerPending } = useMutation({
        mutationFn: () => updateEnterpriseSocialLinks({ links: socialLinks }),
        onSuccess: (result) => {
            if (!result.success) {
                setErrors(result.errors);
            } else {
                toast.success('User update is successful!');
                employerRefetch();
                setErrors([]);
            }
        },
        onError: () => {
            toast.error('Oops! Please try again');
        },
    });

    useEffect(() => {
        const timeout = setTimeout(checkFormChanged, 200);
        return () => clearTimeout(timeout);
    }, [socialLinks]);

    const checkFormChanged = () => {
        const originalData = useType === 'candidate' ? candidateData : employerData;
        if (originalData) {
            const hasChanges = JSON.stringify(originalData) !== JSON.stringify(socialLinks);
            setCanSubmit(hasChanges);
        } else {
            setCanSubmit(socialLinks.length > 0);
        }
    };

    const handleAddSocialLink = () => {
        if (socialLinks.length < 7) {
            setSocialLinks((prev) => [
                ...prev,
                {
                    socialType: 'FACEBOOK',
                    socialLink: '',
                    websiteId: v4(),
                },
            ]);
        }
    };

    const handleRemoveSocialLink = (id: string) => {
        setSocialLinks((prev) => prev.filter((social) => social.websiteId !== id));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (useType === 'candidate') {
            candidateMutate();
        } else if (useType === 'employer') {
            employerMutate();
        }
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
                {(useType === 'candidate' && (isPendingQuerySLCandidate || isLoadingQuerySLCandidate)) ||
                (useType === 'employer' && (isPendingQuerySLEnterprise || isLoadingQuerySLEnterprise))
                    ? Array.from({ length: 3 }).map((_, index) => (
                          <div key={index} className="grid grid-cols-12 gap-2">
                              <Skeleton className="rounded-sm col-span-3 h-12" />
                              <Skeleton className="rounded-sm col-span-9 h-12" />
                          </div>
                      ))
                    : socialLinks.map((socialLink, index) => (
                          <div key={socialLink.websiteId} className="relative">
                              <label className="text-sm text-gray-900 cursor-default">Social Link {index + 1}</label>
                              <InputSocialLink
                                  name="link"
                                  valueInput={socialLink.socialLink}
                                  valueSelect={socialLink.socialType}
                                  onChangeInput={(e) => {
                                      setSocialLinks((prev) =>
                                          prev.map((link) =>
                                              link.websiteId === socialLink.websiteId
                                                  ? { ...link, socialLink: e.target.value }
                                                  : link
                                          )
                                      );
                                  }}
                                  onChangeSelect={(value) => {
                                      setSocialLinks((prev) =>
                                          prev.map((link) =>
                                              link.websiteId === socialLink.websiteId
                                                  ? { ...link, socialType: value }
                                                  : link
                                          )
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

            <Button
                type="submit"
                variant="primary"
                isPending={useType === 'candidate' ? candidatePending : employerPending}
                disabled={!canSubmit}
            >
                Save Changes
            </Button>
        </form>
    );
}
