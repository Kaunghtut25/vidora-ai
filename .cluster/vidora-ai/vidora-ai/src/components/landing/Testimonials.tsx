'use client';

import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote:
      'Vidora AI saved me 20 hours per video. The Burmese voices are incredibly natural.',
    author: 'Sarah L.',
    role: 'Content Creator',
  },
  {
    quote:
      'Deep research mode is a game-changer. My documentary scripts now have real statistics and citations.',
    author: 'James K.',
    role: 'Filmmaker',
  },
  {
    quote:
      'The transcript editor makes editing feel like writing. No more timeline scrubbing.',
    author: 'Aung M.',
    role: 'YouTuber',
  },
];

const Stars = () => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
    ))}
  </div>
);

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: 'easeOut' as const },
  }),
};

export default function Testimonials() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Loved by{' '}
          <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Creators
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 flex flex-col gap-4"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
            >
              <Quote className="h-6 w-6 text-purple-400" />
              <p className="text-gray-400 italic leading-relaxed">{t.quote}</p>
              <Stars />
              <div>
                <p className="text-white font-bold">{t.author}</p>
                <p className="text-gray-500 text-sm">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
