// app/llms.txt/route.ts
// data-spec-source: #file-output-spec /llms.txt

import { NextResponse } from 'next/server';
import { mockProfile } from '@/lib/mock-data';
import { generateLlmsTxt } from '@/lib/generators/llms-txt';

export async function GET(request: Request) {
  const baseUrl = new URL(request.url).origin;
  const content = generateLlmsTxt(mockProfile, baseUrl);
  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
