import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eu.ui-avatars.com",
      },
    ],
  },
};

export default nextConfig;
