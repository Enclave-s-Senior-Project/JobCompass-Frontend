'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toFormattedDate } from '@/lib/utils';
import { Enterprise } from '@/types';
import { Calendar, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import { memo } from 'react';
import { useRouter } from 'next/navigation';
import { LuArrowRight } from 'react-icons/lu';

interface props {
    enterprise: Enterprise[];
}
export const CardListEnterprise = memo(({ enterprise }: props) => {
    const router = useRouter();
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
                                                    {item?.addresses?.[0]?.street || 'Unknown'} -{' '}
                                                    {item?.addresses?.[0]?.city || 'Unknown'} -{' '}
                                                    {item?.addresses?.[0]?.country || 'Unknown'}
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
