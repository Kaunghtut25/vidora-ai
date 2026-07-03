'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { useAppStore } from '@/store';

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
} as const;

const borderColorMap = {
  success: 'border-green-500/50',
  error: 'border-red-500/50',
  info: 'border-blue-500/50',
} as const;

const iconColorMap = {
  success: 'text-green-400',
  error: 'text-red-400',
  info: 'text-blue-400',
} as const;

// ─── Single Toast ────────────────────────────────────────────────────────────

function Toast({
  id,
  message,
  type,
}: {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}) {
  const removeNotification = useAppStore((s) => s.removeNotification);
  const Icon = iconMap[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      removeNotification(id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [id, removeNotification]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 80, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 0.95 }}
      transition={{ duration: 0.3, ease: 'easeOut' as const }}
      className={`flex items-start gap-3 rounded-xl border ${borderColorMap[type]} bg-[#0a0a0f]/90 p-4 backdrop-blur-xl shadow-lg min-w-[300px] max-w-[420px]`}
    >
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${iconColorMap[type]}`} />
      <p className="flex-1 text-sm leading-relaxed text-gray-200">{message}</p>
      <button
        onClick={() => removeNotification(id)}
        className="shrink-0 rounded-lg p-0.5 text-gray-500 transition-colors hover:bg-white/10 hover:text-gray-300"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

// ─── Notification Container ──────────────────────────────────────────────────

export function Notifications() {
  const notifications = useAppStore((s) => s.notifications);

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col-reverse gap-2">
      <AnimatePresence mode="popLayout">
        {notifications.map((n) => (
          <div key={n.id} className="pointer-events-auto">
            <Toast id={n.id} message={n.message} type={n.type} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
