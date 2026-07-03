'use client';

import Link from 'next/link';
import { LOCATION } from '@/lib/currency';

export default function PricingPage() {
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#771BFF] mb-3 block">Pricing</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4"><span className="text-[#771BFF]">Always</span> Free</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">Open source. No API keys. No credit cards. No subscription fees. Just install and create.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {[
            { n: 'Free Forever', p: '฿0', sub: '0 Ks MMK', d: 'All features included. No limits.', f: ['4-agent AI pipeline', 'YouTube downloader', '24 AI voices', '4K export quality', 'Self-hosted', 'Community support'], cta: 'Start creating', href: '/create', hl: true },
            { n: 'Codespace Cloud', p: '฿0', sub: '0 Ks MMK', d: 'Run in browser. Zero local setup.', f: ['GitHub Codespace deploy', 'Pre-configured env', 'Always online', 'Public URL', 'Auto-updates', 'Community support'], cta: 'Deploy now', href: '/help', hl: false },
          ].map(t => (
            <div key={t.n} className={`relative p-8 rounded-2xl border-2 transition-all ${t.hl ? 'border-[#771BFF]/30 bg-purple-50/30' : 'border-gray-200 bg-white'}`}>
              {t.hl && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#771BFF] text-white text-xs font-bold rounded-full">Most Popular</div>}
              <h3 className="text-xl font-bold text-gray-900 mb-1">{t.n}</h3>
              <div className="flex items-baseline gap-1 mb-1"><span className="text-4xl font-black text-[#771BFF]">{t.p}</span><span className="text-gray-400 text-sm">THB</span></div>
              <div className="text-sm text-gray-500 mb-2">{t.sub} · forever</div>
              <p className="text-sm text-gray-500 mb-6">{t.d}</p>
              <ul className="space-y-3 mb-8">
                {t.f.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href={t.href} className={`block text-center py-3 rounded-lg text-sm font-semibold ${t.hl ? 'bg-[#771BFF] text-white hover:bg-[#5B0FCC]' : 'border border-gray-300 text-gray-700 hover:border-[#771BFF] hover:text-[#771BFF]'}`}>{t.cta}</Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-400">Available in {LOCATION.flag} Thailand · 🇲🇲 Myanmar · 🌏 Worldwide</p>
        </div>

        <div className="mt-16 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-gray-900 text-center mb-8">Compare plans</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-gray-900 font-semibold">Feature</th>
                  <th className="text-center py-3 text-gray-900 font-semibold">Free Forever</th>
                  <th className="text-center py-3 text-gray-900 font-semibold">Codespace</th>
                </tr>
              </thead>
              <tbody>
                {['4-agent AI pipeline', '24 AI voices', 'YouTube downloader', '4K export', 'Open source', 'Community support'].map(f => (
                  <tr key={f} className="border-b border-gray-100">
                    <td className="py-3 text-gray-700">{f}</td>
                    <td className="text-center py-3 text-green-500">✓</td>
                    <td className="text-center py-3 text-green-500">✓</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
