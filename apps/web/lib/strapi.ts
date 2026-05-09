/* Тонкая обёртка над REST API Strapi v5.
   - Возвращает `data` из ответа (Strapi v5 не оборачивает атрибуты в `attributes`).
   - Кеш Next.js через `revalidate` (по умолчанию 60 сек).
   - На любой ошибке отдаёт `null`, чтобы вызывающий код мог откатиться на mock. */

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
  /** ISR-окно в секундах (по умолчанию 60) */
  revalidate?: number;
  /** Query-string Strapi v5 (?populate=*&sort=publishedAt:desc&pagination[limit]=4) */
  query?: string;
}

export async function fetchStrapi<T>(collection: string, opts: FetchOpts = {}): Promise<T | null> {
  if (!STRAPI_URL) return null;
  const url = `${STRAPI_URL}/api/${collection}${opts.query ?? ''}`;
  try {
    const res = await fetch(url, {
      headers: STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {},
      next: { revalidate: opts.revalidate ?? 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return (json.data ?? json) as T;
  } catch {
    return null;
  }
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
  try {
    const res = await fetch(url, {
      headers: STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {},
      next: { revalidate: opts.revalidate ?? 60 },
    });
    if (!res.ok) return null;
    return (await res.json()) as StrapiPage<T>;
  } catch {
    return null;
  }
}

/** Делает абсолютный URL из относительного `/uploads/...`, который отдаёт локальный провайдер Strapi. */
export function absoluteMediaUrl(url?: string | null): string | undefined {
  if (!url) return undefined;
  if (/^https?:\/\//.test(url)) return url;
  if (!STRAPI_URL) return url;
  return `${STRAPI_URL}${url.startsWith('/') ? '' : '/'}${url}`;
}
