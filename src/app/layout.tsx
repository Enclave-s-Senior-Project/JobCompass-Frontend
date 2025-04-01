import type { Metadata } from 'next';
import './globals.css';
import { inter } from '@/components/font';
import ReactQueryProvider from '../contexts/react-query-provider';
import { UserProvider } from '@/contexts/user-context';
import { EnterpriseProvider } from '@/contexts/enterprise-context';
import { Toaster } from 'react-hot-toast';

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
                <Toaster position="top-right" reverseOrder={false} gutter={8} />
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
