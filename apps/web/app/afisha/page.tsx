import { AfishaListing } from '@/components/afisha/AfishaListing';
import { PageShell } from '@/components/layout/PageShell';
import { getAllEvents } from '@/lib/queries';

export const revalidate = 60;

export default async function AfishaIndexPage() {
  const items = await getAllEvents();
  return (
    <PageShell
      crumbs={[['Афиша']]}
      title={
        <>
          Афиша <span className="text-accent">города</span>
        </>
      }
      intro="Концерты, лекции, спорт, выставки и фестивали Верхней Пышмы."
    >
      <AfishaListing items={items} />
    </PageShell>
  );
}
