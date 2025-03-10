// next.config.js
import type { NextConfig } from "next";
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['three', '@react-three/fiber'],
  },
  // Add other config options here
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
};

// Export the wrapped config
export default withBundleAnalyzer(nextConfig);
