import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eu.ui-avatars.com",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
      {
        protocol: "https",
        hostname: "mfyifdkqhojtaqdqbwgr.supabase.co",
      },
    ],
  },
};

export default nextConfig;
