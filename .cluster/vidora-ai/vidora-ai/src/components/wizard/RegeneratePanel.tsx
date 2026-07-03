'use client';

import { motion } from 'framer-motion';
import { Mic, Image, Clock, Search, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RegenerateOption {
  id: string;
  icon: React.ElementType;
  label: string;
  description: string;
}

const REGENERATE_OPTIONS: RegenerateOption[] = [
  {
    id: 'voice',
    icon: Mic,
    label: 'Regenerate Voice',
    description: 'Try a different voice or emotion',
  },
  {
    id: 'visuals',
    icon: Image,
    label: 'Regenerate Visuals',
    description: 'Refresh B-roll and footage',
  },
  {
    id: 'length',
    icon: Clock,
    label: 'Adjust Length',
    description: 'Make it shorter or longer',
  },
  {
    id: 'research',
    icon: Search,
    label: 'Deep Research Again',
    description: 'Re-research with new sources',
  },
];

interface RegeneratePanelProps {
  onRegenerate?: (optionId: string) => void;
  onExport?: () => void;
  className?: string;
}

function RegenerateCard({
  option,
  onClick,
  index,
}: {
  option: RegenerateOption;
  onClick?: (id: string) => void;
  index: number;
}) {
  const Icon = option.icon;

  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.35, ease: 'easeOut' as const }}
      onClick={() => onClick?.(option.id)}
      className={cn(
        'group text-left w-full rounded-xl p-4 border transition-all duration-200',
        'glass hover:border-purple-500/40 hover:bg-purple-500/[0.04]',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
      )}
    >
      {/* Icon */}
      <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center mb-3 group-hover:bg-purple-500/10 group-hover:border-purple-500/20 transition-colors">
        <Icon className="w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors" />
      </div>

      {/* Label */}
      <h4 className="text-sm font-semibold text-white mb-0.5 group-hover:text-purple-300 transition-colors">
        {option.label}
      </h4>

      {/* Description */}
      <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors leading-relaxed">
        {option.description}
      </p>
    </motion.button>
  );
}

export default function RegeneratePanel({
  onRegenerate,
  onExport,
  className,
}: RegeneratePanelProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      {/* Section header */}
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-white/80">Regenerate Options</h3>
        <p className="text-xs text-gray-500 mt-0.5">
          Refine any part of your video
        </p>
      </div>

      {/* Regenerate grid 2x2 */}
      <div className="grid grid-cols-2 gap-3">
        {REGENERATE_OPTIONS.map((option, i) => (
          <RegenerateCard
            key={option.id}
            option={option}
            onClick={onRegenerate}
            index={i}
          />
        ))}
      </div>

      {/* Export CTA */}
      <motion.button
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.35, ease: 'easeOut' as const }}
        onClick={onExport}
        className={cn(
          'mt-5 w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl',
          'bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400',
          'text-white font-semibold text-sm transition-all duration-200',
          'shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40',
          'active:scale-[0.98]',
        )}
      >
        <Download className="w-4 h-4" />
        Export Video
      </motion.button>
    </div>
  );
}
