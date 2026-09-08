import Image from 'next/image';
import { Markdown } from '@/components/ui/Markdown';
import { SectionLabel } from '@/components/ui/SectionLabel';

interface Props {
  markdown: string;
  image?: { url: string; alt: string };
}

/** Блок «о проекте»: markdown-текст слева, фото справа. */
export function AboutStory({ markdown, image }: Props) {
  return (
    <section className="px-4 md:px-9 py-9 border-b-1.5 border-ink max-w-page mx-auto">
      <SectionLabel num="01">команда</SectionLabel>
      <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8 md:gap-12 items-start">
        <div className="max-w-[640px] [&>h2:first-child]:mt-0">
          <Markdown>{markdown}</Markdown>
        </div>
        {image && (
          <div className="relative aspect-[3/4] md:sticky md:top-6 rounded-xl overflow-hidden border-1.5 border-ink">
            <Image
              src={image.url}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
