// app/api/links/route.ts
// data-spec-source: #api-spec GET /api/links

import { NextResponse } from 'next/server';
import { mockProfile } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json(mockProfile.canonicalLinks);
}
