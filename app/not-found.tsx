import { PageShell } from '@/components/layout/PageShell';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <PageShell
      crumbs={[['Не найдено']]}
      title={
        <>
          404 · <span className="text-accent">не нашли</span>
        </>
      }
      intro="Страница переехала или никогда не существовала. Можно вернуться на главную или поискать новости."
    >
      <section className="px-9 py-12 max-w-[640px] mx-auto flex gap-2.5">
        <Button variant="primary" href="/">
          на главную
        </Button>
        <Button href="/news">все новости</Button>
      </section>
    </PageShell>
  );
}
