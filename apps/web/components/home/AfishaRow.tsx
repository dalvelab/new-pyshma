import { SectionLabel } from '@/components/ui/SectionLabel';
import type { Event } from '@/lib/types';
import { AfishaCard } from './AfishaCard';

interface Props {
  items: Event[];
}

export function AfishaRow({ items }: Props) {
  return (
    <section className="px-4 md:px-9 py-9 bg-paper-2 border-t-1.5 border-b-1.5 border-ink">
      <div className="max-w-page mx-auto">
        <SectionLabel>Афиша · ближайшее</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((e) => (
            <AfishaCard key={e.id} event={e} />
          ))}
        </div>
      </div>
    </section>
  );
}
