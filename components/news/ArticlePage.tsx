import { formatNewsTime } from '@/components/home/format';
import { PatternBox } from '@/components/ui/PatternBox';
import { Pill } from '@/components/ui/Pill';
import type { Article, ArticleBlock } from '@/lib/types';

interface Props {
  article: Article;
}

function renderBlock(b: ArticleBlock, i: number) {
  switch (b.type) {
    case 'heading':
      return (
        <h2 key={i} className="font-extrabold text-[28px] leading-[1.15] mt-9 mb-3 tracking-tight">
          {b.text}
        </h2>
      );
    case 'quote':
      return (
        <figure key={i} className="my-9 pl-4 sm:pl-6 border-l-[6px] border-accent">
          <blockquote className="font-semibold italic text-[18px] sm:text-[22px] leading-[1.35] text-ink m-0">
            «{b.text}»
          </blockquote>
          {b.author && <figcaption className="mt-3 text-sm text-ink-50">— {b.author}</figcaption>}
        </figure>
      );
    case 'image':
      return (
        <figure key={i} className="my-9">
          <PatternBox className="h-[220px] sm:h-[360px]" pattern="warm" label={b.text} />
        </figure>
      );
    case 'video':
      return (
        <figure key={i} className="my-9">
          <PatternBox className="h-[220px] sm:h-[360px]" pattern="block" label={`▶ ${b.text ?? 'видео'}`} dark />
        </figure>
      );
    case 'paragraph':
    default:
      return (
        <p key={i} className="my-5 text-[18px] leading-[1.65] text-ink">
          {b.text}
        </p>
      );
  }
}

export function ArticlePage({ article }: Props) {
  return (
    <article>
      <section className="px-4 md:px-9 pt-10 pb-7 max-w-[860px] mx-auto">
        <div className="flex gap-2 mb-5">
          <Pill variant="accent">{article.category}</Pill>
          <Pill variant="light">{formatNewsTime(article.publishedAt)}</Pill>
          {article.readingTime && <Pill variant="light">{article.readingTime} мин</Pill>}
        </div>
        <h1 className="m-0 font-extrabold text-[36px] sm:text-[48px] md:text-[72px] leading-[0.95] tracking-tighter2 text-balance">
          {article.title}
        </h1>
        {article.excerpt && (
          <p className="mt-6 text-xl leading-relaxed text-ink-70 m-0">{article.excerpt}</p>
        )}
      </section>

      <PatternBox
        className="h-[240px] sm:h-[360px] md:h-[480px] mx-4 md:mx-9 max-w-page md:mx-auto"
        pattern={article.fallbackPattern ?? 'warm'}
        label="кавер"
      />

      <section className="px-4 md:px-9 py-10 max-w-[760px] mx-auto">
        {(article.body ?? []).map(renderBlock)}
        <div className="mt-12 pt-6 border-t-1.5 border-ink flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <span className="text-sm text-ink-50">Поделиться:</span>
          <div className="flex flex-wrap gap-2">
            {['ВК', 'TG', 'Max', 'copy'].map((s) => (
              <button
                key={s}
                className="px-3 py-2 rounded-full border-1.5 border-ink font-semibold text-xs"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
