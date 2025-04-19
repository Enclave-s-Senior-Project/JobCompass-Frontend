import { SidebarDashboardCandidate } from '@/components/custom-ui/sidebar-dashboard-candidate';

export default function CandidateDashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="container mx-auto max-w-screen-xl">
            <div className="grid grid-cols-5">
                <section className="col-span-5 mt-6 md:col-span-1">
                    <SidebarDashboardCandidate />
                </section>
                <section className="col-span-5 border-l p-6 md:col-span-4 md:pb-12 md:pl-12 md:pr-0 md:pt-12">
                    {children}
                </section>
            </div>
        </div>
    );
}
