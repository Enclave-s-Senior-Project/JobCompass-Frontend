import { SidebarDashboard } from '@/components/custom-ui/sidebar-dashboard';
import {
    BellRing,
    Bookmark,
    BriefcaseBusiness,
    Layers,
    Settings,
    CircleUser,
    CirclePlus,
    NotebookText,
    Users,
} from 'lucide-react';

export function SidebarDashboardCandidate(props: { viewType: 'candidate' | 'employee' }) {
    const { viewType } = props;
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

    const sidebarItemsOfEmployee = [
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

    return viewType === 'candidate' ? (
        <SidebarDashboard title="candidate dashboard" items={sidebarItems} />
    ) : (
        <SidebarDashboard title="employee dashboard" items={sidebarItemsOfEmployee} />
    );
}
