'use client';
import { queryKey } from '@/lib/react-query/keys';
import { EnterpriseService } from '@/services/enterprises.service';
import { Enterprise } from '@/types';
import { useQuery } from '@tanstack/react-query';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserContext } from './user-context';

export const EnterpriseContext = createContext<{
    enterpriseInfo: Enterprise | null;
    refetchEnterpriseInfo: () => void;
    deactivateEnterprise: () => void;
}>({
    enterpriseInfo: null,
    refetchEnterpriseInfo: () => {},
    deactivateEnterprise: () => {},
});

export function EnterpriseProvider({ children }: { children: React.ReactNode }) {
    const { userInfo } = useContext(UserContext);
    const [localEnterprise, setLocalEnterprise] = useState<Enterprise | null>(null);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        const storedEnterprise = localStorage.getItem('enterprise') || '';
        setLocalEnterprise(storedEnterprise ? JSON.parse(storedEnterprise) : null);
        setIsHydrated(true);
    }, []);

    const { data: fetchedEnterprise, refetch: refetchEnterpriseInfo } = useQuery({
        queryKey: [queryKey.enterprise],
        queryFn: async () => {
            const data = await EnterpriseService.getEnterprise();
            localStorage.setItem('enterprise', JSON.stringify(data));
            if (data) {
                setLocalEnterprise(data);
            }
            return data;
        },
        staleTime: 1000 * 60 * 5,
        retry: 2,
        enabled: isHydrated && !!userInfo,
    });

    const deactivateEnterprise = () => {
        localStorage.removeItem('enterprise');
        setLocalEnterprise(null);
    };

    if (!isHydrated) return null; // or a loading spinner

    return (
        <EnterpriseContext.Provider
            value={{
                enterpriseInfo: fetchedEnterprise ?? localEnterprise,
                deactivateEnterprise,
                refetchEnterpriseInfo,
            }}
        >
            {children}
        </EnterpriseContext.Provider>
    );
}
