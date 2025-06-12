'use client';

import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { LuArrowRight } from 'react-icons/lu';
import React, { useActionState, useEffect, useId, useState } from 'react';
import { signUpSubmit } from '@/lib/action';
import { Button } from '@/components/ui/button';
import { InputPassword } from '@/components/custom-ui/input-password';
import { ButtonOptionsSignIn } from '@/components/custom-ui/button-options-sign-in';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { routes } from '@/configs/routes';

export function FormSignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const checkboxId = useId();
    const router = useRouter();
    const [state, onSubmit, isPending] = useActionState(signUpSubmit, {
        full_name: '',
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        errors: {},
        success: false,
    });

    useEffect(() => {
        if (state.success && state.email) {
            router.push(`/email-verify?email=${state.email}`);
        }
    }, [state.success, state.errors, state.email, router]);
    return (
        <form className="sign-up-form flex flex-col space-y-8" action={onSubmit} autoComplete="sign-up">
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="mb-4 text-[32px] font-medium leading-10">Create account</h5>
                    <p className="inline text-gray-600">Already have account?</p>&nbsp;
                    <Link href={routes.signIn} className="font-medium text-primary">
                        Log in
                    </Link>
                </div>
            </div>
            <div className="space-y-5">
                <div className="flex items-center gap-5">
                    <div className="relative flex flex-1 flex-col">
                        <Input
                            defaultValue={state.full_name}
                            color="danger"
                            name="full_name"
                            placeholder="Full name"
                            type="text"
                            className={clsx(
                                'h-12 rounded-sm',
                                state.errors?.full_name
                                    ? 'border-2 border-danger ring-danger'
                                    : 'focus-visible:border-primary focus-visible:ring-primary'
                            )}
                        />
                        <p className="absolute top-full mb-1 line-clamp-1 min-h-5 text-[12px] font-medium text-red-500">
                            {state.errors?.full_name && state.errors.full_name[0]}
                        </p>
                    </div>

                    <div className="relative flex flex-1 flex-col">
                        <Input
                            defaultValue={state.username}
                            name="username"
                            placeholder="Username"
                            type="text"
                            className={clsx(
                                'h-12 rounded-sm',
                                state.errors?.username
                                    ? 'border-2 border-danger ring-danger'
                                    : 'focus-visible:border-primary focus-visible:ring-primary'
                            )}
                        />
                        <p className="absolute bottom-0 top-full mb-1 line-clamp-1 min-h-5 text-[12px] font-medium text-red-500">
                            {state.errors?.username && state.errors.username[0]}
                        </p>
                    </div>
                </div>
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
                    <p className="absolute bottom-0 top-full mb-1 line-clamp-1 min-h-5 text-[12px] font-medium text-red-500">
                        {state.errors?.email && state.errors.email[0]}
                    </p>
                </div>
                <div className="relative">
                    <InputPassword
                        defaultValue={state.password}
                        name="password"
                        placeholder="Password"
                        type="text"
                        hide={!showPassword}
                        setHide={setShowPassword}
                        className={clsx(
                            'h-12 rounded-sm',
                            state.errors?.password
                                ? 'border-2 border-danger ring-danger'
                                : 'focus-within:border-primary focus-within:ring-1 focus-within:ring-primary focus-visible:ring-primary'
                        )}
                    />
                    <p className="absolute bottom-0 top-full mb-1 line-clamp-1 min-h-5 text-[12px] font-medium text-red-500">
                        {state.errors?.password && state.errors.password[0]}
                    </p>
                </div>
                <div className="relative">
                    <InputPassword
                        defaultValue={state.confirmPassword}
                        name="confirmPassword"
                        placeholder="Confirm password"
                        type="text"
                        hide={!showConfirmPassword}
                        setHide={setShowConfirmPassword}
                        className={clsx(
                            'h-12 rounded-sm',
                            state.errors?.confirmPassword
                                ? 'border-2 border-danger ring-danger'
                                : 'focus-within:border-primary focus-within:ring-1 focus-within:ring-primary focus-visible:ring-primary'
                        )}
                    />
                    <p className="absolute bottom-0 top-full mb-1 line-clamp-1 min-h-5 text-[12px] font-medium text-red-500">
                        {state.errors?.confirmPassword && state.errors.confirmPassword[0]}
                    </p>
                </div>
            </div>
            <div className="flex items-center">
                <div className="flex items-center gap-[10px] text-gray-500">
                    <Checkbox
                        name="remember"
                        id={checkboxId}
                        className="size-5 border-primary-200 shadow-none"
                        required
                    />
                    <label htmlFor={checkboxId} className="cursor-pointer select-none text-sm">
                        I&#39;ve read and agree with your
                    </label>
                </div>
                &nbsp;
                <Link href="/terms-and-services" className="text-sm font-medium text-primary hover:underline">
                    Terms of Services
                </Link>
            </div>
            <Button type="submit" size="xl" className="group rounded-sm text-base font-semibold" isPending={isPending}>
                Create account <LuArrowRight className="transition-all group-hover:translate-x-2" />
            </Button>
            <div className="space-y-4">
                <p className="line-clamp-1 text-center text-sm text-gray-500">or</p>
                <ButtonOptionsSignIn />
            </div>
        </form>
    );
}
