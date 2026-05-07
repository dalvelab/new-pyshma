/* Thin Strapi REST wrapper.
   - Uses Next 14 fetch caching (`revalidate: 60`).
   - Returns null on failure so callers can fall back to mock data. */

const STRAPI_URL = process.env.STRAPI_URL;
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

interface FetchOpts {
  /** ISR-ish revalidate window in seconds */
  revalidate?: number;
  /** Strapi v4 query string (?populate=*&sort=publishedAt:desc&pagination[limit]=4) */
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
