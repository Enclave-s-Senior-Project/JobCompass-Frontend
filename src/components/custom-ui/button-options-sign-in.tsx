'use client';

import { Button } from '../ui/button';
import { FaFacebookF } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';

export function ButtonOptionsSignIn({ redirect }: { redirect?: string }) {
    const handleFacebookLogin = () => {
        if (redirect) localStorage.setItem('redirectAfterLogin', redirect);
        window.open(`${process.env.NEXT_PUBLIC_APP_SERVER_URL}/auth/facebook`, '_self');
    };

    const handleGoogleSignIn = () => {
        if (redirect) localStorage.setItem('redirectAfterLogin', redirect);
        window.open(`${process.env.NEXT_PUBLIC_APP_SERVER_URL}/auth/google`, '_self');
    };

    return (
        <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2">
            <Button
                className="h-11 flex-1 rounded-sm"
                variant="outline"
                size="md"
                type="button"
                onClick={handleFacebookLogin}
            >
                <FaFacebookF className="text-primary" /> Sign in with Facebook
            </Button>
            <Button
                className="h-11 flex-1 rounded-sm"
                variant="outline"
                size="md"
                type="button"
                onClick={handleGoogleSignIn}
            >
                <FcGoogle /> Sign in with Google
            </Button>
        </div>
    );
}
