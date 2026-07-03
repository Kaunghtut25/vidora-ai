'use client';

import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { VideoLength } from '@/types';

interface VideoLengthSelectorProps {
  selected: VideoLength;
  onSelect: (length: VideoLength) => void;
}

const presetLengths: { value: VideoLength; label: string }[] = [
  { value: 10, label: '10 min' },
  { value: 15, label: '15 min' },
  { value: 20, label: '20 min' },
  { value: 30, label: '30 min' },
  { value: 50, label: '50+ min' },
];

const sliderMarks = [5, 10, 15, 20, 25, 30, 40, 50, 60];

export default function VideoLengthSelector({
  selected,
  onSelect,
}: VideoLengthSelectorProps) {
  const isCustom = !presetLengths.some((p) => p.value === selected);

  const formatLabel = (value: number) => {
    if (value >= 50) return '50+ min';
    return `${value} min`;
  };

  return (
    <div className="w-full space-y-6">
      {/* Preset Pills */}
      <div className="flex flex-wrap gap-2.5">
        {presetLengths.map((opt) => {
          const active = selected === opt.value && !isCustom;

          return (
            <button
              key={opt.value}
              onClick={() => onSelect(opt.value)}
              className={cn(
                'relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
                active
                  ? 'bg-purple-600 text-white shadow-[0_0_16px_rgba(139,92,246,0.35)]'
                  : 'glass text-gray-400 hover:text-white hover:bg-white/5',
              )}
            >
              {opt.label}
              {active && (
                <motion.div
                  layoutId="activeLengthPill"
                  className="absolute inset-0 bg-purple-600 rounded-xl -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Custom Length Slider */}
      <div className="p-5 rounded-xl glass space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center">
              <Clock size={16} className="text-purple-400" />
            </div>
            <span className="text-sm text-gray-400 font-medium">Custom length</span>
          </div>
          <span className="text-lg font-bold text-white tabular-nums">
            {formatLabel(selected)}
          </span>
        </div>

        {/* Range Slider */}
        <div className="relative">
          <input
            type="range"
            min={5}
            max={60}
            step={1}
            value={selected > 50 ? 50 : selected}
            onChange={(e) => {
              const val = Number(e.target.value);
              onSelect(val >= 50 ? 50 : val as VideoLength);
            }}
            className={cn(
              'w-full h-2 rounded-full appearance-none cursor-pointer',
              'bg-white/10 accent-purple-600',
              '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500 [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(139,92,246,0.5)] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white',
              '[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-purple-500 [&::-moz-range-thumb]:shadow-[0_0_12px_rgba(139,92,246,0.5)] [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white',
            )}
            style={{
              background: `linear-gradient(to right, #8B5CF6 0%, #8B5CF6 ${((selected > 50 ? 50 : selected) - 5) / 55 * 100}%, rgba(255,255,255,0.1) ${((selected > 50 ? 50 : selected) - 5) / 55 * 100}%, rgba(255,255,255,0.1) 100%)`,
            }}
          />

          {/* Tick Marks */}
          <div className="flex justify-between mt-2 px-0.5">
            {sliderMarks.map((mark) => (
              <button
                key={mark}
                onClick={() => onSelect(mark >= 50 ? 50 : mark as VideoLength)}
                className="text-[10px] text-gray-600 hover:text-gray-400 transition-colors focus:outline-none"
              >
                {mark >= 50 ? '50+' : mark}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
