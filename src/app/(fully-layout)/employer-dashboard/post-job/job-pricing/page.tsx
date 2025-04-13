'use client';
import { useState } from 'react';
import { CheckIcon } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { LuArrowRight } from 'react-icons/lu';
import { TransactionService } from '@/services/transaction.service';
import { useRouter } from 'next/navigation';
import { handleErrorToast } from '@/lib/utils';

export default function JobPricing() {
    const [selectedPlan, setSelectedPlan] = useState<string>('standard');
    const router = useRouter();
    const handlePlanClick = (plan: string) => {
        setSelectedPlan(plan);
    };
    const Payment = async (amountPaid: number, premiumType: string) => {
        try {
            const data = { amountPaid, premiumType };
            const paymentUrl = await TransactionService.createOrder(data);
            router.push(paymentUrl);
        } catch (error) {
            handleErrorToast(error);
        }
    };
    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
                <div className="max-w-xl">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Buy Premium Subscription to Post a Job</h1>
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
                        className="w-full h-auto"
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* TRIAL PLAN */}
                <div
                    className={`${
                        selectedPlan === 'trial'
                            ? 'border-2 border-blue-600 shadow-lg'
                            : 'border border-gray-200 hover:border-blue-300'
                    } rounded-lg p-6 flex flex-col h-full relative transition-all duration-300 cursor-pointer`}
                    onClick={() => handlePlanClick('trial')}
                >
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-gray-900 uppercase mb-2">Trial</h2>
                        <p className="text-gray-600 text-sm mb-4">
                            Praesent eget pulvinar orci. Duis ut pellentesque ligula convallis.
                        </p>
                        <div className="flex items-baseline">
                            <span className="text-3xl font-bold text-blue-600">Free</span>
                            <span className="text-gray-500 ml-1">/Monthly</span>
                        </div>
                    </div>

                    <div className="space-y-3 flex-grow mb-6">
                        <div className="flex items-start">
                            <CheckIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">10 Point</span>
                        </div>
                        <div className="flex items-start">
                            <CheckIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">Post 1 Job</span>
                        </div>
                        <div className="flex items-start">
                            <CheckIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">Urgents & Featured Jobs</span>
                        </div>
                        <div className="flex items-start">
                            <CheckIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">Highlights Job with Colors</span>
                        </div>
                        <div className="flex items-start">
                            <CheckIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">Access & Saved 5 Candidates</span>
                        </div>
                        <div className="flex items-start">
                            <CheckIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">10 Days Resume Visibility</span>
                        </div>
                        <div className="flex items-start">
                            <CheckIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">24/7 Critical Support</span>
                        </div>
                    </div>

                    <Button type="submit" className="group w-full md:w-auto">
                        Choose Plan <LuArrowRight className="group-hover:translate-x-2 transition-all duration-100" />
                    </Button>
                </div>

                {/* STANDARD PLAN */}
                <div
                    className={`${
                        selectedPlan === 'standard'
                            ? 'border-2 border-blue-600 shadow-lg'
                            : 'border border-gray-200 hover:border-blue-300'
                    } rounded-lg p-6 flex flex-col h-full relative transition-all duration-300 cursor-pointer`}
                    onClick={() => handlePlanClick('standard')}
                >
                    {selectedPlan === 'standard' && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold py-1 px-3 rounded-full">
                            Recommendation
                        </div>
                    )}
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-gray-900 uppercase mb-2">Standard</h2>
                        <p className="text-gray-600 text-sm mb-4">
                            Praesent eget pulvinar orci. Duis ut pellentesque ligula convallis.
                        </p>
                        <div className="flex items-baseline">
                            <span className="text-3xl font-bold text-blue-600">$30</span>
                            <span className="text-gray-500 ml-1">/Monthly</span>
                        </div>
                    </div>

                    <div className="space-y-3 flex-grow mb-6">
                        <div className="flex items-start">
                            <CheckIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">50 Point</span>
                        </div>
                        <div className="flex items-start">
                            <CheckIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">3 Active Jobs</span>
                        </div>
                        <div className="flex items-start">
                            <CheckIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">Urgents & Featured Jobs</span>
                        </div>
                        <div className="flex items-start">
                            <CheckIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">Highlights Job with Colors</span>
                        </div>
                        <div className="flex items-start">
                            <CheckIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">Access & Saved 10 Candidates</span>
                        </div>
                        <div className="flex items-start">
                            <CheckIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">20 Days Resume Visibility</span>
                        </div>
                        <div className="flex items-start">
                            <CheckIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">24/7 Critical Support</span>
                        </div>
                    </div>

                    <Button type="submit" className="group w-full md:w-auto" onClick={() => Payment(30, 'STANDARD')}>
                        Choose Plan <LuArrowRight className="group-hover:translate-x-2 transition-all duration-100" />
                    </Button>
                </div>

                {/* PREMIUM PLAN */}
                <div
                    className={`${
                        selectedPlan === 'premium'
                            ? 'border-2 border-blue-600 shadow-lg'
                            : 'border border-gray-200 hover:border-blue-300'
                    } rounded-lg p-6 flex flex-col h-full relative transition-all duration-300 cursor-pointer`}
                    onClick={() => handlePlanClick('premium')}
                >
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-gray-900 uppercase mb-2">Premium</h2>
                        <p className="text-gray-600 text-sm mb-4">
                            Praesent eget pulvinar orci. Duis ut pellentesque ligula convallis.
                        </p>
                        <div className="flex items-baseline">
                            <span className="text-3xl font-bold text-blue-600">$50</span>
                            <span className="text-gray-500 ml-1">/Monthly</span>
                        </div>
                    </div>

                    <div className="space-y-3 flex-grow mb-6">
                        <div className="flex items-start">
                            <CheckIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">100 Point</span>
                        </div>
                        <div className="flex items-start">
                            <CheckIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">6 Active Jobs</span>
                        </div>
                        <div className="flex items-start">
                            <CheckIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">Urgents & Featured Jobs</span>
                        </div>
                        <div className="flex items-start">
                            <CheckIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">Highlights Job with Colors</span>
                        </div>
                        <div className="flex items-start">
                            <CheckIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">Access & Saved 20 Candidates</span>
                        </div>
                        <div className="flex items-start">
                            <CheckIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">30 Days Resume Visibility</span>
                        </div>
                        <div className="flex items-start">
                            <CheckIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">24/7 Critical Support</span>
                        </div>
                    </div>

                    <Button type="submit" className="group w-full md:w-auto" onClick={() => Payment(30, 'PREMIUM')}>
                        Choose Plan <LuArrowRight className="group-hover:translate-x-2 transition-all duration-100" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
