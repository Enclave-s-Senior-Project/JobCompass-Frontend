'use client';

import { Nav } from '@/components/custom-ui/nav';
import { PiPhoneCall } from 'react-icons/pi';
import { ButtonHome } from '@/components/custom-ui/button-home';
import { Search } from '@/components/custom-ui/search';
import { SwitchSignIn } from '@/components/custom-ui/switch-sign-in';
import { IoMdMenu } from 'react-icons/io';
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';
import { useState } from 'react';
import { clsx } from 'clsx';
import { Button } from '@/components/ui/button';

export function HeaderSection() {
    const [showMenuMobile, setShowMenuMobile] = useState(false);
    const [showSearchMobile, setShowSearchMobile] = useState(false);

    const handleToggleMenuMobile = () => {
        setShowMenuMobile(!showMenuMobile);
    };
    const handleToggleSearchMobile = () => {
        setShowSearchMobile(!showSearchMobile);
    };

    return (
        <header className="border-b">
            {/*for mobile*/}
            <div className="flex items-center justify-between gap-2 px-3 py-2 lg:hidden">
                <div className="mr-auto">
                    <ButtonHome />
                </div>
                <SwitchSignIn />
                <Button size="icon-lg" variant="ghost" className="px-2" onClick={handleToggleSearchMobile}>
                    <HiMiniMagnifyingGlass className={showSearchMobile ? 'text-primary' : 'text-black'} />
                </Button>
                <Button size="icon-lg" variant="ghost" className="px-2" onClick={handleToggleMenuMobile}>
                    <IoMdMenu className={showMenuMobile ? 'text-primary' : 'text-black'} />
                </Button>
            </div>
            {/*---*/}
            {/*navigate bar*/}
            <div
                className={clsx(
                    'overflow-hidden bg-gray-50 px-3 transition-all lg:h-fit',
                    showMenuMobile ? 'h-72' : 'h-0'
                )}
            >
                <div className="container mx-auto flex max-w-screen-xl flex-col items-center justify-between lg:flex-row">
                    <Nav />
                    <div className="flex items-center gap-x-6">
                        <div>
                            <div className="flex items-center gap-1 text-sm font-medium">
                                <PiPhoneCall className="size-6" />
                                <span className="text-nowrap">+1-202-555-0178</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*     */}

            {/*for desktop: header search, login,...*/}
            <div className="bg-white px-3 lg:py-5">
                <div className="py-5` container mx-auto flex max-w-screen-xl items-center">
                    <div className="hidden lg:block">
                        <ButtonHome />
                    </div>
                    <div
                        className={clsx(
                            'ml-0 w-full transition-all lg:visible lg:ml-8 lg:mr-auto lg:h-12 lg:opacity-100',
                            showSearchMobile ? 'visible h-12 opacity-100' : 'invisible h-0 opacity-0'
                        )}
                    >
                        <Search />
                    </div>
                    <div className="hidden lg:block">
                        <SwitchSignIn />
                    </div>
                </div>
            </div>
        </header>
    );
}
