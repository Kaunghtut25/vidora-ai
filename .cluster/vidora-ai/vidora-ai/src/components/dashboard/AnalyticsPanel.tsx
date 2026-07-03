'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  TrendingUp,
  Film,
  Star,
  HardDrive,
  BarChart3,
  Activity,
  Clock,
  Download,
  Edit,
  Upload,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ────────────────────────────────────
// Data
// ────────────────────────────────────

const statsCards = [
  {
    label: 'Total Videos',
    value: '247',
    sub: '↑ 12% this month',
    icon: TrendingUp,
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-400/10',
    trend: 'up',
  },
  {
    label: 'Total Minutes',
    value: '1,842',
    sub: 'Across all projects',
    icon: Film,
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-400/10',
  },
  {
    label: 'Avg. Rating',
    value: '4.8',
    unit: '/5',
    sub: 'Based on 186 reviews',
    icon: Star,
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-400/10',
    stars: true,
  },
  {
    label: 'Storage Used',
    icon: HardDrive,
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-400/10',
    progress: { used: 12.4, total: 50 },
  },
];

const weekData = [
  { day: 'Mon', count: 28 },
  { day: 'Tue', count: 35 },
  { day: 'Wed', count: 42 },
  { day: 'Thu', count: 38 },
  { day: 'Fri', count: 55 },
  { day: 'Sat', count: 30 },
  { day: 'Sun', count: 19 },
];

const voices = [
  { name: 'Nova', count: 84 },
  { name: 'Echo', count: 62 },
  { name: 'Orion', count: 45 },
  { name: 'Luna', count: 33 },
  { name: 'Sage', count: 23 },
];
const maxVoiceCount = voices[0].count;

const activities = [
  {
    icon: Film,
    text: "Generated 'AI Trends 2026'",
    detail: '15 min',
    time: '2 hours ago',
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-400/10',
  },
  {
    icon: Download,
    text: "Exported 'Bagan Documentary' to MP4",
    detail: '22 min',
    time: '1 day ago',
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-400/10',
  },
  {
    icon: Edit,
    text: "Edited script for 'Tech Review #42'",
    detail: '',
    time: '1 day ago',
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-400/10',
  },
  {
    icon: Star,
    text: "Rated 5 stars on 'Myanmar Street Food'",
    detail: '',
    time: '3 days ago',
    iconColor: 'text-yellow-400',
    iconBg: 'bg-yellow-400/10',
  },
  {
    icon: Upload,
    text: "Uploaded custom footage for 'Project Aurora'",
    detail: '320 MB',
    time: '5 days ago',
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-400/10',
  },
];

// ────────────────────────────────────
// Sub-components
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

function StatCard({
  label,
  value,
  unit,
  sub,
  icon: Icon,
  iconColor,
  iconBg,
  trend,
  stars,
  progress,
  delay,
}: (typeof statsCards)[number] & { delay: number }) {
  return (
    <AnimateIn
      delay={delay}
      className="glass-card p-5 hover:border-purple-500/20 hover:bg-[#111118]/80 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          {label}
        </span>
        <div className={cn('p-2 rounded-lg', iconBg)}>
          <Icon size={18} className={iconColor} />
        </div>
      </div>

      <div className="flex items-baseline gap-1.5 mb-1">
        <span className="text-2xl font-bold text-white">{value}</span>
        {unit && <span className="text-sm text-gray-500">{unit}</span>}
      </div>

      {/* Stars row */}
      {stars && (
        <div className="flex items-center gap-0.5 mb-1.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              size={13}
              className={s <= 4 ? 'text-amber-400 fill-amber-400' : 'text-gray-600 fill-gray-600'}
            />
          ))}
        </div>
      )}

      {/* Trend subtext */}
      {trend === 'up' && sub && (
        <p className="text-xs text-emerald-400 font-medium flex items-center gap-1">
          <TrendingUp size={12} />
          {sub}
        </p>
      )}
      {!trend && sub && !progress && (
        <p className="text-xs text-gray-500">{sub}</p>
      )}

      {/* Progress bar */}
      {progress && (
        <div className="mt-2.5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-semibold text-white">
              {progress.used} GB
            </span>
            <span className="text-xs text-gray-500">
              / {progress.total} GB
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${(progress.used / progress.total) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-400"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1.5">
            {(50 - progress.used).toFixed(1)} GB free
          </p>
        </div>
      )}
    </AnimateIn>
  );
}

function BarChart() {
  const maxCount = Math.max(...weekData.map((d) => d.count));

  return (
    <div className="flex items-end justify-between gap-2 h-44 px-1">
      {weekData.map((d, i) => (
        <div key={d.day} className="flex flex-col items-center gap-2 flex-1">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.08 }}
            className="text-xs font-medium text-gray-400"
          >
            {d.count}
          </motion.span>
          <motion.div
            initial={{ height: 0 }}
            whileInView={{
              height: `${(d.count / maxCount) * 100}%`,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.15 + i * 0.08,
              ease: 'easeOut',
            }}
            className="w-full max-w-[32px] rounded-t-lg bg-gradient-to-t from-purple-600 to-purple-400"
            style={{
              boxShadow: '0 0 12px rgba(139, 92, 246, 0.3)',
            }}
          />
          <span className="text-[11px] text-gray-600 font-medium uppercase">
            {d.day}
          </span>
        </div>
      ))}
    </div>
  );
}

function VoiceBars() {
  return (
    <div className="space-y-4">
      {voices.map((v, i) => (
        <div key={v.name} className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300 font-medium">{v.name}</span>
            <span className="text-xs text-gray-500">{v.count}</span>
          </div>
          <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{
                width: `${(v.count / maxVoiceCount) * 100}%`,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.2 + i * 0.1,
                ease: 'easeOut',
              }}
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-400"
              style={{ opacity: 1 - i * 0.15 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function ActivityTimeline() {
  return (
    <div className="relative pl-1">
      {/* Vertical line */}
      <div className="absolute left-[19px] top-2 bottom-2 w-px bg-white/6" />

      <div className="space-y-0">
        {activities.map((a, i) => (
          <AnimateIn key={i} delay={0.1 + i * 0.08} className="relative flex items-start gap-4 py-3">
            {/* Icon dot */}
            <div
              className={cn(
                'relative z-10 flex-shrink-0 w-[38px] h-[38px] rounded-xl flex items-center justify-center',
                a.iconBg,
              )}
            >
              <a.icon size={17} className={a.iconColor} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pt-1">
              <p className="text-sm text-gray-200 font-medium leading-snug">{a.text}</p>
              <div className="flex items-center gap-2 mt-1">
                <Clock size={11} className="text-gray-600" />
                <span className="text-[11px] text-gray-600">{a.time}</span>
                {a.detail && (
                  <>
                    <span className="text-gray-700">·</span>
                    <span className="text-[11px] text-gray-600">{a.detail}</span>
                  </>
                )}
              </div>
            </div>
          </AnimateIn>
        ))}
      </div>
    </div>
  );
}

// ────────────────────────────────────
// Main Panel
// ────────────────────────────────────

export default function AnalyticsPanel() {
  return (
    <section className="space-y-6">
      {/* ── Section Header ── */}
      <AnimateIn>
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 rounded-lg bg-purple-400/10">
            <BarChart3 size={20} className="text-purple-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Analytics</h2>
            <p className="text-xs text-gray-500">Your video creation stats &amp; insights</p>
          </div>
        </div>
      </AnimateIn>

      {/* ── Stats Cards Row ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statsCards.map((card, i) => (
          <StatCard key={card.label} {...card} delay={0.05 + i * 0.08} />
        ))}
      </div>

      {/* ── Charts Row (2 columns) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Videos Created — Bar Chart */}
        <AnimateIn delay={0.1} className="glass-card mesh-dark p-6">
          <div className="flex items-center gap-2 mb-5">
            <BarChart3 size={16} className="text-purple-400" />
            <h3 className="text-sm font-semibold text-white">Videos Created</h3>
            <span className="text-[11px] text-gray-600 ml-auto">This week</span>
          </div>
          <BarChart />
        </AnimateIn>

        {/* Popular Voices — Horizontal Bars */}
        <AnimateIn delay={0.15} className="glass-card mesh-dark p-6">
          <div className="flex items-center gap-2 mb-5">
            <Activity size={16} className="text-cyan-400" />
            <h3 className="text-sm font-semibold text-white">Popular Voices</h3>
            <span className="text-[11px] text-gray-600 ml-auto">All time</span>
          </div>
          <VoiceBars />
        </AnimateIn>
      </div>

      {/* ── Recent Activity ── */}
      <AnimateIn delay={0.2} className="glass-card mesh-dark p-6">
        <div className="flex items-center gap-2 mb-4">
          <Activity size={16} className="text-purple-400" />
          <h3 className="text-sm font-semibold text-white">Recent Activity</h3>
        </div>
        <ActivityTimeline />
      </AnimateIn>
    </section>
  );
}
