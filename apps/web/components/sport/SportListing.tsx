'use client';

import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Pill } from '@/components/ui/Pill';
import type { SportSection } from '@/lib/types';

interface Props {
  items: SportSection[];
}

const CATS: Array<'все' | NonNullable<SportSection['category']>> = [
  'все',
  'единоборства',
  'плавание',
  'игровые',
  'циклические',
  'фитнес',
  'другое',
];

export function SportListing({ items }: Props) {
  const [cat, setCat] = useState<(typeof CATS)[number]>('все');

  const grouped = useMemo(() => {
    const filtered = cat === 'все' ? items : items.filter((s) => s.category === cat);
    const map = new Map<string, SportSection[]>();
    filtered.forEach((s) => {
      const key = s.category ?? 'другое';
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(s);
    });
    return [...map.entries()];
  }, [items, cat]);

  return (
    <section className="px-4 md:px-9 py-9 max-w-page mx-auto">
      <div className="flex flex-wrap gap-2 mb-8">
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

      {grouped.length === 0 ? (
        <div className="border-1.5 border-dashed border-ink-30 rounded-xl p-10 text-center text-ink-70">
          В этой категории пока ничего нет.
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          {grouped.map(([key, list]) => (
            <div key={key}>
              <div className="flex items-baseline gap-3 mb-4">
                <h3 className="m-0 font-extrabold text-xl tracking-tight uppercase">{key}</h3>
                <span className="text-xs text-ink-50">{list.length}</span>
                <span className="flex-1 h-[1.5px] bg-ink" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {list.map((s) => (
                  <a key={s.id} href={`/sport/${s.slug}`}>
                    <Card className="p-4 flex flex-col gap-2 h-full">
                      <div className="font-bold text-[17px] leading-[1.2]">{s.name}</div>
                      <div className="text-xs text-ink-50">{s.venue}</div>
                      <div className="mt-auto flex gap-2 pt-2">
                        <Pill variant="light">{s.age}</Pill>
                        <Pill variant="light">{s.schedule}</Pill>
                      </div>
                    </Card>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
