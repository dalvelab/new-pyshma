import { PageShell } from '@/components/layout/PageShell';
import { SportListing } from '@/components/sport/SportListing';
import { getAllSport } from '@/lib/queries';

export const revalidate = 60;

export default async function SportIndexPage() {
  const items = await getAllSport();
  return (
    <PageShell
      crumbs={[['Спорт']]}
      title={
        <>
          Спорт <span className="text-accent">в городе</span>
        </>
      }
      intro="Справочник секций Верхней Пышмы — для детей и взрослых. От самбо и плавания до йоги."
    >
      <SportListing items={items} />
    </PageShell>
  );
}
