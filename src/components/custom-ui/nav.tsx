'use client';

import { UserContext } from '@/contexts';
import { hasPermission } from '@/lib/auth';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';

type NavigatePageType = {
    href: string;
    label: string;
    role: 'enterprise' | 'admin' | 'all';
};

const commonNavigatePages: NavigatePageType[] = [
    {
        href: '/',
        label: 'Home',
        role: 'all',
    },
    {
        href: '/find-jobs',
        label: 'Find Job',
        role: 'all',
    },
    {
        href: '/find-candidates',
        label: 'Candidates',
        role: 'enterprise',
    },
    {
        href: '/enterprises',
        label: 'Employers',
        role: 'all',
    },
    {
        href: '/pricing-plans',
        label: 'Pricing Plans',
        role: 'enterprise',
    },
    {
        href: '/customer-supports',
        label: 'Customer Supports',
        role: 'all',
    },
    {
        href: '/terms-of-service',
        label: 'Terms of Service',
        role: 'all',
    },
    {
        href: '/admin-dashboard',
        label: 'Admin Dashboard',
        role: 'admin',
    },
];

function NavLink({ href, label, isActive }: { href: string; label: string; isActive: boolean }) {
    return (
        <Link
            href={href}
            className={clsx(
                isActive ? 'font-medium text-primary lg:border-b-primary' : 'font-normal text-gray-600',
                'border-b-2 border-b-transparent py-2 text-base transition-all duration-200 hover:text-primary lg:py-3 lg:text-sm'
            )}
        >
            {label}
        </Link>
    );
}

export function Nav() {
    const pathname = usePathname();
    const { userInfo } = useContext(UserContext);

    return (
        <nav className="nav-section flex flex-col items-center gap-x-6 lg:flex-row">
            {commonNavigatePages.map((page, index) => {
                const hasAccess = page.role === 'all' || hasPermission(userInfo, 'navigationBar', page.role);

                return (
                    hasAccess && (
                        <NavLink key={index} href={page.href} label={page.label} isActive={pathname === page.href} />
                    )
                );
            })}
        </nav>
    );
}
