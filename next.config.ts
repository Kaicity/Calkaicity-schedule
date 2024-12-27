import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'avatars.githubusercontent.com',
        port: '',
        protocol: 'https',
      },
      {
        hostname: 'lh3.googleusercontent.com',
        port: '',
        protocol: 'https',
      },
      { hostname: 'utfs.io', port: '', protocol: 'https' },
    ],
  },
};

export default nextConfig;
