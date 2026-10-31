import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  async rewrites() {
    const serverUrl = process.env.SERVER_URL || 'http://localhost:5000';
    return [
      {
        source: '/api/:path*',
        destination: `${serverUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;

