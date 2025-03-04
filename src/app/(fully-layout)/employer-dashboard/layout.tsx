import { SidebarDashboardEmployee } from '@/components/custom-ui/sidebar-dashboard-employee';

export default function EmployeeDashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="mx-auto container max-w-screen-xl">
            <div className="grid grid-cols-5">
                <section className="col-span-5 md:col-span-1 mt-6">
                    <SidebarDashboardEmployee />
                </section>
                <section className="col-span-5 md:col-span-4 border-l">{children}</section>
            </div>
        </div>
    );
}
