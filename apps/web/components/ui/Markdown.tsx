import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeUnwrapImages from 'rehype-unwrap-images';

interface Props {
  children: string;
}

/** Единые стили для markdown-контента: статьи, описания событий и т.п. */
export function Markdown({ children }: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeUnwrapImages]}
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
          <a href={href} className="text-accent underline underline-offset-2 hover:no-underline">
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
        img: ({ src, alt }) =>
          src ? (
            /* biome-ignore lint/performance/noImgElement: inline markdown image */
            <img
              src={src}
              alt={alt ?? ''}
              className="block w-full my-9 rounded-xl"
            />
          ) : null,
        hr: () => <hr className="my-9 border-t-1.5 border-ink-20" />,
        strong: ({ children }) => <strong className="font-bold">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
