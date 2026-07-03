'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, Maximize } from 'lucide-react';
import { cn, formatTime } from '@/lib/utils';

interface VideoPreviewProps {
  title?: string;
  duration?: number; // in seconds
  resolution?: string;
  className?: string;
}

export default function VideoPreview({
  title = 'Untitled Video',
  duration = 900, // 15 min default
  resolution = '1080p',
  className,
}: VideoPreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hideControlsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => {
      const next = !prev;
      if (next) {
        // Start progress simulation
        progressIntervalRef.current = setInterval(() => {
          setCurrentTime((t) => {
            if (t >= duration) {
              clearInterval(progressIntervalRef.current!);
              setIsPlaying(false);
              return 0;
            }
            return t + 1;
          });
        }, 1000);
      } else {
        // Pause
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
      }
      return next;
    });
  }, [duration]);

  const handleSeek = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const pct = (e.clientX - rect.left) / rect.width;
      const newTime = Math.round(pct * duration);
      setCurrentTime(newTime);
    },
    [duration],
  );

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleMouseEnter = () => {
    setShowControls(true);
    if (hideControlsTimerRef.current) clearTimeout(hideControlsTimerRef.current);
  };

  const handleMouseLeave = () => {
    if (isPlaying) {
      hideControlsTimerRef.current = setTimeout(() => setShowControls(false), 2000);
    }
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Video Player */}
      <div
        className="relative w-full aspect-video rounded-xl overflow-hidden bg-black group cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={togglePlay}
      >
        {/* Background gradient simulation */}
        <AnimatePresence mode="wait">
          {!isPlaying && (
            <motion.div
              key="paused"
              className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#111] to-[#0a0a1a]"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Decorative gradient blobs */}
              <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-purple-500/10 blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 rounded-full bg-cyan-500/10 blur-2xl" />
            </motion.div>
          )}
        </AnimatePresence>

        {isPlaying && (
          <motion.div
            key="playing"
            className="absolute inset-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Simulated video gradient that shifts */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-cyan-900/30 to-indigo-900/40"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundSize: '200% 200%' }}
            />
            {/* Fake "scene" bars */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ opacity: [0.05, 0.12, 0.05] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' as const }}
            >
              <div className="text-white/10 text-6xl font-bold select-none">VIDORA</div>
            </motion.div>
          </motion.div>
        )}

        {/* Placeholder text when paused */}
        {!isPlaying && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-gray-500 text-sm font-medium mb-2">Video Preview</p>
            <p className="text-gray-700 text-xs">{formatTime(duration)}</p>
          </div>
        )}

        {/* Play button overlay */}
        {!isPlaying && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
              <Play className="w-7 h-7 text-white ml-1" />
            </div>
          </motion.div>
        )}

        {/* Pause overlay */}
        {isPlaying && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            initial={false}
          >
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center">
              <Pause className="w-7 h-7 text-white" />
            </div>
          </motion.div>
        )}

        {/* Controls bar */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-8 bg-gradient-to-t from-black/70 to-transparent"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Progress bar */}
              <div
                className="w-full h-1 bg-white/20 rounded-full mb-3 cursor-pointer group/progress hover:h-1.5 transition-all"
                onClick={handleSeek}
              >
                <div
                  className="h-full bg-purple-500 rounded-full relative transition-all"
                  style={{ width: `${progressPercent}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity shadow-md" />
                </div>
              </div>

              {/* Controls row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay();
                    }}
                    className="text-white hover:text-purple-400 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                  </button>

                  {/* Volume */}
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  {/* Time */}
                  <span className="text-xs text-white/70 tabular-nums select-none">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                {/* Fullscreen */}
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Video info */}
      <div className="mt-3 flex items-center justify-between">
        <div>
          <h3 className="text-white font-semibold text-sm">{title}</h3>
          <p className="text-gray-500 text-xs mt-0.5">{formatTime(duration)}</p>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400 font-medium">
          {resolution}
        </span>
      </div>
    </div>
  );
}
