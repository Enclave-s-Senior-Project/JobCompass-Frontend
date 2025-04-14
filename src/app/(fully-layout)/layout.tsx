'use client';

import { FooterSection } from '@/components/custom-ui/footer-section';
import { HeaderSection } from '@/components/custom-ui/header-section';
import { UserContext } from '@/contexts';
import { User } from '@/types';
import Link from 'next/link';
import React, { useContext } from 'react';

const requiredFields: (keyof User)[] = [
    'fullName',
    'introduction',
    'gender',
    'education',
    'nationality',
    'dateOfBirth',
    'maritalStatus',
    'experience',
    'industry',
    'majority',
];

const checkNeedUpdated = (user: User) => {
    for (const field of requiredFields) {
        const value = user[field];

        if (
            value === undefined ||
            value === null ||
            (typeof value === 'string' && value.trim() === '') ||
            (field === 'industry' && (!user.industry?.categoryId || !user.industry?.categoryName)) ||
            (field === 'majority' && (!user.majority?.categoryId || !user.majority?.categoryName))
        ) {
            return true;
        }
    }

    return false;
};

export default function Layout({ children }: { children: React.ReactNode }) {
    const { userInfo } = useContext(UserContext);
    const needUpdate = userInfo && checkNeedUpdated(userInfo);

    return (
        <div className="flex flex-col min-h-dvh">
            {needUpdate && (
                <div className="py-2 w-full bg-warning-100 flex items-center justify-center hover:underline">
                    <Link href="/candidate-dashboard/settings/personal-profile" className="text-sm">
                        To enjoy all features and get the best experience, please update your missing information. It
                        only takes a minute!
                    </Link>
                    &nbsp;
                    <Link href="/candidate-dashboard/settings/personal-profile" className="text-primary-500 text-sm">
                        Update now
                    </Link>
                </div>
            )}
            <HeaderSection />
            <main className="flex-1">{children}</main>
            <FooterSection />
        </div>
    );
}
