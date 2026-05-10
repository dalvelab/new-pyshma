/* Автогенерация slug = транслит(name) + '-dd-mm-yyyy'. */

import { buildSlug } from '../../../../utils/slug';

declare const strapi: any;

export default {
  beforeCreate(event: { params: { data: Record<string, any> } }) {
    const { data } = event.params;
    if (data.name) {
      data.slug = buildSlug(data.name, new Date());
    }
  },

  async beforeUpdate(event: {
    params: { data: Record<string, any>; where?: { id?: number } };
  }) {
    const { data, where } = event.params;
    if (!data.name) return;

    let createdAt = new Date();
    if (where?.id) {
      const existing = await strapi.db
        .query('api::sport.sport')
        .findOne({ where: { id: where.id }, select: ['createdAt'] });
      if (existing?.createdAt) createdAt = new Date(existing.createdAt);
    }
    data.slug = buildSlug(data.name, createdAt);
  },
};
