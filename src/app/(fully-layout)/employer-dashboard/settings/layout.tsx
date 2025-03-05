import { NavigationSettingProfileBar } from '@/components/custom-ui/horizontial-navigation-bar';
import { CircleUser, Globe, Settings, UserRound } from 'lucide-react';
import React from 'react';

const subPages = [
    { href: '/employer-dashboard/settings/company-info', icon: <UserRound />, title: 'Company Info' },
    { href: '/employer-dashboard/settings/founding-info', icon: <CircleUser />, title: 'Founding Info' },
    { href: '/employer-dashboard/settings/social-media-profile', icon: <Globe />, title: 'Social Media Profile' },
    { href: '/employer-dashboard/settings/account', icon: <Settings />, title: 'Account Settings' },
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
