'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface Props {
  items: { url: string; alt?: string }[];
  title: string;
}

export function EventGallery({ items, title }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const update = () => {
      setCanPrev(el.scrollLeft > 4);
      setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [items]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  const showArrows = items.length >= 3;

  return (
    <section className="pb-10 max-w-page mx-auto">
      <h2 className="m-0 mb-4 px-4 md:px-9 font-extrabold text-2xl tracking-tight">{title}</h2>
      <div className="relative">
        <div
          ref={trackRef}
          className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-4 md:px-9 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((img, i) => (
            <div
              key={img.url}
              className="relative shrink-0 snap-start w-[80%] sm:w-[45%] md:w-[33%] lg:w-[25%] aspect-[4/3] overflow-hidden rounded-md border-1.5 border-ink"
            >
              <Image
                src={img.url}
                alt={img.alt ?? `${title} — фото ${i + 1}`}
                fill
                sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 25vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {showArrows && (
          <>
            <button
              type="button"
              aria-label="Прокрутить назад"
              onClick={() => scrollByCard(-1)}
              disabled={!canPrev}
              className="hidden [@media(pointer:fine)]:flex absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 items-center justify-center rounded-full border-1.5 border-ink bg-cream text-xl font-bold shadow-offset-sm transition-opacity disabled:opacity-30 disabled:cursor-default cursor-pointer btn-hover"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Прокрутить вперёд"
              onClick={() => scrollByCard(1)}
              disabled={!canNext}
              className="hidden [@media(pointer:fine)]:flex absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 items-center justify-center rounded-full border-1.5 border-ink bg-cream text-xl font-bold shadow-offset-sm transition-opacity disabled:opacity-30 disabled:cursor-default cursor-pointer btn-hover"
            >
              →
            </button>
          </>
        )}
      </div>
    </section>
  );
}
