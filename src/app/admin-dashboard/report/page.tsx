'use client';

import { ReportList } from '@/components/custom-ui/local/admin-dashboard/reports/report-list';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function ReportManagementPage() {
    const search = useSearchParams();

    const status = search.get('status') || undefined;
    const take = Number(search.get('take')) || 10;
    const page = Number(search.get('page')) || 1;

    return (
        <div>
            <ReportList params={{ status, take, page }} />
        </div>
    );
}
