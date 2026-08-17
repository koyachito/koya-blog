import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    serverActions: {
        allowedOrigins: [
            "studious-invention-779pxv5xr6vg2rjxv-3000.app.github.dev",
            "localhost:3000",
            "*.app.github.dev",
            "*.github.dev",
            "*.githubpreview.dev",
        ],
    },
  },
};

export default nextConfig;
