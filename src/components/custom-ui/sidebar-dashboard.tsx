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
                <h6 className="pl-5 border-l-[3px] border-l-transparent text-gray-400 text-[12px] leading-[18px] font-medium uppercase">
                    {title}
                </h6>
                <div className="grid grid-cols-2">
                    {items.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                'col-span-1 md:col-span-2 group transition-all relative px-5 py-2 flex items-center border-l-[3px] gap-4 [&_svg]:size-6 text-sm font-medium hover:text-primary hover:bg-primary-50',
                                pathname.startsWith(item.href)
                                    ? 'text-primary border-l-primary bg-primary-50'
                                    : 'text-gray-500 border-l-white bg-white'
                            )}
                        >
                            {item.icon}
                            {item.label}
                            {item.badge && (
                                <span
                                    className={clsx(
                                        'transition-all absolute top-1/2 -translate-y-1/2 right-5 text-[12px] leading-[18px] rounded-sm px-2 py-1 text-black group-hover:bg-white',
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
                className="transition-all relative px-5 py-2 w-full flex items-center border-l-[3px] border-l-transparent gap-4 [&_svg]:size-6 text-sm font-medium text-gray-500 hover:text-primary hover:bg-primary-50"
                onClick={logoutHandle}
            >
                <LogOut />
                Logout
            </button>
        </div>
    );
}
