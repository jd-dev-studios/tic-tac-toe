import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Base config
  reactStrictMode: true,
  
  // Conditionally set output based on NODE_ENV
  ...(process.env.BUILD_MODE === 'docker' && {
    output: 'standalone',
    trailingSlash: true,
    images: { unoptimized: true },
    distDir: 'dist-docker'
  }),
  
  ...(process.env.BUILD_MODE === 'capacitor' && {
    output: 'export',
    distDir: 'dist-capacitor'
  })
};

export default nextConfig;
