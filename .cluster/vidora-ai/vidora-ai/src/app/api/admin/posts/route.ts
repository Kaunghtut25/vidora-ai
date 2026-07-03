import { NextResponse } from 'next/server';
import { db, seedDatabase } from '@/lib/database';
seedDatabase();

export async function GET() {
  return NextResponse.json({ posts: db.posts.findAll() });
}

export async function POST(request: Request) {
  const body = await request.json();
  const post = db.posts.create({
    id: 'post-' + Date.now(),
    title: body.title || 'New Post',
    slug: body.slug || 'new-post',
    content: body.content || '',
    excerpt: body.excerpt || '',
    category: body.category || 'General',
    tags: body.tags || [],
    status: body.status || 'draft',
    authorId: body.authorId || 'admin-001',
    viewCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  return NextResponse.json({ post }, { status: 201 });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { id, ...updates } = body;
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  const updated = db.posts.update(id, { ...updates, updatedAt: new Date().toISOString() });
  if (!updated) return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  return NextResponse.json({ post: updated });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  db.posts.delete(id);
  return NextResponse.json({ success: true });
}
