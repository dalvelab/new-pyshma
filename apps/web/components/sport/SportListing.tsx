'use client';

import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { CardGrid } from '@/components/ui/CardGrid';
import { EmptyState } from '@/components/ui/EmptyState';
import { FilterButton } from '@/components/ui/FilterButton';
import { Pill } from '@/components/ui/Pill';
import type { Sport } from '@/lib/types';

interface Props {
  items: Sport[];
  categories: string[];
}

const ALL = 'все';
const UNCATEGORIZED = 'другое';

export function SportListing({ items, categories }: Props) {
  const cats = useMemo(() => [ALL, ...categories], [categories]);
  const [cat, setCat] = useState<string>(ALL);

  const grouped = useMemo(() => {
    const filtered = cat === ALL ? items : items.filter((s) => s.category === cat);
    const map = new Map<string, Sport[]>();
    filtered.forEach((s) => {
      const key = s.category ?? UNCATEGORIZED;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(s);
    });
    return [...map.entries()];
  }, [items, cat]);

  return (
    <section className="px-4 md:px-9 py-9 max-w-page mx-auto">
      <div className="flex flex-wrap gap-2 mb-8">
        {cats.map((c) => (
          <FilterButton key={c} active={cat === c} onClick={() => setCat(c)}>
            {c}
          </FilterButton>
        ))}
      </div>

      {grouped.length === 0 ? (
        <EmptyState>В этой категории пока ничего нет.</EmptyState>
      ) : (
        <div className="flex flex-col gap-10">
          {grouped.map(([key, list]) => (
            <div key={key}>
              <div className="flex items-baseline gap-3 mb-4">
                <h3 className="m-0 font-extrabold text-xl tracking-tight uppercase">{key}</h3>
                <span className="text-xs text-ink-50">{list.length}</span>
                <span className="flex-1 h-[1.5px] bg-ink" />
              </div>
              <CardGrid cols={3}>
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
              </CardGrid>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
