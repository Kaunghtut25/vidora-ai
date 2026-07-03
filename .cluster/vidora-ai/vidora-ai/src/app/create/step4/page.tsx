'use client';

import { useState } from 'react';
import Link from 'next/link';

interface TranscriptParagraph {
  id: number;
  speaker: string;
  text: string;
  timestamp: string;
}

const initialTranscript: TranscriptParagraph[] = [
  {
    id: 1,
    speaker: 'Narrator',
    text: 'In the year 2025, artificial intelligence reached a turning point that would reshape how we create and consume content forever.',
    timestamp: '00:00',
  },
  {
    id: 2,
    speaker: 'Narrator',
    text: 'What once took weeks of scripting, recording, and editing could now be accomplished in minutes, thanks to breakthroughs in generative AI.',
    timestamp: '00:08',
  },
  {
    id: 3,
    speaker: 'Expert',
    text: 'The key innovation wasn&apos;t just speed — it was the ability to maintain creative quality while scaling production to meet demand.',
    timestamp: '00:18',
  },
  {
    id: 4,
    speaker: 'Narrator',
    text: 'Creators around the world began adopting these tools, transforming their workflows and unlocking new possibilities.',
    timestamp: '00:28',
  },
  {
    id: 5,
    speaker: 'Narrator',
    text: 'From short-form social content to long-form documentaries, AI became the co-pilot for every step of the creative process.',
    timestamp: '00:38',
  },
];

const chapters = [
  { label: 'Intro', time: '0:00', pct: 0 },
  { label: 'Context', time: '0:08', pct: 12 },
  { label: 'Expert Insight', time: '0:18', pct: 28 },
  { label: 'Adoption', time: '0:28', pct: 48 },
  { label: 'Conclusion', time: '0:38', pct: 68 },
];

const exportOptions = [
  { label: 'MP4', icon: '🎥', desc: '1080p · H.264' },
  { label: 'YouTube', icon: '▶️', desc: 'Auto-upload ready' },
  { label: 'TikTok', icon: '🎵', desc: '9:16 vertical' },
  { label: 'Instagram', icon: '📸', desc: '1:1 square' },
];

const regenerateButtons = [
  { label: 'Voice', icon: '🎙️', desc: 'Change voiceover style' },
  { label: 'Visuals', icon: '🎨', desc: 'New B-roll & imagery' },
  { label: 'Length', icon: '📏', desc: 'Adjust video duration' },
  { label: 'Research', icon: '🔬', desc: 'Deepen content accuracy' },
];

export default function Step4Page() {
  const [transcript, setTranscript] = useState<TranscriptParagraph[]>(initialTranscript);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [exporting, setExporting] = useState(false);
  const [exportDone, setExportDone] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [regenerating, setRegenerating] = useState<string | null>(null);

  const updateParagraph = (id: number, newText: string) => {
    setTranscript((prev) =>
      prev.map((p) => (p.id === id ? { ...p, text: newText } : p))
    );
  };

  const handleExport = () => {
    if (!selectedFormat) return;
    setExporting(true);
    setExportDone(false);
    setTimeout(() => {
      setExporting(false);
      setExportDone(true);
    }, 2500);
  };

  const handleRegenerate = (label: string) => {
    setRegenerating(label);
    setTimeout(() => setRegenerating(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Top Bar */}
      <div className="border-b border-gray-800/60 px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-indigo-400 font-medium">Step 4 of 4</p>
          <h1 className="text-xl font-bold">Preview & Edit</h1>
        </div>
        <Link
          href="/dashboard"
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 p-6 max-w-7xl mx-auto">
        {/* Main Column */}
        <div className="flex-1 space-y-6">
          {/* Video Player */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-900/40 via-purple-900/30 to-pink-900/30 border border-gray-800/60 group cursor-pointer"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {/* Animated background */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-600/30 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                {isPlaying ? (
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="5" width="4" height="14" rx="1" />
                    <rect x="14" y="5" width="4" height="14" rx="1" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </div>
            </div>

            {/* Duration badge */}
            <div className="absolute bottom-4 right-4 px-2.5 py-1 rounded-md bg-black/50 backdrop-blur-sm text-xs text-gray-300 font-mono">
              00:48
            </div>

            {/* Title overlay */}
            <div className="absolute bottom-4 left-4">
              <p className="text-sm font-medium text-white/90">The AI Content Revolution</p>
              <p className="text-xs text-white/50">Generated by Vidora AI</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="rounded-xl border border-gray-800/60 bg-gray-900/30 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Timeline</span>
              <span className="text-xs text-gray-600">00:00 — 00:48</span>
            </div>
            <div className="relative h-10 rounded-lg bg-gray-800/40 overflow-hidden">
              {/* Progress fill */}
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-600/30 to-purple-600/30"
                style={{ width: `${activeChapter >= 0 ? ((activeChapter + 1) / chapters.length) * 100 : 0}%` }}
              />
              {/* Chapter markers */}
              {chapters.map((ch, i) => (
                <button
                  key={i}
                  onClick={() => setActiveChapter(i)}
                  className="absolute top-0 bottom-0 flex flex-col items-center justify-center group"
                  style={{ left: `${ch.pct}%` }}
                >
                  <div className={`w-0.5 h-full ${activeChapter === i ? 'bg-indigo-400' : 'bg-gray-600'}`} />
                  <span
                    className={`absolute -top-0.5 text-[10px] whitespace-nowrap px-1.5 py-0.5 rounded transition-colors ${
                      activeChapter === i ? 'text-indigo-300 font-medium' : 'text-gray-500 group-hover:text-gray-300'
                    }`}
                  >
                    {ch.label}
                  </span>
                  <span className="absolute bottom-0.5 text-[9px] text-gray-600 font-mono">{ch.time}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Transcript Editor */}
          <div className="rounded-xl border border-gray-800/60 bg-gray-900/30">
            <div className="px-4 py-3 border-b border-gray-800/60 flex items-center justify-between">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Transcript Editor</span>
              <span className="text-xs text-gray-600">{transcript.length} segments</span>
            </div>
            <div className="max-h-[360px] overflow-y-auto p-4 space-y-3 scrollbar-thin">
              {transcript.map((para) => (
                <div
                  key={para.id}
                  className="rounded-lg bg-gray-800/30 border border-gray-800/40 p-3 hover:border-gray-700/60 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-500/15 text-indigo-300 text-[11px] font-medium">
                      {para.speaker}
                    </span>
                    <span className="text-[11px] text-gray-600 font-mono">{para.timestamp}</span>
                  </div>
                  <textarea
                    value={para.text}
                    onChange={(e) => updateParagraph(para.id, e.target.value)}
                    rows={2}
                    className="w-full bg-transparent text-sm text-gray-200 resize-none focus:outline-none focus:text-white transition-colors leading-relaxed"
                    spellCheck={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:w-80 space-y-6">
          {/* Regenerate */}
          <div className="rounded-xl border border-gray-800/60 bg-gray-900/30 p-4">
            <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">Regenerate</h3>
            <div className="space-y-2">
              {regenerateButtons.map((btn) => (
                <button
                  key={btn.label}
                  onClick={() => handleRegenerate(btn.label)}
                  disabled={regenerating !== null}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border border-gray-800/50 bg-gray-800/20 hover:border-indigo-500/40 hover:bg-indigo-500/5 transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <span className="text-lg">{btn.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                      {btn.label}
                    </p>
                    <p className="text-[11px] text-gray-600 truncate">{btn.desc}</p>
                  </div>
                  {regenerating === btn.label ? (
                    <svg className="w-4 h-4 text-indigo-400 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-gray-600 group-hover:text-indigo-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Export */}
          <div className="rounded-xl border border-gray-800/60 bg-gray-900/30 p-4">
            <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">Export Options</h3>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {exportOptions.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => {
                    setSelectedFormat(opt.label);
                    setExportDone(false);
                  }}
                  className={`flex flex-col items-center gap-1 p-3 rounded-lg border transition-all ${
                    selectedFormat === opt.label
                      ? 'border-indigo-500/60 bg-indigo-500/10'
                      : 'border-gray-800/50 bg-gray-800/20 hover:border-gray-700/60'
                  }`}
                >
                  <span className="text-xl">{opt.icon}</span>
                  <span className={`text-xs font-medium ${selectedFormat === opt.label ? 'text-indigo-300' : 'text-gray-300'}`}>
                    {opt.label}
                  </span>
                  <span className="text-[10px] text-gray-600">{opt.desc}</span>
                </button>
              ))}
            </div>

            <button
              onClick={handleExport}
              disabled={!selectedFormat || exporting}
              className={`w-full py-2.5 rounded-lg font-medium text-sm transition-all ${
                !selectedFormat
                  ? 'bg-gray-800/40 text-gray-600 cursor-not-allowed'
                  : exporting
                  ? 'bg-indigo-600/50 text-white/70 cursor-wait'
                  : exportDone
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/20'
              }`}
            >
              {!selectedFormat
                ? 'Select a format'
                : exporting
                ? 'Exporting...'
                : exportDone
                ? `✓ Exported as ${selectedFormat}`
                : `Export Video${selectedFormat ? ` (${selectedFormat})` : ''}`}
            </button>

            {exportDone && (
              <p className="text-[11px] text-emerald-400/70 text-center mt-2 animate-in fade-in">
                Your video is ready to download
              </p>
            )}
          </div>

          {/* Navigation */}
          <div className="flex gap-3">
            <Link
              href="/create/step3"
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors text-sm font-medium text-center"
            >
              ← Back
            </Link>
            <Link
              href="/dashboard"
              className="flex-1 px-4 py-2.5 rounded-lg bg-white/5 border border-gray-800 text-gray-300 hover:bg-white/10 transition-colors text-sm font-medium text-center"
            >
              Finish
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
