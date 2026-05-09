/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost', port: '1337' },
      // { protocol: 'https', hostname: 'cms.eto-novaya-pyshma.ru' },
    ],
  },
};

module.exports = nextConfig;
