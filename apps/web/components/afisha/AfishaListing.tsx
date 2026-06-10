'use client';

import { useMemo, useState } from 'react';
import { AfishaCard } from '@/components/home/AfishaCard';
import { CardGrid } from '@/components/ui/CardGrid';
import { EmptyState } from '@/components/ui/EmptyState';
import { FilterButton } from '@/components/ui/FilterButton';
import type { Event } from '@/lib/types';

interface Props {
  items: Event[];
}

const PRICES = ['все', 'бесплатно', 'платные'] as const;

/** Афиша: фильтр по цене, события в хронологическом порядке. */
export function AfishaListing({ items }: Props) {
  const [price, setPrice] = useState<(typeof PRICES)[number]>('все');

  const filtered = useMemo(
    () =>
      items
        .filter((e) => {
          if (price === 'бесплатно' && !e.free) return false;
          if (price === 'платные' && e.free) return false;
          return true;
        })
        .toSorted((a, b) => a.startsAt.localeCompare(b.startsAt)),
    [items, price],
  );

  return (
    <section className="px-4 md:px-9 py-9 max-w-page mx-auto">
      <div className="flex flex-wrap gap-2 mb-7">
        {PRICES.map((p) => (
          <FilterButton key={p} active={price === p} onClick={() => setPrice(p)} tone="ink">
            {p}
          </FilterButton>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState>Сейчас нет событий по выбранному фильтру.</EmptyState>
      ) : (
        <CardGrid cols={4}>
          {filtered.map((e) => (
            <AfishaCard key={e.id} event={e} />
          ))}
        </CardGrid>
      )}
    </section>
  );
}
