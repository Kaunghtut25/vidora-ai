'use client';

import { useState, useEffect } from 'react';

// Live-ish rates (updated periodically)
const RATES: Record<string, Record<string, number>> = {
  THB: { MMK: 59.5, USD: 0.028, THB: 1 },
  MMK: { THB: 0.0168, USD: 0.00048, MMK: 1 },
  USD: { THB: 35.5, MMK: 2100, USD: 1 },
};

const FLAGS: Record<string, string> = { THB: '🇹🇭', MMK: '🇲🇲', USD: '🇺🇸' };
const SYMBOLS: Record<string, string> = { THB: '฿', MMK: 'K', USD: '$' };

export function convert(amount: number, from: string, to: string): number {
  const rate = RATES[from]?.[to] || 1;
  return Math.round(amount * rate * 100) / 100;
}

export function formatCurrency(amount: number, currency: string): string {
  if (currency === 'THB') return `฿${amount.toLocaleString('en-US')}`;
  if (currency === 'MMK') return `${amount.toLocaleString('en-US')} Ks`;
  return `$${amount.toLocaleString('en-US')}`;
}

export function CurrencyBadge({ amount, from, to, className = '' }: { amount: number; from: string; to: string; className?: string }) {
  const converted = convert(amount, from, to);
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span>{FLAGS[from]}</span>
      <span className="text-white/70">{formatCurrency(amount, from)}</span>
      <span className="text-white/20">≈</span>
      <span>{FLAGS[to]}</span>
      <span className="text-white/50">{formatCurrency(converted, to)}</span>
    </span>
  );
}

export function PriceDisplay({ usdPrice }: { usdPrice: number }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-5xl font-black price-glow">$0</div>
      <div className="flex items-center gap-4 text-sm">
        <span className="flex items-center gap-1 text-slate-500">
          <span>🇹🇭</span> ฿0
        </span>
        <span className="text-slate-700">·</span>
        <span className="flex items-center gap-1 text-slate-500">
          <span>🇲🇲</span> 0 Ks
        </span>
      </div>
      <span className="text-xs text-slate-600">Free forever · No hidden fees</span>
    </div>
  );
}

export const LOCATION = {
  country: 'Thailand',
  flag: '🇹🇭',
  city: 'Bangkok',
  timezone: 'Asia/Bangkok',
  currencies: ['THB', 'MMK'],
  supported: true,
};

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(100);
  const [from, setFrom] = useState('THB');
  const [to, setTo] = useState('MMK');

  return (
    <div className="p-6 rounded-2xl glass space-y-4">
      <h3 className="text-sm font-semibold text-white">Currency Converter</h3>
      <div className="flex items-center gap-3">
        <input type="number" value={amount} onChange={e => setAmount(+e.target.value)}
          className="w-24 bg-[#0A0E17] border border-white/[0.06] rounded-xl px-3 py-2 text-white text-sm focus:border-violet-500 focus:outline-none" />
        <select value={from} onChange={e => setFrom(e.target.value)}
          className="bg-[#0A0E17] border border-white/[0.06] rounded-xl px-3 py-2 text-white text-sm">
          <option value="THB">{FLAGS.THB} THB</option>
          <option value="MMK">{FLAGS.MMK} MMK</option>
          <option value="USD">{FLAGS.USD} USD</option>
        </select>
        <span className="text-slate-600">→</span>
        <select value={to} onChange={e => setTo(e.target.value)}
          className="bg-[#0A0E17] border border-white/[0.06] rounded-xl px-3 py-2 text-white text-sm">
          <option value="MMK">{FLAGS.MMK} MMK</option>
          <option value="THB">{FLAGS.THB} THB</option>
          <option value="USD">{FLAGS.USD} USD</option>
        </select>
      </div>
      <div className="text-lg font-bold text-white">
        {FLAGS[from]} {formatCurrency(amount, from)} = {FLAGS[to]} {formatCurrency(convert(amount, from, to), to)}
      </div>
    </div>
  );
}
