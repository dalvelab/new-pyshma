import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HistoryPage } from '@/components/about/HistoryPage';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { getHistoryItemBySlug, getHistoryItems } from '@/lib/queries';

export const revalidate = 60;

export async function generateStaticParams() {
  const all = await getHistoryItems();
  return all.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const item = await getHistoryItemBySlug(params.slug);
  if (!item) return {};
  return {
    title: `${item.year} — ${item.title} — Новая Пышма`,
    /* Раздел пока не в навигации — не индексируем. */
    robots: { index: false, follow: false },
  };
}

export default async function HistoryRoute({ params }: { params: { slug: string } }) {
  const item = await getHistoryItemBySlug(params.slug);
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
