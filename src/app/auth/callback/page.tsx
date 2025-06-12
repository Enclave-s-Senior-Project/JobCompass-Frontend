'use client';

import { useContext, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { setLoginCookie, storeTokenInfo } from '@/lib/auth';
import { UserContext } from '@/contexts';
import { CompassLoadingQuick } from '@/components/custom-ui/loading';
import { toast } from '@/lib/toast';
import { useMutation } from '@tanstack/react-query';
import { AuthService } from '@/services';
import { DetailedRequest } from '@/types';
import { handleErrorToast } from '@/lib/utils';

const CallbackPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { refreshMe } = useContext(UserContext);

    const confirmLoginMutation = useMutation({
        mutationFn: async (data: DetailedRequest.ConfirmOAuth2Login) => AuthService.confirmOAuth2Login(data),
        onSuccess: async (data) => {
            if (data) {
                storeTokenInfo(data?.accessToken as string, data?.tokenType, data?.accessTokenExpires);
                setLoginCookie(data?.refreshTokenExpires);
                refreshMe();
                // get redirect URL from local storage and remove it
                const redirect = localStorage.getItem('redirectAfterLogin');
                localStorage.removeItem('redirectAfterLogin');

                // redirect to the URL or to the home page
                if (redirect) router.push(redirect);
                else router.push('/');
            }
        },
        onError: (error) => {
            console.log(error);
            handleErrorToast(error);
            router.push('/sign-in');
        },
    });

    useEffect(() => {
        const authToken = searchParams.get('authToken')?.toString();
        const iv = searchParams.get('iv')?.toString();
        const provider = searchParams.get('provider')?.toString();

        if (!authToken || !iv || !provider) {
            toast.error('Invalid callback parameters');
            router.push('/sign-in');
            return;
        }

        confirmLoginMutation.mutate({
            authToken: authToken,
            iv: iv,
            provider: provider,
        });
    }, [router, searchParams]);

    return <CompassLoadingQuick />;
};

export default CallbackPage;
