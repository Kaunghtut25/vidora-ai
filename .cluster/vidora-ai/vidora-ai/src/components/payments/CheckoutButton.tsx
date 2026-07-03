'use client';

import { useState } from 'react';
import { Loader2, CreditCard, ArrowRight } from 'lucide-react';
import { createCheckoutSession } from '@/lib/stripe';

interface CheckoutButtonProps {
  planId: string;
  userId: string;
}

export default function CheckoutButton({ planId, userId }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const label = (() => {
    switch (planId) {
      case 'pro':
        return 'Upgrade to Pro';
      case 'enterprise':
        return 'Contact Sales';
      default:
        return 'Get Started';
    }
  })();

  const handleCheckout = async () => {
    if (planId === 'free') {
      // Free plan — no checkout needed, redirect directly
      window.location.href = '/dashboard';
      return;
    }

    if (planId === 'enterprise') {
      // Enterprise — scroll to contact form or open mailto
      window.location.href = 'mailto:sales@vidora.ai?subject=Enterprise%20Plan%20Inquiry';
      return;
    }

    setLoading(true);

    try {
      const session = await createCheckoutSession(planId, userId);

      // Show a toast notification before redirecting
      const toast = document.createElement('div');
      toast.className =
        'fixed bottom-6 right-6 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-lg z-50 animate-[slideUp_0.3s_ease-out] text-sm font-medium';
      toast.textContent = 'Checkout session created! Redirecting…';
      document.body.appendChild(toast);

      setTimeout(() => {
        toast.remove();
        window.location.href = session.url;
      }, 1200);
    } catch (error) {
      console.error('Checkout failed:', error);

      const toast = document.createElement('div');
      toast.className =
        'fixed bottom-6 right-6 bg-red-600 text-white px-5 py-3 rounded-xl shadow-lg z-50 animate-[slideUp_0.3s_ease-out] text-sm font-medium';
      toast.textContent = 'Something went wrong. Please try again.';
      document.body.appendChild(toast);

      setTimeout(() => toast.remove(), 3000);
    } finally {
      setLoading(false);
    }
  };

  const isEnterprise = planId === 'enterprise';

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`
        group relative inline-flex items-center justify-center gap-2
        px-6 py-3 rounded-xl text-sm font-semibold
        transition-all duration-200
        disabled:opacity-60 disabled:cursor-not-allowed
        ${
          isEnterprise
            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40'
            : planId === 'free'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40'
              : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40'
        }
      `}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Processing…
        </>
      ) : (
        <>
          {isEnterprise ? (
            <CreditCard className="w-4 h-4" />
          ) : (
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          )}
          {label}
        </>
      )}
    </button>
  );
}
