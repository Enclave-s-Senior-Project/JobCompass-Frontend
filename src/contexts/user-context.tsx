'use client';

import { queryKey } from '@/lib/react-query/keys';
import { AuthService } from '@/services/auth.service';
import { User } from '@/types';
import { useQuery } from '@tanstack/react-query';
import React, { createContext } from 'react';

export const UserContext = createContext<{ userInfo: User | null }>({
    userInfo: null,
});

export function UserProvider({ children }: { children: React.ReactNode }) {
    const { data: userInfo } = useQuery({
        queryKey: [queryKey.me],
        queryFn: async () => {
            const data = await AuthService.getMe();
            localStorage.setItem('user', JSON.stringify(data.value));
            return data.value;
        },
        staleTime: 1000 * 60, // 1 minute
        retry: 2,
        enabled: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('logged') ?? 'false') : false,
        refetchInterval: 1000 * 60 * 5, // 5 minutes,
    });

    return <UserContext.Provider value={{ userInfo: userInfo as User | null }}>{children}</UserContext.Provider>;
}
