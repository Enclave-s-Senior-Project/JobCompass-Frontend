'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin } from 'lucide-react';
import CountUp from 'react-countup';
import { PiBriefcaseDuotone } from 'react-icons/pi';
import { BiBuildings } from 'react-icons/bi';

import { SvgBanner } from '@/components/custom-ui/svg-banner';
import { IconPresent } from '../custom-ui/icon-present';

export function HeroSection() {
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
                                    />
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="h-6 w-6 text-primary sm:mx-2" />
                                    <Input
                                        className="h-full flex-1 border-none text-base font-normal shadow-none focus-visible:ring-0"
                                        placeholder="Your location"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Button size="xl" className="text-base">
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
                                    <h3 className="text-xl font-medium text-black md:text-2xl">
                                        <CountUp start={0} end={stat.number} duration={2.5} separator="," />
                                    </h3>
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

const stats = [
    { number: 175324, label: 'Live Jobs', icon: PiBriefcaseDuotone },
    { number: 97354, label: 'Companies', icon: BiBuildings },
    { number: 3847154, label: 'Job Seekers', icon: PiBriefcaseDuotone },
    { number: 7532, label: 'New Jobs', icon: PiBriefcaseDuotone },
];
