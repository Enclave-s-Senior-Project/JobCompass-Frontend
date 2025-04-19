'use client';
import { DialogAddEnterprises } from './dialog-add-enterprise';
import { EnterpriseService } from '@/services/enterprises.service';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/lib/react-query/keys';
import { useEffect, useState } from 'react';
import { DialogUpdateEnterprises } from './dialog-update-register-enterprise';
import { AlertCircle } from 'lucide-react';
import { toast } from '@/lib/toast';
export enum IsActive {
    PENDING = 'PENDING',
    ACTIVE = 'ACTIVE',
    BLOCKED = 'PUBLIC',
    REJECTED = 'REJECTED',
}

export function FormAccountSetting() {
    const { data: temp, refetch } = useQuery({
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
            toast.success('Cancle enteredprise successfully');
            await EnterpriseService.deleteEnterprise(temp.enterpriseId);
            refetch();
        } catch {
            toast.error('Oops! Something went wrong');
        }
    };

    useEffect(() => {
        setCheck(temp === null);
    }, [temp]);
    return (
        <div className="space-y-4">
            <h3 className="font-semibold">Enterprise Registration</h3>
            {check ? (
                <DialogAddEnterprises refetch={refetch} />
            ) : temp?.status === IsActive.ACTIVE ? (
                <p className="inline-block rounded-sm bg-primary px-4 py-2 font-semibold text-white">
                    You are an enterprise.
                </p>
            ) : (
                <div className="space-y-4 text-gray-600">
                    <div className="flex items-center space-x-2 text-yellow-600">
                        <AlertCircle size={20} />
                        <span>Waiting for the administrator to confirm your request.</span>
                    </div>
                    <div className="flex space-x-4">
                        <button
                            className="rounded-lg border border-red-500 px-4 py-2 text-red-500 transition duration-300 ease-in-out hover:bg-red-500 hover:text-white focus:outline-none focus:ring-0"
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
