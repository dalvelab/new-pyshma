import {
  absoluteMediaUrl,
  fetchStrapi,
  fetchStrapiPage,
  type StrapiEntry,
  type StrapiMedia,
} from './strapi';
import type {
  AboutPage,
  Article,
  Event,
  FestivalLanding,
  FestivalProgram,
  FestivalTeaser,
  FooterData,
  HistoryItem,
  PageIntros,
  PastFestival,
  SocialPlatform,
  Sport,
  Vacancy,
} from './types';

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
  // lifecycle гарантирует единственного лида, sort на случай дрейфа БД
  const remote = await fetchStrapi<StrapiArticle[]>('articles', {
    query: `?filters[isLead][$eq]=true&sort=createdAt:desc&pagination[limit]=1&${ARTICLE_POPULATE}`,
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
}

export async function getAllCategories(): Promise<string[]> {
  const remote = await fetchStrapi<StrapiCategory[]>('categories', {
    query: '?sort=name:asc&pagination[limit]=100',
  });
  return remote?.map((c) => c.name) ?? [];
}

/* ──────────────── Events / Афиша ────────────────
   Источник правды — Strapi Afisha (привязка показа к локации/билету).
   Show хранит сам контент (постер, описание), Location — площадку. */

interface StrapiShow extends StrapiEntry {
  title: string;
  slug: string;
  age_limit?: number | null;
  small_description?: string | null;
  description?: string | null;
  image?: StrapiMedia | null;
  gallery?: StrapiMedia[] | null;
}

interface StrapiLocation extends StrapiEntry {
  name: string;
  address: string;
  link?: string | null;
}

interface StrapiAfisha extends StrapiEntry {
  title: string;
  slug: string;
  startsAt: string;
  ticketUrl?: string | null;
  free?: boolean | null;
  priceFrom?: number | null;
  show?: StrapiShow | null;
  location?: StrapiLocation | null;
}

function mapAfisha(entry: StrapiAfisha): Event {
  const coverUrl = absoluteMediaUrl(entry.show?.image?.url) ?? '';
  const gallery = entry.show?.gallery
    ?.slice(0, 10)
    .map((m) => ({
      url: absoluteMediaUrl(m.url) ?? '',
      alt: m.alternativeText ?? undefined,
    }))
    .filter((m) => m.url);
  return {
    id: String(entry.id),
    slug: entry.slug,
    title: entry.title || entry.show?.title || '',
    startsAt: entry.startsAt ?? entry.createdAt ?? new Date().toISOString(),
    place: entry.location?.name ?? '',
    address: entry.location?.address ?? undefined,
    free: entry.free ?? false,
    priceFrom: entry.priceFrom ?? undefined,
    description: entry.show?.small_description ?? undefined,
    body: entry.show?.description ?? undefined,
    cover: {
      url: coverUrl,
      alt: entry.show?.image?.alternativeText ?? entry.show?.title ?? entry.title,
      width: entry.show?.image?.width ?? undefined,
      height: entry.show?.image?.height ?? undefined,
    },
    ageLimit: entry.show?.age_limit ?? undefined,
    ticketUrl: entry.ticketUrl ?? undefined,
    gallery: gallery?.length ? gallery : undefined,
  };
}

const AFISHA_POPULATE =
  'populate[show][populate][image]=true' +
  '&populate[show][populate][gallery]=true' +
  '&populate[location]=true';

export async function getAllEvents(): Promise<Event[]> {
  const remote = await fetchStrapi<StrapiAfisha[]>('afishas', {
    query: `?sort=startsAt:asc&pagination[limit]=100&${AFISHA_POPULATE}`,
  });
  return remote?.map(mapAfisha) ?? [];
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  const remote = await fetchStrapi<StrapiAfisha[]>('afishas', {
    query: `?filters[slug][$eq]=${encodeURIComponent(slug)}&${AFISHA_POPULATE}`,
  });
  return remote?.[0] ? mapAfisha(remote[0]) : null;
}

/** Ближайшие события (для главной) — только будущие, отсортированы по дате. */
export async function getUpcomingEvents(limit = 4): Promise<Event[]> {
  const now = new Date().toISOString();
  const remote = await fetchStrapi<StrapiAfisha[]>('afishas', {
    query:
      `?filters[startsAt][$gte]=${encodeURIComponent(now)}` +
      `&sort=startsAt:asc&pagination[limit]=${limit}&${AFISHA_POPULATE}`,
  });
  return remote?.map(mapAfisha) ?? [];
}

/* ──────────────── Sport ──────────────── */

interface StrapiSport extends StrapiEntry {
  name: string;
  slug: string;
  age: string;
  schedule: string;
  scheduleDetailed?: string | null;
  description?: string | null;
  category?: { name: string } | null;
  location?: StrapiLocation | null;
  cover?: StrapiMedia | null;
  gallery?: StrapiMedia[] | null;
  contact?: {
    phone?: string | null;
    email?: string | null;
    telegram?: string | null;
    vk?: string | null;
  } | null;
}

function mapSport(entry: StrapiSport): Sport {
  const coverUrl = absoluteMediaUrl(entry.cover?.url);
  const gallery = entry.gallery
    ?.map((m) => ({
      url: absoluteMediaUrl(m.url) ?? '',
      alt: m.alternativeText ?? undefined,
    }))
    .filter((m) => m.url);
  return {
    id: String(entry.id),
    slug: entry.slug,
    name: entry.name,
    category: entry.category?.name ?? undefined,
    venue: entry.location?.name ?? '',
    address: entry.location?.address ?? undefined,
    age: entry.age,
    schedule: entry.schedule,
    scheduleDetailed: entry.scheduleDetailed ?? undefined,
    description: entry.description ?? undefined,
    cover: coverUrl
      ? { url: coverUrl, alt: entry.cover?.alternativeText ?? entry.name }
      : undefined,
    gallery: gallery?.length ? gallery : undefined,
    contact: entry.contact
      ? {
          email: entry.contact.email ?? undefined,
          phone: entry.contact.phone ?? undefined,
          telegram: entry.contact.telegram ?? undefined,
          vk: entry.contact.vk ?? undefined,
        }
      : undefined,
  };
}

const SPORT_POPULATE =
  'populate[category]=true' +
  '&populate[location]=true' +
  '&populate[cover]=true' +
  '&populate[gallery]=true' +
  '&populate[contact]=true';

export async function getAllSport(): Promise<Sport[]> {
  const remote = await fetchStrapi<StrapiSport[]>('sports', {
    query: `?sort=name:asc&pagination[limit]=100&${SPORT_POPULATE}`,
  });
  return remote?.map(mapSport) ?? [];
}

export async function getLatestSport(limit = 5): Promise<Sport[]> {
  const remote = await fetchStrapi<StrapiSport[]>('sports', {
    query: `?sort=createdAt:desc&pagination[limit]=${limit}&${SPORT_POPULATE}`,
  });
  return remote?.map(mapSport) ?? [];
}

export async function getSportBySlug(slug: string): Promise<Sport | null> {
  const remote = await fetchStrapi<StrapiSport[]>('sports', {
    query: `?filters[slug][$eq]=${encodeURIComponent(slug)}&${SPORT_POPULATE}`,
  });
  return remote?.[0] ? mapSport(remote[0]) : null;
}

interface StrapiSportCategory extends StrapiEntry {
  name: string;
}

export async function getAllSportCategories(): Promise<string[]> {
  const remote = await fetchStrapi<StrapiSportCategory[]>('sport-categories', {
    query: '?sort=name:asc&pagination[limit]=100',
  });
  return remote?.map((c) => c.name) ?? [];
}

/* ──────────────── Vacancies ──────────────── */

interface StrapiVacancy extends StrapiEntry {
  title: string;
  slug: string;
  company?: string | null;
  salary: string;
  experience: string;
  schedule: string;
  employmentType?: string | null;
  category?: { name: string } | null;
  description?: string | null;
  responsibilities?: string | null;
  requirements?: string | null;
  applyUrl?: string | null;
  contact?: { email?: string | null; phone?: string | null; telegram?: string | null } | null;
}

function mapVacancy(entry: StrapiVacancy): Vacancy {
  return {
    id: String(entry.id),
    slug: entry.slug,
    title: entry.title,
    company: entry.company ?? undefined,
    salary: entry.salary,
    experience: entry.experience,
    schedule: entry.schedule,
    employmentType: (entry.employmentType ?? undefined) as Vacancy['employmentType'],
    category: entry.category?.name ?? undefined,
    description: entry.description ?? undefined,
    responsibilities: entry.responsibilities ?? undefined,
    requirements: entry.requirements ?? undefined,
    applyUrl: entry.applyUrl ?? undefined,
    contact: entry.contact
      ? {
          email: entry.contact.email ?? undefined,
          phone: entry.contact.phone ?? undefined,
          telegram: entry.contact.telegram ?? undefined,
        }
      : undefined,
  };
}

const VACANCY_POPULATE = 'populate[category]=true&populate[contact]=true';

export async function getAllVacancies(): Promise<Vacancy[]> {
  const remote = await fetchStrapi<StrapiVacancy[]>('vacancies', {
    query: `?sort=createdAt:desc&pagination[limit]=100&${VACANCY_POPULATE}`,
  });
  return remote?.map(mapVacancy) ?? [];
}

export async function getLatestVacancies(limit = 5): Promise<Vacancy[]> {
  const remote = await fetchStrapi<StrapiVacancy[]>('vacancies', {
    query: `?sort=createdAt:desc&pagination[limit]=${limit}&${VACANCY_POPULATE}`,
  });
  return remote?.map(mapVacancy) ?? [];
}

/** Похожие вакансии: тот же `category`, без текущей; фильтр на стороне Strapi. */
export async function getSimilarVacancies(args: {
  category?: string;
  excludeSlug: string;
  limit?: number;
}): Promise<Vacancy[]> {
  const { category, excludeSlug, limit = 3 } = args;
  const parts = [`filters[slug][$ne]=${encodeURIComponent(excludeSlug)}`];
  if (category) parts.push(`filters[category][name][$eq]=${encodeURIComponent(category)}`);
  parts.push(`pagination[limit]=${limit}`);
  parts.push('sort=createdAt:desc');
  // Тонкий populate: для карточки нужно лишь имя категории.
  parts.push('populate[category]=true');
  const remote = await fetchStrapi<StrapiVacancy[]>('vacancies', {
    query: `?${parts.join('&')}`,
  });
  return remote?.map(mapVacancy) ?? [];
}

export async function getVacancyBySlug(slug: string): Promise<Vacancy | null> {
  const remote = await fetchStrapi<StrapiVacancy[]>('vacancies', {
    query: `?filters[slug][$eq]=${encodeURIComponent(slug)}&${VACANCY_POPULATE}`,
  });
  return remote?.[0] ? mapVacancy(remote[0]) : null;
}

interface StrapiVacancyCategory extends StrapiEntry {
  name: string;
}

export async function getAllVacancyCategories(): Promise<string[]> {
  const remote = await fetchStrapi<StrapiVacancyCategory[]>('vacancy-categories', {
    query: '?sort=name:asc&pagination[limit]=100',
  });
  return remote?.map((c) => c.name) ?? [];
}

/* ──────────────── Festival landing ──────────────── */

interface StrapiFestivalStat {
  id: number;
  value: string;
  label: string;
}

interface StrapiFestivalFaq {
  id: number;
  question: string;
  answer: string;
}

interface StrapiFestivalPartner {
  id: number;
  name: string;
  logo?: StrapiMedia | null;
  url?: string | null;
}

interface StrapiFestival extends StrapiEntry {
  date: string;
  startsAt: string;
  endsAt?: string | null;
  city: string;
  intro: string;
  seasonLabel?: string | null;
  marquee?: string | null;
  mapImage?: StrapiMedia | null;
  poster?: StrapiMedia | null;
  faq?: StrapiFestivalFaq[] | null;
  partners?: StrapiFestivalPartner[] | null;
}

const FESTIVAL_POPULATE =
  'populate[faq]=true&populate[mapImage]=true&populate[poster]=true&populate[partners][populate]=logo';

function mapFestival(entry: StrapiFestival): FestivalLanding {
  return {
    date: entry.date,
    startsAt: entry.startsAt,
    endsAt: entry.endsAt ?? undefined,
    city: entry.city,
    intro: entry.intro,
    seasonLabel: entry.seasonLabel ?? undefined,
    mapImage: entry.mapImage
      ? {
          url: absoluteMediaUrl(entry.mapImage.url) ?? '',
          alt: entry.mapImage.alternativeText ?? 'Карта фестиваля',
        }
      : undefined,
    poster: entry.poster
      ? {
          url: absoluteMediaUrl(entry.poster.url) ?? '',
          alt: entry.poster.alternativeText ?? 'Постер фестиваля',
        }
      : undefined,
    faq: entry.faq?.map((f) => ({ q: f.question, a: f.answer })) ?? undefined,
    partners:
      entry.partners
        ?.filter((p) => p.logo)
        .map((p) => ({
          name: p.name,
          logo: {
            url: absoluteMediaUrl(p.logo?.url) ?? '',
            alt: p.logo?.alternativeText ?? p.name,
          },
          url: p.url ?? undefined,
        })) ?? undefined,
  };
}

export async function getFestival(): Promise<FestivalLanding | null> {
  const remote = await fetchStrapi<StrapiFestival>('festival', { query: `?${FESTIVAL_POPULATE}` });
  return remote ? mapFestival(remote) : null;
}

interface StrapiPastFestival extends StrapiEntry {
  year: number;
  title: string;
  lead?: string | null;
  image?: StrapiMedia | null;
  stats?: StrapiFestivalStat[] | null;
}

export async function getPastFestivals(): Promise<PastFestival[]> {
  const remote = await fetchStrapi<StrapiPastFestival[]>('past-festivals', {
    query:
      '?sort=year:desc&pagination[limit]=50' +
      '&populate[image]=true&populate[stats]=true',
  });
  return (
    remote?.map((y) => ({
      year: y.year,
      title: y.title,
      lead: y.lead ?? undefined,
      image: {
        url: absoluteMediaUrl(y.image?.url) ?? '',
        alt: y.image?.alternativeText ?? `${y.year}`,
      },
      stats: y.stats?.map((s) => ({ v: s.value, l: s.label })),
    })) ?? []
  );
}

/** Лёгкий тизер для главной — дата + бегущая строка. */
export async function getFestivalTeaser(): Promise<FestivalTeaser | null> {
  const [remote, past] = await Promise.all([
    fetchStrapi<StrapiFestival>('festival', {
      query: '?fields[0]=date&fields[1]=marquee',
    }),
    fetchStrapi<StrapiPastFestival[]>('past-festivals', {
      query: '?fields[0]=year&pagination[limit]=1',
    }),
  ]);
  if (!remote) return null;
  const marquee = (remote.marquee ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  return { date: remote.date, marquee, hasPast: (past?.length ?? 0) > 0 };
}

/* ──────────────── Festival programs ──────────────── */

interface StrapiFestivalProgram extends StrapiEntry {
  title: string;
  slug: string;
  date: string;
  body?: string | null;
  cover?: StrapiMedia | null;
  location?: StrapiLocation | null;
}

const PROGRAM_POPULATE = 'populate[cover]=true&populate[location]=true';

function mapFestivalProgram(entry: StrapiFestivalProgram): FestivalProgram {
  return {
    id: String(entry.id),
    slug: entry.slug,
    title: entry.title,
    date: entry.date,
    cover: {
      url: absoluteMediaUrl(entry.cover?.url) ?? '',
      alt: entry.cover?.alternativeText ?? entry.title,
    },
    body: entry.body ?? undefined,
    location: {
      name: entry.location?.name ?? '',
      address: entry.location?.address ?? undefined,
    },
  };
}

export async function getFestivalPrograms(): Promise<FestivalProgram[]> {
  const remote = await fetchStrapi<StrapiFestivalProgram[]>('festival-programs', {
    query: `?sort=date:asc&pagination[limit]=200&${PROGRAM_POPULATE}`,
  });
  return remote?.map(mapFestivalProgram) ?? [];
}

export async function getFestivalProgramBySlug(slug: string): Promise<FestivalProgram | null> {
  const remote = await fetchStrapi<StrapiFestivalProgram[]>('festival-programs', {
    query: `?filters[slug][$eq]=${encodeURIComponent(slug)}&${PROGRAM_POPULATE}`,
  });
  return remote?.[0] ? mapFestivalProgram(remote[0]) : null;
}

/* ──────────────── Тексты страниц ────────────────
   Single type в Strapi: один редактируемый источник вступительных текстов.
   Поля необязательны — пустое/отсутствующее значение не показывается. */

interface StrapiPageIntro extends StrapiEntry {
  festTeaserIntro?: string | null;
  afishaIntro?: string | null;
  vacanciesIntro?: string | null;
  sportIntro?: string | null;
}

/** Нормализует строку: пустое/пробельное значение → undefined. */
function cleanIntro(value: string | null | undefined): string | undefined {
  return value?.trim() || undefined;
}

export async function getPageIntros(): Promise<PageIntros> {
  const remote = await fetchStrapi<StrapiPageIntro>('page-intro');
  if (!remote) return {};
  return {
    festTeaserIntro: cleanIntro(remote.festTeaserIntro),
    afishaIntro: cleanIntro(remote.afishaIntro),
    vacanciesIntro: cleanIntro(remote.vacanciesIntro),
    sportIntro: cleanIntro(remote.sportIntro),
  };
}

/* ──────────────── О проекте ────────────────
   Single type: hero-текст, блок о команде и повторяющийся компонент «история». */

interface StrapiHistoryItem {
  id: number;
  slug: string;
  year: string;
  title: string;
  body?: string | null;
  image?: StrapiMedia | null;
}

interface StrapiAboutPage extends StrapiEntry {
  heroIntro?: string | null;
  story?: string | null;
  image?: StrapiMedia | null;
  history?: StrapiHistoryItem[] | null;
}

const ABOUT_POPULATE = 'populate[image]=true&populate[history][populate]=image';

function mapHistoryItem(entry: StrapiHistoryItem): HistoryItem {
  return {
    slug: entry.slug,
    year: entry.year,
    title: entry.title,
    body: entry.body ?? '',
    image: entry.image
      ? {
          url: absoluteMediaUrl(entry.image.url) ?? '',
          alt: entry.image.alternativeText ?? entry.title,
        }
      : undefined,
  };
}

export async function getAboutPage(): Promise<AboutPage | null> {
  const remote = await fetchStrapi<StrapiAboutPage>('about-page', {
    query: `?${ABOUT_POPULATE}`,
  });
  if (!remote) return null;
  return {
    heroIntro: cleanIntro(remote.heroIntro),
    story: remote.story ?? '',
    image: remote.image
      ? {
          url: absoluteMediaUrl(remote.image.url) ?? '',
          alt: remote.image.alternativeText ?? 'Новая Пышма',
        }
      : undefined,
    history: remote.history?.map(mapHistoryItem) ?? [],
  };
}

export async function getHistoryItemBySlug(slug: string): Promise<HistoryItem | null> {
  const about = await getAboutPage();
  return about?.history.find((h) => h.slug === slug) ?? null;
}

/* ──────────────── Footer ──────────────── */

interface StrapiFooterDocument {
  id: number;
  name: string;
  file?: StrapiMedia | null;
}

interface StrapiFooterSocial {
  id: number;
  platform: SocialPlatform;
  url: string;
}

interface StrapiFooter extends StrapiEntry {
  documents?: StrapiFooterDocument[] | null;
  socials?: StrapiFooterSocial[] | null;
}

const FOOTER_POPULATE =
  'populate[documents][populate][file]=true&populate[socials]=true';

export async function getFooter(): Promise<FooterData | null> {
  const remote = await fetchStrapi<StrapiFooter>('footer', {
    query: `?${FOOTER_POPULATE}`,
  });
  if (!remote) return null;
  return {
    documents: (remote.documents ?? [])
      .map((d) => ({ name: d.name, url: absoluteMediaUrl(d.file?.url) ?? '' }))
      .filter((d) => d.url),
    socials: (remote.socials ?? []).map((s) => ({ platform: s.platform, url: s.url })),
  };
}

