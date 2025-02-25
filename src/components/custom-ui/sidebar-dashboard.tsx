'use client';

import clsx from 'clsx';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type SidebarItem = {
    href: string;
    label: string;
    icon: React.ReactElement;
    badge?: string;
};

export function SidebarDashboard({ items, title }: { title: string; items: SidebarItem[] }) {
    const pathname = usePathname();

    return (
        <div className="h-full flex flex-col justify-between">
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
            <button className="transition-all relative px-5 py-2 w-full flex items-center border-l-[3px] border-l-transparent gap-4 [&_svg]:size-6 text-sm font-medium text-gray-500 hover:text-primary hover:bg-primary-50">
                <LogOut />
                Logout
            </button>
        </div>
    );
}
