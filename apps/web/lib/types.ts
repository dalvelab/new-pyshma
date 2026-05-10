/* Strapi-shaped types for всех страниц портала.
   Adjust to your actual schema if it diverges. */

export type Pattern = 'diag' | 'dots' | 'cross' | 'warm' | 'block' | 'sun' | 'zigzag';

/* ───────── News ───────── */

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string; // 'город' | 'культура' | 'спорт' | 'афиша' | 'главное' …
  createdAt: string; // ISO
  readingTime?: number; // minutes
  cover: { url: string; alt?: string };
  isLead?: boolean;
  /** Markdown — рендерится на странице новости (на листинге не используется) */
  body?: string;
  /** Короткий лид для листинга/детальной */
  excerpt?: string;
}

/* ───────── Events / Афиша ───────── */

export interface Event {
  id: string;
  slug: string;
  title: string;
  startsAt: string; // ISO
  place: string;
  address?: string;
  free: boolean;
  priceFrom?: number; // RUB
  /** Короткое описание для карточки и шапки страницы */
  description?: string;
  /** Длинное описание (markdown) для страницы события */
  body?: string;
  cover: { url: string; alt?: string };
  ageLimit?: number;
  /** Ссылка на покупку билета */
  ticketUrl?: string;
  /** Дополнительные фото события (до 10) */
  gallery?: { url: string; alt?: string }[];
}

/* ───────── Спорт ───────── */

export interface Sport {
  id: string;
  slug: string;
  name: string;
  /** Имя категории из Strapi SportCategory */
  category?: string;
  venue: string;
  address?: string;
  age: string; // '6–17 лет'
  schedule: string; // 'пн, ср, пт'
  /** Markdown — рендерится через Markdown-компонент */
  scheduleDetailed?: string;
  description?: string;
  cover?: { url: string; alt?: string };
  gallery?: { url: string; alt?: string }[];
  contact?: { phone?: string; vk?: string; telegram?: string; email?: string };
}

/* ───────── Вакансии ───────── */

export type EmploymentType =
  | 'полный день'
  | 'неполный день'
  | 'удалённо'
  | 'сменный график'
  | 'проект';

export interface Vacancy {
  id: string;
  slug: string;
  title: string;
  company?: string;
  salary: string; // 'от 45 000 ₽'
  experience: string;
  schedule: string;
  employmentType?: EmploymentType;
  /** Имя категории из Strapi VacancyCategory */
  category?: string;
  description?: string;
  /** Markdown — рендерится через Markdown-компонент */
  responsibilities?: string;
  requirements?: string;
  /** Внешняя ссылка для отклика (hh, форма и т.п.) */
  applyUrl?: string;
  contact?: { email?: string; phone?: string; telegram?: string };
}

/* ───────── Фестиваль ───────── */

export interface FestivalTeaser {
  date: string; // '12 мая'
  weekday: string; // 'воскресенье'
  ctaUrl: string;
}

export interface FestivalScene {
  id: string;
  name: string;
  description?: string;
}

export interface FestivalActivity {
  id: string;
  startsAt: string; // ISO
  endsAt?: string;
  sceneId: string; // ссылка на FestivalScene.id
  title: string;
  performer?: string;
  category?: 'музыка' | 'лекция' | 'детям' | 'еда' | 'спорт' | 'мастер-класс';
}

export interface FestivalVenue {
  id: string;
  name: string;
  description: string;
  fallbackPattern?: Pattern;
}

export interface FestivalPastYear {
  year: number;
  title: string; // короткий заголовок-итог
  lead?: string; // абзац-описание
  stats?: Array<{ v: string; l: string }>;
  fallbackPattern?: Pattern;
}

export interface FestivalLanding {
  date: string;
  startsAt: string; // ISO datetime — момент старта для обратного отсчёта
  weekday: string;
  city: string;
  tagline: string;
  intro: string;
  scenes: FestivalScene[];
  activities: FestivalActivity[];
  venues: FestivalVenue[];
  partners: string[];
  pastYears: FestivalPastYear[];
  faq?: Array<{ q: string; a: string }>;
}

/* ───────── Поиск ───────── */

export type SearchKind = 'news' | 'event' | 'sport' | 'vacancy';

export interface SearchHit {
  kind: SearchKind;
  slug: string;
  title: string;
  subtitle?: string; // дата, площадка, рубрика
  excerpt?: string;
  pattern?: Pattern;
}
