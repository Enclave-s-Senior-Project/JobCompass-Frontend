'use client';

import { DetailedResponse } from '@/types';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Mail, Star } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import defaultAvatarImage from '@/assets/images/avatar/default-avatar.jpg';
import { EnterpriseService } from '@/services/enterprises.service';
import { useMutation } from '@tanstack/react-query';
import { handleErrorToast } from '@/lib/utils';
import { toast } from '@/lib/toast';
import { ButtonMark } from '../button-mark';

type Props = {
    userInfo: DetailedResponse.GetDetailCandidate;
    isPending?: boolean;
    temp?: boolean;
    refetch?: () => void;
};

export function DetailCandidateCardProfile({ userInfo, isPending = false, temp = true, refetch }: Props) {
    const addFavoriteEnterpriseMutation = useMutation({
        mutationFn: async (candidate: string) => {
            try {
                await EnterpriseService.saveWishlistCandidates(candidate);
                await refetch;
            } catch (error: any) {
                handleErrorToast(error);
            }
        },
        onSuccess: () => {
            toast.success('Candidate added to favorite list');
        },
        onError: (error) => {
            handleErrorToast(error);
        },
    });

    const removeFavoriteEnterpriseMutation = useMutation({
        mutationFn: async (candidate: string) => {
            await EnterpriseService.removeWishlistCandidates(candidate);
            await refetch;
        },
        onSuccess: () => {
            toast.success('Candidate remove to favorite list');
        },
        onError: (error) => {
            handleErrorToast(error);
        },
    });
    if (isPending || !userInfo) {
        return (
            <div className="flex flex-wrap items-center justify-between gap-5 rounded-xl border bg-white p-10">
                <div className="flex items-center gap-3 md:gap-6">
                    <Skeleton className="size-20 rounded-full" />
                    <div className="space-y-1 md:space-y-2">
                        <Skeleton className="h-6 w-32 md:w-44" />
                        <Skeleton className="h-6 w-36 md:w-56" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-wrap items-center justify-between gap-5 rounded-xl border bg-white p-10">
            <div className="flex items-center gap-3 md:gap-6">
                {isPending ? (
                    <Skeleton className="size-20 rounded-full" />
                ) : (
                    <Avatar className="size-14 md:size-20">
                        <AvatarImage
                            loading="lazy"
                            src={userInfo.profileUrl || defaultAvatarImage.blurDataURL}
                            className="object-cover object-center"
                            alt={userInfo.fullName}
                        />
                    </Avatar>
                )}
                <div className="space-y-1 md:space-y-2">
                    {isPending ? (
                        <>
                            <Skeleton className="h-6 w-32 md:w-44" />
                            <Skeleton className="h-6 w-36 md:w-56" />
                        </>
                    ) : (
                        <>
                            <p className="flex items-center gap-2 text-xl font-medium md:text-2xl">
                                {userInfo.fullName}
                                {userInfo.isPremium && (
                                    <Star className="size-6 rounded-full border border-purple-200 bg-purple-50 p-1 text-purple-500" />
                                )}
                            </p>
                            <p className="text-base text-gray-600">{userInfo.majority?.categoryName}</p>
                        </>
                    )}
                </div>
            </div>
            {temp && (
                <div className="flex items-center gap-3">
                    <ButtonMark
                        className="border-2"
                        mark={userInfo.isFavorite}
                        handleMark={() => addFavoriteEnterpriseMutation.mutate(userInfo?.profileId)}
                        handleUnMark={() => removeFavoriteEnterpriseMutation.mutate(userInfo?.profileId)}
                    />
                    <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${userInfo?.email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button
                            disabled={isPending}
                            variant="outline-secondary"
                            size="lg"
                            className="rounded-sm border-2 border-primary [&_svg]:size-6"
                        >
                            <Mail className="hidden md:block" /> Send Mail
                        </Button>
                    </a>
                </div>
            )}
        </div>
    );
}
