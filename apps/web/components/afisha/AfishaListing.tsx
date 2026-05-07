'use client';

import { useMemo, useState } from 'react';
import { AfishaCard } from '@/components/home/AfishaCard';
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
          <button
            key={p}
            type="button"
            onClick={() => setPrice(p)}
            className={`px-3.5 py-2 rounded-full border-1.5 border-ink font-semibold text-xs cursor-pointer btn-hover ${price === p ? 'bg-ink text-cream' : 'bg-cream text-ink'}`}
          >
            {p}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="border-1.5 border-dashed border-ink-30 rounded-xl p-10 text-center text-ink-70">
          Сейчас нет событий по выбранному фильтру.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((e) => (
            <AfishaCard key={e.id} event={e} />
          ))}
        </div>
      )}
    </section>
  );
}
