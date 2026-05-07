import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { VacancyPage } from '@/components/vacancies/VacancyPage';
import { getVacancyBySlug, getAllVacancies } from '@/lib/queries';

export const revalidate = 60;

export async function generateStaticParams() {
  const all = await getAllVacancies();
  return all.map((v) => ({ slug: v.slug }));
}

export default async function VacancyRoute({ params }: { params: { slug: string } }) {
  const vacancy = await getVacancyBySlug(params.slug);
  if (!vacancy) notFound();
  const all = await getAllVacancies();
  const similar = all
    .filter(
      (v) => v.slug !== vacancy.slug && (vacancy.category ? v.category === vacancy.category : true),
    )
    .slice(0, 3);
  return (
    <>
      <SiteHeader />
      <main>
        <VacancyPage vacancy={vacancy} similar={similar} />
      </main>
      <SiteFooter />
    </>
  );
}
