import { mockEventsAll, mockFestivalLanding, mockSport, mockVacancies } from './mock';
import {
  absoluteMediaUrl,
  fetchStrapi,
  fetchStrapiPage,
  type StrapiEntry,
  type StrapiMedia,
} from './strapi';
import type { Article, Event, FestivalLanding, SearchHit, SportSection, Vacancy } from './types';

/* ──────────────── News ──────────────── */

interface StrapiArticle extends StrapiEntry {
  title: string;
  slug: string;
  category?: { name: string } | null;
  excerpt?: string | null;
  body?: string | null;
  cover?: StrapiMedia | null;
  coverAlt?: string | null;
  readingTime?: number | null;
  isLead?: boolean | null;
}

function mapArticle(entry: StrapiArticle): Article {
  const coverUrl = absoluteMediaUrl(entry.cover?.url) ?? '';
  return {
    id: String(entry.id),
    slug: entry.slug,
    title: entry.title,
    category: entry.category?.name ?? '',
    createdAt: entry.createdAt ?? new Date().toISOString(),
    readingTime: entry.readingTime ?? undefined,
    cover: { url: coverUrl, alt: entry.coverAlt ?? entry.cover?.alternativeText ?? undefined },
    isLead: entry.isLead ?? undefined,
    body: entry.body ?? undefined,
    excerpt: entry.excerpt ?? undefined,
  };
}

const ARTICLE_POPULATE = 'populate[cover]=true&populate[category]=true';

/** Только поля, нужные для карточки в листинге — без тяжёлого `body`. */
const ARTICLE_LISTING_FIELDS =
  'fields[0]=title&fields[1]=slug&fields[2]=excerpt&fields[3]=createdAt' +
  '&fields[4]=isLead&fields[5]=readingTime&fields[6]=coverAlt';

export async function getAllNews(): Promise<Article[]> {
  const remote = await fetchStrapi<StrapiArticle[]>('articles', {
    query: `?sort=createdAt:desc&pagination[limit]=100&${ARTICLE_POPULATE}`,
  });
  return remote?.map(mapArticle) ?? [];
}

export async function getNewsBySlug(slug: string): Promise<Article | null> {
  const remote = await fetchStrapi<StrapiArticle[]>('articles', {
    query: `?filters[slug][$eq]=${encodeURIComponent(slug)}&${ARTICLE_POPULATE}`,
  });
  return remote?.[0] ? mapArticle(remote[0]) : null;
}

export async function getLeadArticle(): Promise<Article | null> {
  const remote = await fetchStrapi<StrapiArticle[]>('articles', {
    query: `?filters[isLead][$eq]=true&pagination[limit]=1&${ARTICLE_POPULATE}`,
  });
  return remote?.[0] ? mapArticle(remote[0]) : null;
}

export async function getLatestNews(limit = 4): Promise<Article[]> {
  const remote = await fetchStrapi<StrapiArticle[]>('articles', {
    query: `?sort=createdAt:desc&pagination[limit]=${limit}&${ARTICLE_POPULATE}`,
  });
  return remote?.map(mapArticle) ?? [];
}

export interface NewsPage {
  items: Article[];
  page: number;
  pageSize: number;
  total: number;
  pageCount: number;
}

interface GetNewsPageArgs {
  page?: number;
  pageSize?: number;
  /** Фильтр по имени категории; undefined = без фильтра. */
  category?: string;
}

export async function getNewsPage({
  page = 1,
  pageSize = 8,
  category,
}: GetNewsPageArgs = {}): Promise<NewsPage> {
  const filter = category
    ? `&filters[category][name][$eq]=${encodeURIComponent(category)}`
    : '';
  const query =
    `?sort=createdAt:desc` +
    `&pagination[page]=${page}` +
    `&pagination[pageSize]=${pageSize}` +
    `&pagination[withCount]=true` +
    `&${ARTICLE_POPULATE}` +
    `&${ARTICLE_LISTING_FIELDS}` +
    filter;
  const res = await fetchStrapiPage<StrapiArticle>('articles', { query });
  if (!res) return { items: [], page, pageSize, total: 0, pageCount: 0 };
  return {
    items: res.data.map(mapArticle),
    page: res.meta.pagination.page,
    pageSize: res.meta.pagination.pageSize,
    total: res.meta.pagination.total,
    pageCount: res.meta.pagination.pageCount,
  };
}

/* ──────────────── Categories ──────────────── */

interface StrapiCategory extends StrapiEntry {
  name: string;
  slug: string;
}

export async function getAllCategories(): Promise<string[]> {
  const remote = await fetchStrapi<StrapiCategory[]>('categories', {
    query: '?sort=name:asc&pagination[limit]=100',
  });
  return remote?.map((c) => c.name) ?? [];
}

export async function getRelatedNews(article: Article, max = 3): Promise<Article[]> {
  const all = await getAllNews();
  return all
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, max);
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
