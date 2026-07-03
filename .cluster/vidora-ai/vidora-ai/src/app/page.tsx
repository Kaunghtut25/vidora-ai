'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

/* ═══════════════════════════════════════════
   ICONS
   ═══════════════════════════════════════════ */
function PlayIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>;
}
function SparkIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"/></svg>;
}
function ChipIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244H21.75"/></svg>;
}
function ShieldIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>;
}
function BoltIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/></svg>;
}
function WandIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"/></svg>;
}
function CheckIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>;
}
function ArrowRightIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>;
}
function SearchIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>;
}
function DownloadIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/></svg>;
}

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const NAV_LINKS = [
  { label: 'Features', href: '/features' },
  { label: 'Showcase', href: '/showcase' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
];

const FEATURES = [
  {
    icon: SparkIcon, title: 'AI Video Production',
    desc: '4 AI agents work in sequence — HKUDS analyzes your footage, FireRed writes the script, video-use cuts & edits, LTX renders the final masterpiece.',
    gradient: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/30'
  },
  {
    icon: ChipIcon, title: 'Multi-Agent CrewAI Pipeline',
    desc: 'CrewAI orchestrates 4 specialized agents powered by Ollama (free, local LLM). Sequential processing with self-evaluation at every stage.',
    gradient: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/30'
  },
  {
    icon: WandIcon, title: 'Smart Editing Suite',
    desc: 'Jump cuts, 30ms audio fades, UPPERCASE subtitle burning, Ken Burns effects, cinematic color grading — all automated by AI agents.',
    gradient: 'from-orange-500/20 to-red-500/20', border: 'border-orange-500/30'
  },
  {
    icon: ShieldIcon, title: '100% Free & Open Source',
    desc: 'No API keys, no credits, no subscriptions. Powered entirely by free tools: Ollama, FFmpeg, yt-dlp, Edge TTS. Runs on your own machine.',
    gradient: 'from-green-500/20 to-emerald-500/20', border: 'border-green-500/30'
  },
  {
    icon: DownloadIcon, title: 'YouTube Downloader Built-in',
    desc: 'Search, preview formats, download video/audio directly. Background processing with history. Perfect for content creators.',
    gradient: 'from-red-500/20 to-pink-500/20', border: 'border-red-500/30'
  },
  {
    icon: BoltIcon, title: '24 Professional AI Voices',
    desc: 'Edge TTS powered — 20 English voices (10 male, 10 female) with natural prosody. Burn narrations directly into your videos.',
    gradient: 'from-yellow-500/20 to-amber-500/20', border: 'border-yellow-500/30'
  },
];

const WORKFLOW_STEPS = [
  { num: '01', title: 'Upload Video', desc: 'Drop your raw footage or paste a YouTube link', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { num: '02', title: 'AI Analyzes', desc: 'HKUDS VideoAgent builds temporal memory & transcript', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { num: '03', title: 'Script Generated', desc: 'FireRed writes the narrative with beat-synced storyboard', color: 'text-pink-400', bg: 'bg-pink-500/10' },
  { num: '04', title: 'Auto-Edited', desc: 'video-use cuts, fades, subtitles — with self-evaluation', color: 'text-orange-400', bg: 'bg-orange-500/10' },
  { num: '05', title: 'Rendered & Ready', desc: 'LTX Engine outputs 1080p H.264 with cinematic polish', color: 'text-green-400', bg: 'bg-green-500/10' },
];

const SHOWCASE = [
  { title: 'Movie Recap — Burmese Voiceover', tags: ['Burmese TTS', 'Scene Detection', 'Subtitle Burn'], views: '2.4K', duration: '0:34', gradient: 'from-orange-500 to-red-600' },
  { title: 'Product Review Edit', tags: ['Jump Cuts', 'Music Sync', 'Color Grade'], views: '5.1K', duration: '2:15', gradient: 'from-blue-500 to-purple-600' },
  { title: 'Tutorial with AI Voiceover', tags: ['Edge TTS', 'Screen Record', 'Chapter Markers'], views: '8.7K', duration: '4:30', gradient: 'from-green-500 to-teal-600' },
  { title: 'Social Media Reel', tags: ['9:16 Crop', 'Captions', 'Trending Audio'], views: '12K', duration: '0:45', gradient: 'from-pink-500 to-rose-600' },
  { title: 'Documentary Edit', tags: ['4-Agent Pipeline', 'Color Grading', 'Ken Burns'], views: '3.2K', duration: '6:20', gradient: 'from-amber-500 to-yellow-600' },
  { title: 'Podcast to Video', tags: ['Audio to Visual', 'Waveform', 'Thumbnail'], views: '1.8K', duration: '12:00', gradient: 'from-indigo-500 to-violet-600' },
];

const PRICING_TIERS = [
  { name: 'Free', price: '$0', period: 'forever', desc: 'Everything included. No limits.', features: ['4-agent AI pipeline', 'YouTube downloader', '24 AI voices', '4K export', 'Self-hosted', 'Community support'], cta: 'Start Free', href: '/create', popular: true },
  { name: 'Codespace', price: '$0', period: 'forever', desc: 'Run in the cloud. Zero setup.', features: ['GitHub Codespace deploy', 'Pre-configured env', 'Auto-updates', 'Public URL', 'Always online', 'Community support'], cta: 'Deploy Now', href: '/help' },
];

const STATS = [
  { value: '4', label: 'AI Agents', suffix: '' },
  { value: '24', label: 'Voices', suffix: '' },
  { value: '4K', label: 'Export', suffix: '' },
  { value: '$0', label: 'Cost', suffix: '' },
];

/* ═══════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════ */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'border-b border-white/[0.06] bg-[#0a0a0a]/85 backdrop-blur-2xl' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF6B35] to-[#FFB627] flex items-center justify-center font-bold text-sm shadow-lg shadow-orange-500/25">
              V
            </div>
            <span className="font-bold text-lg tracking-tight">Vidora</span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(l => (
              <Link key={l.label} href={l.href} className="px-3 py-2 text-sm text-white/60 hover:text-white rounded-lg hover:bg-white/[0.04] transition-all">
                {l.label}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="text-sm text-white/60 hover:text-white transition-colors">Sign In</Link>
            <Link href="/create" className="px-4 py-2 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-orange-500/25">
              Create Video
            </Link>
          </div>
          <button className="md:hidden p-2 text-white/60" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden border-t border-white/[0.06] bg-[#0a0a0a]/95 backdrop-blur-2xl">
          <div className="px-4 py-4 space-y-2">
            {NAV_LINKS.map(l => (
              <Link key={l.label} href={l.href} className="block px-3 py-2 text-white/70 hover:text-white rounded-lg">
                {l.label}
              </Link>
            ))}
            <div className="pt-2 flex gap-3">
              <Link href="/login" className="flex-1 text-center px-4 py-2 border border-white/10 text-white/70 rounded-lg text-sm">Sign In</Link>
              <Link href="/create" className="flex-1 text-center px-4 py-2 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white rounded-lg text-sm font-medium">Create</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full text-sm text-orange-400 mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            4-Agent AI Pipeline Now Live
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight mb-6">
            <span className="text-white">Your</span>{' '}
            <span className="bg-gradient-to-r from-[#FF6B35] via-[#F7931E] to-[#FFB627] bg-clip-text text-transparent">
              AI Video Production
            </span>{' '}
            <span className="text-white">Studio</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            Four AI agents work together — HKUDS analyzes, FireRed scripts, video-use edits, LTX renders.
            Powered by free, open-source tools. No API keys needed.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/create" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-xl shadow-orange-500/25 flex items-center justify-center gap-3 group">
              <PlayIcon className="w-5 h-5" />
              Start Creating Free
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/showcase" className="w-full sm:w-auto px-8 py-4 bg-white/[0.03] border border-white/10 text-white/80 font-medium rounded-xl hover:bg-white/[0.06] hover:border-white/20 transition-all">
              View Showcase
            </Link>
          </div>

          {/* Pipeline Preview */}
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 sm:gap-3 justify-center flex-wrap">
              {[
                { emoji: '🔍', name: 'HKUDS', role: 'Analyze' },
                { emoji: '✍️', name: 'FireRed', role: 'Script' },
                { emoji: '✂️', name: 'video-use', role: 'Edit' },
                { emoji: '🎨', name: 'LTX', role: 'Render' },
              ].map((a, i) => (
                <div key={a.name} className="flex items-center">
                  <div className="px-3 sm:px-4 py-2 sm:py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-center min-w-[80px] sm:min-w-[100px]">
                    <div className="text-lg sm:text-xl mb-1">{a.emoji}</div>
                    <div className="text-[10px] sm:text-xs text-white/60 font-medium">{a.name}</div>
                    <div className="text-[9px] sm:text-[10px] text-white/30">{a.role}</div>
                  </div>
                  {i < 3 && (
                    <div className="mx-1 sm:mx-2 text-white/20">
                      <ArrowRightIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 max-w-xl mx-auto">
            {STATS.map(s => (
              <div key={s.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#FF6B35] to-[#FFB627] bg-clip-text text-transparent">
                  {s.suffix}{s.value}
                </div>
                <div className="text-xs text-white/40 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="py-24 lg:py-32 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Everything You Need</h2>
          <p className="text-white/40 max-w-xl mx-auto">A complete video production pipeline powered by AI agents and open-source tools.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(f => (
            <div key={f.title} className={`group relative p-6 rounded-2xl bg-gradient-to-br ${f.gradient} border ${f.border} hover:scale-[1.02] transition-all duration-300`}>
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-white/80" />
              </div>
              <h3 className="text-white font-semibold mb-2">{f.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Workflow() {
  return (
    <section className="py-24 lg:py-32 border-t border-white/[0.04] bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-white/40 max-w-xl mx-auto">Five steps from raw footage to polished video — all automated by AI agents.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {WORKFLOW_STEPS.map((s, i) => (
            <div key={s.num} className="relative group">
              <div className={`p-5 rounded-2xl ${s.bg} border border-white/[0.06] group-hover:border-white/[0.15] transition-all h-full`}>
                <div className={`text-2xl font-bold ${s.color} mb-3`}>{s.num}</div>
                <h3 className="text-white font-semibold text-sm mb-1.5">{s.title}</h3>
                <p className="text-white/35 text-xs leading-relaxed">{s.desc}</p>
              </div>
              {i < 4 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-white/10 text-xl z-10">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ShowcaseSection() {
  return (
    <section className="py-24 lg:py-32 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Recent Productions</h2>
            <p className="text-white/40">Videos created with the 4-agent pipeline</p>
          </div>
          <Link href="/showcase" className="hidden sm:flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
            View All <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SHOWCASE.map(item => (
            <div key={item.title} className="group relative rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.15] transition-all cursor-pointer">
              {/* Thumbnail */}
              <div className={`aspect-video bg-gradient-to-br ${item.gradient} flex items-center justify-center relative`}>
                <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                  <PlayIcon className="w-5 h-5 text-white ml-0.5" />
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-xs text-white/80 font-mono">
                  {item.duration}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-medium text-sm mb-2">{item.title}</h3>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {item.tags.map(t => (
                    <span key={t} className="px-2 py-0.5 bg-white/[0.04] border border-white/[0.06] rounded-lg text-[10px] text-white/40">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 text-[10px] text-white/30">
                  <span>👁 {item.views}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Link href="/showcase" className="text-sm text-orange-400 hover:text-orange-300">View All Productions →</Link>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section className="py-24 lg:py-32 border-t border-white/[0.04] bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Always Free</h2>
          <p className="text-white/40 max-w-xl mx-auto">No API keys. No credits. No subscriptions. Just free, open-source AI video production.</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {PRICING_TIERS.map(tier => (
            <div key={tier.name} className={`relative p-8 rounded-2xl border ${
              tier.popular ? 'border-[#FF6B35]/40 bg-[#FF6B35]/[0.02]' : 'border-white/[0.06] bg-white/[0.01]'
            }`}>
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white text-xs font-medium rounded-full">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-1">{tier.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">{tier.price}</span>
                  <span className="text-white/30 text-sm">/{tier.period}</span>
                </div>
                <p className="text-white/40 text-sm mt-2">{tier.desc}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {tier.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white/60">
                    <CheckIcon className="w-4 h-4 text-green-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href={tier.href} className="block text-center px-6 py-3 bg-white/[0.04] border border-white/10 text-white font-medium rounded-xl hover:bg-white/[0.08] transition-all text-sm">
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24 lg:py-32 border-t border-white/[0.04]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
          Ready to Let AI Edit Your Videos?
        </h2>
        <p className="text-lg text-white/40 max-w-2xl mx-auto mb-10">
          Drop your footage. Four AI agents handle the rest — analysis, scripting, editing, rendering.
          Open source. Free forever.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/create" className="px-8 py-4 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-xl shadow-orange-500/25">
            Start Creating — Free
          </Link>
          <Link href="/agent" className="px-8 py-4 bg-white/[0.03] border border-white/10 text-white/80 font-medium rounded-xl hover:bg-white/[0.06] transition-all">
            Meet the AI Agents
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF6B35] to-[#FFB627] flex items-center justify-center font-bold text-sm">V</div>
              <span className="font-bold text-lg">Vidora</span>
            </div>
            <p className="text-sm text-white/30 leading-relaxed">AI-powered video production studio. Open source. Free forever.</p>
          </div>
          <div>
            <h4 className="text-white/60 font-medium text-sm mb-4">Product</h4>
            <div className="space-y-2">
              {['Features', 'Showcase', 'Pricing', 'Blog', 'Agent'].map(l => (
                <Link key={l} href={`/${l.toLowerCase()}`} className="block text-sm text-white/30 hover:text-white/60 transition-colors">{l}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white/60 font-medium text-sm mb-4">Tools</h4>
            <div className="space-y-2">
              {['YouTube Downloader', 'AI Voice Generator', 'Video Editor', 'Script Writer'].map(l => (
                <Link key={l} href="/create" className="block text-sm text-white/30 hover:text-white/60 transition-colors">{l}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white/60 font-medium text-sm mb-4">Company</h4>
            <div className="space-y-2">
              {['About', 'Contact', 'Help', 'GitHub'].map(l => (
                <Link key={l} href={`/${l.toLowerCase()}`} className="block text-sm text-white/30 hover:text-white/60 transition-colors">{l}</Link>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">© 2026 Vidora AI · Built with CrewAI + Ollama + FFmpeg · Open Source</p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-white/20">Free · No API Keys · No Limits</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white antialiased">
      <Navbar />
      <Hero />
      <Features />
      <Workflow />
      <ShowcaseSection />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
