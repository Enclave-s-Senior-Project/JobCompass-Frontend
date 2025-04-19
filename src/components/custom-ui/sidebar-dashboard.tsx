'use client';

import { UserContext } from '@/contexts/user-context';
import clsx from 'clsx';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import { Separator } from '../ui/separator';

type SidebarItem = {
    href: string;
    label: string;
    icon: React.ReactElement;
    badge?: string;
};

export function SidebarDashboard({ items, title }: { title: string; items: SidebarItem[] }) {
    const pathname = usePathname();
    const { logoutHandle } = useContext(UserContext);

    return (
        <div className="h-full">
            <div className="space-y-3">
                <h6 className="border-l-[3px] border-l-transparent pl-5 text-[12px] font-medium uppercase leading-[18px] text-gray-400">
                    {title}
                </h6>
                <div className="grid grid-cols-2">
                    {items.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                'group relative col-span-1 flex items-center gap-4 border-l-[3px] px-5 py-2 text-sm font-medium transition-all hover:bg-primary-50 hover:text-primary md:col-span-2 [&_svg]:size-6',
                                pathname.startsWith(item.href)
                                    ? 'border-l-primary bg-primary-50 text-primary'
                                    : 'border-l-white bg-white text-gray-500'
                            )}
                        >
                            {item.icon}
                            {item.label}
                            {item.badge && (
                                <span
                                    className={clsx(
                                        'absolute right-5 top-1/2 -translate-y-1/2 rounded-sm px-2 py-1 text-[12px] leading-[18px] text-black transition-all group-hover:bg-white',
                                        pathname === item.href ? 'bg-white' : 'bg-primary-50'
                                    )}
                                >
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    ))}
                </div>
            </div>
            <div className="m-2">
                <Separator />
            </div>
            <button
                className="relative flex w-full items-center gap-4 border-l-[3px] border-l-transparent px-5 py-2 text-sm font-medium text-gray-500 transition-all hover:bg-primary-50 hover:text-primary [&_svg]:size-6"
                onClick={logoutHandle}
            >
                <LogOut />
                Logout
            </button>
        </div>
    );
}
