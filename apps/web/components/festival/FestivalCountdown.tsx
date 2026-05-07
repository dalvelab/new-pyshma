'use client';

import { useEffect, useState } from 'react';

interface Props {
  startsAt: string;
}

interface Diff {
  ms: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcDiff(target: number): Diff {
  const ms = Math.max(0, target - Date.now());
  return {
    ms,
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms % 86_400_000) / 3_600_000),
    minutes: Math.floor((ms % 3_600_000) / 60_000),
    seconds: Math.floor((ms % 60_000) / 1_000),
  };
}

const pad = (n: number) => String(n).padStart(2, '0');

export function FestivalCountdown({ startsAt }: Props) {
  const target = new Date(startsAt).getTime();
  const [diff, setDiff] = useState<Diff>(() => calcDiff(target));

  useEffect(() => {
    const tick = () => setDiff(calcDiff(target));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  if (diff.ms <= 0) return null;

  const items = [
    { v: pad(diff.days), l: 'дней' },
    { v: pad(diff.hours), l: 'часов' },
    { v: pad(diff.minutes), l: 'минут' },
    { v: pad(diff.seconds), l: 'секунд' },
  ];

  return (
    <section className="border-b-1.5 border-ink bg-cream">
      <div className="max-w-page mx-auto px-4 md:px-9 py-7 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-center gap-7">
        <div className="font-bold text-[11px] tracking-[0.22em] uppercase text-ink-50">
          до открытия
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 md:gap-3">
          {items.map((x) => (
            <div
              key={x.l}
              className="px-2 md:px-5 py-3.5 border-1.5 border-ink rounded-[10px] bg-paper flex flex-col md:flex-row items-start md:items-baseline md:justify-between gap-1 md:gap-2"
            >
              <span
                className="font-extrabold text-[28px] md:text-[44px] leading-none tracking-tighter tabular-nums"
                suppressHydrationWarning
              >
                {x.v}
              </span>
              <span className="font-bold text-[10px] md:text-[11px] tracking-[0.06em] md:tracking-[0.18em] uppercase text-ink-50">
                {x.l}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
