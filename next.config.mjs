/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "localhost",
      "i.ibb.co.com",
      "10.0.80.13",
      "137.59.180.219",
      "ui-avatars.com",
    ],
  },
  experimental: {
    nodeMiddleware: true,
  },
};

export default nextConfig;
