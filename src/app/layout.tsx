import type { Metadata } from 'next';
import './globals.css';
import { inter } from '@/components/font';
import { Toaster } from 'react-hot-toast';
import { EnterpriseProvider, NotificationProvider, ReactQueryProvider, UserProvider } from '@/contexts';

export const metadata: Metadata = {
    title: process.env.NEXT_PUBLIC_WEBSITE_NAME + ' | ' + process.env.NEXT_PUBLIC_WEBSITE_SLOGAN,
    description: process.env.NEXT_PUBLIC_WEBSITE_DESCRIPTION,
    keywords: process.env.NEXT_PUBLIC_WEBSITE_KEYWORDS,
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
                            <NotificationProvider>
                                <main>{children}</main>
                            </NotificationProvider>
                        </EnterpriseProvider>
                    </UserProvider>
                </ReactQueryProvider>
            </body>
        </html>
    );
}
