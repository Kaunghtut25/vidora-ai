'use client';

import { Search, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type FilterStatus = 'all' | 'completed' | 'generating' | 'draft';

interface DashboardActionsProps {
  onSearch: (query: string) => void;
  onCreateNew: () => void;
  activeFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
}

const filters: { key: FilterStatus; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'completed', label: 'Completed' },
  { key: 'generating', label: 'Generating' },
  { key: 'draft', label: 'Drafts' },
];

export default function DashboardActions({
  onSearch,
  onCreateNew,
  activeFilter,
  onFilterChange,
}: DashboardActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
        />
        <input
          type="text"
          placeholder="Search projects..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full glass rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-purple-500/40 transition-colors"
        />
      </div>

      {/* Filter pills + Create button */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => onFilterChange(f.key)}
              className={cn(
                'px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                activeFilter === f.key
                  ? 'bg-purple-600 text-white'
                  : 'glass text-gray-400 hover:text-white'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <button
          onClick={onCreateNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          <PlusCircle size={18} />
          Create New Video
        </button>
      </div>
    </div>
  );
}
