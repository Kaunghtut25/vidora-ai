'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Search, Sparkles, Tag, CheckCircle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

/* ─── Types ─── */
type BlogCategory = 'All' | 'Tutorial' | 'Guide' | 'Comparison' | 'Trends' | 'Engineering' | 'Workflow';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: BlogCategory;
  gradient: string;
  featured?: boolean;
}

/* ─── Data ─── */
const posts: BlogPost[] = [
  {
    slug: 'create-viral-shorts-ai-2026',
    title: 'How to Create Viral Shorts with AI in 2026',
    excerpt: 'The short-form video landscape has changed. Learn the exact AI pipeline top creators use to 10x output without sacrificing quality.',
    date: 'Jun 28, 2026',
    readTime: '5 min read',
    category: 'Tutorial',
    gradient: 'from-purple-600 via-fuchsia-500 to-violet-400',
    featured: true,
  },
  {
    slug: 'burmese-ai-voiceovers-guide',
    title: 'The Ultimate Guide to Burmese AI Voiceovers',
    excerpt: 'Everything you need to know about creating professional Burmese voiceovers with AI — voice selection, quality tips, and bilingual workflows.',
    date: 'Jun 25, 2026',
    readTime: '8 min read',
    category: 'Guide',
    gradient: 'from-cyan-500 via-teal-400 to-emerald-300',
  },
  {
    slug: 'seedance-vs-vidu',
    title: 'Seedance 2.0 vs Vidu: Which is Better for Creators?',
    excerpt: 'We tested both platforms with real production workflows. Here\'s the honest comparison — video quality, speed, pricing, and language support.',
    date: 'Jun 22, 2026',
    readTime: '6 min read',
    category: 'Comparison',
    gradient: 'from-amber-500 via-violet-400 to-yellow-300',
  },
  {
    slug: 'ai-video-trends-2026',
    title: '10 AI Video Trends Every Creator Should Know',
    excerpt: 'From AI avatars to real-time dubbing — the trends reshaping video content creation in 2026 and how to stay ahead of the curve.',
    date: 'Jun 18, 2026',
    readTime: '4 min read',
    category: 'Trends',
    gradient: 'from-pink-500 via-rose-400 to-red-300',
  },
  {
    slug: 'how-we-built-vidora',
    title: 'How We Built Vidora AI — Technical Deep Dive',
    excerpt: 'A behind-the-scenes look at our tech stack: Next.js 16, AI voice pipelines, Burmese NLP, and the architecture powering Vidora.',
    date: 'Jun 15, 2026',
    readTime: '12 min read',
    category: 'Engineering',
    gradient: 'from-emerald-600 via-green-500 to-teal-400',
  },
  {
    slug: 'script-to-screen-workflow',
    title: 'From Script to Screen: Our Complete AI Video Workflow',
    excerpt: 'Follow along as we create a professional 10-minute documentary — from AI-generated script to final export, step by step.',
    date: 'Jun 10, 2026',
    readTime: '7 min read',
    category: 'Workflow',
    gradient: 'from-indigo-600 via-blue-500 to-sky-400',
  },
];

const categories: BlogCategory[] = ['All', 'Tutorial', 'Guide', 'Comparison', 'Trends', 'Engineering', 'Workflow'];

const categoryMeta: Record<BlogCategory, { color: string; icon: string }> = {
  All: { color: 'bg-white/10 text-white/70 border-white/20', icon: '📚' },
  Tutorial: { color: 'bg-purple-500/15 text-purple-400 border-purple-500/30', icon: '🎓' },
  Guide: { color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30', icon: '📖' },
  Comparison: { color: 'bg-blue-500/15 text-blue-400 border-blue-500/30', icon: '⚖️' },
  Trends: { color: 'bg-amber-500/15 text-amber-400 border-amber-500/30', icon: '📈' },
  Engineering: { color: 'bg-red-500/15 text-red-400 border-red-500/30', icon: '⚙️' },
  Workflow: { color: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30', icon: '🔄' },
};

/* ─── Blog Card Component ─── */
function BlogCard({ post, index, featured }: { post: BlogPost; index: number; featured?: boolean }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, scale: 0.96 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: 'easeOut' }}
      className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md overflow-hidden transition-all duration-500 hover:border-purple-500/30 hover:-translate-y-1"
    >
      {/* Gradient Header */}
      <div className={`relative ${featured ? 'h-56 md:h-64' : 'h-44'} overflow-hidden`}>
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${post.gradient}`}
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
        {/* Overlay patterns */}
        <div className="absolute inset-0 bg-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040407]/90 via-[#040407]/20 to-transparent" />

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute bottom-8 left-4 w-14 h-14 rounded-full bg-white/5 blur-xl" />

        {/* Featured badge */}
        {featured && (
          <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3 h-3" /> Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 md:p-6 flex flex-col gap-3">
        {/* Category pill */}
        <span className={`self-start inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${categoryMeta[post.category].color}`}>
          {categoryMeta[post.category].icon} {post.category}
        </span>

        {/* Title */}
        <h3 className="text-base md:text-lg font-bold text-white leading-snug group-hover:text-purple-300 transition-colors duration-300 line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mt-auto pt-1">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3" />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </span>
        </div>

        {/* Read more */}
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors duration-300 group/link"
        >
          Read Article
          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform duration-300" />
        </Link>
      </div>
    </motion.div>
  );
}

/* ─── Page ─── */
export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  const filteredPosts = useMemo(() => {
    let result = activeCategory === 'All' ? posts : posts.filter(p => p.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, searchQuery]);

  const featuredPost = posts.find(p => p.featured);

  return (
    <>
      <Navbar />
      <main className="bg-[#040407]">
        {/* ─── Header ─── */}
        <section className="relative pt-32 pb-10 px-6 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-purple-600/8 rounded-full blur-[130px]" />
            <div className="absolute top-1/2 right-0 w-[350px] h-[300px] bg-cyan-500/6 rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-medium mb-6"
            >
              <Sparkles className="w-3.5 h-3.5" /> Vidora Blog
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-4xl md:text-6xl font-black tracking-tight"
            >
              AI Video{' '}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Insights
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="mt-4 text-gray-400 text-lg max-w-lg mx-auto"
            >
              Tutorials, deep dives, and creator guides from the Vidora team
            </motion.p>
          </div>
        </section>

        {/* ─── Search & Filters ─── */}
        <section className="px-6 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="max-w-3xl mx-auto space-y-4"
          >
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/20 transition-all duration-300"
              />
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium border transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-purple-500/20 text-purple-400 border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                      : 'text-gray-400 border-white/[0.06] bg-white/[0.03] hover:text-gray-200 hover:border-white/15'
                  }`}
                >
                  {categoryMeta[cat].icon} {cat}
                </button>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ─── Posts Grid ─── */}
        <section className="px-6 pb-24">
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              {filteredPosts.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center py-24"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                    <Search className="w-6 h-6 text-gray-500" />
                  </div>
                  <p className="text-gray-400 text-lg">No articles found.</p>
                  <p className="text-gray-600 text-sm mt-1">Try a different search or category.</p>
                </motion.div>
              ) : (
                <motion.div
                  key={activeCategory + searchQuery}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredPosts.map((post, i) => (
                    <BlogCard key={post.slug} post={post} index={i} featured={post.featured} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ─── Newsletter CTA ─── */}
        <section className="px-6 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto relative overflow-hidden rounded-2xl border border-purple-500/15 bg-white/[0.03] backdrop-blur-xl p-10 md:p-14 text-center"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/8 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Stay in the{' '}
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Loop</span>
              </h2>
              <p className="mt-3 text-gray-400 max-w-md mx-auto">
                Get the latest AI video tips, tutorials, and product updates delivered to your inbox.
              </p>
              <form
                onSubmit={handleSubscribe}
                className="mt-8 flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full sm:flex-1 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/20 transition-all"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto whitespace-nowrap rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-600/20 hover:shadow-purple-600/35 hover:brightness-110 transition-all duration-300"
                >
                  Subscribe
                </button>
              </form>
              <AnimatePresence>
                {subscribed && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 flex items-center justify-center gap-2 text-sm text-emerald-400"
                  >
                    <CheckCircle className="w-4 h-4" /> Subscribed successfully!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
