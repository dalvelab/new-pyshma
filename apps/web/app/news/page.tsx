import { PageShell } from '@/components/layout/PageShell';
import { NewsListing } from '@/components/news/NewsListing';
import { getAllCategories, getNewsPage } from '@/lib/queries';

export const revalidate = 60;

export default async function NewsIndexPage() {
  const [first, categories] = await Promise.all([
    getNewsPage({ pageSize: 8 }),
    getAllCategories(),
  ]);
  return (
    <PageShell
      crumbs={[['Новости']]}
      title={
        <>
          Новости <span className="text-accent">ШИП</span>
        </>
      }
      intro="Что происходит в Верхней Пышме — каждый день, по существу."
    >
      <NewsListing initial={first} categories={categories} />
    </PageShell>
  );
}
