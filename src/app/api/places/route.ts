import { NextResponse } from 'next/server';
import { PLACES } from '@/data/places';

export async function GET() {
  return NextResponse.json(PLACES, {
    headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=300' },
  });
}