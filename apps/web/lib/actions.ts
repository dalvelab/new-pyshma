'use server';

import { getNewsPage, type NewsPage } from './queries';

export async function loadNewsPage(args: {
  page: number;
  category?: string;
}): Promise<NewsPage> {
  return getNewsPage({ page: args.page, pageSize: 8, category: args.category });
}
