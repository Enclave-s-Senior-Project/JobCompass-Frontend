'use client';
import defaultBackgroundImage from '@/assets/images/avatar/default-background.jpg';
import { queryKey } from '@/lib/react-query/keys';
import { handleErrorToast } from '@/lib/utils';
import { EnterpriseService } from '@/services/enterprises.service';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { EnterpriseCard } from '@/components/custom-ui/local/enterprise-card';
import { Enterprise } from '@/types';
import { useState } from 'react';
import ShareProfile from '@/components/custom-ui/share-profile';
import { RichTextContent } from '@/components/custom-ui/global/rich-text-content';
import { TopJob } from '@/components/custom-ui/top-job';

export default function DetailEnterprise() {
    const { enterpriseId } = useParams<{ enterpriseId: string }>();
    const [enterprise, setEnterprise] = useState<Enterprise | undefined>(undefined);
    const {
        data: resultQuery,
        refetch,
        isPending,
    } = useQuery({
        queryKey: [queryKey.detailEnterprise],
        queryFn: async () => {
            try {
                const temp = await EnterpriseService.getEnterpriseById(enterpriseId);
                if (temp) {
                    setEnterprise(temp.value);
                }
                return temp;
            } catch (error: any) {
                console.log(error);
                handleErrorToast(error);
            }
        },
    });
    return (
        <div className="container mx-auto">
            <div className="z-0 max-w-screen-2xl h-56 border overflow-hidden rounded-b-lg">
                <Image src={defaultBackgroundImage} alt="Background image" className="w-full h-full object-cover" />
            </div>
            <div className="z-10 mx-auto max-w-screen-xl -translate-y-20 space-y-12">
                {/* enterprise card */}
                <EnterpriseCard
                    enterpriseInfo={enterprise as Enterprise}
                    isPending={resultQuery === undefined || isPending}
                />
                <div className="px-2 sm:px-0 grid grid-cols-12 gap-4 md:gap-8 lg:gap-14">
                    <div className="col-span-12 md:col-span-7 space-y-9">
                        <div className="">
                            <p className="text-xl font-semibold text-primary-700">General information</p>
                            <div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <div className="text-gray-500 mb-1">Company type</div>
                                        <div>
                                            {resultQuery?.value?.categories?.map((c) => c.categoryName).join(', ')}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-gray-500 mb-1">Company industry</div>
                                        <div>{resultQuery?.value?.organizationType}</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-500 mb-1">Company size</div>
                                        <div>{resultQuery?.value?.teamSize}</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-500 mb-1">Country</div>
                                        <div className="flex items-center gap-2">
                                            {resultQuery?.value?.addresses?.[0]?.country}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-gray-500 mb-1">Company vision</div>
                                        <div>{resultQuery?.value?.companyVision}</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-500 mb-1">Phone</div>
                                        <div>{resultQuery?.value?.phone}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <p className="text-xl font-semibold text-primary-700">Company overview</p>
                            <RichTextContent
                                className="text-gray-700 break-normal"
                                content={
                                    resultQuery?.value?.description ? resultQuery?.value?.description : 'No Description'
                                }
                            />
                        </div>

                        {/* Share profile for breakpoint from md */}
                        <div className="hidden md:block">
                            <ShareProfile />
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-5 space-y-6">
                        <TopJob
                            jobs={resultQuery?.value?.jobs ?? []}
                            refetchJob={refetch}
                            isLoading={isPending}
                            refetchDetailJob={refetch}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
