'use client';

import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Pill } from '@/components/ui/Pill';
import type { Vacancy } from '@/lib/types';

interface Props {
  items: Vacancy[];
  categories: string[];
}

const ALL = 'все';
const TYPES: Array<typeof ALL | NonNullable<Vacancy['employmentType']>> = [
  ALL,
  'полный день',
  'неполный день',
  'удалённо',
  'сменный график',
  'проект',
];

export function VacanciesListing({ items, categories }: Props) {
  const cats = useMemo(() => [ALL, ...categories], [categories]);
  const [cat, setCat] = useState<string>(ALL);
  const [type, setType] = useState<(typeof TYPES)[number]>(ALL);

  const filtered = useMemo(
    () =>
      items.filter((v) => {
        if (cat !== ALL && v.category !== cat) return false;
        if (type !== ALL && v.employmentType !== type) return false;
        return true;
      }),
    [items, cat, type],
  );

  const selectCls =
    'w-full border-1.5 border-ink rounded-lg bg-cream px-3 py-2.5 font-semibold text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent';

  return (
    <section className="px-4 md:px-9 py-9 max-w-page mx-auto">
      <div className="mb-7">
        {/* Мобильный/планшетный вид: два <select> */}
        <div className="flex flex-col sm:flex-row gap-3 lg:hidden">
          <label className="flex-1 flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-[0.1em] text-ink-50">сфера</span>
            <select value={cat} onChange={(e) => setCat(e.target.value)} className={selectCls}>
              {cats.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="flex-1 flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-[0.1em] text-ink-50">формат</span>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as (typeof TYPES)[number])}
              className={selectCls}
            >
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Десктоп: чипы */}
        <div className="hidden lg:flex flex-col gap-3">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-bold uppercase tracking-[0.1em] text-ink-50 mr-2">
              сфера:
            </span>
            {cats.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                className={`px-3.5 py-2 rounded-full border-1.5 border-ink font-semibold text-xs cursor-pointer btn-hover ${cat === c ? 'bg-accent text-white' : 'bg-cream text-ink'}`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-bold uppercase tracking-[0.1em] text-ink-50 mr-2">
              формат:
            </span>
            {TYPES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`px-3.5 py-2 rounded-full border-1.5 border-ink font-semibold text-xs cursor-pointer btn-hover ${type === t ? 'bg-ink text-cream' : 'bg-cream text-ink'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="border-1.5 border-dashed border-ink-30 rounded-xl p-10 text-center text-ink-70">
          Под фильтры ничего не подошло. Попробуйте сбросить параметры.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((v) => (
            <a key={v.id} href={`/vacancies/${v.slug}`} className="block">
              <Card className="p-5 flex flex-col gap-2.5 h-full">
                <div className="flex items-center gap-2 flex-wrap">
                  {v.category && <Pill variant="light">{v.category}</Pill>}
                </div>
                <h3 className="font-extrabold text-[20px] leading-[1.18] m-0">{v.title}</h3>
                {v.company && <div className="text-sm text-ink-70">{v.company}</div>}
                <div className="mt-auto flex items-center justify-between pt-2 gap-2">
                  <span className="text-xs text-ink-50">
                    {v.experience} · {v.employmentType ?? v.schedule}
                  </span>
                  <span className="px-2.5 py-1.5 rounded-full bg-accent text-white font-bold text-xs whitespace-nowrap">
                    {v.salary}
                  </span>
                </div>
              </Card>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
