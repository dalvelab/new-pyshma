import { notFound } from 'next/navigation';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { ArticlePage } from '@/components/news/ArticlePage';
import { getAllNews, getNewsBySlug } from '@/lib/queries';

export const revalidate = 60;

/* SSG для всех новостей; на проде Strapi-данные подтянутся при ревалидации. */
export async function generateStaticParams() {
  const all = await getAllNews();
  return all.map((a) => ({ slug: a.slug }));
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
