// app/context.md/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getProfileBySlug, type Env } from '@/lib/db';
import { mockProfile } from '@/lib/mock-data';
import { generateContextMd } from '@/lib/generators/context-md';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  let profile = mockProfile;

  try {
    const env = process.env as unknown as Env;
    if (env.DB) {
      const dbProfile = await getProfileBySlug(env.DB, 'jared-edwards');
      if (dbProfile) profile = dbProfile;
    }
  } catch (_) {}

  return new NextResponse(generateContextMd(profile), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
