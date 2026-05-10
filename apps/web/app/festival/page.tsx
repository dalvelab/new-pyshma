import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { FestivalLandingView } from '@/components/festival/FestivalLandingView';
import { getFestival, getFestivalPrograms, getPastFestivals } from '@/lib/queries';

export const revalidate = 60;

export default async function FestivalPage() {
  const [data, pastYears, programs] = await Promise.all([
    getFestival(),
    getPastFestivals(),
    getFestivalPrograms(),
  ]);
  if (!data) notFound();
  return (
    <>
      <SiteHeader />
      <main>
        <FestivalLandingView data={data} pastYears={pastYears} programs={programs} />
      </main>
      <SiteFooter />
    </>
  );
}
