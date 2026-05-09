'use client';

import { useMemo, useState, useTransition } from 'react';
import { loadNewsPage } from '@/lib/actions';
import type { NewsPage } from '@/lib/queries';
import { NewsCard } from '@/components/home/NewsCard';
import { Button } from '@/components/ui/Button';

interface Props {
  initial: NewsPage;
  categories: string[];
}

const ALL = 'все';

/** Listing-страница новостей: фильтр и «показать ещё» дёргают server action loadNewsPage. */
export function NewsListing({ initial, categories }: Props) {
  const filters = useMemo(() => [ALL, ...categories], [categories]);
  const [cat, setCat] = useState<string>(ALL);
  const [items, setItems] = useState(initial.items);
  const [page, setPage] = useState(initial.page);
  const [total, setTotal] = useState(initial.total);
  const [pending, startTransition] = useTransition();

  const handleFilter = (next: string) => {
    if (next === cat) return;
    setCat(next);
    startTransition(async () => {
      const res = await loadNewsPage({
        page: 1,
        category: next === ALL ? undefined : next,
      });
      setItems(res.items);
      setPage(res.page);
      setTotal(res.total);
    });
  };

  const handleMore = () => {
    startTransition(async () => {
      const res = await loadNewsPage({
        page: page + 1,
        category: cat === ALL ? undefined : cat,
      });
      setItems((prev) => [...prev, ...res.items]);
      setPage(res.page);
      setTotal(res.total);
    });
  };

  const hasMore = items.length < total;

  return (
    <section className="px-4 md:px-9 py-9 max-w-page mx-auto">
      <div className="flex flex-wrap gap-2.5 mb-7">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => handleFilter(f)}
            disabled={pending && cat === f}
            className={`px-4 py-2 rounded-full border-1.5 border-ink font-semibold text-sm cursor-pointer btn-hover ${
              cat === f ? 'bg-accent text-white' : 'bg-cream text-ink'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="border-1.5 border-dashed border-ink-30 rounded-xl p-10 text-center text-ink-70">
          {pending ? 'Загружаем…' : 'В этой категории пока ничего нет.'}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((a) => (
            <NewsCard key={a.id} article={a} />
          ))}
        </div>
      )}

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <Button variant="primary" onClick={handleMore}>
            {pending ? 'загружаем…' : `показать ещё (${total - items.length})`}
          </Button>
        </div>
      )}
    </section>
  );
}
