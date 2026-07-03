import { NextResponse } from 'next/server';
import { db, seedDatabase } from '@/lib/database';
seedDatabase();

export async function GET() {
  const posts = db.posts.findAll();
  return NextResponse.json({
    totalUsers: db.users.count(),
    totalPages: db.pages.count(),
    publishedPages: db.pages.findMany(p => p.status === 'published').length,
    totalPosts: db.posts.count(),
    publishedPosts: db.posts.findMany(p => p.status === 'published').length,
    totalViews: posts.reduce((s, p) => s + p.viewCount, 0),
  });
}
