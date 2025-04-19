'use client';

import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem } from '@/components/ui/sidebar';
import React, { useContext } from 'react';

import { ChevronsUpDown } from 'lucide-react';
import Link from 'next/link';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { SidebarContext } from '@/app/admin-dashboard/layout';
import { PrimarySidebarItem } from './app-sidebar';

export function SidebarItem({ item }: { item: PrimarySidebarItem }) {
    const { setOpen } = useContext(SidebarContext);

    if (item.children) {
        return (
            <Collapsible>
                <SidebarMenuItem className="mx-2">
                    <CollapsibleTrigger asChild onClick={() => setOpen(true)}>
                        <SidebarMenuButton className="flex items-center gap-2 py-6 [&_svg]:size-6">
                            {item.icon}
                            <span>{item.title}</span>
                            <ChevronsUpDown className="ms-auto size-4" />
                        </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <SidebarMenuSub>
                            {item.children.map((subItem, subIndex) => (
                                <SidebarMenuSubItem key={subIndex}>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            href={subItem.href}
                                            className="flex items-center gap-2 py-6 [&_svg]:size-6"
                                        >
                                            <span className="text-gray-900">{subItem.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuSubItem>
                            ))}
                        </SidebarMenuSub>
                    </CollapsibleContent>
                </SidebarMenuItem>
            </Collapsible>
        );
    }

    return (
        <SidebarMenuItem className="mx-2">
            <SidebarMenuButton asChild>
                <Link href={item.href || '/'} className="flex items-center gap-2 py-6 [&_svg]:size-6">
                    {item.icon}
                    <span>{item.title}</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}
