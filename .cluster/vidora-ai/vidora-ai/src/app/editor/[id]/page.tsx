'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Download,
  Save,
  Mic,
  Music,
  Type,
  Image as ImageIcon,
  ChevronDown,
  Scissors,
  Plus,
  CheckCircle2,
  Loader2,
  Trash2,
  RefreshCw,
  Upload,
  Palette,
} from 'lucide-react';

/* ──────────────── Types ──────────────── */

interface TranscriptParagraph {
  id: string;
  startTime: number;
  endTime: number;
  speaker: string;
  text: string;
}

interface Voice {
  id: string;
  name: string;
  avatar: string;
  language: string;
  region: string;
  description: string;
}

interface MusicTrack {
  id: string;
  name: string;
  mood: string;
  duration: string;
}

interface Chapter {
  id: string;
  title: string;
  startTime: number;
  color: string;
}

/* ──────────────── Mock Data ──────────────── */

const VOICES: Voice[] = [
  { id: 'sophia',  name: 'Sophia',   avatar: '👩‍💼', language: 'English',  region: 'US',       description: 'Professional & warm' },
  { id: 'marcus',  name: 'Marcus',   avatar: '👨‍🏫', language: 'English',  region: 'UK',       description: 'Authoritative & clear' },
  { id: 'priya',   name: 'Priya',    avatar: '👩‍🔬', language: 'English',  region: 'Indian',   description: 'Energetic & bright' },
  { id: 'david',   name: 'David',    avatar: '👨‍💻', language: 'English',  region: 'Australian', description: 'Calm & reassuring' },
  { id: 'emma',    name: 'Emma',     avatar: '👩‍⚕️', language: 'English',  region: 'US',       description: 'Soft & nurturing' },
  { id: 'raj',     name: 'Raj',      avatar: '👨‍💼', language: 'English',  region: 'Indian',   description: 'Confident & bold' },
  { id: 'lin',     name: 'Lin',      avatar: '👩‍🎨', language: 'Chinese',  region: 'Mandarin', description: 'Elegant & smooth' },
  { id: 'akira',   name: 'Akira',    avatar: '👨‍🔬', language: 'Japanese', region: 'Tokyo',    description: 'Precise & measured' },
  { id: 'aria',    name: 'Aria',     avatar: '👩‍🚀', language: 'English',  region: 'US',       description: 'Youthful & dynamic' },
  { id: 'nuclear', name: 'Nuclear',  avatar: '👨‍🎤', language: 'English',  region: 'US',       description: 'Deep & cinematic' },
];

const MUSIC_TRACKS: MusicTrack[] = [
  { id: 'upbeat',     name: 'Upbeat',     mood: 'Energetic · Fast',    duration: '2:30' },
  { id: 'calm',       name: 'Calm',       mood: 'Relaxed · Slow',      duration: '3:15' },
  { id: 'corporate',  name: 'Corporate',  mood: 'Professional · Mid',  duration: '2:45' },
  { id: 'cinematic',  name: 'Cinematic',  mood: 'Epic · Dramatic',     duration: '4:00' },
  { id: 'lofi',       name: 'Lo-Fi',      mood: 'Chill · Groovy',      duration: '3:30' },
  { id: 'ambient',    name: 'Ambient',    mood: 'Atmospheric · Soft',  duration: '5:00' },
];

const CAPTION_STYLES = [
  { id: 'modern',   name: 'Modern',   font: 'Inter',    weight: '600',  preview: 'Aa' },
  { id: 'classic',  name: 'Classic',  font: 'Georgia',  weight: '400',  preview: 'Aa' },
  { id: 'bold',     name: 'Bold',     font: 'Inter',    weight: '800',  preview: 'Aa' },
  { id: 'minimal',  name: 'Minimal',  font: 'Inter',    weight: '300',  preview: 'Aa' },
];

const FONT_OPTIONS = ['Inter', 'Georgia', 'Roboto', 'Poppins', 'Montserrat', 'Playfair Display'];

const CHAPTERS: Chapter[] = [
  { id: 'ch1', title: 'Intro',       startTime: 0,  color: 'bg-violet-500/30' },
  { id: 'ch2', title: 'Main Topic',  startTime: 8,  color: 'bg-cyan-500/30' },
  { id: 'ch3', title: 'Details',     startTime: 16, color: 'bg-emerald-500/30' },
  { id: 'ch4', title: 'Outro',       startTime: 24, color: 'bg-amber-500/30' },
];

const INITIAL_TRANSCRIPT: TranscriptParagraph[] = [
  { id: 'p1', startTime: 0,  endTime: 5,  speaker: 'Narrator', text: 'Welcome to this AI-powered video. Today we explore the future of content creation.' },
  { id: 'p2', startTime: 5,  endTime: 10, speaker: 'Narrator', text: 'Artificial intelligence is transforming how we produce, edit, and distribute video content.' },
  { id: 'p3', startTime: 10, endTime: 16, speaker: 'Expert',   text: 'With tools like Vidora, anyone can create professional-quality videos in minutes.' },
  { id: 'p4', startTime: 16, endTime: 22, speaker: 'Expert',   text: 'Simply input your content, choose a style, and let AI handle the heavy lifting.' },
  { id: 'p5', startTime: 22, endTime: 30, speaker: 'Narrator', text: 'From educational explainers to corporate presentations, the possibilities are endless.' },
];

/* ──────────────── Helpers ──────────────── */

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/* ──────────────── Sub-Components ──────────────── */

function VideoPreview({
  currentTime,
  duration,
  isPlaying,
  onTogglePlay,
  onSeek,
}: {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSeek: (t: number) => void;
}) {
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-violet-900/30 via-[#0a0a10] to-cyan-900/30 border border-white/[0.06] group">
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Play / Pause overlay */}
      <button
        onClick={onTogglePlay}
        className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
          {isPlaying ? (
            <Pause size={28} className="text-white" />
          ) : (
            <Play size={28} className="text-white ml-1" fill="white" />
          )}
        </div>
      </button>

      {/* Time + quality overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between z-20">
        <span className="text-sm font-mono text-white/80 bg-black/40 px-3 py-1 rounded-lg backdrop-blur-sm">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
        <span className="text-xs text-white/50 bg-black/40 px-3 py-1 rounded-lg backdrop-blur-sm">
          1080p · 16:9
        </span>
      </div>

      {/* Progress bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 cursor-pointer z-20"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
          onSeek(ratio * duration);
        }}
      >
        <div
          className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function TimelineBar({
  duration,
  currentTime,
  isPlaying,
  onTogglePlay,
  onSeek,
  chapters,
}: {
  duration: number;
  currentTime: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSeek: (t: number) => void;
  chapters: Chapter[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    onSeek(ratio * duration);
  };

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-[#0a0a10] border-t border-white/5 shrink-0">
      {/* Transport */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onSeek(Math.max(0, currentTime - 5))}
          className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-all"
          title="Skip back 5s"
        >
          <SkipBack size={16} />
        </button>
        <button
          onClick={onTogglePlay}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} fill="white" className="ml-0.5" />}
        </button>
        <button
          onClick={() => onSeek(Math.min(duration, currentTime + 5))}
          className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-all"
          title="Skip forward 5s"
        >
          <SkipForward size={16} />
        </button>
      </div>

      {/* Current time */}
      <span className="text-xs font-mono text-zinc-400 w-12 text-center shrink-0">
        {formatTime(currentTime)}
      </span>

      {/* Timeline track */}
      <div
        ref={trackRef}
        onClick={handleTrackClick}
        className="flex-1 h-10 rounded-lg bg-white/[0.03] border border-white/[0.04] relative cursor-pointer group hover:border-white/[0.08] transition-colors"
      >
        {/* Chapter segments */}
        {chapters.map((ch, i) => {
          const startPct = (ch.startTime / duration) * 100;
          const nextStart = i < chapters.length - 1 ? chapters[i + 1].startTime : duration;
          const widthPct = ((nextStart - ch.startTime) / duration) * 100;
          return (
            <div
              key={ch.id}
              className={`absolute inset-y-0 ${ch.color} ${i === 0 ? 'rounded-l-lg' : ''} ${i === chapters.length - 1 ? 'rounded-r-lg' : ''} border-r border-white/5`}
              style={{ left: `${startPct}%`, width: `${widthPct}%` }}
            >
              <span className="absolute top-1 left-2 text-[10px] text-white/40 font-medium whitespace-nowrap">
                {ch.title}
              </span>
            </div>
          );
        })}

        {/* Playhead */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg shadow-white/20 z-10 pointer-events-none"
          style={{ left: `${progress}%` }}
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white shadow-lg" />
        </div>
      </div>

      {/* Duration */}
      <span className="text-xs font-mono text-zinc-500 w-12 text-center shrink-0">
        {formatTime(duration)}
      </span>

      {/* Tools */}
      <div className="flex items-center gap-1 shrink-0">
        <button className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-white transition-all" title="Split">
          <Scissors size={14} />
        </button>
        <button className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-white transition-all" title="Volume">
          <Volume2 size={14} />
        </button>
      </div>
    </div>
  );
}

/* ─── Right Panel: Voice Tab ─── */

function VoiceTab() {
  const [selectedVoice, setSelectedVoice] = useState('sophia');
  const [speed, setSpeed] = useState(1.0);
  const [emotion, setEmotion] = useState('neutral');
  const [pitch, setPitch] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selected = VOICES.find((v) => v.id === selectedVoice) ?? VOICES[0];

  return (
    <div className="space-y-5">
      <h3 className="text-sm font-semibold text-white flex items-center gap-2">
        <Mic size={14} className="text-cyan-400" />
        Voice Settings
      </h3>

      {/* Voice selector dropdown */}
      <div className="relative">
        <label className="text-xs text-zinc-500 mb-1.5 block">Voice</label>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 transition-all text-left"
        >
          <span className="text-2xl">{selected.avatar}</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white">{selected.name}</p>
            <p className="text-xs text-zinc-500">{selected.language} · {selected.region}</p>
          </div>
          <ChevronDown size={14} className={`text-zinc-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {dropdownOpen && (
          <div className="absolute z-50 top-full mt-2 w-full rounded-xl bg-[#111118] border border-white/[0.08] shadow-2xl shadow-black/50 overflow-hidden backdrop-blur-xl max-h-64 overflow-y-auto">
            {VOICES.map((voice) => (
              <button
                key={voice.id}
                onClick={() => {
                  setSelectedVoice(voice.id);
                  setDropdownOpen(false);
                }}
                className={`w-full flex items-center gap-3 p-3 hover:bg-white/[0.04] transition-all text-left ${voice.id === selectedVoice ? 'bg-violet-500/10' : ''}`}
              >
                <span className="text-2xl">{voice.avatar}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{voice.name}</p>
                  <p className="text-xs text-zinc-500">{voice.description} · {voice.region}</p>
                </div>
                {voice.id === selectedVoice && <CheckCircle2 size={14} className="text-violet-400 shrink-0" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Speed slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs text-zinc-500">Speed</label>
          <span className="text-xs font-mono text-white">{speed.toFixed(1)}x</span>
        </div>
        <input
          type="range"
          min={0.5}
          max={2}
          step={0.1}
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          className="w-full accent-violet-500"
        />
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-zinc-600">0.5x</span>
          <span className="text-[10px] text-zinc-600">2.0x</span>
        </div>
      </div>

      {/* Emotion selector */}
      <div>
        <label className="text-xs text-zinc-500 mb-2 block">Emotion</label>
        <div className="grid grid-cols-3 gap-2">
          {['neutral', 'happy', 'sad', 'excited', 'calm', 'angry'].map((emo) => (
            <button
              key={emo}
              onClick={() => setEmotion(emo)}
              className={`px-3 py-2 rounded-lg text-xs font-medium capitalize transition-all ${
                emotion === emo
                  ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                  : 'bg-white/[0.03] text-zinc-500 border border-white/[0.06] hover:text-white hover:border-white/10'
              }`}
            >
              {emo}
            </button>
          ))}
        </div>
      </div>

      {/* Pitch slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs text-zinc-500">Pitch</label>
          <span className="text-xs font-mono text-white">{pitch > 0 ? `+${pitch}` : pitch}</span>
        </div>
        <input
          type="range"
          min={-10}
          max={10}
          step={1}
          value={pitch}
          onChange={(e) => setPitch(parseInt(e.target.value))}
          className="w-full accent-violet-500"
        />
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-zinc-600">-10</span>
          <span className="text-[10px] text-zinc-600">+10</span>
        </div>
      </div>

      {/* Apply to all */}
      <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-violet-600/80 to-cyan-500/80 text-white text-sm font-medium hover:opacity-90 transition-all">
        <CheckCircle2 size={14} />
        Apply to All Sections
      </button>
    </div>
  );
}

/* ─── Right Panel: Music Tab ─── */

function MusicTab() {
  const [selectedTrack, setSelectedTrack] = useState<string | null>('upbeat');
  const [volume, setVolume] = useState(50);
  const [autoBeatSync, setAutoBeatSync] = useState(false);

  return (
    <div className="space-y-5">
      <h3 className="text-sm font-semibold text-white flex items-center gap-2">
        <Music size={14} className="text-emerald-400" />
        Background Music
      </h3>

      {/* Music tracks list */}
      <div className="space-y-2">
        {MUSIC_TRACKS.map((track) => (
          <button
            key={track.id}
            onClick={() => setSelectedTrack(track.id === selectedTrack ? null : track.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
              selectedTrack === track.id
                ? 'bg-emerald-500/10 border-emerald-500/30'
                : 'bg-white/[0.03] border-white/[0.06] hover:border-white/10'
            }`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
              selectedTrack === track.id ? 'bg-emerald-500/20' : 'bg-white/5'
            }`}>
              <Music size={16} className={selectedTrack === track.id ? 'text-emerald-400' : 'text-zinc-500'} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white">{track.name}</p>
              <p className="text-xs text-zinc-500">{track.mood} · {track.duration}</p>
            </div>
            {selectedTrack === track.id && <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />}
          </button>
        ))}
      </div>

      {/* Volume slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs text-zinc-500">Volume</label>
          <span className="text-xs font-mono text-white">{volume}%</span>
        </div>
        <div className="flex items-center gap-2">
          <Volume2 size={14} className="text-zinc-500 shrink-0" />
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={volume}
            onChange={(e) => setVolume(parseInt(e.target.value))}
            className="flex-1 accent-emerald-500"
          />
        </div>
      </div>

      {/* Auto beat sync toggle */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
        <div>
          <p className="text-sm font-medium text-white">Auto Beat Sync</p>
          <p className="text-xs text-zinc-500">Sync video cuts to music beats</p>
        </div>
        <button
          onClick={() => setAutoBeatSync(!autoBeatSync)}
          className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${
            autoBeatSync ? 'bg-emerald-500' : 'bg-white/10'
          }`}
        >
          <div
            className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
              autoBeatSync ? 'translate-x-5' : 'translate-x-0.5'
            }`}
          />
        </button>
      </div>

      {/* No music option */}
      {selectedTrack === null && (
        <p className="text-xs text-zinc-500 text-center py-2">No background music selected</p>
      )}
    </div>
  );
}

/* ─── Right Panel: Captions Tab ─── */

function CaptionsTab() {
  const [selectedStyle, setSelectedStyle] = useState('modern');
  const [fontSize, setFontSize] = useState(24);
  const [position, setPosition] = useState('bottom');
  const [burnIn, setBurnIn] = useState(false);

  return (
    <div className="space-y-5">
      <h3 className="text-sm font-semibold text-white flex items-center gap-2">
        <Type size={14} className="text-amber-400" />
        Captions
      </h3>

      {/* Style presets */}
      <div>
        <label className="text-xs text-zinc-500 mb-2 block">Style Preset</label>
        <div className="grid grid-cols-2 gap-2">
          {CAPTION_STYLES.map((style) => (
            <button
              key={style.id}
              onClick={() => setSelectedStyle(style.id)}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                selectedStyle === style.id
                  ? 'bg-amber-500/10 border-amber-500/30'
                  : 'bg-white/[0.03] border-white/[0.06] hover:border-white/10'
              }`}
            >
              <span
                className="text-lg"
                style={{ fontFamily: style.font, fontWeight: style.weight }}
              >
                {style.preview}
              </span>
              <span className="text-xs font-medium text-white">{style.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Font size slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs text-zinc-500">Font Size</label>
          <span className="text-xs font-mono text-white">{fontSize}px</span>
        </div>
        <input
          type="range"
          min={14}
          max={48}
          step={1}
          value={fontSize}
          onChange={(e) => setFontSize(parseInt(e.target.value))}
          className="w-full accent-amber-500"
        />
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-zinc-600">14px</span>
          <span className="text-[10px] text-zinc-600">48px</span>
        </div>
      </div>

      {/* Position selector */}
      <div>
        <label className="text-xs text-zinc-500 mb-2 block">Position</label>
        <div className="grid grid-cols-3 gap-2">
          {['top', 'middle', 'bottom'].map((pos) => (
            <button
              key={pos}
              onClick={() => setPosition(pos)}
              className={`px-3 py-2 rounded-lg text-xs font-medium capitalize transition-all ${
                position === pos
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-white/[0.03] text-zinc-500 border border-white/[0.06] hover:text-white hover:border-white/10'
              }`}
            >
              {pos}
            </button>
          ))}
        </div>
      </div>

      {/* Burn-in captions toggle */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
        <div>
          <p className="text-sm font-medium text-white">Burn-in Captions</p>
          <p className="text-xs text-zinc-500">Embed captions directly into video</p>
        </div>
        <button
          onClick={() => setBurnIn(!burnIn)}
          className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${
            burnIn ? 'bg-amber-500' : 'bg-white/10'
          }`}
        >
          <div
            className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
              burnIn ? 'translate-x-5' : 'translate-x-0.5'
            }`}
          />
        </button>
      </div>
    </div>
  );
}

/* ─── Right Panel: Brand Tab ─── */

function BrandTab() {
  const [primaryColor, setPrimaryColor] = useState('#8B5CF6');
  const [secondaryColor, setSecondaryColor] = useState('#06B6D4');
  const [selectedFont, setSelectedFont] = useState('Inter');
  const [watermark, setWatermark] = useState(false);
  const [logoUploaded, setLogoUploaded] = useState(false);
  const [introUploaded, setIntroUploaded] = useState(false);
  const [outroUploaded, setOutroUploaded] = useState(false);
  const [fontDropdown, setFontDropdown] = useState(false);

  return (
    <div className="space-y-5">
      <h3 className="text-sm font-semibold text-white flex items-center gap-2">
        <Palette size={14} className="text-pink-400" />
        Brand Kit
      </h3>

      {/* Logo upload */}
      <div>
        <label className="text-xs text-zinc-500 mb-2 block">Logo</label>
        <button
          onClick={() => setLogoUploaded(!logoUploaded)}
          className="w-full flex flex-col items-center justify-center gap-2 p-6 rounded-xl border-2 border-dashed border-white/10 hover:border-white/20 transition-all bg-white/[0.02]"
        >
          {logoUploaded ? (
            <>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                <ImageIcon size={20} className="text-white" />
              </div>
              <span className="text-xs text-emerald-400">logo.png uploaded ✓</span>
              <span className="text-[10px] text-zinc-600">Click to replace</span>
            </>
          ) : (
            <>
              <Upload size={20} className="text-zinc-500" />
              <span className="text-xs text-zinc-400">Upload logo</span>
              <span className="text-[10px] text-zinc-600">PNG, SVG · max 2MB</span>
            </>
          )}
        </button>
      </div>

      {/* Color pickers */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-zinc-500 mb-2 block">Primary Color</label>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
            />
            <span className="text-xs font-mono text-white">{primaryColor}</span>
          </div>
        </div>
        <div>
          <label className="text-xs text-zinc-500 mb-2 block">Secondary Color</label>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <input
              type="color"
              value={secondaryColor}
              onChange={(e) => setSecondaryColor(e.target.value)}
              className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
            />
            <span className="text-xs font-mono text-white">{secondaryColor}</span>
          </div>
        </div>
      </div>

      {/* Font selector */}
      <div>
        <label className="text-xs text-zinc-500 mb-2 block">Brand Font</label>
        <div className="relative">
          <button
            onClick={() => setFontDropdown(!fontDropdown)}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 transition-all text-left"
          >
            <span className="text-sm text-white" style={{ fontFamily: selectedFont }}>{selectedFont}</span>
            <ChevronDown size={14} className={`text-zinc-500 transition-transform ${fontDropdown ? 'rotate-180' : ''}`} />
          </button>
          {fontDropdown && (
            <div className="absolute z-50 top-full mt-2 w-full rounded-xl bg-[#111118] border border-white/[0.08] shadow-2xl overflow-hidden">
              {FONT_OPTIONS.map((font) => (
                <button
                  key={font}
                  onClick={() => {
                    setSelectedFont(font);
                    setFontDropdown(false);
                  }}
                  className={`w-full px-3 py-2 text-sm text-left hover:bg-white/[0.04] transition-all ${font === selectedFont ? 'bg-pink-500/10 text-pink-300' : 'text-white'}`}
                  style={{ fontFamily: font }}
                >
                  {font}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Watermark toggle */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
        <div>
          <p className="text-sm font-medium text-white">Watermark</p>
          <p className="text-xs text-zinc-500">Show logo in corner</p>
        </div>
        <button
          onClick={() => setWatermark(!watermark)}
          className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${
            watermark ? 'bg-pink-500' : 'bg-white/10'
          }`}
        >
          <div
            className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
              watermark ? 'translate-x-5' : 'translate-x-0.5'
            }`}
          />
        </button>
      </div>

      {/* Intro / Outro upload */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-zinc-500 mb-2 block">Intro</label>
          <button
            onClick={() => setIntroUploaded(!introUploaded)}
            className="w-full flex flex-col items-center justify-center gap-1 p-4 rounded-xl border-2 border-dashed border-white/10 hover:border-white/20 transition-all bg-white/[0.02]"
          >
            {introUploaded ? (
              <>
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span className="text-[10px] text-emerald-400">intro.mp4</span>
              </>
            ) : (
              <>
                <Upload size={14} className="text-zinc-500" />
                <span className="text-[10px] text-zinc-500">Upload</span>
              </>
            )}
          </button>
        </div>
        <div>
          <label className="text-xs text-zinc-500 mb-2 block">Outro</label>
          <button
            onClick={() => setOutroUploaded(!outroUploaded)}
            className="w-full flex flex-col items-center justify-center gap-1 p-4 rounded-xl border-2 border-dashed border-white/10 hover:border-white/20 transition-all bg-white/[0.02]"
          >
            {outroUploaded ? (
              <>
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span className="text-[10px] text-emerald-400">outro.mp4</span>
              </>
            ) : (
              <>
                <Upload size={14} className="text-zinc-500" />
                <span className="text-[10px] text-zinc-500">Upload</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Bottom: Transcript Editor ─── */

function TranscriptEditor({
  paragraphs,
  onUpdateParagraph,
  onDeleteParagraph,
  onAddPause,
  onRegenerateSection,
  activeId,
  setActiveId,
  currentTime,
}: {
  paragraphs: TranscriptParagraph[];
  onUpdateParagraph: (id: string, text: string) => void;
  onDeleteParagraph: (id: string) => void;
  onAddPause: (afterId: string) => void;
  onRegenerateSection: (id: string) => void;
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  currentTime: number;
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3 shrink-0">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Type size={14} className="text-violet-400" />
          Transcript Editor
        </h3>
        <span className="text-xs text-zinc-500">{paragraphs.length} paragraphs</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {paragraphs.map((para, idx) => {
          const isActive = activeId === para.id;
          const isCurrent = currentTime >= para.startTime && currentTime < para.endTime;

          return (
            <div key={para.id}>
              {/* Add Pause button between paragraphs */}
              {idx > 0 && (
                <button
                  onClick={() => onAddPause(paragraphs[idx - 1].id)}
                  className="w-full flex items-center justify-center gap-1.5 py-1 text-[10px] text-zinc-600 hover:text-violet-400 transition-colors group"
                >
                  <Plus size={10} />
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">Add Pause</span>
                </button>
              )}

              <div
                onClick={() => setActiveId(para.id)}
                className={`group flex gap-3 p-3 rounded-xl transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-violet-500/10 border-violet-500/30'
                    : isCurrent
                    ? 'bg-cyan-500/5 border-cyan-500/20'
                    : 'border-transparent hover:bg-white/[0.02]'
                }`}
              >
                {/* Timestamp + speaker */}
                <div className="shrink-0 w-20 flex flex-col gap-1">
                  <span className="text-xs font-mono text-violet-400">{formatTime(para.startTime)}</span>
                  <span className="text-[10px] text-zinc-500 truncate">{para.speaker}</span>
                </div>

                {/* Editable text */}
                <textarea
                  value={para.text}
                  onChange={(e) => onUpdateParagraph(para.id, e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && e.currentTarget.selectionStart === 0 && e.currentTarget.selectionEnd === 0) {
                      // Delete paragraph if backspace at start
                      e.preventDefault();
                      onDeleteParagraph(para.id);
                    }
                  }}
                  className="flex-1 bg-transparent text-sm text-white/80 resize-none outline-none leading-relaxed min-h-[40px] placeholder:text-zinc-700"
                  rows={2}
                  placeholder="Type transcript text..."
                />

                {/* Actions */}
                <div className="flex flex-col gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRegenerateSection(para.id);
                    }}
                    className="p-1 rounded-lg hover:bg-violet-500/10 text-zinc-500 hover:text-violet-400 transition-all"
                    title="Regenerate Section"
                  >
                    <RefreshCw size={12} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteParagraph(para.id);
                    }}
                    className="p-1 rounded-lg hover:bg-red-500/10 text-zinc-500 hover:text-red-400 transition-all"
                    title="Delete"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Add Pause at end */}
        <button
          onClick={() => onAddPause(paragraphs[paragraphs.length - 1]?.id ?? '')}
          className="w-full flex items-center justify-center gap-1.5 py-2 text-xs text-zinc-600 hover:text-violet-400 transition-colors"
        >
          <Plus size={12} />
          Add Paragraph
        </button>
      </div>
    </div>
  );
}

/* ──────────────── Main Editor Page ──────────────── */

type RightTab = 'voice' | 'music' | 'captions' | 'brand';

export default function EditorPage() {
  const params = useParams();
  const router = useRouter();
  const _id = params.id as string;

  const [projectTitle, setProjectTitle] = useState('Myanmar Travel Documentary — Bagan Sunrise');
  const [transcript, setTranscript] = useState<TranscriptParagraph[]>(INITIAL_TRANSCRIPT);
  const [activeLineId, setActiveLineId] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rightTab, setRightTab] = useState<RightTab>('voice');
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportComplete, setExportComplete] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [regeneratingId, setRegeneratingId] = useState<string | null>(null);

  const playIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Playback ───────────────────────────────────────

  const stopPlayback = useCallback(() => {
    if (playIntervalRef.current) {
      clearInterval(playIntervalRef.current);
      playIntervalRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const startPlayback = useCallback(() => {
    stopPlayback();
    setIsPlaying(true);
    playIntervalRef.current = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= duration) {
          stopPlayback();
          return duration;
        }
        return +(prev + 0.1).toFixed(1);
      });
    }, 100);
  }, [duration, stopPlayback]);

  useEffect(() => {
    return () => stopPlayback();
  }, [stopPlayback]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopPlayback();
    } else {
      if (currentTime >= duration) setCurrentTime(0);
      startPlayback();
    }
  };

  const handleSeek = (time: number) => {
    setCurrentTime(Math.max(0, Math.min(duration, time)));
  };

  // ── Transcript Actions ─────────────────────────────

  const handleUpdateParagraph = (id: string, text: string) => {
    setTranscript((prev) => prev.map((p) => (p.id === id ? { ...p, text } : p)));
  };

  const handleDeleteParagraph = (id: string) => {
    setTranscript((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddPause = (afterId: string) => {
    const idx = transcript.findIndex((p) => p.id === afterId);
    if (idx === -1) return;
    const after = transcript[idx];
    const newPara: TranscriptParagraph = {
      id: `p-${Date.now()}`,
      startTime: after.endTime,
      endTime: after.endTime + 2,
      speaker: after.speaker,
      text: '',
    };
    setTranscript((prev) => [...prev.slice(0, idx + 1), newPara, ...prev.slice(idx + 1)]);
    setActiveLineId(newPara.id);
  };

  const handleRegenerateSection = (id: string) => {
    setRegeneratingId(id);
    setTimeout(() => setRegeneratingId(null), 1500);
  };

  // ── Save ───────────────────────────────────────────

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  // ── Export ─────────────────────────────────────────

  const handleExport = () => {
    setShowExportModal(true);
    setIsExporting(true);
    setExportProgress(0);
    setExportComplete(false);

    const totalSteps = 20;
    let step = 0;
    const exportInterval = setInterval(() => {
      step++;
      setExportProgress(Math.round((step / totalSteps) * 100));
      if (step >= totalSteps) {
        clearInterval(exportInterval);
        setIsExporting(false);
        setExportComplete(true);
      }
    }, 150);
  };

  const dismissExport = () => {
    setShowExportModal(false);
    setExportProgress(0);
    setExportComplete(false);
  };

  // ── Tab config ─────────────────────────────────────

  const tabs: { id: RightTab; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'voice',    label: 'Voice',    icon: <Mic size={13} />,     color: 'text-cyan-400 border-cyan-500' },
    { id: 'music',    label: 'Music',    icon: <Music size={13} />,   color: 'text-emerald-400 border-emerald-500' },
    { id: 'captions', label: 'Captions', icon: <Type size={13} />,    color: 'text-amber-400 border-amber-500' },
    { id: 'brand',    label: 'Brand',    icon: <Palette size={13} />, color: 'text-pink-400 border-pink-500' },
  ];

  return (
    <div className="flex flex-col h-screen bg-[#040407] overflow-hidden">
      {/* ── Top Bar ── */}
      <header className="h-14 flex items-center gap-3 px-4 border-b border-white/5 bg-[#0a0a10]/80 backdrop-blur-xl shrink-0 z-30">
        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors shrink-0"
        >
          <ArrowLeft size={18} />
        </button>

        <div className="flex-1 flex items-center gap-2 min-w-0">
          <input
            type="text"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            className="bg-transparent text-sm font-medium text-white outline-none border-b border-transparent hover:border-white/10 focus:border-violet-500/50 transition-colors min-w-0 flex-1"
            placeholder="Project title..."
          />
          <span className="text-xs text-zinc-600 shrink-0">— Editor</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-zinc-400 hover:text-white transition-all"
          >
            {isSaving ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
            {isSaving ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-xs font-medium hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-violet-500/20"
          >
            <Download size={12} />
            Export
          </button>
        </div>
      </header>

      {/* ── Main Content: Split View ── */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* LEFT PANEL (60%) — Video Preview + Transcript */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden" style={{ flexBasis: '60%' }}>
          {/* Video Preview */}
          <div className="p-4 pb-2 shrink-0">
            <VideoPreview
              currentTime={currentTime}
              duration={duration}
              isPlaying={isPlaying}
              onTogglePlay={handleTogglePlay}
              onSeek={handleSeek}
            />
          </div>

          {/* Transcript Editor (bottom of left panel) */}
          <div className="flex-1 p-4 pt-2 min-h-0 overflow-hidden border-t border-white/5">
            <TranscriptEditor
              paragraphs={transcript}
              onUpdateParagraph={handleUpdateParagraph}
              onDeleteParagraph={handleDeleteParagraph}
              onAddPause={handleAddPause}
              onRegenerateSection={handleRegenerateSection}
              activeId={activeLineId}
              setActiveId={setActiveLineId}
              currentTime={currentTime}
            />
          </div>
        </div>

        {/* RIGHT PANEL (40%) — Tabbed Sidebar */}
        <div
          className="border-t lg:border-t-0 lg:border-l border-white/5 bg-[#0a0a10]/50 backdrop-blur-xl flex flex-col shrink-0 overflow-hidden"
          style={{ flexBasis: '40%', maxWidth: 480 }}
        >
          {/* Tab buttons */}
          <div className="flex border-b border-white/5 shrink-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setRightTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-medium transition-all ${
                  rightTab === tab.id
                    ? `${tab.color} border-b-2`
                    : 'text-zinc-500 hover:text-zinc-300 border-b-2 border-transparent'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-y-auto p-4">
            {rightTab === 'voice' && <VoiceTab />}
            {rightTab === 'music' && <MusicTab />}
            {rightTab === 'captions' && <CaptionsTab />}
            {rightTab === 'brand' && <BrandTab />}
          </div>
        </div>
      </div>

      {/* ── Bottom Timeline ── */}
      <TimelineBar
        duration={duration}
        currentTime={currentTime}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onSeek={handleSeek}
        chapters={CHAPTERS}
      />

      {/* ── Regenerating Toast ── */}
      {regeneratingId && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-4 py-2 rounded-xl bg-[#14141E] border border-white/[0.08] shadow-2xl">
          <Loader2 size={14} className="animate-spin text-violet-400" />
          <span className="text-xs text-white">Regenerating section...</span>
        </div>
      )}

      {/* ── Export Modal ── */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={exportComplete ? dismissExport : undefined}
          />
          <div className="relative rounded-2xl border border-white/[0.08] bg-[#14141E] shadow-2xl p-8 max-w-sm w-full z-10 text-center">
            {exportComplete ? (
              <>
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                  <CheckCircle2 size={32} className="text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold mb-1 text-white">Export Complete!</h3>
                <p className="text-sm text-zinc-400 mb-2">Your video has been exported as MP4 (1080p)</p>
                <p className="text-xs text-zinc-500 font-mono mb-6">vidora_export_{Date.now()}.mp4</p>
                <button
                  onClick={dismissExport}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-semibold hover:opacity-90 transition-all"
                >
                  <Download size={14} className="inline mr-1.5" />
                  Download Video
                </button>
              </>
            ) : (
              <>
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-violet-500/10 flex items-center justify-center">
                  {isExporting ? (
                    <Loader2 size={32} className="text-violet-400 animate-spin" />
                  ) : (
                    <Download size={32} className="text-violet-400" />
                  )}
                </div>
                <h3 className="text-lg font-bold mb-1 text-white">
                  {isExporting ? 'Exporting...' : 'Preparing Export'}
                </h3>
                <p className="text-sm text-zinc-400 mb-4">
                  {isExporting
                    ? exportProgress < 50
                      ? 'Rendering video frames...'
                      : exportProgress < 80
                      ? 'Encoding audio track...'
                      : 'Finalizing export...'
                    : 'Starting video export...'}
                </p>
                <div className="w-full h-2 rounded-full bg-white/[0.05] overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-300"
                    style={{ width: `${exportProgress}%` }}
                  />
                </div>
                <p className="text-xs text-zinc-500 font-mono">{exportProgress}%</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
