'use client';
import { FooterSection } from '@/components/custom-ui/footer-section';
import { HeaderSection } from '@/components/custom-ui/header-section';
import React from 'react';
import { ToastContainer } from 'react-toastify';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-dvh">
            <ToastContainer position="top-right" autoClose={3000} />
            <HeaderSection />
            <main className="flex-1">{children}</main>
            <FooterSection />
        </div>
    );
}
