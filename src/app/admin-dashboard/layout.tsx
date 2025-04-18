'use client';

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import React, { createContext, useContext, useState } from 'react';

import { hasPermission } from '@/lib/auth';
import { UserContext } from '@/contexts';
import { NotPermission } from '@/components/custom-ui/global/not-permission';
import { AppSidebar } from '@/components/custom-ui/local/admin-dashboard/app-sidebar';
import { usePathname } from 'next/navigation';
import { capitalize } from 'lodash';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export const SidebarContext = createContext({
    open: true,
    setOpen: (() => {}) as React.Dispatch<React.SetStateAction<boolean>>,
});

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
    const { userInfo, logoutHandle } = useContext(UserContext);

    const [openSidebar, setOpenSidebar] = useState(true);

    const pathname = usePathname();

    const isPermitted = userInfo && hasPermission(userInfo, 'adminDashboard', 'access');

    return isPermitted ? (
        <SidebarContext.Provider value={{ open: openSidebar, setOpen: setOpenSidebar }}>
            <SidebarProvider open={openSidebar} onOpenChange={setOpenSidebar}>
                <AppSidebar user={userInfo} logout={logoutHandle} />
                <main className="flex-1">
                    <div className="px-2 py-3 flex items-center gap-4 border-b shadow-sm drop-shadow-sm">
                        <SidebarTrigger />
                        <div>
                            {pathname.split('/').map((sub, index) => {
                                if (sub) {
                                    const ownedHref = pathname
                                        .split('/')
                                        .slice(0, index + 1)
                                        .join('/');
                                    return (
                                        <Link
                                            href={ownedHref}
                                            key={sub}
                                            className={cn(
                                                'text-sm hover:text-primary-500 hover:font-medium hover:underline transition-colors',
                                                pathname === ownedHref
                                                    ? 'text-primary-500 font-medium pointer-events-none'
                                                    : 'text-gray-500'
                                            )}
                                        >
                                            {capitalize(sub.split('-').join(' '))}
                                            {index < pathname.split('/').length - 1 && <span>&nbsp;/&nbsp;</span>}
                                        </Link>
                                    );
                                }
                            })}
                        </div>
                    </div>
                    {children}
                </main>
            </SidebarProvider>
        </SidebarContext.Provider>
    ) : (
        <NotPermission />
    );
}
