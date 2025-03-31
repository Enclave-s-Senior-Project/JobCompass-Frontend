'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigatePages = [
    {
        href: '/',
        label: 'Home',
    },
    {
        href: '/find-jobs',
        label: 'Find Job',
    },
    {
        href: '/enterprises',
        label: 'Employers',
    },
    {
        href: '/find-candidates',
        label: 'Candidates',
    },
    {
        href: '/pricing-plans',
        label: 'Pricing Plans',
    },
    {
        href: '/customer-supports',
        label: 'Customer Supports',
    },
];

export function Nav() {
    const pathname = usePathname();

    return (
        <nav className="nav-section flex flex-col lg:flex-row items-center gap-x-6">
            {navigatePages.map((page, index) => (
                <Link
                    key={index}
                    href={page.href}
                    className={clsx(
                        pathname === page.href
                            ? 'text-primary font-medium lg:border-b-primary'
                            : 'text-gray-600 font-normal',
                        'transition-all duration-200 py-2 lg:py-3 border-b-2 border-b-transparent text-base lg:text-sm hover:text-primary'
                    )}
                >
                    {page.label}
                </Link>
            ))}
        </nav>
    );
}
