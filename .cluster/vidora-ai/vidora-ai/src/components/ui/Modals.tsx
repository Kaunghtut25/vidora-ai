'use client';

import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Video, Music, Camera } from 'lucide-react';

// ─── Export Modal ───────────────────────────────────────────────────────────

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (format: string) => void;
}

const exportOptions = [
  {
    id: 'mp4',
    label: 'MP4 (4K)',
    description: 'High quality video file',
    icon: Download,
    badge: 'Default',
    badgeClass: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    description: 'Direct upload to YouTube',
    icon: Video,
    badge: '16:9',
    badgeClass: 'bg-red-500/20 text-red-400 border-red-500/30',
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    description: '9:16 vertical format',
    icon: Music,
    badge: '9:16',
    badgeClass: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    description: '1:1 square format',
    icon: Camera,
    badge: '1:1',
    badgeClass: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  },
];

export function ExportModal({ isOpen, onClose, onExport }: ExportModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            if (e.target === overlayRef.current) onClose();
          }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Card */}
          <motion.div
            className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#0a0a0f]/90 p-6 backdrop-blur-xl shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' as const }}
          >
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Export Video</h2>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Export Options Grid */}
            <div className="mb-6 grid grid-cols-2 gap-3">
              {exportOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.id}
                    onClick={() => onExport(option.id)}
                    className="group flex flex-col items-start gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left transition-all hover:border-purple-500/50 hover:bg-purple-500/[0.05] cursor-pointer"
                  >
                    <div className="flex w-full items-center justify-between">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 transition-colors group-hover:bg-purple-500/10">
                        <Icon className="h-4.5 w-4.5 text-gray-300 transition-colors group-hover:text-purple-400" />
                      </div>
                      <span
                        className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${option.badgeClass}`}
                      >
                        {option.badge}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{option.label}</p>
                      <p className="text-xs text-gray-500">{option.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Export Button */}
            <button
              onClick={() => onExport('mp4')}
              className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Export
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Confirm Modal ───────────────────────────────────────────────────────────

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export function ConfirmModal({ isOpen, onClose, onConfirm, title, message }: ConfirmModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            if (e.target === overlayRef.current) onClose();
          }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Card */}
          <motion.div
            className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0a0f]/90 p-6 backdrop-blur-xl shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' as const }}
          >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">{title}</h2>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Message */}
            <p className="mb-6 text-sm leading-relaxed text-gray-400">{message}</p>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
