'use client';

import { NotPermission } from '@/components/custom-ui/global/not-permission';
import { SidebarDashboardEmployer } from '@/components/custom-ui/sidebar-dashboard-employer';
import { UserContext } from '@/contexts/user-context';
import { hasPermission } from '@/lib/auth';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';

export default function EmployeeDashboardLayout({ children }: { children: React.ReactNode }) {
    const { userInfo } = useContext(UserContext);
    const pathname = usePathname(); // Lấy URL hiện tại

    if (pathname.includes('/candidates')) {
        return <>{children}</>;
    }
    return userInfo && hasPermission(userInfo, 'enterpriseDashboard', 'access') ? (
        <div className="mx-auto container max-w-screen-xl">
            <div className="grid grid-cols-5">
                <section className="col-span-5 md:col-span-1 mt-6">
                    <SidebarDashboardEmployer />
                </section>
                <section className="p-2 md:pt-6 md:pl-6 md:pb-6 md:pr-0 col-span-5 md:col-span-4 border-l">
                    {children}
                </section>
            </div>
        </div>
    ) : (
        <NotPermission />
    );
}
