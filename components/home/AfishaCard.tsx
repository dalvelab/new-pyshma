import { Card } from '@/components/ui/Card';
import { PatternBox } from '@/components/ui/PatternBox';
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
        <PatternBox
          className="h-[150px]"
          pattern={event.fallbackPattern ?? 'warm'}
          rounded={false}
        />
        <div className="p-3.5 flex flex-col gap-2 flex-1">
          <div className="font-bold text-[11px] tracking-[0.08em] text-accent uppercase">
            {formatEventDate(event.startsAt)}
          </div>
          <div className="font-bold text-base leading-[1.2]">{event.title}</div>
          <div className="text-xs text-ink-50">{event.place}</div>
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
