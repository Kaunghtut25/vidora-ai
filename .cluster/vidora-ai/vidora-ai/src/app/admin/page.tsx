// Vidora AI — Admin Dashboard
// Premium glass-morphism admin panel with full CRUD via API routes

'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, FileText, Newspaper, Settings, LogOut,
  Plus, Trash2, Edit3, Save, X, Search, Shield, Eye,
  BarChart3, Globe, Palette, Sparkles, TrendingUp, Clock, Zap,
  Mail, Calendar, Tag, ExternalLink, ChevronRight, UserPlus, Activity,
  Hash, Layers, CheckCircle, PenTool, ArrowUpRight, AlertTriangle, Loader2
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';

// ─── Types ───────────────────────────────────────────────

interface AdminUser {
  id: string; name: string; email: string; role: string;
  plan: string; status: string; createdAt: string; avatar?: string;
}

interface AdminPage {
  id: string; slug: string; title: string; content: string;
  metaDescription: string; status: string; authorId?: string;
}

interface AdminPost {
  id: string; title: string; slug: string; content: string;
  excerpt: string; category: string; tags: string[]; status: string;
  viewCount: number; authorId?: string;
}

interface SiteSettingsData {
  siteName: string; siteDescription: string;
  heroHeadline: string; heroSubtitle: string;
  ctaText: string; footerText: string;
  primaryColor: string; secondaryColor: string;
  logoUrl?: string; faviconUrl?: string;
}

interface Stats {
  totalUsers: number; totalPages: number; publishedPages: number;
  totalPosts: number; publishedPosts: number; totalViews: number;
}

interface DeleteConfirm {
  type: 'user' | 'page' | 'post';
  id: string;
  name: string;
}

type Tab = 'dashboard' | 'users' | 'pages' | 'posts' | 'settings';

// ─── Tab Configuration ──────────────────────────────────

const TAB_CONFIG: { id: Tab; label: string; icon: typeof LayoutDashboard; color: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'purple' },
  { id: 'users', label: 'Users', icon: Users, color: 'cyan' },
  { id: 'pages', label: 'Pages', icon: FileText, color: 'amber' },
  { id: 'posts', label: 'Posts', icon: Newspaper, color: 'emerald' },
  { id: 'settings', label: 'Settings', icon: Settings, color: 'pink' },
];

// ─── Helpers ─────────────────────────────────────────────

const API = {
  async get(endpoint: string) {
    const res = await fetch(`/api/admin/${endpoint}`);
    if (!res.ok) throw new Error(`GET ${endpoint} failed`);
    return res.json();
  },
  async post(endpoint: string, body: unknown) {
    const res = await fetch(`/api/admin/${endpoint}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`POST ${endpoint} failed`);
    return res.json();
  },
  async put(endpoint: string, body: unknown) {
    const res = await fetch(`/api/admin/${endpoint}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`PUT ${endpoint} failed`);
    return res.json();
  },
  async del(endpoint: string, id: string) {
    const res = await fetch(`/api/admin/${endpoint}?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`DELETE ${endpoint} failed`);
    return res.json();
  },
};

const statusColors: Record<string, string> = {
  active: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
  suspended: 'bg-red-500/20 text-red-400 border border-red-500/30',
  pending: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
  published: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
  draft: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
};

const getColorClass = (color: string, type: 'bg' | 'text' | 'border' | 'shadow') => {
  const map: Record<string, string> = {
    purple: type === 'bg' ? 'bg-purple-500/10' : type === 'text' ? 'text-purple-400' : type === 'border' ? 'border-purple-500/20' : 'shadow-purple-600/20',
    cyan: type === 'bg' ? 'bg-cyan-500/10' : type === 'text' ? 'text-cyan-400' : type === 'border' ? 'border-cyan-500/20' : 'shadow-cyan-600/20',
    amber: type === 'bg' ? 'bg-amber-500/10' : type === 'text' ? 'text-amber-400' : type === 'border' ? 'border-amber-500/20' : 'shadow-amber-600/20',
    emerald: type === 'bg' ? 'bg-emerald-500/10' : type === 'text' ? 'text-emerald-400' : type === 'border' ? 'border-emerald-500/20' : 'shadow-emerald-600/20',
    pink: type === 'bg' ? 'bg-pink-500/10' : type === 'text' ? 'text-pink-400' : type === 'border' ? 'border-pink-500/20' : 'shadow-pink-600/20',
  };
  return map[color] || map.purple;
};

// ─── Main Component ─────────────────────────────────────

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  // Data state
  const [tab, setTab] = useState<Tab>('dashboard');
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [pages, setPages] = useState<AdminPage[]>([]);
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [settings, setSettings] = useState<SiteSettingsData>({
    siteName: 'Vidora AI', siteDescription: 'AI Video Platform',
    heroHeadline: 'Turn Ideas Into Cinematic Videos',
    heroSubtitle: 'Professional AI video creation in minutes.',
    ctaText: 'Start Creating Free', footerText: '© 2026 Vidora AI',
    primaryColor: '#8B5CF6', secondaryColor: '#06B6D4',
  });
  const [stats, setStats] = useState<Stats>({ totalUsers: 0, totalPages: 0, publishedPages: 0, totalPosts: 0, publishedPosts: 0, totalViews: 0 });

  // UI state
  const [pageEditingId, setPageEditingId] = useState<string | null>(null);
  const [postEditingId, setPostEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<DeleteConfirm | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSettingsSaving, setIsSettingsSaving] = useState(false);

  const notify = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast(msg); setToastType(type); setTimeout(() => setToast(''), 2800);
  };

  // Auth check
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? useAuthStore.getState() : null;
    if (!stored?.isAuthenticated || stored?.user?.role !== 'admin') {
      router.replace('/admin/login');
    } else {
      setAuthorized(true);
    }
  }, [router]);

  // Fetch all data
  const fetchData = useCallback(async () => {
    try {
      const [usersRes, pagesRes, postsRes, settingsRes, statsRes] = await Promise.all([
        API.get('users'),
        API.get('pages'),
        API.get('posts'),
        API.get('settings'),
        API.get('stats'),
      ]);
      setUsers(usersRes.users || []);
      setPages(pagesRes.pages || []);
      setPosts(postsRes.posts || []);
      setSettings(settingsRes.settings || settings);
      setStats(statsRes || stats);
    } catch (err) {
      console.error('Failed to load admin data:', err);
      notify('Failed to load admin data', 'error');
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (authorized) fetchData();
  }, [authorized, fetchData]);

  // ─── User Actions ────────────────────────────────────

  const handleAddUser = async () => {
    const newUser = {
      id: 'user-' + Date.now(),
      name: 'New User',
      email: 'new@vidora.ai',
      role: 'viewer',
      plan: 'free',
      status: 'active',
    };
    try {
      const res = await API.post('users', newUser);
      setUsers(prev => [res.user, ...prev]);
      setStats(s => ({ ...s, totalUsers: s.totalUsers + 1 }));
      notify('User created');
    } catch { notify('Failed to create user', 'error'); }
  };

  const confirmDeleteUser = (id: string) => {
    const u = users.find(u => u.id === id);
    setDeleteConfirm({ type: 'user', id, name: u?.name || 'Unknown user' });
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await API.del('users', id);
      setUsers(prev => prev.filter(u => u.id !== id));
      setStats(s => ({ ...s, totalUsers: s.totalUsers - 1 }));
      notify('User deleted');
    } catch { notify('Failed to delete user', 'error'); }
    setDeleteConfirm(null);
  };

  const handleUpdateUser = async (id: string, updates: Partial<AdminUser>) => {
    try {
      await API.put('users', { id, ...updates });
      setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u));
    } catch { notify('Failed to update user', 'error'); }
  };

  // ─── Page Actions ────────────────────────────────────

  const handleAddPage = async () => {
    const newPage = {
      id: 'page-' + Date.now(),
      slug: 'new-page', title: 'New Page',
      content: '<p>Your content here</p>',
      metaDescription: '', status: 'draft',
    };
    try {
      const res = await API.post('pages', newPage);
      setPages(prev => [res.page, ...prev]);
      setStats(s => ({ ...s, totalPages: s.totalPages + 1 }));
      notify('Page created');
    } catch { notify('Failed to create page', 'error'); }
  };

  const confirmDeletePage = (id: string) => {
    const p = pages.find(p => p.id === id);
    setDeleteConfirm({ type: 'page', id, name: p?.title || 'Unknown page' });
  };

  const handleDeletePage = async (id: string) => {
    try {
      await API.del('pages', id);
      setPages(prev => prev.filter(p => p.id !== id));
      setStats(s => ({ ...s, totalPages: s.totalPages - 1 }));
      notify('Page deleted');
    } catch { notify('Failed to delete page', 'error'); }
    setDeleteConfirm(null);
  };

  const handleSavePage = async (page: AdminPage) => {
    setIsSaving(true);
    try {
      const res = await API.put('pages', {
        id: page.id, title: page.title, slug: page.slug,
        content: page.content, metaDescription: page.metaDescription, status: page.status,
      });
      setPages(prev => prev.map(p => p.id === page.id ? res.page : p));
      setPageEditingId(null);
      notify('Page saved');
    } catch { notify('Failed to save page', 'error'); }
    setIsSaving(false);
  };

  // ─── Post Actions ────────────────────────────────────

  const handleAddPost = async () => {
    const newPost = {
      id: 'post-' + Date.now(),
      title: 'New Post', slug: 'new-post',
      content: '<p>Content here</p>', excerpt: '',
      category: 'General', tags: [], status: 'draft',
    };
    try {
      const res = await API.post('posts', newPost);
      setPosts(prev => [res.post, ...prev]);
      setStats(s => ({ ...s, totalPosts: s.totalPosts + 1 }));
      notify('Post created');
    } catch { notify('Failed to create post', 'error'); }
  };

  const confirmDeletePost = (id: string) => {
    const p = posts.find(p => p.id === id);
    setDeleteConfirm({ type: 'post', id, name: p?.title || 'Unknown post' });
  };

  const handleDeletePost = async (id: string) => {
    try {
      await API.del('posts', id);
      setPosts(prev => prev.filter(p => p.id !== id));
      setStats(s => ({ ...s, totalPosts: s.totalPosts - 1 }));
      notify('Post deleted');
    } catch { notify('Failed to delete post', 'error'); }
    setDeleteConfirm(null);
  };

  const handleSavePost = async (post: AdminPost) => {
    setIsSaving(true);
    try {
      const res = await API.put('posts', {
        id: post.id, title: post.title, slug: post.slug,
        content: post.content, excerpt: post.excerpt,
        category: post.category, tags: post.tags, status: post.status,
      });
      setPosts(prev => prev.map(p => p.id === post.id ? res.post : p));
      setPostEditingId(null);
      notify('Post saved');
    } catch { notify('Failed to save post', 'error'); }
    setIsSaving(false);
  };

  // ─── Settings Actions ────────────────────────────────

  const handleSaveSettings = async () => {
    setIsSettingsSaving(true);
    try {
      const res = await API.post('settings', settings);
      setSettings(res.settings || settings);
      notify('Settings saved');
    } catch { notify('Failed to save settings', 'error'); }
    setIsSettingsSaving(false);
  };

  // ─── Loading State ───────────────────────────────────

  if (!authorized || loading) {
    return (
      <div className="min-h-screen bg-[#050508] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-600/30"
          >
            <Shield className="w-5 h-5 text-white" />
          </motion.div>
          <p className="text-sm text-gray-500">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  // ─── Render Delete Confirmation Modal ─────────────────

  const renderDeleteModal = () => (
    <AnimatePresence>
      {deleteConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative rounded-2xl border border-white/[0.08] bg-[#14141E] shadow-2xl p-6 max-w-md w-full z-10"
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Confirm Delete</h3>
                <p className="text-sm text-gray-400 mt-0.5">
                  Are you sure you want to delete <span className="text-white font-semibold">&quot;{deleteConfirm.name}&quot;</span>?
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mb-5">
              This action cannot be undone. The {deleteConfirm.type} will be permanently removed.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 rounded-xl border border-white/[0.08] text-sm font-medium text-gray-300 hover:bg-white/[0.04] transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (deleteConfirm.type === 'user') handleDeleteUser(deleteConfirm.id);
                  else if (deleteConfirm.type === 'page') handleDeletePage(deleteConfirm.id);
                  else handleDeletePost(deleteConfirm.id);
                }}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition-all shadow-lg shadow-red-600/20"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // ─── Tab Content Renderers ───────────────────────────

  const renderDashboard = () => {
    const statCards = [
      { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'purple', bgColor: 'from-purple-600/20 to-purple-600/5', iconBg: 'bg-purple-500/10', iconColor: 'text-purple-400' },
      { label: 'Published Pages', value: `${stats.publishedPages}/${stats.totalPages}`, icon: FileText, color: 'cyan', bgColor: 'from-cyan-600/20 to-cyan-600/5', iconBg: 'bg-cyan-500/10', iconColor: 'text-cyan-400' },
      { label: 'Published Posts', value: `${stats.publishedPosts}/${stats.totalPosts}`, icon: Newspaper, color: 'amber', bgColor: 'from-amber-600/20 to-amber-600/5', iconBg: 'bg-amber-500/10', iconColor: 'text-amber-400' },
      { label: 'Total Views', value: stats.totalViews.toLocaleString(), icon: TrendingUp, color: 'emerald', bgColor: 'from-emerald-600/20 to-emerald-600/5', iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-400' },
    ];

    const recentActivity = [
      { icon: PenTool, text: 'Blog post "AI Video Guide" published', time: '2 hours ago', color: 'emerald' },
      { icon: UserPlus, text: 'New user Aye Myat registered', time: '5 hours ago', color: 'purple' },
      { icon: FileText, text: 'Page "About Us" updated', time: '1 day ago', color: 'cyan' },
      { icon: Settings, text: 'Site settings — hero headline changed', time: '2 days ago', color: 'amber' },
      { icon: Activity, text: 'System health check passed', time: '3 days ago', color: 'emerald' },
    ];

    const quickActions = [
      { label: 'New Post', icon: PenTool, click: () => { setTab('posts'); handleAddPost(); }, color: 'purple' },
      { label: 'New Page', icon: FileText, click: () => { setTab('pages'); handleAddPage(); }, color: 'cyan' },
      { label: 'New User', icon: UserPlus, click: () => { setTab('users'); handleAddUser(); }, color: 'amber' },
      { label: 'View Site', icon: ExternalLink, href: '/', color: 'emerald' },
    ];

    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-black tracking-tight">Dashboard Overview</h2>
          <p className="text-sm text-gray-500 mt-1">Welcome back, {user?.name || 'Admin'}. Here&apos;s what&apos;s happening.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map(stat => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -2 }}
              className={`relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br ${stat.bgColor} p-5 group cursor-default`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="text-2xl font-black tracking-tight">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-1 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-white/[0.06] bg-[#0A0A0F]/60 backdrop-blur-xl p-6">
            <h3 className="font-bold text-sm flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-purple-400" /> Quick Actions
            </h3>
            <div className="space-y-2">
              {quickActions.map(action => (
                action.href ? (
                  <a key={action.label} href={action.href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.04] hover:border-white/[0.08] px-4 py-3 transition-all group"
                  >
                    <span className="flex items-center gap-3 text-sm">
                      <action.icon className={`w-4 h-4 text-${action.color}-400`} />
                      {action.label}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-600 group-hover:text-gray-400 transition-colors" />
                  </a>
                ) : (
                  <button key={action.label} onClick={action.click}
                    className="w-full flex items-center justify-between rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.04] hover:border-white/[0.08] px-4 py-3 transition-all group"
                  >
                    <span className="flex items-center gap-3 text-sm">
                      <action.icon className={`w-4 h-4 text-${action.color}-400`} />
                      {action.label}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-gray-400 transition-colors" />
                  </button>
                )
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 rounded-2xl border border-white/[0.06] bg-[#0A0A0F]/60 backdrop-blur-xl p-6">
            <h3 className="font-bold text-sm flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-cyan-400" /> Recent Activity
            </h3>
            <div className="space-y-1">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/[0.02] transition-colors">
                  <div className={`w-8 h-8 rounded-lg bg-${item.color}-500/10 flex items-center justify-center flex-shrink-0`}>
                    <item.icon className={`w-3.5 h-3.5 text-${item.color}-400`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-300 truncate">{item.text}</p>
                  </div>
                  <span className="text-xs text-gray-600 flex-shrink-0">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-[#0A0A0F]/60 backdrop-blur-xl p-5 flex flex-wrap items-center gap-6">
          {[
            { icon: Layers, label: 'Active Users', value: users.filter(u => u.status === 'active').length, color: 'emerald' },
            { icon: CheckCircle, label: 'Published Content', value: stats.publishedPages + stats.publishedPosts, color: 'purple' },
            { icon: Globe, label: 'Site Status', value: 'Online', color: 'cyan' },
            { icon: Hash, label: 'DB Collections', value: '4', color: 'amber' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-3">
              <item.icon className={`w-4 h-4 text-${item.color}-400`} />
              <div>
                <div className="text-xs text-gray-500">{item.label}</div>
                <div className="text-sm font-bold">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Users Tab ───────────────────────────────────────

  const renderUsers = () => {
    const filtered = users.filter(u =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black tracking-tight">Users</h2>
            <p className="text-sm text-gray-500 mt-1">{users.length} total users</p>
          </div>
          <button onClick={handleAddUser}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white text-sm font-semibold transition-all shadow-lg shadow-purple-600/20">
            <Plus className="w-4 h-4" /> Add User
          </button>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-[#0A0A0F]/60 backdrop-blur-xl overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/[0.05] text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="col-span-3">User</div>
            <div className="col-span-3">Email</div>
            <div className="col-span-1">Role</div>
            <div className="col-span-1">Plan</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>
          <div className="divide-y divide-white/[0.03]">
            {filtered.length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-500 text-sm">No users found</div>
            ) : filtered.map(user => (
              <div key={user.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-white/[0.02] transition-colors">
                <div className="col-span-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                  </div>
                  <span className="text-sm font-semibold truncate">{user.name}</span>
                </div>
                <div className="col-span-3 text-sm text-gray-400 truncate">{user.email}</div>
                <div className="col-span-1">
                  <select value={user.role} onChange={e => handleUpdateUser(user.id, { role: e.target.value })}
                    className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs font-medium text-white cursor-pointer hover:border-white/20 transition-colors appearance-none">
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </div>
                <div className="col-span-1">
                  <select value={user.plan} onChange={e => handleUpdateUser(user.id, { plan: e.target.value })}
                    className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs font-medium text-white cursor-pointer hover:border-white/20 transition-colors appearance-none">
                    <option value="enterprise">Enterprise</option>
                    <option value="pro">Pro</option>
                    <option value="free">Free</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <select value={user.status} onChange={e => handleUpdateUser(user.id, { status: e.target.value })}
                    className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs font-medium text-white cursor-pointer hover:border-white/20 transition-colors appearance-none">
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
                <div className="col-span-2 flex items-center justify-end gap-1">
                  <button onClick={() => confirmDeleteUser(user.id)}
                    className="p-2 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ─── Pages Tab ───────────────────────────────────────

  const renderPages = () => {
    const filtered = pages.filter(p =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black tracking-tight">Pages</h2>
            <p className="text-sm text-gray-500 mt-1">{pages.length} pages • {pages.filter(p => p.status === 'published').length} published</p>
          </div>
          <button onClick={handleAddPage}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white text-sm font-semibold transition-all shadow-lg shadow-cyan-600/20">
            <Plus className="w-4 h-4" /> Add Page
          </button>
        </div>

        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-white/[0.06] bg-[#0A0A0F]/60 px-6 py-12 text-center text-gray-500 text-sm">No pages found</div>
          ) : filtered.map(page => (
            <motion.div key={page.id} layout
              className="rounded-2xl border border-white/[0.06] bg-[#0A0A0F]/60 backdrop-blur-xl overflow-hidden transition-all hover:border-white/[0.1]">
              {pageEditingId === page.id ? (
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs text-gray-500 mb-1.5 font-medium uppercase tracking-wider">Title</label>
                      <input className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
                        value={page.title} onChange={e => setPages(prev => prev.map(p => p.id === page.id ? { ...p, title: e.target.value } : p))} />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5 font-medium uppercase tracking-wider">Slug</label>
                      <input className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-gray-400 text-sm font-mono focus:outline-none focus:border-purple-500/50 transition-colors"
                        value={page.slug} onChange={e => setPages(prev => prev.map(p => p.id === page.id ? { ...p, slug: e.target.value } : p))} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5 font-medium uppercase tracking-wider">Content (HTML)</label>
                    <textarea className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm font-mono min-h-[200px] resize-y focus:outline-none focus:border-purple-500/50 transition-colors"
                      value={page.content} onChange={e => setPages(prev => prev.map(p => p.id === page.id ? { ...p, content: e.target.value } : p))} />
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleSavePage(page)} disabled={isSaving}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-sm font-semibold transition-all">
                      {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button onClick={() => setPageEditingId(null)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] text-gray-400 text-sm font-medium transition-all">
                      <X className="w-3.5 h-3.5" /> Cancel
                    </button>
                    <select value={page.status} onChange={e => setPages(prev => prev.map(p => p.id === page.id ? { ...p, status: e.target.value } : p))}
                      className="ml-auto bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs font-medium text-white cursor-pointer">
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-sm truncate">{page.title}</h3>
                      <span className={`inline-block px-2 py-0.5 rounded-md text-xs font-medium ${statusColors[page.status]}`}>{page.status}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="text-xs text-gray-600">/{page.slug}</code>
                    </div>
                  </div>
                  <button onClick={() => setPageEditingId(page.id)}
                    className="p-2.5 rounded-xl hover:bg-purple-500/10 text-gray-500 hover:text-purple-400 transition-all">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button onClick={() => confirmDeletePage(page.id)}
                    className="p-2.5 rounded-xl hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Posts Tab ───────────────────────────────────────

  const renderPosts = () => {
    const filtered = posts.filter(p =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black tracking-tight">Posts</h2>
            <p className="text-sm text-gray-500 mt-1">{posts.length} posts • {posts.reduce((s, p) => s + p.viewCount, 0).toLocaleString()} total views</p>
          </div>
          <button onClick={handleAddPost}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-sm font-semibold transition-all shadow-lg shadow-emerald-600/20">
            <Plus className="w-4 h-4" /> Add Post
          </button>
        </div>

        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-white/[0.06] bg-[#0A0A0F]/60 px-6 py-12 text-center text-gray-500 text-sm">No posts found</div>
          ) : filtered.map(post => (
            <motion.div key={post.id} layout
              className="rounded-2xl border border-white/[0.06] bg-[#0A0A0F]/60 backdrop-blur-xl overflow-hidden transition-all hover:border-white/[0.1]">
              {postEditingId === post.id ? (
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5 font-medium uppercase tracking-wider">Title</label>
                      <input className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
                        value={post.title} onChange={e => setPosts(prev => prev.map(p => p.id === post.id ? { ...p, title: e.target.value } : p))} />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5 font-medium uppercase tracking-wider">Slug</label>
                      <input className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-gray-400 text-sm font-mono focus:outline-none focus:border-purple-500/50 transition-colors"
                        value={post.slug} onChange={e => setPosts(prev => prev.map(p => p.id === post.id ? { ...p, slug: e.target.value } : p))} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5 font-medium uppercase tracking-wider">Category</label>
                      <input className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
                        value={post.category} onChange={e => setPosts(prev => prev.map(p => p.id === post.id ? { ...p, category: e.target.value } : p))} />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5 font-medium uppercase tracking-wider">Excerpt</label>
                      <input className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
                        value={post.excerpt} onChange={e => setPosts(prev => prev.map(p => p.id === post.id ? { ...p, excerpt: e.target.value } : p))} />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5 font-medium uppercase tracking-wider">Tags (comma-separated)</label>
                      <input className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
                        value={post.tags.join(', ')} onChange={e => setPosts(prev => prev.map(p => p.id === post.id ? { ...p, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) } : p))} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5 font-medium uppercase tracking-wider">Content (HTML)</label>
                    <textarea className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm font-mono min-h-[200px] resize-y focus:outline-none focus:border-purple-500/50 transition-colors"
                      value={post.content} onChange={e => setPosts(prev => prev.map(p => p.id === post.id ? { ...p, content: e.target.value } : p))} />
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleSavePost(post)} disabled={isSaving}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-sm font-semibold transition-all">
                      {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button onClick={() => setPostEditingId(null)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] text-gray-400 text-sm font-medium transition-all">
                      <X className="w-3.5 h-3.5" /> Cancel
                    </button>
                    <select value={post.status} onChange={e => setPosts(prev => prev.map(p => p.id === post.id ? { ...p, status: e.target.value } : p))}
                      className="ml-auto bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs font-medium text-white cursor-pointer">
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <Newspaper className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-bold text-sm truncate">{post.title}</h3>
                      <span className={`inline-block px-2 py-0.5 rounded-md text-xs font-medium ${statusColors[post.status]}`}>{post.status}</span>
                      <span className="text-xs text-gray-500 bg-white/[0.04] px-2 py-0.5 rounded-md">{post.category}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      {post.tags.map(tag => (
                        <span key={tag} className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-md bg-white/[0.04] text-gray-500 border border-white/[0.05]">
                          <Tag className="w-3 h-3" /> {tag}
                        </span>
                      ))}
                      <span className="text-xs text-gray-600 flex items-center gap-1 ml-1">
                        <Eye className="w-3 h-3" /> {post.viewCount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <button onClick={() => setPostEditingId(post.id)}
                    className="p-2.5 rounded-xl hover:bg-purple-500/10 text-gray-500 hover:text-purple-400 transition-all">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button onClick={() => confirmDeletePost(post.id)}
                    className="p-2.5 rounded-xl hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Settings Tab ────────────────────────────────────

  const renderSettings = () => (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-2xl font-black tracking-tight">Site Settings</h2>
        <p className="text-sm text-gray-500 mt-1">Customize your Vidora AI site</p>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-[#0A0A0F]/60 backdrop-blur-xl p-6 space-y-6">
        <div>
          <h3 className="font-bold text-sm flex items-center gap-2 mb-4">
            <Globe className="w-4 h-4 text-purple-400" /> Branding
          </h3>
          <div className="space-y-4">
            {[
              { label: 'Site Name', key: 'siteName' as const, placeholder: 'My Site' },
              { label: 'Site Description', key: 'siteDescription' as const, placeholder: 'A short description' },
            ].map(({ label, key, placeholder }) => (
              <div key={key}>
                <label className="block text-xs text-gray-500 mb-1.5 font-medium uppercase tracking-wider">{label}</label>
                <input className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors placeholder:text-gray-700"
                  value={settings[key]} onChange={e => setSettings({ ...settings, [key]: e.target.value })} placeholder={placeholder} />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-sm flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-amber-400" /> Hero Section
          </h3>
          <div className="space-y-4">
            {[
              { label: 'Hero Headline', key: 'heroHeadline' as const, placeholder: 'Your main headline' },
              { label: 'Hero Subtitle', key: 'heroSubtitle' as const, placeholder: 'Supporting text' },
              { label: 'CTA Button Text', key: 'ctaText' as const, placeholder: 'Get Started' },
            ].map(({ label, key, placeholder }) => (
              <div key={key}>
                <label className="block text-xs text-gray-500 mb-1.5 font-medium uppercase tracking-wider">{label}</label>
                <input className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors placeholder:text-gray-700"
                  value={settings[key]} onChange={e => setSettings({ ...settings, [key]: e.target.value })} placeholder={placeholder} />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-sm flex items-center gap-2 mb-4">
            <Palette className="w-4 h-4 text-pink-400" /> Theme Colors
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Primary Color', key: 'primaryColor' as const },
              { label: 'Secondary Color', key: 'secondaryColor' as const },
            ].map(({ label, key }) => (
              <div key={key}>
                <label className="block text-xs text-gray-500 mb-1.5 font-medium uppercase tracking-wider">{label}</label>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input type="color" value={settings[key]} onChange={e => setSettings({ ...settings, [key]: e.target.value })}
                      className="w-11 h-11 rounded-xl cursor-pointer border-2 border-white/[0.08] bg-transparent" />
                  </div>
                  <input className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-sm font-mono focus:outline-none focus:border-purple-500/50 transition-colors"
                    value={settings[key]} onChange={e => setSettings({ ...settings, [key]: e.target.value })} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 h-12 rounded-xl overflow-hidden flex" style={{
            background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor})`,
          }}>
            <div className="flex-1 flex items-center justify-center text-xs font-bold text-white/90">Primary</div>
            <div className="flex-1 flex items-center justify-center text-xs font-bold text-white/90">Secondary</div>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-sm flex items-center gap-2 mb-4">
            <Hash className="w-4 h-4 text-gray-400" /> Footer
          </h3>
          <div>
            <label className="block text-xs text-gray-500 mb-1.5 font-medium uppercase tracking-wider">Footer Text</label>
            <input className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
              value={settings.footerText} onChange={e => setSettings({ ...settings, footerText: e.target.value })} />
          </div>
        </div>

        <div className="pt-2">
          <button onClick={handleSaveSettings} disabled={isSettingsSaving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 disabled:opacity-50 text-white text-sm font-semibold transition-all shadow-lg shadow-purple-600/20">
            {isSettingsSaving ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
            ) : (
              <><Save className="w-4 h-4" /> Save All Settings</>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  // ─── Main Layout ─────────────────────────────────────

  const activeTab = TAB_CONFIG.find(t => t.id === tab)!;

  return (
    <div className="min-h-screen bg-[#050508] flex">
      {/* Delete confirmation modal */}
      {renderDeleteModal()}

      {/* Sidebar */}
      <aside className={`${sidebarCollapsed ? 'w-[68px]' : 'w-64'} flex-shrink-0 bg-[#07070D] border-r border-white/[0.05] flex flex-col transition-all duration-300 relative`}>
        <div className={`p-5 border-b border-white/[0.05] ${sidebarCollapsed ? 'px-0 flex justify-center' : ''}`}>
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ rotate: 15 }}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-600/30">
              <Shield className="w-5 h-5 text-white" />
            </motion.div>
            {!sidebarCollapsed && (
              <div className="min-w-0">
                <div className="font-black text-sm tracking-tight">Vidora AI</div>
                <div className="text-[10px] text-gray-600 uppercase tracking-widest">Admin</div>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {TAB_CONFIG.map(({ id, label, icon: Icon, color }) => (
            <button key={id} onClick={() => setTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                tab === id
                  ? `${getColorClass(color, 'bg')} ${getColorClass(color, 'text')} ${getColorClass(color, 'border')} border`
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.04] border border-transparent'
              } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}>
              <Icon className="w-4 h-4 flex-shrink-0" />
              {!sidebarCollapsed && <span>{label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-white/[0.05] space-y-1">
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:text-gray-400 hover:bg-white/[0.04] transition-all ${sidebarCollapsed ? 'justify-center px-0' : ''}`}>
            <ChevronRight className={`w-4 h-4 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
            {!sidebarCollapsed && <span>Collapse</span>}
          </button>
          <a href="/" target="_blank" rel="noopener noreferrer"
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-gray-300 hover:bg-white/[0.04] transition-all ${sidebarCollapsed ? 'justify-center px-0' : ''}`}>
            <ExternalLink className="w-4 h-4 flex-shrink-0" />
            {!sidebarCollapsed && <span>View Site</span>}
          </a>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 border-b border-white/[0.05] bg-[#07070D]/50 backdrop-blur-xl flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold tracking-tight">{activeTab.label}</h1>
            <span className="text-xs text-gray-600 hidden sm:inline">/admin{tab !== 'dashboard' ? `/${tab}` : ''}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
              <input
                className="w-56 bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition-all"
                placeholder="Search anything..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="relative">
              <button onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/[0.04] transition-all">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-xs font-bold">
                  {(user?.name || 'A').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                </div>
              </button>
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div initial={{ opacity: 0, y: -8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-white/[0.08] bg-[#0E0E16] backdrop-blur-2xl shadow-2xl p-2 z-50">
                    <div className="px-3 py-2 mb-1">
                      <div className="text-sm font-semibold">{user?.name || 'Admin'}</div>
                      <div className="text-xs text-gray-500">{user?.email || 'admin@vidora.ai'}</div>
                    </div>
                    <div className="h-px bg-white/[0.05] my-1" />
                    <button onClick={() => { useAuthStore.getState().logout(); router.push('/admin/login'); }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-all">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
              {tab === 'dashboard' && renderDashboard()}
              {tab === 'users' && renderUsers()}
              {tab === 'pages' && renderPages()}
              {tab === 'posts' && renderPosts()}
              {tab === 'settings' && renderSettings()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 24, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.95 }}
            className="fixed bottom-6 right-6 rounded-xl border border-white/[0.08] bg-[#0E0E16]/90 backdrop-blur-2xl px-5 py-3 shadow-2xl z-50 flex items-center gap-2">
            {toastType === 'error' ? (
              <AlertTriangle className="w-4 h-4 text-red-400" />
            ) : (
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            )}
            <span className="text-sm font-medium text-white">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
