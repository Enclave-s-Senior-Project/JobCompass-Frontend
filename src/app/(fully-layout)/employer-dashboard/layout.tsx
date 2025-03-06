'use client';

import { SidebarDashboardEmployer } from '@/components/custom-ui/sidebar-dashboard-employer';
import { UserContext } from '@/contexts/user-context';
import { hasPermission } from '@/lib/auth';
import { useContext } from 'react';

export default function EmployeeDashboardLayout({ children }: { children: React.ReactNode }) {
    const { userInfo } = useContext(UserContext);
    return userInfo && hasPermission(userInfo, 'enterpriseDashboard', 'access') ? (
        <div className="mx-auto container max-w-screen-xl">
            <div className="grid grid-cols-5">
                <section className="col-span-5 md:col-span-1 mt-6">
                    <SidebarDashboardEmployer />
                </section>
                <section className="col-span-5 md:col-span-4 border-l">{children}</section>
            </div>
        </div>
    ) : (
        <div>Not found</div>
    );
}
