'use client';

import { JobList } from '@/components/custom-ui/local/admin-dashboard/jobs/job-list';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function JobManagementPage() {
    const search = useSearchParams();

    const enterpriseId = search.get('enterpriseId') || undefined;
    const take = Number(search.get('take')) || 10;
    const page = Number(search.get('page')) || 1;
    const name = search.get('name') || '';

    return (
        <div>
            <JobList params={{ enterpriseId, take, page, name }} />
        </div>
    );
}
