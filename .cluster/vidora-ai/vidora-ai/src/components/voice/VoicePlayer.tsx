'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Play, Pause, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VoicePlayerProps {
  voiceId: string;
}

type PlayerState = 'idle' | 'loading' | 'playing';

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function getBarHeights(voiceId: string): number[] {
  let hash = 0;
  for (let i = 0; i < voiceId.length; i++) {
    hash = ((hash << 5) - hash) + voiceId.charCodeAt(i);
    hash |= 0;
  }
  const rand = seededRandom(Math.abs(hash));
  return Array.from({ length: 5 }, () => 0.4 + rand() * 0.6);
}

export default function VoicePlayer({ voiceId }: VoicePlayerProps) {
  const [state, setState] = useState<PlayerState>('idle');
  const [barHeights] = useState<number[]>(() => getBarHeights(voiceId));
  const [animFrame, setAnimFrame] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const frameRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);

  const stopPlayback = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  }, []);

  const animateBars = useCallback(() => {
    setAnimFrame((prev) => (prev + 1) % 60);
    frameRef.current = requestAnimationFrame(animateBars);
  }, []);

  const handleToggle = useCallback(() => {
    if (state === 'playing') {
      stopPlayback();
      setState('idle');
      return;
    }

    setState('loading');

    // Simulate loading delay
    timerRef.current = setTimeout(() => {
      setState('playing');
      animateBars();

      // Auto-stop after 4 seconds
      timerRef.current = setTimeout(() => {
        stopPlayback();
        setState('idle');
      }, 4000);
    }, 600);
  }, [state, stopPlayback, animateBars]);

  useEffect(() => {
    return () => {
      stopPlayback();
    };
  }, [stopPlayback, voiceId]);

  const isPlaying = state === 'playing';
  const isLoading = state === 'loading';

  return (
    <button
      onClick={handleToggle}
      className={cn(
        'flex items-center gap-3 glass rounded-xl p-3 transition-all duration-300',
        'hover:bg-white/10 active:scale-[0.98]',
        'cursor-pointer select-none',
      )}
      aria-label={isPlaying ? 'Stop preview' : 'Preview voice'}
    >
      {/* Play/Pause Button */}
      <div
        className={cn(
          'w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300',
          isPlaying
            ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
            : 'bg-white/10 text-white/90 hover:bg-white/20',
        )}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : isPlaying ? (
          <Pause className="w-4 h-4" />
        ) : (
          <Play className="w-4 h-4 ml-0.5" />
        )}
      </div>

      {/* Waveform Bars */}
      <div className="flex items-center gap-[3px] h-8">
        {barHeights.map((baseHeight, i) => {
          const phase = (animFrame * 0.15 + i * 0.7) % (Math.PI * 2);
          const animatedHeight = isPlaying
            ? baseHeight * (0.5 + 0.5 * Math.abs(Math.sin(phase)))
            : baseHeight * 0.4;

          return (
            <div
              key={i}
              className={cn(
                'w-1 rounded-full transition-[height,background-color] duration-150',
                isPlaying
                  ? 'bg-purple-400 shadow-[0_0_6px_rgba(168,85,247,0.4)]'
                  : 'bg-white/30',
              )}
              style={{ height: `${animatedHeight * 32}px` }}
            />
          );
        })}
      </div>

      {/* Label */}
      <span className="text-xs text-white/70 font-medium">
        {isLoading ? 'Loading…' : isPlaying ? 'Stop preview' : 'Preview voice'}
      </span>
    </button>
  );
}
