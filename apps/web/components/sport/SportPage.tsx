import Image from 'next/image';
import { MediaGallery } from '@/components/ui/MediaGallery';
import { Markdown } from '@/components/ui/Markdown';
import { Pill } from '@/components/ui/Pill';
import type { Sport } from '@/lib/types';

interface Props {
  section: Sport;
}

export function SportPage({ section }: Props) {
  return (
    <article>
      <section className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-10 px-4 md:px-9 py-10 max-w-page mx-auto">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            {section.category && <Pill variant="accent">{section.category}</Pill>}
            <Pill variant="light">{section.age}</Pill>
          </div>
          <h1 className="m-0 font-extrabold text-[48px] md:text-[64px] leading-[0.95] tracking-tighter2 text-balance">
            {section.name}
          </h1>
          {section.description && (
            <p className="m-0 text-base leading-relaxed text-ink-70">{section.description}</p>
          )}
        </div>
        {section.cover && (
          <div className="relative h-[360px] overflow-hidden rounded-md border-1.5 border-ink">
            <Image
              src={section.cover.url}
              alt={section.cover.alt ?? section.name}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
              priority
            />
          </div>
        )}
      </section>

      <section className="px-4 md:px-9 py-9 border-t-1.5 border-ink bg-paper-2">
        <div className="max-w-page mx-auto grid grid-cols-1 md:grid-cols-3 gap-7">
          <div>
            <div className="text-[11px] uppercase tracking-[0.1em] text-ink-50 font-bold mb-2">
              Расписание
            </div>
            {section.scheduleDetailed ? (
              <Markdown>{section.scheduleDetailed}</Markdown>
            ) : (
              <div className="font-semibold">{section.schedule}</div>
            )}
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.1em] text-ink-50 font-bold mb-2">
              Площадка
            </div>
            <div className="font-semibold">{section.venue}</div>
            {section.address && <div className="text-sm text-ink-70 mt-1">{section.address}</div>}
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.1em] text-ink-50 font-bold mb-2">
              Контакты
            </div>
            <div className="flex flex-col gap-1.5 text-sm">
              {section.contact?.phone && (
                <a href={`tel:${section.contact.phone}`} className="font-semibold">
                  {section.contact.phone}
                </a>
              )}
              {section.contact?.email && (
                <a href={`mailto:${section.contact.email}`} className="font-semibold">
                  {section.contact.email}
                </a>
              )}
              {section.contact?.vk && (
                <a
                  href={`https://vk.com/${section.contact.vk}`}
                  className="font-semibold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  vk · {section.contact.vk}
                </a>
              )}
              {section.contact?.telegram && (
                <a
                  href={`https://t.me/${section.contact.telegram}`}
                  className="font-semibold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  tg · {section.contact.telegram}
                </a>
              )}
              {!section.contact && <span className="text-ink-50">уточняйте на площадке</span>}
            </div>
          </div>
        </div>
      </section>

      {section.gallery && section.gallery.length > 0 && (
        <MediaGallery items={section.gallery} title="Фото секции" />
      )}
    </article>
  );
}
