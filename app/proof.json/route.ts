// app/proof.json/route.ts
// data-spec-source: #file-output-spec /proof.json

import { NextResponse } from 'next/server';
import { mockProfile } from '@/lib/mock-data';
import { generateProofJson } from '@/lib/generators/proof-json';

export async function GET() {
  const content = generateProofJson(mockProfile);
  return new NextResponse(content, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
