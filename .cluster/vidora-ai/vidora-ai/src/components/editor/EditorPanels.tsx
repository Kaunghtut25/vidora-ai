'use client';

import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { useAppStore } from '@/store';
import { voices, emotions } from '@/data/voices';
import type { VoiceEmotion } from '@/types';

type EditorTab = 'voice' | 'music' | 'captions' | 'brand';

interface EditorPanelsProps {
  activeTab: EditorTab;
}

/* ────────────────────────────────────────────
   Voice Panel
   ──────────────────────────────────────────── */
function VoicePanel() {
  const { voiceSettings, setVoiceSettings } = useAppStore();

  return (
    <div className="space-y-6">
      {/* Voice selector */}
      <div>
        <label className="block text-xs font-medium text-white/60 mb-2">
          Voice
        </label>
        <select
          value={voiceSettings.voiceId}
          onChange={(e) => setVoiceSettings({ voiceId: e.target.value })}
          className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] appearance-none"
        >
          <optgroup label="English Voices">
            {voices
              .filter((v) => v.language === 'English')
              .map((v) => (
                <option key={v.id} value={v.id}>
                  {v.avatar} {v.name} — {v.description}
                </option>
              ))}
          </optgroup>
        </select>
      </div>

      {/* Speed slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-medium text-white/60">Speed</label>
          <span className="text-xs text-white/40">{voiceSettings.speed.toFixed(1)}x</span>
        </div>
        <input
          type="range"
          min="0.8"
          max="1.4"
          step="0.1"
          value={voiceSettings.speed}
          onChange={(e) => setVoiceSettings({ speed: parseFloat(e.target.value) })}
          className="w-full h-1.5 rounded-full appearance-none bg-white/10 cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#8B5CF6] [&::-webkit-slider-thumb]:shadow-lg
            accent-[#8B5CF6]"
        />
      </div>

      {/* Emotion pills */}
      <div>
        <label className="block text-xs font-medium text-white/60 mb-2">
          Emotion
        </label>
        <div className="flex flex-wrap gap-2">
          {emotions.map((emotion) => (
            <button
              key={emotion}
              onClick={() =>
                setVoiceSettings({ emotion: emotion as VoiceEmotion })
              }
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                voiceSettings.emotion === emotion
                  ? 'bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-[#8B5CF6]'
                  : 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/20'
              }`}
            >
              {emotion}
            </button>
          ))}
        </div>
      </div>

      {/* Pitch slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-medium text-white/60">Pitch</label>
          <span className="text-xs text-white/40">
            {voiceSettings.pitch > 0 ? '+' : ''}
            {voiceSettings.pitch}
          </span>
        </div>
        <input
          type="range"
          min="-10"
          max="10"
          step="1"
          value={voiceSettings.pitch}
          onChange={(e) => setVoiceSettings({ pitch: parseInt(e.target.value) })}
          className="w-full h-1.5 rounded-full appearance-none bg-white/10 cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#8B5CF6] [&::-webkit-slider-thumb]:shadow-lg
            accent-[#8B5CF6]"
        />
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Music Panel
   ──────────────────────────────────────────── */
function MusicPanel() {
  const [genre, setGenre] = useState('Cinematic');
  const [volume, setVolume] = useState(80);
  const [beatSync, setBeatSync] = useState(false);

  const genres = ['Cinematic', 'Corporate', 'Lo-Fi', 'Upbeat', 'Ambient'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-1">Background Music</h3>
        <p className="text-xs text-white/40">
          Add music to enhance your video
        </p>
      </div>

      {/* Genre selector */}
      <div>
        <label className="block text-xs font-medium text-white/60 mb-2">
          Genre
        </label>
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] appearance-none"
        >
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {/* Volume slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-medium text-white/60">Volume</label>
          <span className="text-xs text-white/40">{volume}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(parseInt(e.target.value))}
          className="w-full h-1.5 rounded-full appearance-none bg-white/10 cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#06B6D4] [&::-webkit-slider-thumb]:shadow-lg
            accent-[#06B6D4]"
        />
      </div>

      {/* Beat Sync toggle */}
      <div className="flex items-center justify-between">
        <div>
          <label className="text-xs font-medium text-white">Beat Sync</label>
          <p className="text-[10px] text-white/40">Auto-align cuts to music beats</p>
        </div>
        <button
          onClick={() => setBeatSync(!beatSync)}
          className={`relative w-10 h-5 rounded-full transition-colors ${
            beatSync ? 'bg-[#06B6D4]' : 'bg-white/10'
          }`}
        >
          <div
            className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
              beatSync ? 'translate-x-5' : 'translate-x-0.5'
            }`}
          />
        </button>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Captions Panel
   ──────────────────────────────────────────── */
function CaptionsPanel() {
  const [autoCaptions, setAutoCaptions] = useState(true);
  const [font, setFont] = useState('Inter');
  const [size, setSize] = useState(18);
  const [position, setPosition] = useState<'top' | 'bottom'>('bottom');
  const [color, setColor] = useState('#FFFFFF');

  const fonts = ['Inter', 'Roboto', 'Poppins', 'Montserrat', 'Playfair Display'];

  return (
    <div className="space-y-6">
      {/* Auto-generated captions toggle */}
      <div className="flex items-center justify-between">
        <div>
          <label className="text-xs font-medium text-white">
            Auto-generated captions
          </label>
          <p className="text-[10px] text-white/40">AI-powered speech-to-text</p>
        </div>
        <button
          onClick={() => setAutoCaptions(!autoCaptions)}
          className={`relative w-10 h-5 rounded-full transition-colors ${
            autoCaptions ? 'bg-[#8B5CF6]' : 'bg-white/10'
          }`}
        >
          <div
            className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
              autoCaptions ? 'translate-x-5' : 'translate-x-0.5'
            }`}
          />
        </button>
      </div>

      {/* Font selector */}
      <div>
        <label className="block text-xs font-medium text-white/60 mb-2">
          Font
        </label>
        <select
          value={font}
          onChange={(e) => setFont(e.target.value)}
          className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] appearance-none"
        >
          {fonts.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      {/* Size slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-medium text-white/60">Size</label>
          <span className="text-xs text-white/40">{size}px</span>
        </div>
        <input
          type="range"
          min="12"
          max="32"
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value))}
          className="w-full h-1.5 rounded-full appearance-none bg-white/10 cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#8B5CF6] [&::-webkit-slider-thumb]:shadow-lg
            accent-[#8B5CF6]"
        />
      </div>

      {/* Position */}
      <div>
        <label className="block text-xs font-medium text-white/60 mb-2">
          Position
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => setPosition('top')}
            className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
              position === 'top'
                ? 'bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-[#8B5CF6]'
                : 'bg-white/5 border border-white/10 text-white/60 hover:text-white'
            }`}
          >
            Top
          </button>
          <button
            onClick={() => setPosition('bottom')}
            className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
              position === 'bottom'
                ? 'bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-[#8B5CF6]'
                : 'bg-white/5 border border-white/10 text-white/60 hover:text-white'
            }`}
          >
            Bottom
          </button>
        </div>
      </div>

      {/* Color picker */}
      <div>
        <label className="block text-xs font-medium text-white/60 mb-2">
          Color
        </label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-10 h-10 rounded-lg border border-white/10 bg-transparent cursor-pointer p-0.5"
          />
          <span className="text-xs text-white/40 font-mono">{color}</span>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Brand Panel
   ──────────────────────────────────────────── */
function BrandPanel() {
  const { brandKit, setBrandKit } = useAppStore();
  const [logoFileName, setLogoFileName] = useState<string | null>(null);

  const fonts = ['Inter', 'Roboto', 'Poppins', 'Montserrat'];

  const handleLogoUpload = () => {
    // Simulate file selection — in production, wire to a real upload flow
    setLogoFileName('brand-logo.png');
  };

  return (
    <div className="space-y-6">
      {/* Logo upload */}
      <div>
        <label className="block text-xs font-medium text-white/60 mb-2">
          Logo
        </label>
        <button
          onClick={handleLogoUpload}
          className="w-full border border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center gap-2 hover:border-[#8B5CF6]/40 hover:bg-[#8B5CF6]/5 transition-all"
        >
          {logoFileName ? (
            <>
              <div className="w-10 h-10 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center">
                <Upload className="w-5 h-5 text-[#8B5CF6]" />
              </div>
              <span className="text-xs text-white/60">{logoFileName}</span>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                <Upload className="w-5 h-5 text-white/30" />
              </div>
              <span className="text-xs text-white/40">
                Drop logo or click to upload
              </span>
              <span className="text-[10px] text-white/20">PNG, SVG — max 2MB</span>
            </>
          )}
        </button>
      </div>

      {/* Primary color */}
      <div>
        <label className="block text-xs font-medium text-white/60 mb-2">
          Primary Color
        </label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={brandKit.primaryColor}
            onChange={(e) => setBrandKit({ primaryColor: e.target.value })}
            className="w-10 h-10 rounded-lg border border-white/10 bg-transparent cursor-pointer p-0.5"
          />
          <div
            className="w-8 h-8 rounded-lg border border-white/10"
            style={{ backgroundColor: brandKit.primaryColor }}
          />
          <span className="text-xs text-white/40 font-mono">
            {brandKit.primaryColor}
          </span>
        </div>
      </div>

      {/* Secondary color */}
      <div>
        <label className="block text-xs font-medium text-white/60 mb-2">
          Secondary Color
        </label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={brandKit.secondaryColor}
            onChange={(e) => setBrandKit({ secondaryColor: e.target.value })}
            className="w-10 h-10 rounded-lg border border-white/10 bg-transparent cursor-pointer p-0.5"
          />
          <div
            className="w-8 h-8 rounded-lg border border-white/10"
            style={{ backgroundColor: brandKit.secondaryColor }}
          />
          <span className="text-xs text-white/40 font-mono">
            {brandKit.secondaryColor}
          </span>
        </div>
      </div>

      {/* Font family */}
      <div>
        <label className="block text-xs font-medium text-white/60 mb-2">
          Font Family
        </label>
        <select
          value={brandKit.font}
          onChange={(e) => setBrandKit({ font: e.target.value })}
          className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] appearance-none"
        >
          {fonts.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      {/* Watermark toggle */}
      <div className="flex items-center justify-between">
        <div>
          <label className="text-xs font-medium text-white">Watermark</label>
          <p className="text-[10px] text-white/40">Show brand watermark on video</p>
        </div>
        <button
          onClick={() => setBrandKit({ watermark: !brandKit.watermark })}
          className={`relative w-10 h-5 rounded-full transition-colors ${
            brandKit.watermark ? 'bg-[#8B5CF6]' : 'bg-white/10'
          }`}
        >
          <div
            className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
              brandKit.watermark ? 'translate-x-5' : 'translate-x-0.5'
            }`}
          />
        </button>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Exported Panel Router
   ──────────────────────────────────────────── */
export function EditorPanels({ activeTab }: EditorPanelsProps) {
  const panels: Record<EditorTab, React.ReactNode> = {
    voice: <VoicePanel />,
    music: <MusicPanel />,
    captions: <CaptionsPanel />,
    brand: <BrandPanel />,
  };

  return (
    <div className="glass rounded-xl p-5 min-h-[500px]">
      {panels[activeTab]}
    </div>
  );
}
