'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Play, Menu, X, Download, Bot } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Create', href: '/create/step1' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Download', href: '/download' },
  { label: 'Agent', href: '/agent' },
  { label: 'Help', href: '/help' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 h-16 backdrop-blur-xl bg-black/60 border-b border-white/5 shrink-0">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center">
            <Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" />
          </div>
          <span className="text-white font-bold text-lg">VidoraAI</span>
        </Link>

        {/* Center nav links — hidden on mobile */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-gray-300 hover:text-purple-400 transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm text-gray-300 hover:text-purple-400 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/create/step1"
            className="bg-purple-600 hover:bg-purple-500 rounded-full px-5 py-2 text-sm font-medium text-white transition-colors duration-200"
          >
            Start Free
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-gray-300 hover:text-white transition-colors"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-black/90 backdrop-blur-xl border-b border-white/5 px-6 pb-6 pt-2"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-sm text-gray-300 hover:text-purple-400 transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-3 mt-3">
            <Link href="/login" onClick={() => setMobileOpen(false)} className="flex-1 text-center py-2 text-sm text-gray-300 border border-white/10 rounded-full">Sign In</Link>
            <Link href="/create/step1" onClick={() => setMobileOpen(false)} className="flex-1 text-center py-2 text-sm font-medium text-white bg-purple-600 rounded-full">Start Free</Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
