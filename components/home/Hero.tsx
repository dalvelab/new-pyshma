import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section className="px-9 pt-10 pb-7 max-w-page mx-auto">
      <h1 className="m-0 font-extrabold text-[56px] md:text-[144px] leading-[0.92] tracking-tighter2 text-balance">
        Это <span className="text-accent">Новая</span>
        <br />
        Пышма.
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5 items-end">
        <p className="m-0 text-lg leading-relaxed text-ink-70 max-w-[540px]">
          Городской медиа-портал. Что происходит, где собираться, чем заняться. Новости, афиша,
          спорт, вакансии и фестиваль — в одном месте.
        </p>
        <div className="flex gap-2.5 md:justify-end">
          <Button variant="primary" href="/news">
            читать новости
          </Button>
          <Button href="/festival">фестиваль</Button>
        </div>
      </div>
    </section>
  );
}
