import type { Article } from '@/lib/types';
import { Card } from '@/components/ui/Card';
import { Pill } from '@/components/ui/Pill';
import { PatternBox } from '@/components/ui/PatternBox';
import { formatNewsDate } from './format';

interface Props {
  article: Article;
  big?: boolean;
}

export function NewsCard({ article, big }: Props) {
  return (
    <a href={`/news/${article.slug}`} className="block">
      <Card className="flex flex-col h-full">
        <PatternBox
          className={big ? 'h-[220px]' : 'h-40'}
          pattern={article.fallbackPattern ?? 'cross'}
          label="фото"
          rounded={false}
        />
        <div className="p-4 flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <Pill variant={article.category === 'главное' ? 'accent' : 'default'}>
              {article.category}
            </Pill>
            <span className="font-sans text-[11px] text-ink-50">
              {formatNewsDate(article.publishedAt)}
            </span>
          </div>
          <h3
            className={`font-bold text-balance ${big ? 'text-[22px]' : 'text-base'} leading-[1.22] m-0`}
          >
            {article.title}
          </h3>
        </div>
      </Card>
    </a>
  );
}
