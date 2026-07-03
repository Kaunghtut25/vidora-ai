'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  PlusCircle,
  FolderOpen,
  Film,
  Settings,
  Mic,
  Palette,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const primaryNav = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/create', label: 'Create New', icon: PlusCircle },
  { href: '/projects', label: 'My Projects', icon: FolderOpen },
  { href: '/editor', label: 'Editor', icon: Film },
  { href: '/settings', label: 'Settings', icon: Settings },
];

const secondaryNav = [
  { href: '/voices', label: 'Voices', icon: Mic },
  { href: '/brand-kit', label: 'Brand Kit', icon: Palette },
  { href: '/help', label: 'Help', icon: HelpCircle },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 240 }}
      initial={false}
      transition={{ duration: 0.2, ease: 'easeInOut' as const }}
      className="fixed left-0 top-16 h-full bg-[#0D0D0D] border-r border-white/5 z-40 overflow-hidden flex flex-col"
    >
      {/* Toggle Button */}
      <div className="flex justify-end px-3 py-3">
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="p-1.5 rounded-md text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Primary Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        {primaryNav.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors text-sm font-medium whitespace-nowrap ${
                active
                  ? 'bg-purple-600/20 text-purple-400'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={20} className="shrink-0" />
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.15 }}
                    className="overflow-hidden"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* Divider + Secondary Navigation */}
      <div className="px-3 pb-4">
        <div className="border-t border-white/5 my-3" />

        <div className="space-y-1">
          {secondaryNav.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors text-sm font-medium whitespace-nowrap ${
                  active
                    ? 'bg-purple-600/20 text-purple-400'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={20} className="shrink-0" />
                <AnimatePresence mode="wait">
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.15 }}
                      className="overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.aside>
  );
}
