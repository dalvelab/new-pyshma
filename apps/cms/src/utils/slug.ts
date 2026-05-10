/* Транслит RU→EN + дата дд-мм-гггг для slug-полей. */

import CyrillicToTranslit from 'cyrillic-to-translit-js';

const translit = CyrillicToTranslit();

function formatDate(d: Date): string {
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

export function buildSlug(title: string, date: Date): string {
  const cleaned = title.replace(/[,?]/gi, '');
  const base = translit.transform(cleaned, '-').toLowerCase();
  return `${base}-${formatDate(date)}`;
}
