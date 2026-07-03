'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fillDemoCredentials = () => {
    setEmail('demo@vidora.ai');
    setPassword('Demo@2026');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    // Simulate auth + redirect
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#040407] px-4 py-16">
      {/* Ambient background orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[150px]" />
        <div className="absolute -right-32 bottom-1/4 h-[400px] w-[400px] rounded-full bg-cyan-500/8 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-violet-600/6 blur-[100px]" />
      </div>

      {/* Animated grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-2xl p-8 sm:p-10 shadow-2xl">
          {/* Logo & Brand */}
          <div className="mb-8 flex flex-col items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-400 shadow-xl shadow-purple-500/25">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 2L24 8V20L14 26L4 20V8L14 2Z"
                  fill="white"
                  fillOpacity="0.95"
                  stroke="white"
                  strokeWidth="0.5"
                />
                <circle cx="14" cy="14" r="3" fill="#7C3AED" />
              </svg>
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold tracking-tight text-white">
                Welcome back
              </h1>
              <p className="mt-1.5 text-sm text-gray-400">
                Sign in to your Vidora account
              </p>
            </div>
          </div>

          {/* Error alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 flex items-center gap-2.5 rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-400"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-gray-400">
                Email address
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 outline-none transition-all duration-200 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-gray-400">
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] py-2.5 pl-10 pr-11 text-sm text-white placeholder-gray-500 outline-none transition-all duration-200 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 transition-colors hover:text-gray-300"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 select-none">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="h-4 w-4 rounded border border-white/20 bg-white/[0.03] transition-colors peer-checked:border-purple-500 peer-checked:bg-purple-500 flex items-center justify-center">
                    {rememberMe && (
                      <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-xs text-gray-400">Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-xs font-medium text-purple-400 transition-colors hover:text-purple-300"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group relative mt-2 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-600/25 transition-all duration-200 hover:shadow-purple-600/40 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-7 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
            <span className="text-xs text-gray-500 uppercase tracking-wider">OR CONTINUE WITH</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
          </div>

          {/* Social buttons */}
          <div className="flex items-center justify-center gap-4">
            {/* Google */}
            <button
              type="button"
              aria-label="Sign in with Google"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-gray-400 transition-all duration-200 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500/30"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </button>

            {/* GitHub */}
            <button
              type="button"
              aria-label="Sign in with GitHub"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-gray-400 transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </button>
          </div>

          {/* Demo credentials hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-7 rounded-xl border border-amber-500/15 bg-amber-500/[0.04] p-4"
          >
            <div className="flex items-start gap-2.5">
              <Sparkles className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-medium text-amber-400">Demo Access</p>
                <p className="mt-1 text-xs text-gray-400">
                  Use <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-amber-300/70 text-[11px]">demo@vidora.ai</code> /{' '}
                  <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-amber-300/70 text-[11px]">Demo@2026</code> to explore
                </p>
              </div>
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="shrink-0 rounded-lg bg-amber-500/15 border border-amber-500/25 px-3 py-1.5 text-xs font-medium text-amber-400 hover:bg-amber-500/25 transition-colors"
              >
                Autofill
              </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom link */}
        <p className="mt-7 text-center text-sm text-gray-500">
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="font-medium text-purple-400 transition-colors hover:text-purple-300"
          >
            Sign up →
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
