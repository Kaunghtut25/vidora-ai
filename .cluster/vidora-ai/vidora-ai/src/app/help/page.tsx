'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  HelpCircle,
  ChevronDown,
  Rocket,
  Mic,
  Edit3,
  Brain,
  Download,
  CreditCard,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

interface HelpCategory {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

const helpCategories: HelpCategory[] = [
  {
    icon: Rocket,
    title: 'Getting Started',
    description:
      'Quick start guide, creating your first video, interface walkthrough',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/15',
  },
  {
    icon: Mic,
    title: 'Voices & Audio',
    description:
      'Voice selection, Burmese voices, speed/emotion control, preview',
    color: 'text-sky-400',
    bgColor: 'bg-sky-500/15',
  },
  {
    icon: Edit3,
    title: 'Editing Videos',
    description:
      'Transcript editor, timeline, chapters, effects, transitions',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/15',
  },
  {
    icon: Brain,
    title: 'AI Features',
    description:
      'Deep research, script generation, B-roll suggestions, citations',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/15',
  },
  {
    icon: Download,
    title: 'Export & Share',
    description:
      'MP4 export, YouTube upload, TikTok format, Instagram square',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/15',
  },
  {
    icon: CreditCard,
    title: 'Billing & Account',
    description:
      'Plans, upgrade, invoices, team management, API keys',
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/15',
  },
];

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: 'How do I change the voice for a specific paragraph?',
    answer:
      'In the transcript editor, highlight the paragraph you want to modify, then click the voice selector dropdown in the toolbar. You can choose from any available voice — including Burmese voices — and adjust speed and emotion sliders for that specific section. Changes apply only to the selected paragraph.',
  },
  {
    question: 'Can I use Burmese voices for English scripts?',
    answer:
      'Yes! Burmese voices work with English scripts, though the pronunciation may carry a Burmese accent. For best results with mixed-language content, we recommend using the preview feature before generating the full video. You can also use the speed control to fine-tune naturalness.',
  },
  {
    question: "What's the maximum video length?",
    answer:
      'The maximum video length depends on your plan. Free users can create videos up to 10 minutes, Pro users up to 50+ minutes, and Enterprise users have no length restriction. Note that longer videos take proportionally more time to generate.',
  },
  {
    question: 'How does deep research work?',
    answer:
      'Deep Research uses our AI to scan the web, academic papers, and news sources in real-time to gather facts, statistics, and context for your script. It automatically generates citations and suggests relevant B-roll footage. You can guide the research by providing keywords, sources, or specific angles you want explored.',
  },
  {
    question: 'Can I upload my own B-roll footage?',
    answer:
      'Absolutely. In the editor, navigate to the media panel and click "Upload Media". You can upload video clips, images, and GIFs from your computer. Uploaded footage appears alongside AI-suggested B-roll and can be dragged onto the timeline just like any other asset.',
  },
  {
    question: 'Is there a watermark on the free plan?',
    answer:
      'Yes, videos exported on the Free plan include a small Vidora AI watermark in the bottom-right corner. Upgrading to Pro or Enterprise removes the watermark entirely and unlocks branded exports with your own logo.',
  },
  {
    question: 'How do I share a project with my team?',
    answer:
      'Team sharing is available on the Enterprise plan. Open your project, click the "Share" button in the top-right corner, and enter your teammates\' email addresses. Collaborators can view, comment, or edit depending on the permissions you set. All changes sync in real-time.',
  },
  {
    question: 'What export formats are supported?',
    answer:
      'We support MP4 (H.264 and H.265) for video, GIF for short animations, and PNG image sequences. Pro adds ProRes and WebM support. Enterprise users also get RAW project exports, custom resolution presets, and API-based export pipelines for automated workflows.',
  },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                    */
/* ------------------------------------------------------------------ */

function SearchBar() {
  const [query, setQuery] = useState('');

  return (
    <div className="relative max-w-xl mx-auto">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for answers..."
        className="w-full h-12 pl-12 pr-4 rounded-xl border border-white/10 bg-white/[0.05] backdrop-blur-md text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-purple-500/40 focus:bg-white/[0.08] transition-all duration-300"
      />
    </div>
  );
}

function CategoryCard({
  category,
  index,
}: {
  category: HelpCategory;
  index: number;
}) {
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
      className="group relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-6 hover:bg-white/[0.07] hover:border-purple-500/20 transition-all duration-300"
    >
      {/* Icon */}
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center ${category.bgColor} mb-4`}
      >
        <Icon className={`w-5 h-5 ${category.color}`} />
      </div>

      {/* Title */}
      <h3 className="text-base font-bold text-white mb-1.5">
        {category.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-400 leading-relaxed mb-4">
        {category.description}
      </p>

      {/* Link */}
      <Link
        href="#"
        className="inline-flex items-center gap-1 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
      >
        View articles
        <span className="group-hover:translate-x-0.5 transition-transform">→</span>
      </Link>
    </motion.div>
  );
}

function FAQItem({
  faq,
  isOpen,
  onToggle,
  index,
}: {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="border border-white/10 rounded-xl bg-white/[0.03] backdrop-blur-md overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline-none group"
      >
        <span className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors pr-4">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm text-gray-400 leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <div className="flex flex-col gap-4 max-w-2xl mx-auto">
      {faqs.map((faq, i) => (
        <FAQItem
          key={i}
          faq={faq}
          isOpen={openIndex === i}
          onToggle={() => toggle(i)}
          index={i}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function HelpPage() {
  return (
    <>
      <Navbar />

      <main className="bg-[#050508]">
        {/* ── Hero / Header ── */}
        <section className="relative pt-32 pb-16 px-6 overflow-hidden">
          {/* Background mesh */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/8 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/8 rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-xs font-medium text-purple-300 mb-6"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Documentation
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
              className="text-4xl md:text-5xl font-bold tracking-tight"
            >
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Help Center
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-4 text-gray-400 text-lg max-w-md mx-auto"
            >
              Find answers, guides, and tutorials for Vidora AI
            </motion.p>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-10"
            >
              <SearchBar />
            </motion.div>
          </div>
        </section>

        {/* ── Help Categories Grid ── */}
        <section className="px-6 pb-24">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold">
                Browse by{' '}
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Topic
                </span>
              </h2>
              <p className="text-gray-400 mt-2 text-sm">
                Explore help articles organized by category
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {helpCategories.map((cat, i) => (
                <CategoryCard key={cat.title} category={cat} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="px-6 pb-24">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold">
                Frequently{' '}
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Asked Questions
                </span>
              </h2>
              <p className="text-gray-400 mt-2 text-sm">
                Quick answers to common questions
              </p>
            </motion.div>

            <FAQSection />
          </div>
        </section>

        {/* ── Still Need Help CTA ── */}
        <section className="px-6 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-2xl mx-auto relative overflow-hidden rounded-2xl border border-purple-500/20 bg-white/[0.04] backdrop-blur-xl p-8 md:p-12 text-center"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-500/8 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-500/15 text-purple-400 mb-5">
                <HelpCircle className="w-7 h-7" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold">
                Still Need Help?
              </h2>
              <p className="mt-3 text-gray-400 text-sm max-w-sm mx-auto">
                Can&apos;t find what you&apos;re looking for? Our support team is
                here to help you get the most out of Vidora AI.
              </p>
              <Link
                href="#"
                className="inline-flex mt-6 items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                Contact Support
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}
