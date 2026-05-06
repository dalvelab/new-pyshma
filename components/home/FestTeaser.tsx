import { Button } from '@/components/ui/Button';
import { PatternBox } from '@/components/ui/PatternBox';
import type { FestivalTeaser } from '@/lib/types';

interface Props {
  teaser: FestivalTeaser;
}

const MARQUEE = ['2 СЦЕНЫ', '38 ВЫСТУПЛЕНИЙ', '6 ПЛОЩАДОК', 'ВХОД СВОБОДНЫЙ'];

export function FestTeaser({ teaser }: Props) {
  return (
    <section className="bg-ink text-cream relative overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-10 items-center px-4 md:px-9 py-10 md:py-16 max-w-page mx-auto">
        <div>
          <div className="font-bold text-xs tracking-[0.16em] text-accent uppercase">
            фестиваль · {teaser.date} · {teaser.weekday}
          </div>
          <h2 className="font-extrabold text-[44px] sm:text-[64px] md:text-[96px] leading-[0.92] tracking-tighter2 mt-3 m-0">
            Это <span className="text-accent">Новая</span>
            <br />
            Пышма<span className="font-normal italic text-cream/70"> fest</span>
          </h2>
          <p className="mt-5 max-w-[540px] text-[17px] leading-relaxed text-paper/80">
            Главное городское событие года. Один день, две сцены, десятки площадок и весь город — на
            одной площади.
          </p>
          <div className="flex gap-3 mt-6">
            <Button variant="primary" href={teaser.ctaUrl}>
              программа дня →
            </Button>
            <a
              className="px-[18px] py-3 rounded-lg border-1.5 border-paper/40 bg-transparent text-cream font-bold text-sm cursor-pointer btn-hover"
              href="/festival/2025"
            >
              как было в 2025
            </a>
          </div>
        </div>
        <PatternBox className="h-[240px] sm:h-[300px] md:h-[380px]" pattern="warm" illustration="stage" />
      </div>
      <div className="border-t border-cream/15 py-4 flex gap-7 items-center font-extrabold text-base whitespace-nowrap overflow-hidden">
        <div className="flex gap-7 animate-marquee">
          {[...Array(4)].flatMap((_, i) =>
            MARQUEE.flatMap((m, j) => [
              <span key={`${i}-${j}-m`}>{m}</span>,
              <span key={`${i}-${j}-d`} className="text-accent">
                ·
              </span>,
            ]),
          )}
        </div>
      </div>
    </section>
  );
}
