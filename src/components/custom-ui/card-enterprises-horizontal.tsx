'use client';

import { DetailedRequest, Meta } from '@/types';
import { motion } from 'framer-motion';
import { motionVariant } from '@/lib/motion-variants';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LuArrowRight } from 'react-icons/lu';
import { useSearchParams } from 'next/navigation';
import { handleErrorToast, toFormattedDate } from '@/lib/utils';
import { EnterpriseService } from '@/services/enterprises.service';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/lib/react-query/keys';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { FileX } from 'lucide-react';
import { PrimaryPagination } from '@/components/ui/pagination';
import { useRouter } from 'next/navigation';

const ITEM_PER_PAGE = 4;
export default function CardEnterprisesHorizontal() {
    const [totalPages, setTotalPages] = useState(0);
    const search = useSearchParams();
    const page = Number(search.get('page') || 1);
    const order = (search.get('order')?.toUpperCase() as 'ASC' | 'DESC') || 'ASC';
    const router = useRouter();
    const { data: resultQuery, isPending } = useQuery({
        queryKey: [queryKey.favoriteJobs, { order, page, take: ITEM_PER_PAGE }],
        queryFn: async ({ queryKey }) => {
            try {
                const payload = await EnterpriseService.getListEnterprise(queryKey[1] as DetailedRequest.Pagination);
                if (Number(payload?.meta.pageCount) > 0) setTotalPages(Number(payload?.meta.pageCount) || 0);
                return payload;
            } catch (error: any) {
                handleErrorToast(error);
            }
        },
        staleTime: 1000 * 60,
        refetchInterval: 1000 * 60,
        retry: 2,
        enabled: true,
    });

    return (
        <motion.div className="space-y-6 w-full pt-10 py-5">
            {isPending ? (
                [...Array(ITEM_PER_PAGE)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-2">
                        <Skeleton className="h-20 w-20 rounded-md" />
                        <div className="space-y-2 h-20 flex-1 flex flex-col">
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="flex-1 w-full" />
                        </div>
                    </div>
                ))
            ) : !resultQuery?.data?.length ? (
                <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
                    <FileX className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No enterprises found</h3>
                    <p className="text-muted-foreground max-w-[500px]">
                        Currently, there are no enterprises listed. Please check back later or try searching with
                        different criteria.
                    </p>
                </div>
            ) : (
                resultQuery.data.map((enterprise) => (
                    <motion.div
                        key={enterprise.enterpriseId}
                        className="w-full flex gap-8 flex-wrap items-center justify-between p-5 border-2 rounded-xl border-gray-100 hover:border-primary hover:shadow-lg transition-colors"
                        variants={motionVariant.itemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        whileHover={{ y: -2 }}
                    >
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
                                <img
                                    loading="lazy"
                                    src={enterprise?.logoUrl || ''}
                                    alt={enterprise?.name || 'Company Logo'}
                                    className="w-[68px] h-[68px] object-cover rounded-md"
                                />
                            </div>
                            <div className="space-y-3">
                                <h3 className="font-semibold text-xl flex items-center gap-2">
                                    {enterprise.name}&nbsp;
                                    <Badge className="cursor-default bg-primary-100 text-primary hover:text-white border-none rounded-xl px-4 shadow-none">
                                        {enterprise.organizationType}
                                    </Badge>
                                </h3>
                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1 text-sm">
                                        {enterprise?.addresses && enterprise.addresses.length > 0 ? (
                                            <span className="flex items-center gap-1 text-sm">
                                                <MapPin className="h-5 w-5" /> {enterprise.addresses[0].country} -{' '}
                                                {enterprise.addresses[0].city}
                                            </span>
                                        ) : (
                                            <span className="text-muted-foreground">No address available</span>
                                        )}
                                    </span>
                                    <span className="flex items-center gap-1 text-sm">
                                        <Calendar className="h-5 w-5" />{' '}
                                        {enterprise?.foundedIn
                                            ? toFormattedDate(enterprise.foundedIn)
                                            : 'Not specified'}
                                    </span>
                                    <span className="flex items-center gap-1 text-sm">
                                        <Phone className="h-5 w-5" /> {enterprise.phone}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 flex items-center justify-end gap-3">
                            {/* <Button className="group" variant="third" size="lg">
                                Apply Now <LuArrowRight className="group-hover:translate-x-2 transition-all" />
                            </Button> */}
                            <Button
                                className="group"
                                variant="third"
                                size="lg"
                                onClick={() => {
                                    router.push(`/enterprises/${enterprise?.enterpriseId}`);
                                }}
                            >
                                View Detail <LuArrowRight className="group-hover:translate-x-2 transition-all" />
                            </Button>
                        </div>
                    </motion.div>
                ))
            )}
            {/* Pagination */}
            {Number(totalPages) > 1 && (
                <div className="pt-5">
                    <PrimaryPagination
                        meta={resultQuery?.meta as Meta}
                        pagination={{
                            page,
                            order,
                        }}
                        totalPages={totalPages}
                    />
                </div>
            )}
        </motion.div>
    );
}
