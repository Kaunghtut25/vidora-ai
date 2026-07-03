// Vidora AI — Local Database (JSON File Storage)
// Production-ready CRUD for users, pages, posts, site settings

import fs from 'fs';
import path from 'path';

const DB_DIR = path.join(process.cwd(), '.vidora-db');

// Initialize database
function ensureDb() {
  if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
}

// ============================================================
// Generic JSON Database
// ============================================================

class JsonDB<T extends { id: string }> {
  private filePath: string;
  private data: T[] = [];

  constructor(collection: string) {
    ensureDb();
    this.filePath = path.join(DB_DIR, `${collection}.json`);
    this.load();
  }

  private load() {
    try {
      if (fs.existsSync(this.filePath)) {
        this.data = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
      }
    } catch { this.data = []; }
  }

  private save() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
  }

  findAll(): T[] { return [...this.data]; }
  
  findById(id: string): T | undefined {
    return this.data.find(item => item.id === id);
  }

  findOne(predicate: (item: T) => boolean): T | undefined {
    return this.data.find(predicate);
  }

  findMany(predicate: (item: T) => boolean): T[] {
    return this.data.filter(predicate);
  }

  create(item: T): T {
    this.data.push(item);
    this.save();
    return item;
  }

  update(id: string, updates: Partial<T>): T | undefined {
    const index = this.data.findIndex(item => item.id === id);
    if (index === -1) return undefined;
    this.data[index] = { ...this.data[index], ...updates, id };
    this.save();
    return this.data[index];
  }

  delete(id: string): boolean {
    const index = this.data.findIndex(item => item.id === id);
    if (index === -1) return false;
    this.data.splice(index, 1);
    this.save();
    return true;
  }

  count(): number { return this.data.length; }
}

// ============================================================
// User Database
// ============================================================

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar?: string;
  plan: 'free' | 'pro' | 'enterprise';
  status: 'active' | 'suspended' | 'pending';
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

class UserDB extends JsonDB<UserRecord> {
  constructor() { super('users'); }

  findByEmail(email: string): UserRecord | undefined {
    return this.findOne(u => u.email.toLowerCase() === email.toLowerCase());
  }

  // Hash password (simple for demo — use bcrypt in production)
  static hashPassword(password: string): string {
    const crypto = require('crypto');
    return crypto.createHash('sha256').update(password + 'vidora-salt').digest('hex');
  }

  verifyPassword(user: UserRecord, password: string): boolean {
    return user.passwordHash === UserDB.hashPassword(password);
  }
}

// ============================================================
// Pages Database (for Admin Panel)
// ============================================================

export interface PageRecord {
  id: string;
  slug: string;
  title: string;
  content: string; // HTML/Markdown content
  metaDescription: string;
  status: 'published' | 'draft';
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

class PageDB extends JsonDB<PageRecord> {
  constructor() { super('pages'); }

  findBySlug(slug: string): PageRecord | undefined {
    return this.findOne(p => p.slug === slug);
  }
}

// ============================================================
// Posts/Blog Database
// ============================================================

export interface PostRecord {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  status: 'published' | 'draft';
  authorId: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

class PostDB extends JsonDB<PostRecord> {
  constructor() { super('posts'); }

  findBySlug(slug: string): PostRecord | undefined {
    return this.findOne(p => p.slug === slug);
  }

  getPublished(): PostRecord[] {
    return this.findMany(p => p.status === 'published')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}

// ============================================================
// Site Settings Database
// ============================================================

export interface SiteSettings {
  id: 'site-settings';
  siteName: string;
  siteDescription: string;
  logoUrl: string;
  faviconUrl: string;
  primaryColor: string;
  secondaryColor: string;
  heroHeadline: string;
  heroSubtitle: string;
  ctaText: string;
  footerText: string;
  socialLinks: { platform: string; url: string }[];
  updatedAt: string;
}

class SettingsDB extends JsonDB<SiteSettings> {
  constructor() { super('settings'); }

  getSettings(): SiteSettings {
    let settings = this.findById('site-settings');
    if (!settings) {
      settings = {
        id: 'site-settings',
        siteName: 'Vidora AI',
        siteDescription: 'AI-Powered Video Creation Platform',
        logoUrl: '',
        faviconUrl: '',
        primaryColor: '#8B5CF6',
        secondaryColor: '#06B6D4',
        heroHeadline: 'Turn Ideas Into Cinematic Videos',
        heroSubtitle: 'Paste any URL, upload a script, or describe your idea.',
        ctaText: 'Start Creating Free',
        footerText: '© 2026 Vidora AI. All rights reserved.',
        socialLinks: [
          { platform: 'twitter', url: 'https://twitter.com/vidora' },
          { platform: 'youtube', url: 'https://youtube.com/@vidora' },
        ],
        updatedAt: new Date().toISOString(),
      };
      this.create(settings);
    }
    return settings;
  }
}

// ============================================================
// Database Instance
// ============================================================

export const db = {
  users: new UserDB(),
  pages: new PageDB(),
  posts: new PostDB(),
  settings: new SettingsDB(),
};

// ============================================================
// Seed Default Data
// ============================================================

export function seedDatabase() {
  // Seed admin user
  if (db.users.count() === 0) {
    db.users.create({
      id: 'admin-001',
      name: 'Ko Kaung',
      email: 'admin@vidora.ai',
      passwordHash: UserDB.hashPassword('admin123'),
      role: 'admin',
      plan: 'enterprise',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      avatar: '',
    });

    // Seed demo users
    db.users.create({
      id: 'user-001', name: 'Aye Myat', email: 'aye@vidora.ai',
      passwordHash: UserDB.hashPassword('user123'), role: 'editor',
      plan: 'pro', status: 'active',
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    });
    db.users.create({
      id: 'user-002', name: 'Min Thu', email: 'min@vidora.ai',
      passwordHash: UserDB.hashPassword('user123'), role: 'viewer',
      plan: 'free', status: 'active',
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    });
  }

  // Seed pages
  if (db.pages.count() === 0) {
    db.pages.create({
      id: 'page-about', slug: 'about', title: 'About Vidora AI',
      content: '<h2>Our Mission</h2><p>Vidora AI was built to make professional video creation accessible to everyone.</p>',
      metaDescription: 'Learn about Vidora AI and our mission',
      status: 'published', authorId: 'admin-001',
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    });
  }

  // Seed posts
  if (db.posts.count() === 0) {
    const posts = [
      { title: 'How to Create Viral Shorts with AI', category: 'Tutorial', tags: ['ai', 'shorts', 'tutorial'] },
      { title: 'Burmese AI Voiceovers Guide', category: 'Guide', tags: ['burmese', 'voices', 'guide'] },
      { title: 'Seedance 2.0 vs Vidu Comparison', category: 'Comparison', tags: ['seedance', 'vidu', 'comparison'] },
    ];
    posts.forEach((p, i) => {
      db.posts.create({
        id: `post-${String(i + 1).padStart(3, '0')}`,
        title: p.title,
        slug: p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        content: `<p>Full article content for: ${p.title}</p>`,
        excerpt: `Learn about ${p.title.toLowerCase()}`,
        category: p.category,
        tags: p.tags,
        status: 'published',
        authorId: 'admin-001',
        viewCount: Math.floor(Math.random() * 1000),
        createdAt: new Date(Date.now() - i * 86400000).toISOString(),
        updatedAt: new Date().toISOString(),
      });
    });
  }

  // Seed settings
  db.settings.getSettings();

  console.log('✅ Database seeded');
  return {
    users: db.users.count(),
    pages: db.pages.count(),
    posts: db.posts.count(),
  };
}
