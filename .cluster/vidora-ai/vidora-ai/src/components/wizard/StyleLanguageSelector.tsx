'use client';

import { motion } from 'framer-motion';
import { Palette, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { VideoStyle } from '@/types';

interface StyleLanguageSelectorProps {
  style: VideoStyle;
  onStyleChange: (style: VideoStyle) => void;
  language: 'English' | 'Bilingual';
  onLanguageChange: (lang: 'English' | 'Bilingual') => void;
}

const stylePills: { id: VideoStyle; label: string; description: string }[] = [
  { id: 'Educational', label: 'Educational', description: 'Informative, clear, structured lessons' },
  { id: 'Storytelling', label: 'Storytelling', description: 'Narrative-driven, emotional, engaging' },
  { id: 'Corporate', label: 'Corporate', description: 'Professional, polished, business tone' },
  { id: 'Vlog', label: 'Vlog', description: 'Casual, conversational, personality-driven' },
  { id: 'Sales', label: 'Sales', description: 'Persuasive, compelling, conversion-focused' },
];

const languageOptions: {
  id: 'English' | 'Bilingual';
  emoji: string;
  label: string;
  description: string;
  highlight?: string;
}[] = [
  {
    id: 'English',
    emoji: '🇬🇧',
    label: 'English',
    description: 'Global audience, Western accent options',
  },
  {
