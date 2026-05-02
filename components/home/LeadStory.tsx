import type { Article } from '@/lib/types';
import { Card } from '@/components/ui/Card';
import { Pill } from '@/components/ui/Pill';
import { Button } from '@/components/ui/Button';
import { PatternBox } from '@/components/ui/PatternBox';
import { formatNewsTime } from './format';

interface Props {
  lead: Article;
}

export function LeadStory({ lead }: Props) {
  return (
    <section className="px-9 pt-2 pb-9 max-w-page mx-auto">
      <Card className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr]">
        <PatternBox
          className="h-[460px]"
          pattern={lead.fallbackPattern ?? 'warm'}
          illustration="pond"
          label="главная история"
          rounded={false}
          dark
        />
        <div className="p-8 flex flex-col gap-3.5">
          <div className="flex gap-2">
            <Pill variant="accent">главное</Pill>
            <Pill>{lead.category}</Pill>
          </div>
          <div className="font-semibold text-xs text-ink-50 tracking-[0.06em]">
            {formatNewsTime(lead.publishedAt)}
            {lead.readingTime ? ` · ${lead.readingTime} МИН` : ''}
          </div>
          <h2 className="font-extrabold text-[38px] leading-[1.05] tracking-tight text-balance m-0">
            {lead.title}
          </h2>
          <p className="m-0 text-base leading-relaxed text-ink-70">
            Деревянный амфитеатр, лавочки-волны и зона воркаута. Что там есть и когда первый концерт
            — рассказывает архитектор проекта.
          </p>
          <div className="mt-auto pt-2">
            <Button href={`/news/${lead.slug}`}>читать целиком →</Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
