import { NextRequest, NextResponse } from 'next/server';
import { searchMeili } from '@/lib/meilisearch';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') ?? '';
  const hits = await searchMeili(q);
  return NextResponse.json({ hits });
}
