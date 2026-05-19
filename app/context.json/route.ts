// app/context.json/route.ts
// data-spec-source: #file-output-spec /context.json

import { NextResponse } from 'next/server';
import { mockProfile } from '@/lib/mock-data';
import { generateContextJson } from '@/lib/generators/context-json';

export async function GET() {
  const content = generateContextJson(mockProfile);
  return new NextResponse(content, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
