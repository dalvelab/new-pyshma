/* Автогенерация slug = транслит(title) + '-dd-mm-yyyy'.
   Дата берётся от createdAt записи: при create — текущая, при update —
   из БД, чтобы пересчёт slug при правке title не «сдвигал» дату. */

import CyrillicToTranslit from 'cyrillic-to-translit-js';

declare const strapi: any;

const translit = CyrillicToTranslit();

function formatDate(d: Date): string {
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

function buildSlug(title: string, date: Date): string {
  const cleaned = title.replace(/[,?]/gi, '');
  const base = translit.transform(cleaned, '-').toLowerCase();
  return `${base}-${formatDate(date)}`;
}

export default {
  beforeCreate(event: { params: { data: Record<string, any> } }) {
    const { data } = event.params;
    if (data.title) {
      data.slug = buildSlug(data.title, new Date());
    }
  },

  async beforeUpdate(event: {
    params: { data: Record<string, any>; where?: { id?: number } };
  }) {
    const { data, where } = event.params;
    if (!data.title) return;

    let createdAt = new Date();
    if (where?.id) {
      const existing = await strapi.db
        .query('api::article.article')
        .findOne({ where: { id: where.id }, select: ['createdAt'] });
      if (existing?.createdAt) createdAt = new Date(existing.createdAt);
    }
    data.slug = buildSlug(data.title, createdAt);
  },
};
