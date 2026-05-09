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

export type EventCategory = 'концерт' | 'лекция' | 'спорт' | 'выставка' | 'фестиваль' | 'другое';

export interface Event {
  id: string;
  slug: string;
  title: string;
  startsAt: string; // ISO
  endsAt?: string;
  place: string;
  address?: string;
  category?: EventCategory;
  free: boolean;
  priceFrom?: number; // RUB
  description?: string;
  fallbackPattern?: Pattern;
  /** Координаты для карты (широта, долгота) */
  geo?: { lat: number; lng: number };
  /** Дополнительные изображения для галереи */
  gallery?: Pattern[];
}

/* ───────── Спорт ───────── */

export interface SportSection {
  id: string;
  slug: string;
  name: string;
  category?: 'единоборства' | 'плавание' | 'игровые' | 'циклические' | 'фитнес' | 'другое';
  venue: string;
  address?: string;
  age: string; // '6–17 лет'
  schedule: string; // 'пн, ср, пт'
  scheduleDetailed?: string[];
  description?: string;
  contacts?: { phone?: string; vk?: string; tg?: string };
  fallbackPattern?: Pattern;
  gallery?: Pattern[];
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
  salaryFrom?: number; // для фильтрации
  experience: string;
  schedule: string;
  employmentType?: EmploymentType;
  category?: 'медиа' | 'образование' | 'сервис' | 'спорт' | 'культура' | 'IT' | 'другое';
  publishedAt?: string;
  description?: string;
  responsibilities?: string[];
  requirements?: string[];
  perks?: string[];
  contacts?: { email?: string; phone?: string; tg?: string };
  fallbackPattern?: Pattern;
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
