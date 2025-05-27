'use client';
import { ListCandidateDashboard } from '@/components/custom-ui/list-candidate-dashboard';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function CandidateDashboard() {
    const searchParams = useSearchParams();

    const page = Number(searchParams.get('page')) || 1;
    const take = Number(searchParams.get('take')) || 10;
    const options = searchParams.get('options') || '';
    return (
        <div>
            <ListCandidateDashboard params={{ page, take, options }} />
        </div>
    );
}
