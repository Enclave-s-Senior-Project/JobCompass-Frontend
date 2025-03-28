import { SidebarDashboardCandidate } from '@/components/custom-ui/sidebar-dashboard-candidate';

export default function CandidateDashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="mx-auto container max-w-screen-xl">
            <div className="grid grid-cols-5">
                <section className="col-span-5 md:col-span-1 mt-6">
                    <SidebarDashboardCandidate />
                </section>
                <section className="p-6 md:pt-12 md:pl-12 md:pb-12 md:pr-0 col-span-5 md:col-span-4 border-l">{children}</section>
            </div>
        </div>
    );
}
