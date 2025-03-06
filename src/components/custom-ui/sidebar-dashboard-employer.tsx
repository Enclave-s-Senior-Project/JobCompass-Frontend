import { SidebarDashboard } from '@/components/custom-ui/sidebar-dashboard';
import { Bookmark, BriefcaseBusiness, Layers, Settings, CircleUser, CirclePlus, NotebookText } from 'lucide-react';

export function SidebarDashboardEmployer() {
    const sidebarItems = [
        {
            href: '/employer-dashboard/overview',
            label: 'Overview',
            icon: <Layers />,
        },
        {
            href: '/employer-dashboard/employers-profile',
            label: 'Employers Profile',
            icon: <CircleUser />,
        },
        {
            href: '/employer-dashboard/post-job',
            label: 'Post a Job',
            icon: <CirclePlus />,
        },
        {
            href: '/employer-dashboard/my-jobs',
            label: 'My Jobs',
            icon: <BriefcaseBusiness />,
        },
        {
            href: '/employer-dashboard/saved-candidates',
            label: 'Saved Candidates',
            icon: <Bookmark />,
        },
        {
            href: '/employer-dashboard/plans-billing',
            label: 'Plans & Billing',
            icon: <NotebookText />,
        },
        {
            href: '/employer-dashboard/settings',
            label: 'Settings',
            icon: <Settings />,
        },
    ];

    return <SidebarDashboard title="Employer dashboard" items={sidebarItems} />;
}
