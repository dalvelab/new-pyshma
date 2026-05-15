/** Shared formatters used across the home blocks.
    Pure ru-RU; replace with date-fns/intl if your i18n grows.
    Все даты приводятся к часовому поясу Екатеринбурга — см. lib/datetime.ts. */

import { getEkbParts } from '@/lib/datetime';

const MONTHS_SHORT = [
  'ЯНВ',
  'ФЕВ',
  'МАР',
  'АПР',
  'МАЙ',
  'ИЮН',
  'ИЮЛ',
  'АВГ',
  'СЕН',
  'ОКТ',
  'НОЯ',
  'ДЕК',
];
const WEEKDAYS_SHORT = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];

export function formatNewsTime(iso: string) {
  const p = getEkbParts(iso);
  const day = String(p.day).padStart(2, '0');
  const month = String(p.month).padStart(2, '0');
  const hh = String(p.hours).padStart(2, '0');
  const mm = String(p.minutes).padStart(2, '0');
  return `${day}.${month} · ${hh}:${mm}`;
}

export function formatNewsDate(iso: string) {
  const p = getEkbParts(iso);
  const day = String(p.day).padStart(2, '0');
  const month = String(p.month).padStart(2, '0');
  return `${day}.${month}`;
}

export function formatEventDate(iso: string) {
  const p = getEkbParts(iso);
  const day = String(p.day).padStart(2, '0');
  return `${day} ${MONTHS_SHORT[p.month - 1]} · ${WEEKDAYS_SHORT[p.weekday]}`;
}
