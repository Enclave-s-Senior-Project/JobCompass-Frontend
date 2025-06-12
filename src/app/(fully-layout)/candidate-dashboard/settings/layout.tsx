import { NavigationSettingProfileBar } from '@/components/custom-ui/horizontial-navigation-bar';
import { CircleUser, Globe, NotebookPen, Settings, UserRound } from 'lucide-react';
import React from 'react';

const subPages = [
    { href: '/candidate-dashboard/settings/personal-profile', icon: <UserRound />, title: 'Personal' },
    { href: '/candidate-dashboard/settings/candidate-profile', icon: <CircleUser />, title: 'Profile' },
    { href: '/candidate-dashboard/settings/cv-resume', icon: <NotebookPen />, title: 'CV/Resume' },
    { href: '/candidate-dashboard/settings/social-links', icon: <Globe />, title: 'Social Links' },
    { href: '/candidate-dashboard/settings/account', icon: <Settings />, title: 'Account Settings' },
];

export default function SettingProfileLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="space-y-8">
            <h5 className="text-lg font-medium text-gray-900">Settings</h5>
            <NavigationSettingProfileBar subPages={subPages} matchExactPage={true} />
            {children}
        </div>
    );
}
