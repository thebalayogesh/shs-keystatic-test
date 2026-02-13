import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  /* This is required for Keystatic and some Node.js APIs to work on Cloudflare */
  serverExternalPackages: ["@keystatic/core", "@keystatic/next"],
};

export default nextConfig;
