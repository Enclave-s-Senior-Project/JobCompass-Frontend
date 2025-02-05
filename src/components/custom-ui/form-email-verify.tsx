import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '../ui/input';
import { LuArrowRight } from 'react-icons/lu';

export function FormEmailVerify() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
            <div className="w-full max-w-md flex flex-col items-center justify-center">
                <div className="space-y-6 text-center">
                    <h1 className="text-[32px] leading-[40px] font-inter font-medium">Email Verification</h1>

                    <p className="font-inter text-base leading-6 text-muted-foreground">
                        We&apos;ve sent a verification to{' '}
                        <span className="font-medium text-foreground">emailaddress@gmail.com</span> to verify your email
                        address and activate your account.
                    </p>

                    <div className="space-y-4">
                        <Input type="text" placeholder="Verification Code" className="w-[536px] h-[64px]" />

                        <Button
                            type="submit"
                            className="group h-14 w-[536px] rounded-sm text-base [&_svg]:size-6 font-semibold"
                        >
                            Verify My Account <LuArrowRight className="group-hover:translate-x-2 transition-all" />
                        </Button>
                    </div>

                    <p className="text-sm">
                        Didn&apos;t receive any code? <button className="text-blue-600 hover:underline">Resend</button>
                    </p>
                </div>
            </div>
        </div>
    );
}
