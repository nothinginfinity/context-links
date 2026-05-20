// app/llms.txt/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getProfileBySlug, type Env } from '@/lib/db';
import { mockProfile } from '@/lib/mock-data';
import { generateLlmsTxt } from '@/lib/generators/llms-txt';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const baseUrl = new URL(request.url).origin;
  let profile = mockProfile;

  try {
    const env = process.env as unknown as Env;
    if (env.DB) {
      const dbProfile = await getProfileBySlug(env.DB, 'jared-edwards');
      if (dbProfile) profile = dbProfile;
    }
  } catch (_) {}

  return new NextResponse(generateLlmsTxt(profile, baseUrl), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
