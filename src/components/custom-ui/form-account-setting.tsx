'use client';
import { DialogAddEnterprises } from './dialog-add-enterprise';
import { EnterpriseService } from '@/services/enterprises.service';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/lib/react-query/keys';
import { useState } from 'react';
import { DialogUpdateEnterprises } from './dialog-update-register-enterprise';
import { handleErrorToast } from '@/lib/utils';

export function FormAccountSetting() {
    const [check, setCheck] = useState(false);
    const { data: temp, isLoading } = useQuery({
        queryKey: [queryKey.checkEnterprise],
        queryFn: async () => {
            try {
                const payload = await EnterpriseService.checkEnterprise();
                if (payload.code >= 400) {
                    setCheck(true);
                }
                return payload?.value ?? null;
            } catch (error: any) {
                handleErrorToast(error);
            }
        },
    });
    if (isLoading) return <p>Loading...</p>;
    return (
        <div className="space-y-8">
            <h1>Contact Info</h1>
            {/* {check ? <DialogAddEnterprises /> : <DialogUpdateEnterprises enterprises={temp} />} */}
        </div>
    );
}
