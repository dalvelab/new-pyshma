import { PageShell } from '@/components/layout/PageShell';
import { VacanciesListing } from '@/components/vacancies/VacanciesListing';
import { getAllVacancies, getAllVacancyCategories, getPageIntros } from '@/lib/queries';

export const revalidate = 60;

export default async function VacanciesIndexPage() {
  const [items, categories, intros] = await Promise.all([
    getAllVacancies(),
    getAllVacancyCategories(),
    getPageIntros(),
  ]);
  return (
    <PageShell
      crumbs={[['Вакансии']]}
      title={
        <>
          Работа <span className="text-accent">в городе</span>
        </>
      }
      intro={intros.vacanciesIntro}
    >
      <VacanciesListing items={items} categories={categories} />
    </PageShell>
  );
}
