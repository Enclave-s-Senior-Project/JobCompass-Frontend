'use client';

import { User } from '@/types';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { ButtonMark } from '@/components/custom-ui/button-mark';
import { Button } from '@/components/ui/button';
import { CircleArrowRight, Mail, Star } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import defaultAvatarImage from '@/assets/images/avatar/default-avatar.jpg';
import { UserContext } from '@/contexts';
import { useContext } from 'react';
import { hasPermission } from '@/lib/auth';

type Props = {
    userInfo: User;
    isPending?: boolean;
};

export function UserCardProfile({ userInfo, isPending = false }: Props) {
    const { userInfo: ownUserInfo } = useContext(UserContext);
    return (
        <div className="p-10 flex items-center flex-wrap justify-between gap-5 bg-white border rounded-xl">
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
                            <Skeleton className="w-32 md:w-44 h-6" />
                            <Skeleton className="w-36 md:w-56 h-6" />
                        </>
                    ) : (
                        <>
                            <p className="flex items-center gap-2 text-xl md:text-2xl font-medium">
                                {userInfo.fullName}
                                {userInfo.isPremium && (
                                    <Star className="size-6 p-1 text-purple-500 bg-purple-50 border-purple-200 border rounded-full" />
                                )}
                            </p>
                            <p className="text-base text-gray-600">{userInfo.majority?.categoryName}</p>
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
                    className="rounded-sm [&_svg]:size-6 border-2 border-primary"
                >
                    <Mail className="hidden md:block" /> Send Mail
                </Button>
                {hasPermission(ownUserInfo, 'hireCandidate', 'hire') && (
                    <Button
                        disabled={isPending}
                        variant="primary"
                        size="lg"
                        className="border-2 rounded-sm [&_svg]:size-6"
                    >
                        <CircleArrowRight className="hidden md:block" /> Hire Candidates
                    </Button>
                )}
            </div>
        </div>
    );
}
