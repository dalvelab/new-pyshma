import { PageShell } from '@/components/layout/PageShell';
import { VacanciesListing } from '@/components/vacancies/VacanciesListing';
import { getAllVacancies } from '@/lib/queries';

export const revalidate = 60;

export default async function VacanciesIndexPage() {
  const items = await getAllVacancies();
  return (
    <PageShell
      crumbs={[['Вакансии']]}
      title={
        <>
          Работа <span className="text-accent">в городе</span>
        </>
      }
      intro="Открытые вакансии Верхней Пышмы — медиа, образование, сервис, спорт, культура и IT."
    >
      <VacanciesListing items={items} />
    </PageShell>
  );
}
