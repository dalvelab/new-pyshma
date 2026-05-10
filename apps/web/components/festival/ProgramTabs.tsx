import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import type { FestivalProgram } from '@/lib/types';

interface Props {
  items: FestivalProgram[];
}

const WEEKDAYS = [
  'воскресенье',
  'понедельник',
  'вторник',
  'среда',
  'четверг',
  'пятница',
  'суббота',
];
const MONTHS = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

function fmtTime(iso: string) {
  const d = new Date(iso);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function dayKey(iso: string) {
  return iso.slice(0, 10); // YYYY-MM-DD
}

function dayHeader(iso: string) {
  const d = new Date(iso);
  const day = d.getDate();
  const month = MONTHS[d.getMonth()].toUpperCase();
  const wk = WEEKDAYS[d.getDay()];
  return { date: `${day} ${month}`, wk };
}

/** Программа фестиваля — карточная сетка, сгруппированная по дням. */
export function ProgramTabs({ items }: Props) {
  const byDay = new Map<string, FestivalProgram[]>();
  for (const p of items) {
    const k = dayKey(p.date);
    if (!byDay.has(k)) byDay.set(k, []);
    byDay.get(k)!.push(p);
  }
  const days = Array.from(byDay.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, list]) => ({
      k,
      header: dayHeader(list[0].date),
      items: list.sort((a, b) => a.date.localeCompare(b.date)),
    }));

  return (
    <div className="flex flex-col gap-10">
      {days.map((d) => (
        <div key={d.k}>
          <div className="flex flex-wrap items-baseline gap-3 sm:gap-5 mb-[18px] pb-3.5 border-b-1.5 border-ink">
            <div className="font-extrabold text-[32px] sm:text-[44px] md:text-[56px] leading-[0.9] tracking-tighter2">
              {d.header.date}
            </div>
            <div className="font-semibold text-[18px] sm:text-[22px] md:text-[28px] tracking-tight text-ink-70">
              {d.header.wk}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[18px]">
            {d.items.map((p, i) => (
              <ProgramCard key={p.id} program={p} accent={i === 0} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProgramCard({ program, accent }: { program: FestivalProgram; accent?: boolean }) {
  const time = fmtTime(program.date);
  return (
    <a href={`/festival/program/${program.slug}`} className="block h-full">
      <Card className="flex flex-col h-full overflow-hidden">
        <div className="relative h-[140px] overflow-hidden">
          <Image
            src={program.cover.url}
            alt={program.cover.alt ?? program.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover"
          />
          <div
            className={`absolute left-3 top-3 px-2.5 py-1 rounded font-extrabold text-[13px] tracking-wide text-cream ${accent ? 'bg-accent' : 'bg-ink'}`}
          >
            {time}
          </div>
        </div>
        <div className="px-4 pt-3.5 pb-4 flex flex-col gap-2 flex-1">
          <div className="font-bold text-[17px] leading-[1.2] text-balance">{program.title}</div>
          <div className="mt-auto flex items-center gap-1.5 font-bold text-[11px] tracking-[0.06em] uppercase text-ink-50">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            {program.location.name}
          </div>
        </div>
      </Card>
    </a>
  );
}
