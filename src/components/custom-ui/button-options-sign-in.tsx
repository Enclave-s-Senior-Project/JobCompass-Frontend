'use client';

import { Button } from '../ui/button';
import { FaFacebookF } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';

export function ButtonOptionsSignIn() {
    const handleFacebookLogin = () => {
        sessionStorage.setItem('onLoginOauth2', 'true');
        window.open(`${process.env.NEXT_PUBLIC_APP_SERVER_URL}/auth/facebook`, '_self');
    };

    const handleGoogleSignIn = () => {
        sessionStorage.setItem('onLoginOauth2', 'true');
        window.open(`${process.env.NEXT_PUBLIC_APP_SERVER_URL}/auth/google`, '_self');
    };

    return (
        <div className="flex items-center flex-wrap justify-between gap-x-5 gap-y-2">
            <Button
                className="flex-1 h-11 rounded-sm"
                variant="outline"
                size="md"
                type="button"
                onClick={handleFacebookLogin}
            >
                <FaFacebookF className="text-primary" /> Sign in with Facebook
            </Button>
            <Button
                className="flex-1 h-11 rounded-sm"
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
