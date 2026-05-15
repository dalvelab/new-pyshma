/* Тонкая обёртка над REST API Strapi v5.
   - Возвращает `data` из ответа (Strapi v5 не оборачивает атрибуты в `attributes`).
   - Кеш Next.js через `revalidate` (REVALIDATE_SECONDS — короче в dev).
   - На 4xx (конфигурационная ошибка) → `null`, страница рендерится с пустотой.
   - На 5xx / network error → 1 ретрай через 500мс, затем throw — Next не зафиксирует
     пустую страницу в ISR-кеше, при следующем запросе попробует заново. */

import { REVALIDATE_SECONDS } from './cache';

export const STRAPI_URL = process.env.STRAPI_URL;
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

export interface StrapiMedia {
  id: number;
  documentId?: string;
  url: string;
  alternativeText?: string | null;
  name?: string;
  width?: number;
  height?: number;
}

export interface StrapiEntry {
  id: number;
  documentId: string;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
}

interface FetchOpts {
  /** ISR-окно в секундах (по умолчанию REVALIDATE_SECONDS). */
  revalidate?: number;
  /** Query-string Strapi v5 (?populate=*&sort=publishedAt:desc&pagination[limit]=4) */
  query?: string;
}

const RETRY_DELAY_MS = 500;

async function fetchRaw(url: string, opts: FetchOpts, attempt: number): Promise<Response> {
  return fetch(url, {
    headers: STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {},
    // Первую попытку кешируем штатно. Ретрай — без кеша, чтобы обойти fetch-dedup
    // и реально перепопросить Strapi.
    ...(attempt === 0
      ? { next: { revalidate: opts.revalidate ?? REVALIDATE_SECONDS } }
      : { cache: 'no-store' as const }),
  });
}

/** Внутренний раннер: делает fetch с одним ретраем при 5xx/network. */
async function runFetch(url: string, opts: FetchOpts): Promise<Response | null> {
  let lastError: unknown = null;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const res = await fetchRaw(url, opts, attempt);
      // 4xx — стабильная клиентская/конфигурационная ошибка, не ретраим
      if (!res.ok && res.status < 500) return res;
      if (res.ok) return res;
      lastError = new Error(`Strapi ${res.status} for ${url}`);
    } catch (err) {
      lastError = err;
    }
    if (attempt === 0) await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
  }
  throw lastError ?? new Error(`Strapi unreachable: ${url}`);
}

export async function fetchStrapi<T>(collection: string, opts: FetchOpts = {}): Promise<T | null> {
  if (!STRAPI_URL) return null;
  const url = `${STRAPI_URL}/api/${collection}${opts.query ?? ''}`;
  const res = await runFetch(url, opts);
  if (!res || !res.ok) return null;
  const json = await res.json();
  return (json.data ?? json) as T;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiPage<T> {
  data: T[];
  meta: { pagination: PaginationMeta };
}

/** Возвращает целиком ответ Strapi коллекции, включая meta.pagination. */
export async function fetchStrapiPage<T>(
  collection: string,
  opts: FetchOpts = {},
): Promise<StrapiPage<T> | null> {
  if (!STRAPI_URL) return null;
  const url = `${STRAPI_URL}/api/${collection}${opts.query ?? ''}`;
  const res = await runFetch(url, opts);
  if (!res || !res.ok) return null;
  return (await res.json()) as StrapiPage<T>;
}

/** Делает абсолютный URL из относительного `/uploads/...`, который отдаёт локальный провайдер Strapi. */
export function absoluteMediaUrl(url?: string | null): string | undefined {
  if (!url) return undefined;
  if (/^https?:\/\//.test(url)) return url;
  if (!STRAPI_URL) return url;
  return `${STRAPI_URL}${url.startsWith('/') ? '' : '/'}${url}`;
}
