/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Do not expose source maps in production builds.
  // This makes it harder to inspect original source code in the browser.
  productionBrowserSourceMaps: false,

  images: {
    domains: ["localhost", "images.unsplash.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;

