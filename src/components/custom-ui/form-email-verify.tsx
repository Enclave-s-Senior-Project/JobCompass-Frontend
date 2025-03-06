'use client';
import { useActionState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '../ui/input';
import { LuArrowRight } from 'react-icons/lu';
import { verifyEmail } from '@/lib/action';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { AuthService } from '@/services/auth.service';

export function FormEmailVerify() {
    const router = useRouter();
    const search = useSearchParams();
    const email = search.get('email') || '';

    const [state, onSubmit, isPending] = useActionState(verifyEmail, {
        email,
        code: '',
        errors: {},
        success: false,
    });
    const handleResend = async () => {
        const data = { email: email };
        try {
            const temp = await AuthService.reSendEmail(data);
            if (temp.code >= 200) {
                toast.success('Email sent successfully.');
            }
        } catch (err) {
            console.log(err);
            toast.error('Failed to resend verification email');
        }
    };
    useEffect(() => {
        if (state.errors?.code) {
            toast.error(state.errors.code[0]);
        }
        if (state.success && state.email) {
            router.push('/');
        }
    }, [state.success, state.errors, router, state.email]);
    return (
        <form className="h-full flex flex-col items-center justify-center px-4 text-center" action={onSubmit}>
            <div className="flex flex-col items-center justify-center">
                <div className="max-w-[536px] space-y-9 text-center px-5 md:px-0">
                    <h1 className="text-[32px] leading-[40px] font-inter font-medium">Email Verification</h1>

                    <p className="font-inter text-base leading-6 text-muted-foreground">
                        We&apos;ve sent a verification to <span className="font-medium text-foreground">{email}</span>{' '}
                        to verify your email address and activate your account.
                    </p>

                    <div>
                        <Input
                            defaultValue={state.code}
                            name="code"
                            placeholder="Verification Code"
                            type="text"
                            className="h-16 rounded-sm focus-visible:border-primary focus-visible:ring-primary"
                        />
                    </div>
                    <Button
                        type="submit"
                        size="xl"
                        className="group w-full rounded-sm text-base font-semibold"
                        isPending={isPending}
                    >
                        Verify My Account <LuArrowRight className="group-hover:translate-x-2 transition-all" />
                    </Button>

                    <p className="text-sm">
                        Didn&apos;t receive any code?{' '}
                        <button type="button" className="text-blue-600 hover:underline" onClick={handleResend}>
                            Resend
                        </button>
                    </p>
                </div>
            </div>
        </form>
    );
}
