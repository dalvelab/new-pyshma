/** Окно ISR-кеша Next.js. В dev короче, чтобы изменения в Strapi
 *  становились видны почти сразу; в prod — стандартные 60 сек. */
export const REVALIDATE_SECONDS = process.env.NODE_ENV === 'development' ? 5 : 60;
