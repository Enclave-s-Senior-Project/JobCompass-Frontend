'use client';
import { useContext, useState } from 'react';
import { CheckIcon } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { LuArrowRight } from 'react-icons/lu';
import { TransactionService } from '@/services/transaction.service';
import { useRouter } from 'next/navigation';
import { cn, handleErrorToast } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { UserContext } from '@/contexts';
import { hasPermission } from '@/lib/auth';
import { NotPermission } from '@/components/custom-ui/global/not-permission';

export default function JobPricing() {
    const { userInfo } = useContext(UserContext);
    const [selectedPlan, setSelectedPlan] = useState<string>('standard');
    const router = useRouter();
    const handlePlanClick = (plan: string) => {
        setSelectedPlan(plan);
    };

    const payment = useMutation({
        mutationFn: async ({ amountPaid, premiumType }: { amountPaid: number; premiumType: string }) => {
            const data = { amountPaid, premiumType };
            const paymentUrl = await TransactionService.createOrder(data);
            return paymentUrl;
        },
        onSuccess: (paymentUrl: string) => {
            router.push(paymentUrl);
        },
        onError: () => {
            handleErrorToast('Oops! Something went wrong');
        },
    });
    return hasPermission(userInfo, 'pricingPlans', 'access') ? (
        <div className="container mx-auto max-w-6xl px-4 py-12">
            <div className="mb-16 flex flex-col items-center justify-between gap-8 md:flex-row">
                <div className="max-w-xl">
                    <h1 className="mb-4 text-3xl font-bold text-gray-900">Buy Premium Subscription to Post a Job</h1>
                    <p className="text-gray-600">
                        Donec eu dui ut dolor commodo ornare. Sed arcu libero, malesuada quis justo sit amet, varius
                        tempus neque. Quisque ultrices mi sed lorem condimentum, vel tempus lectus ultricies.
                    </p>
                </div>
                <div className="w-full max-w-md">
                    <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Status%20update-bro%201-dAyZeEwdiTyVbRvIGue3X6Zgd5kdrJ.png"
                        alt="Job posting illustration"
                        width={400}
                        height={400}
                        className="h-auto w-full"
                    />
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* TRIAL PLAN */}
                <div
                    className={cn(
                        selectedPlan === 'trial'
                            ? 'border-blue-600 shadow-lg ring-1'
                            : 'border-gray-200 hover:border-blue-300',
                        'relative flex h-full cursor-pointer flex-col rounded-lg border p-6 transition-all duration-300'
                    )}
                    onClick={() => handlePlanClick('trial')}
                >
                    <div className="mb-6">
                        <h2 className="mb-2 text-lg font-bold uppercase text-gray-900">Trial</h2>
                        <p className="mb-4 text-sm text-gray-600">
                            Praesent eget pulvinar orci. Duis ut pellentesque ligula convallis.
                        </p>
                        <div className="flex items-baseline">
                            <span className="text-3xl font-bold text-blue-600">Free</span>
                            <span className="ml-1 text-gray-500">/Monthly</span>
                        </div>
                    </div>

                    <div className="mb-6 flex-grow space-y-3">
                        <div className="flex items-start">
                            <CheckIcon className="mr-2 h-5 w-5 flex-shrink-0 text-blue-500" />
                            <span className="text-gray-700">10 Point</span>
                        </div>
                        <div className="flex items-start">
                            <CheckIcon className="mr-2 h-5 w-5 flex-shrink-0 text-blue-500" />
                            <span className="text-gray-700">Post 1 Job</span>
                        </div>
                        <div className="flex items-start">
                            <CheckIcon className="mr-2 h-5 w-5 flex-shrink-0 text-blue-500" />
                            <span className="text-gray-700">Urgents & Featured Jobs</span>
                        </div>
                        <div className="flex items-start">
                            <CheckIcon className="mr-2 h-5 w-5 flex-shrink-0 text-blue-500" />
                            <span className="text-gray-700">Highlights Job with Colors</span>
                        </div>
                        <div className="flex items-start">
                            <CheckIcon className="mr-2 h-5 w-5 flex-shrink-0 text-blue-500" />
                            <span className="text-gray-700">Access & Saved 5 Candidates</span>
                        </div>
                        <div className="flex items-start">
                            <CheckIcon className="mr-2 h-5 w-5 flex-shrink-0 text-blue-500" />
                            <span className="text-gray-700">10 Days Resume Visibility</span>
                        </div>
                        <div className="flex items-start">
                            <CheckIcon className="mr-2 h-5 w-5 flex-shrink-0 text-blue-500" />
                            <span className="text-gray-700">24/7 Critical Support</span>
                        </div>
                    </div>

                    <Button type="submit" className="group w-full md:w-auto">
                        Choose Plan <LuArrowRight className="transition-all duration-100 group-hover:translate-x-2" />
                    </Button>
                </div>

                {/* STANDARD PLAN */}
                <div
                    className={cn(
                        selectedPlan === 'standard'
                            ? 'border-blue-600 shadow-lg ring-1'
                            : 'border-gray-200 hover:border-blue-300',
                        'relative flex h-full cursor-pointer flex-col rounded-lg border p-6 transition-all duration-300'
                    )}
                    onClick={() => handlePlanClick('standard')}
                >
                    {selectedPlan === 'standard' && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                            Recommendation
                        </div>
                    )}
                    <div className="mb-6">
                        <h2 className="mb-2 text-lg font-bold uppercase text-gray-900">Standard</h2>
                        <p className="mb-4 text-sm text-gray-600">
                            Praesent eget pulvinar orci. Duis ut pellentesque ligula convallis.
                        </p>
                        <div className="flex items-baseline">
                            <span className="text-3xl font-bold text-blue-600">$30</span>
                            <span className="ml-1 text-gray-500">/Monthly</span>
                        </div>
                    </div>

                    <div className="mb-6 flex-grow space-y-3">
                        <div className="flex items-start">
                            <CheckIcon className="mr-2 h-5 w-5 flex-shrink-0 text-blue-500" />
                            <span className="text-gray-700">50 Point</span>
                        </div>
                        <div className="flex items-start">
                            <CheckIcon className="mr-2 h-5 w-5 flex-shrink-0 text-blue-500" />
                            <span className="text-gray-700">3 Active Jobs</span>
                        </div>
                        <div className="flex items-start">
                            <CheckIcon className="mr-2 h-5 w-5 flex-shrink-0 text-blue-500" />
                            <span className="text-gray-700">Urgents & Featured Jobs</span>
                        </div>
                        <div className="flex items-start">
                            <CheckIcon className="mr-2 h-5 w-5 flex-shrink-0 text-blue-500" />
                            <span className="text-gray-700">Highlights Job with Colors</span>
                        </div>
                        <div className="flex items-start">
                            <CheckIcon className="mr-2 h-5 w-5 flex-shrink-0 text-blue-500" />
                            <span className="text-gray-700">Access & Saved 10 Candidates</span>
                        </div>
                        <div className="flex items-start">
                            <CheckIcon className="mr-2 h-5 w-5 flex-shrink-0 text-blue-500" />
                            <span className="text-gray-700">20 Days Resume Visibility</span>
                        </div>
                        <div className="flex items-start">
                            <CheckIcon className="mr-2 h-5 w-5 flex-shrink-0 text-blue-500" />
                            <span className="text-gray-700">24/7 Critical Support</span>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="group w-full md:w-auto"
                        onClick={() => payment.mutate({ amountPaid: 30, premiumType: 'STANDARD' })}
                    >
                        Choose Plan <LuArrowRight className="transition-all duration-100 group-hover:translate-x-2" />
                    </Button>
                </div>

                {/* PREMIUM PLAN */}
                <div
                    className={cn(
                        selectedPlan === 'premium'
                            ? 'border-blue-600 shadow-lg ring-1'
                            : 'border-gray-200 hover:border-blue-300',
                        'relative flex h-full cursor-pointer flex-col rounded-lg border p-6 transition-all duration-300'
                    )}
                    onClick={() => handlePlanClick('premium')}
                >
                    <div className="mb-6">
                        <h2 className="mb-2 text-lg font-bold uppercase text-gray-900">Premium</h2>
                        <p className="mb-4 text-sm text-gray-600">
                            Praesent eget pulvinar orci. Duis ut pellentesque ligula convallis.
                        </p>
                        <div className="flex items-baseline">
                            <span className="text-3xl font-bold text-blue-600">$50</span>
                            <span className="ml-1 text-gray-500">/Monthly</span>
                        </div>
                    </div>

                    <div className="mb-6 flex-grow space-y-3">
                        <div className="flex items-start">
                            <CheckIcon className="mr-2 h-5 w-5 flex-shrink-0 text-blue-500" />
                            <span className="text-gray-700">100 Point</span>
                        </div>
                        <div className="flex items-start">
                            <CheckIcon className="mr-2 h-5 w-5 flex-shrink-0 text-blue-500" />
                            <span className="text-gray-700">6 Active Jobs</span>
                        </div>
                        <div className="flex items-start">
                            <CheckIcon className="mr-2 h-5 w-5 flex-shrink-0 text-blue-500" />
                            <span className="text-gray-700">Urgents & Featured Jobs</span>
                        </div>
                        <div className="flex items-start">
                            <CheckIcon className="mr-2 h-5 w-5 flex-shrink-0 text-blue-500" />
                            <span className="text-gray-700">Highlights Job with Colors</span>
                        </div>
                        <div className="flex items-start">
                            <CheckIcon className="mr-2 h-5 w-5 flex-shrink-0 text-blue-500" />
                            <span className="text-gray-700">Access & Saved 20 Candidates</span>
                        </div>
                        <div className="flex items-start">
                            <CheckIcon className="mr-2 h-5 w-5 flex-shrink-0 text-blue-500" />
                            <span className="text-gray-700">30 Days Resume Visibility</span>
                        </div>
                        <div className="flex items-start">
                            <CheckIcon className="mr-2 h-5 w-5 flex-shrink-0 text-blue-500" />
                            <span className="text-gray-700">24/7 Critical Support</span>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="group w-full md:w-auto"
                        onClick={() => payment.mutate({ amountPaid: 30, premiumType: 'PREMIUM' })}
                    >
                        Choose Plan <LuArrowRight className="transition-all duration-100 group-hover:translate-x-2" />
                    </Button>
                </div>
            </div>
        </div>
    ) : (
        <NotPermission />
    );
}
