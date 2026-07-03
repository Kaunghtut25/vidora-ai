'use client';

import { motion } from 'framer-motion';
import { Palette, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { VideoStyle } from '@/types';

interface StyleLanguageSelectorProps {
  style: VideoStyle;
  onStyleChange: (style: VideoStyle) => void;
  language: 'English' | 'Burmese' | 'Bilingual';
  onLanguageChange: (lang: 'English' | 'Burmese' | 'Bilingual') => void;
}

const stylePills: { id: VideoStyle; label: string; description: string }[] = [
  { id: 'Educational', label: 'Educational', description: 'Informative, clear, structured lessons' },
  { id: 'Storytelling', label: 'Storytelling', description: 'Narrative-driven, emotional, engaging' },
  { id: 'Corporate', label: 'Corporate', description: 'Professional, polished, business tone' },
  { id: 'Vlog', label: 'Vlog', description: 'Casual, conversational, personality-driven' },
  { id: 'Sales', label: 'Sales', description: 'Persuasive, compelling, conversion-focused' },
];

const languageOptions: { id: 'English' | 'Burmese' | 'Bilingual'; emoji: string; label: string; description: string }[] = [
  { id: 'English', emoji: '🇬🇧', label: 'English', description: 'Global audience, Western & Asian accents' },
  { id: 'Burmese', emoji: '🇲🇲', label: 'Burmese', description: 'Native Burmese — Arena AI Agent Mod' },
  { id: 'Bilingual', emoji: '🌐', label: 'Bilingual', description: 'Mix English & Burmese in one video' },
];

export default function StyleLanguageSelector({ style, onStyleChange, language, onLanguageChange }: StyleLanguageSelectorProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Style */}
      <div>
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center">
            <Palette size={16} className="text-purple-400" />
          </div>
          <h2 className="text-lg font-semibold text-white">Video Style</h2>
        </div>
        <div className="space-y-2">
          {stylePills.map((s) => (
            <motion.button
              key={s.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => onStyleChange(s.id)}
              className={cn(
                'w-full p-4 rounded-xl border text-left transition-all duration-200',
                style === s.id
                  ? 'border-purple-500/40 bg-purple-500/10'
                  : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.05]'
              )}
            >
              <div className="text-sm font-semibold text-white">{s.label}</div>
              <div className="text-xs text-gray-400 mt-0.5">{s.description}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Language */}
      <div>
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/15 flex items-center justify-center">
            <Globe size={16} className="text-cyan-400" />
          </div>
          <h2 className="text-lg font-semibold text-white">Language</h2>
        </div>
        <div className="space-y-2">
          {languageOptions.map((l) => (
            <motion.button
              key={l.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => onLanguageChange(l.id)}
              className={cn(
                'w-full p-4 rounded-xl border text-left transition-all duration-200',
                language === l.id
                  ? 'border-cyan-500/40 bg-cyan-500/10'
                  : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.05]'
              )}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{l.emoji}</span>
                <span className="text-sm font-semibold text-white">{l.label}</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">{l.description}</div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
