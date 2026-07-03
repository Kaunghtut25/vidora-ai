'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LOCATION } from '@/lib/currency';

/* ═══════ ICONS ═══════ */
const I = {
  Play: ({ c = 'w-5 h-5' }) => <svg className={c} fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>,
  Arrow: ({ c = 'w-5 h-5' }) => <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>,
  Check: ({ c = 'w-5 h-5' }) => <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>,
  Spark: ({ c = 'w-5 h-5' }) => <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/></svg>,
  Eye: ({ c = 'w-5 h-5' }) => <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
  Script: ({ c = 'w-5 h-5' }) => <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>,
  Cut: ({ c = 'w-5 h-5' }) => <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.2M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.2m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664"/></svg>,
  Wand: ({ c = 'w-5 h-5' }) => <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"/></svg>,
  Star: ({ c = 'w-5 h-5' }) => <svg className={c} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  Bullet: () => <svg className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/></svg>,
};

/* ═══════ DATA ═══════ */
const PARTNERS = [
  'Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 'Apple', 'Spotify', 'Adobe',
  'Salesforce', 'Oracle', 'IBM', 'Intel', 'Samsung', 'Sony', 'NVIDIA', 'Tesla',
];

const TABS = [
  { id: 'ai', label: 'AI Video Editing', icon: I.Spark },
  { id: 'agents', label: '4-Agent Pipeline', icon: I.Eye },
  { id: 'tools', label: 'Editing Tools', icon: I.Cut },
  { id: 'render', label: 'Rendering', icon: I.Wand },
];

const TAB_CONTENT: Record<string, { title: string; desc: string; bullets: string[]; img: string }> = {
  ai: {
    title: 'Bring AI where video content happens',
    desc: 'Get integrated AI that analyzes footage, writes scripts, edits cuts, and renders final output — all through a 4-agent pipeline powered by CrewAI and Ollama.',
    bullets: ['AI Scene Detection: HKUDS scans every frame for objects, scenes, and speech patterns', 'AI Scriptwriting: FireRed generates emotional narratives with beat-synced storyboards', 'AI Editing: video-use executes precise cuts, fades, and subtitle burns autonomously', 'AI Rendering: LTX applies transitions, color grades, and outputs studio-quality 1080p H.264'],
    img: 'from-purple-500/20 to-purple-600/10'
  },
  agents: {
    title: 'Four specialized agents, one seamless pipeline',
    desc: 'Each agent masters one craft. HKUDS analyzes, FireRed writes, video-use edits, LTX renders. Sequential processing with self-evaluation at every stage.',
    bullets: ['Sequential workflow: data flows from one agent to the next automatically', 'Self-evaluation loops: video-use reviews its own output and fixes issues', 'CrewAI orchestration: agents collaborate with defined roles and shared context', 'Ollama-powered: runs locally with gemma3:4b — zero API costs'],
    img: 'from-blue-500/20 to-blue-600/10'
  },
  tools: {
    title: 'Professional editing, fully automated',
    desc: 'Jump cuts at word boundaries. 30ms audio cross-fades. UPPERCASE subtitle burning. Cinematic color grading. Everything happens automatically.',
    bullets: ['FFmpeg-powered: industry-standard encoding and processing', 'Ken Burns effects: smooth pan and zoom with vignette', '24 AI voices: Edge TTS with natural English prosody', 'YouTube integration: download, extract frames, generate recaps'],
    img: 'from-green-500/20 to-green-600/10'
  },
  render: {
    title: 'Studio-quality output, every time',
    desc: 'AI transitions between scenes. Professional color grading. H.264 1080p final encode. Ready for YouTube, social media, or broadcast.',
    bullets: ['H.264 1080p: crisp, high-quality output optimized for web', 'AI scene transitions: smooth cross-fades generated between cuts', 'Color grading: cinematic teal-and-orange or custom LUTs', 'Multi-format: MP4, MOV, MKV — whatever you need'],
    img: 'from-amber-500/20 to-amber-600/10'
  },
};

const CAPABILITIES = [
  { icon: I.Eye, title: 'AI Analysis', desc: 'HKUDS agent scans every frame — detects scenes, objects, and speech patterns.' },
  { icon: I.Script, title: 'Scriptwriting', desc: 'FireRed generates professional scripts with emotional arcs and storyboards.' },
  { icon: I.Cut, title: 'Auto Editing', desc: 'video-use executes jump cuts, audio fades, and subtitle burns with LLM precision.' },
  { icon: I.Wand, title: 'Rendering', desc: 'LTX applies AI transitions, color grades, and renders 1080p H.264 output.' },
  { icon: I.Spark, title: '24 AI Voices', desc: 'Edge TTS powered — natural English voiceovers with professional prosody.' },
  { icon: I.Star, title: 'Open Source', desc: 'No API keys. No subscriptions. Everything runs free on your machine.' },
];

const STATS = [
  { value: '4', suffix: '', label: 'AI Agents' },
  { value: '24', suffix: '', label: 'Voices' },
  { value: '4K', suffix: '', label: 'Export Quality' },
  { value: '0', suffix: '', label: 'Cost' },
];

const TESTIMONIALS = [
  { quote: 'Vendora saved me 80+ hours per video. The 4-agent pipeline is like having an entire production team in my laptop.', name: 'Ko Kaung', role: 'Content Creator', location: '🇹🇭 Thailand' },
  { quote: 'I used to spend days editing. Now I drop footage and Vendora\'s agents handle everything. The results are cinema-quality.', name: 'Aung Myint', role: 'YouTuber', location: '🇲🇲 Myanmar' },
  { quote: 'The self-evaluation feature is incredible — the editor agent actually reviews its own work and fixes mistakes. Game changer.', name: 'Sarah Chen', role: 'Video Producer', location: '🇸🇬 Singapore' },
];

/* ═══════ COMPONENTS ═══════ */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm' : 'bg-white border-b border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#771BFF] flex items-center justify-center font-bold text-sm text-white">V</div>
            <span className="font-bold text-lg text-gray-900 tracking-tight">Vendora</span>
          </Link>
          <div className="hidden lg:flex items-center gap-1">
            {['Features', 'Showcase', 'Pricing', 'Agent', 'Docs'].map(l => (
              <Link key={l} href={`/${l.toLowerCase()}`} className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-all">{l}</Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-xs text-gray-400">{LOCATION.flag} Thailand</span>
            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900 px-3 py-2">Sign in</Link>
            <Link href="/create" className="px-5 py-2.5 bg-[#771BFF] text-white text-sm font-semibold rounded-lg hover:bg-[#5B0FCC] transition-colors">
              Try free
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ═══ HERO ═══ */
function Hero() {
  return (
    <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
              The{' '}
              <span className="gradient-purple">AI-powered</span>
              <br />
              video editing platform
              <br />
              for every creator
            </h1>
            <p className="text-lg text-gray-500 max-w-xl mb-8 leading-relaxed">
              4 AI agents analyze, script, cut, and render your videos. Open source. Free forever. Built for creators in {LOCATION.flag} Thailand, 🇲🇲 Myanmar, and worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/create" className="btn-primary px-8 py-3.5 text-base">
                <I.Play c="w-5 h-5" /> Explore Vendora free
              </Link>
              <Link href="/showcase" className="btn-outline px-8 py-3.5 text-base">
                View showcase
              </Link>
            </div>
          </div>

          {/* Right: Signup card */}
          <div className="lg:pl-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-1">Vendora{' '}
                  <span className="gradient-purple font-extrabold">Free</span>
                </h2>
                <p className="text-sm text-gray-500">No credit card required</p>
              </div>
              <Link href="/create" className="block w-full text-center py-3 bg-[#771BFF] text-white font-semibold rounded-lg hover:bg-[#5B0FCC] transition-colors mb-4">
                Create account
              </Link>
              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
                <div className="relative flex justify-center text-sm"><span className="px-3 bg-white text-gray-400">OR</span></div>
              </div>
              <Link href="/create" className="block w-full text-center py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors mb-6">
                Start editing now
              </Link>
              <div className="flex justify-center gap-4">
                <div className="text-center"><div className="text-sm font-bold text-gray-900">฿0</div><div className="text-[10px] text-gray-400">THB</div></div>
                <div className="text-center"><div className="text-sm font-bold text-gray-900">0 Ks</div><div className="text-[10px] text-gray-400">MMK</div></div>
                <div className="text-center"><div className="text-sm font-bold text-gray-900">$0</div><div className="text-[10px] text-gray-400">USD</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ PARTNER SCROLL ═══ */
function PartnerScroll() {
  return (
    <section className="py-12 border-y border-gray-100 bg-gray-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden" style={{ maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}>
          <div className="partner-scroll py-4">
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <div key={i} className="flex-shrink-0 px-6">
                <span className="text-lg font-bold text-gray-300 whitespace-nowrap">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ TABBED FEATURES ═══ */
function TabbedFeatures() {
  const [active, setActive] = useState('ai');
  const content = TAB_CONTENT[active];

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-1 mb-12 border-b border-gray-200">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setActive(t.id)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-all border-b-2 -mb-px ${
                active === t.id ? 'text-[#771BFF] border-[#771BFF]' : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}>
              <t.icon c="w-4 h-4" /> {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">{content.title}</h3>
            <p className="text-gray-500 mb-6 leading-relaxed">{content.desc}</p>
            <ul className="space-y-4">
              {content.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                  <I.Bullet />
                  <span dangerouslySetInnerHTML={{ __html: b.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900">$1</strong>') }} />
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link href="/features" className="btn-outline text-sm px-6 py-2.5">Explore all features</Link>
            </div>
          </div>
          <div className={`aspect-[4/3] rounded-2xl bg-gradient-to-br ${content.img} flex items-center justify-center border border-gray-100`}>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#771BFF]/10 flex items-center justify-center mx-auto mb-4">
                {active === 'ai' && <I.Spark c="w-8 h-8 text-[#771BFF]" />}
                {active === 'agents' && <I.Eye c="w-8 h-8 text-[#771BFF]" />}
                {active === 'tools' && <I.Cut c="w-8 h-8 text-[#771BFF]" />}
                {active === 'render' && <I.Wand c="w-8 h-8 text-[#771BFF]" />}
              </div>
              <p className="text-sm text-gray-400">Interactive preview</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ CAPABILITY CARDS ═══ */
function CapabilityCards() {
  return (
    <section className="section-padding bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="section-title mb-4">Everything you need to <span className="gradient-purple">ship videos</span></h2>
          <p className="section-subtitle max-w-2xl mx-auto">From AI analysis to final rendering — a complete production pipeline, free and open source.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAPABILITIES.map(c => (
            <div key={c.title} className="card-white p-6 hover:-translate-y-1">
              <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center mb-4">
                <c.icon c="w-5 h-5 text-[#771BFF]" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{c.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/features" className="btn-primary">View all capabilities</Link>
        </div>
      </div>
    </section>
  );
}

/* ═══ AGENT PIPELINE ═══ */
function AgentPipeline() {
  const agents = [
    { n: '01', icon: I.Eye, name: 'HKUDS VideoAgent', desc: 'Analyzes raw footage, detects scenes & objects, builds temporal video memory.', color: '#771BFF' },
    { n: '02', icon: I.Script, name: 'FireRed-OpenStoryline', desc: 'Generates rhythm-aware narratives and emotional scripts with beat-synced storyboards.', color: '#A855F7' },
    { n: '03', icon: I.Cut, name: 'video-use', desc: 'Executes jump cuts, 30ms audio fades, subtitle burns. Self-evaluates output.', color: '#06B6D4' },
    { n: '04', icon: I.Wand, name: 'LTX Engine', desc: 'AI transitions, cinematic color grading, final H.264 1080p render.', color: '#10B981' },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#771BFF] mb-3 block">The Engine</span>
          <h2 className="section-title mb-4">The <span className="gradient-purple">4-Agent</span> Pipeline</h2>
          <p className="section-subtitle max-w-xl mx-auto">Each agent masters one craft. Together, they produce cinema.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {agents.map((a, i) => (
            <div key={a.n} className="card-white p-6 group cursor-pointer">
              <div className="text-5xl font-black text-gray-100 mb-3">{a.n}</div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${a.color}15` }}>
                <a.icon c="w-6 h-6" style={{ color: a.color }} />
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">{a.name}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{a.desc}</p>
              {i < 3 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-gray-300 text-lg z-10">→</div>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-3 mt-12">
          {['Upload Footage', 'AI Analysis', 'Script Writing', 'Auto Edit', 'Final Render'].map((step, i) => (
            <div key={step} className="flex items-center">
              <span className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-600">{step}</span>
              {i < 4 && <span className="text-gray-300 mx-1.5">→</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ STATS ═══ */
function StatsSection() {
  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl sm:text-5xl font-black text-gray-900 mb-1">
                {s.suffix}{s.value}
              </div>
              <div className="text-sm text-gray-500 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ TESTIMONIALS ═══ */
function Testimonials() {
  return (
    <section className="section-padding bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-center mb-14">Creators <span className="gradient-purple">love Vendora</span></h2>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(t => (
            <div key={t.name} className="card-white p-6">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => <I.Star key={i} c="w-4 h-4 text-amber-400" />)}
              </div>
              <blockquote className="text-sm text-gray-600 leading-relaxed mb-5 italic">"{t.quote}"</blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#771BFF]/10 flex items-center justify-center text-sm font-bold text-[#771BFF]">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.role} · {t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ PRICING ═══ */
function Pricing() {
  const tiers = [
    { n: 'Free Forever', p: '฿0', sub: '0 Ks', d: 'All features. Zero cost.', f: ['4-agent AI pipeline', '24 voices', '4K export', 'Self-hosted', 'YouTube downloader', 'Community support'], cta: 'Start creating', href: '/create', hl: true },
    { n: 'Codespace', p: '฿0', sub: '0 Ks', d: 'Cloud-hosted. Instant setup.', f: ['GitHub Codespace', 'Pre-configured', 'Always online', 'Public URL', 'Auto-updates', 'Community support'], cta: 'Deploy now', href: '/help', hl: false },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#771BFF] mb-3 block">Pricing</span>
          <h2 className="section-title mb-4"><span className="gradient-purple">Always</span> Free</h2>
          <p className="section-subtitle max-w-xl mx-auto">No API keys. No subscriptions. No credit cards. Just install and create.</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {tiers.map(t => (
            <div key={t.n} className={`relative p-8 rounded-2xl border-2 transition-all ${t.hl ? 'border-[#771BFF]/30 bg-purple-50/30' : 'border-gray-200 bg-white'}`}>
              {t.hl && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#771BFF] text-white text-xs font-bold rounded-full">Most Popular</div>}
              <h3 className="text-xl font-bold text-gray-900 mb-1">{t.n}</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-black text-[#771BFF]">{t.p}</span>
                <span className="text-gray-400 text-sm">THB</span>
              </div>
              <div className="text-sm text-gray-500 mb-2">{t.sub} · forever</div>
              <p className="text-sm text-gray-500 mb-6">{t.d}</p>
              <ul className="space-y-3 mb-8">
                {t.f.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600"><I.Check c="w-4 h-4 text-green-500 flex-shrink-0" />{f}</li>
                ))}
              </ul>
              <Link href={t.href} className={`block text-center py-3 rounded-lg text-sm font-semibold transition-all ${t.hl ? 'bg-[#771BFF] text-white hover:bg-[#5B0FCC]' : 'border border-gray-300 text-gray-700 hover:border-[#771BFF] hover:text-[#771BFF]'}`}>{t.cta}</Link>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-400 mt-6">Available in {LOCATION.flag} Thailand · 🇲🇲 Myanmar · 🌏 Worldwide</p>
      </div>
    </section>
  );
}

/* ═══ CTA ═══ */
function CTASection() {
  return (
    <section className="section-padding bg-gray-50/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="section-title mb-6">Ready to let AI<br /><span className="gradient-purple">edit your videos?</span></h2>
        <p className="section-subtitle max-w-2xl mx-auto mb-10">Drop your footage. 4 AI agents handle everything. Open source. Free forever. Built for creators everywhere — including {LOCATION.flag} Thailand.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Link href="/create" className="btn-primary px-10 py-4 text-base">Start creating — free</Link>
          <Link href="/agent" className="btn-outline px-10 py-4 text-base">Meet the agents →</Link>
        </div>
      </div>
    </section>
  );
}

/* ═══ FOOTER ═══ */
function FooterSection() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#771BFF] flex items-center justify-center font-bold text-sm text-white">V</div>
              <span className="font-bold text-lg text-gray-900">Vendora</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs mb-4">AI-powered video production studio. 4 agents, zero cost, infinite creativity. Open source forever.</p>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <span>{LOCATION.flag} Thailand</span><span>·</span><span>🇲🇲 Myanmar</span>
            </div>
          </div>
          {[
            { t: 'Product', links: [['Features', '/features'], ['Showcase', '/showcase'], ['Pricing', '/pricing'], ['Agent', '/agent'], ['Docs', '/help']] },
            { t: 'Tools', links: [['Video Editor', '/create'], ['Downloader', '/download'], ['Voices', '/features'], ['Script Writer', '/agent']] },
            { t: 'Company', links: [['About', '/about'], ['Contact', '/contact'], ['GitHub', 'https://github.com/Kaunghtut25/vidora-ai'], ['Blog', '/blog']] },
          ].map(c => (
            <div key={c.t}><h4 className="text-sm font-bold text-gray-900 mb-4">{c.t}</h4><div className="space-y-3">{c.links.map(([label, href]) => <Link key={label} href={href} className="block text-sm text-gray-500 hover:text-gray-900 transition-colors">{label}</Link>)}</div></div>
          ))}
        </div>
        <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">© 2026 Vendora AI · Built with CrewAI + Ollama + FFmpeg</p>
          <div className="flex items-center gap-5 text-xs text-gray-400"><span>Open Source</span><span>·</span><span>Free Forever</span><span>·</span><span>No API Keys</span></div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════ PAGE ═══════ */
export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 antialiased">
      <Navbar />
      <Hero />
      <PartnerScroll />
      <TabbedFeatures />
      <CapabilityCards />
      <AgentPipeline />
      <StatsSection />
      <Testimonials />
      <Pricing />
      <CTASection />
      <FooterSection />
    </main>
  );
}
