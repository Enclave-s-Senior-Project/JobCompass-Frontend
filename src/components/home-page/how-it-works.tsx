'use client';

import { CircleUser, Upload, Search, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { HomePart } from './home-part';

export function HowItWorks() {
    const steps = [
        {
            icon: CircleUser,
            title: 'Create account',
            description: 'Create an account to get started',
        },
        {
            icon: Upload,
            title: 'Upload CV/Resume',
            description: 'Upload your CV or resume',
        },
        {
            icon: Search,
            title: 'Find suitable job',
            description: 'Search and find suitable jobs',
        },
        {
            icon: Send,
            title: 'Apply job',
            description: 'Apply to your desired job',
        },
    ];

    return (
        <HomePart title="How JobCompass works">
            <div className="relative grid gap-8 py-5 md:grid-cols-4">
                {/* Curved Arrows for Desktop */}
                <div className="absolute left-0 right-0 top-8 hidden md:block">
                    {[...Array(3)].map((_, i) => (
                        <svg
                            key={i}
                            className="absolute h-12 w-[200px]"
                            style={{
                                left: `calc(${25 * (i + 1)}% - 100px)`,
                                transform: i % 2 === 0 ? 'scaleY(1)' : 'scaleY(-1)',
                            }}
                            viewBox="0 0 200 48"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M4 44 C 50 44, 150 44, 196 4"
                                stroke="#2563eb"
                                strokeWidth="2"
                                strokeDasharray="8 8"
                                pathLength="1"
                            />
                        </svg>
                    ))}
                </div>
                {/* Steps */}
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        className="flex flex-col items-center text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                        <div className="relative mb-4 rounded-full bg-primary p-4 text-primary-foreground">
                            <step.icon className="h-6 w-6" />
                            <div className="absolute -right-3 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-primary ring-2 ring-primary">
                                {index + 1}
                            </div>
                        </div>
                        <h3 className="mb-2 font-semibold">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                    </motion.div>
                ))}
            </div>
        </HomePart>
    );
}
