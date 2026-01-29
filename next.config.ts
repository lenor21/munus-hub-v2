import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/auth/login",
        permanent: true, // Use 'true' for a 308 permanent redirect
      },
    ];
  },
};

export default nextConfig;
