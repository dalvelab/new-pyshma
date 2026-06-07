import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { Pill } from '@/components/ui/Pill';
import type { Event } from '@/lib/types';
import { formatEventDate } from './format';

interface Props {
  event: Event;
}

export function AfishaCard({ event }: Props) {
  return (
    <a href={`/afisha/${event.slug}`} className="block h-full">
      <Card className="flex flex-col h-full">
        <div className="relative h-[150px] overflow-hidden">
          <Image
            src={event.cover.url}
            alt={event.cover.alt ?? event.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover"
          />
        </div>
        <div className="p-3.5 flex flex-col gap-2 flex-1">
          <div className="font-bold text-[11px] tracking-[0.08em] text-accent uppercase">
            {formatEventDate(event.startsAt)}
          </div>
          <div className="font-bold text-base leading-[1.2] line-clamp-2 min-h-[2.4em]">
            {event.title}
          </div>
          <div className="text-xs text-ink-50 line-clamp-1">{event.place}</div>
          <div className="mt-auto flex justify-between items-center pt-1.5">
            <Pill variant={event.free ? 'accent' : 'default'}>
              {event.free ? 'бесплатно' : `от ${event.priceFrom} ₽`}
            </Pill>
            <span className="font-semibold text-xs">→</span>
          </div>
        </div>
      </Card>
    </a>
  );
}
