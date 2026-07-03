'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic,
  Music,
  Type,
  Palette,
  Play,
  Pause,
  SkipBack,
  SkipForward,
} from 'lucide-react';
import { EditorPanels } from './EditorPanels';
import { EditorTimeline } from './EditorTimeline';
import { useAppStore } from '@/store';
import type { Project } from '@/types';

type EditorTab = 'voice' | 'music' | 'captions' | 'brand';

interface EditorLayoutProps {
  project: Project;
}

const tabs: { id: EditorTab; label: string; icon: React.ElementType }[] = [
  { id: 'voice', label: 'Voice', icon: Mic },
  { id: 'music', label: 'Music', icon: Music },
  { id: 'captions', label: 'Captions', icon: Type },
  { id: 'brand', label: 'Brand', icon: Palette },
];

export function EditorLayout({ project }: EditorLayoutProps) {
  const [activeTab, setActiveTab] = useState<EditorTab>('voice');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const chapters = project.chapters ?? [];

  const togglePlay = () => setIsPlaying((prev) => !prev);

  return (
    <div className="flex flex-col h-screen bg-[#0A0A0A] overflow-hidden">
      {/* ── Main content area ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* ── Left: Video Preview (60%) ── */}
        <div className="w-[60%] flex flex-col">
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#0A0A0A] border border-white/5 shadow-2xl">
              {/* Video placeholder */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-transparent via-transparent to-black/40">
                {project.thumbnail ? (
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                  />
                ) : null}

                {/* Play button overlay */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={togglePlay}
                  className="relative z-10 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-7 h-7 text-white" fill="white" />
                  ) : (
                    <Play className="w-7 h-7 text-white ml-1" fill="white" />
                  )}
                </motion.button>

                <p className="relative z-10 text-white/60 text-sm">
                  {isPlaying ? 'Playing...' : 'Loading video...'}
                </p>
              </div>

              {/* Transport controls bar */}
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-3 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <button className="p-1.5 text-white/60 hover:text-white transition-colors">
                  <SkipBack className="w-4 h-4" />
                </button>
                <button
                  onClick={togglePlay}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white ml-0.5" />
                  )}
                </button>
                <button className="p-1.5 text-white/60 hover:text-white transition-colors">
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* ── Bottom: Timeline ── */}
          <EditorTimeline
            chapters={chapters}
            currentTime={currentTime}
            duration={(project.videoLength ?? 10) * 60}
            onTimeChange={setCurrentTime}
          />
        </div>

        {/* ── Right: Controls Panel (40%) ── */}
        <div className="w-[40%] border-l border-white/5 flex flex-col bg-[#0D0D0D]">
          {/* Tab bar */}
          <div className="flex border-b border-white/5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-medium transition-all relative ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="editor-tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="p-4"
              >
                <EditorPanels activeTab={activeTab} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
