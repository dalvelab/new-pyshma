import { PageShell } from '@/components/layout/PageShell';
import { searchMeili } from '@/lib/meilisearch';
import type { SearchHit } from '@/lib/types';

export const dynamic = 'force-dynamic';

const KIND_LABEL: Record<SearchHit['kind'], string> = {
  news: 'новости',
  event: 'афиша',
  sport: 'спорт',
  vacancy: 'вакансии',
};
const KIND_HREF: Record<SearchHit['kind'], (slug: string) => string> = {
  news: (s) => `/news/${s}`,
  event: (s) => `/afisha/${s}`,
  sport: (s) => `/sport/${s}`,
  vacancy: (s) => `/vacancies/${s}`,
};

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = searchParams.q ?? '';
  const hits = q ? await searchMeili(q) : [];
  const grouped = hits.reduce<Record<SearchHit['kind'], SearchHit[]>>(
    (acc, h) => {
      (acc[h.kind] ||= []).push(h);
      return acc;
    },
    { news: [], event: [], sport: [], vacancy: [] },
  );

  return (
    <PageShell
      crumbs={[['Поиск']]}
      title={
        q ? (
          <>
            Поиск: <span className="text-accent">«{q}»</span>
          </>
        ) : (
          <>
            Поиск <span className="text-accent">по порталу</span>
          </>
        )
      }
      intro={
        q
          ? `Нашли ${hits.length} материалов по запросу.`
          : 'Введи что-нибудь в поиске сверху или нажми ⌘K.'
      }
    >
      {q && hits.length === 0 ? (
        <section className="px-4 md:px-9 py-12 max-w-page mx-auto">
          <div className="border-1.5 border-dashed border-ink-30 rounded-xl p-10 text-center">
            <div className="font-extrabold text-3xl">Ничего не нашли</div>
            <div className="mt-3 text-base text-ink-70">
              Попробуй другой запрос или загляни в новости / афишу напрямую.
            </div>
          </div>
        </section>
      ) : (
        <section className="px-4 md:px-9 py-9 max-w-page mx-auto flex flex-col gap-10">
          {(Object.keys(grouped) as SearchHit['kind'][]).map(
            (k) =>
              grouped[k].length > 0 && (
                <div key={k}>
                  <div className="flex items-baseline gap-3 mb-4">
                    <h3 className="m-0 font-extrabold text-xl tracking-tight uppercase">
                      {KIND_LABEL[k]}
                    </h3>
                    <span className="text-xs text-ink-50">{grouped[k].length}</span>
                    <span className="flex-1 h-[1.5px] bg-ink" />
                  </div>
                  <ul className="m-0 p-0 list-none">
                    {grouped[k].map((h) => (
                      <li key={`${h.kind}-${h.slug}`}>
                        <a
                          href={KIND_HREF[h.kind](h.slug)}
                          className="block py-4 border-b border-dashed border-ink-20"
                        >
                          <div className="text-xs text-ink-50 mb-1">{h.subtitle}</div>
                          <div className="font-extrabold text-[20px] leading-[1.2]">{h.title}</div>
                          {h.excerpt && (
                            <div className="mt-1 text-sm text-ink-70 max-w-[640px]">
                              {h.excerpt}
                            </div>
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ),
          )}
        </section>
      )}
    </PageShell>
  );
}
