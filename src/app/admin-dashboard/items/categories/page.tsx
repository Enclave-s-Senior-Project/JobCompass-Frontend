'use client';

import { ListCategories } from '@/components/custom-ui/local/admin-dashboard/categories/list-categories';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function CategoryManagementPage() {
    const search = useSearchParams();
    const page = Number(search.get('page')) || 1;
    const take = 20;
    const order = 'DESC';
    return (
        <div>
            <ListCategories params={{ page, take, order }} />
        </div>
    );
}
