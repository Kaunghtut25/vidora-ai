'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Bot, Mic, Clock, Edit3, Clapperboard, Globe, ArrowRight, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Bot,
    color: 'from-purple-500 to-violet-600',
    glowColor: 'rgba(139,92,246,0.3)',
    title: 'Deep Research AI',
    desc: 'AI researches your topic across the web, gathering real statistics, examples, and recent data for factually accurate scripts with citations.',
  },
  {
    icon: Mic,
    color: 'from-cyan-400 to-blue-500',
    glowColor: 'rgba(6,182,212,0.3)',
    title: '12 Premium Voices',
    desc: '20 English AI voices with emotion control. Sophia, Marcus, Aye Myat, Ko Ko, Thida, Min Thu — each with unique character.',
  },
  {
    icon: Clock,
    color: 'from-amber-400 to-orange-500',
    glowColor: 'rgba(245,158,11,0.3)',
    title: 'Exact Length Control',
    desc: 'Precise 10, 15, 20, 30, or 50+ minute videos. Smart pacing engine adjusts script, visuals, and timing to match exactly.',
  },
  {
    icon: Edit3,
    color: 'from-emerald-400 to-teal-500',
    glowColor: 'rgba(16,185,129,0.3)',
    title: 'Transcript Editing',
    desc: 'Edit text, change voices per paragraph, add pauses. Like Descript — edit the words, and your video updates automatically.',
  },
  {
    icon: Clapperboard,
    color: 'from-pink-400 to-rose-500',
    glowColor: 'rgba(236,72,153,0.3)',
    title: 'Auto B-Roll & Captions',
    desc: 'Automatic B-roll suggestions, beat-synced background music, auto-generated captions, chapter markers, and professional transitions.',
  },
  {
    icon: Globe,
    color: 'from-indigo-400 to-blue-600',
    glowColor: 'rgba(99,102,241,0.3)',
    title: 'Burmese + Bilingual',
    badge: '🇲🇲',
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="glass-card p-6 h-full transition-all duration-300 hover:border-white/10 hover:shadow-2xl">
        {/* Subtle glow behind icon */}
        <div 
          className="absolute top-6 left-6 w-14 h-14 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
          style={{ background: feature.glowColor }}
        />
        
        {/* Icon */}
        <div className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} bg-opacity-10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
          <div className="absolute inset-0 rounded-2xl bg-white/5" />
          <feature.icon className="w-6 h-6 text-white relative z-10" />
        </div>

        {/* Title */}
        <div className="flex items-center gap-2 mb-2.5">
          <h3 className="font-bold text-white group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300"
            style={{ backgroundImage: `linear-gradient(135deg, ${feature.glowColor.replace('0.3', '1')}, white)` }}>
            {feature.title}
          </h3>
          {feature.badge && (
            <span className="text-sm">{feature.badge}</span>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>

        {/* Hover indicator */}
        <div className="mt-4 flex items-center gap-1.5 text-xs text-gray-600 group-hover:text-purple-400 transition-colors">
          <span>Learn more</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}

export default function Features() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Background mesh */}
      <div className="absolute inset-0 mesh-dark" />
      
      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300 font-medium">Everything You Need</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
            Create <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Pro Videos</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            One platform. AI research, script writing, voice generation, B-roll, captions, and editing — all automatic.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
