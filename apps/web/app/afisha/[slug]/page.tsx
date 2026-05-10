import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { EventPage } from '@/components/afisha/EventPage';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { buildMetadata } from '@/lib/metadata';
import { getAllEvents, getEventBySlug } from '@/lib/queries';

export const revalidate = 60;

export async function generateStaticParams() {
  const all = await getAllEvents();
  return all.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const event = await getEventBySlug(params.slug);
  if (!event) return {};
  return buildMetadata({
    title: event.title,
    description: event.description ?? event.body?.slice(0, 200),
    imageUrl: event.cover.url,
    imageAlt: event.cover.alt ?? event.title,
  });
}

export default async function AfishaEventRoute({ params }: { params: { slug: string } }) {
  const event = await getEventBySlug(params.slug);
  if (!event) notFound();
  return (
    <>
      <SiteHeader />
      <main>
        <EventPage event={event} />
      </main>
      <SiteFooter />
    </>
  );
}
