// app/context.md/route.ts
// data-spec-source: #file-output-spec /context.md

import { NextResponse } from 'next/server';
import { mockProfile } from '@/lib/mock-data';
import { generateContextMd } from '@/lib/generators/context-md';

export async function GET() {
  const content = generateContextMd(mockProfile);
  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
