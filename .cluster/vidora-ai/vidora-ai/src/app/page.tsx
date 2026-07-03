'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { PriceDisplay, LOCATION } from '@/lib/currency';

/* ═══════════════════════════════════════════════
   ICONS — Premium SVG set
   ═══════════════════════════════════════════════ */
const I = {
  Play: ({ c = 'w-5 h-5' }) => <svg className={c} fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>,
  Arrow: ({ c = 'w-5 h-5' }) => <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>,
  Check: ({ c = 'w-5 h-5' }) => <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>,
  Spark: ({ c = 'w-5 h-5' }) => <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/></svg>,
  Eye: ({ c = 'w-5 h-5' }) => <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
  Script: ({ c = 'w-5 h-5' }) => <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>,
  Cut: ({ c = 'w-5 h-5' }) => <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.2M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.2m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664"/></svg>,
  Wand: ({ c = 'w-5 h-5' }) => <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"/></svg>,
  Shield: ({ c = 'w-5 h-5' }) => <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>,
  Cloud: ({ c = 'w-5 h-5' }) => <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"/></svg>,
  Star: ({ c = 'w-5 h-5' }) => <svg className={c} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  Zap: ({ c = 'w-5 h-5' }) => <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/></svg>,
  Globe: ({ c = 'w-5 h-5' }) => <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"/></svg>,
  Menu: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>,
};

/* ═══════ DATA ═══════ */
const NAV = [
  { label: 'Features', href: '/features' },
  { label: 'Showcase', href: '/showcase' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Agent', href: '/agent' },
];

const AGENTS = [
  { n: '01', name: 'HKUDS VideoAgent', role: 'Content Intelligence Engine', desc: 'Scans raw footage frame-by-frame. Detects scenes, objects, faces, and speech patterns. Builds rich temporal video memory with timestamped metadata.', icon: I.Eye, grad: 'from-violet-600 to-purple-600', glow: 'rgba(139,92,246,', tag: 'Computer Vision', tagColor: 'text-violet-400', tagBg: 'bg-violet-500/10' },
  { n: '02', name: 'FireRed-OpenStoryline', role: 'Creative Direction AI', desc: 'Generates rhythm-aware narratives synced to BPM. Writes emotional scripts with character arcs. Plans visual flow with professional storyboard output.', icon: I.Script, grad: 'from-fuchsia-600 to-pink-600', glow: 'rgba(192,38,211,', tag: 'Storytelling AI', tagColor: 'text-fuchsia-400', tagBg: 'bg-fuchsia-500/10' },
  { n: '03', name: 'video-use', role: 'Precision Editing Agent', desc: 'LLM-driven editor. Jump cuts at word boundaries. 30ms audio cross-fades. UPPERCASE subtitle burn. Self-evaluates & fixes issues autonomously.', icon: I.Cut, grad: 'from-cyan-600 to-teal-600', glow: 'rgba(6,182,212,', tag: 'LLM-Powered', tagColor: 'text-cyan-400', tagBg: 'bg-cyan-500/10' },
  { n: '04', name: 'LTX Engine', role: 'VFX & Render Pipeline', desc: 'AI-generated scene transitions. Cinematic color grading (teal & orange). H.264 1080p final encode. Professional-grade output ready for distribution.', icon: I.Wand, grad: 'from-emerald-600 to-green-600', glow: 'rgba(5,150,105,', tag: 'Studio Output', tagColor: 'text-emerald-400', tagBg: 'bg-emerald-500/10' },
];

const FEATURES = [
  { icon: I.Eye, title: 'AI Scene Analysis', desc: 'HKUDS agent scans every frame — detects scenes, objects, speech. Builds structured video memory automatically.', c: 'text-violet-400', bg: 'bg-violet-500/8', b: 'border-violet-500/15' },
  { icon: I.Script, title: 'Smart Scriptwriting', desc: 'FireRed generates professional scripts with emotional arcs and beat-synced storyboards.', c: 'text-fuchsia-400', bg: 'bg-fuchsia-500/8', b: 'border-fuchsia-500/15' },
  { icon: I.Cut, title: 'Automated Editing', desc: 'video-use executes jump cuts, audio fades, and subtitle burns with LLM precision.', c: 'text-cyan-400', bg: 'bg-cyan-500/8', b: 'border-cyan-500/15' },
  { icon: I.Wand, title: 'Cinematic Render', desc: 'LTX Engine applies AI transitions, color grades, and renders studio-quality H.264 at 1080p.', c: 'text-emerald-400', bg: 'bg-emerald-500/8', b: 'border-emerald-500/15' },
  { icon: I.Cloud, title: 'Cloud Ready', desc: 'Deploy to GitHub Codespace instantly. Pre-configured with Ollama + CrewAI + FFmpeg.', c: 'text-sky-400', bg: 'bg-sky-500/8', b: 'border-sky-500/15' },
  { icon: I.Shield, title: 'Open Source', desc: 'No API keys. No subscriptions. No credit limits. Everything runs on your machine.', c: 'text-amber-400', bg: 'bg-amber-500/8', b: 'border-amber-500/15' },
];

/* ═══════ COMPONENTS ═══════ */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 40); window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h); }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? 'glass-heavy border-b border-white/[0.04]' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-all duration-300">
              <I.Spark c="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-white font-bold text-lg tracking-tight">Vendora</span>
              <span className="text-[10px] text-slate-600 ml-2 hidden sm:inline">{LOCATION.flag} Thailand</span>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {NAV.map(l => <Link key={l.label} href={l.href} className="px-3 py-2 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.04] transition-all">{l.label}</Link>)}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="text-sm text-slate-400 hover:text-white transition-colors px-3 py-2">Sign In</Link>
            <Link href="/create" className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-violet-500/20 glow-violet flex items-center gap-2">
              <I.Play c="w-4 h-4" /> Try Free
            </Link>
          </div>
          <button className="md:hidden p-2 text-slate-400" onClick={() => setOpen(!open)}><I.Menu /></button>
        </div>
      </div>
      {open && <div className="md:hidden glass-heavy border-t border-white/[0.04] px-4 py-4 space-y-2">{NAV.map(l => <Link key={l.label} href={l.href} className="block px-3 py-2 text-slate-400 hover:text-white rounded-lg">{l.label}</Link>)}<div className="pt-2 flex gap-3"><Link href="/login" className="flex-1 text-center px-4 py-2.5 border border-white/10 text-slate-300 rounded-xl text-sm">Sign In</Link><Link href="/create" className="flex-1 text-center px-4 py-2.5 bg-gradient-to-r from-violet-600 to-cyan-500 text-white rounded-xl text-sm font-bold">Try Free</Link></div></div>}
    </nav>
  );
}

/* ═══ HERO ═══ */
function Hero() {
  const [, setTick] = useState(0);
  useEffect(() => { const i = setInterval(() => setTick(t => t + 1), 50); return () => clearInterval(i); }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-[#06080D]">
      {/* Ambient orbs */}
      <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-violet-600/12 rounded-full blur-[180px] animate-pulse" />
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-cyan-500/8 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '3s' }} />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-fuchsia-500/6 rounded-full blur-[180px] animate-pulse" style={{ animationDelay: '5s' }} />
      
      {/* Grid + Noise */}
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 bg-noise" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute w-1 h-1 bg-violet-400/30 rounded-full animate-float"
            style={{ left: `${10 + i * 18}%`, top: `${15 + (i % 3) * 25}%`, animationDelay: `${i * 0.8}s`, animationDuration: `${4 + i * 1.5}s` }} />
        ))}
        {[...Array(4)].map((_, i) => (
          <div key={i + 10} className="absolute w-0.5 h-0.5 bg-cyan-400/30 rounded-full animate-float"
            style={{ left: `${20 + i * 22}%`, top: `${50 + (i % 2) * 20}%`, animationDelay: `${i * 1.2}s`, animationDuration: `${5 + i}s` }} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Premium badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-violet-500/8 border border-violet-500/15 rounded-full text-sm mb-12 backdrop-blur-sm animate-fade-in">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />
            </span>
            <span className="text-violet-300 font-medium">4-Agent AI Pipeline — Live</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-500 flex items-center gap-1.5">{LOCATION.flag} {LOCATION.country}</span>
            <I.Spark c="w-3.5 h-3.5 text-violet-400" />
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tighter leading-[0.95] mb-8 animate-fade-in" style={{ animationDelay: '0.15s' }}>
            <span className="text-white">AI Video Editing</span>
            <br />
            <span className="gradient-violet">Reimagined</span>
            {' '}
            <span className="text-white">for</span>
            <br />
            <span className="gradient-cyan">Creators</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Four AI agents collaborate — <span className="text-violet-300 font-semibold">HKUDS</span> sees,{' '}
            <span className="text-fuchsia-300 font-semibold">FireRed</span> writes,{' '}
            <span className="text-cyan-300 font-semibold">video-use</span> cuts,{' '}
            <span className="text-emerald-300 font-semibold">LTX</span> renders.
            <span className="text-white font-semibold"> Open source. Free forever.</span>
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: '0.45s' }}>
            <Link href="/create" className="group w-full sm:w-auto px-10 py-4.5 bg-gradient-to-r from-violet-600 via-violet-500 to-cyan-500 text-white font-bold rounded-2xl hover:opacity-90 transition-all glow-strong flex items-center justify-center gap-3 text-lg">
              <I.Play c="w-5 h-5" />
              Try Vendora Free
              <I.Arrow c="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/showcase" className="w-full sm:w-auto px-10 py-4.5 border border-white/[0.08] text-slate-300 font-semibold rounded-2xl hover:bg-white/[0.03] hover:border-white/[0.15] transition-all text-lg">
              View Showcase →
            </Link>
          </div>

          {/* Currency-aware pricing */}
          <div className="flex justify-center mb-16 animate-fade-in" style={{ animationDelay: '0.55s' }}>
            <div className="inline-flex flex-col items-center p-8 rounded-3xl card-mixed border border-violet-500/10">
              <PriceDisplay usdPrice={0} />
              <div className="mt-4 flex items-center gap-3 text-xs text-slate-500">
                <span>🇹🇭 Thailand</span>
                <span className="text-slate-700">·</span>
                <span>🇲🇲 Myanmar</span>
                <span className="text-slate-700">·</span>
                <span>🌏 Worldwide</span>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-20 stagger">
            {[
              { v: '4', l: 'AI Agents', i: '🧠' },
              { v: '24', l: 'Voices', i: '🎤' },
              { v: '4K', l: 'Export', i: '📺' },
              { v: '฿0', l: 'Price', i: '💎' },
            ].map(s => (
              <div key={s.l} className="p-5 rounded-2xl glass text-center hover-lift">
                <div className="text-2xl mb-2">{s.i}</div>
                <div className="text-2xl font-black gradient-violet">{s.v}</div>
                <div className="text-xs text-slate-500 mt-1">{s.l}</div>
              </div>
            ))}
          </div>

          {/* Video preview window */}
          <div className="max-w-4xl mx-auto animate-scale-in" style={{ animationDelay: '0.7s' }}>
            <div className="relative rounded-3xl border border-violet-500/15 bg-gradient-to-br from-slate-900 via-[#0c111c] to-slate-900 shadow-2xl shadow-violet-500/10 overflow-hidden animate-border">
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.04]">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                <div className="ml-3 text-[11px] text-slate-600 font-mono">production_v3_final.mp4 — Vendora Studio</div>
              </div>
              {/* Content area */}
              <div className="aspect-video flex items-center justify-center relative">
                {/* Fake timeline thumbnails */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-black/60 backdrop-blur-sm border-t border-white/[0.04] flex items-center px-3 gap-1.5">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className={`h-10 rounded-sm flex-1 ${i % 3 === 0 ? 'bg-violet-600/20 border border-violet-500/20' : i % 3 === 1 ? 'bg-cyan-500/15 border border-cyan-500/15' : 'bg-slate-800/60 border border-white/[0.04]'}`} />
                  ))}
                </div>
                {/* Play button */}
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shadow-2xl shadow-violet-500/30 hover:scale-110 transition-all duration-500 cursor-pointer group animate-pulse-glow">
                  <I.Play c="w-10 h-10 text-white ml-1" />
                </div>
                {/* Timecode */}
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-lg text-xs text-slate-400 font-mono border border-white/[0.04]">
                  00:00 / 00:45
                </div>
              </div>
            </div>
            {/* Ambient glow behind */}
            <div className="absolute -inset-8 bg-gradient-to-r from-violet-600/5 via-fuchsia-500/3 to-cyan-500/5 rounded-[60px] blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ AGENT TIMELINE ═══ */
function AgentShowcase() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="relative py-32 bg-[#080c15] overflow-hidden">
      <div className="section-divider" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/8 border border-cyan-500/15 rounded-full text-xs font-semibold tracking-widest uppercase text-cyan-400 mb-6">The Engine</div>
          <h2 className="text-3xl sm:text-6xl font-black text-white mb-4 tracking-tight">
            The <span className="gradient-violet">4-Agent</span> Pipeline
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">Each agent masters one craft. Together, they produce cinema.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger">
          {AGENTS.map((a, i) => (
            <div key={a.n}
              className={`relative group cursor-pointer rounded-2xl p-6 border transition-all duration-500 ${
                active === i ? 'border-violet-500/30 bg-violet-500/[0.04] shadow-2xl shadow-violet-500/8 scale-[1.02]' : 'border-white/[0.04] bg-white/[0.01] hover:border-white/[0.08]'
              } hover-lift`}
              onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}>
              <div className="text-6xl font-black text-white/[0.02] absolute top-3 right-4 select-none">{a.n}</div>
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${a.grad} flex items-center justify-center mb-4 shadow-lg ${active === i ? 'agent-active' : ''}`}
                style={{ boxShadow: active === i ? `0 0 30px ${a.glow}0.5)` : '' }}>
                <a.icon c="w-7 h-7 text-white" />
              </div>
              <h3 className="text-white font-bold text-sm mb-0.5">{a.name}</h3>
              <p className="text-xs text-slate-500 mb-3">{a.role}</p>
              <div className={`overflow-hidden transition-all duration-500 ${active === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">{a.desc}</p>
                <span className={`inline-block px-2.5 py-1 ${a.tagBg} border border-white/[0.04] rounded-lg text-[10px] ${a.tagColor} font-medium`}>{a.tag}</span>
              </div>
              {i < 3 && <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-700 text-lg z-10">→</div>}
            </div>
          ))}
        </div>

        {/* Flow visual */}
        <div className="mt-16 flex items-center justify-center gap-2 flex-wrap">
          {['Upload Footage', 'AI Analysis', 'Script Writing', 'Auto Edit', 'Final Render'].map((step, i) => (
            <div key={step} className="flex items-center">
              <div className={`px-4 py-2.5 rounded-xl text-xs font-medium border ${
                i === 0 ? 'bg-violet-500/5 border-violet-500/20 text-violet-300' :
                i === 1 ? 'bg-fuchsia-500/5 border-fuchsia-500/20 text-fuchsia-300' :
                i === 2 ? 'bg-cyan-500/5 border-cyan-500/20 text-cyan-300' :
                i === 3 ? 'bg-teal-500/5 border-teal-500/20 text-teal-300' :
                'bg-emerald-500/5 border-emerald-500/20 text-emerald-300'
              }`}>{step}</div>
              {i < 4 && <span className="text-slate-700 mx-1.5">→</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ FEATURES ═══ */
function FeaturesGrid() {
  return (
    <section className="relative py-32 bg-[#06080D]">
      <div className="section-divider" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-500/8 border border-violet-500/15 rounded-full text-xs font-semibold tracking-widest uppercase text-violet-400 mb-6">Capabilities</div>
          <h2 className="text-3xl sm:text-6xl font-black text-white mb-4 tracking-tight">Everything to <span className="gradient-cyan">ship videos</span></h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">No API keys. No subscriptions. Pure AI power.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger">
          {FEATURES.map(f => (
            <div key={f.title} className={`group p-7 rounded-2xl ${f.bg} border ${f.b} hover-lift`}>
              <div className={`w-12 h-12 rounded-2xl ${f.bg} flex items-center justify-center mb-5`}>
                <f.icon c={`w-6 h-6 ${f.c}`} />
              </div>
              <h3 className="text-white font-bold mb-2.5 text-lg">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ PRICING ═══ */
function PricingSection() {
  const tiers = [
    { name: 'Free Forever', price: '฿0', sub: '0 Ks', desc: 'All features. No limits. No catch.', features: ['4-agent AI pipeline', 'YouTube downloader', '24 AI voices', '4K export', 'Self-hosted'], cta: 'Start Creating', href: '/create', hl: true, grad: 'from-violet-600 to-fuchsia-600' },
    { name: 'Codespace Cloud', price: '฿0', sub: '0 Ks', desc: 'Run in browser. Zero local setup.', features: ['GitHub Codespace', 'Pre-configured', 'Always online', 'Public URL', 'Auto-updates'], cta: 'Deploy to Cloud', href: '/help', hl: false, grad: 'from-cyan-600 to-teal-600' },
  ];

  return (
    <section className="relative py-32 bg-[#080c15]">
      <div className="section-divider" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/8 border border-emerald-500/15 rounded-full text-xs font-semibold tracking-widest uppercase text-emerald-400 mb-6">Pricing</div>
          <h2 className="text-3xl sm:text-6xl font-black text-white mb-4 tracking-tight"><span className="gradient-violet">Always</span> Free</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">Open source. No credit cards. Just install and create.</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto stagger">
          {tiers.map(t => (
            <div key={t.name} className={`relative p-8 rounded-3xl border transition-all duration-500 hover-lift ${
              t.hl ? 'border-violet-500/25 bg-violet-500/[0.02] shadow-xl shadow-violet-500/5' : 'border-white/[0.05] bg-white/[0.01]'
            }`}>
              {t.hl && <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-xs font-bold rounded-full shadow-lg shadow-violet-500/25">Most Popular</div>}
              <h3 className="text-xl font-bold text-white mb-1">{t.name}</h3>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-5xl font-black gradient-violet">{t.price}</span>
                <span className="text-slate-500 text-sm">THB</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                <span>🇲🇲 {t.sub}</span>
                <span className="text-slate-700">·</span>
                <span className="text-xs">forever</span>
              </div>
              <p className="text-slate-400 text-sm mb-7">{t.desc}</p>
              <ul className="space-y-3.5 mb-8">
                {t.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-slate-300"><I.Check c="w-4 h-4 text-emerald-400 flex-shrink-0" />{f}</li>
                ))}
              </ul>
              <Link href={t.href} className={`block text-center px-6 py-3.5 rounded-2xl text-sm font-bold transition-all ${t.hl ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/25' : 'bg-white/[0.03] border border-white/10 text-slate-300 hover:bg-white/[0.06]'}`}>{t.cta}</Link>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center text-sm text-slate-600">
          Available in 🇹🇭 Thailand · 🇲🇲 Myanmar · 🌏 Worldwide
        </div>
      </div>
    </section>
  );
}

/* ═══ CTA ═══ */
function CTASection() {
  return (
    <section className="relative py-32 bg-[#06080D] overflow-hidden">
      <div className="section-divider" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/8 rounded-full blur-[150px]" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-7xl font-black text-white mb-6 leading-[1.05] tracking-tight">
          Ready to let AI<br />
          <span className="gradient-mixed">edit your videos?</span>
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          Drop your footage. Four AI agents handle everything. Open source. Free forever. Built for creators everywhere — including {LOCATION.flag} Thailand.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/create" className="px-10 py-5 bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold rounded-2xl hover:opacity-90 transition-all glow-strong text-lg shadow-2xl shadow-violet-500/25">Start Creating — Free</Link>
          <Link href="/agent" className="px-10 py-5 border border-white/[0.06] text-slate-300 font-semibold rounded-2xl hover:bg-white/[0.03] transition-all text-lg">Meet the Agents →</Link>
        </div>
      </div>
    </section>
  );
}

/* ═══ FOOTER ═══ */
function Footer() {
  return (
    <footer className="relative py-20 bg-[#080c15] border-t border-white/[0.03]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/15">
                <I.Spark c="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-xl">Vendora</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs mb-4">AI-powered video production studio. 4 agents, zero cost, infinite creativity.</p>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <span>{LOCATION.flag} {LOCATION.country}</span>
              <span className="text-slate-800">·</span>
              <span>🇲🇲 Myanmar</span>
            </div>
          </div>
          {[{ t: 'Product', l: ['Features', 'Showcase', 'Pricing', 'Agent', 'Blog'] }, { t: 'Tools', l: ['Video Editor', 'YouTube Downloader', 'Voice Generator', 'Script Writer'] }, { t: 'Company', l: ['About', 'Contact', 'Help', 'GitHub'] }].map(c => (
            <div key={c.t}><h4 className="text-slate-400 font-semibold text-sm mb-5">{c.t}</h4><div className="space-y-3">{c.l.map(l => <Link key={l} href={`/${l.toLowerCase().replace(/\s+/g, '-')}`} className="block text-sm text-slate-500 hover:text-slate-300 transition-colors">{l}</Link>)}</div></div>
          ))}
        </div>
        <div className="pt-8 border-t border-white/[0.03] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">© 2026 Vendora AI · Built with CrewAI + Ollama + FFmpeg</p>
          <div className="flex items-center gap-5 text-xs text-slate-600">
            <span>Open Source</span><span className="text-slate-800">·</span><span>Free Forever</span><span className="text-slate-800">·</span><span>No API Keys</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════ PAGE ═══════ */
export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#06080D] text-white antialiased">
      <Navbar />
      <Hero />
      <AgentShowcase />
      <FeaturesGrid />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  );
}
