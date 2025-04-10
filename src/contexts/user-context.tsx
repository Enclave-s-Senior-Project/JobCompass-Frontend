'use client';

import { clearLoginCookie, clearTokenInfo, clearUserAndEnterpriseInfoLocalStorage } from '@/lib/auth';
import { messaging } from '@/lib/firebase';
import { queryKey } from '@/lib/react-query/keys';
import { handleErrorToast } from '@/lib/utils';
import { AuthService } from '@/services/auth.service';
import { User } from '@/types';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getToken } from 'firebase/messaging';
import { useRouter } from 'next/navigation';
import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext<{ userInfo: User | null; refreshMe: () => void; logoutHandle: () => void }>({
    userInfo: null,
    refreshMe: () => {},
    logoutHandle: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const [localUser, setLocalUser] = useState<User | null>(null);
    const [isHydrated, setIsHydrated] = useState(false);
    const queryClient = useQueryClient();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        setLocalUser(storedUser ? JSON.parse(storedUser) : null);
        setIsHydrated(true);
    }, []);

    useEffect(() => {
        const syncToken = async () => {
            const currentToken = await getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_APP_FIREBASE_PAIR_KEY });
            // if (currentToken) {
            //     await fetch('/api/save-fcm-token', {
            //         method: 'POST',
            //         body: JSON.stringify({ token: currentToken }),
            //         headers: { 'Content-Type': 'application/json' },
            //     });
            // }
            console.log({ currentToken });
        };
        if (typeof window !== undefined) syncToken();
    }, []);

    const { data: fetchedUser, refetch: refreshMe } = useQuery({
        queryKey: [queryKey.me],
        queryFn: async () => {
            const data = await AuthService.getMe();
            localStorage.setItem('user', JSON.stringify(data.value));
            if (data.value) {
                setLocalUser(data.value);
            }
            return data.value;
        },
        staleTime: 1000 * 60 * 5,
        retry: 2,
        enabled: isHydrated && JSON.parse(localStorage.getItem('logged') ?? 'false'),
        refetchInterval: 1000 * 60 * 5,
        placeholderData: keepPreviousData,
    });

    const logoutMutation = useMutation({
        mutationFn: AuthService.logout,
        onSuccess: () => {
            clearTokenInfo();

            // clear user info/enterprise info and cookie logged
            setLocalUser(null);
            clearUserAndEnterpriseInfoLocalStorage();
            clearLoginCookie();

            router.replace('/');

            // Clear cache
            queryClient.setQueryData([queryKey.me], null); // Immediately clear cache
        },
        onError: (error) => {
            handleErrorToast(error);
        },
    });

    if (!isHydrated) return null; // or loading spinner

    return (
        <UserContext.Provider
            value={{ userInfo: fetchedUser ?? localUser, refreshMe: refreshMe, logoutHandle: logoutMutation.mutate }}
        >
            {children}
        </UserContext.Provider>
    );
}
