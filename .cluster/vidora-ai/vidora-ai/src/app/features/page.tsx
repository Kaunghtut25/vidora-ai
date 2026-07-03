'use client';

import Link from 'next/link';

const FEATURES = [
  { icon: '🔍', title: 'AI Video Analysis', desc: 'HKUDS agent scans every frame — detects scenes, objects, and speech patterns. Builds rich temporal video memory.', category: 'Intelligence' },
  { icon: '✍️', title: 'AI Scriptwriting', desc: 'FireRed generates professional scripts with emotional arcs, beat-synced storyboards, and visual flow plans.', category: 'Creation' },
  { icon: '✂️', title: 'Automated Editing', desc: 'video-use executes precise jump cuts, 30ms audio fades, and burns UPPERCASE subtitles. Self-evaluates output.', category: 'Editing' },
  { icon: '🎨', title: 'Cinematic Rendering', desc: 'LTX Engine applies AI transitions, color grades, and renders studio-quality H.264 at 1080p.', category: 'Output' },
  { icon: '🎤', title: '24 AI Voices', desc: 'Edge TTS powered — 20 professional English voices with natural prosody. Perfect for voiceovers and narration.', category: 'Audio' },
  { icon: '⬇️', title: 'YouTube Downloader', desc: 'Search, preview formats, and download videos/audio. Multi-quality MP4 + MP3 bitrates with background processing.', category: 'Tools' },
  { icon: '🦞', title: '4-Agent Pipeline', desc: 'CrewAI orchestrates HKUDS → FireRed → video-use → LTX. Sequential processing with self-evaluation at every stage.', category: 'Core' },
  { icon: '🔓', title: '100% Open Source', desc: 'No API keys. No subscriptions. No credit limits. Powered by free tools: Ollama, FFmpeg, yt-dlp, Edge TTS.', category: 'Freedom' },
  { icon: '☁️', title: 'Cloud Ready', desc: 'Deploy to GitHub Codespace instantly. Pre-configured environment. Zero local setup required.', category: 'Deployment' },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#771BFF] flex items-center justify-center text-white font-bold text-sm">V</div>
            <span className="font-bold text-lg text-gray-900">Vendora</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/showcase" className="text-sm text-gray-500 hover:text-gray-700">Showcase</Link>
            <Link href="/pricing" className="text-sm text-gray-500 hover:text-gray-700">Pricing</Link>
            <Link href="/create" className="px-4 py-2 bg-[#771BFF] text-white text-sm font-semibold rounded-lg hover:bg-[#5B0FCC]">Try free</Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#771BFF] mb-3 block">Features</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">Everything you need to <span className="text-[#771BFF]">ship videos</span></h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">A complete video production platform — from AI analysis to final rendering. Free and open source.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(f => (
            <div key={f.title} className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#771BFF]/30 hover:shadow-lg transition-all group">
              <div className="flex items-start justify-between mb-4">
                <span className="text-2xl">{f.icon}</span>
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{f.category}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#771BFF] transition-colors">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
