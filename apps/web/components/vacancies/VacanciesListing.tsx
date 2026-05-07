'use client';

import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Pill } from '@/components/ui/Pill';
import type { Vacancy } from '@/lib/types';

interface Props {
  items: Vacancy[];
}

const CATS: Array<'все' | NonNullable<Vacancy['category']>> = [
  'все',
  'медиа',
  'образование',
  'сервис',
  'спорт',
  'культура',
  'IT',
  'другое',
];
const TYPES: Array<'все' | NonNullable<Vacancy['employmentType']>> = [
  'все',
  'полный день',
  'неполный день',
  'удалённо',
  'сменный график',
  'проект',
];

export function VacanciesListing({ items }: Props) {
  const [cat, setCat] = useState<(typeof CATS)[number]>('все');
  const [type, setType] = useState<(typeof TYPES)[number]>('все');
  const [salary, setSalary] = useState(0);

  const filtered = useMemo(
    () =>
      items.filter((v) => {
        if (cat !== 'все' && v.category !== cat) return false;
        if (type !== 'все' && v.employmentType !== type) return false;
        if (salary > 0 && (v.salaryFrom ?? 0) < salary) return false;
        return true;
      }),
    [items, cat, type, salary],
  );

  return (
    <section className="px-4 md:px-9 py-9 max-w-page mx-auto">
      <div className="flex flex-col gap-3 mb-7">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-bold uppercase tracking-[0.1em] text-ink-50 mr-2">
            сфера:
          </span>
          {CATS.map((c) => (
            <button
              key={c}
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
              onClick={() => setType(t)}
              className={`px-3.5 py-2 rounded-full border-1.5 border-ink font-semibold text-xs cursor-pointer btn-hover ${type === t ? 'bg-ink text-cream' : 'bg-cream text-ink'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="text-xs text-ink-50 font-semibold mb-4">{filtered.length} вакансий</div>

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
