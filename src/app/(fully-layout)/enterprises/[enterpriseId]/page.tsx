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
            <div className="z-0 h-56 max-w-screen-2xl overflow-hidden rounded-b-lg border">
                <Image src={defaultBackgroundImage} alt="Background image" className="h-full w-full object-cover" />
            </div>
            <div className="z-10 mx-auto max-w-screen-xl -translate-y-20 space-y-12">
                {/* enterprise card */}
                <EnterpriseCard
                    enterpriseInfo={enterprise as Enterprise}
                    isPending={resultQuery === undefined || isPending}
                />
                <div className="grid grid-cols-12 gap-4 px-2 sm:px-0 md:gap-8 lg:gap-14">
                    <div className="col-span-12 space-y-9 md:col-span-7">
                        <div className="">
                            <p className="text-xl font-semibold text-primary-700">General information</p>
                            <div>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                    <div>
                                        <div className="mb-1 text-gray-500">Company type</div>
                                        <div>
                                            {resultQuery?.value?.categories?.map((c) => c.categoryName).join(', ')}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mb-1 text-gray-500">Company industry</div>
                                        <div>{resultQuery?.value?.organizationType}</div>
                                    </div>
                                    <div>
                                        <div className="mb-1 text-gray-500">Company size</div>
                                        <div>{resultQuery?.value?.teamSize}</div>
                                    </div>
                                    <div>
                                        <div className="mb-1 text-gray-500">Country</div>
                                        <div className="flex items-center gap-2">
                                            {resultQuery?.value?.addresses?.[0]?.country}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mb-1 text-gray-500">Company vision</div>
                                        <div>{resultQuery?.value?.companyVision}</div>
                                    </div>
                                    <div>
                                        <div className="mb-1 text-gray-500">Phone</div>
                                        <div>{resultQuery?.value?.phone}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <p className="text-xl font-semibold text-primary-700">Company overview</p>
                            <RichTextContent
                                className="break-normal text-gray-700"
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
                    <div className="col-span-12 space-y-6 md:col-span-5">
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
