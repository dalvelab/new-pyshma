/* Автогенерация slug = транслит(title) + '-dd-mm-yyyy'. */

import { buildSlug } from '../../../../utils/slug';

declare const strapi: any;

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
        .query('api::vacancy.vacancy')
        .findOne({ where: { id: where.id }, select: ['createdAt'] });
      if (existing?.createdAt) createdAt = new Date(existing.createdAt);
    }
    data.slug = buildSlug(data.title, createdAt);
  },
};
