import React from 'react';
import { FormSignIn } from '@/components/custom-ui/form-sign-in';
import Link from 'next/link';
import { routes } from '@/configs/routes';

// Define the expected query params
interface SearchParams {
    error_code?: string;
    redirect?: string;
}

// Use the correct type for App Router page components
export default async function SignIn({ searchParams }: { searchParams?: Promise<SearchParams> }) {
    // Resolve the searchParams Promise, default to empty object if undefined
    const params = (await searchParams) ?? {};

    return (
        <div className="space-y-8">
            <div>
                <h5 className="mb-4 text-[32px] leading-10 font-medium">Sign in</h5>
                <p className="inline text-gray-600">Don&apos;t have account</p>
                &nbsp;
                <Link href={routes.signUp} className="text-primary font-medium">
                    Create account
                </Link>
            </div>
            <FormSignIn error_code={params.error_code} redirect={params.redirect} />
        </div>
    );
}
