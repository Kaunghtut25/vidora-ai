import { NextResponse } from 'next/server';
import { db, seedDatabase } from '@/lib/database';
seedDatabase();

export async function GET() {
  return NextResponse.json({ pages: db.pages.findAll() });
}

export async function POST(request: Request) {
  const body = await request.json();
  const page = db.pages.create({
    id: 'page-' + Date.now(),
    slug: body.slug || 'new-page',
    title: body.title || 'New Page',
    content: body.content || '',
    metaDescription: body.metaDescription || '',
    status: body.status || 'draft',
    authorId: body.authorId || 'admin-001',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  return NextResponse.json({ page }, { status: 201 });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { id, ...updates } = body;
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  const updated = db.pages.update(id, { ...updates, updatedAt: new Date().toISOString() });
  if (!updated) return NextResponse.json({ error: 'Page not found' }, { status: 404 });
  return NextResponse.json({ page: updated });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  db.pages.delete(id);
  return NextResponse.json({ success: true });
}
