'use client';
import { DialogAddEnterprises } from './dialog-add-enterprise';
import { EnterpriseService } from '@/services/enterprises.service';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/lib/react-query/keys';
import { useState } from 'react';
import { DialogUpdateEnterprises } from './dialog-update-register-enterprise';
import { AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';

export function FormAccountSetting() {
    const [check, setCheck] = useState(false);
    const { data: temp } = useQuery({
        queryKey: [queryKey.checkEnterprise],
        queryFn: async () => {
            try {
                const payload = await EnterpriseService.checkEnterprise();
                return payload?.value ?? null;
            } catch {
                setCheck(true);
                return null;
            }
        },
    });
    return (
        <div className="space-y-8">
            <h1>Contact Info</h1>
            {check ? (
                <DialogAddEnterprises />
            ) : (
                <div className="space-y-4 text-gray-600">
                    <div className="flex items-center space-x-2 text-yellow-600">
                        <AlertCircle size={20} />
                        <span>Waiting for the administrator to confirm your request.</span>
                    </div>
                    <div className="flex space-x-4">
                        <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-100">
                            Cancel Register
                        </Button>
                        <DialogUpdateEnterprises enterprises={temp ?? null} />
                    </div>
                </div>
            )}
        </div>
    );
}
