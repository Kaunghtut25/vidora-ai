'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { voices } from '@/data/voices';
import type { Voice } from '@/types';
import VoicePlayer from '@/components/voice/VoicePlayer';

interface VoiceSelectorGridProps {
  selectedId: string;
  onSelect: (voice: Voice) => void;
}

const englishVoices = voices.filter((v) => v.language === 'English');

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
};

const badgeColors: Record<string, string> = {
  English: 'bg-blue-500/15 text-blue-300 border-blue-500/20',
};

function VoiceCard({
  voice,
  isSelected,
  onSelect,
  index,
}: {
  voice: Voice;
  isSelected: boolean;
  onSelect: (voice: Voice) => void;
  index: number;
}) {
  const badgeColor = badgeColors[voice.language] ?? badgeColors.English;

  return (
    <motion.button
      variants={cardVariants}
      onClick={() => onSelect(voice)}
      className={cn(
        'text-left w-full rounded-xl p-4 border transition-all duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
        isSelected
          ? 'border-purple-500 bg-purple-500/5 ring-1 ring-purple-500/50'
          : 'border-white/5 glass hover:border-white/10 hover:bg-white/[0.03]',
      )}
    >
      {/* Header: Avatar + Name + Badge */}
      <div className="flex items-center gap-3 mb-2">
        <div className="text-2xl leading-none select-none">{voice.avatar}</div>
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-semibold text-sm truncate">
            {voice.name}
          </h4>
          <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
            <span
              className={cn(
                'text-[10px] px-1.5 py-0.5 rounded-full border font-medium',
                badgeColor,
              )}
            >
              {voice.region}
            </span>
            <span
              className={cn(
                'text-[10px] px-1.5 py-0.5 rounded-full border font-medium',
                badgeColor,
              )}
            >
              {voice.language}
            </span>
          </div>
        </div>
        {isSelected && (
          <div className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0 shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
        )}
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed mb-3 line-clamp-1">
        {voice.description}
      </p>

      {/* Voice Preview Player */}
      <VoicePlayer voiceId={voice.id} />
    </motion.button>
  );
}

function VoiceGroup({
  title,
  voicesList,
  selectedId,
  onSelect,
  startIndex,
}: {
  title: string;
  voicesList: Voice[];
  selectedId: string;
  onSelect: (voice: Voice) => void;
  startIndex: number;
}) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-white/90 mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {voicesList.map((voice, i) => (
          <VoiceCard
            key={voice.id}
            voice={voice}
            isSelected={selectedId === voice.id}
            onSelect={onSelect}
            index={startIndex + i}
          />
        ))}
      </div>
    </div>
  );
}

export default function VoiceSelectorGrid({
  selectedId,
  onSelect,
}: VoiceSelectorGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      {/* Section Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-1">
          Choose Your Voice
        </h2>
        <p className="text-gray-400 text-sm">
          20 English premium AI voices
        </p>
      </div>

      {/* English Voices */}
      <VoiceGroup
        title="🇬🇧 English Voices"
        voicesList={englishVoices}
        selectedId={selectedId}
        onSelect={onSelect}
        startIndex={0}
      />
    </motion.div>
  );
}
