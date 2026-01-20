import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['@kanban/services', '@kanban/types']
};

export default nextConfig;
