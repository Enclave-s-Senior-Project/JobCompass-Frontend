import type { Metadata } from 'next';
import './globals.css';
import { inter } from '@/components/font';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactQueryProvider from './providers/react-query-provider';

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
                <ToastContainer />
                <ReactQueryProvider>
                    <main>{children}</main>
                </ReactQueryProvider>
            </body>
        </html>
    );
}
