'use client';
import { Button } from '@/components/ui/button';
import { Input } from '../ui/input';
import { LuArrowRight, LuEye, LuEyeOff } from 'react-icons/lu';
import { useState } from 'react';

export function FormResetPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    return (
        <form className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
            <div className="flex flex-col items-center justify-center">
                <div className="max-w-[536px] space-y-9 text-center px-5 md:px-0">
                    <h1 className="text-[32px] leading-[40px] font-inter font-medium">Reset Password</h1>

                    <p className="font-inter text-base leading-6 text-muted-foreground">
                        Duis luctus interdum metus, ut consectetur ante consectetur sed. Suspendisse euismod viverra
                        massa sit amet mollis.
                    </p>

                    <div className="space-y-4">
                        <div className="relative">
                            <Input
                                name="newPassword"
                                placeholder="New Password"
                                type={showPassword ? 'text' : 'password'}
                                className="h-16 rounded-sm focus-visible:border-primary focus-visible:ring-primary pr-12"
                            />
                            <button
                                type="button"
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
                            </button>
                        </div>

                        <div className="relative">
                            <Input
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                className="h-16 rounded-sm focus-visible:border-primary focus-visible:ring-primary pr-12"
                            />
                            <button
                                type="button"
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
                            </button>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="group w-full h-14 rounded-sm text-base [&_svg]:size-6 font-semibold"
                    >
                        Reset Password <LuArrowRight className="group-hover:translate-x-2 transition-all" />
                    </Button>
                </div>
            </div>
        </form>
    );
}
