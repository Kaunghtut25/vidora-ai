'use client';

import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, Upload, FileText, Edit3, Brain, ArrowRight } from 'lucide-react';
import { useAppStore } from '@/store';
import type { ContentInputType } from '@/types';

const TABS: { id: ContentInputType; label: string; icon: React.ElementType }[] = [
  { id: 'url', label: 'URL', icon: Link },
  { id: 'video', label: 'Video Upload', icon: Upload },
  { id: 'script', label: 'Script Upload', icon: FileText },
  { id: 'prompt', label: 'Write Prompt', icon: Edit3 },
];

export default function Step1Page() {
  const router = useRouter();

  const contentInput = useAppStore((s) => s.contentInput);
  const contentSource = useAppStore((s) => s.contentSource);
  const deepResearch = useAppStore((s) => s.deepResearch);
  const setContentInput = useAppStore((s) => s.setContentInput);
  const setContentSource = useAppStore((s) => s.setContentSource);
  const setDeepResearch = useAppStore((s) => s.setDeepResearch);
  const setWizardStep = useAppStore((s) => s.setWizardStep);

  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scriptInputRef = useRef<HTMLInputElement>(null);

  const canContinue = contentSource.trim().length > 0;

  const handleContinue = () => {
    if (!canContinue) return;
    setWizardStep(1);
    router.push('/create/step2');
  };

  const handleFileDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (!file) return;
      setFileName(file.name);
      setContentSource(file.name);
    },
    [setContentSource],
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setFileName(file.name);
      setContentSource(file.name);
    },
    [setContentSource],
  );

  const handleAddUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    setContentSource(trimmed);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Add Your Content</h1>
        <p className="text-gray-400 text-sm mt-1">
          Paste a URL, upload files, or write a prompt to get started
        </p>
      </div>

      {/* Tab Pills */}
      <div className="flex flex-wrap gap-2 p-1 glass rounded-xl">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const active = contentInput === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setContentInput(tab.id);
                setContentSource('');
                setFileName('');
                setUrlInput('');
              }}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black
                ${active ? 'bg-purple-600 text-white shadow-[0_0_16px_rgba(139,92,246,0.35)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={contentInput}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
        >
          {/* ── URL Tab ── */}
          {contentInput === 'url' && (
            <div className="space-y-3">
              <label className="block text-sm text-gray-400 font-medium">
                Paste a URL to any article, YouTube video, or blog post
              </label>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Link size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddUrl()}
                    placeholder="Paste YouTube, blog, or article URL..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl text-white text-sm bg-white/5 border border-white/10 placeholder:text-gray-600
                      focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-colors"
                  />
                </div>
                <button
                  onClick={handleAddUrl}
                  disabled={!urlInput.trim()}
                  className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500
                    ${urlInput.trim() ? 'bg-purple-600 text-white hover:bg-purple-500' : 'bg-white/5 text-gray-600 cursor-not-allowed'}`}
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
          {contentInput === 'video' && (
            <div className="space-y-3">
              <label className="block text-sm text-gray-400 font-medium">
                Upload a video file to extract content from
              </label>
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleFileDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`flex flex-col items-center justify-center gap-4 py-16 px-8 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200
                  ${dragOver ? 'border-purple-500 bg-purple-500/10' : 'border-white/10 glass hover:border-white/20 hover:bg-white/[0.03]'}`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${dragOver ? 'bg-purple-500/20' : 'bg-white/5'}`}>
                  <Upload size={28} className={dragOver ? 'text-purple-400' : 'text-gray-500'} />
                </div>
                <div className="text-center">
                  {fileName ? (
                    <p className="text-purple-400 font-medium text-sm">{fileName}</p>
                  ) : (
                    <>
                      <p className="text-gray-300 text-sm font-medium">Drop MP4/MOV file or click to browse</p>
                      <p className="text-gray-600 text-xs mt-1">Supports MP4, MOV, AVI up to 2GB</p>
                    </>
                  )}
                </div>
                <input ref={fileInputRef} type="file" accept="video/mp4,video/quicktime,video/x-msvideo" onChange={handleFileSelect} className="hidden" />
              </div>
            </div>
          )}

          {/* ── Script Upload Tab ── */}
          {contentInput === 'script' && (
            <div className="space-y-3">
              <label className="block text-sm text-gray-400 font-medium">
                Upload a script, document, or notes
              </label>
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleFileDrop}
                onClick={() => scriptInputRef.current?.click()}
                className={`flex flex-col items-center justify-center gap-4 py-16 px-8 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200
                  ${dragOver ? 'border-purple-500 bg-purple-500/10' : 'border-white/10 glass hover:border-white/20 hover:bg-white/[0.03]'}`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${dragOver ? 'bg-purple-500/20' : 'bg-white/5'}`}>
                  <FileText size={28} className={dragOver ? 'text-purple-400' : 'text-gray-500'} />
                </div>
                <div className="text-center">
                  {fileName ? (
                    <p className="text-purple-400 font-medium text-sm">{fileName}</p>
                  ) : (
                    <>
                      <p className="text-gray-300 text-sm font-medium">Drop TXT, DOCX, or PDF file here</p>
                      <p className="text-gray-600 text-xs mt-1">We&apos;ll extract the text automatically</p>
                    </>
                  )}
                </div>
                <input ref={scriptInputRef} type="file" accept=".txt,.docx,.pdf,text/plain,application/pdf" onChange={handleFileSelect} className="hidden" />
              </div>
            </div>
          )}

          {/* ── Write Prompt Tab ── */}
          {contentInput === 'prompt' && (
            <div className="space-y-3">
              <label className="block text-sm text-gray-400 font-medium">
                Describe your video idea and AI will turn it into a script
              </label>
              <textarea
                value={contentSource}
                onChange={(e) => setContentSource(e.target.value)}
                placeholder="Describe your video idea in detail..."
                rows={8}
                className="w-full px-5 py-4 rounded-xl text-white text-sm min-h-[200px] glass placeholder:text-gray-600 resize-y
                  focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-colors"
              />
              <p className="text-xs text-gray-600">{contentSource.length} characters — be specific for best results</p>
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
                AI will research your topic across the web for accurate facts, statistics, and citations
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={deepResearch}
              onClick={() => setDeepResearch(!deepResearch)}
              className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black
                ${deepResearch ? 'bg-purple-600' : 'bg-white/10'}`}
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

      {/* Continue Button */}
      <div className="flex justify-end pt-2">
        <button
          onClick={handleContinue}
          disabled={!canContinue}
          className={`flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-200
            focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black
            ${canContinue ? 'bg-purple-600 text-white hover:bg-purple-500 shadow-[0_0_24px_rgba(139,92,246,0.3)]' : 'bg-white/5 text-gray-600 cursor-not-allowed'}`}
        >
          Continue
          <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  );
}
