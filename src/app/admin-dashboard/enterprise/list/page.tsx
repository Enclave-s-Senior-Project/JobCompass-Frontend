'use client';

import { EnterpriseList } from '@/components/custom-ui/local/admin-dashboard/enterprise-management/enterprise-list';
import { useSearchParams } from 'next/navigation';

export default function Page() {
    const search = useSearchParams();

    const take = Number(search.get('take')) || 10;
    const page = Number(search.get('page')) || 1;
    const options = search.get('options') || '';

    return (
        <div>
            <EnterpriseList
                params={{
                    page,
                    options,
                    take,
                }}
            />
        </div>
    );
}
