'use client';

import { useCallback } from 'react';
import { Gauge, Smile, ArrowUp, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { VoiceSettings, VoiceEmotion } from '@/types';
import { emotions } from '@/data/voices';

interface VoiceControlsProps {
  voiceSettings: VoiceSettings;
  onChange: (settings: VoiceSettings) => void;
}

const emotionIcons: Record<VoiceEmotion, string> = {
  Neutral: '😐',
  Professional: '💼',
  Friendly: '😊',
  Excited: '🎉',
  Calm: '😌',
};

export default function VoiceControls({ voiceSettings, onChange }: VoiceControlsProps) {
  const update = useCallback(
    (patch: Partial<VoiceSettings>) => {
      onChange({ ...voiceSettings, ...patch });
    },
    [voiceSettings, onChange],
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Speed Control */}
      <div className="glass border border-white/5 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Gauge className="w-4 h-4 text-purple-400" />
          <label className="text-sm font-medium text-white/90">Speed</label>
          <span className="ml-auto text-sm font-mono text-purple-400 tabular-nums">
            {voiceSettings.speed.toFixed(1)}×
          </span>
        </div>
        <input
          type="range"
          min={0.8}
          max={1.4}
          step={0.1}
          value={voiceSettings.speed}
          onChange={(e) => update({ speed: parseFloat(e.target.value) })}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer
            bg-white/10 accent-purple-500
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-purple-500 [&::-webkit-slider-thumb]:shadow-lg
            [&::-webkit-slider-thumb]:shadow-purple-500/30 [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125"
          aria-label="Voice speed"
        />
        <div className="flex justify-between mt-1.5">
          <span className="text-[10px] text-white/40 tabular-nums">0.8×</span>
          <span className="text-[10px] text-white/40 tabular-nums">1.4×</span>
        </div>
      </div>

      {/* Emotion Selector */}
      <div className="glass border border-white/5 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Smile className="w-4 h-4 text-purple-400" />
          <label className="text-sm font-medium text-white/90">Emotion</label>
        </div>
        <div className="flex flex-wrap gap-2">
          {(emotions as unknown as VoiceEmotion[]).map((emotion) => {
            const isActive = voiceSettings.emotion === emotion;
            return (
              <button
                key={emotion}
                onClick={() => update({ emotion })}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200',
                  'border focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500',
                  isActive
                    ? 'bg-purple-500/20 border-purple-500/50 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.2)]'
                    : 'border-white/10 text-white/60 hover:border-white/20 hover:text-white/80 hover:bg-white/5',
                )}
              >
                <span className="mr-1">{emotionIcons[emotion]}</span>
                {emotion}
              </button>
            );
          })}
        </div>
      </div>

      {/* Pitch Control */}
      <div className="glass border border-white/5 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <ArrowUp className="w-4 h-4 text-purple-400" />
          <label className="text-sm font-medium text-white/90">Pitch</label>
          <span className="ml-auto text-sm font-mono text-purple-400 tabular-nums">
            {voiceSettings.pitch > 0 ? '+' : ''}{voiceSettings.pitch}
          </span>
        </div>
        <input
          type="range"
          min={-10}
          max={10}
          step={1}
          value={voiceSettings.pitch}
          onChange={(e) => update({ pitch: parseInt(e.target.value, 10) })}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer
            bg-white/10 accent-purple-500
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-purple-500 [&::-webkit-slider-thumb]:shadow-lg
            [&::-webkit-slider-thumb]:shadow-purple-500/30 [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125"
          aria-label="Voice pitch"
        />
        <div className="flex justify-between mt-1.5">
          <span className="text-[10px] text-white/40 tabular-nums">-10</span>
          <span className="text-[10px] text-white/40 tabular-nums">0</span>
          <span className="text-[10px] text-white/40 tabular-nums">+10</span>
        </div>
      </div>

      {/* Voice Cloning (Premium) */}
      <div className="rounded-xl p-4 border border-dashed border-purple-500/30 bg-purple-500/[0.02]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Upload className="w-4 h-4 text-purple-400" />
            <label className="text-sm font-medium text-white/90">
              Voice Cloning
            </label>
          </div>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
            Coming Soon
          </span>
        </div>
        <p className="text-xs text-gray-500 mb-3 leading-relaxed">
          Upload a 30-second sample of your voice and we&apos;ll clone it for
          your videos. Available on Pro &amp; Enterprise plans.
        </p>
        <button
          disabled
          className="w-full py-2 rounded-lg bg-white/5 border border-white/10
            text-white/30 text-sm font-medium cursor-not-allowed
            flex items-center justify-center gap-2"
        >
          <Upload className="w-3.5 h-3.5" />
          Upload Voice Sample
        </button>
      </div>
    </div>
  );
}
