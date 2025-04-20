'use client';

import React from 'react';

import { usePathname } from 'next/navigation';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

// Helper function to capitalize words and replace hyphens with spaces
const capitalize = (str: string): string => {
    return str
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export function DynamicBreadcrumb() {
    const pathname = usePathname();

    // Skip empty segments and filter out any falsy values
    const pathSegments = pathname.split('/').filter(Boolean);

    // If there are no path segments (we're on the home page), don't render breadcrumbs
    if (pathSegments.length === 0) {
        return null;
    }

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {/* Always include Home as the first item */}
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>

                {/* Map through path segments to create breadcrumb items */}
                {pathSegments.map((segment, index) => {
                    // Build the href for this segment
                    const href = '/' + pathSegments.slice(0, index + 1).join('/');

                    // Check if this is the last segment (current page)
                    const isLastSegment = index === pathSegments.length - 1;

                    return (
                        <React.Fragment key={segment}>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                {isLastSegment ? (
                                    <BreadcrumbPage>{capitalize(segment)}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink href={href}>{capitalize(segment)}</BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
