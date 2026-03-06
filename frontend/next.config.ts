/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Standalone output — ключ к маленькому образу
  output: 'standalone',

  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEST_WEB_URL: process.env.NEST_WEB_URL,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '192.168.56.11',
        pathname: '/uploads/**',
      },
    ],
    unoptimized: true,
  },

  async rewrites() {
     const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL
     if (!apiBase) return []
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
