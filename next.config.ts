import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { hostname: 'avatar.vercel.sh', port: '', protocol: 'https' },
      { hostname: 'utfs.io', port: '', protocol: 'https' },
      {
        hostname: 'avatars.githubusercontent.com',
        port: '',
        protocol: 'https',
      },
    ],
  },
};

export default nextConfig;
