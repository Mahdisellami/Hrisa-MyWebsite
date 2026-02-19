import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Note: 'output: standalone' is removed for Vercel deployment
  // Re-add it for Docker builds if needed
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
