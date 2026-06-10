'use client';

import { useMemo, useState, useTransition } from 'react';
import { loadNewsPage } from '@/lib/actions';
import type { NewsPage } from '@/lib/queries';
import { NewsCard } from '@/components/home/NewsCard';
import { Button } from '@/components/ui/Button';
import { CardGrid } from '@/components/ui/CardGrid';
import { EmptyState } from '@/components/ui/EmptyState';
import { FilterButton } from '@/components/ui/FilterButton';

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
          <FilterButton
            key={f}
            active={cat === f}
            onClick={() => handleFilter(f)}
            disabled={pending && cat === f}
            size="md"
          >
            {f}
          </FilterButton>
        ))}
      </div>

      {items.length === 0 ? (
        <EmptyState>{pending ? 'Загружаем…' : 'В этой категории пока ничего нет.'}</EmptyState>
      ) : (
        <CardGrid cols={4}>
          {items.map((a) => (
            <NewsCard key={a.id} article={a} />
          ))}
        </CardGrid>
      )}

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <Button variant="primary" onClick={handleMore} disabled={pending}>
            {pending ? 'загружаем…' : `показать ещё (${total - items.length})`}
          </Button>
        </div>
      )}
    </section>
  );
}
