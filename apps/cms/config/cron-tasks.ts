/** Раз в сутки удаляет из Afisha записи, у которых startsAt уже в прошлом. */
const cronTasks = {
  deletePastAfisha: {
    task: async ({ strapi }) => {
      try {
        const now = new Date().toISOString();
        const items = await strapi.documents('api::afisha.afisha').findMany({
          filters: { startsAt: { $lt: now } },
          fields: ['documentId'],
        });

        for (const item of items) {
          await strapi
            .documents('api::afisha.afisha')
            .delete({ documentId: item.documentId });
        }
        strapi.log.info(`[cron] deletePastAfisha: removed ${items.length} past entries`);
      } catch (err) {
        strapi.log.error('[cron] deletePastAfisha failed', err);
      }
    },
    options: {
      // каждый день в 03:00 локального времени сервера
      rule: '0 3 * * *',
    },
  },
};

export default cronTasks;
