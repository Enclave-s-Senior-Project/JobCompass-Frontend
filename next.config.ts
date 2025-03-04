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
        ],
    },
    output: "standalone",
};

export default nextConfig;
