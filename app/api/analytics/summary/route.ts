// app/api/analytics/summary/route.ts
// data-spec-source: #api-spec GET /api/analytics/summary

import { NextResponse } from 'next/server';
import { mockAnalytics } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json(mockAnalytics);
}
