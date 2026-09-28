import { ReactNode } from 'react';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

interface Props {
  /** Заголовок страницы (большой, как H1) */
  title: ReactNode;
  /** Хлебные крошки: [['Новости','/news'], ['Заголовок']] */
  crumbs?: Array<[string] | [string, string]>;
  /** Подзаголовок / описание под заголовком */
  intro?: ReactNode;
  /** Правая колонка над контентом (например, фильтры) */
  toolbar?: ReactNode;
  children: ReactNode;
}

/** Универсальный каркас второстепенной страницы.
    Главная собрана из собственных блоков, поэтому сюда не завязана. */
export function PageShell({ title, crumbs, intro, toolbar, children }: Props) {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="px-4 md:px-9 pt-10 pb-7 max-w-page mx-auto">
          {crumbs && (
            <nav className="flex gap-2 text-xs text-ink-50 font-semibold mb-5 uppercase tracking-[0.1em]">
              <a href="/" className="text-ink-50 hover:text-ink">
                главная
              </a>
              {crumbs.map((c, i) => (
                <span key={i} className="flex gap-2">
                  <span aria-hidden>/</span>
                  {c.length === 2 ? (
                    <a href={c[1]} className="text-ink-50 hover:text-ink">
                      {c[0]}
                    </a>
                  ) : (
                    <span className="text-ink">{c[0]}</span>
                  )}
                </span>
              ))}
            </nav>
          )}
          <h1 className="m-0 font-extrabold text-[44px] sm:text-[56px] md:text-[88px] leading-[0.92] tracking-tighter2 text-balance">
            {title}
          </h1>
          {intro && (
            <div className="mt-5 text-lg leading-relaxed text-ink-70 max-w-[640px]">{intro}</div>
          )}
          {toolbar && <div className="mt-7">{toolbar}</div>}
        </section>
        <div className="border-t-1.5 border-ink">{children}</div>
      </main>
      <SiteFooter />
    </>
  );
}
