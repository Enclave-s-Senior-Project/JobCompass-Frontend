'use client';
import { FormEmailVerify } from '@/components/custom-ui/form-email-verify';
import React, { Suspense } from 'react';

export default function EmailVerify() {
    return (
        <div>
            <div>
                <Suspense fallback={<div>Loading...</div>}>
                    <FormEmailVerify />
                </Suspense>
            </div>
            ;
        </div>
    );
}
