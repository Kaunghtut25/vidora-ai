'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Play, Sparkles, Star, Zap, ArrowRight, Film, Clock, Mic } from 'lucide-react';

// Floating video card with gradient thumbnail
function FloatingCard({ delay, x, y, rotate, color }: { delay: number; x: string; y: string; rotate: number; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.8, ease: 'easeOut' as const }}
      className={`absolute ${x} ${y} hidden lg:block`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' as const, delay: delay * 2 }}
        className="glass rounded-xl p-2 shadow-2xl"
      >
        <div className={`w-40 h-24 rounded-lg bg-gradient-to-br ${color} relative overflow-hidden`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
              <Play className="w-4 h-4 text-white fill-white ml-0.5" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
            <div className="h-full bg-white/60 rounded-full" style={{ width: '40%' }} />
          </div>
        </div>
        <div className="px-1 py-1.5 flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-purple-500" />
          <div className="flex-1 h-1 rounded-full bg-white/10" />
        </div>
      </motion.div>
    </motion.div>
  );
}

// Animated particle
function Particle({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0], y: [0, -40, -80] }}
      transition={{ duration: 3, repeat: Infinity, delay, ease: 'easeInOut' as const }}
      className={`absolute ${x} ${y} rounded-full bg-purple-400/30`}
      style={{ width: size, height: size, filter: 'blur(1px)' }}
    />
  );
}

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050508]">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0">
        {/* Main glow orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' as const }}
          className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-purple-600/25 rounded-full blur-[150px]"
          style={{
            transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)`,
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' as const, delay: 2 }}
          className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[150px]"
          style={{
            transform: `translate(${-mousePos.x * 0.02}px, ${-mousePos.y * 0.02}px)`,
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[200px]" />
        
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
      </div>

      {/* Floating video cards */}
      <FloatingCard delay={0.3} x="left-[8%]" y="top-[25%]" rotate={-6} color="from-purple-600 to-pink-500" />
      <FloatingCard delay={0.6} x="right-[10%]" y="top-[20%]" rotate={8} color="from-cyan-500 to-blue-600" />
      <FloatingCard delay={0.9} x="left-[15%]" y="bottom-[30%]" rotate={4} color="from-orange-500 to-red-500" />
      <FloatingCard delay={1.2} x="right-[20%]" y="bottom-[25%]" rotate={-3} color="from-emerald-500 to-teal-600" />

      {/* Floating particles — seeded for SSR safety */}
      {Array.from({ length: 20 }).map((_, i) => {
        const seed = (i * 16807) % 2147483647;
        const rand = (s: number) => ((s * 16807) % 2147483647) / 2147483647;
        return (
          <Particle
            key={i}
            delay={i * 0.3}
            x={`${rand(seed + i * 3) * 80 + 10}%`}
            y={`${rand(seed + i * 7) * 60 + 20}%`}
            size={rand(seed + i * 13) * 4 + 1}
          />
        );
      })}

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-purple-500/30 bg-purple-500/5 backdrop-blur-xl">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500" />
            </span>
            <span className="text-sm text-gray-300">
              <Sparkles className="inline w-3.5 h-3.5 mr-1 text-purple-400" />
              Powered by Seedance 2.0, Vidu & Runway
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] mb-6 tracking-tight"
        >
          <span className="text-white">Turn Ideas Into</span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Cinematic Videos
          </span>
          <br />
          <span className="text-white">with AI</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Paste any URL, upload a script, or describe your idea. 
          <span className="text-white/80"> Vidora AI </span> 
          researches, writes, and produces professional videos with 
          <span className="text-purple-400"> 12 AI voices</span>, 
          <span className="text-cyan-400"> B-roll</span>, 
          <span className="text-pink-400"> captions</span>, and 
          <span className="text-amber-400"> music</span> — in minutes.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href="/create/step1"
            className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 text-white font-bold text-lg overflow-hidden shadow-[0_0_40px_rgba(139,92,246,0.3)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Creating Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href="#how-it-works"
            className="px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-gray-300 font-semibold text-lg hover:text-white hover:border-white/20 transition-all"
          >
            <span className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              See How It Works
            </span>
          </motion.a>
        </motion.div>

        {/* Stats + Trust Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16"
        >
          {[
            { icon: Film, value: '12', label: 'AI Voices', sub: '8 EN + 4 MM' },
            { icon: Zap, value: '4K', label: 'Quality', sub: 'Cinematic output' },
            { icon: Clock, value: '50+', label: 'Minutes', sub: 'Long-form ready' },
            { icon: Star, value: '4.9', label: 'Rating', sub: 'From creators' },
          ].map((stat) => (
            <div key={stat.label} className="text-center group cursor-default">
              <stat.icon className="w-5 h-5 mx-auto mb-2 text-gray-500 group-hover:text-purple-400 transition-colors" />
              <div className="text-2xl font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">{stat.value}</div>
              <div className="text-sm font-medium text-gray-400">{stat.label}</div>
              <div className="text-xs text-gray-600">{stat.sub}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/10 flex justify-center pt-2.5"
        >
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 rounded-full bg-purple-400"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
