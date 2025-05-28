'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin } from 'lucide-react';
import { PiBriefcaseDuotone } from 'react-icons/pi';
import { BiBuildings } from 'react-icons/bi';
import { SvgBanner } from '@/components/custom-ui/svg-banner';
import { IconPresent } from '../custom-ui/icon-present';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/lib/react-query/keys';
import { DashboardService } from '@/services/dashboard.service';
import { handleErrorToast } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function HeroSection() {
    const [inputs, setInputs] = useState<{ title: string; location: string }>({
        title: '',
        location: '',
    });

    const router = useRouter();

    const { data } = useQuery({
        queryKey: [queryKey.getTotalHomePage],
        queryFn: async () => {
            try {
                return await DashboardService.getTotalHomePage();
            } catch (error) {
                handleErrorToast(error);
            }
        },
        retry: 1,
    });

    const stats = [
        { number: data?.totalJobActive, label: 'Live Jobs', icon: PiBriefcaseDuotone },
        { number: data?.totalEnterprise, label: 'Companies', icon: BiBuildings },
        { number: data?.totalUser, label: 'Job Seekers', icon: PiBriefcaseDuotone },
        { number: data?.totalJob, label: 'New Jobs', icon: PiBriefcaseDuotone },
    ];

    const handleFind = () => {
        if (!inputs.title && !inputs.location) {
            return;
        }
        router.push('/find-jobs?country=' + inputs.location + '&search=' + inputs.title);
    };

    return (
        <section>
            <section className="container mx-auto max-w-screen-xl px-4">
                <div className="grid items-center gap-8 lg:grid-cols-2">
                    <div className="space-y-8">
                        <h1 className="text-center text-4xl font-medium tracking-wide md:text-left md:text-[56px] md:leading-[64px]">
                            Find a job that suits
                            <br />
                            your interest & skills.
                        </h1>
                        <p className="text-base text-gray-500 md:text-lg">
                            Choose from thousands of jobs available to match your skills and interests. Apply to your
                            dream job today!
                        </p>
                        <div className="flex min-h-20 max-w-screen-md items-center gap-2 rounded-lg border border-gray-100 bg-white p-3 drop-shadow-sm">
                            <div className="flex flex-1 flex-wrap items-center gap-2 border-r sm:flex-nowrap sm:border-r-0">
                                <div className="flex items-center sm:border-r">
                                    <Search className="h-6 w-6 text-primary sm:mx-2" />
                                    <Input
                                        className="h-full flex-1 border-none text-base font-normal shadow-none focus-visible:ring-0"
                                        placeholder="Job title, keyword..."
                                        value={inputs.title}
                                        onChange={(e) => setInputs((prev) => ({ ...prev, title: e.target.value }))}
                                    />
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="h-6 w-6 text-primary sm:mx-2" />
                                    <Input
                                        className="h-full flex-1 border-none text-base font-normal shadow-none focus-visible:ring-0"
                                        placeholder="Your country"
                                        value={inputs.location}
                                        onChange={(e) => setInputs((prev) => ({ ...prev, location: e.target.value }))}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Button size="xl" className="text-base" onClick={handleFind}>
                                    Find Jobs
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="hidden justify-end lg:flex">
                        <SvgBanner />
                    </div>
                </div>

                {/* Stats */}
                <div className="mt-16 grid grid-cols-1 gap-2 md:grid-cols-4 md:gap-4">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <IconPresent.Group
                                key={index}
                                className="flex cursor-default items-center gap-4 rounded-md border border-gray-100 bg-white p-3 hover:shadow-lg hover:shadow-primary-100 md:p-5 lg:gap-9"
                            >
                                <IconPresent.Icon Icon={Icon} size="lg" />
                                <div>
                                    <h3 className="text-xl font-medium text-black md:text-2xl">{stat.number}</h3>
                                    <p className="text-base text-gray-600">{stat.label}</p>
                                </div>
                            </IconPresent.Group>
                        );
                    })}
                </div>
            </section>
        </section>
    );
}
