'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  User,
  Palette,
  Mic,
  CreditCard,
  Upload,
  Save,
  Play,
  ChevronRight,
  Check,
  Crown,
  Zap,
  Film,
  HardDrive,
  Clock,
  Shield,
  Headphones,
} from 'lucide-react';

/* ──────────────── Types ──────────────── */

type SettingsTab = 'account' | 'brand-kit' | 'voices' | 'billing';

interface VoiceData {
  id: string;
  name: string;
  avatar: string;
  language: string;
  region: string;
  description: string;
  gender: string;
}

interface BrandKitData {
  primaryColor: string;
  secondaryColor: string;
  font: string;
  watermark: boolean;
  logoName: string | null;
  introName: string | null;
  outroName: string | null;
}

/* ──────────────── Mock Data ──────────────── */

const fonts = ['Inter', 'Roboto', 'Poppins', 'Montserrat', 'Playfair Display'];

const voices: VoiceData[] = [
  { id: 'sophia', name: 'Sophia', avatar: '👩‍💼', language: 'English', region: 'US', description: 'Professional, warm, versatile', gender: 'female' },
  { id: 'marcus', name: 'Marcus', avatar: '👨‍🏫', language: 'English', region: 'UK', description: 'Authoritative, clear, deep', gender: 'male' },
  { id: 'priya', name: 'Priya', avatar: '👩‍🔬', language: 'English', region: 'Indian', description: 'Energetic, bright, fast-paced', gender: 'female' },
  { id: 'david', name: 'David', avatar: '👨‍💻', language: 'English', region: 'Australian', description: 'Calm, reassuring, smooth', gender: 'male' },
  { id: 'emma', name: 'Emma', avatar: '👩‍🎓', language: 'English', region: 'US', description: 'Youthful, friendly, natural', gender: 'female' },
  { id: 'james', name: 'James', avatar: '👨‍⚖️', language: 'English', region: 'UK', description: 'Formal, precise, measured', gender: 'male' },
  { id: 'aisha', name: 'Aisha', avatar: '👩‍🏫', language: 'English', region: 'Indian', description: 'Educational, paced, warm', gender: 'female' },
  { id: 'liam', name: 'Liam', avatar: '👨‍🎤', language: 'English', region: 'Australian', description: 'Casual, upbeat, modern', gender: 'male' },
];

const settingsTabs: { id: SettingsTab; label: string; icon: React.ElementType }[] = [
  { id: 'account', label: 'Account', icon: User },
  { id: 'brand-kit', label: 'Brand Kit', icon: Palette },
  { id: 'voices', label: 'Voices', icon: Mic },
  { id: 'billing', label: 'Billing', icon: CreditCard },
];

/* ──────────────── Tab: Account ──────────────── */

function AccountTab() {
  const [name, setName] = useState('Ko Kaung');
  const [email, setEmail] = useState('kokaung@vidora.ai');
  const [company, setCompany] = useState('Vidora Studio');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="glass-card p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-white">Account Details</h2>
        <p className="text-xs text-zinc-500 mt-0.5">Manage your personal information</p>
      </div>

      {/* Avatar */}
      <div>
        <label className="block text-xs font-medium text-zinc-400 mb-3 uppercase tracking-wider">Avatar</label>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center text-2xl overflow-hidden">
            {avatar ? (
              <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              '🦞'
            )}
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-zinc-400 hover:text-white hover:border-white/20 transition-all">
            <Upload size={13} />
            Upload photo
          </button>
        </div>
      </div>

      {/* Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wider">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-violet-500/50 focus:border-violet-500/30 transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wider">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-violet-500/50 focus:border-violet-500/30 transition-all"
          />
        </div>
      </div>

      {/* Company */}
      <div>
        <label className="block text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wider">Company (optional)</label>
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-violet-500/50 focus:border-violet-500/30 transition-all"
        />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-medium hover:opacity-90 transition-all shadow-lg shadow-violet-500/20"
        >
          <Save size={14} />
          Save Changes
        </button>
        {saved && (
          <span className="flex items-center gap-1.5 text-xs text-emerald-400">
            <Check size={14} />
            Saved successfully
          </span>
        )}
      </div>
    </div>
  );
}

/* ──────────────── Tab: Brand Kit ──────────────── */

function BrandKitTab() {
  const [kit, setKit] = useState<BrandKitData>({
    primaryColor: '#8B5CF6',
    secondaryColor: '#06B6D4',
    font: 'Inter',
    watermark: false,
    logoName: null,
    introName: null,
    outroName: null,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="glass-card p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-white">Brand Kit</h2>
        <p className="text-xs text-zinc-500 mt-0.5">Set defaults applied automatically to new projects</p>
      </div>

      {/* Logo */}
      <div>
        <label className="block text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wider">Logo</label>
        <button
          onClick={() => setKit((k) => ({ ...k, logoName: k.logoName ? null : 'brand-logo.png' }))}
          className="w-full border border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center gap-3 hover:border-violet-500/40 hover:bg-violet-500/5 transition-all group"
        >
          {kit.logoName ? (
            <>
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                <Check size={20} className="text-violet-400" />
              </div>
              <span className="text-sm text-white/70 font-medium">{kit.logoName}</span>
              <span className="text-xs text-zinc-500">Click to remove</span>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-violet-500/30 transition-all">
                <Upload size={20} className="text-zinc-500 group-hover:text-violet-400 transition-colors" />
              </div>
              <div className="text-center">
                <span className="text-sm text-zinc-400">Drop logo or click to upload</span>
                <br />
                <span className="text-xs text-zinc-600">PNG, SVG — max 2MB</span>
              </div>
            </>
          )}
        </button>
      </div>

      {/* Colors */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wider">Primary Color</label>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <input
              type="color"
              value={kit.primaryColor}
              onChange={(e) => setKit((k) => ({ ...k, primaryColor: e.target.value }))}
              className="w-9 h-9 rounded-lg border border-white/10 bg-transparent cursor-pointer"
            />
            <div className="w-8 h-8 rounded-lg border border-white/10" style={{ backgroundColor: kit.primaryColor }} />
            <span className="text-xs text-zinc-500 font-mono">{kit.primaryColor}</span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wider">Secondary Color</label>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <input
              type="color"
              value={kit.secondaryColor}
              onChange={(e) => setKit((k) => ({ ...k, secondaryColor: e.target.value }))}
              className="w-9 h-9 rounded-lg border border-white/10 bg-transparent cursor-pointer"
            />
            <div className="w-8 h-8 rounded-lg border border-white/10" style={{ backgroundColor: kit.secondaryColor }} />
            <span className="text-xs text-zinc-500 font-mono">{kit.secondaryColor}</span>
          </div>
        </div>
      </div>

      {/* Font */}
      <div>
        <label className="block text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wider">Font Family</label>
        <select
          value={kit.font}
          onChange={(e) => setKit((k) => ({ ...k, font: e.target.value }))}
          className="w-full rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-violet-500/50 appearance-none cursor-pointer"
        >
          {fonts.map((f) => (
            <option key={f} value={f} className="bg-[#111118] text-white">
              {f}
            </option>
          ))}
        </select>
      </div>

      {/* Video uploads */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wider">Intro Video</label>
          <button
            onClick={() => setKit((k) => ({ ...k, introName: k.introName ? null : 'intro.mp4' }))}
            className="w-full border border-dashed border-white/10 rounded-xl p-4 flex flex-col items-center gap-1.5 hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all"
          >
            {kit.introName ? (
              <span className="text-xs text-cyan-400">{kit.introName}</span>
            ) : (
              <>
                <Upload size={14} className="text-zinc-600" />
                <span className="text-[11px] text-zinc-500">Upload intro</span>
              </>
            )}
          </button>
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wider">Outro Video</label>
          <button
            onClick={() => setKit((k) => ({ ...k, outroName: k.outroName ? null : 'outro.mp4' }))}
            className="w-full border border-dashed border-white/10 rounded-xl p-4 flex flex-col items-center gap-1.5 hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all"
          >
            {kit.outroName ? (
              <span className="text-xs text-cyan-400">{kit.outroName}</span>
            ) : (
              <>
                <Upload size={14} className="text-zinc-600" />
                <span className="text-[11px] text-zinc-500">Upload outro</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Watermark toggle */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
        <div>
          <p className="text-sm font-medium text-white">Watermark</p>
          <p className="text-xs text-zinc-500">Show Vidora branding on exported videos</p>
        </div>
        <button
          onClick={() => setKit((k) => ({ ...k, watermark: !k.watermark }))}
          className={`relative w-11 h-6 rounded-full transition-colors ${kit.watermark ? 'bg-violet-600' : 'bg-white/10'}`}
        >
          <div
            className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
              kit.watermark ? 'translate-x-[22px]' : 'translate-x-0.5'
            }`}
          />
        </button>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-medium hover:opacity-90 transition-all shadow-lg shadow-violet-500/20"
        >
          <Save size={14} />
          Save Brand Kit
        </button>
        {saved && (
          <span className="flex items-center gap-1.5 text-xs text-emerald-400">
            <Check size={14} />
            Saved
          </span>
        )}
      </div>
    </div>
  );
}

/* ──────────────── Tab: Voices ──────────────── */

function VoicesTab() {
  const [selectedId, setSelectedId] = useState('sophia');
  const [playingId, setPlayingId] = useState<string | null>(null);

  const englishVoices = voices.filter((v) => v.language === 'English');

  return (
    <div className="glass-card p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-white">Available Voices</h2>
        <p className="text-xs text-zinc-500 mt-0.5">Preview and set your default voice</p>
      </div>

      {/* English */}
      <div>
        <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
          English — {englishVoices.length} voices
        </h3>
        <div className="space-y-1">
          {englishVoices.map((voice) => (
            <VoiceRow
              key={voice.id}
              voice={voice}
              isSelected={selectedId === voice.id}
              isPlaying={playingId === voice.id}
              onSelect={() => setSelectedId(voice.id)}
              onPlay={() => setPlayingId(playingId === voice.id ? null : voice.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function VoiceRow({
  voice,
  isSelected,
  isPlaying,
  onSelect,
  onPlay,
}: {
  voice: VoiceData;
  isSelected: boolean;
  isPlaying: boolean;
  onSelect: () => void;
  onPlay: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      className={`flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer border ${
        isSelected
          ? 'bg-violet-500/10 border-violet-500/30'
          : 'border-transparent hover:bg-white/[0.02]'
      }`}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPlay();
        }}
        className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors shrink-0"
      >
        <Play
          size={14}
          className={isPlaying ? 'text-cyan-400' : 'text-zinc-500'}
          fill={isPlaying ? '#06B6D4' : 'none'}
        />
      </button>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-white">{voice.name}</span>
          <span className="text-lg">{voice.avatar}</span>
        </div>
        <p className="text-xs text-zinc-500 truncate">{voice.description} · {voice.region}</p>
      </div>
      <div
        className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
          isSelected ? 'border-violet-500 bg-violet-500' : 'border-white/15'
        }`}
      >
        {isSelected && <Check size={11} className="text-white" />}
      </div>
    </div>
  );
}

/* ──────────────── Tab: Billing ──────────────── */

function BillingTab() {
  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-white">Current Plan</h2>
            <p className="text-xs text-zinc-500 mt-0.5">You are on the Free tier</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-zinc-400 flex items-center gap-1.5">
            Free
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <Film size={16} className="text-violet-400 mb-2" />
            <p className="text-lg font-bold text-white">5</p>
            <p className="text-xs text-zinc-500">videos / month</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <Clock size={16} className="text-cyan-400 mb-2" />
            <p className="text-lg font-bold text-white">50</p>
            <p className="text-xs text-zinc-500">AI minutes</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <HardDrive size={16} className="text-emerald-400 mb-2" />
            <p className="text-lg font-bold text-white">5 GB</p>
            <p className="text-xs text-zinc-500">storage</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <Zap size={16} className="text-amber-400 mb-2" />
            <p className="text-lg font-bold text-white">720p</p>
            <p className="text-xs text-zinc-500">export quality</p>
          </div>
        </div>

        <Link
          href="/pricing"
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-medium hover:opacity-90 transition-all shadow-lg shadow-violet-500/20"
        >
          <Crown size={15} />
          Upgrade to Pro — $29/mo
        </Link>
      </div>

      {/* Usage */}
      <div className="glass-card p-6 space-y-5">
        <div>
          <h2 className="text-lg font-semibold text-white">Usage This Month</h2>
          <p className="text-xs text-zinc-500 mt-0.5">Resets on July 31, 2026</p>
        </div>

        {[
          { label: 'Videos generated', used: 3, total: 5, pct: 60 },
          { label: 'AI minutes used', used: 28, total: 50, pct: 56 },
          { label: 'Storage used', used: 1.2, total: 5, pct: 24, unit: 'GB' },
        ].map((item) => (
          <div key={item.label}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-zinc-400">{item.label}</span>
              <span className="text-xs font-medium text-white">
                {item.unit ? `${item.used} / ${item.total} ${item.unit}` : `${item.used} / ${item.total}`}
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-500"
                style={{ width: `${item.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Pro Benefits */}
      <div className="glass-card p-6 bg-gradient-to-br from-violet-500/5 to-cyan-500/5 border-violet-500/20">
        <div className="flex items-center gap-2 mb-3">
          <Crown size={18} className="text-violet-400" />
          <h3 className="text-base font-semibold text-white">Pro Plan Benefits</h3>
        </div>
        <div className="space-y-2 mb-5">
          {[
            'Unlimited video generations',
            '200 AI minutes per month',
            '4K export quality',
            'Custom brand kit & watermark removal',
            'Priority generation queue',
            'Advanced voice cloning',
            'Team collaboration',
          ].map((benefit) => (
            <div key={benefit} className="flex items-center gap-2 text-xs text-zinc-300">
              <Check size={13} className="text-emerald-400 shrink-0" />
              {benefit}
            </div>
          ))}
        </div>
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-medium hover:opacity-90 transition-all shadow-lg shadow-violet-500/20"
        >
          Upgrade to Pro
          <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  );
}

/* ──────────────── Settings Page ──────────────── */

export default function SettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<SettingsTab>('account');

  const tabContent: Record<SettingsTab, React.ReactNode> = {
    account: <AccountTab />,
    'brand-kit': <BrandKitTab />,
    voices: <VoicesTab />,
    billing: <BillingTab />,
  };

  return (
    <div className="min-h-screen bg-[#040407]">
      {/* Background mesh */}
      <div className="fixed inset-0 pointer-events-none mesh-purple opacity-30" />

      {/* Top bar */}
      <header className="relative h-12 flex items-center gap-4 px-4 border-b border-white/5 bg-[#0a0a10]/80 backdrop-blur-xl">
        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
        </button>
        <h1 className="text-sm font-medium text-white">Settings</h1>
      </header>

      {/* Content */}
      <div className="relative max-w-3xl mx-auto px-4 py-8">
        {/* Tab nav */}
        <div className="flex gap-1 mb-8 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl">
          {settingsTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white/10 text-white shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <tab.icon size={14} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div key={activeTab} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          {tabContent[activeTab]}
        </div>
      </div>
    </div>
  );
}
