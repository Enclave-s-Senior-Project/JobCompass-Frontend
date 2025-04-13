'use client';

import ComingSoon from '@/components/ui/coming-soon';
import { MessagePayment } from '@/lib/common-enum';
import { successKeyMessage } from '@/lib/message-keys';
import { toast } from '@/lib/toast';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function OverviewPage() {
    const searchParams = useSearchParams();

    useEffect(() => {
        const message = searchParams.get('message');
        if (message === MessagePayment.SUCCESSFUL_PAYMENT) {
            toast.success(successKeyMessage.SUCCESSFUL_PAYMENT);
        }

        if (message === MessagePayment.UNSUCCESSFUL_PAYMENT) {
            toast.warning(successKeyMessage.UNSUCCESSFUL_PAYMENT);
        }
    }, []);
    return (
        <div className="container mx-auto py-8 px-4">
            <ComingSoon />
        </div>
    );
}
