import type { Metadata, Viewport } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'optional',
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'Это Новая Пышма — городской медиа-портал',
  description:
    'Новости, афиша, спорт, вакансии и фестиваль Верхней Пышмы. Что происходит, где собираться, чем заняться.',
  openGraph: {
    title: 'Это Новая Пышма',
    description: 'Городской медиа-портал Верхней Пышмы.',
    locale: 'ru_RU',
    type: 'website',
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
