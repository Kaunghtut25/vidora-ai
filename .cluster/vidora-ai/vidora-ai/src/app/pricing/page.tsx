'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Check, Download, Sparkles, Star } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { LOCATION } from '@/lib/currency';

const plans = [
  {
    name: 'Self-Hosted', color: 'from-purple-500/20 to-violet-500/10', icon: Download, iconBg: 'bg-purple-500/15', iconColor: 'text-purple-400',
    desc: 'Run on your machine. Full control. No limits.',
    features: ['4-agent AI pipeline', 'YouTube downloader', '24 AI voices', '4K export quality', 'Local processing', 'Community support'],
    href: '/create/step1', popular: true,
  },
  {
    name: 'Codespace Cloud', color: 'from-cyan-500/20 to-sky-500/10', icon: Sparkles, iconBg: 'bg-cyan-500/15', iconColor: 'text-cyan-400',
    desc: 'Instant cloud setup. Zero config.',
    features: ['GitHub Codespace deploy', 'Always online', 'Public URL', 'Auto-updates', 'Same free tools', 'Community support'],
    href: '/help', popular: false,
  },
];

const features = ['4-agent AI pipeline', '24 AI voices', 'YouTube downloader', '4K export', 'Open source', 'Community support'];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#050508]">
        {/* Hero */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/6 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-300 mb-8"
            >
              <Star className="w-3.5 h-3.5" />
              Pricing
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6"
            >
              Always{' '}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Free</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}
              className="text-lg text-gray-400 max-w-md mx-auto"
            >
              ฿0 THB / 0 Ks MMK — forever. Open source, no tricks.
            </motion.p>
          </div>
        </section>

        {/* Plans */}
        <section className="px-6 pb-24">
          <div className="max-w-3xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-6">
              {plans.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-md p-8 hover:bg-white/[0.05] hover:border-purple-500/20 transition-all duration-300"
                >
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-purple-600 text-white text-xs font-bold rounded-full shadow-lg shadow-purple-500/20">
                      Most Popular
                    </div>
                  )}

                  {/* Card header image */}
                  <div className={`relative h-28 -mx-8 -mt-8 mb-6 rounded-t-2xl overflow-hidden bg-gradient-to-br ${plan.color}`}>
                    <svg className="absolute inset-0 w-full h-full opacity-[0.06]" viewBox="0 0 400 140">
                      <rect x="20" y="20" width="80" height="100" rx="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      <rect x="110" y="50" width="80" height="70" rx="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      <rect x="200" y="30" width="80" height="90" rx="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      <rect x="290" y="60" width="80" height="60" rx="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    <div className={`absolute bottom-4 left-6 w-11 h-11 rounded-xl ${plan.iconBg} flex items-center justify-center`}>
                      <plan.icon className={`w-6 h-6 ${plan.iconColor}`} />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                  <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-1">฿0</div>
                  <p className="text-sm text-gray-400 mb-6">{plan.desc}</p>
                  <ul className="space-y-2.5 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-gray-300">
                        <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={plan.href}
                    className="block w-full py-3 text-center rounded-xl border border-purple-500/30 bg-purple-500/[0.08] text-purple-300 text-sm font-semibold hover:bg-purple-500/[0.15] hover:text-purple-200 hover:border-purple-500/50 transition-all"
                  >
                    Get Started Free
                  </Link>
                </motion.div>
              ))}
            </div>

            <p className="text-center text-sm text-gray-600 mt-6">Available in {LOCATION.flag} Thailand · 🇲🇲 Myanmar · 🌏 Worldwide</p>
          </div>
        </section>

        {/* Feature comparison table */}
        <section className="px-6 pb-24">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h3 className="text-xl font-bold text-white">Compare Plans</h3>
            </motion.div>

            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-md overflow-hidden">
              <div className="grid grid-cols-3 px-6 py-4 border-b border-white/[0.04]">
                <div className="text-sm font-semibold text-gray-400">Feature</div>
                <div className="text-sm font-semibold text-purple-400 text-center">Self-Hosted</div>
                <div className="text-sm font-semibold text-cyan-400 text-center">Codespace</div>
              </div>
              {features.map((f) => (
                <div key={f} className="grid grid-cols-3 px-6 py-3.5 border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors">
                  <div className="text-sm text-gray-300">{f}</div>
                  <div className="text-center"><Check className="w-4 h-4 text-emerald-400 mx-auto" /></div>
                  <div className="text-center"><Check className="w-4 h-4 text-emerald-400 mx-auto" /></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto relative overflow-hidden rounded-2xl border border-purple-500/15 bg-white/[0.03] backdrop-blur-xl p-12 md:p-16 text-center"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px]" />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/10 ring-1 ring-white/[0.06] mb-6">
                <Play className="w-7 h-7 text-purple-400 ml-1" fill="currentColor" />
              </div>
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                Ready to let AI{' '}
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">edit your videos?</span>
              </h2>
              <p className="text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
                Drop your footage. 4 AI agents handle everything. Open source. Free forever.
              </p>
              <Link
                href="/create/step1"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-purple-600 hover:bg-purple-500 rounded-full text-white font-semibold transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
              >
                Start Creating — Free
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
