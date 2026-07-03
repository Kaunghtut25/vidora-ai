'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';
import type { Chapter } from '@/types';

interface EditorTimelineProps {
  chapters: Chapter[];
  currentTime: number; // in seconds
  duration: number; // in seconds (total video length)
  onTimeChange: (time: number) => void;
}

const CHAPTER_COLORS = [
  'bg-[#8B5CF6]',   // purple
  'bg-[#06B6D4]',   // cyan
  'bg-[#10B981]',   // emerald
  'bg-[#F59E0B]',   // amber
  'bg-[#EF4444]',   // red
  'bg-[#EC4899]',   // pink
  'bg-[#6366F1]',   // indigo
  'bg-[#14B8A6]',   // teal
];

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function EditorTimeline({
  chapters,
  currentTime,
  duration,
  onTimeChange,
}: EditorTimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  const pixelsPerSecond = 10 * zoom;
  const totalWidth = Math.max(duration * pixelsPerSecond, 800);

  // Auto-scroll to keep playhead visible
  useEffect(() => {
    if (scrollRef.current) {
      const playheadX = currentTime * pixelsPerSecond;
      const viewport = scrollRef.current;
      const halfWidth = viewport.clientWidth / 2;
      if (playheadX > viewport.scrollLeft + halfWidth + 100 || playheadX < viewport.scrollLeft) {
        viewport.scrollLeft = playheadX - halfWidth;
      }
    }
  }, [currentTime, pixelsPerSecond]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setIsDragging(true);
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left + (scrollRef.current?.scrollLeft ?? 0);
      const time = Math.max(0, Math.min(duration, x / pixelsPerSecond));
      onTimeChange(time);
    },
    [duration, pixelsPerSecond, onTimeChange],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left + (scrollRef.current?.scrollLeft ?? 0);
      const time = Math.max(0, Math.min(duration, x / pixelsPerSecond));
      onTimeChange(time);
    },
    [isDragging, duration, pixelsPerSecond, onTimeChange],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const zoomIn = () => setZoom((z) => Math.min(z + 0.25, 4));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5));

  // Generate time ruler marks
  const rulerInterval = zoom >= 2 ? 5 : zoom >= 1 ? 10 : 30; // seconds between marks
  const rulerMarks: number[] = [];
  for (let t = 0; t <= duration; t += rulerInterval) {
    rulerMarks.push(t);
  }

  const playheadX = currentTime * pixelsPerSecond;

  return (
    <div className="glass border-t border-white/5 h-24 flex flex-col shrink-0">
      {/* ── Zoom controls & time display ── */}
      <div className="flex items-center justify-between px-4 h-7 border-b border-white/5">
        <span className="text-[10px] text-white/40 font-mono">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={zoomOut}
            className="p-0.5 text-white/40 hover:text-white transition-colors"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10px] text-white/30 w-8 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={zoomIn}
            className="p-0.5 text-white/40 hover:text-white transition-colors"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ── Scrollable timeline area ── */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-x-auto overflow-y-hidden relative cursor-pointer select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="relative h-full" style={{ width: totalWidth }}>
          {/* Time ruler */}
          <div className="absolute top-0 left-0 right-0 h-4 flex items-end border-b border-white/5">
            {rulerMarks.map((t) => (
              <div
                key={t}
                className="absolute bottom-0 flex flex-col items-center"
                style={{ left: t * pixelsPerSecond }}
              >
                <div className="w-px h-2 bg-white/20" />
                <span className="text-[9px] text-white/30 mt-0.5">
                  {formatTime(t)}
                </span>
              </div>
            ))}
          </div>

          {/* Chapter blocks */}
          <div className="absolute top-4 bottom-0 left-0 right-0 flex items-center px-1">
            {chapters.length > 0 ? (
              chapters.map((chapter, i) => {
                const left = chapter.startTime * pixelsPerSecond;
                const width = Math.max(
                  (chapter.endTime - chapter.startTime) * pixelsPerSecond,
                  40,
                );

                return (
                  <div
                    key={chapter.id}
                    className={`absolute h-10 rounded-md flex items-center px-2 overflow-hidden ${CHAPTER_COLORS[i % CHAPTER_COLORS.length]} opacity-80 hover:opacity-100 transition-opacity cursor-pointer`}
                    style={{ left, width }}
                    title={`${chapter.title} (${formatTime(chapter.startTime)} – ${formatTime(chapter.endTime)})`}
                  >
                    <span className="text-[10px] font-medium text-white truncate">
                      {chapter.title}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="w-full h-10 rounded-md bg-white/[0.03] border border-white/5 flex items-center justify-center">
                <span className="text-[10px] text-white/20">
                  No chapters yet — chapters appear after script generation
                </span>
              </div>
            )}
          </div>

          {/* Playhead */}
          <div
            className="absolute top-0 bottom-0 z-20 pointer-events-none"
            style={{ left: playheadX }}
          >
            {/* Triangle handle */}
            <div className="absolute top-0 -translate-x-1/2">
              <div
                className="w-0 h-0"
                style={{
                  borderLeft: '5px solid transparent',
                  borderRight: '5px solid transparent',
                  borderTop: '7px solid #8B5CF6',
                }}
              />
            </div>
            {/* Vertical line */}
            <div className="absolute top-1.5 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#8B5CF6] via-[#A78BFA] to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
