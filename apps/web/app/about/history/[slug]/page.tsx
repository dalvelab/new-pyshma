import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HistoryPage } from '@/components/about/HistoryPage';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { ABOUT_HISTORY, getHistoryItem } from '@/lib/about-content';

export function generateStaticParams() {
  return ABOUT_HISTORY.map((h) => ({ slug: h.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const item = getHistoryItem(params.slug);
  if (!item) return {};
  return {
    title: `${item.year} — ${item.title} — Новая Пышма`,
    /* Раздел пока не в навигации — не индексируем. */
    robots: { index: false, follow: false },
  };
}

export default function HistoryRoute({ params }: { params: { slug: string } }) {
  const item = getHistoryItem(params.slug);
  if (!item) notFound();
  return (
    <>
      <SiteHeader />
      <main>
        <HistoryPage item={item} />
      </main>
      <SiteFooter />
    </>
  );
}
