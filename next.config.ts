import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cache Components is left off so the home page can opt into
  // `export const dynamic = "force-dynamic"` (not supported with it enabled).
  // Request-time rendering lets SiteImage pick up new files in public/images.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // SiteImage appends ?v=<file mtime> so a swapped photo is re-optimised.
    localPatterns: [{ pathname: "/images/**" }],
  },
  // SiteImage checks public/images on disk at request time. On serverless hosts
  // such as Vercel, public/ is not bundled with the function unless listed here.
  outputFileTracingIncludes: {
    "/": ["./public/images/**/*"],
  },
};

export default nextConfig;
