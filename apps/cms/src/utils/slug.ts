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
  const transliterated = translit.transform(title, '-').toLowerCase();
  // Оставляем только латиницу/цифры/дефис; всё остальное (кавычки-ёлочки,
  // точки, скобки, неразрывные пробелы, эмодзи и т.п.) → дефис,
  // потом схлопываем повторы и срезаем по краям.
  const base = transliterated
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return `${base}-${formatDate(date)}`;
}
