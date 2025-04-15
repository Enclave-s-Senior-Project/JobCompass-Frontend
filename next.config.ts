import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {protocol: 'https', hostname: '**'}
        ],
    },
    output: 'standalone',
};

export default nextConfig;
