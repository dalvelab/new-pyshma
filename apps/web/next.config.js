/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // когда подключите Strapi с медиа — добавьте сюда хост
    remotePatterns: [
      // { protocol: 'https', hostname: 'cms.eto-novaya-pyshma.ru' },
    ],
  },
};

module.exports = nextConfig;
