'use client';

import { FooterSection } from '@/components/custom-ui/footer-section';
import { HeaderSection } from '@/components/custom-ui/header-section';
import { ChatbotPopup } from '@/components/custom-ui/local/chatbox-popup';
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
        <div className="flex min-h-dvh flex-col">
            {needUpdate && (
                <div className="flex w-full items-center justify-center bg-warning-100 py-2 hover:underline">
                    <Link href="/candidate-dashboard/settings/personal-profile" className="text-sm">
                        To enjoy all features and get the best experience, please update your missing information. It
                        only takes a minute!
                    </Link>
                    &nbsp;
                    <Link href="/candidate-dashboard/settings/personal-profile" className="text-sm text-primary-500">
                        Update now
                    </Link>
                </div>
            )}
            <HeaderSection />
            <main className="flex-1">{children}</main>
            <FooterSection />
            {userInfo && (
                <div className="fixed bottom-5 right-0 z-50 p-4">
                    <ChatbotPopup />
                </div>
            )}
        </div>
    );
}
