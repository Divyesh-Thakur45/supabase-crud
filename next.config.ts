import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "agcjdkwpicclcpjrnjmh.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/notes-images/**",
      },
    ],
  },
};

export default nextConfig;
