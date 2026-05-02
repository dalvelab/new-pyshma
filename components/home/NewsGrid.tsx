import { Button } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';
import type { Article } from '@/lib/types';
import { NewsCard } from './NewsCard';

interface Props {
  items: Article[];
}

export function NewsGrid({ items }: Props) {
  return (
    <section className="px-9 py-9 border-t-1.5 border-ink max-w-page mx-auto">
      <SectionLabel>Новости ШИП · свежее</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((a) => (
          <NewsCard key={a.id} article={a} />
        ))}
      </div>
      <div className="mt-5 flex justify-end">
        <Button href="/news">все новости →</Button>
      </div>
    </section>
  );
}
