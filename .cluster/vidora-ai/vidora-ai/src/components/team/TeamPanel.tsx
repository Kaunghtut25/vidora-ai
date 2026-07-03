'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Users,
  UserPlus,
  Shield,
  Trash2,
  Clock,
  Mail,
  Folder,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ────────────────────────────────────
// Types & Mock Data
// ────────────────────────────────────

type Role = 'Admin' | 'Editor' | 'Viewer';

interface TeamMember {
  id: string;
  name: string;
  role: Role;
  email: string;
  initials: string;
  gradient: string;
}

const initialMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Ko Kaung',
    role: 'Admin',
    email: 'ko@vidora.ai',
    initials: 'KK',
    gradient: 'from-purple-500 to-indigo-500',
  },
  {
    id: '2',
    name: 'Aye Myat',
    role: 'Editor',
    email: 'aye@vidora.ai',
    initials: 'AM',
    gradient: 'from-cyan-400 to-teal-400',
  },
  {
    id: '3',
    name: 'Min Thu',
    role: 'Viewer',
    email: 'min@vidora.ai',
    initials: 'MT',
    gradient: 'from-amber-400 to-orange-400',
  },
  {
    id: '4',
    name: 'Thida',
    role: 'Editor',
    email: 'thida@vidora.ai',
    initials: 'TH',
    gradient: 'from-emerald-400 to-green-400',
  },
];

interface Project {
  name: string;
  edited: string;
}

const sharedProjects: Project[] = [
  { name: 'Bagan Sunrise', edited: '2 hours ago' },
  { name: 'AI Trends 2026', edited: '1 day ago' },
  { name: 'Myanmar Street Food', edited: '3 days ago' },
];

interface Activity {
  user: string;
  initials: string;
  gradient: string;
  action: string;
  project: string;
  time: string;
}

const activities: Activity[] = [
  {
    user: 'Ko Kaung',
    initials: 'KK',
    gradient: 'from-purple-500 to-indigo-500',
    action: 'edited',
    project: 'Bagan Sunrise',
    time: '10 min ago',
  },
  {
    user: 'Aye Myat',
    initials: 'AM',
    gradient: 'from-cyan-400 to-teal-400',
    action: 'commented on',
    project: 'AI Trends 2026',
    time: '1 hour ago',
  },
  {
    user: 'Thida',
    initials: 'TH',
    gradient: 'from-emerald-400 to-green-400',
    action: 'exported',
    project: 'Myanmar Street Food',
    time: '3 hours ago',
  },
  {
    user: 'Min Thu',
    initials: 'MT',
    gradient: 'from-amber-400 to-orange-400',
    action: 'reviewed',
    project: 'Tech Review #42',
    time: '5 hours ago',
  },
  {
    user: 'Ko Kaung',
    initials: 'KK',
    gradient: 'from-purple-500 to-indigo-500',
    action: 'invited',
    project: 'Aye Myat to team',
    time: '1 day ago',
  },
];

const roleOptions: Role[] = ['Admin', 'Editor', 'Viewer'];

const roleBadgeColors: Record<Role, string> = {
  Admin: 'bg-purple-400/15 text-purple-300 border-purple-400/20',
  Editor: 'bg-cyan-400/15 text-cyan-300 border-cyan-400/20',
  Viewer: 'bg-gray-400/15 text-gray-300 border-gray-400/20',
};

// ────────────────────────────────────
// AnimateIn wrapper
// ────────────────────────────────────

function AnimateIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ────────────────────────────────────
// Avatar circle
// ────────────────────────────────────

function Avatar({
  initials,
  gradient,
  size = 'md',
}: {
  initials: string;
  gradient: string;
  size?: 'sm' | 'md';
}) {
  const sizeClasses = size === 'sm' ? 'w-7 h-7 text-[10px]' : 'w-10 h-10 text-xs';

  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center font-bold text-white flex-shrink-0 bg-gradient-to-br',
        sizeClasses,
        gradient,
      )}
    >
      {initials}
    </div>
  );
}

// ────────────────────────────────────
// Role badge
// ────────────────────────────────────

function RoleBadge({ role }: { role: Role }) {
  return (
    <span
      className={cn(
        'text-[11px] font-medium px-2 py-0.5 rounded-full border',
        roleBadgeColors[role],
      )}
    >
      {role}
    </span>
  );
}

// ────────────────────────────────────
// Role dropdown (select)
// ────────────────────────────────────

function RoleSelect({
  value,
  onChange,
}: {
  value: Role;
  onChange: (r: Role) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          'flex items-center justify-between gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium',
          'bg-white/5 border border-white/10 text-gray-200',
          'hover:border-purple-400/30 transition-colors duration-200',
        )}
      >
        <span className="flex items-center gap-2">
          <Shield size={13} className="text-gray-500" />
          {value}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={14} className="text-gray-500" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'absolute z-50 top-full mt-1.5 w-full rounded-lg overflow-hidden',
              'bg-[#1a1a24] border border-white/10 shadow-xl shadow-black/40',
            )}
          >
            {roleOptions.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => {
                  onChange(r);
                  setOpen(false);
                }}
                className={cn(
                  'w-full text-left px-3 py-2 text-sm transition-colors duration-100',
                  r === value
                    ? 'bg-purple-400/10 text-purple-300'
                    : 'text-gray-400 hover:bg-white/5 hover:text-gray-200',
                )}
              >
                {r}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ────────────────────────────────────
// Member row
// ────────────────────────────────────

function MemberRow({
  member,
  onRemove,
  delay,
}: {
  member: TeamMember;
  onRemove: (id: string) => void;
  delay: number;
}) {
  return (
    <AnimateIn delay={delay}>
      <div
        className={cn(
          'flex items-center gap-3 p-3 rounded-xl',
          'bg-white/[0.02] border border-white/5',
          'hover:bg-white/[0.04] hover:border-white/10',
          'transition-all duration-200 group',
        )}
      >
        <Avatar initials={member.initials} gradient={member.gradient} />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white truncate">
              {member.name}
            </span>
            <RoleBadge role={member.role} />
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Mail size={10} className="text-gray-600" />
            <span className="text-xs text-gray-500 truncate">{member.email}</span>
          </div>
        </div>

        <button
          onClick={() => onRemove(member.id)}
          className={cn(
            'p-2 rounded-lg transition-all duration-200',
            'text-gray-600 hover:text-red-400 hover:bg-red-400/10',
            'opacity-0 group-hover:opacity-100',
          )}
          aria-label={`Remove ${member.name}`}
        >
          <Trash2 size={15} />
        </button>
      </div>
    </AnimateIn>
  );
}

// ────────────────────────────────────
// Shared Project row
// ────────────────────────────────────

function ProjectRow({ project, delay }: { project: Project; delay: number }) {
  return (
    <AnimateIn delay={delay}>
      <div
        className={cn(
          'flex items-center gap-3 p-3 rounded-xl',
          'hover:bg-white/[0.03] transition-colors duration-200',
        )}
      >
        <div className="p-2 rounded-lg bg-purple-400/10 flex-shrink-0">
          <Folder size={16} className="text-purple-400" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-sm font-medium text-white block truncate">
            {project.name}
          </span>
          <div className="flex items-center gap-1 mt-0.5">
            <Clock size={10} className="text-gray-600" />
            <span className="text-[11px] text-gray-500">
              Last edited {project.edited}
            </span>
          </div>
        </div>
      </div>
    </AnimateIn>
  );
}

// ────────────────────────────────────
// Activity row
// ────────────────────────────────────

function ActivityRow({ activity, delay }: { activity: Activity; delay: number }) {
  return (
    <AnimateIn delay={delay}>
      <div className="flex items-start gap-3 py-2.5">
        <Avatar initials={activity.initials} gradient={activity.gradient} size="sm" />
        <div className="flex-1 min-w-0 pt-0.5">
          <p className="text-sm text-gray-200 leading-snug">
            <span className="font-medium text-white">{activity.user}</span>
            {' '}
            <span className="text-gray-400">{activity.action}</span>
            {' '}
            <span className="font-medium text-purple-400">
              &apos;{activity.project}&apos;
            </span>
          </p>
          <div className="flex items-center gap-1 mt-0.5">
            <Clock size={10} className="text-gray-600" />
            <span className="text-[11px] text-gray-500">{activity.time}</span>
          </div>
        </div>
      </div>
    </AnimateIn>
  );
}

// ────────────────────────────────────
// Main Panel
// ────────────────────────────────────

export default function TeamPanel() {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<Role>('Editor');
  const [sent, setSent] = useState(false);

  const handleRemove = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    // Mock: add a pending member
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: inviteEmail.split('@')[0],
      role: inviteRole,
      email: inviteEmail.trim(),
      initials: inviteEmail
        .split('@')[0]
        .slice(0, 2)
        .toUpperCase(),
      gradient: 'from-gray-400 to-gray-500',
    };

    setMembers((prev) => [...prev, newMember]);
    setInviteEmail('');
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  };

  return (
    <section className="space-y-6">
      {/* ── Section Header ── */}
      <AnimateIn>
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 rounded-lg bg-purple-400/10">
            <Users size={20} className="text-purple-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Team</h2>
            <p className="text-xs text-gray-500">
              Collaborate with your team in real-time
            </p>
          </div>
          <div className="ml-auto glass-card px-3 py-1.5 rounded-full">
            <span className="text-sm font-semibold text-white">
              {members.length}
            </span>
            <span className="text-xs text-gray-500 ml-1">members</span>
          </div>
        </div>
      </AnimateIn>

      {/* ── Two-column layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* ── Left column: Members + Invite ── */}
        <div className="lg:col-span-3 space-y-4">
          {/* Team Members */}
          <AnimateIn delay={0.05} className="glass-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Users size={16} className="text-purple-400" />
              <h3 className="text-sm font-semibold text-white">
                Team Members
              </h3>
              <span className="text-[11px] text-gray-600 ml-auto">
                {members.length} {members.length === 1 ? 'member' : 'members'}
              </span>
            </div>

            <div className="space-y-2">
              <AnimatePresence mode="popLayout">
                {members.map((member, i) => (
                  <motion.div
                    key={member.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, height: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <MemberRow
                      member={member}
                      onRemove={handleRemove}
                      delay={0.08 + i * 0.05}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {members.length === 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-gray-500 text-center py-6"
              >
                No team members yet. Invite someone to get started.
              </motion.p>
            )}
          </AnimateIn>

          {/* Invite Member */}
          <AnimateIn delay={0.12} className="glass-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <UserPlus size={16} className="text-purple-400" />
              <h3 className="text-sm font-semibold text-white">
                Invite Member
              </h3>
            </div>

            <form onSubmit={handleInvite} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Email input */}
                <div className="flex-1 relative">
                  <Mail
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="colleague@vidora.ai"
                    className={cn(
                      'w-full pl-9 pr-3 py-2 rounded-lg text-sm',
                      'bg-white/5 border border-white/10 text-white',
                      'placeholder:text-gray-600 outline-none',
                      'focus:border-purple-400/40 focus:bg-white/[0.07]',
                      'transition-all duration-200',
                    )}
                  />
                </div>

                {/* Role select */}
                <div className="w-full sm:w-36">
                  <RoleSelect value={inviteRole} onChange={setInviteRole} />
                </div>
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  'w-full py-2.5 rounded-lg text-sm font-semibold text-white',
                  'bg-gradient-to-r from-purple-500 to-indigo-500',
                  'hover:from-purple-400 hover:to-indigo-400',
                  'shadow-lg shadow-purple-500/20',
                  'transition-all duration-200',
                  'flex items-center justify-center gap-2',
                )}
              >
                {sent ? (
                  <motion.span
                    key="sent"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Invite Sent!
                  </motion.span>
                ) : (
                  <>
                    <UserPlus size={15} />
                    Send Invite
                  </>
                )}
              </motion.button>
            </form>
          </AnimateIn>
        </div>

        {/* ── Right column: Projects + Activity ── */}
        <div className="lg:col-span-2 space-y-4">
          {/* Shared Projects */}
          <AnimateIn delay={0.15} className="glass-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <Folder size={16} className="text-cyan-400" />
              <h3 className="text-sm font-semibold text-white">
                Shared Projects
              </h3>
              <span className="text-[11px] text-gray-600 ml-auto">
                {sharedProjects.length} shared
              </span>
            </div>

            <div className="divide-y divide-white/5">
              {sharedProjects.map((project, i) => (
                <ProjectRow key={project.name} project={project} delay={0.18 + i * 0.06} />
              ))}
            </div>
          </AnimateIn>

          {/* Recent Activity */}
          <AnimateIn delay={0.2} className="glass-card p-5">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={16} className="text-purple-400" />
              <h3 className="text-sm font-semibold text-white">
                Recent Activity
              </h3>
            </div>

            <div className="divide-y divide-white/5">
              {activities.map((activity, i) => (
                <ActivityRow
                  key={`${activity.user}-${activity.project}-${i}`}
                  activity={activity}
                  delay={0.22 + i * 0.05}
                />
              ))}
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
