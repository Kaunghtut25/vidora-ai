'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: { height: 'h-1.5', text: 'text-xs' },
  md: { height: 'h-2', text: 'text-sm' },
  lg: { height: 'h-3', text: 'text-sm' },
} as const;

export function ProgressBar({
  value,
  label,
  showPercentage = false,
  size = 'md',
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const { height, text } = sizeMap[size];

  return (
    <div className="w-full">
      {/* Label + Percentage */}
      {(label || showPercentage) && (
        <div className="mb-1.5 flex items-center justify-between">
          {label && (
            <span className={`${text} font-medium text-gray-300`}>{label}</span>
          )}
          {showPercentage && (
            <span className={`${text} tabular-nums text-gray-500`}>
              {Math.round(clamped)}%
            </span>
          )}
        </div>
      )}

      {/* Track */}
      <div
        className={`w-full overflow-hidden rounded-full bg-white/[0.06] ring-1 ring-white/5 backdrop-blur-sm ${height}`}
      >
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r from-purple-600 to-cyan-400`}
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' as const }}
        />
      </div>
    </div>
  );
}
