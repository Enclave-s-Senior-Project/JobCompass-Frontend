'use client';
import { FooterSection } from '@/components/custom-ui/footer-section';
import { HeaderSection } from '@/components/custom-ui/header-section';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Illustration from '@/assets/images/avatar/Illustration.png';
import { Button } from '@/components/ui/button';

export default function Layout() {
    return (
        <div className="flex flex-col min-h-dvh">
            <HeaderSection />
            <NotFound />
            <FooterSection />
        </div>
    );
}

export function NotFound() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center p-4">
            <div className="max-w-5xl w-[80%] flex flex-col md:flex-row items-center justify-center gap-4">
                <div className="max-w-md">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Opps! Page not found</h1>
                    <p className="text-muted-foreground mb-8">
                        Something went wrong. It&apos;s look like the link is broken or the page is removed.
                    </p>
                    <div className="flex gap-4">
                        <Button>
                            <Link href="/" className="flex items-center gap-2">
                                Home <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                        <Button onClick={() => window.history.back()} variant="outline">
                            Go Back
                        </Button>
                    </div>
                </div>
                <div className="relative w-full max-w-md">
                    <Image
                        src={Illustration}
                        alt="404 Robot Illustration"
                        width={500}
                        height={500}
                        priority
                        className="w-full h-auto"
                    />
                </div>
            </div>
        </div>
    );
}
