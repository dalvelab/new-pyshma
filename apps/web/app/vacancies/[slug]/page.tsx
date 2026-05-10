import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { VacancyPage } from '@/components/vacancies/VacancyPage';
import { buildMetadata } from '@/lib/metadata';
import {
  getAllVacancies,
  getSimilarVacancies,
  getVacancyBySlug,
} from '@/lib/queries';

export const revalidate = 60;

export async function generateStaticParams() {
  const all = await getAllVacancies();
  return all.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const vacancy = await getVacancyBySlug(params.slug);
  if (!vacancy) return {};
  const title = vacancy.company ? `${vacancy.title} · ${vacancy.company}` : vacancy.title;
  return buildMetadata({
    title,
    description: vacancy.description ?? `${vacancy.salary} · ${vacancy.experience}`,
  });
}

export default async function VacancyRoute({ params }: { params: { slug: string } }) {
  const vacancy = await getVacancyBySlug(params.slug);
  if (!vacancy) notFound();
  const similar = await getSimilarVacancies({
    category: vacancy.category,
    excludeSlug: vacancy.slug,
    limit: 3,
  });
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
