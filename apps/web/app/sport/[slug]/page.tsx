import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SportPage } from '@/components/sport/SportPage';
import { getSportBySlug, getAllSport } from '@/lib/queries';

export const revalidate = 60;

export async function generateStaticParams() {
  const all = await getAllSport();
  return all.map((s) => ({ slug: s.slug }));
}

export default async function SportSectionRoute({ params }: { params: { slug: string } }) {
  const section = await getSportBySlug(params.slug);
  if (!section) notFound();
  return (
    <>
      <SiteHeader />
      <main>
        <SportPage section={section} />
      </main>
      <SiteFooter />
    </>
  );
}
