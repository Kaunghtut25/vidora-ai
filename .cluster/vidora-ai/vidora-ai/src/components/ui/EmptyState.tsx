'use client';

import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {/* Icon */}
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-400/10">
        <div className="text-purple-400">{icon}</div>
      </div>

      {/* Title */}
      <h3 className="mb-2 text-base font-semibold text-white">{title}</h3>

      {/* Description */}
      <p className="mb-6 max-w-xs text-sm text-gray-400">{description}</p>

      {/* Optional Action */}
      {action && (
        <button
          onClick={action.onClick}
          className="rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
