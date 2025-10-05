import { NextResponse } from 'next/server';
import { ZONES_POLY } from '@/data/zones-polygons';

export async function GET() {
  return NextResponse.json(ZONES_POLY, {
    headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=300' },
  });
}