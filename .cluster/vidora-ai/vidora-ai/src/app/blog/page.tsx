'use client';

import Link from 'next/link';

const POSTS = [
  { title: 'Introducing the 4-Agent Video Pipeline', date: 'July 3, 2026', excerpt: 'How CrewAI orchestrates four specialized AI agents — HKUDS, FireRed, video-use, and LTX — to produce studio-quality videos automatically.', tag: 'Product', read: '4 min' },
  { title: 'Why We Built Vendora with Open Source AI', date: 'July 1, 2026', excerpt: 'No API keys. No subscriptions. No credit limits. How we built a complete AI video production platform using only free, open-source tools.', tag: 'Engineering', read: '6 min' },
  { title: 'FFmpeg Ken Burns Effect: Cinematic Image-to-Video', date: 'June 28, 2026', excerpt: 'A deep dive into creating smooth Ken Burns pan-and-zoom effects using FFmpeg\'s zoompan filter — with color grading and vignette.', tag: 'Tutorial', read: '8 min' },
  { title: '24 AI Voices for Video Voiceovers', date: 'June 25, 2026', excerpt: 'How to use Edge TTS for professional English voiceovers. Complete guide with voice samples, prosody control, and integration tips.', tag: 'Guide', read: '5 min' },
  { title: 'Deploying AI Video Agents to GitHub Codespace', date: 'June 22, 2026', excerpt: 'Run the entire Vendora pipeline in the cloud for free. Pre-configured dev environment with Ollama, CrewAI, and FFmpeg.', tag: 'DevOps', read: '7 min' },
  { title: 'Movie Recaps: From YouTube Link to Burmese Voiceover', date: 'June 20, 2026', excerpt: 'How we built an automated pipeline that takes a YouTube movie link and produces a Burmese-narrated recap with scene screenshots.', tag: 'Case Study', read: '10 min' },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#771BFF] flex items-center justify-center text-white font-bold text-sm">V</div>
            <span className="font-bold text-lg text-gray-900">Vendora</span>
          </Link>
          <Link href="/create" className="px-4 py-2 bg-[#771BFF] text-white text-sm font-semibold rounded-lg hover:bg-[#5B0FCC]">Try free</Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#771BFF] mb-3 block">Blog</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">Vendora <span className="text-[#771BFF]">Blog</span></h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">Stories, tutorials, and updates from the Vendora team.</p>
        </div>

        <div className="space-y-8">
          {POSTS.map(post => (
            <article key={post.title} className="group border border-gray-200 rounded-2xl p-6 hover:border-[#771BFF]/30 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2.5 py-1 bg-purple-50 text-[#771BFF] text-xs font-semibold rounded-lg">{post.tag}</span>
                <span className="text-xs text-gray-400">{post.date}</span>
                <span className="text-xs text-gray-400">· {post.read} read</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#771BFF] transition-colors">{post.title}</h2>
              <p className="text-gray-500 leading-relaxed">{post.excerpt}</p>
              <div className="mt-4 text-sm font-semibold text-[#771BFF] group-hover:underline">Read more →</div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
