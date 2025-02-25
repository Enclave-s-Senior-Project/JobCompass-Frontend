import { SidebarDashboard } from '@/components/custom-ui/sidebar-dashboard';
import { BellRing, Bookmark, BriefcaseBusiness, Layers, Settings } from 'lucide-react';

export function SidebarDashboardCandidate() {
    const sidebarItems = [
        {
            href: '/overview',
            label: 'Overview',
            icon: <Layers />,
        },
        {
            href: '/applied-jobs',
            label: 'Applied Jobs',
            icon: <BriefcaseBusiness />,
        },
        {
            href: '/candidate-dashboard/favorite-jobs',
            label: 'Favorite Jobs',
            icon: <Bookmark />,
        },
        {
            href: '/job-alerts',
            label: 'Job Alert',
            icon: <BellRing />,
            badge: '09',
        },
        {
            href: '/candidate-dashboard/settings',
            label: 'Settings',
            icon: <Settings />,
        },
    ];

    return <SidebarDashboard title="candidate dashboard" items={sidebarItems} />;
}
