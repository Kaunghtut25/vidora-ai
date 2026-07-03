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

function EyeIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

function ClockIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
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

interface ShowcaseItem {
  title: string;
  duration: string;
  views: string;
  gradient: string;
  category: string;
  desc: string;
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  { title: 'The AI Revolution in 2026', duration: '3:42', views: '124K', gradient: 'from-[#8B5CF6] via-[#06B6D4] to-[#22D3EE]', category: 'Technology', desc: 'How AI is reshaping industries worldwide' },
  { title: 'Hidden Temples of Bagan', duration: '5:18', views: '89K', gradient: 'from-[#06B6D4] via-[#e07020] to-[#c05020]', category: 'Travel', desc: 'Exploring Myanmar\'s ancient wonders' },
  { title: 'Startup Funding Masterclass', duration: '2:05', views: '56K', gradient: 'from-[#22D3EE] via-[#06B6D4] to-[#8B5CF6]', category: 'Business', desc: 'How to pitch and raise your first round' },
  { title: 'Ocean Depths: Coral Reefs', duration: '4:30', views: '201K', gradient: 'from-[#8B5CF6] via-[#e04030] to-[#c03050]', category: 'Nature', desc: 'Underwater cinematography at its finest' },
  { title: 'Quantum Computing Explained', duration: '6:12', views: '178K', gradient: 'from-[#06B6D4] via-[#22D3EE] to-[#e0a020]', category: 'Science', desc: 'Understanding the future of computation' },
  { title: 'Street Food: Yangon Edition', duration: '3:55', views: '67K', gradient: 'from-[#8B5CF6] via-[#c04030] to-[#22D3EE]', category: 'Food', desc: 'A culinary journey through Myanmar' },
  { title: 'Future of Renewable Energy', duration: '4:48', views: '92K', gradient: 'from-[#22D3EE] via-[#8B5CF6] to-[#06B6D4]', category: 'Technology', desc: 'Solar, wind, and beyond' },
  { title: 'Ancient Civilizations: Rome', duration: '7:22', views: '145K', gradient: 'from-[#06B6D4] via-[#c04030] to-[#8B5CF6]', category: 'History', desc: 'The rise and fall of the Roman Empire' },
  { title: 'Mindfulness & Meditation', duration: '3:10', views: '233K', gradient: 'from-[#8B5CF6] via-[#a05060] to-[#22D3EE]', category: 'Wellness', desc: 'Finding calm in a chaotic world' },
  { title: 'SpaceX Starship Update', duration: '5:45', views: '189K', gradient: 'from-[#22D3EE] via-[#8B5CF6] to-[#06B6D4]', category: 'Science', desc: 'Latest developments in space exploration' },
  { title: 'Myanmar Tea Culture', duration: '4:15', views: '34K', gradient: 'from-[#06B6D4] via-[#22D3EE] to-[#e0a020]', category: 'Food', desc: 'The art of Burmese tea making' },
  { title: 'Building a SaaS in 2026', duration: '8:20', views: '312K', gradient: 'from-[#8B5CF6] via-[#06B6D4] to-[#22D3EE]', category: 'Business', desc: 'From idea to launch in 30 days' },
];

const CATEGORIES = [
  { key: 'All', count: SHOWCASE_ITEMS.length },
  { key: 'Technology', count: SHOWCASE_ITEMS.filter((i) => i.category === 'Technology').length },
  { key: 'Travel', count: SHOWCASE_ITEMS.filter((i) => i.category === 'Travel').length },
  { key: 'Business', count: SHOWCASE_ITEMS.filter((i) => i.category === 'Business').length },
  { key: 'Nature', count: SHOWCASE_ITEMS.filter((i) => i.category === 'Nature').length },
  { key: 'Science', count: SHOWCASE_ITEMS.filter((i) => i.category === 'Science').length },
  { key: 'Food', count: SHOWCASE_ITEMS.filter((i) => i.category === 'Food').length },
  { key: 'History', count: SHOWCASE_ITEMS.filter((i) => i.category === 'History').length },
  { key: 'Wellness', count: SHOWCASE_ITEMS.filter((i) => i.category === 'Wellness').length },
];

/* ── Navbar ── */
function Navbar({ scrolled }: { scrolled: boolean }) {
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/[0.06] bg-[#06080D]/85 backdrop-blur-2xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="Vendora Home">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#22D3EE] flex items-center justify-center font-bold text-sm shadow-lg shadow-violet-500/25 group-hover:shadow-violet-500/40 transition-shadow duration-300">
              V
            </div>
            <span className="font-bold text-lg tracking-tight">Vendora</span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                  link.href === '/showcase'
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
            className="hidden md:inline-flex items-center px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] text-sm font-semibold shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 hover:scale-[1.02] transition-all duration-200"
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
    <footer className="border-t border-white/[0.06] bg-[#06080D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#22D3EE] flex items-center justify-center font-bold text-sm shadow-lg shadow-violet-500/25">V</div>
              <span className="font-bold text-lg tracking-tight">Vendora</span>
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
          <p className="text-sm text-white/30">© 2026 Vendora Inc. All rights reserved.</p>
          <p className="text-sm text-white/30">Vendora Inc., 350 Fifth Avenue, Suite 3300, New York, NY 10118</p>
        </div>
      </div>
    </footer>
  );
}

/* ── Page ── */
export default function ShowcasePage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredItems =
    activeCategory === 'All'
      ? SHOWCASE_ITEMS
      : SHOWCASE_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#06080D] text-white overflow-x-hidden">
      <Navbar scrolled={scrolled} />

      <main>
        {/* ═══════════ HEADER ═══════════ */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#8B5CF6]/6 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#22D3EE]/5 blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <span className="inline-block px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] text-xs font-medium text-white/50 mb-6">
                Showcase
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
                Made with{' '}
                <span className="bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] bg-clip-text text-transparent">
                  Vendora
                </span>
              </h1>
              <p className="text-base sm:text-lg text-white/40 max-w-xl mx-auto leading-relaxed">
                Explore videos created by our community — all produced with Vendora AI.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════ CATEGORY FILTER ═══════════ */}
        <section className="pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat.key
                      ? 'bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] text-white shadow-lg shadow-violet-500/20'
                      : 'border border-white/[0.08] bg-white/[0.02] text-white/50 hover:text-white hover:border-white/[0.15]'
                  }`}
                >
                  {cat.key}
                  <span
                    className={`ml-1.5 text-[10px] ${
                      activeCategory === cat.key ? 'text-white/60' : 'text-white/20'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ GALLERY ═══════════ */}
        <section className="py-8 pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredItems.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-white/30 text-lg">No videos in this category yet.</p>
                <Link
                  href="/create/step1"
                  className="inline-block mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] text-sm font-semibold shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 transition-all"
                >
                  Create the First One →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredItems.map((item) => (
                  <div
                    key={item.title}
                    className="group cursor-pointer"
                    onMouseEnter={() => setHoveredItem(item.title)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {/* Thumbnail */}
                    <div
                      className={`relative aspect-video rounded-2xl bg-gradient-to-br ${item.gradient} overflow-hidden shadow-xl shadow-black/20`}
                    >
                      {/* Overlay darkens when not hovered */}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300" />

                      {/* Category badge */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/50 backdrop-blur-md text-[11px] font-medium text-white/90">
                        {item.category}
                      </div>

                      {/* Duration badge */}
                      <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/50 backdrop-blur-md text-[11px] font-medium text-white/70">
                        <ClockIcon className="w-3 h-3" />
                        {item.duration}
                      </div>

                      {/* Play button (appears on hover) */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/10">
                          <PlayIcon className="w-6 h-6 text-white ml-1" />
                        </div>
                      </div>

                      {/* Views counter (bottom) */}
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-[11px] text-white/60">
                        <EyeIcon className="w-3.5 h-3.5" />
                        {item.views} views
                      </div>
                    </div>

                    {/* Info */}
                    <div className="mt-3 px-1">
                      <h3 className="font-semibold text-sm text-white/80 group-hover:text-white transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-white/35 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Load More */}
            <div className="text-center mt-14">
              <button className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-white/[0.1] bg-white/[0.02] text-sm font-medium text-white/50 hover:text-white hover:border-white/[0.2] hover:bg-white/[0.04] transition-all duration-200">
                Load More Videos
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* ═══════════ CTA ═══════════ */}
        <section className="py-16 border-t border-white/[0.04]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-[#8B5CF6]/8 via-[#06B6D4]/4 to-[#22D3EE]/8 p-10 sm:p-16 lg:p-20 text-center">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-[#8B5CF6]/15 blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 left-1/4 w-[400px] h-[200px] bg-[#22D3EE]/10 blur-[90px] pointer-events-none" />

              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                  Your story, your showcase
                </h2>
                <p className="text-base sm:text-lg text-white/50 mb-8 max-w-lg mx-auto leading-relaxed">
                  Join creators worldwide using Vendora to turn ideas into stunning videos.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/create/step1"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] font-semibold text-base shadow-xl shadow-violet-500/25 hover:shadow-violet-500/45 hover:scale-[1.02] transition-all duration-200"
                  >
                    Start Creating Free
                    <span className="ml-2 opacity-70">→</span>
                  </Link>
                  <Link
                    href="/features"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 rounded-xl border border-white/[0.12] font-semibold text-base text-white/70 hover:text-white hover:bg-white/[0.04] transition-all duration-200"
                  >
                    Explore Features
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
