'use client';

import { EnterpriseJobs } from '@/components/custom-ui/enterprise-jobs';
import { NotFound } from '@/components/custom-ui/not-found';
import { useParams } from 'next/navigation';

const EnterpriseJobPage = () => {
    const { enterpriseId } = useParams<{ enterpriseId: string }>();

    if (!enterpriseId) {
        return <NotFound />;
    }

    return (
        <section className="mx-auto max-w-screen-xl">
            <EnterpriseJobs enterpriseId={enterpriseId} limit={5} />
        </section>
    );
};

export default EnterpriseJobPage;
