import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  meilisearch: {
    config: {
      host: env('MEILI_HOST', 'http://localhost:7700'),
      apiKey: env('MEILI_MASTER_KEY'),

      'api::article.article': {
        indexName: 'articles',
        entriesQuery: { populate: { category: true }, limit: 500 },
        settings: {
          searchableAttributes: ['title', 'excerpt', 'body', 'categoryName'],
          filterableAttributes: ['categoryName'],
          sortableAttributes: ['publishedAt', 'createdAt'],
        },
        transformEntry({ entry }) {
          return {
            id: entry.id,
            documentId: entry.documentId,
            slug: entry.slug,
            title: entry.title,
            excerpt: entry.excerpt ?? null,
            body: typeof entry.body === 'string' ? entry.body : null,
            categoryName: entry.category?.name ?? null,
            publishedAt: entry.publishedAt ?? null,
            createdAt: entry.createdAt ?? null,
          };
        },
      },

      'api::afisha.afisha': {
        indexName: 'afishas',
        entriesQuery: {
          populate: { show: true, location: true },
          limit: 500,
        },
        settings: {
          searchableAttributes: [
            'title',
            'showTitle',
            'showSmallDescription',
            'showDescription',
            'locationName',
          ],
          filterableAttributes: ['locationName', 'free'],
          sortableAttributes: ['startsAt'],
        },
        transformEntry({ entry }) {
          return {
            id: entry.id,
            documentId: entry.documentId,
            slug: entry.slug,
            title: entry.title,
            showTitle: entry.show?.title ?? null,
            showSmallDescription: entry.show?.small_description ?? null,
            showDescription:
              typeof entry.show?.description === 'string' ? entry.show.description : null,
            locationName: entry.location?.name ?? null,
            startsAt: entry.startsAt,
            free: entry.free ?? false,
          };
        },
      },

      'api::sport.sport': {
        indexName: 'sports',
        entriesQuery: {
          populate: { category: true, location: true },
          limit: 500,
        },
        settings: {
          searchableAttributes: [
            'name',
            'description',
            'age',
            'schedule',
            'locationName',
            'categoryName',
          ],
          filterableAttributes: ['categoryName'],
        },
        transformEntry({ entry }) {
          return {
            id: entry.id,
            documentId: entry.documentId,
            slug: entry.slug,
            name: entry.name,
            description: entry.description ?? null,
            age: entry.age,
            schedule: entry.schedule,
            locationName: entry.location?.name ?? null,
            categoryName: entry.category?.name ?? null,
          };
        },
      },

      'api::vacancy.vacancy': {
        indexName: 'vacancies',
        entriesQuery: { populate: { category: true }, limit: 500 },
        settings: {
          searchableAttributes: [
            'title',
            'description',
            'company',
            'salary',
            'schedule',
            'categoryName',
          ],
          filterableAttributes: ['categoryName', 'employmentType'],
        },
        transformEntry({ entry }) {
          return {
            id: entry.id,
            documentId: entry.documentId,
            slug: entry.slug,
            title: entry.title,
            company: entry.company ?? null,
            description: entry.description ?? null,
            salary: entry.salary,
            schedule: entry.schedule,
            employmentType: entry.employmentType ?? null,
            categoryName: entry.category?.name ?? null,
          };
        },
      },
    },
  },
});

export default config;
