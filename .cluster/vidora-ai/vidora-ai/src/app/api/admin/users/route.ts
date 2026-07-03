import { NextResponse } from 'next/server';
import { db, seedDatabase } from '@/lib/database';
seedDatabase();

export async function GET() {
  return NextResponse.json({ users: db.users.findAll() });
}

export async function POST(request: Request) {
  const body = await request.json();
  const user = db.users.create({
    id: 'user-' + Date.now(),
    name: body.name || 'New User',
    email: body.email || '',
    passwordHash: body.passwordHash || '',
    role: body.role || 'viewer',
    plan: body.plan || 'free',
    status: body.status || 'active',
    avatar: body.avatar || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  return NextResponse.json({ user }, { status: 201 });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { id, ...updates } = body;
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  const updated = db.users.update(id, { ...updates, updatedAt: new Date().toISOString() });
  if (!updated) return NextResponse.json({ error: 'User not found' }, { status: 404 });
  return NextResponse.json({ user: updated });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  db.users.delete(id);
  return NextResponse.json({ success: true });
}
