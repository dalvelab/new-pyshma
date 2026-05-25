/* Поиск через Meilisearch. Индексы наполняет strapi-plugin-meilisearch
   (см. apps/cms/config/plugins.ts). Здесь — только чтение: один multi-search
   по 4 индексам, маппинг в SearchHit для SearchModal и /search.

   Если MEILI_HOST/MEILI_API_KEY не заданы (например, в dev без поднятого
   контейнера) — возвращаем пустой массив, страница рендерится без поиска. */

import { MeiliSearch } from 'meilisearch';
import { formatEkb } from './datetime';
import type { SearchHit } from './types';

const MEILI_HOST = process.env.MEILI_HOST;
const MEILI_API_KEY = process.env.MEILI_API_KEY;

const client =
  MEILI_HOST && MEILI_API_KEY
    ? new MeiliSearch({ host: MEILI_HOST, apiKey: MEILI_API_KEY })
    : null;

const PER_INDEX_LIMIT = 8;

interface ArticleHit {
  slug: string;
  title: string;
  excerpt?: string | null;
  categoryName?: string | null;
}
interface AfishaHit {
  slug: string;
  title: string;
  showSmallDescription?: string | null;
  showDescription?: string | null;
  locationName?: string | null;
  startsAt: string;
}
interface SportHit {
  slug: string;
  name: string;
  description?: string | null;
  age?: string | null;
  locationName?: string | null;
}
interface VacancyHit {
  slug: string;
  title: string;
  description?: string | null;
  salary?: string | null;
  schedule?: string | null;
}

export async function searchMeili(qRaw: string): Promise<SearchHit[]> {
  const q = qRaw.trim();
  if (!q || !client) return [];

  // matchingStrategy: 'all' заставляет Meili требовать все слова запроса;
  // без него Meili отбрасывает слова с конца и матчит частично — отсюда
  // мусорные результаты на длинных фразах.
  const res = await client.multiSearch({
    queries: [
      { indexUid: 'article', q, limit: PER_INDEX_LIMIT, matchingStrategy: 'all' },
      { indexUid: 'afisha', q, limit: PER_INDEX_LIMIT, matchingStrategy: 'all' },
      { indexUid: 'sport', q, limit: PER_INDEX_LIMIT, matchingStrategy: 'all' },
      { indexUid: 'vacancy', q, limit: PER_INDEX_LIMIT, matchingStrategy: 'all' },
    ],
  });

  const hits: SearchHit[] = [];
  for (const r of res.results) {
    if (r.indexUid === 'article') {
      for (const h of r.hits as ArticleHit[]) {
        hits.push({
          kind: 'news',
          slug: h.slug,
          title: h.title,
          subtitle: h.categoryName ?? undefined,
          excerpt: h.excerpt ?? undefined,
        });
      }
    } else if (r.indexUid === 'afisha') {
      for (const h of r.hits as AfishaHit[]) {
        const date = formatEkb(h.startsAt, {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
        });
        const parts = [h.locationName, date].filter(Boolean);
        hits.push({
          kind: 'event',
          slug: h.slug,
          title: h.title,
          subtitle: parts.join(' · ') || undefined,
          excerpt: h.showSmallDescription ?? h.showDescription ?? undefined,
        });
      }
    } else if (r.indexUid === 'sport') {
      for (const h of r.hits as SportHit[]) {
        const parts = [h.locationName, h.age].filter(Boolean);
        hits.push({
          kind: 'sport',
          slug: h.slug,
          title: h.name,
          subtitle: parts.join(' · ') || undefined,
          excerpt: h.description ?? undefined,
        });
      }
    } else if (r.indexUid === 'vacancy') {
      for (const h of r.hits as VacancyHit[]) {
        const parts = [h.salary, h.schedule].filter(Boolean);
        hits.push({
          kind: 'vacancy',
          slug: h.slug,
          title: h.title,
          subtitle: parts.join(' · ') || undefined,
          excerpt: h.description ?? undefined,
        });
      }
    }
  }
  return hits;
}
