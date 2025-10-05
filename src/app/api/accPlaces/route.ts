import { NextResponse } from 'next/server';
import { ACCESSIBLE_PLACES } from '@/data/accessible';

export async function GET() {
  return NextResponse.json(ACCESSIBLE_PLACES, {
    headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=300' },
  });
}