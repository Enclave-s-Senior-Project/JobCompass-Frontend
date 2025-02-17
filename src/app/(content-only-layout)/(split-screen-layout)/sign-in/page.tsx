import React from 'react';
import { FormSignIn } from '@/components/custom-ui/form-sign-in';
import Link from 'next/link';
import { routes } from '@/configs/routes';

export default function SignIn() {
    return (
        <div className="space-y-8">
            <div>
                <h5 className="mb-4 text-[32px] leading-10 font-medium">Sign in</h5>
                <p className="inline text-gray-600">Don&#39;t have account</p>&nbsp;
                <Link href={routes.signUp} className="text-primary font-medium">
                    Create account
                </Link>
            </div>
            <FormSignIn />
        </div>
    );
}
