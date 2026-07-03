'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { mockProjects } from '@/data/projects';
import type { Project, ProjectStatus } from '@/types';
import {
  Search,
  Plus,
  Play,
  Clock,
  Film,
  CheckCircle2,
  Edit3,
  Loader2,
  FileText,
  LayoutDashboard,
  FolderOpen,
  Settings,
  HelpCircle,
  TrendingUp,
  Eye,
  ChevronLeft,
  Sparkles,
} from 'lucide-react';

/* ──────────────── Helpers ──────────────── */

type FilterStatus = 'all' | 'draft' | 'generating' | 'editing' | 'completed';

const statusConfig: Record<FilterStatus, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  all: { label: 'All', color: 'text-zinc-300', bg: 'bg-zinc-500/10 border-zinc-500/20', icon: <Film size={12} /> },
  draft: { label: 'Draft', color: 'text-zinc-400', bg: 'bg-zinc-500/10 border-zinc-500/20', icon: <FileText size={12} /> },
  generating: { label: 'Generating', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', icon: <Loader2 size={12} className="animate-spin" /> },
  editing: { label: 'Editing', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20', icon: <Edit3 size={12} /> },
  completed: { label: 'Completed', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', icon: <CheckCircle2 size={12} /> },
};

const gradients: string[] = [
  'from-violet-600 via-purple-500 to-fuchsia-500',
  'from-cyan-500 via-blue-500 to-indigo-600',
  'from-emerald-500 via-teal-500 to-cyan-500',
  'from-amber-500 via-orange-500 to-rose-500',
  'from-pink-500 via-rose-500 to-red-500',
  'from-indigo-500 via-violet-500 to-purple-600',
];

const projectEmojis: string[] = ['🏛️', '🤖', '📱', '🎭', '🍜', '📊'];

// Map voice IDs to friendly names
const voiceNames: Record<string, string> = {
  'aye-myat': 'Aye Myat',
  'marcus': 'Marcus',
  'priya': 'Priya',
  'ko-ko': 'Ko Ko',
  'thida': 'Thida',
  'david': 'David',
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/* ──────────────── Sidebar ──────────────── */

function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/create/step1', label: 'Create', icon: Plus },
    { href: '/dashboard', label: 'Projects', icon: FolderOpen },
    { href: '/settings', label: 'Settings', icon: Settings },
    { href: '/help', label: 'Help', icon: HelpCircle },
  ];

  return (
    <aside
      className="fixed left-0 top-0 h-full bg-[#0A0A0F] border-r border-white/[0.04] z-40 flex flex-col transition-all duration-300 ease-in-out"
      style={{ width: collapsed ? 64 : 256 }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-white/[0.04] shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shrink-0">
          <Sparkles size={18} className="text-white" />
        </div>
        {!collapsed && (
          <span className="text-lg font-bold text-white whitespace-nowrap transition-opacity duration-200">
            Vidora<span className="text-violet-400"> AI</span>
          </span>
        )}
      </div>

      {/* Toggle */}
      <button
        onClick={onToggle}
        className="flex items-center justify-center py-2 text-zinc-500 hover:text-white hover:bg-white/[0.03] transition-colors"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <ChevronLeft size={16} className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
      </button>

      {/* Nav links */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors text-sm font-medium whitespace-nowrap ${
                item.label === 'Dashboard'
                  ? 'bg-violet-500/15 text-violet-300 border border-violet-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Icon size={18} className="shrink-0" />
              {!collapsed && (
                <span className="transition-opacity duration-200">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User profile */}
      <div className="p-3 border-t border-white/[0.04]">
        <div className={`flex items-center gap-3 rounded-lg p-2 hover:bg-white/[0.03] transition-colors ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
            KK
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">Ko Kaung</p>
              <p className="text-xs text-zinc-500 truncate">Pro Plan</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

/* ──────────────── Stat Card ──────────────── */

function StatCard({ icon: Icon, label, value, trend }: { icon: React.ElementType; label: string; value: string; trend?: string }) {
  return (
    <div className="glass-card rounded-2xl p-5 flex items-start gap-4 hover-lift group">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-white/5 flex items-center justify-center shrink-0 group-hover:border-violet-500/30 transition-colors">
        <Icon size={18} className="text-violet-400" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">{label}</p>
        <p className="text-xl font-bold text-white mt-0.5">{value}</p>
        {trend && <p className="text-xs text-emerald-400 mt-0.5">{trend}</p>}
      </div>
    </div>
  );
}

/* ──────────────── Project Card ──────────────── */

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const status = project.status as FilterStatus;
  const s = statusConfig[status] ?? statusConfig.all;
  const emoji = projectEmojis[index % projectEmojis.length];
  const gradient = gradients[index % gradients.length];
  const voiceName = project.voice?.voiceId ?? project.voiceId;
  const voiceDisplay = voiceNames[voiceName] ?? voiceName;

  return (
    <Link
      href={`/editor/${project.id}`}
      className="glass-card rounded-2xl overflow-hidden block hover-lift group border-white/5 hover:border-purple-500/30 transition-all duration-300"
    >
      {/* Thumbnail */}
      <div className={`relative h-40 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <span className="text-5xl drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
          {emoji}
        </span>
        {/* Duration badge */}
        <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/50 backdrop-blur text-xs text-white/80 font-mono flex items-center gap-1">
          <Clock size={10} />
          {project.videoLength}m
        </span>
        {/* Status badge */}
        <span className={`absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-medium border flex items-center gap-1 ${s.color} ${s.bg}`}>
          {s.icon}
          {s.label}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2 group-hover:text-violet-300 transition-colors">
          {project.title}
        </h3>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-zinc-400">
            🎙️ {voiceDisplay}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-zinc-400">
            {project.style}
          </span>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-white/5">
          <span className="text-[11px] text-zinc-500">{formatDate(project.createdAt)}</span>
          <span className="text-[11px] text-zinc-500 flex items-center gap-1">
            <Play size={10} fill="currentColor" />
            Ready
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ──────────────── Dashboard Page ──────────────── */

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const filteredProjects = useMemo(() => {
    return mockProjects.filter((p) => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const stats = useMemo(() => ({
    total: mockProjects.length,
    completed: mockProjects.filter((p) => p.status === 'completed').length,
    inProgress: mockProjects.filter((p) => p.status === 'generating' || p.status === 'editing').length,
    totalViews: 30130,
  }), []);

  const filterOptions: { value: FilterStatus; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'draft', label: 'Drafts' },
    { value: 'generating', label: 'Generating' },
    { value: 'editing', label: 'Editing' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div className="min-h-screen bg-[#040407] overflow-x-hidden">
      {/* Background mesh */}
      <div className="fixed inset-0 pointer-events-none mesh-purple opacity-50" />

      {/* Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((v) => !v)} />

      {/* Main content */}
      <main
        className="relative pt-6 px-4 sm:px-6 lg:px-8 pb-12 transition-all duration-300"
        style={{ marginLeft: sidebarCollapsed ? 64 : 256 }}
      >
        {/* ── Page Header ── */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">My Projects</h1>
            <p className="text-zinc-500 text-sm mt-1">
              {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
              {statusFilter !== 'all' && ` · ${statusFilter}`}
            </p>
          </div>
          <Link
            href="/create/step1"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-medium hover:opacity-90 transition-all shadow-lg shadow-violet-500/20 shrink-0"
          >
            <Plus size={16} />
            Create New Video
          </Link>
        </div>

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <StatCard icon={Film} label="Total Projects" value={String(stats.total)} />
          <StatCard icon={CheckCircle2} label="Completed" value={String(stats.completed)} trend="+2 this month" />
          <StatCard icon={TrendingUp} label="In Progress" value={String(stats.inProgress)} />
          <StatCard icon={Eye} label="Total Views" value={stats.totalViews.toLocaleString()} trend="+18% from last month" />
        </div>

        {/* ── Search & Filter Bar ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-violet-500/50 focus:border-violet-500/30 backdrop-blur-xl transition-all"
            />
          </div>

          {/* Filter pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl overflow-x-auto">
            {filterOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setStatusFilter(opt.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  statusFilter === opt.value
                    ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                    : 'text-zinc-500 hover:text-zinc-300 border border-transparent'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Project Grid ── */}
        {filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Film size={48} className="text-zinc-700 mb-4" />
            <h3 className="text-lg font-medium text-zinc-400 mb-1">No projects found</h3>
            <p className="text-sm text-zinc-600 mb-6">
              {searchQuery ? 'Try a different search term' : 'Create your first AI-powered video'}
            </p>
            <Link
              href="/create/step1"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-medium hover:opacity-90 transition-all"
            >
              <Plus size={16} />
              Create New Video
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
