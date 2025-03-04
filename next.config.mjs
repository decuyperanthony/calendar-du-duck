import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/.well-known/vercel/flags",
        destination: "/api/vercel/flags",
      },
    ];
  },
};

export default createNextIntlPlugin()(nextConfig);
