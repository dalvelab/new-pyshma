import { fetchStrapi } from '@/lib/strapi';
import { getLatestNews, getLeadArticle, getUpcomingEvents } from '@/lib/queries';
import { mockFestival, mockSport, mockVacancies } from '@/lib/mock';
import type {
  FestivalTeaser,
  SportSection as SportSectionT,
  Vacancy,
} from '@/lib/types';

import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { Hero } from '@/components/home/Hero';
import { LeadStory } from '@/components/home/LeadStory';
import { NewsGrid } from '@/components/home/NewsGrid';
import { AfishaRow } from '@/components/home/AfishaRow';
import { FestTeaser } from '@/components/home/FestTeaser';
import { SportSection } from '@/components/home/SportSection';
import { VacanciesSection } from '@/components/home/VacanciesSection';

/* App Router page = React Server Component by default.
   Data is fetched at request time, cached for `revalidate` seconds. */

export const revalidate = 60;

async function getHomeData() {
  const [lead, news, events, sportRes, vacanciesRes, festRes] = await Promise.all([
    getLeadArticle(),
    getLatestNews(4),
    getUpcomingEvents(4),
    fetchStrapi<SportSectionT[]>('sport-sections', { query: '?pagination[limit]=5' }),
    fetchStrapi<Vacancy[]>('vacancies', { query: '?sort=publishedAt:desc&pagination[limit]=5' }),
    fetchStrapi<FestivalTeaser>('festival-teaser'),
  ]);

  return {
    lead,
    news,
    events,
    sport: (sportRes?.length ? sportRes : mockSport).slice(0, 5),
    vacancies: (vacanciesRes?.length ? vacanciesRes : mockVacancies).slice(0, 5),
    festival: festRes ?? mockFestival,
  };
}

export default async function HomePage() {
  const data = await getHomeData();

  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        {data.lead && <LeadStory lead={data.lead} />}
        <NewsGrid items={data.news} />
        <AfishaRow items={data.events} />
        <FestTeaser teaser={data.festival} />
        <section className="px-4 md:px-9 py-9 border-b-1.5 border-ink max-w-page mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-9">
            <SportSection items={data.sport} />
            <VacanciesSection items={data.vacancies} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
