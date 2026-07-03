'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import {
  Sparkles, Users, Globe, Heart, Shield, Zap, Play, ArrowRight,
  TrendingUp, Award, Clock, Video, ChevronRight
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const stats = [
  { icon: Video, value: '50K+', label: 'Videos Created', gradient: 'from-purple-500 to-violet-500' },
  { icon: Users, value: '12K+', label: 'Active Creators', gradient: 'from-cyan-500 to-blue-500' },
  { icon: Globe, value: '30+', label: 'Countries', gradient: 'from-fuchsia-500 to-pink-500' },
  { icon: Award, value: '4.9', label: 'User Rating', gradient: 'from-amber-500 to-orange-500' },
];

const values = [
  {
    icon: Sparkles,
    title: 'Innovation First',
    desc: 'We relentlessly push the boundaries of AI video technology. Every feature, every voice, every pixel is engineered to give creators an unfair advantage.',
    color: 'purple',
  },
  {
    icon: Users,
    title: 'Creator-Centered',
    desc: 'Every decision starts with one question: "Does this help creators make better videos?" We ship what creators need, not what looks good on a roadmap.',
    color: 'cyan',
  },
  {
    icon: Globe,
    title: 'Local First, Global Scale',
    desc: 'Burmese language support from day one. Built in Yangon, Myanmar — because great technology shouldn\'t require you to speak English.',
    color: 'fuchsia',
  },
  {
    icon: Heart,
    title: 'Radical Accessibility',
    desc: 'Professional video tools shouldn\'t cost $10K a month. Our free tier has real features because we believe talent is everywhere, but opportunity isn\'t.',
    color: 'pink',
  },
  {
    icon: Shield,
    title: 'Privacy by Design',
    desc: 'Your content is YOURS. We never train on your videos, we never share your data, and we never will. Zero exceptions.',
    color: 'emerald',
  },
  {
    icon: Zap,
    title: 'Speed as a Feature',
    desc: 'AI generation that keeps up with your creative flow. Script to finished video in minutes, not days.',
    color: 'amber',
  },
];

const team = [
  { name: 'Ko Kaung', role: 'Founder & CEO', location: 'Yangon 🇲🇲', bio: 'Content creator turned AI builder. 8+ years in video production.' },
  { name: 'Aye Myat', role: 'Lead AI Engineer', location: 'Mandalay 🇲🇲', bio: 'NLP researcher specializing in low-resource languages. Built the Burmese voice pipeline.' },
  { name: 'Min Thu', role: 'Research Scientist', location: 'Yangon 🇲🇲', bio: 'Computer vision & generative AI. Former researcher at a top Southeast Asian AI lab.' },
  { name: 'Thida Htwe', role: 'Head of Design', location: 'Naypyidaw 🇲🇲', bio: 'Product designer obsessed with making complex AI feel simple and delightful.' },
  { name: 'Sai Lwin', role: 'Full-Stack Engineer', location: 'Taunggyi 🇲🇲', bio: 'Infrastructure & frontend. Makes sure everything runs fast and looks beautiful.' },
  { name: 'Moe Zaw', role: 'Community Lead', location: 'Yangon 🇲🇲', bio: 'Building the creator community. Organizes workshops and creator meetups across Myanmar.' },
];

const milestones = [
  { year: 'Jan 2026', title: 'Vidora Founded', desc: 'Ko Kaung starts building in a Yangon apartment. First lines of code for the AI script engine.' },
  { year: 'Mar 2026', title: 'Burmese Voices Launch', desc: 'World\'s first production-grade Burmese AI voices — Aye Myat, Ko Ko, Thida, and Min Thu go live.' },
  { year: 'May 2026', title: 'Public Beta', desc: 'Free tier launches. 500 creators sign up in the first week. Deep Research mode ships.' },
  { year: 'Jun 2026', title: '10K Creators', desc: 'Vidora crosses 10,000 active creators. 50,000+ videos generated. Team grows to 6 people.' },
  { year: 'Jul 2026', title: 'Seedance Integration', desc: 'Premium AI video generation via Seedance 2.0 API. 4K export support ships.' },
  { year: 'Coming Q3', title: 'Mobile App Launch', desc: 'iOS and Android apps in development. Edit on the go, render in the cloud.' },
];

const colorMap: Record<string, string> = {
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  fuchsia: 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20',
  pink: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
};

const hoverColorMap: Record<string, string> = {
  purple: 'group-hover:border-purple-500/40 group-hover:shadow-purple-500/10',
  cyan: 'group-hover:border-cyan-500/40 group-hover:shadow-cyan-500/10',
  fuchsia: 'group-hover:border-fuchsia-500/40 group-hover:shadow-fuchsia-500/10',
  pink: 'group-hover:border-pink-500/40 group-hover:shadow-pink-500/10',
  emerald: 'group-hover:border-emerald-500/40 group-hover:shadow-emerald-500/10',
  amber: 'group-hover:border-amber-500/40 group-hover:shadow-amber-500/10',
};

function TeamCard({ member, index }: { member: typeof team[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div
      key={member.name}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      onClick={() => setExpanded(!expanded)}
      className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-lg p-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 cursor-pointer"
    >
      {/* Avatar */}
      <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 via-violet-500 to-cyan-400 flex items-center justify-center text-2xl font-black text-white shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-shadow duration-300">
        {member.name.split(' ').map(n => n[0]).join('')}
      </div>

      <h3 className="font-bold text-white text-lg">{member.name}</h3>
      <p className="text-xs font-medium text-purple-400 mt-1">{member.role}</p>
      <p className="text-xs text-gray-500 mt-1">{member.location}</p>
      <AnimatePresence>
        {expanded && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs text-gray-400 mt-3 leading-relaxed overflow-hidden"
          >
            {member.bio}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#040407] overflow-x-hidden">
        {/* ─── Hero Section ─── */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          {/* Ambient orbs */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-purple-600/8 rounded-full blur-[180px]" />
            <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-cyan-500/6 rounded-full blur-[130px]" />
            <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-fuchsia-500/5 rounded-full blur-[100px]" />
          </div>

          {/* Animated grid background */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-sm font-medium mb-8"
            >
              <Sparkles className="w-4 h-4" />
              Built in Yangon, Myanmar 🇲🇲
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="text-4xl sm:text-5xl md:text-7xl font-black leading-[1.05] tracking-tight"
            >
              Making AI Video
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Accessible to Everyone
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="mt-8 text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
            >
              Vidora was born in a Yangon apartment with a simple mission: give every creator
              the power of professional video production — no studio, no crew, no $10K budget required.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/create/step1"
                className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold shadow-lg shadow-purple-600/25 hover:shadow-purple-600/40 hover:brightness-110 transition-all duration-300"
              >
                Start Creating Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="#story"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-white/10 bg-white/[0.03] text-gray-300 font-medium hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300"
              >
                Our Story <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ─── Stats Bar ─── */}
        <section className="px-6 pb-20">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl p-6 text-center group hover:border-white/[0.12] hover:bg-white/[0.05] transition-all duration-300"
                >
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${stat.gradient} opacity-[0.07] rounded-bl-full`} />
                  <div className="relative">
                    <div className={`w-10 h-10 mx-auto mb-3 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-3xl font-black text-white">{stat.value}</div>
                    <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Our Story / Timeline ─── */}
        <section id="story" className="px-6 pb-24">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                Our <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Story</span>
              </h2>
              <p className="mt-4 text-gray-400 max-w-xl mx-auto">
                From a Yangon apartment to thousands of creators worldwide — this is how Vidora came to be.
              </p>
            </motion.div>

            {/* Story paragraph */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-lg p-8 md:p-10 mb-16"
            >
              <div className="absolute top-0 left-8 -translate-y-1/2 w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-purple-600/20">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="space-y-5 text-gray-300 leading-relaxed text-base md:text-lg mt-4">
                <p>
                  In early 2026, a content creator in Yangon noticed something broken. Myanmar had
                  millions of talented creators — but professional video production tools were locked
                  behind English-only interfaces, $300/month subscriptions, and weeks-long production cycles.
                </p>
                <p>
                  What if AI could handle the heavy lifting? Script writing, Burmese voiceover generation,
                  video editing, captioning — all in minutes instead of days. What if it spoke Burmese?
                  What if anyone, anywhere, could create studio-quality videos from just an idea?
                </p>
                <p>
                  <span className="font-semibold text-white">Vidora AI was the answer.</span> Built from
                  scratch with 8 English and 4 Burmese voices, Deep Research AI that pulls facts from across
                  the web, and a video editor that makes professional production accessible to everyone.
                </p>
              </div>
            </motion.div>

            {/* Timeline */}
            <div className="space-y-0">
              {milestones.map((milestone, i) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="relative flex items-start gap-6 pb-10 last:pb-0"
                >
                  {/* Timeline line */}
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 shadow-lg shadow-purple-500/30 shrink-0 mt-1.5" />
                    {i < milestones.length - 1 && (
                      <div className="w-px h-full bg-gradient-to-b from-purple-500/40 to-transparent mt-2" />
                    )}
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-purple-400 tracking-widest uppercase">{milestone.year}</span>
                    <h3 className="text-lg font-bold text-white mt-1">{milestone.title}</h3>
                    <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">{milestone.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Values ─── */}
        <section className="px-6 pb-24">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                What We <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Believe</span>
              </h2>
              <p className="mt-4 text-gray-400 max-w-xl mx-auto">
                Our principles guide every feature, every decision, and every line of code.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.45 }}
                  className={`group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-lg p-7 transition-all duration-300 hover:-translate-y-1 ${hoverColorMap[v.color]}`}
                  style={{ boxShadow: '0 0 0 0 rgba(139, 92, 246, 0)' }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 8px 30px ${v.color === 'purple' ? 'rgba(139,92,246,0.12)' : v.color === 'cyan' ? 'rgba(6,182,212,0.12)' : v.color === 'fuchsia' ? 'rgba(217,70,239,0.12)' : v.color === 'pink' ? 'rgba(236,72,153,0.12)' : v.color === 'emerald' ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.12)'}`}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 0 0 rgba(139, 92, 246, 0)'}
                >
                  {/* Floating gradient orb */}
                  <div className={`absolute -top-6 -right-6 w-20 h-20 rounded-full bg-gradient-to-br from-${v.color}-500/20 to-${v.color}-500/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className={`w-12 h-12 rounded-xl border ${colorMap[v.color].split(' ')[2]} ${colorMap[v.color].split(' ')[1]} flex items-center justify-center mb-5`}>
                    <v.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2.5">{v.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Team ─── */}
        <section className="px-6 pb-24">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                Meet the <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Team</span>
              </h2>
              <p className="mt-4 text-gray-400 max-w-xl mx-auto">
                A small, passionate team building big things from Myanmar.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {team.map((member, i) => (
                <TeamCard key={member.name} member={member} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="px-6 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto relative overflow-hidden rounded-3xl border border-purple-500/20 bg-white/[0.03] backdrop-blur-2xl p-12 md:p-16 text-center"
          >
            {/* Glow orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-400 flex items-center justify-center shadow-xl shadow-purple-600/30">
                <Play className="w-7 h-7 text-white ml-0.5" />
              </div>
              <h2 className="text-2xl md:text-4xl font-black tracking-tight">
                Ready to Create Something
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Extraordinary?</span>
              </h2>
              <p className="mt-4 text-gray-400 max-w-md mx-auto">
                Start making professional videos in minutes. Free forever tier — no credit card required.
              </p>
              <Link
                href="/create/step1"
                className="mt-8 inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold text-lg shadow-xl shadow-purple-600/25 hover:shadow-purple-600/50 hover:brightness-110 transition-all duration-300"
              >
                Start Creating Free <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
