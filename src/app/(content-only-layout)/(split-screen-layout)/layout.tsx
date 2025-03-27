import React from 'react';
import { PiBriefcaseDuotone } from 'react-icons/pi';
import { BiBuildings } from 'react-icons/bi';
import { ButtonHome } from '@/components/custom-ui/button-home';

const numberFormat = (number: number) => new Intl.NumberFormat('en-IN').format(number);

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-dvh">
            <div
                className="hidden lg:block absolute top-0 bottom-0 right-0 w-1/2 before:absolute before:top-0 before:bottom-0 before:left-0 
                before:border-t-white before:border-l-white before:border-r-transparent before:border-b-transparent before:border-t-[0] before:border-b-[100dvh] before:border-l-[78px] before:border-r-[78px]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(4, 26, 60, 0.45), rgba(4, 26, 60, 0.9)), url('/images/background.jpg')",
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: '0 0',
                }}
            >
                <div className="text-white absolute bottom-28 lg:left-24 xl:left-36 max-w-[560px] space-y-12 mr-10 lg:mr-20">
                    <p className="text-[40px] font-medium">
                        Over {numberFormat(175324)} candidates waiting for good employees.
                    </p>
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="inline-block p-4 bg-[#ffffff1a] rounded-lg mb-5">
                                <PiBriefcaseDuotone className="size-8" />
                            </div>
                            <p className="text-xl font-medium">{numberFormat(175324)}</p>
                            <p className="text-sm font-normal opacity-70">Live Jobs</p>
                        </div>
                        <div>
                            <div className="inline-block p-4 bg-[#ffffff1a] rounded-lg mb-5">
                                <BiBuildings className="size-8" />
                            </div>
                            <p className="text-xl font-medium">{numberFormat(97354)}</p>
                            <p className="text-sm font-normal opacity-70">Companies</p>
                        </div>
                        <div>
                            <div className="inline-block p-4 bg-[#ffffff1a] rounded-lg mb-5">
                                <PiBriefcaseDuotone className="size-8" />
                            </div>
                            <p className="text-xl font-medium">{numberFormat(7532)}</p>
                            <p className="text-sm font-normal opacity-70">New Jobs</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative mx-auto container max-w-screen-xl min-h-dvh grid grid-cols-1 lg:grid-cols-2">
                {/* Pages */}
                <div className="col-span-1 px-10 pb-10 py-4 lg:px-20">
                    <div className="h-full flex flex-col">
                        <ButtonHome />
                        <div className="flex-1 h-full flex flex-col justify-center">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
