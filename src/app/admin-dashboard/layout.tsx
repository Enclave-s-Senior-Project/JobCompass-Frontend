'use client';

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import React, { createContext, useContext, useState } from 'react';

import { hasPermission } from '@/lib/auth';
import { UserContext } from '@/contexts';
import { NotPermission } from '@/components/custom-ui/global/not-permission';
import { AppSidebar } from '@/components/custom-ui/local/admin-dashboard/app-sidebar';
import { DynamicBreadcrumb } from '@/components/custom-ui/global/dynamic-breadcrumb';

type SidebarContextType = {
    open: boolean;
    setOpen: (state: boolean) => void;
};

export const SidebarContext = createContext<SidebarContextType>({
    open: true,
    setOpen: () => {},
});

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
    const { userInfo, logoutHandle } = useContext(UserContext);

    const [openSidebar, setOpenSidebar] = useState(localStorage.getItem('admin-sidebar-state') === 'true' || false);

    const isPermitted = userInfo && hasPermission(userInfo, 'adminDashboard', 'access');

    const handleSidebarState = (state: boolean) => {
        localStorage.setItem('admin-sidebar-state', state.toString());
        setOpenSidebar(state);
    };

    return isPermitted ? (
        <SidebarContext.Provider value={{ open: openSidebar, setOpen: handleSidebarState }}>
            <SidebarProvider open={openSidebar} onOpenChange={handleSidebarState}>
                <AppSidebar user={userInfo} logout={logoutHandle} />
                <main className="flex-1">
                    <div className="sticky top-0 z-10 flex items-center gap-4 border-b bg-white px-2 py-3 shadow-sm drop-shadow-sm">
                        <SidebarTrigger />
                        <DynamicBreadcrumb />
                    </div>
                    {children}
                </main>
            </SidebarProvider>
        </SidebarContext.Provider>
    ) : (
        <NotPermission />
    );
}
