'use client';

import Image from 'next/image';
import defaultBackgroundImage from '@/assets/images/avatar/default-background.jpg';
import { useParams } from 'next/navigation';
import { useQueries } from '@tanstack/react-query';
import { queryKey } from '@/lib/react-query/keys';
import { handleErrorToast } from '@/lib/utils';
import { UserService } from '@/services/user.service';
import { DetailedRequest, Resume } from '@/types';
import { CardNameCandidate } from '@/components/custom-ui/local/candidate-admin-management/card-name-candidate';
import { CardContactInformation } from '@/components/custom-ui/local/candidate-admin-management/card-contact-information';
import { CardPersonalDetail } from '@/components/custom-ui/local/candidate-admin-management/card-personal-detail';
import { DetailInformation } from '@/components/custom-ui/local/candidate-admin-management/detail-information';
import { CardResume } from '@/components/custom-ui/local/candidate-admin-management/card-resume';

export default function FindCandidatesAdminPage() {
    const params = useParams<{ id: string }>();

    const userProfileQuery = useQueries({
        queries: [
            {
                queryKey: [queryKey.userProfileDashboard, params?.id],
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
                queryKey: [queryKey.userResume, params?.id],
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
                queryKey: [queryKey.candidateSocialLinks, params?.id],
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
        <div className="container mx-auto py-6">
            <div className="z-0 h-56 max-w-screen-2xl overflow-hidden rounded-b-lg border">
                <Image
                    src={userProfileQuery[0].data?.pageUrl || defaultBackgroundImage}
                    alt="Background image"
                    width={1280}
                    height={720}
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="z-10 mx-auto max-w-screen-xl -translate-y-20 space-y-12">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="space-y-6 lg:col-span-1">
                        <CardNameCandidate
                            name={userProfileQuery[0]?.data?.fullName}
                            major={userProfileQuery[0].data?.majority?.categoryName}
                            industry={userProfileQuery[0].data?.industry?.categoryName}
                            status={userProfileQuery[0].data?.status}
                            avatar={userProfileQuery[0].data?.profileUrl}
                        />
                        <CardContactInformation
                            email={userProfileQuery[0].data?.email}
                            location={userProfileQuery[0].data?.nationality}
                            phone={userProfileQuery[0].data?.phone}
                            socialLinks={userProfileQuery[2].data}
                        />
                        <CardPersonalDetail
                            dateOfBirth={userProfileQuery[0].data?.dateOfBirth}
                            gender={userProfileQuery[0].data?.gender}
                            maritalStatus={userProfileQuery[0].data?.maritalStatus}
                            nationality={userProfileQuery[0].data?.nationality}
                        />
                    </div>
                    <div className="space-y-6 lg:col-span-2">
                        <DetailInformation
                            overview={userProfileQuery[0].data?.introduction}
                            experience={userProfileQuery[0].data?.experience}
                            education={userProfileQuery[0].data?.education}
                        />
                        <CardResume resumes={userProfileQuery[1].data as Resume[]} />
                    </div>
                </div>
            </div>
        </div>
    );
}
