import { NextResponse } from 'next/server';
import { db, seedDatabase } from '@/lib/database';
seedDatabase();

export async function GET() {
  return NextResponse.json({ settings: db.settings.getSettings() });
}

export async function POST(request: Request) {
  const body = await request.json();
  const settings = db.settings.getSettings();
  const updated = db.settings.update('site-settings', { ...settings, ...body, updatedAt: new Date().toISOString() });
  return NextResponse.json({ settings: updated });
}
