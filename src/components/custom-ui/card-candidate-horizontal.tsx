'use client';
import { queryKey } from '@/lib/react-query/keys';
import { handleErrorToast } from '@/lib/utils';
import { DetailedRequest, Meta } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from '../ui/skeleton';
import { FileX, MapPin, Phone, UserRound } from 'lucide-react';
import { motionVariant } from '@/lib/motion-variants';
import { Button } from '../ui/button';
import { LuArrowRight } from 'react-icons/lu';
import { PrimaryPagination } from '../ui/pagination';
import { toast } from '@/lib/toast';
import { ButtonMark } from './button-mark';
import { EnterpriseService } from '@/services/enterprises.service';
import { useRouter } from 'next/navigation';
import defaultAvatar from '@/assets/images/avatar/default-avatar.jpg';

export default function CardCandidateHorizontal(props: {
    perPage: number;
    order: 'ASC' | 'DESC';
    maritalStatus: string | undefined;
    categories: string[] | undefined;
    gender: string | undefined;
    onRefetch?: (refetch: () => void) => void;
}) {
    const router = useRouter();
    const ITEM_PER_PAGE = props.perPage;
    const { order, maritalStatus, categories, gender, onRefetch } = props;
    const [totalPages, setTotalPages] = useState(0);
    const search = useSearchParams();
    const page = Number(search.get('page') || 1);

    const {
        refetch,
        data: resultQuery,
        isPending,
    } = useQuery({
        queryKey: [queryKey.favoriteJobs, { order, page, take: ITEM_PER_PAGE, categories, gender, maritalStatus }],
        queryFn: async ({ queryKey }) => {
            try {
                const payload = await EnterpriseService.getCandidates(queryKey[1] as DetailedRequest.GetCandidates);
                if (Number(payload?.meta.pageCount) > 0) setTotalPages(Number(payload?.meta.pageCount) || 0);
                return payload;
            } catch (error: any) {
                handleErrorToast(error);
            }
        },
        staleTime: 1000 * 60,
        retry: 2,
        enabled: true,
    });

    useEffect(() => {
        if (onRefetch) {
            onRefetch(refetch);
        }
    }, [refetch, onRefetch]);

    const addFavoriteEnterpriseMutation = useMutation({
        mutationFn: async (candidate: string) => {
            try {
                await EnterpriseService.saveWishlistCandidates(candidate);
                await refetch();
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
            await refetch();
        },
        onSuccess: () => {
            toast.success('Candidate remove to favorite list');
        },
        onError: (error) => {
            handleErrorToast(error);
        },
    });

    return (
        <motion.div className="w-full space-y-3 pt-10">
            {isPending ? (
                [...Array(ITEM_PER_PAGE)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-2">
                        <Skeleton className="h-20 w-20 rounded-md" />
                        <div className="flex h-20 flex-1 flex-col space-y-2">
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="w-full flex-1" />
                        </div>
                    </div>
                ))
            ) : !resultQuery?.data?.length ? (
                <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
                    <FileX className="mb-4 h-16 w-16 text-muted-foreground" />
                    <h3 className="mb-2 text-lg font-semibold text-foreground">No candidates found</h3>
                    <p className="max-w-[500px] text-muted-foreground">
                        Currently, there are no candidates listed. Please check back later or try searching with
                        different criteria.
                    </p>
                </div>
            ) : (
                resultQuery.data.map((candidates) => (
                    <motion.div
                        key={candidates.profileId}
                        className="flex w-full flex-wrap items-center justify-between gap-8 rounded-md border-2 border-gray-100 p-5 transition-colors hover:border-primary hover:shadow-lg md:gap-24"
                        variants={motionVariant.itemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        whileHover={{ y: -2 }}
                    >
                        <div className="flex items-center gap-5">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                                <img
                                    loading="lazy"
                                    src={candidates?.profileUrl || defaultAvatar.src}
                                    alt={candidates?.fullName || 'Company Logo'}
                                    className="h-[68px] w-[68px] rounded-full object-cover"
                                />
                            </div>
                            <div className="space-y-3">
                                <h3 className="flex items-center gap-2 text-xl font-semibold">
                                    {candidates?.fullName} 
                                </h3>
                                <span className="text-sm text-muted-foreground">{candidates?.fullName}</span>
                                <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                                    {candidates?.nationality && (
                                        <span className="flex items-center gap-1 text-sm">
                                            <MapPin className="h-5 w-5" />
                                            {candidates.nationality}
                                        </span>
                                    )}
                                    {candidates?.phone && (
                                        <span className="flex items-center gap-1 text-sm">
                                            <Phone className="h-5 w-5" />
                                            {candidates.phone}
                                        </span>
                                    )}
                                    {candidates?.gender && (
                                        <span className="flex items-center gap-1 text-sm">
                                            <UserRound className="h-5 w-5" />
                                            {candidates.gender}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-1 items-center justify-end gap-3">
                            <ButtonMark
                                mark={candidates?.is_favorite}
                                handleMark={() => addFavoriteEnterpriseMutation.mutate(candidates?.profileId)}
                                handleUnMark={() => removeFavoriteEnterpriseMutation.mutate(candidates?.profileId)}
                            />
                            <Button
                                className="group"
                                variant="third"
                                size="lg"
                                onClick={() => {
                                    router.push(`/find-candidates/candidate-profile/${candidates?.profileId}`);
                                }}
                            >
                                View detail <LuArrowRight className="transition-all group-hover:translate-x-2" />
                            </Button>
                            {/* <DialogDetailCandidate id={candidates?.profileId} /> */}
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
