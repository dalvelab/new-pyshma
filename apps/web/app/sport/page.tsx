import { PageShell } from '@/components/layout/PageShell';
import { SportListing } from '@/components/sport/SportListing';
import { getAllSport, getAllSportCategories, getPageIntros } from '@/lib/queries';

export const revalidate = 60;

export default async function SportIndexPage() {
  const [items, categories, intros] = await Promise.all([
    getAllSport(),
    getAllSportCategories(),
    getPageIntros(),
  ]);
  return (
    <PageShell
      crumbs={[['Спорт']]}
      title={
        <>
          Спорт <span className="text-accent">в городе</span>
        </>
      }
      intro={intros.sportIntro}
    >
      <SportListing items={items} categories={categories} />
    </PageShell>
  );
}
