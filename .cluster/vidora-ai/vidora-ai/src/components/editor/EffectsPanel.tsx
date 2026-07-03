'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Sun,
  Moon,
  Zap,
  Palette,
  Type,
  Shuffle,
  Image,
  Layers,
  Text,
} from 'lucide-react';

/* ────────────────────────────────────────────
   Types
   ──────────────────────────────────────────── */

type EffectsTab = 'transitions' | 'filters' | 'overlays' | 'text';

interface Transition {
  id: string;
  name: string;
  gradient: string;
}

interface Filter {
  id: string;
  name: string;
  gradient: string;
  description: string;
}

interface OverlayOption {
  id: string;
  name: string;
  description: string;
  gradient: string;
}

interface TextEffect {
  id: string;
  name: string;
  preview: string;
}

/* ────────────────────────────────────────────
   Data
   ──────────────────────────────────────────── */

const transitions: Transition[] = [
  {
    id: 'fade',
    name: 'Fade',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  },
  {
    id: 'slide',
    name: 'Slide',
    gradient: 'linear-gradient(135deg, #2d1b69 0%, #4a2c98 50%, #7c3aed 100%)',
  },
  {
    id: 'zoom',
    name: 'Zoom',
    gradient: 'linear-gradient(135deg, #0c4a6e 0%, #0891b2 50%, #06b6d4 100%)',
  },
  {
    id: 'wipe',
    name: 'Wipe',
    gradient: 'linear-gradient(135deg, #14532d 0%, #166534 50%, #22c55e 100%)',
  },
  {
    id: 'dissolve',
    name: 'Dissolve',
    gradient: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 50%, #a78bfa 100%)',
  },
  {
    id: 'flip',
    name: 'Flip',
    gradient: 'linear-gradient(135deg, #831843 0%, #be185d 50%, #ec4899 100%)',
  },
  {
    id: 'spin',
    name: 'Spin',
    gradient: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 50%, #60a5fa 100%)',
  },
  {
    id: 'glitch',
    name: 'Glitch',
    gradient: 'linear-gradient(135deg, #0a0a0a 0%, #1f1f1f 25%, #00ff41 50%, #1f1f1f 75%, #0a0a0a 100%)',
  },
];

const filters: Filter[] = [
  {
    id: 'cinematic',
    name: 'Cinematic',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)',
    description: 'Warm amber tones',
  },
  {
    id: 'noir',
    name: 'Noir',
    gradient: 'linear-gradient(135deg, #000000 0%, #1f1f1f 30%, #fafafa 70%, #ffffff 100%)',
    description: 'B&W high contrast',
  },
  {
    id: 'vintage',
    name: 'Vintage',
    gradient: 'linear-gradient(135deg, #d4a574 0%, #c4956a 50%, #a67c52 100%)',
    description: 'Sepia warmth',
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 30%, #06b6d4 70%, #22d3ee 100%)',
    description: 'Purple / cyan',
  },
  {
    id: 'golden-hour',
    name: 'Golden Hour',
    gradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 40%, #ea580c 80%, #f97316 100%)',
    description: 'Warm glow',
  },
  {
    id: 'moody',
    name: 'Moody',
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #1e3a5f 70%, #0c4a6e 100%)',
    description: 'Blue shadows',
  },
  {
    id: 'clean',
    name: 'Clean',
    gradient: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 40%, #cbd5e1 70%, #f1f5f9 100%)',
    description: 'Bright & crisp',
  },
  {
    id: 'dramatic',
    name: 'Dramatic',
    gradient: 'linear-gradient(135deg, #0f0f0f 0%, #1f1f1f 25%, #efefef 75%, #ffffff 100%)',
    description: 'High contrast',
  },
  {
    id: 'soft-dream',
    name: 'Soft Dream',
    gradient: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 30%, #fbbf24 60%, #fde68a 100%)',
    description: 'Blur + warm',
  },
  {
    id: 'nature',
    name: 'Nature',
    gradient: 'linear-gradient(135deg, #064e3b 0%, #047857 30%, #34d399 60%, #6ee7b7 100%)',
    description: 'Green boost',
  },
];

const overlays: OverlayOption[] = [
  {
    id: 'light-leaks',
    name: 'Light Leaks',
    description: 'Organic light bleed',
    gradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, transparent 80%)',
  },
  {
    id: 'dust-grain',
    name: 'Dust & Grain',
    description: 'Film grain texture',
    gradient: 'linear-gradient(135deg, #78716c 0%, #57534e 50%, #44403c 100%)',
  },
  {
    id: 'vignette',
    name: 'Vignette',
    description: 'Dark edge fade',
    gradient: 'radial-gradient(ellipse at center, transparent 40%, #000000 100%)',
  },
  {
    id: 'lens-flare',
    name: 'Lens Flare',
    description: 'Optical flare effect',
    gradient: 'linear-gradient(135deg, #fef08a 0%, #fbbf24 30%, transparent 70%)',
  },
  {
    id: 'film-burn',
    name: 'Film Burn',
    description: 'Vintage burn marks',
    gradient: 'linear-gradient(135deg, #f97316 0%, #dc2626 40%, #fbbf24 80%)',
  },
  {
    id: 'scan-lines',
    name: 'Scan Lines',
    description: 'CRT scan overlay',
    gradient:
      'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
  },
];

const textEffects: TextEffect[] = [
  { id: 'typewriter', name: 'Typewriter', preview: 'T' },
  { id: 'neon-glow', name: 'Neon Glow', preview: 'N' },
  { id: 'drop-shadow', name: 'Drop Shadow', preview: 'D' },
  { id: 'gradient-fill', name: 'Gradient Fill', preview: 'G' },
  { id: 'stroke-outline', name: 'Stroke Outline', preview: 'S' },
  { id: '3d-extrude', name: '3D Extrude', preview: '3' },
];

const tabs: { id: EffectsTab; label: string; icon: React.ElementType }[] = [
  { id: 'transitions', label: 'Transitions', icon: Shuffle },
  { id: 'filters', label: 'Filters', icon: Palette },
  { id: 'overlays', label: 'Overlays', icon: Layers },
  { id: 'text', label: 'Text Effects', icon: Type },
];

/* ────────────────────────────────────────────
   Sub-components
   ──────────────────────────────────────────── */

function TransitionsTab() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-2 gap-3">
      {transitions.map((t, i) => (
        <motion.button
          key={t.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04, duration: 0.25 }}
          onClick={() => setSelected(t.id)}
          className={`group relative flex flex-col items-center gap-2 rounded-xl border p-3 transition-all duration-200 ${
            selected === t.id
              ? 'border-[#8B5CF6]/50 bg-[#8B5CF6]/10 shadow-lg shadow-[#8B5CF6]/10'
              : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.07]'
          }`}
        >
          {/* Preview thumbnail */}
          <div
            className="relative h-16 w-full overflow-hidden rounded-lg"
            style={{ background: t.gradient }}
          >
            {/* Play indicator on selected */}
            {selected === t.id && (
              <motion.div
                layoutId="transition-indicator"
                className="absolute inset-0 flex items-center justify-center bg-black/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                  <svg className="h-3 w-3 text-white" viewBox="0 0 12 14" fill="currentColor">
                    <path d="M0 0v14l12-7z" />
                  </svg>
                </div>
              </motion.div>
            )}

            {/* Animated transition preview */}
            <motion.div
              className="absolute inset-0 bg-white/10"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.4 }}
              style={{ transformOrigin: 'left' }}
            />
          </div>

          {/* Label */}
          <span
            className={`text-xs font-medium transition-colors ${
              selected === t.id ? 'text-[#8B5CF6]' : 'text-white/60 group-hover:text-white/80'
            }`}
          >
            {t.name}
          </span>

          {/* Selected indicator dot */}
          {selected === t.id && (
            <motion.div
              layoutId="transition-dot"
              className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-[#8B5CF6] ring-2 ring-[#050508]"
            />
          )}
        </motion.button>
      ))}
    </div>
  );
}

function FiltersTab() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-2 gap-3 max-h-[420px] overflow-y-auto pr-1">
      {filters.map((f, i) => (
        <motion.button
          key={f.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.03, duration: 0.2 }}
          onClick={() => setSelected(f.id)}
          className={`group flex flex-col items-center gap-2 rounded-xl border p-3 transition-all duration-200 ${
            selected === f.id
              ? 'border-[#8B5CF6]/50 bg-[#8B5CF6]/10 shadow-lg shadow-[#8B5CF6]/10'
              : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.07]'
          }`}
        >
          {/* Gradient preview square */}
          <div
            className="relative h-16 w-full overflow-hidden rounded-lg"
            style={{ background: f.gradient }}
          >
            {/* Overlay diamond pattern */}
            <div className="absolute inset-0 opacity-20">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id={`diamond-${f.id}`} x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                    <rect x="0" y="0" width="4" height="4" fill="rgba(255,255,255,0.15)" />
                    <rect x="4" y="4" width="4" height="4" fill="rgba(255,255,255,0.15)" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#diamond-${f.id})`} />
              </svg>
            </div>

            {selected === f.id && (
              <motion.div
                layoutId="filter-check"
                className="absolute inset-0 flex items-center justify-center bg-black/25"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <svg className="h-5 w-5 text-white drop-shadow" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.div>
            )}
          </div>

          {/* Name + description */}
          <div className="text-center">
            <span
              className={`block text-xs font-medium transition-colors ${
                selected === f.id ? 'text-[#8B5CF6]' : 'text-white/60 group-hover:text-white/80'
              }`}
            >
              {f.name}
            </span>
            <span className="block text-[10px] text-white/30 mt-0.5">{f.description}</span>
          </div>
        </motion.button>
      ))}
    </div>
  );
}

function OverlaysTab() {
  const [active, setActive] = useState<Record<string, boolean>>({});
  const [intensity, setIntensity] = useState<Record<string, number>>({});

  const toggle = (id: string) => {
    setActive((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      // Set default intensity when enabling
      if (next[id] && !intensity[id]) {
        setIntensity((i) => ({ ...i, [id]: 50 }));
      }
      return next;
    });
  };

  const setIntensityValue = (id: string, val: number) => {
    setIntensity((prev) => ({ ...prev, [id]: val }));
  };

  return (
    <div className="space-y-3">
      {overlays.map((o, i) => {
        const isActive = active[o.id] ?? false;
        const value = intensity[o.id] ?? 50;

        return (
          <motion.div
            key={o.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.25 }}
            className="rounded-xl border border-white/10 bg-white/5 p-3"
          >
            {/* Row: preview + name + toggle */}
            <div className="flex items-center gap-3">
              {/* Mini preview */}
              <div
                className="h-10 w-14 shrink-0 rounded-lg border border-white/5"
                style={{ background: o.gradient }}
              />

              {/* Name + description */}
              <div className="flex-1 min-w-0">
                <span className="block text-xs font-medium text-white/80 truncate">
                  {o.name}
                </span>
                <span className="block text-[10px] text-white/30">{o.description}</span>
              </div>

              {/* Toggle switch */}
              <button
                onClick={() => toggle(o.id)}
                className={`relative h-5 w-10 shrink-0 rounded-full transition-colors duration-200 ${
                  isActive ? 'bg-[#8B5CF6]' : 'bg-white/10'
                }`}
              >
                <motion.div
                  className="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow"
                  animate={{ x: isActive ? 20 : 2 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>
            </div>

            {/* Intensity slider — shown when active */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                  animate={{ height: 'auto', opacity: 1, marginTop: 10 }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] text-white/40">Intensity</span>
                    <span className="text-[10px] text-white/50 font-mono">{value}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    onChange={(e) => setIntensityValue(o.id, parseInt(e.target.value))}
                    className="w-full h-1 rounded-full appearance-none bg-white/10 cursor-pointer
                      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5
                      [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#8B5CF6] [&::-webkit-slider-thumb]:shadow-lg
                      accent-[#8B5CF6]"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

function TextEffectsTab() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      {textEffects.map((te, i) => {
        const isSelected = selected === te.id;

        return (
          <motion.button
            key={te.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.2 }}
            onClick={() => setSelected(te.id)}
            className={`group flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all duration-200 ${
              isSelected
                ? 'border-[#8B5CF6]/50 bg-[#8B5CF6]/10 shadow-lg shadow-[#8B5CF6]/5'
                : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.07]'
            }`}
          >
            {/* Preview box */}
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border text-sm font-bold transition-all ${
                isSelected
                  ? 'border-[#8B5CF6]/40 bg-[#8B5CF6]/20 text-[#8B5CF6]'
                  : 'border-white/10 bg-white/5 text-white/40 group-hover:text-white/60'
              }`}
            >
              {te.preview}
            </div>

            {/* Name */}
            <span
              className={`flex-1 text-sm font-medium transition-colors ${
                isSelected ? 'text-white' : 'text-white/60 group-hover:text-white/80'
              }`}
            >
              {te.name}
            </span>

            {/* Radio indicator */}
            <div
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                isSelected
                  ? 'border-[#8B5CF6] bg-[#8B5CF6]'
                  : 'border-white/20 bg-transparent group-hover:border-white/40'
              }`}
            >
              {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

/* ────────────────────────────────────────────
   Main Effects Panel
   ──────────────────────────────────────────── */

export function EffectsPanel() {
  const [activeTab, setActiveTab] = useState<EffectsTab>('transitions');

  const panels: Record<EffectsTab, React.ReactNode> = {
    transitions: <TransitionsTab />,
    filters: <FiltersTab />,
    overlays: <OverlaysTab />,
    text: <TextEffectsTab />,
  };

  return (
    <div className="glass-card mesh-dark overflow-hidden">
      {/* ── Header ── */}
      <div className="flex items-center gap-2.5 border-b border-white/6 px-4 py-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#8B5CF6]/15">
          <Sparkles className="h-3.5 w-3.5 text-[#8B5CF6]" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Effects</h3>
          <p className="text-[10px] text-white/30">Advanced video effects</p>
        </div>
      </div>

      {/* ── Tab bar ── */}
      <div className="flex border-b border-white/6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-1 flex-col items-center gap-1 px-2 py-2.5 text-xs transition-colors ${
                isActive ? 'text-white' : 'text-white/35 hover:text-white/60'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span className="text-[10px]">{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="effects-tab-indicator"
                  className="absolute bottom-0 left-1/4 right-1/4 h-0.5 rounded-full bg-[#8B5CF6]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* ── Panel content ── */}
      <div className="p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {panels[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default EffectsPanel;
