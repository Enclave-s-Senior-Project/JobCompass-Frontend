import { SidebarDashboard } from '@/components/custom-ui/sidebar-dashboard';
import {
    Bookmark,
    BriefcaseBusiness,
    Layers,
    Settings,
    CircleUser,
    CirclePlus,
    NotebookText,
    Users,
} from 'lucide-react';

export function SidebarDashboardEmployee() {
    const sidebarItems = [
        {
            href: '/overview',
            label: 'Overview',
            icon: <Layers />,
        },
        {
            href: '/applied-jobs',
            label: 'Employers Profile',
            icon: <CircleUser />,
        },
        {
            href: '/candidate-dashboard/favorite-jobs',
            label: 'Post a Job',
            icon: <CirclePlus />,
        },
        {
            href: '/job-alerts',
            label: 'My Jobs',
            icon: <BriefcaseBusiness />,
        },
        {
            href: '/settings',
            label: 'Saved Candidate',
            icon: <Bookmark />,
        },
        {
            href: '/settings',
            label: 'Plans & Billing',
            icon: <NotebookText />,
        },
        {
            href: '/settings',
            label: 'All Companies',
            icon: <Users />,
        },
        {
            href: '/settings',
            label: 'Saved Candidate',
            icon: <Settings />,
        },
    ];

    return <SidebarDashboard title="candidate dashboard" items={sidebarItems} />;
}
