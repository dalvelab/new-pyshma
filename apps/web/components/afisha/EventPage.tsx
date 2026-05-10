import Image from 'next/image';
import { EventGallery } from '@/components/afisha/EventGallery';
import { formatEventDate } from '@/components/home/format';
import { Button } from '@/components/ui/Button';
import { Markdown } from '@/components/ui/Markdown';
import { Pill } from '@/components/ui/Pill';
import type { Event } from '@/lib/types';

interface Props {
  event: Event;
}

export function EventPage({ event }: Props) {
  return (
    <article>
      <section className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-10 px-4 md:px-9 py-10 max-w-page mx-auto">
        <div className="relative h-[260px] sm:h-[360px] md:h-[460px] overflow-hidden">
          <Image
            src={event.cover.url}
            alt={event.cover.alt ?? event.title}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            <Pill>{formatEventDate(event.startsAt)}</Pill>
            <Pill variant={event.free ? 'accent' : 'light'}>
              {event.free ? 'бесплатно' : `от ${event.priceFrom} ₽`}
            </Pill>
            {event.ageLimit !== undefined && <Pill variant="light">{event.ageLimit}+</Pill>}
          </div>
          <h1 className="m-0 font-extrabold text-[36px] sm:text-[48px] md:text-[60px] leading-[0.96] tracking-tighter2 text-balance">
            {event.title}
          </h1>
          <dl className="grid grid-cols-[88px_1fr] sm:grid-cols-[120px_1fr] gap-y-2 text-[15px] mt-2">
            <dt className="text-ink-50">когда</dt>
            <dd className="m-0 font-semibold">
              {new Date(event.startsAt).toLocaleString('ru-RU', {
                day: 'numeric',
                month: 'long',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </dd>
            <dt className="text-ink-50">где</dt>
            <dd className="m-0 font-semibold">
              {event.place}
              {event.address ? `, ${event.address}` : ''}
            </dd>
          </dl>
          {event.description && (
            <p className="m-0 text-base leading-relaxed text-ink-70">{event.description}</p>
          )}
          {!event.free && event.ticketUrl && (
            <div className="mt-2">
              <Button variant="primary" href={event.ticketUrl} external>
                купить билет
              </Button>
            </div>
          )}
        </div>
      </section>

      {event.body && (
        <section className="px-4 md:px-9 pb-10 max-w-[760px] mx-auto">
          <Markdown>{event.body}</Markdown>
        </section>
      )}

      {event.gallery && event.gallery.length > 0 && (
        <EventGallery items={event.gallery} title="Галерея" />
      )}
    </article>
  );
}
