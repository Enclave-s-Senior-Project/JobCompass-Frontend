'use client';

import { ListEnterpriseRegistration } from '@/components/custom-ui/local/admin-dashboard/enterprise-registration/list-enterprise-registration';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function EnterpriseRegistrationPage() {
    const searchParams = useSearchParams();

    const page = Number(searchParams.get('page')) || 1;
    const take = Number(searchParams.get('take')) || 10;
    const options = searchParams.get('options') || '';

    return (
        <div>
            <ListEnterpriseRegistration params={{ page, take, options }} />
        </div>
    );
}
