import { Button } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';
import type { Sport } from '@/lib/types';

interface Props {
  items: Sport[];
}

export function SportSection({ items }: Props) {
  return (
    <div>
      <SectionLabel>Спорт</SectionLabel>
      <div>
        {items.map((s) => (
          <a
            key={s.id}
            href={`/sport/${s.slug}`}
            className="flex justify-between items-center py-3.5 border-b border-dashed border-ink-20 font-sans text-[15px] text-ink no-underline"
          >
            <div>
              <div className="font-bold">{s.name}</div>
              <div className="text-xs text-ink-50 mt-0.5">
                {s.age} · {s.schedule}
              </div>
            </div>
            <span className="font-bold">→</span>
          </a>
        ))}
      </div>
      <div className="mt-4">
        <Button href="/sport">все секции →</Button>
      </div>
    </div>
  );
}
