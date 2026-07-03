'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  User, Mail, Lock, Check, ArrowRight, Sparkles,
  Video, Smartphone, UserX, Megaphone, GraduationCap, MoreHorizontal,
  ChevronLeft, ChevronRight
} from 'lucide-react';

/* ─── Types ─── */
type Step = 1 | 2 | 3;
type ContentType = 'youtube' | 'tiktok' | 'faceless' | 'marketing' | 'education' | 'other' | null;

interface StepConfig {
  label: string;
  description: string;
}

const STEPS: StepConfig[] = [
  { label: 'Account', description: 'Create your login' },
  { label: 'Content Type', description: 'What do you create?' },
  { label: 'Confirm', description: 'Review & finish' },
];

/* ─── OAuth ─── */
const OAUTH_PROVIDERS = [
  {
    name: 'Google',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z" />
      </svg>
    ),
  },
];

/* ─── Content Types ─── */
const CONTENT_TYPES = [
  { id: 'youtube' as const, icon: Video, label: 'YouTube Videos', desc: 'Long-form, reviews, tutorials', gradient: 'from-red-500 to-rose-500' },
  { id: 'tiktok' as const, icon: Smartphone, label: 'TikTok / Shorts', desc: 'Vertical short-form content', gradient: 'from-pink-500 to-fuchsia-500' },
  { id: 'faceless' as const, icon: UserX, label: 'Faceless Content', desc: 'AI avatars, voiceover videos', gradient: 'from-violet-500 to-purple-500' },
  { id: 'marketing' as const, icon: Megaphone, label: 'Marketing Videos', desc: 'Ads, product demos, promos', gradient: 'from-cyan-500 to-blue-500' },
  { id: 'education' as const, icon: GraduationCap, label: 'Educational Content', desc: 'Courses, explainers, how-tos', gradient: 'from-emerald-500 to-teal-500' },
  { id: 'other' as const, icon: MoreHorizontal, label: 'Other', desc: 'Something else entirely', gradient: 'from-amber-500 to-orange-500' },
];

/* ─── Password Rules ─── */
const PASSWORD_RULES = [
  { label: 'At least 8 characters', test: (v: string) => v.length >= 8 },
  { label: 'One uppercase letter', test: (v: string) => /[A-Z]/.test(v) },
  { label: 'One number', test: (v: string) => /[0-9]/.test(v) },
  { label: 'One special character', test: (v: string) => /[^A-Za-z0-9]/.test(v) },
];

function getStrength(pw: string): { score: 0 | 1 | 2 | 3; color: string; label: string } {
  const count = PASSWORD_RULES.filter((r) => r.test(pw)).length;
  if (!pw) return { score: 0, color: 'bg-white/10', label: '' };
  if (count <= 1) return { score: 1, color: 'bg-red-500', label: 'Weak' };
  if (count <= 3) return { score: 2, color: 'bg-yellow-500', label: 'Fair' };
  return { score: 3, color: 'bg-green-500', label: 'Strong' };
}

/* ─── Page ─── */
export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [contentType, setContentType] = useState<ContentType>(null);
  const [agree, setAgree] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const strength = useMemo(() => getStrength(password), [password]);
  const passwordsMatch = !confirm || confirm === password;

  const canNextStep1 = name.trim() && email.trim() && password && confirm && passwordsMatch && strength.score >= 2;
  const canNextStep2 = contentType !== null;
  const canSubmit = agree;

  const handleNext = () => {
    if (step === 1 && canNextStep1) setStep(2);
    else if (step === 2 && canNextStep2) setStep(3);
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 2000);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-[#040407] px-4 py-16">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-purple-600/12 blur-[140px]" />
        <div className="absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-violet-700/10 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/6 blur-[90px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-2xl p-8 sm:p-10 shadow-2xl">
          {/* Brand */}
          <div className="mb-2 flex justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-cyan-400 shadow-lg shadow-purple-500/20">
              <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
                <path d="M14 2L24 8V20L14 26L4 20V8L14 2Z" fill="white" fillOpacity="0.95" stroke="white" strokeWidth="0.5" />
                <circle cx="14" cy="14" r="3" fill="#7C3AED" />
              </svg>
            </div>
          </div>

          <h1 className="text-center text-2xl font-bold text-white mt-3">
            Create your account
          </h1>
          <p className="mt-1.5 text-center text-sm text-gray-400">
            Start creating AI-powered videos in minutes
          </p>

          {/* Step indicator — horizontal dots + labels */}
          <div className="mt-7 flex items-center justify-center gap-1.5">
            {STEPS.map((s, i) => (
              <div key={s.label} className="flex items-center gap-1.5">
                <div
                  className={`flex items-center gap-2 rounded-full transition-all duration-300 ${
                    s.label === STEPS[step - 1].label
                      ? 'px-3 py-1 bg-purple-500/20 text-purple-300'
                      : step > (i + 1)
                        ? 'px-3 py-1 bg-white/[0.04] text-white/50'
                        : 'px-3 py-1 bg-transparent text-white/25'
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-medium ${
                      step > (i + 1)
                        ? 'bg-green-500 text-white'
                        : s.label === STEPS[step - 1].label
                          ? 'bg-purple-500 text-white'
                          : 'bg-white/10 text-white/40'
                    }`}
                  >
                    {step > (i + 1) ? <Check className="h-3 w-3" /> : i + 1}
                  </span>
                  <span className="text-xs font-medium">{s.label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`h-px w-4 transition-colors duration-300 ${step > (i + 1) ? 'bg-green-500/30' : 'bg-white/[0.06]'}`} />
                )}
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-7">
            <AnimatePresence mode="wait">
              {/* ─── Step 1: Account ─── */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {/* Name */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-400">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 outline-none transition-all duration-200 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-400">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 outline-none transition-all duration-200 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-400">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 outline-none transition-all duration-200 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20"
                      />
                    </div>

                    {/* Password strength + rules */}
                    {password && (
                      <div className="mt-2.5 space-y-2">
                        {/* Strength bar */}
                        <div className="space-y-1">
                          <div className="flex h-1 gap-1">
                            {[1, 2, 3].map((tier) => (
                              <div
                                key={tier}
                                className={`h-full flex-1 rounded-full transition-colors ${
                                  tier <= strength.score ? strength.color : 'bg-white/10'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-[11px] text-gray-500">
                            Strength:{' '}
                            <span
                              className={
                                strength.score === 1
                                  ? 'text-red-400 font-medium'
                                  : strength.score === 2
                                    ? 'text-yellow-400 font-medium'
                                    : 'text-green-400 font-medium'
                              }
                            >
                              {strength.label}
                            </span>
                          </p>
                        </div>

                        {/* Rules checklist */}
                        <div className="space-y-1">
                          {PASSWORD_RULES.map((rule) => {
                            const passed = rule.test(password);
                            return (
                              <div key={rule.label} className="flex items-center gap-2 text-[11px]">
                                <div className={`flex h-3.5 w-3.5 items-center justify-center rounded-full ${passed ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-white/20'}`}>
                                  {passed ? <Check className="h-2.5 w-2.5" /> : <span className="text-[8px]">•</span>}
                                </div>
                                <span className={passed ? 'text-gray-400' : 'text-gray-600'}>{rule.label}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Confirm password */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-400">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                      <input
                        type="password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        placeholder="••••••••"
                        className={`w-full rounded-xl border bg-white/[0.04] py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 outline-none transition-all duration-200 ${
                          confirm && !passwordsMatch
                            ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-white/[0.08] focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20'
                        }`}
                      />
                      {confirm && passwordsMatch && (
                        <Check className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green-400" />
                      )}
                    </div>
                    {confirm && !passwordsMatch && (
                      <p className="mt-1 text-[11px] text-red-400">Passwords do not match</p>
                    )}
                  </div>

                  {/* Continue button */}
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!canNextStep1}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 py-3 text-sm font-medium text-white shadow-lg shadow-purple-600/20 transition-all hover:shadow-purple-600/30 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </motion.div>
              )}

              {/* ─── Step 2: Content Type ─── */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <p className="text-sm text-gray-400 text-center">
                    What kind of videos do you want to create?
                  </p>
                  <p className="text-xs text-gray-500 text-center -mt-2">
                    Choose one — you can always change this later
                  </p>

                  <div className="grid grid-cols-2 gap-3 mt-1">
                    {CONTENT_TYPES.map((ct) => {
                      const selected = contentType === ct.id;
                      return (
                        <button
                          key={ct.id}
                          type="button"
                          onClick={() => setContentType(ct.id)}
                          className={`relative flex flex-col items-center gap-2 rounded-xl border p-4 transition-all duration-300 ${
                            selected
                              ? 'border-purple-500/50 bg-purple-500/10 shadow-[0_0_20px_rgba(139,92,246,0.15)]'
                              : 'border-white/[0.06] bg-white/[0.03] hover:border-white/[0.12] hover:bg-white/[0.06]'
                          }`}
                        >
                          <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${ct.gradient} flex items-center justify-center shadow-lg`}>
                            <ct.icon className="w-5 h-5 text-white" />
                          </div>
                          <span className={`text-sm font-semibold ${selected ? 'text-white' : 'text-gray-300'}`}>
                            {ct.label}
                          </span>
                          <span className="text-[11px] text-gray-500 leading-tight text-center">
                            {ct.desc}
                          </span>
                          {selected && (
                            <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Back + Continue */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex items-center justify-center gap-1.5 flex-1 rounded-xl border border-white/[0.08] bg-white/[0.03] py-3 text-sm font-medium text-gray-300 transition-colors hover:bg-white/[0.06]"
                    >
                      <ChevronLeft className="h-4 w-4" /> Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={!canNextStep2}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 py-3 text-sm font-medium text-white shadow-lg shadow-purple-600/20 transition-all hover:shadow-purple-600/30 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Continue
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ─── Step 3: Confirm ─── */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {/* Review summary card */}
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 space-y-3">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      Review your details
                    </h3>
                    <div className="space-y-2.5">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Name</span>
                        <span className="text-white font-medium">{name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Email</span>
                        <span className="text-white font-medium">{email}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Content Type</span>
                        <span className="text-white font-medium">
                          {CONTENT_TYPES.find(ct => ct.id === contentType)?.label || '-'}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Plan</span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                          Free Tier
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Terms checkbox */}
                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:border-white/[0.1]">
                    <div className="relative mt-0.5 flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                        className="peer sr-only"
                      />
                      <div className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${
                        agree ? 'border-purple-500 bg-purple-500' : 'border-white/20 bg-white/[0.03]'
                      }`}>
                        {agree && <Check className="h-3 w-3 text-white" />}
                      </div>
                    </div>
                    <span className="text-xs leading-relaxed text-gray-400 mt-px">
                      I agree to the{' '}
                      <Link href="/terms" className="text-purple-400 underline-offset-2 hover:underline">Terms of Service</Link>
                      {' '}and{' '}
                      <Link href="/privacy" className="text-purple-400 underline-offset-2 hover:underline">Privacy Policy</Link>
                    </span>
                  </label>

                  {/* Back + Create Account */}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex items-center justify-center gap-1.5 flex-1 rounded-xl border border-white/[0.08] bg-white/[0.03] py-3 text-sm font-medium text-gray-300 transition-colors hover:bg-white/[0.06]"
                    >
                      <ChevronLeft className="h-4 w-4" /> Back
                    </button>
                    <button
                      type="submit"
                      disabled={!canSubmit || submitted}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 py-3 text-sm font-medium text-white shadow-lg shadow-purple-600/20 transition-all hover:shadow-purple-600/30 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {submitted ? (
                        <>Creating account...</>
                      ) : (
                        <>
                          Create Account
                          <Sparkles className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/[0.06]" />
            <span className="text-[11px] uppercase tracking-wider text-gray-600">
              or sign up with
            </span>
            <div className="h-px flex-1 bg-white/[0.06]" />
          </div>

          {/* OAuth buttons */}
          <div className="flex items-center justify-center gap-3">
            {OAUTH_PROVIDERS.map((provider) => (
              <button
                key={provider.name}
                type="button"
                aria-label={`Sign up with ${provider.name}`}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] transition-all hover:border-white/20 hover:bg-white/[0.08]"
              >
                {provider.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom link */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-medium text-purple-400 transition-colors hover:text-purple-300"
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </main>
  );
}
