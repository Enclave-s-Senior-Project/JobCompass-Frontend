import type { Metadata } from 'next';
import './globals.css';
import { inter } from '@/components/font';
import ReactQueryProvider from '../contexts/react-query-provider';
import { UserProvider } from '@/contexts/user-context';
import { EnterpriseProvider } from '@/contexts/enterprise-context';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
    title: 'JobCompass',
    description: 'Navigate your career, find your future',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html suppressHydrationWarning={true} lang="en">
            <body className={`${inter.className} antialiased`}>
                <Toaster
                    richColors={true}
                    position="top-right"
                    theme="system"
                    closeButton={true}
                    toastOptions={{
                        style: {
                            borderRadius: '4px',
                        },
                    }}
                />
                <ReactQueryProvider>
                    <UserProvider>
                        <EnterpriseProvider>
                            <main>{children}</main>
                        </EnterpriseProvider>
                    </UserProvider>
                </ReactQueryProvider>
            </body>
        </html>
    );
}
