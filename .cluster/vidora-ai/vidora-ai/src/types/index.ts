// Vidora AI — Core Types

// ── Unions ──
export type VoiceGender = 'male' | 'female';
export type VoiceRegion = 'US' | 'UK' | 'IN' | 'AU' | 'CA' | 'NZ' | 'IE' | 'ZA' | 'SG' | 'KE' | 'NG' | 'HK' | 'PH' | 'TZ' | 'Yangon' | 'Mandalay';
export type VoiceEmotion = 'Neutral' | 'Professional' | 'Friendly' | 'Excited' | 'Calm';
export type VideoLength = 10 | 15 | 20 | 30 | 50;
export type VideoStyle = 'Educational' | 'Storytelling' | 'Corporate' | 'Vlog' | 'Sales';
export type ProjectStatus = 'draft' | 'researching' | 'generating' | 'editing' | 'completed' | 'failed';
export type ContentInputType = 'url' | 'video' | 'script' | 'prompt';
export type ExportFormat = 'mp4' | 'youtube' | 'tiktok' | 'instagram';

// ── Voice ──
export interface Voice {
  id: string;
  name: string;
  gender: VoiceGender;
  region: VoiceRegion;
  language: 'English';
  description: string;
  accent: string;
  gradient: string; // tailwind gradient classes for avatar
  sampleUrl?: string;
  edgeTTS?: string; // Edge TTS voice ID
  avatar: string; // emoji (legacy)
}

// ── Chapter ──
export interface Chapter {
  id: string;
  title: string;
  startTime: number;
  endTime: number;
  text: string;
}

// ── TranscriptLine (legacy) ──
export interface TranscriptLine {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
  voice?: string;
  emphasis?: boolean;
}

// ── VoiceSettings (legacy, used by store/wizard) ──
export interface VoiceSettings {
  voiceId: string;
  speed: number;
  emotion: VoiceEmotion;
  pitch: number;
}

// ── VideoSettings (spec) ──
export interface VideoSettings {
  length: VideoLength;
  voiceId: string;
  style: VideoStyle;
  language: 'English' | 'Bilingual';
  deepResearch: boolean;
  emotion: VoiceEmotion;
  speed: number;
  pitch: number;
}

// ── Project ──
export interface Project {
  id: string;
  title: string;
  status: ProjectStatus;
  duration: number; // minutes
  voiceId: string;
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
  script?: string;
  chapters?: Chapter[];
  // legacy fields (used by existing wizard/editor)
  contentInput?: ContentInputType;
  contentSource?: string;
  videoLength?: VideoLength;
  voice?: VoiceSettings;
  style?: VideoStyle;
  language?: 'English' | 'Bilingual';
  deepResearch?: boolean;
  transcript?: TranscriptLine[];
}

// ── User ──
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'creator';
  plan: 'free' | 'pro' | 'enterprise';
  avatar: string;
}

// ── BrandKit (legacy) ──
export interface BrandKit {
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  font: string;
  introVideo?: string;
  outroVideo?: string;
  watermark: boolean;
}

// ── GenerationStage (legacy) ──
export interface GenerationStage {
  id: string;
  label: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
}
