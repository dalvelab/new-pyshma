import { AfishaListing } from '@/components/afisha/AfishaListing';
import { PageShell } from '@/components/layout/PageShell';
import { getAllEvents, getPageIntros } from '@/lib/queries';

export const revalidate = 60;

export default async function AfishaIndexPage() {
  const [items, intros] = await Promise.all([getAllEvents(), getPageIntros()]);
  return (
    <PageShell
      crumbs={[['Афиша']]}
      title={
        <>
          Афиша <span className="text-accent">города</span>
        </>
      }
      intro={intros.afishaIntro}
    >
      <AfishaListing items={items} />
    </PageShell>
  );
}
