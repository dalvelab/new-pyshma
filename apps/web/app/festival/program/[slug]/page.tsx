import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { Markdown } from '@/components/ui/Markdown';
import { buildMetadata } from '@/lib/metadata';
import { getFestivalProgramBySlug, getFestivalPrograms } from '@/lib/queries';

export const revalidate = 60;

export async function generateStaticParams() {
  const all = await getFestivalPrograms();
  return all.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const program = await getFestivalProgramBySlug(params.slug);
  if (!program) return {};
  return buildMetadata({
    title: program.title,
    description: program.body?.slice(0, 200) ?? program.location.name,
    imageUrl: program.cover.url,
    imageAlt: program.cover.alt ?? program.title,
  });
}

export default async function FestivalProgramRoute({
  params,
}: {
  params: { slug: string };
}) {
  const program = await getFestivalProgramBySlug(params.slug);
  if (!program) notFound();

  const date = new Date(program.date);
  const fullDate = date.toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <>
      <SiteHeader />
      <main>
        <article>
          <section className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-10 px-4 md:px-9 py-10 max-w-page mx-auto">
            <div className="relative h-[260px] sm:h-[360px] md:h-[460px] overflow-hidden">
              <Image
                src={program.cover.url}
                alt={program.cover.alt ?? program.title}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="m-0 font-extrabold text-[36px] sm:text-[48px] md:text-[60px] leading-[0.96] tracking-tighter2 text-balance">
                {program.title}
              </h1>
              <dl className="grid grid-cols-[88px_1fr] sm:grid-cols-[120px_1fr] gap-y-2 text-[15px] mt-2">
                <dt className="text-ink-50">когда</dt>
                <dd className="m-0 font-semibold">{fullDate}</dd>
                <dt className="text-ink-50">где</dt>
                <dd className="m-0 font-semibold">
                  {program.location.name}
                  {program.location.address ? `, ${program.location.address}` : ''}
                </dd>
              </dl>
            </div>
          </section>

          {program.body && (
            <section className="px-4 md:px-9 pb-10 max-w-[760px] mx-auto">
              <Markdown>{program.body}</Markdown>
            </section>
          )}
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
