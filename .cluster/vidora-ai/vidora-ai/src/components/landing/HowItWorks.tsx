'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe, SlidersHorizontal, Download, ChevronRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Globe,
    title: 'Paste & Research',
    description:
      'Paste any URL, upload a script, or describe your topic. Our AI researches across the web to build intelligent scripts.',
  },
  {
    number: '02',
    icon: SlidersHorizontal,
    title: 'Customize & Create',
    description:
      'Choose video length, select from 12 premium voices, pick your style. Fine-tune speed, emotion, and pitch.',
  },
  {
    number: '03',
    icon: Download,
    title: 'Export & Share',
    description:
      'Get your fully edited video with B-roll, captions, music, and chapters. Export in any format for any platform.',
  },
];

function StepCard({
  number,
  icon: Icon,
  title,
  description,
  index,
  isLast,
}: {
  number: string;
  icon: typeof Globe;
  title: string;
  description: string;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div className="relative">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        className="group relative flex flex-col items-center text-center"
      >
        {/* Step number */}
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.2 + 0.2 }}
          className="mb-4 text-5xl font-bold bg-gradient-to-r from-purple-500/20 to-purple-500/10 bg-clip-text text-transparent select-none"
        >
          {number}
        </motion.span>

        {/* Icon circle */}
        <div className="relative mb-5">
          <div className="w-12 h-12 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm flex items-center justify-center transition-colors duration-300 group-hover:border-purple-500/30">
            <Icon className="w-5 h-5 text-purple-400" />
          </div>
          {/* Subtle glow on hover */}
          <div className="absolute inset-0 rounded-2xl bg-purple-500/0 group-hover:bg-purple-500/5 transition-colors duration-300 pointer-events-none" />
        </div>

        {/* Title */}
        <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>

        {/* Description */}
        <p className="text-sm leading-relaxed text-gray-400 max-w-xs">{description}</p>
      </motion.div>

      {/* Connector arrow between cards (desktop only) */}
      {!isLast && (
        <div className="hidden md:block absolute top-[88px] left-[calc(100%+0.5rem)]">
          <ChevronRight className="w-5 h-5 text-purple-500/30" />
        </div>
      )}
    </div>
  );
}

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="relative py-24 px-6 overflow-hidden">
      {/* Background vertical gradient line — center, desktop only */}
      <div className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-purple-500/10 to-transparent pointer-events-none" />

      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-20 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            How It{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
        </motion.div>

        {/* Steps grid */}
        <div className="grid gap-10 md:grid-cols-3 md:gap-6">
          {steps.map((step, i) => (
            <StepCard
              key={step.number}
              {...step}
              index={i}
              isLast={i === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
