// app/context.json/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getProfileBySlug, type Env } from '@/lib/db';
import { mockProfile } from '@/lib/mock-data';
import { generateContextJson } from '@/lib/generators/context-json';

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

  return new NextResponse(generateContextJson(profile), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
