'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Check } from 'lucide-react';

const STEPS = [
  { step: 1, label: 'Content', href: '/create/step1' },
  { step: 2, label: 'Customize', href: '/create/step2' },
  { step: 3, label: 'Generate', href: '/create/step3' },
  { step: 4, label: 'Preview', href: '/create/step4' },
];

export default function CreateLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentIndex = STEPS.findIndex((s) => pathname.startsWith(s.href));

  return (
    <div className="min-h-screen bg-[#040407]">
      {/* Wizard Progress Stepper */}
      <div className="sticky top-0 z-30 bg-[#040407]/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
          {/* Mobile: step X of 4 */}
          <div className="sm:hidden text-center mb-3">
            <span className="text-sm text-gray-400">
              Step {currentIndex + 1} of 4 — {STEPS[currentIndex]?.label}
            </span>
          </div>

          <div className="flex items-center justify-between">
            {STEPS.map((s, i) => {
              const isCompleted = i < currentIndex;
              const isActive = i === currentIndex;
              const isFuture = i > currentIndex;

              return (
                <div key={s.step} className="flex items-center flex-1 last:flex-none">
                  <Link
                    href={isFuture ? '#' : s.href}
                    className={`flex items-center gap-2 sm:gap-3 group transition-colors ${
                      isFuture ? 'pointer-events-none' : ''
                    }`}
                    aria-disabled={isFuture}
                    tabIndex={isFuture ? -1 : undefined}
                  >
                    {/* Step circle */}
                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-300 shrink-0 ${
                        isCompleted
                          ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(139,92,246,0.4)]'
                          : isActive
                            ? 'bg-purple-600 text-white shadow-[0_0_16px_rgba(139,92,246,0.5)] ring-2 ring-purple-500/30'
                            : 'bg-white/5 text-gray-600 border border-white/5'
                      }`}
                    >
                      {isCompleted ? <Check size={14} strokeWidth={3} /> : s.step}
                    </div>

                    {/* Step label (hidden on mobile xs) */}
                    <span
                      className={`text-xs sm:text-sm font-medium transition-colors hidden xs:inline ${
                        isCompleted
                          ? 'text-purple-300'
                          : isActive
                            ? 'text-white'
                            : 'text-gray-700'
                      }`}
                    >
                      {s.label}
                    </span>
                  </Link>

                  {/* Connector line */}
                  {i < STEPS.length - 1 && (
                    <div className="flex-1 mx-2 sm:mx-4">
                      <div className="relative h-0.5 bg-white/5 rounded-full">
                        <div
                          className="absolute inset-y-0 left-0 bg-purple-600 rounded-full transition-all duration-500"
                          style={{ width: isCompleted ? '100%' : '0%' }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content area */}
      <main className="max-w-4xl mx-auto py-6 sm:py-8 px-4 sm:px-6">{children}</main>
    </div>
  );
}
