'use client';

import { motion } from 'framer-motion';
import { Search, Globe, Sparkles, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DeepResearchToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export default function DeepResearchToggle({ enabled, onToggle }: DeepResearchToggleProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <Search size={16} className="text-purple-400" />
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
          AI Research Mode
        </h3>
      </div>

      <button
        onClick={() => onToggle(!enabled)}
        className={cn(
          'w-full text-left p-5 rounded-xl border transition-all duration-300 group',
          enabled
            ? 'border-purple-500/40 bg-purple-500/5 shadow-[0_0_20px_rgba(139,92,246,0.1)]'
            : 'border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]'
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span
                className={cn(
                  'text-sm font-semibold transition-colors',
                  enabled ? 'text-purple-300' : 'text-gray-400 group-hover:text-gray-300'
                )}
              >
                Deep Research
              </span>
              {enabled && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/20 text-[10px] font-bold text-purple-300 uppercase tracking-wider"
                >
                  <Zap size={10} />
                  Active
                </motion.span>
              )}
            </div>

            <p className="text-xs text-gray-500 leading-relaxed max-w-md">
              Let AI research the web for the latest facts, statistics, and context before generating your script.
              Adds ~2-3 minutes to generation time but produces more accurate, well-researched content.
            </p>

            {enabled && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 flex flex-wrap gap-3"
              >
                {[
                  { icon: Globe, label: 'Web Search', desc: 'Finds latest sources' },
                  { icon: Sparkles, label: 'Fact Check', desc: 'Verifies key claims' },
                  { icon: Search, label: 'Deep Context', desc: 'Adds expert insights' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-500/[0.08] border border-purple-500/10"
                  >
                    <item.icon size={14} className="text-purple-400 shrink-0" />
                    <div>
                      <div className="text-[11px] font-semibold text-purple-300">{item.label}</div>
                      <div className="text-[10px] text-gray-500">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Toggle switch */}
          <div
            className={cn(
              'relative w-11 h-6 rounded-full shrink-0 transition-colors duration-300',
              enabled ? 'bg-purple-600' : 'bg-white/10'
            )}
          >
            <motion.div
              className={cn(
                'absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md',
                enabled ? 'left-[calc(100%-1.375rem)]' : 'left-0.5'
              )}
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </div>
        </div>
      </button>

      {/* Disabled hint */}
      {!enabled && (
        <p className="text-[11px] text-gray-600 pl-1">
          Best for factual/educational content. Leave off for storytelling or casual scripts.
        </p>
      )}
    </div>
  );
}
