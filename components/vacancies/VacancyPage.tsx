import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Pill } from '@/components/ui/Pill';
import type { Vacancy } from '@/lib/types';

interface Props {
  vacancy: Vacancy;
  similar: Vacancy[];
}

export function VacancyPage({ vacancy: v, similar }: Props) {
  return (
    <article>
      <section className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-10 px-4 md:px-9 py-10 max-w-page mx-auto">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {v.category && <Pill variant="light">{v.category}</Pill>}
            {v.employmentType && <Pill>{v.employmentType}</Pill>}
          </div>
          <h1 className="m-0 font-extrabold text-[32px] sm:text-[44px] md:text-[60px] leading-[0.96] tracking-tighter2 text-balance">
            {v.title}
          </h1>
          {v.company && <div className="text-lg text-ink-70">{v.company}</div>}
          {v.description && (
            <p className="m-0 text-base leading-relaxed text-ink-70 max-w-[560px]">
              {v.description}
            </p>
          )}

          {v.responsibilities?.length ? (
            <div className="mt-3">
              <div className="text-[11px] uppercase tracking-[0.1em] text-ink-50 font-bold mb-2">
                что делать
              </div>
              <ul className="m-0 pl-5 flex flex-col gap-1.5">
                {v.responsibilities.map((r, i) => (
                  <li key={i} className="text-base">
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {v.requirements?.length ? (
            <div className="mt-3">
              <div className="text-[11px] uppercase tracking-[0.1em] text-ink-50 font-bold mb-2">
                что важно
              </div>
              <ul className="m-0 pl-5 flex flex-col gap-1.5">
                {v.requirements.map((r, i) => (
                  <li key={i} className="text-base">
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {v.perks?.length ? (
            <div className="mt-3">
              <div className="text-[11px] uppercase tracking-[0.1em] text-ink-50 font-bold mb-2">
                плюшки
              </div>
              <ul className="m-0 pl-5 flex flex-col gap-1.5">
                {v.perks.map((r, i) => (
                  <li key={i} className="text-base">
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <aside className="md:sticky md:top-[100px] self-start">
          <Card className="p-5 flex flex-col gap-3">
            <div>
              <div className="text-[11px] uppercase tracking-[0.1em] text-ink-50 font-bold">
                зарплата
              </div>
              <div className="font-extrabold text-2xl mt-1">{v.salary}</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.1em] text-ink-50 font-bold">
                опыт
              </div>
              <div className="font-semibold mt-1">{v.experience}</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.1em] text-ink-50 font-bold">
                график
              </div>
              <div className="font-semibold mt-1">{v.schedule}</div>
            </div>
            <Button variant="primary" full>
              откликнуться
            </Button>
            {v.contacts && (
              <div className="mt-2 flex flex-col gap-1 text-sm">
                {v.contacts.email && (
                  <a href={`mailto:${v.contacts.email}`} className="font-semibold">
                    {v.contacts.email}
                  </a>
                )}
                {v.contacts.phone && (
                  <a href={`tel:${v.contacts.phone}`} className="font-semibold">
                    {v.contacts.phone}
                  </a>
                )}
                {v.contacts.tg && (
                  <a href={`https://t.me/${v.contacts.tg}`} className="font-semibold">
                    tg · {v.contacts.tg}
                  </a>
                )}
              </div>
            )}
          </Card>
        </aside>
      </section>

      {similar.length > 0 && (
        <section className="px-4 md:px-9 py-9 border-t-1.5 border-ink bg-paper-2">
          <div className="max-w-page mx-auto">
            <h2 className="m-0 mb-5 font-extrabold text-[28px] tracking-tight">Похожие вакансии</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {similar.map((s) => (
                <a key={s.id} href={`/vacancies/${s.slug}`}>
                  <Card className="p-4 flex flex-col gap-2 h-full">
                    <div className="font-bold text-[17px] leading-[1.2]">{s.title}</div>
                    <div className="text-xs text-ink-50">
                      {s.experience} · {s.schedule}
                    </div>
                    <span className="mt-auto self-start px-2.5 py-1 rounded-full bg-accent text-white font-bold text-xs">
                      {s.salary}
                    </span>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
