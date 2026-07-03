'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, Mail, MapPin, MessageSquare, Clock, CheckCircle, Sparkles,
  HelpCircle, ChevronDown, ArrowRight, Phone, Globe, ExternalLink
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

/* ─── Contact Info ─── */
const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    value: 'hello@vidora.ai',
    desc: 'Response within 24 hours',
    gradient: 'from-purple-500 to-violet-500',
  },
  {
    icon: MessageSquare,
    title: 'Discord Community',
    value: 'discord.gg/vidora',
    desc: 'Chat with creators & team',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Clock,
    title: 'Support Hours',
    value: 'Mon–Sat, 9AM–6PM',
    desc: 'Yangon time (GMT+6:30)',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: MapPin,
    title: 'Location',
    value: 'Yangon, Myanmar',
    desc: 'Remote-first team 🇲🇲',
    gradient: 'from-fuchsia-500 to-pink-500',
  },
];

/* ─── FAQ Data ─── */
const faqs = [
  {
    q: 'Is Vidora free to use?',
    a: 'Yes! We offer a free tier with 3 videos per month — full features, no credit card required. Pro plans start at $19/month for unlimited videos, 4K export, and priority generation.',
  },
  {
    q: 'Can I use Burmese language in my videos?',
    a: 'Absolutely. Vidora is the only AI video platform with dedicated Burmese AI voices — 4 speakers (Aye Myat, Ko Ko, Thida, Min Thu) optimized for Myanmar phonemes. You can also mix Burmese and English in the same video.',
  },
  {
    q: 'What video formats and resolutions do you support?',
    a: 'Export in 1080p (Free tier) and 4K (Pro tier). Supported formats: MP4, MOV. Aspect ratios: 9:16 (vertical/Shorts), 16:9 (horizontal/YouTube), 1:1 (square/Instagram).',
  },
  {
    q: 'How long does video generation take?',
    a: 'A 10-minute video with AI voiceover takes approximately 3–5 minutes on the Pro plan. Longer videos scale linearly in processing time.',
  },
  {
    q: 'Can I upload my own footage and images?',
    a: 'Yes! You can upload your own video clips, images, and audio to mix with AI-generated content. The editor gives you full control over the timeline.',
  },
  {
    q: 'Do you have an API?',
    a: 'Yes! Our REST API is available on Enterprise plans. You can programmatically create videos, generate voiceovers, and manage projects. Contact us for access and documentation.',
  },
  {
    q: 'How does billing work for Pro plans?',
    a: 'Pro plans are billed monthly or annually (save 20% with annual). You can upgrade, downgrade, or cancel anytime. All plans include a 7-day free trial.',
  },
  {
    q: 'What happens to my data?',
    a: 'Your content is YOURS. We never train AI models on your videos, scripts, or voice. All data is encrypted at rest and in transit. See our Privacy Policy for full details.',
  },
];

/* ─── Toast ─── */
function Toast({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 backdrop-blur-xl shadow-lg shadow-emerald-500/10">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Message sent successfully! We&apos;ll get back to you soon.</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── FAQ Accordion ─── */
function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-white/[0.1]"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
      >
        <span className="text-sm font-semibold text-white">{faq.q}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm text-gray-400 leading-relaxed">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Page ─── */
export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <>
      <Navbar />
      <Toast show={sent} />

      <main className="bg-[#040407]">
        {/* ─── Header ─── */}
        <section className="relative pt-32 pb-12 px-6 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[450px] bg-purple-600/8 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 right-1/4 w-[350px] h-[300px] bg-cyan-500/6 rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-medium mb-6"
            >
              <Sparkles className="w-3.5 h-3.5" /> We&apos;d love to hear from you
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-4xl md:text-6xl font-black tracking-tight"
            >
              Get in{' '}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Touch</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="mt-4 text-gray-400 text-lg max-w-lg mx-auto"
            >
              Questions, feedback, or partnership inquiries — drop us a line
            </motion.p>
          </div>
        </section>

        {/* ─── Contact Grid ─── */}
        <section className="px-6 pb-20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.45 }}
                  className="group relative rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md p-5 flex items-start gap-4 hover:border-white/[0.12] hover:bg-white/[0.05] transition-all duration-300"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shrink-0 shadow-lg`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white">{item.title}</div>
                    {item.title === 'Email Us' ? (
                      <a href="mailto:hello@vidora.ai" className="text-sm text-purple-400 hover:text-purple-300 mt-0.5 transition-colors">{item.value}</a>
                    ) : item.title === 'Discord Community' ? (
                      <a href="https://discord.gg/vidora" target="_blank" rel="noopener noreferrer" className="text-sm text-purple-400 hover:text-purple-300 mt-0.5 transition-colors inline-flex items-center gap-1">{item.value} <ExternalLink className="w-3 h-3" /></a>
                    ) : (
                      <div className="text-sm text-gray-300 mt-0.5">{item.value}</div>
                    )}
                    <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
                  </div>
                </motion.div>
              ))}

              {/* Quick CTA */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.45 }}
                className="rounded-xl border border-purple-500/15 bg-purple-500/[0.03] backdrop-blur-md p-5 text-center"
              >
                <Globe className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <p className="text-sm text-gray-300 font-medium">Want to partner with Vidora?</p>
                <Link href="mailto:partners@vidora.ai" className="inline-flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 mt-2 transition-colors">
                  partners@vidora.ai <ExternalLink className="w-3 h-3" />
                </Link>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="lg:col-span-2 rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl p-8 md:p-10"
            >
              <h2 className="text-xl font-bold text-white mb-6">Send us a message</h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all duration-300"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Subject</label>
                  <div className="relative">
                    <select
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full appearance-none rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all duration-300"
                    >
                      <option value="" disabled className="bg-[#111]">Select a topic</option>
                      <option value="General Inquiry" className="bg-[#111]">General Inquiry</option>
                      <option value="Support" className="bg-[#111]">Technical Support</option>
                      <option value="Billing" className="bg-[#111]">Billing & Pricing</option>
                      <option value="Partnership" className="bg-[#111]">Partnership</option>
                      <option value="Enterprise" className="bg-[#111]">Enterprise / API</option>
                      <option value="Feedback" className="bg-[#111]">Feedback</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all duration-300 resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                <button
                  type="submit"
                  className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold shadow-lg shadow-purple-600/20 hover:shadow-purple-600/35 hover:brightness-110 transition-all duration-300"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </form>
            </motion.div>
          </div>
        </section>

        {/* ─── FAQ Section ─── */}
        <section className="px-6 pb-32">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-400 text-xs font-medium mb-4">
                <HelpCircle className="w-3.5 h-3.5" /> FAQ
              </div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight">
                Frequently Asked{' '}
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Questions</span>
              </h2>
            </motion.div>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <FAQItem key={i} faq={faq} index={i} />
              ))}
            </div>

            {/* Still have questions */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-10 text-center p-6 rounded-xl border border-purple-500/10 bg-purple-500/[0.02]"
            >
              <p className="text-sm text-gray-400">
                Still have questions?{' '}
                <a href="mailto:hello@vidora.ai" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                  Email us
                </a>
                {' '}or join our{' '}
                <a href="https://discord.gg/vidora" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                  Discord community
                </a>
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
