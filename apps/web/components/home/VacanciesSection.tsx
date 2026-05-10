import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SectionLabel } from '@/components/ui/SectionLabel';
import type { Vacancy } from '@/lib/types';

interface Props {
  items: Vacancy[];
}

export function VacanciesSection({ items }: Props) {
  return (
    <div>
      <SectionLabel>Вакансии</SectionLabel>
      <div className="flex flex-col gap-2.5">
        {items.map((v) => (
          <a key={v.id} href={`/vacancies/${v.slug}`}>
            <Card className="p-3.5 flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-2.5 sm:items-center">
              <div className="min-w-0">
                <div className="font-bold text-[15px] leading-[1.2]">{v.title}</div>
                <div className="text-xs text-ink-50 mt-1">
                  {v.experience} · {v.schedule}
                </div>
              </div>
              <span className="self-start sm:self-auto flex-none px-2.5 py-1.5 rounded-full bg-accent text-white font-bold text-xs">
                {v.salary}
              </span>
            </Card>
          </a>
        ))}
      </div>
      <div className="mt-4">
        <Button href="/vacancies">все вакансии →</Button>
      </div>
    </div>
  );
}
