'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Calendar, Clock, ArrowLeft, Eye, Heart, Bookmark, Share2,
  Sparkles, Copy, Check
} from 'lucide-react';
import { useState, useCallback } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

/* ─── Types ─── */
interface PostDetail {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  category: string;
  gradient: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  views: number;
  tags: string[];
  sections: { heading: string; paragraphs: string[] }[];
}

/* ─── Blog Post Data ─── */
const posts: Record<string, PostDetail> = {
  'create-viral-shorts-ai-2026': {
    slug: 'create-viral-shorts-ai-2026',
    title: 'How to Create Viral Shorts with AI in 2026',
    subtitle: 'The complete AI pipeline top creators use to 10x their short-form output — without sacrificing quality.',
    date: 'Jun 28, 2026',
    readTime: '5 min read',
    category: 'Tutorial',
    gradient: 'from-purple-600 via-fuchsia-500 to-violet-400',
    author: 'Ko Kaung',
    authorRole: 'Content Creator & Founder',
    authorAvatar: 'KK',
    views: 7234,
    tags: ['AI Video', 'Shorts', 'TikTok', 'Content Creation'],
    sections: [
      {
        heading: 'The Short-Form Revolution',
        paragraphs: [
          'The short-form video landscape has changed dramatically in 2026, and AI tools are now at the heart of every successful creator\'s workflow. Whether you\'re making TikToks, Reels, or YouTube Shorts, the right AI pipeline can 10x your output without sacrificing quality.',
          'The numbers don\'t lie: short-form videos now account for over 70% of all social media engagement. Creators who post consistently — 3+ times per day — see 5x more growth than those who post weekly. But creating quality short-form videos at that pace manually is impossible. That\'s where AI comes in.',
        ],
      },
      {
        heading: 'Step 1: AI Script Generation',
        paragraphs: [
          'Start by feeding your topic into an AI script generator. Vidora\'s Deep Research mode pulls facts, statistics, and trending angles from across the web, then crafts a hook that grabs attention in the first 3 seconds.',
          'The hook is everything. Studies show you have 1.7 seconds to capture attention on TikTok before someone scrolls away. Your AI-generated script needs an opening line that creates curiosity, controversy, or a knowledge gap. Here are three proven hook templates:',
          '"You won\'t believe what happens when..." — creates a curiosity gap. "Stop doing [X] and do [Y] instead" — challenges existing beliefs. "I tested [X] so you don\'t have to" — promises value and saves viewer effort.',
          'Feed these patterns into your AI script tool, then iterate. The best creators A/B test 5-10 hooks per video concept to find what resonates.',
        ],
      },
      {
        heading: 'Step 2: Voiceover Selection',
        paragraphs: [
          'Choose from 8 English and 4 Burmese AI voices. For short-form content, pick a voice with high energy and natural pacing. The "Sophia" (English) or "Ko Ko" (Burmese) voices work exceptionally well for TikTok-style content.',
          'Speed matters in short-form voiceovers. Aim for 150-170 words per minute — fast enough to maintain energy, slow enough to be understood. AI voices let you control pacing precisely with pitch and speed controls.',
          'Pro tip: Add strategic pauses after your hook and before your call-to-action. A 0.5-second pause before the reveal increases viewer retention by 22%.',
        ],
      },
      {
        heading: 'Step 3: Visual Generation & Editing',
        paragraphs: [
          'This is where the magic happens. AI-generated B-roll, kinetic typography, and auto-captions sync perfectly with your voiceover. The key is to change visuals every 2-3 seconds to maintain viewer retention.',
          'Use Vidora\'s auto-caption feature with bold, high-contrast text. 85% of short-form videos are watched without sound — if your captions aren\'t engaging, you\'ve lost 85% of your audience. Use word-by-word caption highlighting for maximum engagement.',
          'Layer your visuals: background video or gradient → b-roll footage → text overlays → captions. Each layer adds depth and keeps the eye moving. The brain processes visual changes as "new information," which triggers dopamine and keeps viewers watching.',
        ],
      },
      {
        heading: 'Step 4: Export & Distribution Strategy',
        paragraphs: [
          'Export in 9:16 vertical format at 1080p minimum. Add trending audio as background, use relevant hashtags (3-5 is the sweet spot), and post at peak engagement hours — typically 7-9 PM your local time.',
          'Cross-post strategically: TikTok, Reels, Shorts, and Pinterest Idea Pins. But don\'t post the exact same video everywhere. Each platform has unique algorithmic preferences. Use AI to generate platform-specific variations from one source video.',
          'The final piece: post consistently. The algorithm rewards consistency above all else. With AI, you can create a week\'s worth of content in a single afternoon and schedule everything in advance.',
        ],
      },
    ],
  },
  'burmese-ai-voiceovers-guide': {
    slug: 'burmese-ai-voiceovers-guide',
    title: 'The Ultimate Guide to Burmese AI Voiceovers',
    subtitle: 'Everything you need to know about creating professional Burmese voiceovers with AI — voice selection, quality tips, and bilingual workflows.',
    date: 'Jun 25, 2026',
    readTime: '8 min read',
    category: 'Guide',
    gradient: 'from-cyan-500 via-teal-400 to-emerald-300',
    author: 'Ko Kaung',
    authorRole: 'Content Creator & Founder',
    authorAvatar: 'KK',
    views: 4521,
    tags: ['Burmese', 'Voiceover', 'AI Voices', 'Myanmar'],
    sections: [
      {
        heading: 'Why Burmese AI Voices Matter',
        paragraphs: [
          'For the first time ever, Burmese content creators can generate professional-quality AI voiceovers in their native language. Vidora offers 4 Burmese voices: Aye Myat (Female, Warm), Ko Ko (Male, Energetic), Thida (Female, Professional), and Min Thu (Male, Authoritative).',
          'Myanmar has over 55 million people, and video content consumption is skyrocketing. YouTube watch time in Myanmar grew 340% year-over-year. Facebook video engagement is up 220%. Until now, professional Burmese voiceovers required expensive recording studios and voice actors — costing $50-200 per video. AI changes that equation completely.',
        ],
      },
      {
        heading: 'Choosing the Right Voice',
        paragraphs: [
          'Each Burmese voice has been optimized for different content types. Here\'s when to use each one:',
          'Aye Myat (Female, Warm) — Best for educational content, tutorials, and explainer videos. Her warm tone builds trust and keeps viewers engaged through longer content. Ideal for YouTube tutorials and online courses.',
          'Ko Ko (Male, Energetic) — Your go-to for marketing videos, product launches, and high-energy content. His energetic delivery commands attention and drives action. Perfect for short-form ads and promotional content.',
          'Thida (Female, Professional) — Excels at corporate presentations, professional narration, and business content. Her clear, authoritative tone conveys expertise and credibility.',
          'Min Thu (Male, Authoritative) — Perfect for news-style content, documentaries, and authoritative voiceovers. His deep, measured tone adds gravitas to serious topics.',
        ],
      },
      {
        heading: 'Bilingual Workflows',
        paragraphs: [
          'Vidora lets you mix Burmese and English in the same video. The AI automatically detects language switches and adjusts pronunciation. This is game-changing for Myanmar\'s bilingual audience — most educated Burmese speakers consume content in both languages.',
          'For bilingual content, follow this structure: Open with Burmese to connect personally, use English for technical terms and international references, return to Burmese for calls-to-action and conclusions.',
          'The AI handles the transitions seamlessly, adjusting tone, pacing, and phoneme pronunciation for each language switch.',
        ],
      },
      {
        heading: 'Quality Settings & Best Practices',
        paragraphs: [
          'For the best Burmese voice quality, use the "Enhanced" mode which applies Myanmar-specific phoneme modeling. The result is natural-sounding Burmese with correct tones and inflections.',
          'Burmese is a tonal language — the same word can have different meanings depending on tone. Our AI voice pipeline has been trained specifically on Burmese tonal patterns, achieving 98% accuracy in tone reproduction.',
          'Always preview with headphones before exporting. Small adjustments to speed (±10%) can dramatically improve the natural feel. Use punctuation in your script — the AI respects commas, periods, and question marks for natural pacing.',
        ],
      },
    ],
  },
  'seedance-vs-vidu': {
    slug: 'seedance-vs-vidu',
    title: 'Seedance 2.0 vs Vidu: Which is Better for Creators?',
    subtitle: 'We tested both platforms with real production workflows. Here\'s the honest comparison you won\'t find anywhere else.',
    date: 'Jun 22, 2026',
    readTime: '6 min read',
    category: 'Comparison',
    gradient: 'from-amber-500 via-orange-400 to-yellow-300',
    author: 'Ko Kaung',
    authorRole: 'Content Creator & Founder',
    authorAvatar: 'KK',
    views: 3842,
    tags: ['Seedance', 'Vidu', 'AI Tools', 'Comparison'],
    sections: [
      {
        heading: 'The AI Video Landscape in 2026',
        paragraphs: [
          'Both Seedance and Vidu have emerged as leading AI video generation platforms in 2026. But which one should creators choose? We tested both extensively with real production workflows — creating the same video on each platform and comparing results side by side.',
          'The test: a 3-minute product explainer with voiceover, b-roll, captions, and transitions. We measured quality, speed, ease of use, and total cost on both platforms.',
        ],
      },
      {
        heading: 'Video Quality Comparison',
        paragraphs: [
          'Seedance 2.0 produces sharper, more detailed output with better motion consistency. Their latest model handles complex scenes — multiple subjects, camera movements, lighting changes — with noticeably fewer artifacts.',
          'Vidu excels at creative, artistic styles and offers more visual customization options. Their "Cinematic" and "Anime" presets are outstanding. However, Vidu sometimes struggles with realistic human motion and can produce the "uncanny valley" effect in portrait shots.',
          'Winner: Seedance for professional/commercial work. Vidu for creative/artistic projects.',
        ],
      },
      {
        heading: 'Speed & Workflow',
        paragraphs: [
          'Vidu is 2-3x faster for short clips (under 15 seconds). Their optimized pipeline delivers results in 30-60 seconds for most requests. Seedance takes 2-3 minutes but the quality difference is noticeable for professional work.',
          'For batch processing (10+ videos), Seedance pulls ahead with better queuing and parallel generation. Vidu\'s queue system can get backed up during peak hours.',
        ],
      },
      {
        heading: 'The Vidora Advantage: Language Support',
        paragraphs: [
          'This is where Vidora has a massive advantage. Neither Seedance nor Vidu offers Burmese voice or text support. Vidora is the only platform with dedicated Burmese AI voices (4 speakers) and bilingual English-Burmese workflows.',
          'If you\'re creating content for Myanmar or Southeast Asian audiences, Vidora is the only viable option. Our Deep Research mode also supports research in Burmese, pulling facts and statistics from Burmese-language sources.',
        ],
      },
      {
        heading: 'Pricing & Final Verdict',
        paragraphs: [
          'Seedance starts at $29/month, Vidu at $19/month. Vidora offers a free tier with 3 videos/month, making it the most accessible option for creators just starting out. Pro plans at $19/month include unlimited videos, 4K export, and all 12 AI voices.',
          'Final recommendation: Use Vidora for the complete workflow (script → voiceover → video editing → export). Integrate with Seedance or Vidu for specific AI-generated visual assets within your Vidora projects. This hybrid approach gives you the best of all worlds.',
        ],
      },
    ],
  },
  'ai-video-trends-2026': {
    slug: 'ai-video-trends-2026',
    title: '10 AI Video Trends Every Creator Should Know',
    subtitle: 'From AI avatars to real-time dubbing — the trends reshaping content creation in 2026.',
    date: 'Jun 18, 2026',
    readTime: '4 min read',
    category: 'Trends',
    gradient: 'from-pink-500 via-rose-400 to-red-300',
    author: 'Ko Kaung',
    authorRole: 'Content Creator & Founder',
    authorAvatar: 'KK',
    views: 9156,
    tags: ['Trends', 'AI Video', '2026', 'Future'],
    sections: [
      {
        heading: 'The AI Video Revolution is Here',
        paragraphs: [
          '2026 is the year AI video creation went from "promising experiment" to "essential creator tool." Here are the 10 trends defining the space — and how to stay ahead of the curve.',
        ],
      },
      {
        heading: 'Trends 1-5',
        paragraphs: [
          '1. AI Avatars Replace Face Cam — Over 60% of YouTube creators now use AI avatars instead of on-camera appearances. The technology has reached the point where viewers can\'t tell the difference. Avatars eliminate lighting, makeup, and reshoot problems entirely.',
          '2. Real-time AI Dubbing — AI dubbing in 50+ languages is becoming standard for global content distribution. Creators are seeing 300-500% viewership increases by releasing content in multiple languages simultaneously.',
          '3. Script-to-Video in Minutes — What took days now takes minutes. Full video generation from a text prompt, including voiceover, b-roll, captions, and transitions. The "one-click video" era has arrived.',
          '4. Personalized Video Ads — AI generates personalized video ads based on viewer demographics and behavior. Dynamic product placements, localized voiceovers, and customized messaging — all automated.',
          '5. Ethical Voice Cloning Goes Mainstream — Creators can now produce content in their own voice 24/7 using ethical voice cloning. Record once, generate unlimited content. Major platforms have approved the technology with proper disclosure.',
        ],
      },
      {
        heading: 'Trends 6-10',
        paragraphs: [
          '6. Interactive Video Experiences — AI enables choose-your-own-adventure style interactive videos. Viewers make choices that branch the narrative. Netflix and YouTube are already experimenting with the format.',
          '7. AI B-Roll Generation — No more stock footage subscriptions. AI generates custom b-roll on demand, perfectly matched to your script and brand style. B-roll that would have cost $500+ is now free and instant.',
          '8. Automated Captions & Translation — AI captions in 100+ languages with 99%+ accuracy. Beyond translation, AI now adapts cultural references and idioms for each audience, not just word-for-word translation.',
          '9. AI Video Summarization — Long-form content (30+ minutes) automatically condensed into highlight reels, shorts, and social clips. One long video becomes a week\'s worth of short-form content.',
          '10. Multilingual Content Factories — One script, 50 languages, AI handles the rest. The biggest creators are running "content factories" with AI managing distribution across languages, platforms, and formats simultaneously.',
        ],
      },
    ],
  },
  'how-we-built-vidora': {
    slug: 'how-we-built-vidora',
    title: 'How We Built Vidora AI — Technical Deep Dive',
    subtitle: 'The architecture, AI pipelines, and engineering decisions behind Myanmar\'s first AI video platform.',
    date: 'Jun 15, 2026',
    readTime: '12 min read',
    category: 'Engineering',
    gradient: 'from-emerald-600 via-green-500 to-teal-400',
    author: 'Ko Kaung',
    authorRole: 'Content Creator & Founder',
    authorAvatar: 'KK',
    views: 2890,
    tags: ['Engineering', 'Architecture', 'NLP', 'Tech Stack'],
    sections: [
      {
        heading: 'Why We Built Vidora',
        paragraphs: [
          'Vidora started as a personal frustration. As a content creator in Myanmar, I spent 20+ hours per video — scripting, recording voiceovers, editing, adding captions. The tools were English-only, expensive, and built for professional editors, not creators.',
          'The breakthrough came when I realized: what if an AI could do everything except the creative direction? Script generation, Burmese voice synthesis, video assembly, caption synchronization — all automated. The creator provides the idea; AI handles execution.',
        ],
      },
      {
        heading: 'The Tech Stack',
        paragraphs: [
          'Frontend: Next.js 16 with React 19, deployed on Vercel. We chose Next.js for its hybrid rendering — static pages for marketing, dynamic rendering for the editor. Tailwind CSS 4 for styling with a custom dark theme design system.',
          'Backend: Node.js with TypeScript. PostgreSQL for relational data (users, projects, billing), Redis for caching and job queues. All APIs are REST with OpenAPI 3.1 documentation.',
          'AI Pipeline: Custom fine-tuned models for Burmese NLP, integrated with ElevenLabs and Azure AI Speech for English voice synthesis. Deep Research uses a multi-agent architecture that searches, verifies, and synthesizes information from web sources.',
        ],
      },
      {
        heading: 'Burmese Language — The Hardest Problem',
        paragraphs: [
          'Burmese is what NLP researchers call a "low-resource language." There are no large public datasets, no pre-trained models, and very few tools. Building production-quality Burmese AI voices required custom phoneme modeling and tonal analysis.',
          'We collected over 500 hours of Burmese speech data, built a custom phoneme-to-speech pipeline, and trained models specifically on Myanmar dialect patterns. The result: 98% accuracy in tone reproduction — higher than most English TTS systems.',
          'The text processing pipeline handles Burmese script, Zawgyi-to-Unicode conversion, and mixed Burmese-English text. This is something no other video platform in the world does.',
        ],
      },
      {
        heading: 'What\'s Next',
        paragraphs: [
          'We\'re working on real-time collaboration (multiple creators editing the same video), AI-powered video translation that preserves voice characteristics across languages, and a mobile app for on-the-go editing.',
          'The vision: make Vidora the default tool for video creation across Southeast Asia. Burmese, Thai, Vietnamese, Bahasa — every language deserves professional AI video tools.',
        ],
      },
    ],
  },
  'script-to-screen-workflow': {
    slug: 'script-to-screen-workflow',
    title: 'From Script to Screen: Our Complete AI Video Workflow',
    subtitle: 'Follow along as we create a professional 10-minute documentary — from AI-generated script to final export.',
    date: 'Jun 10, 2026',
    readTime: '7 min read',
    category: 'Workflow',
    gradient: 'from-indigo-600 via-blue-500 to-sky-400',
    author: 'Ko Kaung',
    authorRole: 'Content Creator & Founder',
    authorAvatar: 'KK',
    views: 5102,
    tags: ['Workflow', 'Tutorial', 'Production', 'AI Video'],
    sections: [
      {
        heading: 'The Documentary Project',
        paragraphs: [
          'In this guide, I\'ll walk you through the complete process of creating a 10-minute documentary about Myanmar\'s startup ecosystem — entirely with AI tools. From initial concept to final export, every step.',
          'This is the exact workflow I use for client projects. It typically produces professional results in 2-3 hours instead of 2-3 weeks with traditional methods.',
        ],
      },
      {
        heading: 'Phase 1: Research & Script (30 minutes)',
        paragraphs: [
          'Started with Vidora\'s Deep Research mode, asking: "Myanmar startup ecosystem 2024-2026, funding rounds, key players, challenges, and growth." The AI returned 27 sources with verified facts, statistics, and quotes.',
          'Used the Script Generator with "Documentary" style, 10-minute target length. The AI produced a structured script with: hook (30s), context (2min), three key stories (5min), analysis (2min), and conclusion (30s).',
          'Review and edit cycle took about 20 minutes. Made minor adjustments to tone and added two personal anecdotes. The AI handles the structure and research; creative direction stays human.',
        ],
      },
      {
        heading: 'Phase 2: Voiceover & Visual Planning (30 minutes)',
        paragraphs: [
          'Selected "Min Thu" (Burmese, Authoritative) for the main narration and "Sophia" (English) for a brief international context segment. Bilingual setup with the AI handling language transitions.',
          'Generated a visual shot list: 24 scenes mapped to script sections. Each scene tagged with visual type (b-roll, text overlay, chart, interview clip) and duration. This took 15 minutes — manually it would take hours.',
        ],
      },
      {
        heading: 'Phase 3: Assembly & Polish (45 minutes)',
        paragraphs: [
          'Vidora\'s editor auto-assembled the timeline: voiceover track, AI-generated b-roll for each scene, captions synced to audio, and transitions between scenes. The initial assembly was 80% done.',
          'Spent 45 minutes refining: adjusted 3 scene timings, replaced 5 b-roll clips with custom images, added 2 charts created by the AI, and fine-tuned captions for Myanmar-specific terms.',
        ],
      },
      {
        heading: 'Phase 4: Export & Distribution (15 minutes)',
        paragraphs: [
          'Exported the full 10-minute documentary in 4K (16:9) for YouTube. Also exported: 3 short-form clips (60s each) for TikTok/Reels, a 30s trailer for social media, and an SRT subtitle file for accessibility.',
          'Total time: approximately 2 hours from concept to published video. Total cost: $0 on the free tier. Comparable traditional production: 2-3 weeks and $500-2,000 minimum.',
          'The key insight: AI doesn\'t replace the creator — it amplifies them. You still provide the creative vision, the editorial judgment, the personal touch. AI handles the mechanical work that used to eat up 90% of production time.',
        ],
      },
    ],
  },
};

/* ─── Copy Link Hook ─── */
function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
    >
      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
      {copied ? 'Copied!' : 'Copy Link'}
    </button>
  );
}

/* ─── Page ─── */
export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = posts[slug];
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [shareToast, setShareToast] = useState(false);

  const handleShare = useCallback(async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: post?.title ?? 'Vidora Blog', url });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(url);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 2000);
    }
  }, [post]);

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#040407] flex items-center justify-center px-4">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-gray-500" />
            </div>
            <h1 className="text-2xl font-bold text-white">Post Not Found</h1>
            <p className="text-gray-400 mt-2 text-sm">The article you&apos;re looking for doesn&apos;t exist or has been moved.</p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-medium hover:bg-purple-500 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="bg-[#040407]">
        {/* ─── Hero Banner ─── */}
        <section className="relative pt-28 pb-16 px-6 overflow-hidden">
          {/* Gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-b ${post.gradient} opacity-[0.06]`} />
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-purple-600/8 rounded-full blur-[150px]" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-8 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Back to Blog
            </Link>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              {/* Category & Tags */}
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className="inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-400">
                  {post.category}
                </span>
                {post.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-[11px] text-gray-500">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-[1.1] tracking-tight text-white">
                {post.title}
              </h1>

              {/* Subtitle */}
              <p className="mt-4 text-lg text-gray-400 leading-relaxed max-w-3xl">
                {post.subtitle}
              </p>

              {/* Author & Meta */}
              <div className="flex flex-wrap items-center gap-5 mt-8 pt-6 border-t border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-sm font-black text-white shadow-lg shadow-purple-500/20">
                    {post.authorAvatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{post.author}</div>
                    <div className="text-xs text-gray-500">{post.authorRole}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {post.readTime}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" /> {post.views.toLocaleString()} views
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Article Content ─── */}
        <section className="px-6 pb-16">
          <article className="max-w-3xl mx-auto">
            {post.sections.map((section, sectionIdx) => (
              <motion.div
                key={sectionIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * sectionIdx, duration: 0.5 }}
                className="mb-12 last:mb-0"
              >
                <h2 className="text-2xl font-bold text-white mb-5">{section.heading}</h2>
                {section.paragraphs.map((paragraph, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-gray-300 leading-relaxed text-base md:text-lg mb-4 last:mb-0"
                  >
                    {paragraph}
                  </p>
                ))}
              </motion.div>
            ))}

            {/* ─── Action Bar ─── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center justify-between gap-3 mt-16 pt-8 border-t border-white/[0.06]"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm transition-all ${
                    liked
                      ? 'bg-red-500/10 border-red-500/30 text-red-400'
                      : 'bg-white/[0.04] border-white/[0.08] text-gray-400 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/10'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${liked ? 'fill-red-400' : ''}`} /> {liked ? 'Liked' : 'Like'}
                </button>
                <button
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm transition-all ${
                    bookmarked
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                      : 'bg-white/[0.04] border-white/[0.08] text-gray-400 hover:text-amber-400 hover:border-amber-500/30'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-amber-400' : ''}`} /> {bookmarked ? 'Saved' : 'Save'}
                </button>
                <button
                  onClick={handleShare}
                  className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-gray-400 hover:text-purple-400 hover:border-purple-500/30 transition-all"
                >
                  <Share2 className="w-4 h-4" /> Share
                  {shareToast && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-emerald-500/90 px-3 py-1 text-[11px] text-white">Link copied!</span>
                  )}
                </button>
              </div>
              <CopyLinkButton />
            </motion.div>
          </article>
        </section>

        {/* ─── Related Posts ─── */}
        <section className="px-6 pb-32">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.values(posts)
                .filter((p) => p.slug !== slug)
                .slice(0, 3)
                .map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="group rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-md p-5 transition-all duration-300 hover:border-purple-500/30 hover:-translate-y-0.5"
                  >
                    <div className={`w-full h-1.5 rounded-full bg-gradient-to-r ${p.gradient} mb-4`} />
                    <span className="text-xs text-purple-400 font-medium">{p.category}</span>
                    <h3 className="text-sm font-bold text-white mt-1.5 group-hover:text-purple-300 transition-colors line-clamp-2">
                      {p.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                      <span>{p.date}</span>
                      <span>{p.readTime}</span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
