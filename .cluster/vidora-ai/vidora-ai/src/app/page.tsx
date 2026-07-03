'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Play, ArrowRight, MessageCircle, Mic, Scissors, Wand, Download, Film, FileText, Sparkles, Users, Heart, Star, Upload, Check, ChevronRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

/* ═══════ DATA ═══════ */

const featureCards = [
  {
    icon: Film, label: 'YouTube Tools', color: 'from-red-500/20 to-orange-500/10', borderColor: 'group-hover:border-red-500/30', iconColor: 'text-red-400', iconBg: 'bg-red-500/15',
    desc: 'Download videos, extract transcripts, generate recaps from any YouTube link.',
    href: '/download',
  },
  {
    icon: Mic, label: 'AI Voiceovers', color: 'from-sky-500/20 to-blue-500/10', borderColor: 'group-hover:border-sky-500/30', iconColor: 'text-sky-400', iconBg: 'bg-sky-500/15',
    desc: '24 professional voices in English + Burmese with Arena AI Agent Mod. Full emotion & speed control.',
    href: '/create/step2',
  },
  {
    icon: Scissors, label: 'Smart Editing', color: 'from-cyan-500/20 to-teal-500/10', borderColor: 'group-hover:border-cyan-500/30', iconColor: 'text-cyan-400', iconBg: 'bg-cyan-500/15',
    desc: 'Auto scene detection, jump cuts, audio fades, and subtitle generation with LLM precision.',
    href: '/features',
  },
  {
    icon: Sparkles, label: 'AI Agents', color: 'from-purple-500/20 to-violet-500/10', borderColor: 'group-hover:border-purple-500/30', iconColor: 'text-purple-400', iconBg: 'bg-purple-500/15',
    desc: '4 AI agents collaborate — HKUDS analyzes, FireRed scripts, video-use cuts, LTX renders.',
    href: '/agent',
  },
  {
    icon: Wand, label: 'Cinematic Render', color: 'from-emerald-500/20 to-green-500/10', borderColor: 'group-hover:border-emerald-500/30', iconColor: 'text-emerald-400', iconBg: 'bg-emerald-500/15',
    desc: 'Ken Burns effects, color grading, transitions — cinema-quality output at 4K.',
    href: '/features',
  },
  {
    icon: MessageCircle, label: 'Burmese Narration', color: 'from-amber-500/20 to-yellow-500/10', borderColor: 'group-hover:border-amber-500/30', iconColor: 'text-amber-400', iconBg: 'bg-amber-500/15',
    desc: 'Native Burmese script generation + Arena AI voiceover for authentic Myanmar content.',
    href: '/recap',
  },
];

const agentSteps = [
  { n: '01', name: 'Upload', icon: Upload, desc: 'Drop footage or paste a YouTube link', color: 'text-gray-400', bg: 'bg-gray-500/10', gradient: 'from-gray-500/10 to-transparent' },
  { n: '02', name: 'Analyze', icon: Sparkles, desc: 'HKDUDS scans frames, detects scenes & speech', color: 'text-purple-400', bg: 'bg-purple-500/10', gradient: 'from-purple-500/10 to-transparent' },
  { n: '03', name: 'Script', icon: FileText, desc: 'FireRed writes narrative with emotional arcs', color: 'text-fuchsia-400', bg: 'bg-fuchsia-500/10', gradient: 'from-fuchsia-500/10 to-transparent' },
  { n: '04', name: 'Cut', icon: Scissors, desc: 'video-use executes edits, fades, subtitles', color: 'text-cyan-400', bg: 'bg-cyan-500/10', gradient: 'from-cyan-500/10 to-transparent' },
  { n: '05', name: 'Render', icon: Wand, desc: 'LTX applies VFX, color grade, final encode', color: 'text-emerald-400', bg: 'bg-emerald-500/10', gradient: 'from-emerald-500/10 to-transparent' },
];

const voiceCards = [
  { name: 'Andrew', accent: 'US · Male', tag: 'Deep Authoritative', color: 'from-blue-500 to-indigo-600', ring: 'ring-blue-500/20' },
  { name: 'Emma', accent: 'US · Female', tag: 'Warm Friendly', color: 'from-fuchsia-500 to-pink-600', ring: 'ring-fuchsia-500/20' },
  { name: 'Ryan', accent: 'UK · Male', tag: 'Smooth British', color: 'from-violet-500 to-purple-600', ring: 'ring-violet-500/20' },
  { name: 'Sonia', accent: 'UK · Female', tag: 'Elegant Narration', color: 'from-rose-500 to-pink-600', ring: 'ring-rose-500/20' },
  { name: 'Thiha', accent: 'MM · Male', tag: 'Burmese Deep', color: 'from-amber-500 to-orange-600', ring: 'ring-amber-500/20' },
  { name: 'Mya', accent: 'MM · Female', tag: 'Soft Storytelling', color: 'from-pink-500 to-rose-600', ring: 'ring-pink-500/20' },
];

/* ═══════ HERO ═══════ */
function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/8 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/6 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-xs font-medium text-purple-300 mb-8"
        >
          <Sparkles className="w-3.5 h-3.5" />
          4 AI Agents — Free Forever
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6"
        >
          <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            AI Video Production
          </span>
          <br />
          <span className="text-white">Made Effortless</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}
          className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          4 AI agents analyze your footage, write scripts, cut scenes, add voiceovers, and render cinema-quality videos —{' '}
          <span className="text-white font-semibold">all open source. Always free.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            href="/create/step1"
            className="group inline-flex items-center gap-2 px-8 py-3.5 bg-purple-600 hover:bg-purple-500 rounded-full text-white font-semibold text-base transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
          >
            <Play className="w-5 h-5" fill="currentColor" />
            Start Creating Free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/agent"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/10 text-gray-300 font-medium hover:bg-white/[0.06] hover:border-white/20 transition-all text-base"
          >
            Meet the Agents →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════ FEATURE CARDS ═══════ */
function FeaturesSection() {
  return (
    <section className="px-6 pb-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-purple-400 mb-3 block">Features</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Everything to{' '}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Ship Videos</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-center">
            No API keys. No subscriptions. Pure AI power — free and open source.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featureCards.map((f, i) => (
            <Link key={f.label} href={f.href}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className={`group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-md overflow-hidden hover:bg-white/[0.05] ${f.borderColor} transition-all duration-300 cursor-pointer`}
              >
                {/* Card image area with gradient + icon pattern */}
                <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${f.color}`}>
                  {/* Diagonal pattern lines for visual texture */}
                  <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 200">
                    <pattern id={`dots-${i}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="10" cy="10" r="1.5" fill="currentColor" />
                    </pattern>
                    <rect width="400" height="200" fill={`url(#dots-${i})`} />
                    <line x1="0" y1="0" x2="400" y2="200" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
                    <line x1="200" y1="0" x2="400" y2="200" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
                    <line x1="0" y1="100" x2="400" y2="100" stroke="currentColor" strokeWidth="0.3" opacity="0.1" />
                  </svg>
                  {/* Icon */}
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${f.iconColor} opacity-70`}>
                    <f.icon className="w-20 h-20" strokeWidth={1} />
                  </div>
                  {/* Gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/30 to-transparent" />
                  {/* Label at bottom */}
                  <div className="absolute bottom-4 left-5 text-xs font-semibold text-white/90 tracking-wider uppercase">{f.label}</div>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <div className={`w-10 h-10 rounded-xl ${f.iconBg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <f.icon className={`w-5 h-5 ${f.iconColor}`} />
                  </div>
                  <h3 className="text-white font-bold mb-2">{f.label}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4">{f.desc}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-purple-400 group-hover:text-purple-300 transition-colors">
                    Explore
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════ HOW IT WORKS ═══════ */
function HowItWorks() {
  return (
    <section className="px-6 pb-24">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-cyan-400 mb-3 block">Pipeline</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            How the{' '}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">AI Agents</span> Work
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-center">
            5 steps from raw footage to cinema-ready video — all automated
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {agentSteps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative text-center rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-md p-5 hover:bg-white/[0.05] hover:border-purple-500/20 transition-all duration-300"
            >
              {/* Step number — positioned top-right, small, non-overlapping */}
              <span className="absolute top-3 right-3 text-xs font-bold text-white/10 tracking-widest">{s.n}</span>
              {/* Step marker */}
              <div className="relative mb-3">
                <div className={`w-14 h-14 rounded-2xl ${s.bg} bg-gradient-to-br ${s.gradient} flex items-center justify-center mx-auto ring-1 ring-white/[0.04]`}>
                  <s.icon className={`w-7 h-7 ${s.color}`} />
                </div>
              </div>
              <h3 className="text-white font-bold mb-1.5">{s.name}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
              {/* Arrow between steps (desktop only) */}
              {i < 4 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <ChevronRight className="w-5 h-5 text-gray-700" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════ VOICES SHOWCASE ═══════ */
function VoicesShowcase() {
  return (
    <section className="px-6 pb-24">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-sky-400 mb-3 block">Voices</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            24{' '}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">AI Voices</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-center">
            Arena AI Agent Mod — professional English & Burmese voiceovers with emotion control
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {voiceCards.map((v) => (
            <motion.div
              key={v.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.random() * 0.3, duration: 0.5 }}
              className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-md p-4 text-center hover:bg-white/[0.05] hover:border-purple-500/20 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            >
              {/* Gradient avatar circle instead of emoji */}
              <div className={`relative w-14 h-14 mx-auto mb-3 rounded-full bg-gradient-to-br ${v.color} ring-2 ${v.ring} ring-offset-1 ring-offset-[#050508] overflow-hidden`}>
                {/* Initial letter */}
                <span className="absolute inset-0 flex items-center justify-center text-white font-black text-lg">
                  {v.name[0]}
                </span>
              </div>
              <div className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">{v.name}</div>
              <div className="text-[10px] text-gray-500 font-medium">{v.accent}</div>
              <div className="text-[10px] text-purple-400/60 mt-0.5">{v.tag}</div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/create/step2"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-sm font-medium text-purple-300 hover:bg-purple-500/10 hover:border-purple-500/30 transition-all"
          >
            Browse all 24 voices + full voice settings
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════ PRICING ═══════ */
function PricingTier() {
  const tiers = [
    {
      name: 'Self-Hosted', color: 'from-purple-500/20 to-violet-500/10', iconBg: 'bg-purple-500/15', iconColor: 'text-purple-400',
      desc: 'Run on your machine. Full control.',
      features: ['4-agent pipeline', '24 voices', '4K export', 'YouTube tools', 'Local processing'],
      href: '/create/step1', highlight: false,
    },
    {
      name: 'Codespace Cloud', color: 'from-cyan-500/20 to-sky-500/10', iconBg: 'bg-cyan-500/15', iconColor: 'text-cyan-400',
      desc: 'Instant cloud setup. Zero config.',
      features: ['GitHub Codespace', 'Always online', 'Public URL', 'Auto-updates', 'Same free tools'],
      href: '/help', highlight: false,
    },
  ];

  return (
    <section className="px-6 pb-24">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-emerald-400 mb-3 block">Pricing</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Always{' '}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Free</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-center">฿0 THB / 0 Ks MMK — forever. Open source, no tricks.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {tiers.map((t) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-md p-8 hover:bg-white/[0.05] hover:border-purple-500/20 transition-all duration-300"
            >
              {/* Card header with gradient + diagram */}
              <div className={`relative h-32 -mx-8 -mt-8 mb-6 rounded-t-2xl overflow-hidden bg-gradient-to-br ${t.color}`}>
                <svg className="absolute inset-0 w-full h-full opacity-[0.07]" viewBox="0 0 400 150">
                  <line x1="100" y1="0" x2="100" y2="150" stroke="currentColor" strokeWidth="1" />
                  <line x1="200" y1="0" x2="200" y2="150" stroke="currentColor" strokeWidth="1" />
                  <line x1="300" y1="0" x2="300" y2="150" stroke="currentColor" strokeWidth="1" />
                  <line x1="0" y1="75" x2="400" y2="75" stroke="currentColor" strokeWidth="1" />
                </svg>
                <div className={`absolute bottom-4 left-6 w-12 h-12 rounded-xl ${t.iconBg} flex items-center justify-center`}>
                  {t.name === 'Self-Hosted' ? <Download className={`w-6 h-6 ${t.iconColor}`} /> : <Sparkles className={`w-6 h-6 ${t.iconColor}`} />}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-1">{t.name}</h3>
              <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-1">฿0</div>
              <p className="text-sm text-gray-400 mb-6">{t.desc}</p>
              <ul className="space-y-2.5 mb-8">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={t.href}
                className="block w-full py-3 text-center rounded-xl border border-purple-500/30 bg-purple-500/[0.08] text-purple-300 text-sm font-semibold hover:bg-purple-500/[0.15] hover:text-purple-200 hover:border-purple-500/50 transition-all"
              >
                Get Started Free
              </Link>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-600 mt-6">Available in 🇹🇭 Thailand · 🇲🇲 Myanmar · 🌏 Worldwide</p>
      </div>
    </section>
  );
}

/* ═══════ CTA ═══════ */
function FinalCTA() {
  return (
    <section className="px-6 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto relative overflow-hidden rounded-2xl border border-purple-500/15 bg-white/[0.03] backdrop-blur-xl p-12 md:p-16 text-center"
      >
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-500/3 rounded-full blur-[80px]" />
        </div>

        <div className="relative z-10">
          {/* Play icon in a glass circle */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/10 ring-1 ring-white/[0.06] mb-6">
            <Play className="w-7 h-7 text-purple-400 ml-1" fill="currentColor" />
          </div>

          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Ready to let AI{' '}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              edit your videos?
            </span>
          </h2>
          <p className="text-gray-400 max-w-md mx-auto mb-8 text-center leading-relaxed">
            Drop your footage. 4 AI agents handle everything. Open source. Free forever.
          </p>
          <Link
            href="/create/step1"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-purple-600 hover:bg-purple-500 rounded-full text-white font-semibold transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02]"
          >
            Start Creating — Free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════ PAGE ═══════ */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#050508]">
        <Hero />
        <FeaturesSection />
        <HowItWorks />
        <VoicesShowcase />
        <PricingTier />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
