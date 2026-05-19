// app/api/ai-guidance/route.ts
// data-spec-source: #api-spec GET /api/ai-guidance

import { NextResponse } from 'next/server';
import { mockAiGuidance } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json(mockAiGuidance);
}
