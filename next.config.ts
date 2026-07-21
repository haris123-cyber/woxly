import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // Compress responses with gzip/brotli
  compress: true,

  // Serve images as WebP/AVIF automatically for supported browsers
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // 1 year cache for images
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256],
  },

  // Aggressive HTTP caching for static assets
  async headers() {
    return [
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Disable X-Powered-By header (small security + perf improvement)
  poweredByHeader: false,
};

export default nextConfig;
