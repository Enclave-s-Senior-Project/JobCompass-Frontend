'use client';

import { useContext, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { setLoginCookie, storeTokenInfo } from '@/lib/auth';
import { UserContext } from '@/contexts';
import { CompassLoadingQuick } from '@/components/custom-ui/loading';
import { toast } from '@/lib/toast';

const CallbackPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { refreshMe } = useContext(UserContext);

    useEffect(() => {
        const tokenType = searchParams.get('tokenType');
        const accessToken = searchParams.get('accessToken');
        const accessTokenExpires = Number(searchParams.get('accessTokenExpires'));

        if (!JSON.parse(sessionStorage.getItem('onLoginOauth2') || 'false')) {
            router.back();
        }

        if (tokenType && accessToken && accessTokenExpires) {
            sessionStorage.removeItem('onLoginOauth2'); // remove after checking
            storeTokenInfo(accessToken, tokenType, accessTokenExpires);
            setLoginCookie();

            refreshMe();

            toast.success('Login successful');
            router.push('/');
        } else {
            router.push('/sign-in');
        }
    }, [router, searchParams]);

    return <CompassLoadingQuick />;
};

export default CallbackPage;
