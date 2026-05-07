import { mockEventsAll, mockFestivalLanding, mockNewsAll, mockSport, mockVacancies } from './mock';
import { fetchStrapi } from './strapi';
import type { Article, Event, FestivalLanding, SearchHit, SportSection, Vacancy } from './types';

/* ──────────────── News ──────────────── */

export async function getAllNews(): Promise<Article[]> {
  const remote = await fetchStrapi<Article[]>('articles', {
    query: '?sort=publishedAt:desc&pagination[limit]=100&populate=*',
  });
  return remote?.length ? remote : mockNewsAll;
}

export async function getNewsBySlug(slug: string): Promise<Article | null> {
  const remote = await fetchStrapi<Article[]>('articles', {
    query: `?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`,
  });
  if (remote?.[0]) return remote[0];
  return mockNewsAll.find((a) => a.slug === slug) ?? null;
}

export async function getRelatedNews(article: Article, max = 3): Promise<Article[]> {
  const all = await getAllNews();
  const explicit = (article.relatedSlugs ?? [])
    .map((s) => all.find((a) => a.slug === s))
    .filter((a): a is Article => Boolean(a));
  if (explicit.length >= max) return explicit.slice(0, max);
  const fillers = all.filter(
    (a) => a.slug !== article.slug && a.category === article.category && !explicit.includes(a),
  );
  return [...explicit, ...fillers].slice(0, max);
}

/* ──────────────── Events ──────────────── */

export async function getAllEvents(): Promise<Event[]> {
  const remote = await fetchStrapi<Event[]>('events', {
    query: '?sort=startsAt:asc&pagination[limit]=100&populate=*',
  });
  return remote?.length ? remote : mockEventsAll;
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  const remote = await fetchStrapi<Event[]>('events', {
    query: `?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`,
  });
  if (remote?.[0]) return remote[0];
  return mockEventsAll.find((e) => e.slug === slug) ?? null;
}

/* ──────────────── Sport ──────────────── */

export async function getAllSport(): Promise<SportSection[]> {
  const remote = await fetchStrapi<SportSection[]>('sport-sections', {
    query: '?pagination[limit]=100',
  });
  return remote?.length ? remote : mockSport;
}

export async function getSportBySlug(slug: string): Promise<SportSection | null> {
  const remote = await fetchStrapi<SportSection[]>('sport-sections', {
    query: `?filters[slug][$eq]=${encodeURIComponent(slug)}`,
  });
  if (remote?.[0]) return remote[0];
  return mockSport.find((s) => s.slug === slug) ?? null;
}

/* ──────────────── Vacancies ──────────────── */

export async function getAllVacancies(): Promise<Vacancy[]> {
  const remote = await fetchStrapi<Vacancy[]>('vacancies', {
    query: '?sort=publishedAt:desc&pagination[limit]=100',
  });
  return remote?.length ? remote : mockVacancies;
}

export async function getVacancyBySlug(slug: string): Promise<Vacancy | null> {
  const remote = await fetchStrapi<Vacancy[]>('vacancies', {
    query: `?filters[slug][$eq]=${encodeURIComponent(slug)}`,
  });
  if (remote?.[0]) return remote[0];
  return mockVacancies.find((v) => v.slug === slug) ?? null;
}

/* ──────────────── Festival landing ──────────────── */

export async function getFestivalLanding(): Promise<FestivalLanding> {
  const remote = await fetchStrapi<FestivalLanding>('festival-landing', { query: '?populate=*' });
  return remote ?? mockFestivalLanding;
}

/* ──────────────── Search ──────────────── */

/** Простейший текстовый match. Достаточен для прототипа;
    в проде стоит заменить на Strapi search-plugin или Meilisearch. */
export async function searchAll(qRaw: string): Promise<SearchHit[]> {
  const q = qRaw.trim().toLowerCase();
  if (!q) return [];
  const [news, events, sport, vacancies] = await Promise.all([
    getAllNews(),
    getAllEvents(),
    getAllSport(),
    getAllVacancies(),
  ]);
  const hits: SearchHit[] = [];

  for (const a of news) {
    if (a.title.toLowerCase().includes(q) || (a.excerpt ?? '').toLowerCase().includes(q)) {
      hits.push({
        kind: 'news',
        slug: a.slug,
        title: a.title,
        subtitle: a.category,
        excerpt: a.excerpt,
        pattern: a.fallbackPattern,
      });
    }
  }
  for (const e of events) {
    if (
      e.title.toLowerCase().includes(q) ||
      (e.description ?? '').toLowerCase().includes(q) ||
      e.place.toLowerCase().includes(q)
    ) {
      hits.push({
        kind: 'event',
        slug: e.slug,
        title: e.title,
        subtitle: `${e.place} · ${new Date(e.startsAt).toLocaleDateString('ru-RU')}`,
        excerpt: e.description,
        pattern: e.fallbackPattern,
      });
    }
  }
  for (const s of sport) {
    if (s.name.toLowerCase().includes(q) || (s.description ?? '').toLowerCase().includes(q)) {
      hits.push({
        kind: 'sport',
        slug: s.slug,
        title: s.name,
        subtitle: `${s.venue} · ${s.age}`,
        excerpt: s.description,
        pattern: s.fallbackPattern,
      });
    }
  }
  for (const v of vacancies) {
    if (v.title.toLowerCase().includes(q) || (v.description ?? '').toLowerCase().includes(q)) {
      hits.push({
        kind: 'vacancy',
        slug: v.slug,
        title: v.title,
        subtitle: `${v.salary} · ${v.schedule}`,
        excerpt: v.description,
        pattern: v.fallbackPattern,
      });
    }
  }
  return hits;
}
