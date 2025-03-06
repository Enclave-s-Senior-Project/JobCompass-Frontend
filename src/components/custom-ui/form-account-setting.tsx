'use client';
import { DialogAddEnterprises } from './dialog-add-enterprise';
import { EnterpriseService } from '@/services/enterprises.service';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/lib/react-query/keys';
import { useEffect, useState } from 'react';
import { DialogUpdateEnterprises } from './dialog-update-register-enterprise';
import { AlertCircle } from 'lucide-react';
// import { Button } from '../ui/button';

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
    const [check, setCheck] = useState(false);
    const handleCancleEnterprise = async () => {
        if (!temp || !temp.enterpriseId) {
            return;
        }
        try {
            await EnterpriseService.deleteEnterprise(temp.enterpriseId);
            refetch();
        } catch (error) {
            console.error('Error delete enterprise:', error);
        }
    };

    useEffect(() => {
        setCheck(temp === null);
    }, [temp]);

    return (
        <div className="space-y-8">
            <h1>Contact Info</h1>
            {check ? (
                <DialogAddEnterprises refetch={refetch} />
            ) : (
                <div className="space-y-4 text-gray-600">
                    <div className="flex items-center space-x-2 text-yellow-600">
                        <AlertCircle size={20} />
                        <span>Waiting for the administrator to confirm your request.</span>
                    </div>
                    <div className="flex space-x-4">
                        <button
                            className="border border-red-500 text-red-500 rounded-lg px-4 py-2 transition duration-300 ease-in-out hover:bg-red-500 hover:text-white focus:ring-0 focus:outline-none"
                            onClick={handleCancleEnterprise}
                        >
                            Cancel Register
                        </button>

                        <DialogUpdateEnterprises enterprises={temp ?? null} />
                    </div>
                </div>
            )}
        </div>
    );
}
