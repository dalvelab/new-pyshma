/* Даты из Strapi приходят как ISO в UTC, а события идут в Екатеринбурге.
   Серверный рендер Next.js работает в TZ хоста (на Vercel — UTC), поэтому
   `getHours()` / `toLocaleString()` без `timeZone` сдвигают время.
   Любое отображение даты с CMS обязано идти через эти хелперы. */

export const EKB_TIMEZONE = 'Asia/Yekaterinburg';

export interface EkbParts {
  year: number;
  month: number; // 1..12
  day: number;
  hours: number;
  minutes: number;
  weekday: number; // 0..6, как Date#getDay() (0 = воскресенье)
}

const partsFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: EKB_TIMEZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});

export function getEkbParts(iso: string): EkbParts {
  const parts = partsFormatter.formatToParts(new Date(iso));
  const map: Record<string, string> = {};
  for (const p of parts) map[p.type] = p.value;
  const year = Number(map.year);
  const month = Number(map.month);
  const day = Number(map.day);
  // День недели вычисляем из локальной EKB-даты, упакованной в UTC —
  // так избегаем зависимости от формата `weekday: 'short'`.
  const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  return {
    year,
    month,
    day,
    hours: Number(map.hour),
    minutes: Number(map.minute),
    weekday,
  };
}

/** Локальный ключ YYYY-MM-DD в часовом поясе Екатеринбурга. */
export function ekbDayKey(iso: string): string {
  const p = getEkbParts(iso);
  return `${p.year}-${String(p.month).padStart(2, '0')}-${String(p.day).padStart(2, '0')}`;
}

/** Обёртка над Intl.DateTimeFormat с принудительным TZ Екатеринбурга. */
export function formatEkb(
  iso: string,
  options: Intl.DateTimeFormatOptions,
  locale = 'ru-RU',
): string {
  return new Intl.DateTimeFormat(locale, { ...options, timeZone: EKB_TIMEZONE }).format(
    new Date(iso),
  );
}
