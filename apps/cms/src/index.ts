import type { Core } from '@strapi/strapi';

/**
 * Сверяет ссылки на компоненты во всех схемах (content-types и компонентах)
 * с реально зарегистрированными компонентами рантайма.
 *
 * Если схема ссылается на компонент, которого нет в `strapi.components`
 * (например прод крутит старый/неполный build), сервер всё равно отдаёт его
 * в конфигурации content-manager, а админка падает на этапе построения
 * layout'а: `Cannot read properties of undefined (reading 'attributes')`
 * (см. formatEditLayout → components[uid].attributes в @strapi/content-manager).
 *
 * Здесь мы превращаем этот немой клиентский краш в явную строку в логе сервера
 * с указанием конкретного незарегистрированного компонента.
 */
function auditComponentReferences(strapi: Core.Strapi) {
  const registered = new Set(Object.keys(strapi.components));
  const problems: string[] = [];

  const checkSchema = (uid: string, schema: any) => {
    for (const [field, attr] of Object.entries<any>(schema?.attributes ?? {})) {
      if (attr?.type === 'component' && !registered.has(attr.component)) {
        problems.push(`${uid}.${field} -> "${attr.component}"`);
      }
      if (attr?.type === 'dynamiczone') {
        for (const c of attr.components ?? []) {
          if (!registered.has(c)) problems.push(`${uid}.${field} -> "${c}"`);
        }
      }
    }
  };

  for (const [uid, schema] of Object.entries(strapi.contentTypes)) {
    checkSchema(uid, schema);
  }
  for (const [uid, schema] of Object.entries(strapi.components)) {
    checkSchema(uid, schema);
  }

  if (problems.length) {
    strapi.log.error(
      '[schema-audit] Схема ссылается на НЕзарегистрированные компоненты — ' +
        'из-за этого падает content-manager. Скорее всего рассинхрон build/деплоя. ' +
        'Проблемные ссылки:\n  ' +
        problems.join('\n  '),
    );
    strapi.log.error(
      '[schema-audit] Зарегистрированные компоненты: ' +
        [...registered].sort().join(', '),
    );
  } else {
    strapi.log.info(
      '[schema-audit] OK — все ссылки на компоненты зарегистрированы ' +
        `(${registered.size} компонентов).`,
    );
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
    auditComponentReferences(strapi);
  },
};
