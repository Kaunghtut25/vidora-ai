// Vidora AI — Admin Login
// Premium dark-themed authentication page

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Eye, EyeOff, ArrowLeft, Sparkles, Lock } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState<'email' | 'password' | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await login(email, password);
      const user = useAuthStore.getState().user;
      if (user?.role !== 'admin') {
        setError('Access denied — admin credentials required');
        useAuthStore.getState().logout();
        return;
      }
      router.push('/admin');
    } catch {
      setError('Invalid credentials — please try again');
    }
  };

  const fillDemoCredentials = () => {
    setEmail('admin@vidora.ai');
    setPassword('admin123');
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/4 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-800/3 rounded-full blur-[150px]" />
      </div>

      {/* Grid pattern overlay */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md z-10"
      >
        {/* Back to site link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Site
        </Link>

        {/* Main card */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#0A0A0F]/80 backdrop-blur-2xl p-8 shadow-2xl shadow-purple-500/5">
          {/* Shield icon */}
          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-400 blur-xl opacity-40" />
              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-600/30">
                <Shield className="w-9 h-9 text-white" />
              </div>
            </motion.div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-black tracking-tight">
              Admin Access
            </h1>
            <p className="text-sm text-gray-400 mt-2">
              Sign in to manage Vidora AI
            </p>
          </div>

          {/* Login form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email field */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                Email Address
              </label>
              <div className={`relative rounded-xl border transition-all duration-300 ${
                focusedField === 'email'
                  ? 'border-purple-500/60 shadow-[0_0_0_3px_rgba(139,92,246,0.08)]'
                  : 'border-white/[0.08] hover:border-white/[0.15]'
              }`}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="admin@vidora.ai"
                  className="w-full bg-transparent px-4 py-3 text-white placeholder-gray-600 focus:outline-none text-sm"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                Password
              </label>
              <div className={`relative rounded-xl border transition-all duration-300 ${
                focusedField === 'password'
                  ? 'border-purple-500/60 shadow-[0_0_0_3px_rgba(139,92,246,0.08)]'
                  : 'border-white/[0.08] hover:border-white/[0.15]'
              }`}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="••••••••"
                  className="w-full bg-transparent px-4 py-3 text-white placeholder-gray-600 focus:outline-none pr-11 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-all"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3">
                    <Lock className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="relative w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold text-sm overflow-hidden hover:from-purple-500 hover:to-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-600/20"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign In to Admin
                  <Sparkles className="w-4 h-4" />
                </span>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-xs text-gray-600 uppercase tracking-wider">Demo Credentials</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          {/* Demo credentials */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="rounded-xl bg-white/[0.03] border border-white/[0.05] p-3 text-center">
              <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Email</div>
              <div className="text-sm font-mono text-purple-400">
                admin@vidora.ai
              </div>
            </div>
            <div className="rounded-xl bg-white/[0.03] border border-white/[0.05] p-3 text-center">
              <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Password</div>
              <div className="text-sm font-mono text-purple-400">admin123</div>
            </div>
          </div>

          {/* Auto-fill button */}
          <button
            type="button"
            onClick={fillDemoCredentials}
            disabled={isLoading}
            className="w-full py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-purple-500/30 text-sm text-gray-400 hover:text-purple-400 font-medium transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Use Demo Credentials
          </button>
        </div>

        {/* Footer text */}
        <p className="text-center text-xs text-gray-600 mt-6">
          Vidora AI Admin Panel • Protected Area
        </p>
      </motion.div>
    </div>
  );
}
