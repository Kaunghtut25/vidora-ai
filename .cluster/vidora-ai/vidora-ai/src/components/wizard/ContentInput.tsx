'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, Upload, FileText, Edit3, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ContentInputType } from '@/types';

interface ContentInputProps {
  inputType: ContentInputType;
  contentSource: string;
  onInputTypeChange: (type: ContentInputType) => void;
  onSourceChange: (source: string) => void;
  deepResearch: boolean;
  onDeepResearchChange: (enabled: boolean) => void;
}

const tabs: { id: ContentInputType; label: string; icon: React.ElementType }[] = [
  { id: 'url', label: 'URL', icon: Link },
  { id: 'video', label: 'Video Upload', icon: Upload },
  { id: 'script', label: 'Script Upload', icon: FileText },
  { id: 'prompt', label: 'Write Prompt', icon: Edit3 },
];

const acceptedVideoTypes = 'video/mp4,video/quicktime,video/x-msvideo';
const acceptedDocTypes = '.txt,.docx,.pdf,text/plain,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document';

const tabContentVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.25, ease: 'easeOut' as const } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.15, ease: 'easeIn' as const } },
};

export default function ContentInput({
  inputType,
  contentSource,
  onInputTypeChange,
  onSourceChange,
  deepResearch,
  onDeepResearchChange,
}: ContentInputProps) {
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scriptInputRef = useRef<HTMLInputElement>(null);

  const handleFileDrop = useCallback(
    (e: React.DragEvent, type: 'video' | 'script') => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (!file) return;

      if (type === 'video') {
        if (!file.type.startsWith('video/')) return;
        setFileName(file.name);
        onSourceChange(file.name);
      } else {
        setFileName(file.name);
        onSourceChange(file.name);
      }
    },
    [onSourceChange],
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, type: 'video' | 'script') => {
      const file = e.target.files?.[0];
      if (!file) return;
      setFileName(file.name);
      onSourceChange(file.name);
    },
    [onSourceChange],
  );

  const handleAddUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    onSourceChange(trimmed);
  };

  return (
    <div className="w-full space-y-8">
      {/* Tab Pills */}
      <div className="flex flex-wrap gap-2 p-1 glass rounded-xl">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = inputType === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onInputTypeChange(tab.id)}
              className={cn(
                'relative flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
                active
                  ? 'bg-purple-600 text-white shadow-[0_0_16px_rgba(139,92,246,0.35)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5',
              )}
            >
              <Icon size={16} />
              {tab.label}
              {active && (
                <motion.div
                  layoutId="activeTabBg"
                  className="absolute inset-0 bg-purple-600 rounded-lg -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={inputType}
          variants={tabContentVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* ── URL Tab ── */}
          {inputType === 'url' && (
            <div className="space-y-3">
              <label className="block text-sm text-gray-400 font-medium">
                Paste a URL to any article, YouTube video, or blog post
              </label>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Link
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddUrl()}
                    placeholder="Paste YouTube, blog, or article URL..."
                    className={cn(
                      'w-full pl-12 pr-4 py-3 rounded-xl text-white text-sm',
                      'bg-white/5 border border-white/10 placeholder:text-gray-600',
                      'focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50',
                      'transition-colors duration-200',
                    )}
                  />
                </div>
                <button
                  onClick={handleAddUrl}
                  disabled={!urlInput.trim()}
                  className={cn(
                    'px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500',
                    urlInput.trim()
                      ? 'bg-purple-600 text-white hover:bg-purple-500'
                      : 'bg-white/5 text-gray-600 cursor-not-allowed',
                  )}
                >
                  Add URL
                </button>
              </div>
              {contentSource && (
                <p className="text-xs text-green-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Source added: {contentSource}
                </p>
              )}
            </div>
          )}

          {/* ── Video Upload Tab ── */}
          {inputType === 'video' && (
            <div className="space-y-3">
              <label className="block text-sm text-gray-400 font-medium">
                Upload a video file to extract content from
              </label>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => handleFileDrop(e, 'video')}
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  'flex flex-col items-center justify-center gap-4 py-16 px-8 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200',
                  dragOver
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-white/10 glass hover:border-white/20 hover:bg-white/[0.03]',
                )}
              >
                <div
                  className={cn(
                    'w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-200',
                    dragOver ? 'bg-purple-500/20' : 'bg-white/5',
                  )}
                >
                  <Upload
                    size={28}
                    className={dragOver ? 'text-purple-400' : 'text-gray-500'}
                  />
                </div>
                <div className="text-center">
                  {fileName ? (
                    <p className="text-purple-400 font-medium text-sm">{fileName}</p>
                  ) : (
                    <>
                      <p className="text-gray-300 text-sm font-medium">
                        Drop MP4/MOV file or click to browse
                      </p>
                      <p className="text-gray-600 text-xs mt-1">
                        Supports MP4, MOV, AVI up to 2GB
                      </p>
                    </>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={acceptedVideoTypes}
                  onChange={(e) => handleFileSelect(e, 'video')}
                  className="hidden"
                />
              </div>
            </div>
          )}

          {/* ── Script Upload Tab ── */}
          {inputType === 'script' && (
            <div className="space-y-3">
              <label className="block text-sm text-gray-400 font-medium">
                Upload a script, document, or notes
              </label>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => handleFileDrop(e, 'script')}
                onClick={() => scriptInputRef.current?.click()}
                className={cn(
                  'flex flex-col items-center justify-center gap-4 py-16 px-8 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200',
                  dragOver
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-white/10 glass hover:border-white/20 hover:bg-white/[0.03]',
                )}
              >
                <div
                  className={cn(
                    'w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-200',
                    dragOver ? 'bg-purple-500/20' : 'bg-white/5',
                  )}
                >
                  <FileText
                    size={28}
                    className={dragOver ? 'text-purple-400' : 'text-gray-500'}
                  />
                </div>
                <div className="text-center">
                  {fileName ? (
                    <p className="text-purple-400 font-medium text-sm">{fileName}</p>
                  ) : (
                    <>
                      <p className="text-gray-300 text-sm font-medium">
                        Drop TXT, DOCX, or PDF file here
                      </p>
                      <p className="text-gray-600 text-xs mt-1">
                        We&apos;ll extract the text automatically
                      </p>
                    </>
                  )}
                </div>
                <input
                  ref={scriptInputRef}
                  type="file"
                  accept={acceptedDocTypes}
                  onChange={(e) => handleFileSelect(e, 'script')}
                  className="hidden"
                />
              </div>
            </div>
          )}

          {/* ── Write Prompt Tab ── */}
          {inputType === 'prompt' && (
            <div className="space-y-3">
              <label className="block text-sm text-gray-400 font-medium">
                Describe your video idea and AI will turn it into a script
              </label>
              <textarea
                value={contentSource}
                onChange={(e) => onSourceChange(e.target.value)}
                placeholder="Describe your video idea in detail..."
                rows={8}
                className={cn(
                  'w-full px-5 py-4 rounded-xl text-white text-sm min-h-[200px]',
                  'glass placeholder:text-gray-600 resize-y',
                  'focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50',
                  'transition-colors duration-200',
                )}
              />
              <p className="text-xs text-gray-600">
                {contentSource.length} characters — be specific for best results
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Deep Research Mode Toggle */}
      <div className="flex items-start gap-4 p-5 rounded-xl glass">
        <div className="w-10 h-10 rounded-lg bg-purple-500/15 flex items-center justify-center shrink-0 mt-0.5">
          <Brain size={20} className="text-purple-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h4 className="text-white font-semibold text-sm">Deep Research Mode</h4>
              <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">
                AI will research your topic across the web for accurate facts, statistics, and
                citations
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={deepResearch}
              onClick={() => onDeepResearchChange(!deepResearch)}
              className={cn(
                'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
                deepResearch ? 'bg-purple-600' : 'bg-white/10',
              )}
            >
              <motion.span
                animate={{ x: deepResearch ? 20 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="inline-block h-4 w-4 rounded-full bg-white shadow-sm"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
