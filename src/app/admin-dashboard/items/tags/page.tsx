'use client';

import { ListTags } from '@/components/custom-ui/local/admin-dashboard/tags/list-tags';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function TagManagementPage() {
    const searchParams = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;
    const take = Number(searchParams.get('take')) || 20;
    const options = searchParams.get('options') || '';

    return (
        <div>
            <ListTags params={{ page, take, options }} />
        </div>
    );
}
