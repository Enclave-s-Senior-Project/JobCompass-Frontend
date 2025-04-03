import { queryKey } from '@/lib/react-query/keys';
import { handleErrorToast } from '@/lib/utils';
import { UserService } from '@/services/user.service';
import { DetailedRequest, Resume } from '@/types';
import { useMutation, useQueries } from '@tanstack/react-query';
import { RichTextContent } from './global/rich-text-content';
import ShareProfile from './share-profile';
import UserRelatedInformation from './global/user-related-information';
import { UserContactInformation } from './global/user-contact-information';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import defaultAvatarImage from '@/assets/images/avatar/default-avatar.jpg';
import { Bookmark, Mail, Star } from 'lucide-react';
import { Button } from '../ui/button';
import { DownloadResume } from './global/download-resume';
import { EnterpriseService } from '@/services/enterprises.service';
import toast from 'react-hot-toast';
import { Separator } from '@/components/ui/separator';

export default function SingleCandidate(props: { id: string }) {
    const params = props.id;

    const [
        { data: profileData, refetch: refetchProfile },
        { data: resumeData, refetch: refetchResume },
        { data: socialLinksData, refetch: refetchSocialLinks },
    ] = useQueries({
        queries: [
            {
                queryKey: [queryKey.userProfile, params],
                queryFn: async ({ queryKey }) => {
                    try {
                        if (queryKey[1]) {
                            return await UserService.getDetailCandidates({
                                profileId: queryKey[1],
                            } as DetailedRequest.GetUserProfileByProfileId);
                        }
                    } catch (error) {
                        handleErrorToast(error);
                    }
                },
                staleTime: 1000 * 60 * 15,
            },
            {
                queryKey: [queryKey.userResume, params],
                queryFn: async ({ queryKey }) => {
                    try {
                        if (queryKey[1]) {
                            return await UserService.getUserResume({
                                profileId: queryKey[1],
                            } as DetailedRequest.GetUserProfileByProfileId);
                        }
                    } catch (error) {
                        handleErrorToast(error);
                    }
                },
                staleTime: 1000 * 60 * 15,
            },
            {
                queryKey: [queryKey.candidateSocialLinks, params],
                queryFn: async ({ queryKey }) => {
                    try {
                        if (queryKey[1]) {
                            return await UserService.getSocialLinks({
                                profileId: queryKey[1],
                            } as DetailedRequest.GetSocialLinksByProfileId);
                        }
                    } catch (error) {
                        handleErrorToast(error);
                    }
                },
                staleTime: 1000 * 60 * 15,
            },
        ],
    });
    const refetchAll = async () => {
        await Promise.all([refetchProfile(), refetchResume(), refetchSocialLinks()]);
    };

    const addFavoriteEnterpriseMutation = useMutation({
        mutationFn: async (profileId: string) => {
            await EnterpriseService.saveWishlistCandidates(profileId);
        },
        onSuccess: async () => {
            toast.success('Candidate added to favorite list');
            await refetchAll();
        },
        onError: handleErrorToast,
    });

    const removeFavoriteEnterpriseMutation = useMutation({
        mutationFn: async (profileId: string) => {
            await EnterpriseService.removeWishlistCandidates(profileId);
        },
        onSuccess: async () => {
            toast.success('Candidate removed from favorite list');
            await refetchAll();
        },
        onError: handleErrorToast,
    });

    const handleClick = async (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();

        if (!profileData?.profileId) return;

        try {
            if (profileData?.isFavorite) {
                await removeFavoriteEnterpriseMutation.mutateAsync(profileData.profileId);
            } else {
                await addFavoriteEnterpriseMutation.mutateAsync(profileData.profileId);
            }
        } catch (error) {
            console.error('Error handling favorite:', error);
        }
    };
    return (
        <div className="container mx-auto">
            <div className="flex items-center flex-wrap justify-between p-2">
                <div className="flex items-center gap-3 md:gap-6">
                    <Avatar className="size-14 md:size-20">
                        <AvatarImage
                            loading="lazy"
                            src={profileData?.profileUrl || defaultAvatarImage.blurDataURL}
                            className="object-cover object-center"
                            alt={profileData?.fullName}
                        />
                    </Avatar>
                    <div className="space-y-1 md:space-y-1">
                        <p className="flex items-center gap-2 text-xl md:text-2xl font-medium">
                            {profileData?.fullName}
                            {profileData?.isPremium && (
                                <Star className="size-6 p-1 text-purple-500 bg-purple-50 border-purple-200 border rounded-full" />
                            )}
                        </p>
                        <p className="text-base text-gray-600">{profileData?.majority?.categoryName}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        type="button"
                        size="icon-lg"
                        variant={profileData?.isFavorite ? 'primary' : 'third'}
                        onClick={handleClick}
                    >
                        <Bookmark />
                    </Button>
                    <Button
                        variant="outline-secondary"
                        size="lg"
                        className="rounded-sm [&_svg]:size-6 border-2 border-primary"
                    >
                        <Mail className="hidden md:block" /> Send Mail
                    </Button>
                </div>
            </div>
            {/* content */}
            <div className="px-2 sm:px-0 grid grid-cols-12 gap-4 md:gap-8 lg:gap-14 pt-2">
                <div className="col-span-12 md:col-span-7 space-y-9">
                    <div className="space-y-4">
                        <RichTextContent
                            className="text-gray-700 break-normal"
                            content={profileData?.introduction ? profileData?.introduction : 'No introduction'}
                        />
                    </div>
                    <Separator className="my-4" />
                    <div className="space-y-4">
                        <p className="text-xl font-semibold text-primary-700">Cover Letter</p>
                        <RichTextContent
                            className="text-gray-700 break-normal"
                            content={profileData?.coverLetter ? profileData?.coverLetter : 'No cover letter '}
                        />
                    </div>
                    {/* Share profile for breakpoint from md */}
                    <div className="hidden md:block">
                        <ShareProfile />
                    </div>
                </div>
                <div className="col-span-12 md:col-span-5 space-y-6">
                    <UserRelatedInformation
                        info={{
                            dateOfBirth: profileData?.dateOfBirth,
                            gender: profileData?.gender,
                            maritalStatus: profileData?.maritalStatus,
                            nationality: profileData?.nationality,
                        }}
                    />
                    {/* Download Resume */}
                    <DownloadResume resumes={resumeData as Resume[]} />
                    {/* Contact information */}
                    <UserContactInformation
                        contactInfo={{
                            nationality: profileData?.nationality,
                            phone: profileData?.phone,
                        }}
                        socialLinks={socialLinksData || []}
                    />
                </div>
            </div>
        </div>
    );
}
