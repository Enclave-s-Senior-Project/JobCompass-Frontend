'use client';

import { LuArrowRight } from 'react-icons/lu';
import React, { useActionState, useEffect } from 'react';
import { forgetPasswordSubmit } from '@/lib/action';
import { ButtonOptionsSignIn } from '@/components/custom-ui/button-options-sign-in';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { successKeyMessage } from '@/lib/message-keys';

export function FormForgetPassword() {
    const router = useRouter();
    const [state, onSubmit, isPending] = useActionState(forgetPasswordSubmit, {
        email: '',
        errors: {},
        success: false,
    });

    useEffect(() => {
        if (state?.success) {
            toast.success(successKeyMessage.FORGET_PASSWORD);
            router.push('/sign-in');
        }
    }, [state?.success]);

    return (
        <form className="sign-up-form flex flex-col gap-y-8" action={onSubmit} autoComplete="forget-password">
            <div className="relative">
                <Input
                    defaultValue={state.email}
                    name="email"
                    placeholder="Email address"
                    type="text"
                    className={clsx(
                        'h-12 rounded-sm',
                        state.errors?.email
                            ? 'border-2 border-danger ring-danger'
                            : 'focus-visible:border-primary focus-visible:ring-primary'
                    )}
                />
                <p className="absolute top-full bottom-0 line-clamp-1 text-red-500 text-[12px] font-medium mb-1 min-h-5">
                    {state.errors?.email && state.errors.email[0]}
                </p>
            </div>
            <Button
                type="submit"
                className="group h-14 rounded-sm text-base [&_svg]:size-6 font-semibold"
                isPending={isPending}
            >
                Reset Password <LuArrowRight className="group-hover:translate-x-2 transition-all" />
            </Button>
            <div className="space-y-4">
                <p className="text-center text-sm text-gray-500">or</p>
                <ButtonOptionsSignIn />
            </div>
        </form>
    );
}
