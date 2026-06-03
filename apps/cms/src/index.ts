import type { Core } from '@strapi/strapi';

const CORE_STORE_TABLE = 'strapi_core_store_settings';
const CM_CONFIG_PREFIX =
  'plugin_content_manager_configuration_content_types::';

const SCALAR_TYPES = new Set([
  'string',
  'text',
  'uid',
  'email',
  'password',
  'integer',
  'biginteger',
  'float',
  'decimal',
  'date',
  'datetime',
  'time',
  'enumeration',
  'boolean',
]);

/**
 * Чинит сохранённые конфигурации content-manager, у которых `mainField` /
 * `defaultSortBy` ссылаются на несуществующее поле (например `documentId`).
 *
 * Такое происходит, когда у content-type нет ни одного скалярного поля —
 * Strapi проставляет невалидный mainField, и при открытии раздела админка
 * падает: `Cannot read properties of undefined (reading 'attributes')`.
 *
 * Конфигурация живёт в БД, а не в коде, поэтому правку нельзя задеплоить
 * через схему — этот self-heal приводит конфиг в порядок при старте на любом
 * окружении (dev/prod), только если он действительно сломан.
 */
async function repairContentManagerConfigs(strapi: Core.Strapi) {
  try {
    const knex = strapi.db.connection;
    const rows: Array<{ key: string; value: string }> = await knex(
      CORE_STORE_TABLE,
    ).where('key', 'like', `${CM_CONFIG_PREFIX}%`);

    for (const row of rows) {
      if (!row?.value) continue;
      const uid = row.key.slice(CM_CONFIG_PREFIX.length);
      const schema = strapi.contentTypes[uid as keyof typeof strapi.contentTypes];
      if (!schema) continue;

      const attrs = schema.attributes ?? {};
      const isKnownField = (f?: string) =>
        !!f && (f === 'id' || Object.prototype.hasOwnProperty.call(attrs, f));
      const isScalar = (f: string) =>
        f === 'id' || SCALAR_TYPES.has((attrs as any)[f]?.type);

      // Подходящее поле для mainField: первое скалярное, иначе id.
      const fallback = Object.keys(attrs).find(isScalar) ?? 'id';

      let cfg: any;
      try {
        cfg = JSON.parse(row.value);
      } catch {
        continue;
      }

      let changed = false;
      cfg.settings ??= {};
      if (!isKnownField(cfg.settings.mainField)) {
        cfg.settings.mainField = fallback;
        changed = true;
      }
      if (!isKnownField(cfg.settings.defaultSortBy)) {
        cfg.settings.defaultSortBy = fallback;
        changed = true;
      }

      // Из list-layout убираем поля, которых уже нет в схеме, а также
      // компоненты/динамические зоны — их нельзя отрисовать колонкой списка.
      if (Array.isArray(cfg.layouts?.list)) {
        const renderableInList = (f: string) =>
          isKnownField(f) &&
          !['component', 'dynamiczone'].includes((attrs as any)[f]?.type);
        const cleaned = cfg.layouts.list.filter(renderableInList);
        if (cleaned.length !== cfg.layouts.list.length) {
          cfg.layouts.list = cleaned.length ? cleaned : ['id'];
          changed = true;
        }
      }

      if (changed) {
        await knex(CORE_STORE_TABLE)
          .where('key', row.key)
          .update({ value: JSON.stringify(cfg) });
        strapi.log.info(
          `[content-manager] repaired view configuration for ${uid}`,
        );
      }
    }
  } catch (err) {
    strapi.log.error('[content-manager] failed to repair view configurations');
    strapi.log.error(err as Error);
  }
}

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await repairContentManagerConfigs(strapi);
  },
};
