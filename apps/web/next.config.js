/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // dev
      { protocol: 'http', hostname: 'localhost', port: '1337' },
      // prod (без домена, Strapi на :3002)
      { protocol: 'http', hostname: '176.53.160.167', port: '3002' },
    ],
  },
};

module.exports = nextConfig;
