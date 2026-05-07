import { PageShell } from '@/components/layout/PageShell';
import { NewsListing } from '@/components/news/NewsListing';
import { getAllNews } from '@/lib/queries';

export const revalidate = 60;

export default async function NewsIndexPage() {
  const items = await getAllNews();
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
      <NewsListing items={items} />
    </PageShell>
  );
}
