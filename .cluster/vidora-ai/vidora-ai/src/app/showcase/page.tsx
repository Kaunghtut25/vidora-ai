'use client';

import Link from 'next/link';

const SHOWCASE = [
  { title: 'Movie Recap — Burmese Voiceover', tags: ['Burmese TTS', 'Scene Detection', 'Subtitle Burn'], views: '2.4K', dur: '0:34', grad: 'from-purple-500 to-pink-500' },
  { title: 'Product Review Edit', tags: ['Jump Cuts', 'Music Sync', 'Color Grade'], views: '5.1K', dur: '2:15', grad: 'from-blue-500 to-purple-500' },
  { title: 'Tutorial with AI Voiceover', tags: ['Edge TTS', 'Screen Record', 'Chapters'], views: '8.7K', dur: '4:30', grad: 'from-green-500 to-teal-500' },
  { title: 'Social Media Reel', tags: ['9:16 Crop', 'Captions', 'Trending'], views: '12K', dur: '0:45', grad: 'from-pink-500 to-rose-500' },
  { title: 'Documentary Edit', tags: ['4-Agent Pipeline', 'Color Grading', 'Ken Burns'], views: '3.2K', dur: '6:20', grad: 'from-amber-500 to-orange-500' },
  { title: 'Podcast to Video', tags: ['Audio Visualizer', 'Waveform', 'Thumbnail'], views: '1.8K', dur: '12:00', grad: 'from-indigo-500 to-violet-500' },
  { title: 'Tech Explainer', tags: ['AI Script', 'Motion Graphics', 'Voiceover'], views: '6.5K', dur: '3:00', grad: 'from-cyan-500 to-blue-500' },
  { title: 'Travel Vlog Edit', tags: ['Transitions', 'Music Beat', 'Color LUT'], views: '4.2K', dur: '5:00', grad: 'from-emerald-500 to-cyan-500' },
  { title: 'Cooking Tutorial', tags: ['Auto Cut', 'Overlay Text', 'Step Markers'], views: '3.9K', dur: '8:00', grad: 'from-red-500 to-orange-500' },
];

export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#771BFF] flex items-center justify-center text-white font-bold text-sm">V</div>
            <span className="font-bold text-lg text-gray-900">Vendora</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/features" className="text-sm text-gray-500 hover:text-gray-700">Features</Link>
            <Link href="/pricing" className="text-sm text-gray-500 hover:text-gray-700">Pricing</Link>
            <Link href="/create" className="px-4 py-2 bg-[#771BFF] text-white text-sm font-semibold rounded-lg hover:bg-[#5B0FCC]">Try free</Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#771BFF] mb-3 block">Showcase</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">Productions powered by <span className="text-[#771BFF]">Vendora</span></h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">Real videos created with the 4-agent AI pipeline. From movie recaps to social reels.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SHOWCASE.map(item => (
            <div key={item.title} className="group rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-[#771BFF]/30 transition-all cursor-pointer bg-white">
              <div className={`aspect-video bg-gradient-to-br ${item.grad} flex items-center justify-center relative`}>
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
                <span className="absolute bottom-3 right-3 px-2 py-1 bg-black/40 backdrop-blur-sm rounded text-xs text-white font-mono">{item.dur}</span>
              </div>
              <div className="p-5">
                <h3 className="text-gray-900 font-bold text-sm mb-3">{item.title}</h3>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {item.tags.map(t => (
                    <span key={t} className="px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-lg text-[10px] text-gray-500 font-medium">{t}</span>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span>{item.views} views</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/create" className="px-8 py-3.5 bg-[#771BFF] text-white font-semibold rounded-lg hover:bg-[#5B0FCC] transition-colors inline-flex items-center gap-2">
            Create your own →
          </Link>
        </div>
      </div>
    </div>
  );
}
