'use client';

import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Brain,
  Mic,
  Clapperboard,
  Sparkles,
  Check,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store';

const STAGE_DEFS = [
  {
    id: 'research',
    label: 'Researching content',
    subtitle: 'Scanning trusted sources',
    icon: Search,
    estimate: '~2 min',
  },
  {
    id: 'script',
    label: 'Expanding script with deep thinking',
    subtitle: 'Adding stats, examples & insights',
    icon: Brain,
    estimate: '~3 min',
  },
  {
    id: 'voiceover',
    label: 'Generating voiceover',
    subtitle: 'Creating natural-sounding audio',
    icon: Mic,
    estimate: '~2 min',
  },
  {
    id: 'visuals',
    label: 'Creating visuals & B-roll',
    subtitle: 'Selecting matching footage',
    icon: Clapperboard,
    estimate: '~4 min',
  },
  {
    id: 'editing',
    label: 'Editing & polishing',
    subtitle: 'Putting on the final touches',
    icon: Sparkles,
    estimate: '~2 min',
  },
] as const;

// ── Sparkle/Particle background ──
function ParticleField() {
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 3,
        opacity: Math.random() * 0.4 + 0.1,
      })),
    [],
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-purple-400/40"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            opacity: [p.opacity, p.opacity * 2.5, p.opacity],
            scale: [1, 1.8, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}
        />
      ))}
    </div>
  );
}

// ── Single Stage Row ──
function StageRow({
  stage,
  isActive,
  isCompleted,
  index,
}: {
  stage: (typeof STAGE_DEFS)[number];
  isActive: boolean;
  isCompleted: boolean;
  index: number;
}) {
  const stageData = useAppStore((s) =>
    s.generationStages.find((gs) => gs.id === stage.id),
  );
  const progress = stageData?.progress ?? 0;

  const Icon = stage.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.15, duration: 0.4, ease: 'easeOut' as const }}
      className="relative"
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="relative shrink-0 mt-0.5">
          <div
            className={cn(
              'w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-500',
              isCompleted && 'bg-emerald-500/15 text-emerald-400',
              isActive && 'bg-purple-500/15 text-purple-400',
              !isActive && !isCompleted && 'bg-white/5 text-gray-600',
            )}
          >
            {isCompleted ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Check className="w-4 h-4" />
              </motion.div>
            ) : isActive ? (
              <motion.div
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' as const }}
              >
                <Icon className="w-4 h-4" />
              </motion.div>
            ) : (
              <Icon className="w-4 h-4" />
            )}
          </div>

          {/* Pulse ring when active */}
          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-xl border border-purple-500/40"
              animate={{ scale: [1, 1.25], opacity: [0.5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' as const }}
            />
          )}
        </div>

        {/* Label + progress */}
        <div className="flex-1 min-w-0 pt-0.5">
          <div className="flex items-center justify-between gap-2">
            <p
              className={cn(
                'text-sm font-medium transition-colors duration-500',
                isCompleted && 'text-emerald-400',
                isActive && 'text-white',
                !isActive && !isCompleted && 'text-gray-600',
              )}
            >
              {stage.label}
            </p>
            <span
              className={cn(
                'text-xs shrink-0 transition-colors duration-500',
                isCompleted && 'text-emerald-500/70',
                isActive && 'text-purple-400/70',
                !isActive && !isCompleted && 'text-gray-700',
              )}
            >
              {stage.estimate}
            </span>
          </div>
          <p
            className={cn(
              'text-xs mt-0.5 transition-colors duration-500',
              isActive ? 'text-gray-500' : 'text-gray-700',
            )}
          >
            {stage.subtitle}
          </p>

          {/* Progress bar */}
          <div className="mt-2 h-1 rounded-full bg-white/[0.04] overflow-hidden">
            <motion.div
              className={cn(
                'h-full rounded-full',
                isCompleted
                  ? 'bg-emerald-500/60'
                  : isActive
                    ? 'bg-gradient-to-r from-purple-500 to-cyan-400'
                    : 'bg-transparent',
              )}
              initial={{ width: 0 }}
              animate={{ width: isCompleted ? '100%' : isActive ? `${progress}%` : '0%' }}
              transition={{ duration: 0.6, ease: 'easeOut' as const }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Animated border glow wrapper ──
function GlowBorder({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {/* Animated gradient border */}
      <motion.div
        className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-purple-500/40 via-cyan-400/40 to-purple-500/40 blur-sm"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        style={{ backgroundSize: '200% 200%' }}
      />
      <div className="relative rounded-2xl bg-[#0A0A0A] p-6">{children}</div>
    </div>
  );
}

// ── Main Component ──
export default function GenerationScreen() {
  const stages = useAppStore((s) => s.generationStages);
  const isGenerating = useAppStore((s) => s.isGenerating);

  const getStageStatus = (stageId: string) => {
    const s = stages.find((st) => st.id === stageId);
    return s?.status ?? 'pending';
  };

  const activeIndex = stages.findIndex((s) => s.status === 'running');
  const allComplete = stages.length > 0 && stages.every((s) => s.status === 'completed');

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[60vh] w-full">
      <ParticleField />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10 z-10"
      >
        {allComplete ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">
              Generation Complete!
            </h2>
            <p className="text-gray-400 text-sm">Your video is ready to preview</p>
          </motion.div>
        ) : (
          <>
            <div className="w-14 h-14 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <Loader2 className="w-6 h-6 text-purple-400" />
              </motion.div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">Generating your video...</h2>
            <p className="text-gray-400 text-sm">This usually takes 8–15 minutes</p>
          </>
        )}
      </motion.div>

      {/* Stages card */}
      <motion.div
        className="w-full max-w-lg z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <GlowBorder>
          <div className="flex flex-col gap-4">
            {STAGE_DEFS.map((stage, i) => {
              const status = getStageStatus(stage.id);
              return (
                <StageRow
                  key={stage.id}
                  stage={stage}
                  isActive={status === 'running'}
                  isCompleted={status === 'completed'}
                  index={i}
                />
              );
            })}
          </div>
        </GlowBorder>
      </motion.div>

      {/* Estimated total */}
      <motion.p
        className="mt-6 text-xs text-gray-600 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        Estimated total: ~8–15 min
      </motion.p>
    </div>
  );
}
