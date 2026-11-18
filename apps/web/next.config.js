const path = require('node:path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Корень проекта — apps/web: иначе Next 15 может взять чужой lockfile выше по дереву
  outputFileTracingRoot: path.join(__dirname),
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
