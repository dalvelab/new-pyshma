'use client';

import { useState } from 'react';
import type { Article } from '@/lib/types';
import { NewsCard } from '@/components/home/NewsCard';
import { Button } from '@/components/ui/Button';

interface Props {
  items: Article[];
}

const FILTERS = ['все', 'город', 'культура', 'спорт', 'афиша'] as const;
const PAGE = 8;

/** Listing-страница новостей с категорийным фильтром и пагинацией «Показать ещё». */
export function NewsListing({ items }: Props) {
  const [cat, setCat] = useState<(typeof FILTERS)[number]>('все');
  const [shown, setShown] = useState(PAGE);

  const filtered =
    cat === 'все'
      ? items
      : items.filter((a) => a.category === cat || (cat === 'город' && a.category === 'главное'));
  const visible = filtered.slice(0, shown);

  return (
    <section className="px-4 md:px-9 py-9 max-w-page mx-auto">
      <div className="flex flex-wrap gap-2.5 mb-7">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => {
              setCat(f);
              setShown(PAGE);
            }}
            className={`px-4 py-2 rounded-full border-1.5 border-ink font-semibold text-sm cursor-pointer btn-hover ${
              cat === f ? 'bg-accent text-white' : 'bg-cream text-ink'
            }`}
          >
            {f}
          </button>
        ))}
        <span className="ml-auto self-center text-xs text-ink-50 font-semibold">
          {filtered.length} материалов
        </span>
      </div>

      {visible.length === 0 ? (
        <div className="border-1.5 border-dashed border-ink-30 rounded-xl p-10 text-center text-ink-70">
          В этой категории пока ничего нет.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {visible.map((a) => (
            <NewsCard key={a.id} article={a} />
          ))}
        </div>
      )}

      {shown < filtered.length && (
        <div className="mt-8 flex justify-center">
          <Button variant="primary" full={false} href="#">
            <span
              onClick={(e) => {
                e.preventDefault();
                setShown((s) => s + PAGE);
              }}
            >
              показать ещё ({filtered.length - shown})
            </span>
          </Button>
        </div>
      )}
    </section>
  );
}
