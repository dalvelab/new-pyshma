'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
  /** Что именно не загрузилось, в винительном падеже: «новости», «афишу». */
  what?: string;
}

/** Переиспользуемый экран ошибки для error.tsx разделов. */
export function RouteError({ error, reset, what = 'этот раздел' }: Props) {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') console.error(error);
  }, [error]);
  return (
    <main className="flex items-center justify-center px-6 py-24">
      <div className="max-w-[480px] text-center">
        <div className="font-bold text-xs tracking-[0.18em] uppercase text-accent">упс</div>
        <h1 className="mt-3 m-0 font-extrabold text-[44px] sm:text-[56px] leading-[0.95] tracking-tighter2">
          Не удалось
          <br />
          загрузить {what}.
        </h1>
        <p className="mt-5 text-base text-ink-70">
          Попробуйте ещё раз — иногда помогает. Если не вышло, вернитесь на главную.
        </p>
        <div className="mt-6 flex gap-2.5 justify-center">
          <Button variant="primary" onClick={reset}>
            попробовать снова
          </Button>
          <Button href="/">на главную</Button>
        </div>
        {error.digest && <p className="mt-6 text-xs text-ink-50">id ошибки: {error.digest}</p>}
      </div>
    </main>
  );
}
