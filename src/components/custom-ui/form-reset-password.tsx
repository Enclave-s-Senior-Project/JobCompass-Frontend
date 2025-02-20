'use client';
import { Button } from '@/components/ui/button';
import { LuArrowRight } from 'react-icons/lu';
import { useActionState, useEffect, useState } from 'react';
import { InputPassword } from './input-password';
import clsx from 'clsx';
import { resetPassword } from '@/lib/action';
import { useRouter, useSearchParams } from 'next/navigation';
import { routes } from '@/configs/routes';
import { successKeyMessage } from '@/lib/message-keys';
import { toast } from 'react-toastify';

export function FormResetPassword() {
    const search = useSearchParams();
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [state, onSubmit, isPending] = useActionState(resetPassword, {
        email: search.get('email'),
        token: search.get('token'),
        iv: search.get('iv'),
        newPassword: '',
        confirmPassword: '',
        errors: {},
        success: false,
    });

    useEffect(() => {
        if (state.success) {
            router.push(routes.signIn);
            toast.success(successKeyMessage.RESET_PASSWORD);
        }
    }, [state.success, router]);

    return (
        <form className="flex flex-col items-center justify-center px-4 text-center" action={onSubmit}>
            <div className="flex flex-col items-center justify-center">
                <div className="max-w-[536px] space-y-9 text-center px-5 md:px-0">
                    <h1 className="text-[32px] leading-[40px] font-inter font-medium">Reset Password</h1>

                    <p className="font-inter text-base leading-6 text-muted-foreground">
                        Please reset your password to ensure security and continue using the service smoothly. Make sure
                        to choose a strong and memorable password.
                    </p>

                    <div className="space-y-5">
                        <div className="relative">
                            <InputPassword
                                defaultValue={state.newPassword}
                                name="newPassword"
                                type={showPassword ? 'text' : 'password'}
                                hide={!showPassword}
                                setHide={setShowPassword}
                                placeholder="New Password"
                                className={clsx(
                                    'h-16 rounded-sm',
                                    state.errors?.newPassword
                                        ? 'border-2 border-danger ring-danger'
                                        : 'focus-within:border-primary focus-within:ring-1 focus-within:ring-primary focus-visible:ring-primary'
                                )}
                            />
                            <p className="absolute top-full bottom-0 line-clamp-1 text-red-500 text-[12px] font-medium mb-1 min-h-5">
                                {state.errors?.newPassword && state.errors.newPassword[0]}
                            </p>
                        </div>

                        <div className="relative">
                            <InputPassword
                                defaultValue={state.confirmPassword}
                                name="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                hide={!showConfirmPassword}
                                setHide={setShowConfirmPassword}
                                placeholder="Confirm Password"
                                className={clsx(
                                    'h-16 rounded-sm',
                                    state.errors?.confirmPassword
                                        ? 'border-2 border-danger ring-danger'
                                        : 'focus-within:border-primary focus-within:ring-1 focus-within:ring-primary focus-visible:ring-primary'
                                )}
                            />
                            <p className="absolute top-full bottom-0 line-clamp-1 text-red-500 text-[12px] font-medium mb-1 min-h-5">
                                {state.errors?.confirmPassword && state.errors.confirmPassword[0]}
                            </p>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        size="xl"
                        className="group w-full rounded-sm text-base font-semibold"
                        isPending={isPending}
                    >
                        Reset Password <LuArrowRight className="group-hover:translate-x-2 transition-all" />
                    </Button>
                </div>
            </div>
        </form>
    );
}
