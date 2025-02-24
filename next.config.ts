/** @type {import('next').NextConfig} */
const nextConfig = {
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
                protocol: "https",
                hostname: "job-compass-store.s3.ap-southeast-1.amazonaws.com",
                pathname: "/uploads/**", 
              },
        ],
    },
    output: 'standalone',
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:3001/:path*',
            },
        ];
    },
};

module.exports = nextConfig;
