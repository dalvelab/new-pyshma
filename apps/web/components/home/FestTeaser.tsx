import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import type { FestivalTeaser as FestivalTeaserData } from '@/lib/types';

interface Props {
  teaser: FestivalTeaserData;
}

const MARQUEE_FALLBACK = ['2 СЦЕНЫ', '38 ВЫСТУПЛЕНИЙ', '6 ПЛОЩАДОК', 'ВХОД СВОБОДНЫЙ'];

export function FestTeaser({ teaser }: Props) {
  const marquee = teaser.marquee.length
    ? teaser.marquee.map((s) => s.toUpperCase())
    : MARQUEE_FALLBACK;
  return (
    <section className="bg-ink text-cream relative overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-10 items-center px-4 md:px-9 py-10 md:py-16 max-w-page mx-auto">
        <div>
          <div className="font-bold text-xs tracking-[0.16em] text-accent uppercase">
            фестиваль · {teaser.date}
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
            <Button variant="primary" href="/festival#program">
              программа →
            </Button>
            {teaser.hasPast && (
              <a
                className="px-[18px] py-3 rounded-lg border-1.5 border-paper/40 bg-transparent text-cream font-bold text-sm cursor-pointer btn-hover"
                href="/festival#past"
              >
                как это было
              </a>
            )}
          </div>
        </div>
        <div className="relative h-[240px] sm:h-[300px] md:h-[380px]">
          <Image
            src="/letter.png"
            alt="Новая Пышма fest"
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-contain"
            priority
          />
        </div>
      </div>
      <div className="border-t border-cream/15 py-4 flex gap-7 items-center font-extrabold text-base whitespace-nowrap overflow-hidden">
        <div className="flex gap-7 animate-marquee">
          {[...Array(4)].flatMap((_, i) =>
            marquee.flatMap((m, j) => [
              <span key={`${i}-${j}-m-${m}`}>{m}</span>,
              <span key={`${i}-${j}-d-${m}`} className="text-accent">
                ·
              </span>,
            ]),
          )}
        </div>
      </div>
    </section>
  );
}
