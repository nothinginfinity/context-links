// app/links.json/route.ts
// data-spec-source: #file-output-spec /links.json

import { NextResponse } from 'next/server';
import { mockProfile } from '@/lib/mock-data';
import { generateLinksJson } from '@/lib/generators/links-json';

export async function GET() {
  const content = generateLinksJson(mockProfile);
  return new NextResponse(content, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
