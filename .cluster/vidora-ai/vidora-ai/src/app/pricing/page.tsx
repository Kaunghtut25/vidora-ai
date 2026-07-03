'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ChevronDown, Sparkles, Zap, Crown } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

interface PlanFeature {
  name: string;
  free: boolean | string;
  pro: boolean | string;
  enterprise: boolean | string;
}

const featureRows: PlanFeature[] = [
  { name: 'AI Voices', free: '6 voices', pro: 'All 12 voices', enterprise: 'Unlimited custom' },
  { name: 'Video Resolution', free: '720p', pro: '4K', enterprise: '8K / Custom' },
  { name: 'Max Video Length', free: '10 min', pro: '50+ min', enterprise: 'Unlimited' },
  { name: 'Deep Research', free: false, pro: true, enterprise: true },
  { name: 'Transcript Editor', free: false, pro: true, enterprise: true },
  { name: 'Export Formats', free: 'MP4', pro: 'MP4, GIF, PNG', enterprise: 'All + RAW' },
  { name: 'Brand Kit', free: false, pro: true, enterprise: true },
  { name: 'API Access', free: false, pro: false, enterprise: true },
  { name: 'Team Collaboration', free: false, pro: false, enterprise: true },
  { name: 'Priority Support', free: false, pro: true, enterprise: true },
  { name: 'Custom Integrations', free: false, pro: false, enterprise: true },
  { name: 'SLA Guarantee', free: false, pro: false, enterprise: true },
  { name: 'White-label Export', free: false, pro: false, enterprise: true },
  { name: 'Videos / Month', free: '5', pro: 'Unlimited', enterprise: 'Unlimited' },
];

const faqs = [
  {
    question: 'Can I switch plans?',
    answer:
      'Absolutely. You can upgrade or downgrade your plan at any time. When upgrading, you get immediate access to all new features. When downgrading, changes take effect at the end of your current billing cycle.',
  },
  {
    question: 'Is there a free trial?',
    answer:
      'Yes! The Free plan is our forever-free tier — no credit card required. For Pro features, we offer a 7-day free trial so you can explore everything risk-free before committing.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit and debit cards (Visa, Mastercard, Amex), PayPal, and Apple Pay. Enterprise plans can also be invoiced with net-30 terms.',
  },
  {
    question: 'Can I cancel anytime?',
    answer:
      'Yes, there are no long-term contracts or cancellation fees. Cancel anytime from your account settings and your plan will remain active until the end of the billing period.',
  },
  {
    question: 'Do you offer refunds?',
    answer:
      'We offer a 14-day money-back guarantee on all paid plans. If Vendora AI isn&apos;t the right fit, contact our support team and we&apos;ll process a full refund — no questions asked.',
  },
];

const plans = [
  {
    name: 'Free',
    icon: Sparkles,
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: 'Start creating today',
    features: [
      '5 videos/month',
      '6 voices',
      '720p export',
      'Basic captions',
      '10-min max',
    ],
    cta: 'Get Started Free',
    highlighted: false,
  },
  {
    name: 'Pro',
    icon: Zap,
    monthlyPrice: 29,
    yearlyPrice: 23,
    description: 'For serious creators',
    features: [
      'Unlimited videos',
      'All 12 voices',
      '4K export',
      'Advanced captions',
      '50+ min length',
      'Deep research',
      'Transcript editor',
      'Brand kit',
    ],
    cta: 'Start Pro',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise',
    icon: Crown,
    monthlyPrice: 99,
    yearlyPrice: 79,
    description: 'For teams & studios',
    features: [
      'Everything in Pro',
      'Custom voices',
      'API access',
      'Team collaboration',
      'Priority support',
      'Custom integrations',
      'SLA guarantee',
      'White-label export',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                    */
/* ------------------------------------------------------------------ */

function PricingToggle({
  yearly,
  onToggle,
}: {
  yearly: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-center gap-4">
      <span
        className={`text-sm font-medium transition-colors ${
          !yearly ? 'text-white' : 'text-gray-500'
        }`}
      >
        Monthly
      </span>
      <button
        onClick={onToggle}
        className="relative w-14 h-7 rounded-full bg-white/10 p-0.5 transition-colors hover:bg-white/15 focus-visible:outline-none"
        aria-label={yearly ? 'Switch to monthly' : 'Switch to yearly'}
      >
        <motion.div
          className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg"
          animate={{ x: yearly ? 28 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </button>
      <span
        className={`text-sm font-medium transition-colors ${
          yearly ? 'text-white' : 'text-gray-500'
        }`}
      >
        Yearly
      </span>
      <span className="ml-1 rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-semibold text-green-400 border border-green-500/20">
        Save 20%
      </span>
    </div>
  );
}

function PricingCard({
  plan,
  index,
  yearly,
}: {
  plan: (typeof plans)[0];
  index: number;
  yearly: boolean;
}) {
  const router = useRouter();
  const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;
  const Icon = plan.icon;

  const handleCTA = () => {
    if (plan.name === 'Enterprise') {
      router.push('/contact');
    } else {
      router.push('/signup');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.5, ease: 'easeOut' }}
      className={`relative rounded-2xl p-6 flex flex-col gap-5 ${
        plan.highlighted
          ? 'border border-purple-500/40 bg-white/[0.07] shadow-[0_0_30px_rgba(168,85,247,0.18)]'
          : 'border border-white/10 bg-white/5 backdrop-blur-md'
      }`}
    >
      {/* Badge */}
      {plan.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-1 text-xs font-semibold text-white shadow-lg whitespace-nowrap">
          {plan.badge}
        </div>
      )}

      {/* Icon + Name */}
      <div className="flex items-center gap-2.5">
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center ${
            plan.highlighted
              ? 'bg-purple-500/20 text-purple-400'
              : 'bg-white/10 text-gray-400'
          }`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-bold text-white">
          ${price}
        </span>
        <span className="text-gray-400 text-sm">/mo</span>
      </div>
      <p className="text-gray-400 text-sm -mt-4">{plan.description}</p>

      {/* Feature list */}
      <ul className="flex flex-col gap-3 flex-1">
        {plan.features.map((feat, j) => (
          <li key={j} className="flex items-center gap-2 text-gray-300">
            <Check className="h-4 w-4 text-green-400 shrink-0" />
            <span className="text-sm">{feat}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={handleCTA}
        className={`w-full rounded-xl py-2.5 text-sm font-semibold transition-all duration-300 ${
          plan.highlighted
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]'
            : 'border border-white/20 bg-white/5 text-white hover:bg-white/10'
        }`}
      >
        {plan.cta}
      </button>
    </motion.div>
  );
}

function FeatureCell({ value }: { value: boolean | string }) {
  if (typeof value === 'boolean') {
    return value ? (
      <Check className="w-5 h-5 text-green-400 mx-auto" />
    ) : (
      <X className="w-5 h-5 text-gray-600 mx-auto" />
    );
  }
  return (
    <span className="text-sm text-gray-300">{value}</span>
  );
}

function ComparisonTable({ yearly }: { yearly: boolean }) {
  const headerPlan = plans.map((p) => ({
    name: p.name,
    icon: p.icon,
    highlighted: p.highlighted,
    price: yearly ? p.yearlyPrice : p.monthlyPrice,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="overflow-x-auto"
    >
      <table className="w-full min-w-[600px] text-left">
        <thead>
          <tr className="border-b border-white/10">
            <th className="py-4 pr-6 text-sm font-semibold text-gray-400">
              Feature
            </th>
            {headerPlan.map((p) => (
              <th key={p.name} className="py-4 px-4 text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <p.icon className="w-4 h-4 text-gray-400" />
                  <span
                    className={`text-sm font-semibold ${
                      p.highlighted ? 'text-purple-400' : 'text-white'
                    }`}
                  >
                    {p.name}
                  </span>
                </div>
                <span className="text-xs text-gray-500">${p.price}/mo</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {featureRows.map((row, i) => (
            <motion.tr
              key={row.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03, duration: 0.3 }}
              className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
            >
              <td className="py-3.5 pr-6 text-sm text-gray-300">
                {row.name}
              </td>
              <td className="py-3.5 px-4 text-center">
                <FeatureCell value={row.free} />
              </td>
              <td className="py-3.5 px-4 text-center bg-white/[0.02]">
                <FeatureCell value={row.pro} />
              </td>
              <td className="py-3.5 px-4 text-center">
                <FeatureCell value={row.enterprise} />
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="border border-white/10 rounded-xl bg-white/[0.03] backdrop-blur-md overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline-none group"
      >
        <span className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors">
          {question}
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
              {answer}
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
          question={faq.question}
          answer={faq.answer}
          isOpen={openIndex === i}
          onToggle={() => toggle(i)}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function PricingPage() {
  const [yearly, setYearly] = useState(false);

  return (
    <>
      <Navbar />

      <main className="bg-[#050508]">
        {/* ── Hero ── */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          {/* Background mesh */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-4xl md:text-5xl font-bold tracking-tight"
            >
              Choose Your{' '}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Plan
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="mt-4 text-gray-400 text-lg max-w-md mx-auto"
            >
              Start free, upgrade when you&apos;re ready
            </motion.p>

            {/* Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="mt-10"
            >
              <PricingToggle
                yearly={yearly}
                onToggle={() => setYearly((prev) => !prev)}
              />
            </motion.div>
          </div>
        </section>

        {/* ── Pricing cards ── */}
        <section className="px-6 pb-24">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 items-start">
            {plans.map((plan, i) => (
              <PricingCard
                key={plan.name}
                plan={plan}
                index={i}
                yearly={yearly}
              />
            ))}
          </div>
        </section>

        {/* ── Feature Comparison ── */}
        <section className="px-6 pb-24 mesh-dark">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold">
                Compare{' '}
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Features
                </span>
              </h2>
              <p className="text-gray-400 mt-2 text-sm">
                Everything you need to know, side by side
              </p>
            </motion.div>

            <ComparisonTable yearly={yearly} />
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
                Got questions? We&apos;ve got answers.
              </p>
            </motion.div>

            <FAQSection />
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className="px-6 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-4xl mx-auto relative overflow-hidden rounded-2xl border border-purple-500/20 bg-white/[0.04] backdrop-blur-xl p-10 md:p-14 text-center"
          >
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold">
                Start Creating{' '}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Free
                </span>{' '}
                Today
              </h2>
              <p className="mt-3 text-gray-400 max-w-md mx-auto">
                No credit card required. Create your first AI-powered video in
                under 5 minutes.
              </p>
              <Link
                href="/create/step1"
                className="inline-flex mt-8 items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(168,85,247,0.25)] hover:shadow-[0_0_50px_rgba(168,85,247,0.4)] transition-shadow duration-300"
              >
                <Sparkles className="w-4 h-4" />
                Start Creating Free
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}
