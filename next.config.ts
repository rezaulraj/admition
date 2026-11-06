import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 75 is the default; 90 is used for the destination photos so they stay crisp and vivid
    qualities: [75, 90],
  },
};

export default nextConfig;
