'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

/* ── Icons ── */
function PlayIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function SparkleIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function VideoIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
}

function MicIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
    </svg>
  );
}

function SearchIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function EditIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  );
}

function GlobeIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  );
}

function WandIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function CheckIcon({ className = 'w-3 h-3' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  );
}

/* ── Data ── */
const NAV_LINKS = [
  { label: 'Features', href: '/features' },
  { label: 'Showcase', href: '/showcase' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
];

interface Voice {
  name: string;
  language: string;
  engine: string;
  gender: 'Male' | 'Female';
  accent: string;
}

const VOICES: Voice[] = [
  // ── English Male (10 voices) ──
  { name: 'Christopher', language: 'English (US)', engine: 'Edge TTS', gender: 'Male', accent: 'American' },
  { name: 'Guy', language: 'English (US)', engine: 'Edge TTS', gender: 'Male', accent: 'American' },
  { name: 'Davis', language: 'English (US)', engine: 'Edge TTS', gender: 'Male', accent: 'American' },
  { name: 'Ryan', language: 'English (UK)', engine: 'Edge TTS', gender: 'Male', accent: 'British RP' },
  { name: 'George', language: 'English (UK)', engine: 'Edge TTS', gender: 'Male', accent: 'British' },
  { name: 'Steffan', language: 'English (AU)', engine: 'Edge TTS', gender: 'Male', accent: 'Australian' },
  { name: 'Roger', language: 'English (US)', engine: 'Edge TTS', gender: 'Male', accent: 'American' },
  { name: 'Eric (Narrator)', language: 'English (US)', engine: 'Edge TTS', gender: 'Male', accent: 'American' },
  { name: 'Tony', language: 'English (US)', engine: 'Edge TTS', gender: 'Male', accent: 'American' },
  { name: 'James', language: 'English (UK)', engine: 'Edge TTS', gender: 'Male', accent: 'British' },

  // ── English Female (10 voices) ──
  { name: 'Jenny', language: 'English (US)', engine: 'Edge TTS', gender: 'Female', accent: 'American' },
  { name: 'Aria', language: 'English (US)', engine: 'Edge TTS', gender: 'Female', accent: 'American' },
  { name: 'Jane', language: 'English (US)', engine: 'Edge TTS', gender: 'Female', accent: 'American' },
  { name: 'Nancy', language: 'English (US)', engine: 'Edge TTS', gender: 'Female', accent: 'American' },
  { name: 'Sonia', language: 'English (UK)', engine: 'Edge TTS', gender: 'Female', accent: 'British RP' },
  { name: 'Libby', language: 'English (UK)', engine: 'Edge TTS', gender: 'Female', accent: 'British' },
  { name: 'Natasha', language: 'English (AU)', engine: 'Edge TTS', gender: 'Female', accent: 'Australian' },
  { name: 'Michelle', language: 'English (US)', engine: 'Edge TTS', gender: 'Female', accent: 'American' },
  { name: 'Ana', language: 'English (US)', engine: 'Edge TTS', gender: 'Female', accent: 'American' },
  { name: 'Mary', language: 'English (US)', engine: 'Edge TTS', gender: 'Female', accent: 'American' },

  // ── Burmese (4 voices) ──
];

const FEATURES = [
  {
    icon: <SearchIcon />,
    title: 'Deep Research AI',
    desc: 'Paste any URL or script — our AI reads, understands, and extracts key insights to build compelling narratives automatically.',
  },
  {
    icon: <VideoIcon />,
    title: 'Cinematic B‑Roll',
    desc: 'Auto-generated stock footage, animations, and visuals synced to your script in stunning 4K resolution.',
  },
  {
    icon: <EditIcon />,
    title: 'Transcript Editor',
    desc: 'Edit your video by editing text. Fix typos, reorder paragraphs — the video updates in real time.',
  },
  {
    icon: <GlobeIcon />,
    title: 'Multi‑Language',
    desc: 'Create videos in English and Burmese with native-quality AI voices. More languages coming soon.',
  },
  {
    icon: <WandIcon />,
    title: 'One‑Click Export',
    desc: 'Export in 4K or publish directly to YouTube, Facebook, and TikTok with a single click.',
  },
  {
    icon: <MicIcon />,
    title: 'Studio‑Grade Audio',
    desc: 'Crystal-clear voice synthesis with natural intonation, adjustable pace, and professional mastering.',
  },
];

const ENGINES = [
  {
    name: 'Microsoft Edge TTS',
    badge: 'Primary',
    quality: '★★★★★',
  },
  {
  {
    name: 'Arena AI',
    badge: 'Premium',
    desc: 'Advanced AI voice synthesis with emotional range, dramatic pauses, and cinematic delivery. Perfect for documentaries and high-impact storytelling.',
    voices: 'Multiple styles',
    quality: '★★★★★',
  },
];

/* ── Navbar ── */
function Navbar({ scrolled }: { scrolled: boolean }) {
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/[0.06] bg-[#0a0a0a]/85 backdrop-blur-2xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="Vidora Home">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF6B35] to-[#FFB627] flex items-center justify-center font-bold text-sm shadow-lg shadow-orange-500/25 group-hover:shadow-orange-500/40 transition-shadow duration-300">
              V
            </div>
            <span className="font-bold text-lg tracking-tight">Vidora</span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                  link.href === '/features'
                    ? 'text-white bg-white/[0.04]'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link
            href="/create/step1"
            className="hidden md:inline-flex items-center px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-sm font-semibold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-[1.02] transition-all duration-200"
          >
            Get Started
            <span className="ml-1.5 opacity-70">→</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  const footerLinks = {
    Product: [
      { label: 'Features', href: '/features' },
      { label: 'Showcase', href: '/showcase' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Blog', href: '/blog' },
    ],
    Company: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Help Center', href: '/help' },
      { label: 'Careers', href: '/contact' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '/contact' },
      { label: 'Terms of Service', href: '/contact' },
      { label: 'Cookie Policy', href: '/contact' },
    ],
  };

  return (
    <footer className="border-t border-white/[0.06] bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF6B35] to-[#FFB627] flex items-center justify-center font-bold text-sm shadow-lg shadow-orange-500/25">V</div>
              <span className="font-bold text-lg tracking-tight">Vidora</span>
            </div>
            <p className="text-sm text-white/40 max-w-xs leading-relaxed mb-6">
              AI Video Creation Platform. Turn ideas into cinematic videos with AI-powered research, voice, and editing.
            </p>
            <div className="flex items-center gap-3">
              {['TC', 'HN', 'GH', 'YT'].map((s) => (
                <span key={s} className="w-8 h-8 rounded-lg border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-xs font-semibold text-white/30 hover:text-white/60 hover:border-white/[0.15] transition-colors cursor-pointer">{s}</span>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-semibold text-xs uppercase tracking-wider text-white/50 mb-4">{heading}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-white/40 hover:text-white transition-colors duration-200">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-white/30">© 2026 Vidora Inc. All rights reserved.</p>
          <p className="text-sm text-white/30">Vidora Inc., 350 Fifth Avenue, Suite 3300, New York, NY 10118</p>
        </div>
      </div>
    </footer>
  );
}

/* ── Page ── */
export default function FeaturesPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredVoices = VOICES.filter((v) => {
    if (activeTab === 'all') return true;
    return true;
  });

  const tabs = [
    { key: 'all' as const, label: 'All Voices', count: VOICES.length },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <Navbar scrolled={scrolled} />

      <main>
        {/* ═══════════ PAGE HEADER ═══════════ */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#FF6B35]/6 blur-[120px] pointer-events-none" />
          <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-[#FFB627]/5 blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <span className="inline-block px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] text-xs font-medium text-white/50 mb-6">
                Platform Features
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
                Everything you need to{' '}
                <span className="bg-gradient-to-r from-[#FF6B35] to-[#FFB627] bg-clip-text text-transparent">
                  create
                </span>
              </h1>
              <p className="text-base sm:text-lg text-white/40 max-w-xl mx-auto leading-relaxed">
                Powerful AI tools, 24 lifelike voices, and a streamlined workflow designed for professional video creation.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════ CORE FEATURES ═══════════ */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  className="group relative p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-[#FF6B35]/20 hover:bg-white/[0.03] transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6B35]/15 to-[#FFB627]/15 border border-[#FF6B35]/10 flex items-center justify-center text-[#FF6B35] mb-5 group-hover:scale-105 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ VOICE ENGINE CAPABILITIES ═══════════ */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-block px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] text-xs font-medium text-white/50 mb-4">
                Voice Engine
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                Powered by the best{' '}
                <span className="bg-gradient-to-r from-[#FF6B35] to-[#FFB627] bg-clip-text text-transparent">
                  TTS engines
                </span>
              </h2>
              <p className="text-base text-white/40 max-w-xl mx-auto leading-relaxed">
                Multiple engine options for every use case — from quick social clips to cinematic documentaries.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {ENGINES.map((engine) => (
                <div
                  key={engine.name}
                  className="group relative p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] transition-all duration-300 text-center"
                >
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#FF6B35]/10 border border-[#FF6B35]/20 text-[10px] font-semibold text-[#FFB627] uppercase tracking-wider mb-4">
                    {engine.badge}
                  </span>
                  <h3 className="text-lg font-bold mb-3">{engine.name}</h3>
                  <p className="text-sm text-white/40 leading-relaxed mb-5">{engine.desc}</p>
                  <div className="flex items-center justify-center gap-6 text-xs text-white/30">
                    <span>{engine.voices}</span>
                    <span>{engine.quality}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ VOICE GALLERY ═══════════ */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] text-xs font-medium text-white/50 mb-4">
                Voice Library
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                24{' '}
                <span className="bg-gradient-to-r from-[#FF6B35] to-[#FFB627] bg-clip-text text-transparent">
                  lifelike voices
                </span>
              </h2>
              <p className="text-base text-white/40 max-w-xl mx-auto">
              </p>
            </div>

            {/* Tab Filter */}
            <div className="flex items-center justify-center gap-2 mb-10">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.key
                      ? 'bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white shadow-lg shadow-orange-500/20'
                      : 'border border-white/[0.08] bg-white/[0.02] text-white/50 hover:text-white hover:border-white/[0.15]'
                  }`}
                >
                  {tab.label}
                  <span className={`ml-1.5 text-xs ${activeTab === tab.key ? 'text-white/70' : 'text-white/25'}`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Voice Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredVoices.map((voice) => (
                <div
                  key={voice.name}
                  className={`group relative p-5 rounded-xl border transition-all duration-300 text-center ${
                      ? 'border-[#FF6B35]/15 bg-[#FF6B35]/[0.03] hover:border-[#FF6B35]/30 hover:bg-[#FF6B35]/[0.06]'
                      : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.03]'
                  }`}
                >
                  {/* Gender indicator */}
                  <div
                    className={`w-10 h-10 mx-auto mb-3 rounded-full flex items-center justify-center text-xs font-bold ${
                      voice.gender === 'Male'
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        : 'bg-pink-500/10 text-pink-400 border border-pink-500/20'
                    }`}
                  >
                    {voice.gender === 'Male' ? 'M' : 'F'}
                  </div>

                  <h4 className="font-semibold text-sm mb-1">{voice.name}</h4>
                  <p className="text-xs text-white/35 mb-3">{voice.language}</p>

                  <div className="flex items-center justify-center gap-2">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-[10px] text-white/40">
                      {voice.engine}
                    </span>
                    <span className="inline-block px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-[10px] text-white/40">
                      {voice.accent}
                    </span>
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#F7931E] flex items-center justify-center shadow-lg shadow-orange-500/30">
                      <PlayIcon className="w-4 h-4 text-white ml-0.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ HOW IT WORKS ═══════════ */}
        <section className="py-20 border-t border-white/[0.04]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] text-xs font-medium text-white/50 mb-4">
                Workflow
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                How It{' '}
                <span className="bg-gradient-to-r from-[#FF6B35] to-[#FFB627] bg-clip-text text-transparent">Works</span>
              </h2>
              <p className="text-base text-white/40 max-w-xl mx-auto">
                Three steps from idea to cinematic video. No editing skills required.
              </p>
            </div>

            <div className="relative">
              {/* Connector line (desktop) */}
              <div className="hidden lg:block absolute top-12 left-[20%] right-[20%] h-px bg-gradient-to-r from-[#FF6B35]/0 via-[#FF6B35]/30 to-[#FFB627]/0" />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-6">
                {[
                  {
                    step: '01',
                    title: 'Paste Your Content',
                    desc: 'Drop a URL, upload a script, or type your idea. Vidora AI reads and understands your content in seconds, extracting key points automatically.',
                    icon: '📋',
                  },
                  {
                    step: '02',
                    title: 'Customize & Voice',
                    desc: 'Choose from 24 voices, pick a visual style, set the tone. Fine-tune every detail or let AI handle the entire production.',
                    icon: '🎙️',
                  },
                  {
                    step: '03',
                    title: 'Export & Publish',
                    desc: 'Download in 4K or publish directly to YouTube, TikTok, and more. One click and your video is live everywhere.',
                    icon: '🚀',
                  },
                ].map((item) => (
                  <div key={item.step} className="relative text-center lg:px-6">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#FF6B35]/10 to-[#FFB627]/10 border border-[#FF6B35]/10 flex items-center justify-center text-2xl">
                      {item.icon}
                    </div>
                    <div className="text-xs font-bold text-[#FF6B35] tracking-wider mb-2">STEP {item.step}</div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed max-w-xs mx-auto">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ CTA ═══════════ */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-[#FF6B35]/8 via-[#F7931E]/4 to-[#FFB627]/8 p-10 sm:p-16 lg:p-20 text-center">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-[#FF6B35]/15 blur-[100px] pointer-events-none" />
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                  Ready to hear them in action?
                </h2>
                <p className="text-base sm:text-lg text-white/50 mb-8 max-w-lg mx-auto leading-relaxed">
                  Try all 24 voices free. No credit card required — start creating your first video today.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/create/step1"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#F7931E] font-semibold text-base shadow-xl shadow-orange-500/25 hover:shadow-orange-500/45 hover:scale-[1.02] transition-all duration-200"
                  >
                    Start Creating Free
                    <span className="ml-2 opacity-70">→</span>
                  </Link>
                  <Link
                    href="/showcase"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl border border-white/[0.12] font-semibold text-base text-white/70 hover:text-white hover:bg-white/[0.04] transition-all duration-200"
                  >
                    <PlayIcon className="w-4 h-4" />
                    Hear Samples
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
