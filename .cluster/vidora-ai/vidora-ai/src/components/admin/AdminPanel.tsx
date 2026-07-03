'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, FileText, Newspaper, Settings, LogOut,
  Plus, Trash2, Edit3, Save, X, Search, Shield, Eye, EyeOff,
  BarChart3, Globe, Palette, ChevronDown
} from 'lucide-react';

// ============================================================
// Types
// ============================================================

interface AdminUser {
  id: string; name: string; email: string; role: string;
  plan: string; status: string; createdAt: string;
}

interface AdminPage {
  id: string; slug: string; title: string; content: string;
  metaDescription: string; status: string;
}

interface AdminPost {
  id: string; title: string; slug: string; content: string;
  excerpt: string; category: string; tags: string[]; status: string;
  viewCount: number;
}

interface SiteSettingsData {
  siteName: string; siteDescription: string;
  heroHeadline: string; heroSubtitle: string;
  ctaText: string; footerText: string;
  primaryColor: string; secondaryColor: string;
}

// ============================================================
// Mock Data (mirrors database.ts seed)
// ============================================================

const initialUsers: AdminUser[] = [
  { id: 'admin-001', name: 'Ko Kaung', email: 'admin@vidora.ai', role: 'admin', plan: 'enterprise', status: 'active', createdAt: '2026-07-01' },
  { id: 'user-001', name: 'Aye Myat', email: 'aye@vidora.ai', role: 'editor', plan: 'pro', status: 'active', createdAt: '2026-07-02' },
  { id: 'user-002', name: 'Min Thu', email: 'min@vidora.ai', role: 'viewer', plan: 'free', status: 'active', createdAt: '2026-07-03' },
];

const initialPages: AdminPage[] = [
  { id: 'page-about', slug: 'about', title: 'About Vidora AI', content: '<h2>Our Mission</h2><p>Making AI video creation accessible to everyone.</p>', metaDescription: 'About Vidora AI', status: 'published' },
  { id: 'page-contact', slug: 'contact', title: 'Contact Us', content: '<h2>Get in Touch</h2><p>We would love to hear from you.</p>', metaDescription: 'Contact Vidora AI', status: 'draft' },
];

const initialPosts: AdminPost[] = [
  { id: 'post-001', title: 'How to Create Viral Shorts with AI', slug: 'viral-shorts-ai', content: '<p>Step-by-step guide...</p>', excerpt: 'Create viral shorts with AI', category: 'Tutorial', tags: ['ai', 'shorts'], status: 'published', viewCount: 1247 },
  { id: 'post-002', title: 'Burmese AI Voiceovers Guide', slug: 'burmese-voiceovers', content: '<p>Complete guide...</p>', excerpt: 'Burmese AI voice guide', category: 'Guide', tags: ['burmese', 'voices'], status: 'published', viewCount: 892 },
];

// ============================================================
// Main Admin Panel Component
// ============================================================

export default function AdminPanel() {
  const [tab, setTab] = useState<'dashboard' | 'users' | 'pages' | 'posts' | 'settings'>('dashboard');
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);
  const [pages, setPages] = useState<AdminPage[]>(initialPages);
  const [posts, setPosts] = useState<AdminPost[]>(initialPosts);
  const [settings, setSettings] = useState<SiteSettingsData>({
    siteName: 'Vidora AI', siteDescription: 'AI Video Platform',
    heroHeadline: 'Turn Ideas Into Cinematic Videos',
    heroSubtitle: 'Professional AI video creation in minutes.',
    ctaText: 'Start Creating Free', footerText: '© 2026 Vidora AI',
    primaryColor: '#8B5CF6', secondaryColor: '#06B6D4',
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState('');

  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  // Stats
  const stats = {
    totalUsers: users.length,
    totalPages: pages.length,
    publishedPages: pages.filter(p => p.status === 'published').length,
    totalPosts: posts.length,
    publishedPosts: posts.filter(p => p.status === 'published').length,
    totalViews: posts.reduce((s, p) => s + p.viewCount, 0),
  };

  // ============================================================
  // Dashboard Tab
  // ============================================================
  const DashboardTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-black">Admin Dashboard</h2>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'purple' },
          { label: 'Pages', value: `${stats.publishedPages}/${stats.totalPages} published`, icon: FileText, color: 'cyan' },
          { label: 'Posts', value: `${stats.publishedPosts}/${stats.totalPosts} published`, icon: Newspaper, color: 'amber' },
          { label: 'Total Views', value: stats.totalViews.toLocaleString(), icon: BarChart3, color: 'emerald' },
        ].map((stat) => (
          <div key={stat.label} className="glass-card p-5">
            <div className={`w-10 h-10 rounded-xl bg-${stat.color}-500/10 flex items-center justify-center mb-3`}>
              <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
            </div>
            <div className="text-2xl font-black">{stat.value}</div>
            <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="glass-card p-6">
        <h3 className="font-bold mb-4">Recent Activity</h3>
        {[
          'Admin created new post "Viral Shorts Guide"',
          'User Aye Myat updated profile settings',
          'Page "About Us" was published',
          'Site settings updated — new hero headline',
          'New user Min Thu registered',
        ].map((activity, i) => (
          <div key={i} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0 text-sm text-gray-400">
            <div className="w-2 h-2 rounded-full bg-purple-400" />
            {activity}
          </div>
        ))}
      </div>
    </div>
  );

  // ============================================================
  // Users Tab
  // ============================================================
  const UsersTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black">Users ({users.length})</h2>
        <button
          onClick={() => {
            const newUser: AdminUser = { id: 'user-' + Date.now(), name: 'New User', email: 'new@vidora.ai', role: 'viewer', plan: 'free', status: 'active', createdAt: new Date().toISOString().split('T')[0] };
            setUsers([newUser, ...users]);
            notify('User created');
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" /> Add User
        </button>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 text-left text-gray-400">
              <th className="p-4">Name</th><th className="p-4">Email</th><th className="p-4">Role</th><th className="p-4">Plan</th><th className="p-4">Status</th><th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase())).map(user => (
              <tr key={user.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="p-4 font-medium">{editingId === user.id ? (
                  <input className="bg-white/5 border border-white/10 rounded px-2 py-1 w-32" defaultValue={user.name} onChange={e => setUsers(users.map(u => u.id === user.id ? {...u, name: e.target.value} : u))} />
                ) : user.name}</td>
                <td className="p-4 text-gray-400">{user.email}</td>
                <td className="p-4">
                  <select className="bg-white/5 border border-white/10 rounded px-2 py-1 text-sm" value={user.role} onChange={e => setUsers(users.map(u => u.id === user.id ? {...u, role: e.target.value} : u))}>
                    <option value="admin">Admin</option><option value="editor">Editor</option><option value="viewer">Viewer</option>
                  </select>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${user.plan === 'enterprise' ? 'bg-purple-500/20 text-purple-400' : user.plan === 'pro' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-gray-500/20 text-gray-400'}`}>{user.plan}</span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${user.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>{user.status}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => { setUsers(users.filter(u => u.id !== user.id)); notify('User deleted'); }} className="p-1.5 rounded hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // ============================================================
  // Pages Tab
  // ============================================================
  const PagesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black">Pages ({pages.length})</h2>
        <button
          onClick={() => {
            const newPage: AdminPage = { id: 'page-' + Date.now(), slug: 'new-page', title: 'New Page', content: '<p>Content here</p>', metaDescription: '', status: 'draft' };
            setPages([newPage, ...pages]);
            notify('Page created');
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Page
        </button>
      </div>

      <div className="space-y-3">
        {pages.map(page => (
          <div key={page.id} className="glass-card p-5">
            {editingId === page.id ? (
              <div className="space-y-3">
                <input className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={page.title} onChange={e => setPages(pages.map(p => p.id === page.id ? {...p, title: e.target.value} : p))} />
                <input className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-gray-400 text-sm" value={page.slug} onChange={e => setPages(pages.map(p => p.id === page.id ? {...p, slug: e.target.value} : p))} />
                <textarea className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white min-h-[200px] font-mono text-sm" value={page.content} onChange={e => setPages(pages.map(p => p.id === page.id ? {...p, content: e.target.value} : p))} />
                <div className="flex items-center gap-2">
                  <button onClick={() => { setEditingId(null); notify('Page saved'); }} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm"><Save className="w-3.5 h-3.5" /> Save</button>
                  <button onClick={() => setEditingId(null)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 text-sm"><X className="w-3.5 h-3.5" /> Cancel</button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold">{page.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${page.status === 'published' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>{page.status}</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">/{page.slug}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setEditingId(page.id)} className="p-2 rounded-lg hover:bg-purple-500/10 text-gray-400 hover:text-purple-400 transition-colors"><Edit3 className="w-4 h-4" /></button>
                  <button onClick={() => { setPages(pages.filter(p => p.id !== page.id)); notify('Page deleted'); }} className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // ============================================================
  // Posts Tab
  // ============================================================
  const PostsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black">Posts ({posts.length})</h2>
        <button
          onClick={() => {
            const newPost: AdminPost = { id: 'post-' + Date.now(), title: 'New Post', slug: 'new-post', content: '<p>Content</p>', excerpt: '', category: 'Tutorial', tags: [], status: 'draft', viewCount: 0 };
            setPosts([newPost, ...posts]);
            notify('Post created');
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Post
        </button>
      </div>

      <div className="space-y-3">
        {posts.map(post => (
          <div key={post.id} className="glass-card p-5">
            {editingId === post.id ? (
              <div className="space-y-3">
                <input className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={post.title} onChange={e => setPosts(posts.map(p => p.id === post.id ? {...p, title: e.target.value} : p))} />
                <div className="grid grid-cols-2 gap-3">
                  <input className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-gray-400 text-sm" value={post.category} onChange={e => setPosts(posts.map(p => p.id === post.id ? {...p, category: e.target.value} : p))} />
                  <input className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-gray-400 text-sm" value={post.tags.join(', ')} onChange={e => setPosts(posts.map(p => p.id === post.id ? {...p, tags: e.target.value.split(',').map(t => t.trim())} : p))} placeholder="tag1, tag2" />
                </div>
                <textarea className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white min-h-[200px] font-mono text-sm" value={post.content} onChange={e => setPosts(posts.map(p => p.id === post.id ? {...p, content: e.target.value} : p))} />
                <button onClick={() => { setEditingId(null); notify('Post saved'); }} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-sm"><Save className="w-3.5 h-3.5" /> Save</button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold">{post.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${post.status === 'published' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>{post.status}</span>
                    <span className="text-xs text-gray-500">{post.category}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-xs px-1.5 py-0.5 rounded bg-white/5 text-gray-500">{tag}</span>
                    ))}
                    <span className="text-xs text-gray-600 ml-2">{post.viewCount} views</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setEditingId(post.id)} className="p-2 rounded-lg hover:bg-purple-500/10 text-gray-400 hover:text-purple-400"><Edit3 className="w-4 h-4" /></button>
                  <button onClick={() => { setPosts(posts.filter(p => p.id !== post.id)); notify('Post deleted'); }} className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // ============================================================
  // Settings Tab
  // ============================================================
  const SettingsTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-black">Site Settings</h2>
      <div className="glass-card p-6 space-y-4">
        {[
          { label: 'Site Name', key: 'siteName' as const },
          { label: 'Site Description', key: 'siteDescription' as const },
          { label: 'Hero Headline', key: 'heroHeadline' as const },
          { label: 'Hero Subtitle', key: 'heroSubtitle' as const },
          { label: 'CTA Text', key: 'ctaText' as const },
          { label: 'Footer Text', key: 'footerText' as const },
        ].map(({ label, key }) => (
          <div key={key}>
            <label className="text-sm text-gray-400 mb-1 block">{label}</label>
            <input className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={settings[key]} onChange={e => setSettings({...settings, [key]: e.target.value})} />
          </div>
        ))}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Primary Color</label>
            <div className="flex items-center gap-3">
              <input type="color" value={settings.primaryColor} onChange={e => setSettings({...settings, primaryColor: e.target.value})} className="w-10 h-10 rounded cursor-pointer" />
              <input className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white font-mono text-sm" value={settings.primaryColor} onChange={e => setSettings({...settings, primaryColor: e.target.value})} />
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Secondary Color</label>
            <div className="flex items-center gap-3">
              <input type="color" value={settings.secondaryColor} onChange={e => setSettings({...settings, secondaryColor: e.target.value})} className="w-10 h-10 rounded cursor-pointer" />
              <input className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white font-mono text-sm" value={settings.secondaryColor} onChange={e => setSettings({...settings, secondaryColor: e.target.value})} />
            </div>
          </div>
        </div>
        <button onClick={() => notify('Settings saved')} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium transition-colors"><Save className="w-4 h-4" /> Save Settings</button>
      </div>
    </div>
  );

  // ============================================================
  // Main Render
  // ============================================================
  const tabs = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users' as const, label: 'Users', icon: Users },
    { id: 'pages' as const, label: 'Pages', icon: FileText },
    { id: 'posts' as const, label: 'Posts', icon: Newspaper },
    { id: 'settings' as const, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#050508] flex">
      {/* Sidebar */}
      <div className="w-60 bg-[#0A0A0F] border-r border-white/5 flex flex-col">
        <div className="p-5 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-bold text-sm">Vidora AI</div>
              <div className="text-xs text-gray-500">Admin Panel</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                tab === id ? 'bg-purple-600/20 text-purple-400' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-white/5">
          <a href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
            <Globe className="w-4 h-4" /> View Site
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {/* Top bar */}
        <div className="h-16 border-b border-white/5 flex items-center justify-between px-6">
          <div>
            <h1 className="font-bold">
              {tabs.find(t => t.id === tab)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                className="w-64 bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
                placeholder="Search..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold">KK</div>
          </div>
        </div>

        {/* Main content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              {tab === 'dashboard' && <DashboardTab />}
              {tab === 'users' && <UsersTab />}
              {tab === 'pages' && <PagesTab />}
              {tab === 'posts' && <PostsTab />}
              {tab === 'settings' && <SettingsTab />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Notification toast */}
      <AnimatePresence>
        {notification && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed bottom-6 right-6 glass-card px-5 py-3 text-sm font-medium text-white z-50">
            ✅ {notification}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
