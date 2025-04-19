'use client';

import { Enterprise } from '@/types';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { ButtonMark } from '@/components/custom-ui/button-mark';
import { Button } from '@/components/ui/button';
import { CircleArrowRight, Mail, MapPin } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import defaultAvatarImage from '@/assets/images/avatar/default-avatar.jpg';
import { UserContext } from '@/contexts';
import { useContext } from 'react';
import { hasPermission } from '@/lib/auth';

type Props = {
    enterpriseInfo?: Enterprise;
    isPending?: boolean;
};

export function EnterpriseCard({ enterpriseInfo, isPending = false }: Props) {
    const { userInfo: ownUserInfo } = useContext(UserContext);
    return (
        <div className="flex flex-wrap items-center justify-between gap-5 rounded-xl border bg-white p-10">
            <div className="flex items-center gap-3 md:gap-6">
                {isPending ? (
                    <Skeleton className="size-20 rounded-full" />
                ) : (
                    <Avatar className="size-14 md:size-20">
                        <AvatarImage
                            loading="lazy"
                            src={enterpriseInfo?.logoUrl || defaultAvatarImage.blurDataURL}
                            className="object-cover object-center"
                            alt={enterpriseInfo?.name}
                        />
                    </Avatar>
                )}
                <div className="space-y-1">
                    {isPending ? (
                        <>
                            <Skeleton className="h-6 w-32 md:w-44" />
                            <Skeleton className="h-6 w-36 md:w-56" />
                        </>
                    ) : (
                        <>
                            <p className="flex items-center gap-2 text-xl font-medium md:text-2xl">
                                {enterpriseInfo?.name}
                            </p>
                            <div className="flex flex-row items-start gap-2 text-sm text-gray-300">
                                <MapPin className="mb-3 size-5" />
                                <p>
                                    {enterpriseInfo?.addresses?.[0]?.city} - {enterpriseInfo?.addresses?.[0]?.country}
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-3">
                {hasPermission(ownUserInfo, 'markCandidates', 'allowed') && (
                    <ButtonMark className="border-2" disabled={isPending} />
                )}
                <Button
                    disabled={isPending}
                    variant="outline-secondary"
                    size="lg"
                    className="rounded-sm border-2 border-primary [&_svg]:size-6"
                >
                    <Mail className="hidden md:block" /> Send Mail
                </Button>
                {hasPermission(ownUserInfo, 'hireCandidate', 'hire') && (
                    <Button
                        disabled={isPending}
                        variant="primary"
                        size="lg"
                        className="rounded-sm border-2 [&_svg]:size-6"
                    >
                        <CircleArrowRight className="hidden md:block" /> Hire Candidates
                    </Button>
                )}
            </div>
        </div>
    );
}
