'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/mo',
    description: 'Start creating today',
    features: [
      '5 videos/month',
      '6 voices',
      '720p export',
      'Basic captions',
      '10-min max',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/mo',
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
    price: '$99',
    period: '/mo',
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

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' as const },
  }),
};

export default function Pricing() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Simple{' '}
          <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Pricing
          </span>
        </motion.h2>
        <motion.p
          className="text-gray-400 text-center mb-12 max-w-md mx-auto"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          Start free, go Pro when you&apos;re ready. No hidden fees.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              className={`relative rounded-2xl border p-6 flex flex-col gap-5 ${
                plan.highlighted
                  ? 'border-purple-500/50 bg-white/[0.06] shadow-[0_0_30px_rgba(168,85,247,0.15)]'
                  : 'border-white/10 bg-white/5 backdrop-blur-md'
              }`}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-1 text-xs font-semibold text-white shadow-lg">
                  {plan.badge}
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold text-white">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>
                <p className="text-gray-400 text-sm mt-1">
                  {plan.description}
                </p>
              </div>

              <ul className="flex flex-col gap-3 flex-1">
                {plan.features.map((feat, j) => (
                  <li key={j} className="flex items-center gap-2 text-gray-300">
                    <Check className="h-4 w-4 text-green-400 shrink-0" />
                    <span className="text-sm">{feat}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full rounded-xl py-2.5 text-sm font-semibold transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]'
                    : 'border border-white/20 bg-white/5 text-white hover:bg-white/10'
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
