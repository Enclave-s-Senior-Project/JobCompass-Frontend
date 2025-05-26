'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toFormattedDate } from '@/lib/utils';
import { Enterprise } from '@/types';
import { Calendar, FileX, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import { memo } from 'react';
import { useRouter } from 'next/navigation';
import { LuArrowRight } from 'react-icons/lu';
import { Skeleton } from '@/components/ui/skeleton';

interface props {
    enterprise: Enterprise[];
    isPending: boolean;
}
export const CardListEnterprise = memo(({ enterprise, isPending }: props) => {
    const router = useRouter();

    if (isPending) {
        return (
            <div className="flex flex-col gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center space-x-2">
                        <Skeleton className="h-20 w-20 rounded-md" />
                        <div className="flex h-20 flex-1 flex-col space-y-2">
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="w-full flex-1" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!enterprise?.length) {
        return (
            <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
                <FileX className="mb-4 h-16 w-16 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-semibold text-foreground">No enterprises found</h3>
                <p className="max-w-[500px] text-muted-foreground">
                    Currently, there are no enterprises listed. Please check back later or try searching with different
                    criteria.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {enterprise.map((item, index) => (
                <Card key={index} className="overflow-hidden transition-all duration-200 hover:shadow-md">
                    <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                            <div className="relative flex w-full items-center justify-center bg-slate-100 p-6 sm:h-auto sm:w-32">
                                <Image src={item.logoUrl} alt={item.name} fill className="rounded-md object-cover" />
                            </div>
                            <div className="flex-1 p-6">
                                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-lg font-semibold text-slate-800">{item.name}</h3>
                                        </div>
                                        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                                            <div className="flex items-center gap-1">
                                                <MapPin className="h-4 w-4 text-slate-400" />
                                                <span>
                                                    {[
                                                        item?.addresses?.[0]?.street,
                                                        item?.addresses?.[0]?.city,
                                                        item?.addresses?.[0]?.country,
                                                    ]
                                                        .filter(Boolean)
                                                        .join(' - ') || 'Unknown'}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4 text-slate-400" />
                                                <span>
                                                    {item.foundedIn ? toFormattedDate(item.foundedIn) : 'Unknown'}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Phone className="h-4 w-4 text-slate-400" />
                                                <span>{item.phone || 'Unknown'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        className="group"
                                        variant="third"
                                        size="lg"
                                        onClick={() => {
                                            router.push(`/enterprises/${item?.enterpriseId}`);
                                        }}
                                    >
                                        View Detail{' '}
                                        <LuArrowRight className="transition-all group-hover:translate-x-2" />
                                    </Button>
                                </div>
                                <div className="mt-4">
                                    <p className="line-clamp-3 text-sm text-slate-600">{item.bio}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
});
CardListEnterprise.displayName = 'card-list-enterprise';
