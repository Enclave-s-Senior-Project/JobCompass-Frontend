'use client';

import { queryKey } from '@/lib/react-query/keys';
import { AuthService } from '@/services/auth.service';
import { User } from '@/types';
import { useQuery } from '@tanstack/react-query';
import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext<{ userInfo: User | null }>({
    userInfo: null,
});

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [localUser, setLocalUser] = useState<User | null>(null);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        setLocalUser(storedUser ? JSON.parse(storedUser) : null);
        setIsHydrated(true);
    }, []);

    const { data: fetchedUser } = useQuery({
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
    });

    if (!isHydrated) return null; // or loading spinner

    return <UserContext.Provider value={{ userInfo: fetchedUser ?? localUser }}>{children}</UserContext.Provider>;
}
