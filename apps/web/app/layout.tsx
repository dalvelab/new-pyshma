import type { Metadata, Viewport } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'optional',
  variable: '--font-montserrat',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
const SITE_NAME = 'Это Новая Пышма';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — городской медиа-портал`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    'Новости, афиша, спорт, вакансии и фестиваль Верхней Пышмы. Что происходит, где собираться, чем заняться.',
  openGraph: {
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: 'Городской медиа-портал Верхней Пышмы.',
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
  },
};

export const viewport: Viewport = {
  themeColor: '#f7f2e7',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={montserrat.variable}>
      <body className="font-sans antialiased bg-grain">{children}</body>
    </html>
  );
}
