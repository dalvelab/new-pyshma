/* Lifecycle для Article:
   1. Slug = транслит(title) + '-dd-mm-yyyy'. На update пересчитывается
      с createdAt из БД, чтобы дата в URL не «сдвигалась» при правке.
   2. isLead — единственный: при сохранении статьи с isLead=true сбрасываем
      флаг у всех остальных, чтобы на главной всегда был ровно один лид. */

import { buildSlug } from '../../../../utils/slug';

declare const strapi: any;

async function unsetOtherLeads(excludeId?: number): Promise<void> {
  const where: Record<string, any> = { isLead: true };
  if (excludeId !== undefined) where.id = { $ne: excludeId };
  await strapi.db.query('api::article.article').updateMany({
    where,
    data: { isLead: false },
  });
}

export default {
  async beforeCreate(event: { params: { data: Record<string, any> } }) {
    const { data } = event.params;
    if (data.title) {
      data.slug = buildSlug(data.title, new Date());
    }
    if (data.isLead === true) {
      await unsetOtherLeads();
    }
  },

  async beforeUpdate(event: {
    params: { data: Record<string, any>; where?: { id?: number } };
  }) {
    const { data, where } = event.params;

    if (data.title) {
      let createdAt = new Date();
      if (where?.id) {
        const existing = await strapi.db
          .query('api::article.article')
          .findOne({ where: { id: where.id }, select: ['createdAt'] });
        if (existing?.createdAt) createdAt = new Date(existing.createdAt);
      }
      data.slug = buildSlug(data.title, createdAt);
    }

    if (data.isLead === true) {
      await unsetOtherLeads(where?.id);
    }
  },
};
