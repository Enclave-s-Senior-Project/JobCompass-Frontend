'use client';

import { SidebarMenu } from '@/components/ui/sidebar';
import React from 'react';

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/types';
import {
    AlignEndVertical,
    Building2,
    Combine,
    EllipsisVertical,
    House,
    LayoutDashboard,
    UsersRound,
} from 'lucide-react';
import { ButtonHome } from '@/components/custom-ui/button-home';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarItem } from './sidebar-item';

export type PrimarySidebarItem = {
    icon: React.ReactNode;
    title: string;
    href?: string;
    children?: Array<{
        title: string;
        href: string;
    }>;
};

const menuItems: PrimarySidebarItem[] = [
    {
        icon: <House />,
        title: 'Home',
        href: '/',
    },
    {
        icon: <LayoutDashboard />,
        title: 'Dashboard',
        href: '/admin-dashboard',
    },
    {
        icon: <UsersRound />,
        title: 'Candidates',
        href: 'admin-dashboard/candidates',
    },
    {
        icon: <Building2 />,
        title: 'Enterprises',
        children: [
            {
                title: 'Enterprise registration',
                href: '/admin-dashboard/enterprise/registration',
            },
            {
                title: 'Enterprise list',
                href: '/admin-dashboard/enterprise/list',
            },
        ],
    },
    {
        icon: <Combine />,
        title: 'Jobs',
        children: [
            {
                title: 'Expired jobs',
                href: '/admin-dashboard/jobs/expired',
            },
            {
                title: 'Active jobs',
                href: '/admin-dashboard/jobs/active',
            },
        ],
    },
    {
        icon: <AlignEndVertical />,
        title: 'Items',
        children: [
            {
                title: 'Tags',
                href: '/admin-dashboard/tags',
            },
            {
                title: 'Categories',
                href: '/admin-dashboard/categories',
            },
        ],
    },
];

export function AppSidebar({ user, logout }: { user: User; logout: () => void }) {
    return (
        <Sidebar variant="sidebar" collapsible="icon">
            <SidebarHeader className="overflow-hidden">
                <DropdownMenu>
                    <div className="flex w-full flex-nowrap items-center gap-2">
                        <Avatar>
                            <AvatarImage src={user.profileUrl} alt={user.fullName} />
                            <AvatarFallback>{user.fullName}</AvatarFallback>
                        </Avatar>
                        <span className="text-nowrap text-gray-900">{user.fullName}</span>
                        <DropdownMenuTrigger asChild>
                            <button className="ms-auto">
                                <EllipsisVertical />
                            </button>
                        </DropdownMenuTrigger>
                    </div>
                    <DropdownMenuContent side="bottom" align="start">
                        <DropdownMenuItem>
                            <button onClick={logout}>Logout</button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu className="space-y-2">
                    {menuItems.map((item, index) => (
                        <SidebarItem key={index} item={item} />
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <ButtonHome />
            </SidebarFooter>
        </Sidebar>
    );
}
