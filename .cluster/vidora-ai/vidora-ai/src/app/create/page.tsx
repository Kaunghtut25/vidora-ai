'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function CreatePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#771BFF] flex items-center justify-center text-white font-bold text-sm">V</div>
            <span className="font-bold text-lg text-gray-900">Vendora</span>
          </Link>
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">← Back to home</Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Start Creating with <span className="text-[#771BFF]">Vendora</span></h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">Choose how you want to create your video. Our 4 AI agents are ready to help.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            { title: 'AI Video Production', desc: 'Upload footage — 4 agents handle everything', href: '/agent', icon: '🎬', color: 'bg-purple-50 border-purple-200' },
            { title: 'YouTube Downloader', desc: 'Download videos, extract audio, get formats', href: '/download', icon: '⬇️', color: 'bg-blue-50 border-blue-200' },
            { title: 'AI Voice Generator', desc: '24 professional English voices via Edge TTS', href: '/features', icon: '🎤', color: 'bg-green-50 border-green-200' },
            { title: 'Script Writer', desc: 'AI-powered script generation for any topic', href: '/agent', icon: '✍️', color: 'bg-amber-50 border-amber-200' },
            { title: 'Video Editor', desc: 'Manual FFmpeg-based editing controls', href: '/dashboard', icon: '✂️', color: 'bg-rose-50 border-rose-200' },
            { title: 'View Showcase', desc: 'See what other creators have produced', href: '/showcase', icon: '🎥', color: 'bg-teal-50 border-teal-200' },
          ].map(item => (
            <Link key={item.title} href={item.href}
              className={`p-6 rounded-2xl border-2 ${item.color} hover:shadow-lg transition-all group`}>
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#771BFF]">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </Link>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Quick Start — Command Line</h2>
          <div className="bg-gray-900 text-green-400 rounded-xl p-6 text-left font-mono text-sm max-w-lg mx-auto">
            <div className="text-gray-500 mb-2"># Install & run Vendora locally</div>
            <div>$ git clone https://github.com/Kaunghtut25/vidora-ai.git</div>
            <div>$ cd vidora-ai</div>
            <div>$ npm install</div>
            <div>$ npm run dev</div>
            <div className="text-gray-500 mt-3"># Open http://localhost:3000</div>
          </div>
          <p className="text-sm text-gray-400 mt-4">Or use our <Link href="/help" className="text-[#771BFF] hover:underline">Codespace guide</Link> to run instantly in the cloud</p>
        </div>
      </div>
    </div>
  );
}
