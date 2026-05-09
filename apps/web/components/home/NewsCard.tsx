import Image from 'next/image';
import type { Article } from '@/lib/types';
import { Card } from '@/components/ui/Card';
import { Pill } from '@/components/ui/Pill';
import { formatNewsDate } from './format';

interface Props {
  article: Article;
  big?: boolean;
}

export function NewsCard({ article, big }: Props) {
  return (
    <a href={`/news/${article.slug}`} className="block">
      <Card className="flex flex-col h-full">
        <div className={`relative ${big ? 'h-[220px]' : 'h-40'} overflow-hidden`}>
          <Image
            src={article.cover.url}
            alt={article.cover.alt ?? article.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
        <div className="p-4 flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <Pill variant='default'>
              {article.category}
            </Pill>
            <span className="font-sans text-[11px] text-ink-50">
              {formatNewsDate(article.createdAt)}
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
