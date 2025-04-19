'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type SubPage = {
    href: string;
    icon: React.ReactElement;
    title: string;
};

export function NavigationSettingProfileBar({
    subPages = [],
    matchExactPage = true,
}: {
    subPages: SubPage[];
    matchExactPage?: boolean;
}) {
    const pathname = usePathname();
    return (
        <div className="mt-4 flex flex-wrap items-center gap-3 border-b">
            {subPages.map((sub) => (
                <Link
                    key={sub.href}
                    href={sub.href}
                    className={clsx(
                        'flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-medium transition-all [&_svg]:size-6',
                        (matchExactPage ? pathname === sub.href : pathname.startsWith(sub.href))
                            ? 'border-b-primary-500 text-primary'
                            : 'border-b-transparent text-gray-500'
                    )}
                >
                    {sub.icon}&nbsp;{sub.title}
                </Link>
            ))}
        </div>
    );
}
