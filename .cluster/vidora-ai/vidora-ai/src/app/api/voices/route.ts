import { NextResponse } from 'next/server';
import { voices } from '@/data/voices';
export async function GET() { return NextResponse.json({ voices, total: voices.length }); }
