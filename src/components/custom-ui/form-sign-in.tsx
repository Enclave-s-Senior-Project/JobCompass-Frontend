'use client';

import Link from 'next/link';
import { Input } from '../ui/input';
import { useActionState, useEffect, useId, useState } from 'react';
import { InputPassword } from '@/components/custom-ui/input-password';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { LuArrowRight } from 'react-icons/lu';
import { signInSubmit } from '@/lib/action';
import { ButtonOptionsSignIn } from '@/components/custom-ui/button-options-sign-in';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import { routes } from '@/configs/routes';

export function FormSignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const [state, onSubmit, isPending] = useActionState(signInSubmit, {
        username: '',
        password: '',
        errors: {},
        success: false,
    });

    const checkboxId = useId();
    useEffect(() => {
        if (state.success) {
            toast.success('Login successful');
            document.cookie = 'login=true';
            router.push('/');
        }
    }, [state.success, state.errors]);
    return (
        <form className="sign-in-form flex flex-col space-y-8" action={onSubmit} autoComplete="sign-in">
            <div className="space-y-5">
                <div className="relative">
                    <Input
                        defaultValue={state.username}
                        name="username"
                        placeholder="Email address"
                        type="text"
                        className={clsx(
                            'h-12 rounded-sm',
                            state.errors?.username
                                ? 'border-2 border-danger ring-danger'
                                : 'focus-visible:border-primary focus-visible:ring-primary'
                        )}
                    />
                    <p className="absolute top-full bottom-0 line-clamp-1 text-red-500 text-[12px] font-medium mb-1 min-h-5">
                        {state.errors?.username && state.errors.username[0]}
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
                                : 'focus-visible:border-primary focus-visible:ring-primary'
                        )}
                    />
                    <p className="absolute top-full bottom-0 line-clamp-1 text-red-500 text-[12px] font-medium mb-1 min-h-5">
                        {state.errors?.password && state.errors.password[0]}
                    </p>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[10px] text-gray-500">
                        <Checkbox name="remember" id={checkboxId} className="size-5 border-primary-200 shadow-none" />
                        <label htmlFor={checkboxId} className="select-none cursor-pointer text-sm">
                            Remember me
                        </label>
                    </div>
                    <Link href={routes.forgetPassword} className="text-primary text-sm hover:underline font-medium">
                        Forget password
                    </Link>
                </div>
            </div>
            <Button
                type="submit"
                className="group h-14 rounded-sm text-base [&_svg]:size-6 font-semibold"
                isPending={isPending}
            >
                Sign in <LuArrowRight className="group-hover:translate-x-2 transition-all duration-100" />
            </Button>
            <div className="space-y-4">
                <p className="text-center text-sm text-gray-500">or</p>
                <ButtonOptionsSignIn />
            </div>
        </form>
    );
}
