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
        protocol: 'http',
        hostname: '192.168.1.100',
        port: '30080',
        pathname: '/uploads/**',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;

