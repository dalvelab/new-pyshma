# Деплой на VDS

Web и Strapi на одной VDS, без домена, по HTTP.

| Сервис   | URL                              |
|----------|----------------------------------|
| Web      | http://176.53.160.167:3001       |
| Strapi   | http://176.53.160.167:3002       |
| Admin    | http://176.53.160.167:3002/admin |

Process manager — PM2, конфиг `ecosystem.config.js` в корне репо.

## Первый деплой

```bash
ssh root@176.53.160.167
cd /var/www
git clone <repo-url> new-pyshma
cd new-pyshma

# 1. Зависимости
( cd apps/cms && npm ci )
( cd apps/web && npm ci )

# 2. .env-файлы
cp apps/cms/.env.example apps/cms/.env
cp apps/web/.env.example apps/web/.env.local
```

В **`apps/cms/.env`**:
- `PORT=3002`
- Сгенерируй новые секреты (по 16 байт base64):
  ```bash
  for k in APP_KEYS API_TOKEN_SALT ADMIN_JWT_SECRET TRANSFER_TOKEN_SALT JWT_SECRET ENCRYPTION_KEY; do
    echo "$k=$(node -e 'console.log(require(\"crypto\").randomBytes(16).toString(\"base64\"))')"
  done
  ```
  `APP_KEYS` сделать комбинированным из 2-3 значений через запятую.

В **`apps/web/.env.local`**:
```
STRAPI_URL=http://176.53.160.167:3002
NEXT_PUBLIC_SITE_URL=http://176.53.160.167:3001
```

```bash
# 3. Сборка
( cd apps/cms && npm run build )
( cd apps/web && npm run build )

# 4. PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup        # автозапуск после reboot
```

## После первого запуска Strapi

1. Открой http://176.53.160.167:3002/admin → создай admin-пользователя.
2. **Settings → Users & Permissions Plugin → Roles → Public** — открой `find`/`findOne` для всех публичных коллекций:
   - Article, Category
   - Afisha, Show, Location
   - Sport, Sport Category
   - Vacancy, Vacancy Category
   - Festival, Festival Program, Past Festival
   - Footer
3. Заполни контент.

## Обновление

```bash
cd /var/www/new-pyshma
git pull
( cd apps/cms && npm ci && npm run build )
( cd apps/web && npm ci && npm run build )
pm2 restart all
```

## Бэкап

Что копировать на бэкапном задании:
- `apps/cms/.tmp/data.db` — SQLite-база
- `apps/cms/public/uploads/` — загруженные файлы (картинки, PDF)
- `apps/cms/.env` — секреты

## Фаервол

Открой порты `3001` и `3002` (ufw/iptables/панель провайдера). SSH (22) — только с твоего IP.

## Когда появится домен/SSL

Поправить:
- `apps/web/next.config.js` → `images.remotePatterns` (новый hostname)
- `apps/web/.env.local` → `STRAPI_URL`, `NEXT_PUBLIC_SITE_URL`
- nginx-проксирование `/api/cms/` → `localhost:3002` (если хочешь скрыть порт Strapi за общим доменом)

## Что важно знать

- **Без HTTPS**: пароль admin Strapi летит открытым текстом — заходи только из доверенной сети.
- **CRON**: задача очистки прошедших Afisha работает автоматически (см. `apps/cms/config/cron-tasks.ts`). Отключить — `CRON_ENABLED=false`.
- **Кеш Next.js**: на проде `revalidate = 60 сек` для страниц и для большинства fetch'ей. Изменения в Strapi появятся максимум через минуту.
