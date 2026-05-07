import { Button } from '@/components/ui/Button';
import { PatternBox } from '@/components/ui/PatternBox';
import { Pill } from '@/components/ui/Pill';
import type { SportSection } from '@/lib/types';

interface Props {
  section: SportSection;
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
        <PatternBox
          className="h-[360px]"
          pattern={section.fallbackPattern ?? 'zigzag'}
          label="секция"
        />
      </section>

      <section className="px-4 md:px-9 py-9 border-t-1.5 border-ink bg-paper-2">
        <div className="max-w-page mx-auto grid grid-cols-1 md:grid-cols-3 gap-7">
          <div>
            <div className="text-[11px] uppercase tracking-[0.1em] text-ink-50 font-bold mb-2">
              Расписание
            </div>
            <ul className="m-0 p-0 list-none flex flex-col gap-1.5 font-semibold">
              {(section.scheduleDetailed ?? [section.schedule]).map((s, i) => (
                <li key={i} className="border-b border-dashed border-ink-20 pb-1.5">
                  {s}
                </li>
              ))}
            </ul>
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
              {section.contacts?.phone && (
                <a href={`tel:${section.contacts.phone}`} className="font-semibold">
                  {section.contacts.phone}
                </a>
              )}
              {section.contacts?.vk && (
                <a href={`https://vk.com/${section.contacts.vk}`} className="font-semibold">
                  vk · {section.contacts.vk}
                </a>
              )}
              {section.contacts?.tg && (
                <a href={`https://t.me/${section.contacts.tg}`} className="font-semibold">
                  tg · {section.contacts.tg}
                </a>
              )}
              {!section.contacts && <span className="text-ink-50">уточняйте на площадке</span>}
            </div>
          </div>
        </div>
      </section>

      {section.gallery && section.gallery.length > 0 && (
        <section className="px-4 md:px-9 py-9 max-w-page mx-auto">
          <h2 className="m-0 mb-4 font-extrabold text-2xl tracking-tight">Фото секции</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {section.gallery.map((p, i) => (
              <PatternBox key={i} className="h-[180px]" pattern={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
