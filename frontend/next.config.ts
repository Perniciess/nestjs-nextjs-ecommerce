import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    reactStrictMode: true,
    rewrites: async () => {
        return [
            {
                source: '/api/:path*',
                destination: `/api/:path*`,
            },
        ]
    },

    images: {
        remotePatterns: [
            {
                protocol: process.env.REMOTE_PATTERNS_PROTOCOL,
                hostname: process.env.REMOTE_PATTERNS_HOSTNAME,
                port: process.env.REMOTE_PATTERNS_PORT,
                pathname: process.env.REMOTE_PATTERNS_PATHNAME,
            },
        ],
    },
    env: {
        NEST_WEB_URL: process.env.LOCAL_NEST_WEB_URL,
    },
}

export default nextConfig
