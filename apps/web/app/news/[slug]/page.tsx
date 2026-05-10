import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { ArticlePage } from '@/components/news/ArticlePage';
import { buildMetadata } from '@/lib/metadata';
import { getAllNews, getNewsBySlug } from '@/lib/queries';

export const revalidate = 60;

/* SSG для всех новостей; на проде Strapi-данные подтянутся при ревалидации. */
export async function generateStaticParams() {
  const all = await getAllNews();
  return all.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = await getNewsBySlug(params.slug);
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    description: article.excerpt ?? article.body?.slice(0, 200),
    imageUrl: article.cover.url,
    imageAlt: article.cover.alt ?? article.title,
  });
}

export default async function NewsArticleRoute({ params }: { params: { slug: string } }) {
  const article = await getNewsBySlug(params.slug);
  if (!article) notFound();
  return (
    <>
      <SiteHeader />
      <main>
        <ArticlePage article={article} />
      </main>
      <SiteFooter />
    </>
  );
}
