/* Автогенерация slug для карточек «истории» (компонент about.history-item
   внутри single type About Page): slug = транслит(title), без даты — карточек
   мало и адрес должен быть стабильным. Дубли внутри списка получают -2, -3, …

   Подключается как middleware document service (см. src/index.ts): db-lifecycle
   контент-типа в Strapi 5 данные компонентов уже не видит. */

import { slugify } from './slug';

interface HistoryInput {
  title?: string;
  slug?: string | null;
  [key: string]: unknown;
}

export function assignHistorySlugs(history: unknown): void {
  if (!Array.isArray(history)) return;
  const used = new Set<string>();
  for (const item of history as HistoryInput[]) {
    if (!item || typeof item !== 'object') continue;
    const base = item.title ? slugify(item.title) : '';
    if (!base) continue;
    let slug = base;
    for (let n = 2; used.has(slug); n += 1) slug = `${base}-${n}`;
    used.add(slug);
    item.slug = slug;
  }
}
