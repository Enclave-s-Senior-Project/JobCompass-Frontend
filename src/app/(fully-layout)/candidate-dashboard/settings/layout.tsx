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
        <div className="p-6 md:pt-12 md:pl-12 md:pb-12 md:pr-0 space-y-8">
            <h5 className="text-lg text-gray-900 font-medium">Settings</h5>
            <NavigationSettingProfileBar subPages={subPages} matchExactPage={true} />
            {children}
        </div>
    );
}
