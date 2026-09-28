import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Pill } from '@/components/ui/Pill';
import type { Article } from '@/lib/types';
import { formatNewsTime } from './format';

interface Props {
  lead: Article;
}

export function LeadStory({ lead }: Props) {
  return (
    <section className="px-4 md:px-9 pt-8 md:pt-10 pb-9 max-w-page mx-auto">
      <Card className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr]">
        <div className="relative h-[220px] md:h-[460px] overflow-hidden">
          <Image
            src={lead.cover.url}
            alt={lead.cover.alt ?? lead.title}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="p-5 md:p-8 flex flex-col gap-3.5">
          <div className="flex gap-2">
            <Pill>{lead.category}</Pill>
          </div>
          <div className="font-semibold text-xs text-ink-50 tracking-[0.06em]">
            {formatNewsTime(lead.createdAt)}
            {lead.readingTime ? ` · ${lead.readingTime} МИН` : ''}
          </div>
          <h2 className="font-extrabold text-[26px] md:text-[38px] leading-[1.1] md:leading-[1.05] tracking-tight text-balance m-0">
            {lead.title}
          </h2>
          {lead.excerpt && (
            <p className="m-0 text-base leading-relaxed text-ink-70">{lead.excerpt}</p>
          )}
          <div className="mt-auto pt-2">
            <Button href={`/news/${lead.slug}`}>читать целиком →</Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
