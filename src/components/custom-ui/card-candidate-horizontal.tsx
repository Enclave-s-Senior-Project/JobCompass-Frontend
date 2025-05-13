'use client';
import { handleErrorToast } from '@/lib/utils';
import { User } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { memo } from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from '../ui/skeleton';
import { FileX, MapPin, Phone, UserRound } from 'lucide-react';
import { motionVariant } from '@/lib/motion-variants';
import { Button } from '../ui/button';
import { LuArrowRight } from 'react-icons/lu';
import { toast } from '@/lib/toast';
import { ButtonMark } from './button-mark';
import { EnterpriseService } from '@/services/enterprises.service';
import { useRouter } from 'next/navigation';
import defaultAvatar from '@/assets/images/avatar/default-avatar.jpg';

export const CardCandidateHorizontal = memo(
    (props: { candidates: Array<User & { is_favorite: boolean }>; refetch: () => void; isPending: boolean }) => {
        const router = useRouter();

        const addFavoriteEnterpriseMutation = useMutation({
            mutationFn: async (candidate: string) => {
                try {
                    await EnterpriseService.saveWishlistCandidates(candidate);
                    props.refetch();
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
                props.refetch();
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
                {props.isPending ? (
                    <div className="flex items-center space-x-2">
                        <Skeleton className="h-20 w-20 rounded-md" />
                        <div className="flex h-20 flex-1 flex-col space-y-2">
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="w-full flex-1" />
                        </div>
                    </div>
                ) : !props.candidates?.length ? (
                    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
                        <FileX className="text``-``muted-foreground mb-4 h-16 w-16" />
                        <h3 className="mb-2 text-lg font-semibold text-foreground">No candidates found</h3>
                        <p className="max-w-[500px] text-muted-foreground">
                            Currently, there are no candidates listed. Please check back later or try searching with
                            different criteria.
                        </p>
                    </div>
                ) : (
                    props.candidates.map((candidate) => (
                        <motion.div
                            key={candidate.profileId}
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
                                        src={candidate?.profileUrl || defaultAvatar.src}
                                        alt={candidate?.fullName || 'Company Logo'}
                                        className="h-[68px] w-[68px] rounded-full object-cover"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <h3 className="flex items-center gap-2 text-xl font-semibold">
                                        {candidate?.fullName} 
                                    </h3>
                                    <span className="text-sm text-muted-foreground">{candidate?.fullName}</span>
                                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                                        {candidate?.nationality && (
                                            <span className="flex items-center gap-1 text-sm">
                                                <MapPin className="h-5 w-5" />
                                                {candidate.nationality}
                                            </span>
                                        )}
                                        {candidate?.phone && (
                                            <span className="flex items-center gap-1 text-sm">
                                                <Phone className="h-5 w-5" />
                                                {candidate.phone}
                                            </span>
                                        )}
                                        {candidate?.gender && (
                                            <span className="flex items-center gap-1 text-sm">
                                                <UserRound className="h-5 w-5" />
                                                {candidate.gender}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-1 items-center justify-end gap-3">
                                <ButtonMark
                                    mark={candidate.is_favorite || false}
                                    handleMark={() => addFavoriteEnterpriseMutation.mutate(candidate?.profileId)}
                                    handleUnMark={() => removeFavoriteEnterpriseMutation.mutate(candidate?.profileId)}
                                />
                                <Button
                                    className="group"
                                    variant="third"
                                    size="lg"
                                    onClick={() => {
                                        router.push(`/find-candidates/candidate-profile/${candidate?.profileId}`);
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
                {/* {Number(totalPages) > 1 && (
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
            )} */}
            </motion.div>
        );
    }
);

CardCandidateHorizontal.displayName = 'CardCandidateHorizontal';
