import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { FestivalLandingView } from '@/components/festival/FestivalLandingView';
import { getFestivalLanding } from '@/lib/queries';

export const revalidate = 60;

export default async function FestivalPage() {
  const data = await getFestivalLanding();
  return (
    <>
      <SiteHeader />
      <main>
        <FestivalLandingView data={data} />
      </main>
      <SiteFooter />
    </>
  );
}
