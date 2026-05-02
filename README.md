# Это Новая Пышма — Next.js handoff

Готовый к разработке скелет городского медиа-портала на **Next.js 14 (App Router) + Tailwind + Strapi**. Дизайн-система перенесена 1-в-1 с wireframe-макетов.

## Состав

```
app/
  layout.tsx           базовый каркас, шрифт Montserrat, мета
  page.tsx             главная (Hero + Lead + News + Афиша + Fest + Спорт + Вакансии)
  not-found.tsx        404
  global-error.tsx     общий error boundary
  news/
    page.tsx           листинг + фильтр + «показать ещё»
    loading.tsx        скелетоны
    [slug]/page.tsx    страница новости
  afisha/
    page.tsx           листинг по неделям + фильтры
    loading.tsx
    [slug]/page.tsx    страница мероприятия
  sport/
    page.tsx           справочник секций по категориям
    loading.tsx
    [slug]/page.tsx    страница секции
components/
  layout/   SiteHeader, SiteFooter, PageShell
  home/     блоки главной
  news/     NewsListing, ArticlePage
  afisha/   AfishaListing, EventPage
  sport/    SportListing, SportPage
  ui/       Button, Card, Pill, SectionLabel, PatternBox, ListSkeleton
lib/
  types.ts     все доменные модели
  mock.ts      демо-данные (используются, пока Strapi не подключён)
  strapi.ts    тонкая обёртка над REST + ISR-кэш
  queries.ts   хелперы getAllNews / getNewsBySlug / getAllEvents / getAllSport …
```

## Запуск

```bash
pnpm install
cp .env.example .env.local      # пусто — пойдут моки
pnpm dev
```

Открыть http://localhost:3000.

## Подключение Strapi

В `.env.local`:

```
STRAPI_URL=https://cms.shipmedia.ru
STRAPI_TOKEN=<api-token-with-find-permissions>
```

Ожидаемые коллекции:

| Коллекция        | Поля                                                                                  |
|------------------|---------------------------------------------------------------------------------------|
| `articles`       | slug, title, category, publishedAt, readingTime, cover (media), excerpt, body (rich), isLead |
| `events`         | slug, title, startsAt, endsAt, place, address, category, free, priceFrom, description, geo, gallery |
| `sport-sections` | slug, name, category, venue, address, age, schedule, scheduleDetailed, description, contacts, gallery |
| `vacancies`      | slug, title, salary, experience, schedule                                      |
| `festival-teaser` (single) | date, weekday, ctaUrl                                                       |

`lib/strapi.ts` возвращает `null` при ошибке/отсутствии URL — все страницы автоматически переключаются на моки из `lib/mock.ts`. Это значит, что фронт можно запускать и показывать клиенту параллельно с настройкой CMS.

## Изображения

Сейчас на местах фотографий — `<PatternBox>` с CSS-паттернами. Когда в Strapi появятся реальные cover-медиа, заменить в:
- `components/home/LeadStory.tsx`, `NewsCard.tsx`, `AfishaCard.tsx`
- `components/news/ArticlePage.tsx` (кавер + блоки `image`)
- `components/afisha/EventPage.tsx` (постер + галерея)
- `components/sport/SportPage.tsx` (галерея)

на `<Image>` из `next/image`. Домен Strapi нужно прописать в `next.config.js → images.remotePatterns`.

## Состояния

- **Skeleton-загрузка** — `app/<route>/loading.tsx`, рендерится автоматически пока ждёт данные.
- **Пустое состояние** — встроено в `NewsListing` / `AfishaListing` / `SportListing` (карточка с пунктирной рамкой).
- **404** — `app/not-found.tsx`, вызывается через `notFound()` из `[slug]`-страниц.
- **Ошибка** — `app/global-error.tsx`, ловит исключения и предлагает перезагрузить.

## Что осталось доделать

- Поиск (модалка из шапки) — пока заглушка-кнопка.
- Страница вакансии (`/vacancies/[slug]`) и страница фестиваля.
- `next/image` вместо `PatternBox` после подключения медиа.
- Реальная карта в `EventPage` — сейчас плейсхолдер с координатами.
- E2E-тесты (Playwright) и аналитика.
