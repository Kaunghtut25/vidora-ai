'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Clock, Palette, Globe, Play, Pause, Gauge, Heart } from 'lucide-react';
import { useAppStore } from '@/store';
import { voices, burmeseVoices, emotions } from '@/data/voices';
import { playVoicePreview, stopVoicePreview } from '@/lib/voice-audio';
import type { Voice, VideoLength, VideoStyle, VoiceEmotion } from '@/types';

const englishVoices = voices.filter((v) => v.language === 'English');

const LENGTH_OPTIONS: { value: VideoLength; label: string }[] = [
  { value: 10, label: '10 min' },
  { value: 15, label: '15 min' },
  { value: 20, label: '20 min' },
  { value: 30, label: '30 min' },
  { value: 50, label: '50+ min' },
];

const STYLE_OPTIONS: { id: VideoStyle; label: string; desc: string }[] = [
  { id: 'Educational', label: 'Educational', desc: 'Informative, clear, structured lessons' },
  { id: 'Storytelling', label: 'Storytelling', desc: 'Narrative-driven, emotional, engaging' },
  { id: 'Corporate', label: 'Corporate', desc: 'Professional, polished, business tone' },
  { id: 'Vlog', label: 'Vlog', desc: 'Casual, conversational, personality-driven' },
  { id: 'Sales', label: 'Sales', desc: 'Persuasive, compelling, conversion-focused' },
];

const LANG_OPTIONS: { id: 'English' | 'Burmese' | 'Bilingual'; emoji: string; label: string; desc: string }[] = [
  { id: 'English', emoji: '🇬🇧', label: 'English', desc: 'Global audience, Western accent options' },
  { id: 'Burmese', emoji: '🇲🇲', label: 'Burmese', desc: 'Native Burmese voiceover & script' },
  { id: 'Bilingual', emoji: '🌐', label: 'Bilingual', desc: 'Mix English & Burmese in one video' },
];

// ── Voice Card ──
function VoiceCard({ voice, selected, onSelect }: { voice: Voice; selected: boolean; onSelect: (v: Voice) => void }) {
  const [playing, setPlaying] = useState(false);
  const playingRef = useRef(false);
  const isEnglish = voice.language === 'English';
  const badgeColor = isEnglish ? 'bg-blue-500/15 text-blue-300 border-blue-500/20' : 'bg-amber-500/15 text-amber-300 border-amber-500/20';

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (playingRef.current) {
        stopVoicePreview();
      }
    };
  }, []);

  const handlePreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (playingRef.current) {
      stopVoicePreview();
      playingRef.current = false;
      setPlaying(false);
      return;
    }
    playingRef.current = true;
    setPlaying(true);
    playVoicePreview(voice.id).finally(() => {
      playingRef.current = false;
      setPlaying(false);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      onClick={() => onSelect(voice)}
      className={`text-left w-full rounded-xl p-4 border transition-all duration-200 cursor-pointer
        focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500
        ${selected ? 'border-purple-500 bg-purple-500/5 ring-1 ring-purple-500/50' : 'border-white/5 glass hover:border-white/10 hover:bg-white/[0.03]'}`}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="text-2xl leading-none select-none">{voice.avatar}</div>
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-semibold text-sm truncate">{voice.name}</h4>
          <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-medium ${badgeColor}`}>{voice.region}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-medium ${badgeColor}`}>{voice.language}</span>
          </div>
        </div>
        {selected && <div className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0 shadow-[0_0_8px_rgba(168,85,247,0.6)]" />}
      </div>
      <p className="text-gray-400 text-sm line-clamp-1 mb-3">{voice.description}</p>
      {/* Play button */}
      <button
        onClick={handlePreview}
        className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border transition-colors
          ${playing ? 'bg-purple-500/20 border-purple-500/30 text-purple-400' : 'bg-white/5 border-white/10 text-gray-500 hover:text-white'}`}
      >
        {playing ? <Pause size={12} /> : <Play size={12} />}
        {playing ? 'Playing...' : 'Preview'}
      </button>
    </motion.div>
  );
}

export default function Step2Page() {
  const router = useRouter();

  const videoLength = useAppStore((s) => s.videoLength);
  const voiceSettings = useAppStore((s) => s.voiceSettings);
  const videoStyle = useAppStore((s) => s.videoStyle);
  const projectLanguage = useAppStore((s) => s.projectLanguage);
  const setVideoLength = useAppStore((s) => s.setVideoLength);
  const setVoiceSettings = useAppStore((s) => s.setVoiceSettings);
  const setVideoStyle = useAppStore((s) => s.setVideoStyle);
  const setProjectLanguage = useAppStore((s) => s.setProjectLanguage);
  const setWizardStep = useAppStore((s) => s.setWizardStep);

  const handleBack = () => {
    setWizardStep(0);
    router.push('/create/step1');
  };

  const handleGenerate = () => {
    setWizardStep(2);
    router.push('/create/step3');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="space-y-10"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Customize Your Video</h1>
        <p className="text-gray-400 text-sm mt-1">Choose video length, voice, style, and language</p>
      </div>

      {/* ── Video Length ── */}
      <section>
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center">
            <Clock size={16} className="text-purple-400" />
          </div>
          <h2 className="text-lg font-semibold text-white">Video Length</h2>
        </div>
        {/* Preset pills */}
        <div className="flex flex-wrap gap-2.5 mb-4">
          {LENGTH_OPTIONS.map((opt) => {
            const active = videoLength === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => setVideoLength(opt.value)}
                className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500
                  ${active ? 'bg-purple-600 text-white shadow-[0_0_16px_rgba(139,92,246,0.35)]' : 'glass text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
        {/* Custom slider */}
        <div className="p-5 rounded-xl glass space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400 font-medium">Custom length</span>
            <span className="text-lg font-bold text-white tabular-nums">{videoLength >= 50 ? '50+ min' : `${videoLength} min`}</span>
          </div>
          <input
            type="range"
            min={5}
            max={60}
            step={1}
            value={videoLength > 50 ? 50 : videoLength}
            onChange={(e) => {
              const val = Number(e.target.value);
              setVideoLength(val >= 50 ? 50 : val as VideoLength);
            }}
            className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/10 accent-purple-600
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500
              [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(139,92,246,0.5)] [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
            style={{
              background: `linear-gradient(to right, #8B5CF6 0%, #8B5CF6 ${((videoLength > 50 ? 50 : videoLength) - 5) / 55 * 100}%, rgba(255,255,255,0.1) ${((videoLength > 50 ? 50 : videoLength) - 5) / 55 * 100}%, rgba(255,255,255,0.1) 100%)`,
            }}
          />
          <div className="flex justify-between">
            {[5, 10, 15, 20, 25, 30, 40, 50, 60].map((m) => (
              <button key={m} onClick={() => setVideoLength(m >= 50 ? 50 : m as VideoLength)} className="text-[10px] text-gray-600 hover:text-gray-400 transition-colors">
                {m >= 50 ? '50+' : m}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Voice Selection ── */}
      <section>
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-white">Choose Your Voice</h2>
        </div>
        <p className="text-gray-400 text-sm mb-4">8 English + 4 Burmese premium AI voices</p>

        {/* English Voices */}
        <h3 className="text-base font-semibold text-white/80 mb-3">🇬🇧 English Voices</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {englishVoices.map((voice) => (
            <VoiceCard
              key={voice.id}
              voice={voice}
              selected={voiceSettings.voiceId === voice.id}
              onSelect={(v) => setVoiceSettings({ voiceId: v.id })}
            />
          ))}
        </div>

        {/* Burmese Voices */}
        <h3 className="text-base font-semibold text-white/80 mb-3">🇲🇲 Burmese Voices</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {burmeseVoices.map((voice) => (
            <VoiceCard
              key={voice.id}
              voice={voice}
              selected={voiceSettings.voiceId === voice.id}
              onSelect={(v) => setVoiceSettings({ voiceId: v.id })}
            />
          ))}
        </div>
      </section>

      {/* ── Speed & Emotion ── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Speed Slider */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center">
              <Gauge size={16} className="text-purple-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">Voice Speed</h2>
          </div>
          <div className="p-5 rounded-xl glass space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400 font-medium">Playback speed</span>
              <span className="text-lg font-bold text-white tabular-nums">{voiceSettings.speed.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min={0.8}
              max={1.4}
              step={0.1}
              value={voiceSettings.speed}
              onChange={(e) => setVoiceSettings({ speed: parseFloat(e.target.value) })}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/10 accent-purple-600
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500
                [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(139,92,246,0.5)] [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
              style={{
                background: `linear-gradient(to right, #8B5CF6 0%, #8B5CF6 ${((voiceSettings.speed - 0.8) / 0.6) * 100}%, rgba(255,255,255,0.1) ${((voiceSettings.speed - 0.8) / 0.6) * 100}%, rgba(255,255,255,0.1) 100%)`,
              }}
            />
            <div className="flex justify-between text-[10px] text-gray-600">
              <span>0.8x</span>
              <span>1.0x</span>
              <span>1.2x</span>
              <span>1.4x</span>
            </div>
          </div>
        </div>

        {/* Emotion Selector */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center">
              <Heart size={16} className="text-purple-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">Emotion</h2>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {emotions.map((emo: VoiceEmotion) => {
              const active = voiceSettings.emotion === emo;
              return (
                <button
                  key={emo}
                  onClick={() => setVoiceSettings({ emotion: emo })}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500
                    ${active ? 'bg-purple-600 text-white shadow-[0_0_16px_rgba(139,92,246,0.35)]' : 'glass text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                  {emo}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Video Style ── */}
      <section>
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center">
            <Palette size={16} className="text-purple-400" />
          </div>
          <h2 className="text-lg font-semibold text-white">Video Style</h2>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {STYLE_OPTIONS.map((opt) => {
            const active = videoStyle === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setVideoStyle(opt.id)}
                className={`relative px-5 py-3 rounded-xl text-left transition-all duration-200
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500
                  ${active ? 'bg-purple-600 text-white shadow-[0_0_16px_rgba(139,92,246,0.35)]' : 'glass text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                <span className="text-sm font-semibold block">{opt.label}</span>
                <span className={`text-xs mt-0.5 block leading-relaxed ${active ? 'text-purple-200' : 'text-gray-600'}`}>{opt.desc}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Language ── */}
      <section>
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center">
            <Globe size={16} className="text-purple-400" />
          </div>
          <h2 className="text-lg font-semibold text-white">Language</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {LANG_OPTIONS.map((opt) => {
            const active = projectLanguage === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setProjectLanguage(opt.id)}
                className={`relative flex flex-col items-start gap-2 p-4 rounded-xl border transition-all duration-200 text-left
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500
                  ${active ? 'border-purple-500 bg-purple-500/5 ring-1 ring-purple-500/50' : 'border-white/5 glass hover:border-white/10 hover:bg-white/[0.03]'}`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-2xl leading-none">{opt.emoji}</span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${active ? 'border-purple-500 bg-purple-500' : 'border-white/20'}`}>
                    {active && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">{opt.label}</h4>
                  <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">{opt.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Action Buttons ── */}
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200
            focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <button
          onClick={handleGenerate}
          className="flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold bg-purple-600 text-white hover:bg-purple-500
            shadow-[0_0_24px_rgba(139,92,246,0.3)] transition-all duration-200
            focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          Generate Video
          <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  );
}
