'use client';

import { FormResetPassword } from '@/components/custom-ui/form-reset-password';
import { Suspense } from 'react';

export default function ResetPassword() {
    return (
        <Suspense fallback={<span>Loading...</span>}>
            <FormResetPassword />
        </Suspense>
    );
}
