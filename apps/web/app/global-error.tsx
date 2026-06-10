'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

/* Глобальный обработчик ошибок App Router. */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // В проде стек-трейсы не светим в консоль; здесь точка для отправки в систему мониторинга.
    if (process.env.NODE_ENV !== 'production') console.error(error);
  }, [error]);
  return (
    <html lang="ru">
      <body className="bg-paper text-ink font-sans">
        <main className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-[520px] text-center">
            <div className="font-bold text-xs tracking-[0.18em] uppercase text-accent">упс</div>
            <h1 className="mt-3 m-0 font-extrabold text-[64px] leading-[0.95] tracking-tighter2">
              Что-то
              <br />
              сломалось.
            </h1>
            <p className="mt-5 text-base text-ink-70">
              Мы уже знаем и чиним. Можно перезагрузить страницу или вернуться на главную.
            </p>
            <div className="mt-6 flex gap-2.5 justify-center">
              <Button variant="primary" onClick={reset}>
                перезагрузить
              </Button>
              <Button href="/">на главную</Button>
            </div>
            {error.digest && <p className="mt-6 text-xs text-ink-50">id ошибки: {error.digest}</p>}
          </div>
        </main>
      </body>
    </html>
  );
}
