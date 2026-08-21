import { Markdown } from '@/components/ui/Markdown';
import type { HistoryItem } from '@/lib/about-content';

interface Props {
  item: HistoryItem;
}

/** Отдельная страница эпохи: год как заголовок + markdown-текст. */
export function HistoryPage({ item }: Props) {
  return (
    <article>
      <section className="px-4 md:px-9 pt-10 pb-7 max-w-[860px] mx-auto">
        <nav className="flex gap-2 text-xs text-ink-50 font-semibold mb-5 uppercase tracking-[0.1em]">
          <a href="/" className="text-ink-50 hover:text-ink">
            главная
          </a>
          <span aria-hidden>/</span>
          <a href="/about" className="text-ink-50 hover:text-ink">
            о проекте
          </a>
          <span aria-hidden>/</span>
          <span className="text-ink">история</span>
        </nav>
        <h1 className="m-0 font-extrabold text-[56px] sm:text-[80px] md:text-[120px] leading-[0.92] tracking-tighter2 text-accent">
          {item.year}
        </h1>
      </section>

      <section className="px-4 md:px-9 pb-10 max-w-[760px] mx-auto [&>h2:first-child]:mt-0">
        <Markdown>{item.body}</Markdown>
      </section>
    </article>
  );
}
