/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "dummyimage.com" },
    ],
  },
};

export default nextConfig;
