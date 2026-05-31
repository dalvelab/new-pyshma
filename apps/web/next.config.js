/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // dev
      { protocol: 'http', hostname: 'localhost', port: '1337' },
      // prod (Strapi за доменом, HTTPS)
      { protocol: 'https', hostname: 'admin.newpyshma.ru' },
    ],
  },
};

module.exports = nextConfig;
