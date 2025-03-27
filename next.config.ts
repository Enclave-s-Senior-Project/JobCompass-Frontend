import { basePathPublicStaticFiles } from '@/middleware';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
            },
            {
                protocol: 'https',
                hostname: 'i.pinimg.com',
            },
            {
                protocol: 'https',
                hostname: 'job-compass-store.s3.ap-southeast-1.amazonaws.com',
            },
        ],
    },
    output: 'standalone',
};

export default nextConfig;
