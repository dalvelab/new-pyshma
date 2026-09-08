import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { CardGrid } from '@/components/ui/CardGrid';
import { PatternBox } from '@/components/ui/PatternBox';
import { SectionLabel } from '@/components/ui/SectionLabel';
import type { HistoryItem } from '@/lib/types';

interface Props {
  items: HistoryItem[];
}

/** Блок «история»: карточки с заголовком и фото. */
export function AboutHistory({ items }: Props) {
  return (
    <section className="px-4 md:px-9 py-9 border-b-1.5 border-ink max-w-page mx-auto">
      <SectionLabel num="02">история</SectionLabel>
      <CardGrid cols={4}>
        {items.map((item) => (
          <a key={item.slug} href={`/about/history/${item.slug}`} className="block">
            <Card className="h-full">
              {item.image ? (
                <div className="relative h-44 border-b-1.5 border-ink">
                  <Image
                    src={item.image.url}
                    alt={item.image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <PatternBox
                  className="h-44 border-0 border-b-1.5"
                  pattern="cross"
                  illustration="building"
                  rounded={false}
                />
              )}
              <div className="p-4">
                <h3 className="m-0 font-bold text-[20px] leading-[1.15] tracking-tight">
                  {item.title}
                </h3>
              </div>
            </Card>
          </a>
        ))}
      </CardGrid>
    </section>
  );
}
