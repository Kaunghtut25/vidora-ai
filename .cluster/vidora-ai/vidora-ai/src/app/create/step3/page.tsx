'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const stages = [
  { icon: '🔍', label: 'Researching content...', range: [0, 20] },
  { icon: '🧠', label: 'Expanding script with deep thinking...', range: [20, 40] },
  { icon: '🎙️', label: 'Generating voiceover...', range: [40, 60] },
  { icon: '🎬', label: 'Creating visuals & B-roll...', range: [60, 80] },
  { icon: '✨', label: 'Editing & polishing...', range: [80, 100] },
];

export default function Step3Page() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setIsComplete(true);
          return 100;
        }
        // Advance ~1% every 180ms → ~18s total (feels like a quick demo)
        // In production this would be tied to real API progress
        return Math.min(prev + 1, 100);
      });
    }, 180);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const currentStageIndex = Math.min(
    stages.findIndex((s) => progress < s.range[1]),
    stages.length - 1
  );

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - (progress / 100) * circumference;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col items-center justify-center px-6 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-sm font-medium text-indigo-400 mb-2">Step 3 of 4</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">AI Generation</h1>
        <p className="text-gray-500 mt-3 text-sm md:text-base">
          Estimated time: ~3 minutes
        </p>
      </div>

      {/* Circular Progress */}
      <div className="relative mb-12">
        <svg width="200" height="200" className="transform -rotate-90">
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="#1e1e2e"
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="url(#gradient)"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeOffset}
            className="transition-all duration-300 ease-out"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold tabular-nums">{progress}%</span>
          <span className="text-xs text-gray-500 mt-1">
            {isComplete ? 'Done!' : 'Generating...'}
          </span>
        </div>
      </div>

      {/* Stage List */}
      <div className="w-full max-w-md space-y-3 mb-10">
        {stages.map((stage, index) => {
          const isDone = progress >= stage.range[1];
          const isActive = index === currentStageIndex && !isDone;
          const stageProgress = isDone
            ? 100
            : isActive
            ? Math.min(
                Math.max(
                  ((progress - stage.range[0]) / (stage.range[1] - stage.range[0])) * 100,
                  0
                ),
                100
              )
            : 0;

          return (
            <div
              key={index}
              className={`rounded-xl border p-4 transition-all duration-300 ${
                isDone
                  ? 'border-emerald-500/30 bg-emerald-500/5'
                  : isActive
                  ? 'border-indigo-500/40 bg-indigo-500/5'
                  : 'border-gray-800/50 bg-gray-900/20'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-xl ${!isDone && !isActive ? 'grayscale opacity-40' : ''}`}>
                  {isDone ? '✅' : stage.icon}
                </span>
                <span
                  className={`text-sm font-medium flex-1 ${
                    isDone
                      ? 'text-emerald-400'
                      : isActive
                      ? 'text-white'
                      : 'text-gray-600'
                  }`}
                >
                  {stage.label}
                </span>
                {isDone && (
                  <svg
                    className="w-5 h-5 text-emerald-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {isActive && (
                  <span className="text-xs text-indigo-400 tabular-nums">
                    {Math.round(stageProgress)}%
                  </span>
                )}
              </div>
              {/* Mini progress bar */}
              <div className="h-1 rounded-full bg-gray-800 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isDone ? 'bg-emerald-500' : 'bg-gradient-to-r from-indigo-500 to-purple-500'
                  }`}
                  style={{ width: `${stageProgress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Link
          href="/create/step2"
          className="px-6 py-2.5 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors text-sm font-medium"
        >
          ← Back
        </Link>
        {isComplete && (
          <Link
            href="/create/step4"
            className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-500/25 animate-in fade-in duration-500"
          >
            Continue to Preview →
          </Link>
        )}
      </div>
    </div>
  );
}
