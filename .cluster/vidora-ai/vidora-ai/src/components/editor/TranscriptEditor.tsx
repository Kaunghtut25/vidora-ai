'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ChevronDown, RefreshCw, Plus } from 'lucide-react';
import { cn, formatTime } from '@/lib/utils';
import type { TranscriptLine, VoiceSettings } from '@/types';

// ── Demo transcript data ──
const DEMO_TRANSCRIPT: TranscriptLine[] = [
  { id: 't1', startTime: 0, endTime: 45, text: 'Welcome to this deep dive into the future of artificial intelligence and how it is transforming industries worldwide.', voice: 'Sophia', emphasis: false },
  { id: 't2', startTime: 45, endTime: 90, text: 'In the past decade, AI has moved from research labs into our daily lives, powering everything from search engines to autonomous vehicles.', voice: 'Sophia', emphasis: true },
  { id: 't3', startTime: 90, endTime: 140, text: "Let's start by understanding the three main pillars of modern AI: machine learning, natural language processing, and computer vision.", voice: 'Marcus', emphasis: false },
  { id: 't4', startTime: 140, endTime: 195, text: 'Machine learning allows systems to learn from data without being explicitly programmed. Think of it as teaching a computer through examples rather than rules.', voice: 'Marcus', emphasis: false },
  { id: 't5', startTime: 195, endTime: 250, text: 'Natural language processing, or NLP, enables machines to understand, interpret, and generate human language — this is the technology behind chatbots and translation tools.', voice: 'Sophia', emphasis: false },
  { id: 't6', startTime: 250, endTime: 310, text: 'Computer vision gives machines the ability to see and understand visual information from the world, powering facial recognition, medical imaging, and self-driving cars.', voice: 'Marcus', emphasis: true },
  { id: 't7', startTime: 310, endTime: 360, text: 'The convergence of these technologies is creating unprecedented opportunities across healthcare, finance, education, and beyond.', voice: 'Sophia', emphasis: false },
  { id: 't8', startTime: 360, endTime: 420, text: 'However, with great power comes great responsibility. Ethical AI development is crucial as these systems become more integrated into critical decision-making processes.', voice: 'Marcus', emphasis: false },
  { id: 't9', startTime: 420, endTime: 480, text: 'Looking ahead, the next frontier includes artificial general intelligence, quantum machine learning, and AI systems that can reason causally rather than just statistically.', voice: 'Sophia', emphasis: true },
  { id: 't10', startTime: 480, endTime: 540, text: 'The question is not whether AI will change the world — it already has. The question is how we choose to shape that change for the benefit of all.', voice: 'Marcus', emphasis: false },
];

const VOICE_OPTIONS = [
  { id: 'sophia', label: 'Sophia — Professional Female' },
  { id: 'marcus', label: 'Marcus — Authoritative Male' },
  { id: 'luna', label: 'Luna — Friendly Female' },
  { id: 'kai', label: 'Kai — Energetic Male' },
];

interface TranscriptEditorProps {
  transcript?: TranscriptLine[];
  voiceSettings?: VoiceSettings;
  className?: string;
}

export default function TranscriptEditor({
  transcript: initialTranscript = DEMO_TRANSCRIPT,
  voiceSettings,
  className,
}: TranscriptEditorProps) {
  const [transcript, setTranscript] = useState<TranscriptLine[]>(initialTranscript);
  const [activeLineId, setActiveLineId] = useState<string | null>(null);
  const [showVoiceDropdown, setShowVoiceDropdown] = useState(false);

  const updateLine = useCallback((id: string, updates: Partial<TranscriptLine>) => {
    setTranscript((prev) =>
      prev.map((line) => (line.id === id ? { ...line, ...updates } : line)),
    );
  }, []);

  const deleteLine = useCallback((id: string) => {
    setTranscript((prev) => prev.filter((line) => line.id !== id));
    if (activeLineId === id) setActiveLineId(null);
  }, [activeLineId]);

  const toggleEmphasis = useCallback((id: string) => {
    setTranscript((prev) =>
      prev.map((line) =>
        line.id === id ? { ...line, emphasis: !line.emphasis } : line,
      ),
    );
  }, []);

  const addPauseBefore = useCallback((index: number) => {
    const pauseId = `pause-${Date.now()}`;
    const prevEndTime = index > 0 ? transcript[index - 1].endTime : 0;
    setTranscript((prev) => {
      const updated = [...prev];
      updated.splice(index, 0, {
        id: pauseId,
        startTime: prevEndTime,
        endTime: prevEndTime + 3,
        text: '[Pause]',
        voice: 'System',
        emphasis: false,
      });
      return updated;
    });
  }, [transcript]);

  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
        <h3 className="text-sm font-semibold text-white/80">Transcript</h3>
        <div className="flex items-center gap-2">
          {/* Change Voice Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowVoiceDropdown(!showVoiceDropdown)}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:border-white/20 transition-colors"
            >
              Change Voice
              <ChevronDown className="w-3 h-3" />
            </button>
            <AnimatePresence>
              {showVoiceDropdown && (
                <motion.div
                  className="absolute top-full mt-1 right-0 w-56 rounded-lg bg-[#1a1a1a] border border-white/10 shadow-xl shadow-black/40 z-20 overflow-hidden"
                  initial={{ opacity: 0, y: -4, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                >
                  {VOICE_OPTIONS.map((voice) => (
                    <button
                      key={voice.id}
                      onClick={() => {
                        if (activeLineId) {
                          updateLine(activeLineId, { voice: voice.label.split(' —')[0] });
                        }
                        setShowVoiceDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                    >
                      {voice.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Regenerate Section */}
          <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 hover:bg-purple-500/15 transition-colors">
            <RefreshCw className="w-3 h-3" />
            Regenerate
          </button>
        </div>
      </div>

      {/* Transcript Lines */}
      <div className="flex-1 glass rounded-xl overflow-hidden">
        <div className="max-h-[500px] overflow-y-auto p-3 space-y-1">
          {transcript.map((line, index) => (
            <div key={line.id} className="relative group">
              {/* Add Pause button between lines */}
              {index > 0 && (
                <div className="flex items-center justify-center h-5 -my-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 relative">
                  <button
                    onClick={() => addPauseBefore(index)}
                    className="flex items-center gap-1 text-[10px] text-gray-600 hover:text-purple-400 transition-colors"
                    title="Add pause"
                  >
                    <Plus className="w-2.5 h-2.5" />
                    Add pause
                  </button>
                </div>
              )}

              {/* Line */}
              <motion.div
                layout
                className={cn(
                  'flex items-start gap-3 p-2.5 rounded-lg border transition-colors',
                  activeLineId === line.id
                    ? 'border-purple-500/50 bg-purple-500/5'
                    : 'border-transparent hover:border-white/5 hover:bg-white/[0.02]',
                  line.emphasis && 'ring-1 ring-amber-500/20',
                )}
                onClick={() => setActiveLineId(line.id)}
              >
                {/* Timestamp */}
                <span className="text-[11px] text-gray-500 tabular-nums shrink-0 mt-0.5 w-10 text-right">
                  {formatTime(line.startTime)}
                </span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <input
                    type="text"
                    value={line.text}
                    onChange={(e) => updateLine(line.id, { text: e.target.value })}
                    className="w-full bg-transparent text-sm text-white/90 outline-none border-none p-0 focus:ring-0 placeholder:text-gray-600"
                  />

                  {/* Voice badge */}
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={cn(
                        'text-[10px] px-1.5 py-0.5 rounded-full border font-medium',
                        line.voice === 'Sophia'
                          ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                          : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
                      )}
                    >
                      {line.voice}
                    </span>
                    {line.emphasis && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        Emphasis
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  {/* Emphasis toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleEmphasis(line.id);
                    }}
                    className={cn(
                      'p-1 rounded transition-colors',
                      line.emphasis
                        ? 'text-amber-400 hover:bg-amber-500/10'
                        : 'text-gray-600 hover:text-amber-400 hover:bg-white/5',
                    )}
                    title="Toggle emphasis"
                  >
                    <Star className="w-3.5 h-3.5" />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteLine(line.id);
                    }}
                    className="p-1 rounded text-gray-600 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    title="Delete line"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
