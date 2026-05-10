import Image from 'next/image';
import { formatNewsTime } from '@/components/home/format';
import { Markdown } from '@/components/ui/Markdown';
import { Pill } from '@/components/ui/Pill';
import type { Article } from '@/lib/types';

interface Props {
  article: Article;
}

export function ArticlePage({ article }: Props) {
  return (
    <article>
      <section className="px-4 md:px-9 pt-10 pb-7 max-w-[860px] mx-auto">
        <div className="flex gap-2 mb-5">
          <Pill variant="accent">{article.category}</Pill>
          <Pill variant="light">{formatNewsTime(article.createdAt)}</Pill>
          {article.readingTime && <Pill variant="light">{article.readingTime} мин</Pill>}
        </div>
        <h1 className="m-0 font-extrabold text-[36px] sm:text-[48px] md:text-[72px] leading-[0.95] tracking-tighter2 text-balance">
          {article.title}
        </h1>
        {article.excerpt && (
          <p className="mt-6 text-xl leading-relaxed text-ink-70 m-0">{article.excerpt}</p>
        )}
      </section>

      <div className="relative h-[240px] sm:h-[360px] md:h-[480px] mx-4 md:mx-9 max-w-page md:mx-auto overflow-hidden">
        <Image
          src={article.cover.url}
          alt={article.cover.alt ?? article.title}
          fill
          sizes="(max-width: 768px) 100vw, 860px"
          className="object-cover"
          priority
        />
      </div>

      <section className="px-4 md:px-9 py-10 max-w-[760px] mx-auto">
        {article.body && <Markdown>{article.body}</Markdown>}
      </section>
    </article>
  );
}
