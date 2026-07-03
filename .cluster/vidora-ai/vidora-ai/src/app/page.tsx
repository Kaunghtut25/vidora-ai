'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

/* ═══════ ICONS ═══════ */
function PlayIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>;
}
function ArrowRightIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>;
}
function CheckIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>;
}
function SparkIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/></svg>;
}
function EyeIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>;
}
function ScriptIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>;
}
function ScissorsIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.2M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.2m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664"/></svg>;
}
function WandIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"/></svg>;
}
function CloudIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"/></svg>;
}
function ShieldIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>;
}
function MenuIcon() {
  return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>;
}

/* ═══════ DATA ═══════ */

const NAV_LINKS = [
  { label: 'Features', href: '/features' },
  { label: 'Showcase', href: '/showcase' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
];

const AGENTS = [
  { num: '01', name: 'HKUDS VideoAgent', role: 'Content Intelligence', desc: 'Scans raw footage, detects scenes & objects, extracts speech transcripts, builds temporal video memory.', icon: EyeIcon, color: 'from-violet-600 to-purple-600', glow: 'rgba(139, 92, 246,', badge: 'Computer Vision' },
  { num: '02', name: 'FireRed-OpenStoryline', role: 'Creative Director', desc: 'Generates rhythm-aware narratives, writes emotional scripts, plans visual flow with beat-synced storyboard.', icon: ScriptIcon, color: 'from-fuchsia-600 to-pink-600', glow: 'rgba(192, 38, 211,', badge: 'Storytelling' },
  { num: '03', name: 'video-use', role: 'Precision Editor', desc: 'Executes jump cuts, 30ms audio fades, burns UPPERCASE subtitles. Self-evaluates and fixes issues automatically.', icon: ScissorsIcon, color: 'from-cyan-600 to-teal-600', glow: 'rgba(6, 182, 212,', badge: 'LLM-Driven' },
  { num: '04', name: 'LTX Engine', role: 'VFX & Rendering', desc: 'AI transitions between scenes, cinematic color grading, final H.264 1080p render with professional encoding.', icon: WandIcon, color: 'from-emerald-600 to-green-600', glow: 'rgba(5, 150, 105,', badge: 'Final Output' },
];

const FEATURES = [
  { icon: EyeIcon, title: 'AI-Powered Analysis', desc: 'HKUDS agent scans raw footage — detects scenes, objects, speech patterns. Builds structured video memory in seconds.', color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
  { icon: ScriptIcon, title: 'Smart Scriptwriting', desc: 'FireRed generates professional scripts with emotional arcs, beat-synced timelines, and visual storytelling frameworks.', color: 'text-fuchsia-400', bg: 'bg-fuchsia-500/10', border: 'border-fuchsia-500/20' },
  { icon: ScissorsIcon, title: 'Precision Auto-Edit', desc: 'video-use cuts, fades, and burns subtitles with LLM precision. Self-evaluates output — fixes audio pops and visual jumps.', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  { icon: WandIcon, title: 'Cinematic Rendering', desc: 'LTX Engine applies AI transitions, color grades for cinematic look, renders 1080p H.264 with studio-grade encoding.', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { icon: CloudIcon, title: 'Zero-Config Cloud', desc: 'Deploy to GitHub Codespace instantly. Pre-configured environment with Ollama + CrewAI + FFmpeg. Zero setup, zero cost.', color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/20' },
  { icon: ShieldIcon, title: '100% Open Source', desc: 'No API keys, no subscriptions, no credit limits. Powered entirely by free tools. Your data stays on your machine.', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
];

const STATS = [
  { value: '4', label: 'AI Agents', icon: '🧠' },
  { value: '24', label: 'AI Voices', icon: '🎤' },
  { value: '4K', label: 'Export', icon: '📺' },
  { value: '$0', label: 'Forever Free', icon: '💎' },
];

/* ═══════ COMPONENTS ═══════ */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'glass border-b border-white/[0.04]' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center font-bold text-sm shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-shadow">
              <SparkIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">Vendora</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(l => (
              <Link key={l.label} href={l.href}
                className="px-3 py-2 text-sm text-slate-300 hover:text-white rounded-lg hover:bg-white/[0.04] transition-all duration-200">
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="text-sm text-slate-400 hover:text-white transition-colors px-3 py-2">Sign In</Link>
            <Link href="/create"
              className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/20 glow-violet">
              Try Vendora Free
            </Link>
          </div>

          <button className="md:hidden p-2 text-slate-300" onClick={() => setMobileOpen(!mobileOpen)}>
            <MenuIcon />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/[0.04] glass">
          <div className="px-4 py-4 space-y-2">
            {NAV_LINKS.map(l => (
              <Link key={l.label} href={l.href} className="block px-3 py-2 text-slate-300 hover:text-white rounded-lg">{l.label}</Link>
            ))}
            <div className="pt-2 flex gap-3">
              <Link href="/login" className="flex-1 text-center px-4 py-2.5 border border-white/10 text-slate-300 rounded-xl text-sm">Sign In</Link>
              <Link href="/create" className="flex-1 text-center px-4 py-2.5 bg-gradient-to-r from-violet-600 to-cyan-500 text-white rounded-xl text-sm font-semibold">Try Free</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden animated-gradient">
      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-violet-600/15 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '3s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-fuchsia-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '6s' }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djFINDB2LTFoMXYtMWgtMXYtMWgtMnYyaC0ydi0yaC0ydjJoLTJ2LTFoLTF2MWgtMXYxaDF2MWgydjJoLTJ2MmgydjFoMnYtMWgyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-violet-500/10 border border-violet-500/20 rounded-full text-sm text-violet-300 mb-10 backdrop-blur-sm">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span>4-Agent AI Pipeline — Now Live</span>
            <SparkIcon className="w-3.5 h-3.5 text-violet-400" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8">
            <span className="text-white">AI Video Editing</span>
            <br />
            <span className="neon-violet">Reimagined</span>
            {' '}
            <span className="text-white">for</span>
            {' '}
            <span className="neon-cyan">Creators</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Four AI agents collaborate to analyze, script, cut, and render your videos. 
            HKUDS sees. FireRed writes. video-use edits. LTX renders. 
            <span className="text-white font-medium"> All open source. All free.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link href="/create"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold rounded-2xl hover:opacity-90 transition-all shadow-2xl shadow-violet-500/25 flex items-center justify-center gap-3 group glow-violet text-lg">
              <PlayIcon className="w-5 h-5" />
              Try Vendora Free
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/showcase"
              className="w-full sm:w-auto px-8 py-4 bg-white/[0.02] border border-white/10 text-slate-300 font-semibold rounded-2xl hover:bg-white/[0.05] hover:border-white/20 transition-all text-lg">
              View Showcase →
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto mb-16">
            {STATS.map(s => (
              <div key={s.label} className="text-center p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-2xl font-bold neon-violet">{s.value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Video preview mockup */}
          <div className="max-w-3xl mx-auto relative">
            <div className="aspect-video rounded-2xl border border-violet-500/20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden shadow-2xl shadow-violet-500/10">
              {/* Fake video UI */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shadow-2xl shadow-violet-500/30 hover:scale-110 transition-transform cursor-pointer group">
                  <PlayIcon className="w-8 h-8 text-white ml-1" />
                </div>
              </div>
              {/* Timeline bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 w-2/3 rounded-r" />
              <div className="absolute bottom-4 left-4 text-xs text-slate-500 font-mono">00:34 / 00:45</div>
            </div>
            {/* Glow behind */}
            <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/10 via-fuchsia-500/5 to-cyan-500/10 rounded-3xl blur-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}

function AgentTimeline() {
  const [activeAgent, setActiveAgent] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section className="py-32 border-t border-white/[0.04] bg-[#0d1220]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest text-violet-400 uppercase mb-4 block">Engine</span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            The <span className="neon-violet">4-Agent</span> Pipeline
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            Each agent has one job. Together they create magic.
            Hover to see what each one does.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" ref={ref}>
          {AGENTS.map((agent, i) => (
            <div
              key={agent.num}
              className={`relative group cursor-pointer rounded-2xl p-6 border transition-all duration-500 hover-lift ${
                activeAgent === i
                  ? 'border-violet-500/40 bg-violet-500/[0.04] shadow-xl shadow-violet-500/10'
                  : 'border-white/[0.04] bg-white/[0.01] hover:border-white/[0.1]'
              }`}
              onMouseEnter={() => setActiveAgent(i)}
              onMouseLeave={() => setActiveAgent(null)}
            >
              {/* Number badge */}
              <div className="text-5xl font-black text-white/[0.03] absolute top-3 right-4">{agent.num}</div>

              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center mb-4 shadow-lg ${activeAgent === i ? 'agent-active' : ''}`}
                style={{ boxShadow: activeAgent === i ? `0 0 20px ${agent.glow} 0.4)` : '' }}>
                <agent.icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-white font-bold text-sm mb-0.5">{agent.name}</h3>
              <p className="text-xs text-slate-500 mb-3">{agent.role}</p>

              {/* Description — appears on hover */}
              <div className={`overflow-hidden transition-all duration-300 ${
                activeAgent === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">{agent.desc}</p>
                <span className="inline-block px-2 py-1 bg-white/[0.03] border border-white/[0.06] rounded-lg text-[10px] text-slate-500">{agent.badge}</span>
              </div>

              {/* Connector arrow */}
              {i < 3 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-600 text-lg z-10">
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Flow diagram */}
        <div className="mt-12 flex items-center justify-center gap-0 flex-wrap">
          <div className="px-4 py-2 bg-violet-500/5 border border-violet-500/20 rounded-xl text-xs text-violet-300">Upload Raw Footage</div>
          <span className="text-slate-600 mx-2">→</span>
          <div className="px-4 py-2 bg-fuchsia-500/5 border border-fuchsia-500/20 rounded-xl text-xs text-fuchsia-300">AI Analysis</div>
          <span className="text-slate-600 mx-2">→</span>
          <div className="px-4 py-2 bg-cyan-500/5 border border-cyan-500/20 rounded-xl text-xs text-cyan-300">Scriptwriting</div>
          <span className="text-slate-600 mx-2">→</span>
          <div className="px-4 py-2 bg-teal-500/5 border border-teal-500/20 rounded-xl text-xs text-teal-300">Auto Edit</div>
          <span className="text-slate-600 mx-2">→</span>
          <div className="px-4 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl text-xs text-emerald-300">Final Render</div>
        </div>
      </div>
    </section>
  );
}

function FeaturesGrid() {
  return (
    <section className="py-32 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest text-cyan-400 uppercase mb-4 block">Capabilities</span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">Everything you need to <span className="neon-cyan">ship videos</span></h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">No API keys. No subscriptions. Just powerful AI agents running locally.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(f => (
            <div key={f.title} className={`group p-6 rounded-2xl ${f.bg} border ${f.border} hover-lift`}>
              <div className={`w-10 h-10 rounded-xl ${f.bg} flex items-center justify-center mb-4`}>
                <f.icon className={`w-5 h-5 ${f.color}`} />
              </div>
              <h3 className="text-white font-semibold mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const tiers = [
    {
      name: 'Free Forever', price: '$0', desc: 'Everything included. No limits. No catch.',
      features: ['4-agent AI pipeline', 'YouTube downloader', '24 AI voices', '4K export', 'Self-hosted', 'Community support'],
      cta: 'Start Creating', href: '/create', highlight: true, gradient: 'from-violet-600 to-fuchsia-600'
    },
    {
      name: 'Codespace', price: '$0', desc: 'Run in the cloud. Zero local setup.',
      features: ['GitHub Codespace', 'Pre-configured', 'Always online', 'Public URL', 'Auto-updates', 'Community support'],
      cta: 'Deploy to Cloud', href: '/help', highlight: false, gradient: 'from-cyan-600 to-teal-600'
    },
  ];

  return (
    <section className="py-32 border-t border-white/[0.04] bg-[#0d1220]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-4 block">Pricing</span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4"><span className="neon-violet">Always</span> Free</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">Open source. No API keys. No credit cards. Just install and create.</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {tiers.map(tier => (
            <div key={tier.name} className={`relative p-8 rounded-2xl border transition-all hover-lift ${
              tier.highlight ? 'border-violet-500/30 bg-violet-500/[0.02]' : 'border-white/[0.06] bg-white/[0.01]'
            }`}>
              {tier.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-xs font-semibold rounded-full shadow-lg shadow-violet-500/25">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-5xl font-black neon-violet">{tier.price}</span>
                <span className="text-slate-500">forever</span>
              </div>
              <p className="text-slate-400 text-sm mb-6">{tier.desc}</p>
              <ul className="space-y-3 mb-8">
                {tier.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href={tier.href}
                className={`block text-center px-6 py-3.5 rounded-xl text-sm font-semibold transition-all ${
                  tier.highlight
                    ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/25'
                    : 'bg-white/[0.03] border border-white/10 text-slate-300 hover:bg-white/[0.06]'
                }`}>
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
    <section className="py-32 border-t border-white/[0.04]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-6xl font-extrabold text-white mb-6 leading-[1.1]">
          Ready to let AI<br />
          <span className="neon-violet">edit your videos?</span>
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Drop your footage. Four AI agents handle everything — analysis, scripting, cutting, rendering.
          Open source. Free forever. No API keys.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/create"
            className="px-8 py-4 bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold rounded-2xl hover:opacity-90 transition-all shadow-2xl shadow-violet-500/25 glow-violet text-lg">
            Start Creating — Free
          </Link>
          <Link href="/agent"
            className="px-8 py-4 bg-white/[0.02] border border-white/10 text-slate-300 font-semibold rounded-2xl hover:bg-white/[0.05] transition-all text-lg">
            Meet the Agents →
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-16 border-t border-white/[0.04] bg-[#0d1220]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
                <SparkIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-xl">Vendora</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              AI-powered video production studio. 4 agents, zero cost, infinite creativity. Open source forever.
            </p>
          </div>
          {[
            { title: 'Product', links: ['Features', 'Showcase', 'Pricing', 'Agent', 'Blog'] },
            { title: 'Tools', links: ['Video Editor', 'Script Writer', 'YouTube Downloader', 'Voice Generator', 'Download'] },
            { title: 'Company', links: ['About', 'Contact', 'Help', 'GitHub', 'Blog'] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="text-slate-400 font-semibold text-sm mb-4">{col.title}</h4>
              <div className="space-y-2.5">
                {col.links.map(l => (
                  <Link key={l} href={`/${l.toLowerCase().replace(/\s+/g, '-')}`} className="block text-sm text-slate-500 hover:text-slate-300 transition-colors">{l}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">© 2026 Vendora AI · Built with CrewAI + Ollama + FFmpeg</p>
          <div className="flex items-center gap-4 text-xs text-slate-600">
            <span>Open Source</span>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <span>Free Forever</span>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <span>No API Keys</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════ PAGE ═══════ */

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] text-white antialiased">
      <Navbar />
      <Hero />
      <AgentTimeline />
      <FeaturesGrid />
      <PricingSection />
      <CTA />
      <Footer />
    </main>
  );
}
