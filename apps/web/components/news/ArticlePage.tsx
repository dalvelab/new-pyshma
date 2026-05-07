import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkUnwrapImages from 'remark-unwrap-images';
import { formatNewsTime } from '@/components/home/format';
import { PatternBox } from '@/components/ui/PatternBox';
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
        {article.body && (
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkUnwrapImages]}
            components={{
              p: ({ children }) => (
                <p className="my-5 text-[18px] leading-[1.65] text-ink">{children}</p>
              ),
              h1: ({ children }) => (
                <h2 className="font-extrabold text-[32px] leading-[1.1] mt-10 mb-3 tracking-tight">
                  {children}
                </h2>
              ),
              h2: ({ children }) => (
                <h2 className="font-extrabold text-[28px] leading-[1.15] mt-9 mb-3 tracking-tight">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="font-bold text-[22px] leading-[1.2] mt-7 mb-2 tracking-tight">
                  {children}
                </h3>
              ),
              blockquote: ({ children }) => (
                <blockquote className="my-9 pl-4 sm:pl-6 border-l-[6px] border-accent font-semibold italic text-[18px] sm:text-[22px] leading-[1.35] text-ink">
                  {children}
                </blockquote>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-accent underline underline-offset-2 hover:no-underline"
                >
                  {children}
                </a>
              ),
              ul: ({ children }) => (
                <ul className="my-5 pl-5 list-disc text-[18px] leading-[1.65] text-ink space-y-2">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="my-5 pl-5 list-decimal text-[18px] leading-[1.65] text-ink space-y-2">
                  {children}
                </ol>
              ),
              img: ({ src, alt }) => (
                <figure className="my-9">
                  {src ? (
                    /* biome-ignore lint/performance/noImgElement: cover-replacement once Strapi media is wired */
                    <img src={src} alt={alt ?? ''} className="w-full rounded-xl border-1.5 border-ink" />
                  ) : (
                    <PatternBox className="h-[220px] sm:h-[360px]" pattern="warm" label={alt} />
                  )}
                  {alt && <figcaption className="mt-2 text-sm text-ink-50">{alt}</figcaption>}
                </figure>
              ),
              hr: () => <hr className="my-9 border-t-1.5 border-ink-20" />,
              strong: ({ children }) => <strong className="font-bold">{children}</strong>,
              em: ({ children }) => <em className="italic">{children}</em>,
            }}
          >
            {article.body}
          </ReactMarkdown>
        )}
      </section>
    </article>
  );
}
