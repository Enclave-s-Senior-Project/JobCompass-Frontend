import { queryKey } from '@/lib/react-query/keys';
import { handleErrorToast } from '@/lib/utils';
import { UserService } from '@/services/user.service';
import { DetailedRequest, Resume, User } from '@/types';
import { useQueries } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { UserCardProfile } from './local/user-card-profile';
import { RichTextContent } from './global/rich-text-content';
import ShareProfile from './share-profile';
import UserRelatedInformation from './global/user-related-information';
import { DownloadResume } from './global/download-resume';
import { UserContactInformation } from './global/user-contact-information';

export default function SingleCandidate(props: { id: string }) {
    const params = props.id;

    const userProfileQuery = useQueries({
        queries: [
            {
                queryKey: [queryKey.userProfile, params],
                queryFn: async ({ queryKey }) => {
                    try {
                        if (queryKey[1]) {
                            return await UserService.getUserProfile({
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

    return (
        <div className="container mx-auto">
            <div className="z-10 mx-auto max-w-screen-xl -translate-y-20 space-y-12">
                {/* user card */}
                {/* <UserCardProfile
                    userInfo={userProfileQuery[0].data as User}
                    isPending={userProfileQuery[0].data === undefined || userProfileQuery[0].isPending}
                /> */}

                <div className="px-2 sm:px-0 grid grid-cols-12 gap-4 md:gap-8 lg:gap-14">
                    <div className="col-span-12 md:col-span-7 space-y-9">
                        <div className="space-y-4">
                            <RichTextContent
                                className="text-gray-700 break-normal"
                                content={
                                    userProfileQuery?.[0].data?.introduction
                                        ? userProfileQuery?.[0].data?.introduction
                                        : 'No introduction'
                                }
                            />
                        </div>
                        <div className="space-y-4">
                            <p className="text-xl font-semibold text-primary-700">Education</p>
                            <RichTextContent
                                className="text-gray-700 break-normal"
                                content={
                                    userProfileQuery?.[0].data?.education
                                        ? userProfileQuery?.[0].data?.education
                                        : 'No education'
                                }
                            />
                        </div>
                        <div className="space-y-4">
                            <p className="text-xl font-semibold text-primary-700">Experience</p>
                            <RichTextContent
                                className="text-gray-700 break-normal"
                                content={
                                    userProfileQuery?.[0].data?.experience
                                        ? userProfileQuery?.[0].data?.experience
                                        : 'No experience'
                                }
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
                                dateOfBirth: userProfileQuery?.[0]?.data?.dateOfBirth,
                                gender: userProfileQuery?.[0]?.data?.gender,
                                maritalStatus: userProfileQuery?.[0]?.data?.maritalStatus,
                                nationality: userProfileQuery?.[0]?.data?.nationality,
                            }}
                        />
                        {/* Contact information */}
                        <UserContactInformation
                            contactInfo={{
                                nationality: userProfileQuery?.[0]?.data?.nationality,
                                phone: userProfileQuery?.[0]?.data?.phone,
                            }}
                            socialLinks={userProfileQuery?.[2]?.data || []}
                        />
                    </div>
                    {/* Share profile for breakpoint below md  */}
                    <div className="col-span-12 block md:hidden">
                        <ShareProfile />
                    </div>
                </div>
            </div>
        </div>
    );
}
