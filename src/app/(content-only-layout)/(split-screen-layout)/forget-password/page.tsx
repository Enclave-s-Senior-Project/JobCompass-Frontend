import Link from 'next/link';
import React from 'react';
import { FormForgetPassword } from '@/components/custom-ui/form-forget-password';
import { routes } from '@/configs/routes';

export default function Page() {
    return (
        <div className="space-y-8">
            <div>
                <h5 className="mb-4 text-[32px] font-medium leading-10">Forget password</h5>
                <div className="space-y-2">
                    <div>
                        <p className="inline text-gray-600">Go back to</p>&nbsp;
                        <Link href={routes.signIn} className="font-medium text-primary">
                            Log in
                        </Link>
                    </div>
                    <div>
                        <p className="inline text-gray-600">Don&#39;t have account?</p>&nbsp;
                        <Link href={routes.signUp} className="font-medium text-primary">
                            Create account
                        </Link>
                    </div>
                </div>
            </div>
            <FormForgetPassword />
        </div>
    );
}
