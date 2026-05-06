import type { FestivalActivity, FestivalScene, Pattern } from '@/lib/types';
import { Card } from '@/components/ui/Card';
import { PatternBox } from '@/components/ui/PatternBox';

interface Props {
  scenes: FestivalScene[];
  activities: FestivalActivity[];
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

const CATEGORY_PATTERN: Record<string, Pattern> = {
  музыка: 'warm',
  лекция: 'cross',
  детям: 'sun',
  еда: 'block',
  спорт: 'zigzag',
  'мастер-класс': 'dots',
};
const PATTERN_FALLBACKS: Pattern[] = ['warm', 'cross', 'sun', 'block', 'zigzag', 'dots'];

function pickPattern(activity: FestivalActivity, idx: number): Pattern {
  if (activity.category && CATEGORY_PATTERN[activity.category])
    return CATEGORY_PATTERN[activity.category];
  return PATTERN_FALLBACKS[idx % PATTERN_FALLBACKS.length];
}

/** Программа фестиваля — карточная сетка, сгруппированная по дням.
    Соответствует hi-fi макету: 4 карточки в ряд, превью + плашка времени + категория. */
export function ProgramTabs({ scenes, activities }: Props) {
  // group by day
  const byDay = new Map<string, FestivalActivity[]>();
  for (const a of activities) {
    const k = dayKey(a.startsAt);
    if (!byDay.has(k)) byDay.set(k, []);
    byDay.get(k)!.push(a);
  }
  const days = Array.from(byDay.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, list]) => ({
      k,
      header: dayHeader(list[0].startsAt),
      items: list.sort((a, b) => a.startsAt.localeCompare(b.startsAt)),
    }));

  return (
    <div className="flex flex-col gap-10">
      {days.map((d) => (
        <div key={d.k}>
          {/* Заголовок дня */}
          <div className="flex flex-wrap items-baseline gap-3 sm:gap-5 mb-[18px] pb-3.5 border-b-1.5 border-ink">
            <div className="font-extrabold text-[32px] sm:text-[44px] md:text-[56px] leading-[0.9] tracking-tighter2">
              {d.header.date}
            </div>
            <div className="font-semibold text-[18px] sm:text-[22px] md:text-[28px] tracking-tight text-ink-70">
              {d.header.wk}
            </div>
          </div>

          {/* Сетка карточек */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[18px]">
            {d.items.map((activity, i) => {
              const scene = scenes.find((s) => s.id === activity.sceneId);
              return (
                <ProgramCard
                  key={activity.id}
                  activity={activity}
                  sceneName={scene?.name}
                  pattern={pickPattern(activity, i)}
                  accent={i === 0}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

interface CardProps {
  activity: FestivalActivity;
  sceneName?: string;
  pattern: Pattern;
  accent?: boolean;
}

function ProgramCard({ activity, sceneName, pattern, accent }: CardProps) {
  const time = fmtTime(activity.startsAt) + (activity.endsAt ? `–${fmtTime(activity.endsAt)}` : '');

  return (
    <Card className="flex flex-col h-full overflow-hidden">
      <div className="relative">
        <PatternBox className="h-[140px]" pattern={pattern} rounded={false} />
        <div
          className={`absolute left-3 top-3 px-2.5 py-1 rounded font-extrabold text-[13px] tracking-wide text-cream ${accent ? 'bg-accent' : 'bg-ink'}`}
        >
          {time}
        </div>
        {activity.category && (
          <div className="absolute right-3 top-3 px-2 py-1 rounded bg-cream text-ink font-bold text-[10px] tracking-[0.14em] uppercase border-1.5 border-ink">
            {activity.category}
          </div>
        )}
      </div>
      <div className="px-4 pt-3.5 pb-4 flex flex-col gap-2 flex-1">
        <div className="font-bold text-[17px] leading-[1.2] text-balance">{activity.title}</div>
        {activity.performer && (
          <div className="font-medium text-[13px] leading-relaxed text-ink-70">
            {activity.performer}
          </div>
        )}
        {sceneName && (
          <div className="mt-auto flex items-center gap-1.5 font-bold text-[11px] tracking-[0.06em] uppercase text-ink-50">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            {sceneName}
          </div>
        )}
      </div>
    </Card>
  );
}
