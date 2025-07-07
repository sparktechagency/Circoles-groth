/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "10.10.10.55",
      "i.ibb.co.com",
      "10.0.80.13",
      "137.59.180.219",
      "ui-avatars.com",
      "103.186.20.110",
    ],
  },
  experimental: {
    nodeMiddleware: true,
  },
};

export default nextConfig;
