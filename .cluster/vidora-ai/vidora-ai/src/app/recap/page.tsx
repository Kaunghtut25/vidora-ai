'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RecapPage() {
  const [url, setUrl] = useState('');
  const [language, setLanguage] = useState<'my' | 'en'>('my');
  const [customPrompt, setCustomPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [log, setLog] = useState('');

  const runRecap = async () => {
    if (!url || loading) return;
    setLoading(true);
    setError('');
    setResult(null);
    setLog('🎬 Starting YouTube Recap pipeline...\n');

    try {
      setLog(l => l + '📡 Fetching video info via yt-dlp...\n');
      setLog(l => l + '📸 Extracting keyframes (10 evenly-spaced shots)...\n');

      const res = await fetch('/api/recap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, language, custom_prompt: customPrompt || undefined })
      });

      const data = await res.json();
      if (data.success) {
        setLog(l => l + data.output);
        setResult(data);
      } else {
        setError(data.error || 'Recap failed');
        setLog(l => l + `❌ ${data.error}\n`);
      }
    } catch (err: any) {
      setError(err.message);
      setLog(l => l + `❌ ${err.message}\n`);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#771BFF] flex items-center justify-center text-white font-bold text-sm">V</div>
            <span className="font-bold text-lg text-gray-900">Vendora</span>
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/create" className="text-gray-500 hover:text-gray-700">Create</Link>
            <Link href="/download" className="text-gray-500 hover:text-gray-700">Downloader</Link>
            <Link href="/agent" className="text-gray-500 hover:text-gray-700">Agent</Link>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full mb-4">New</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            YouTube → <span className="text-[#771BFF]">Recap + Burmese Voiceover</span>
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Like Invideo AI — paste a YouTube link, and our pipeline extracts frames, writes a Burmese narration with AI, generates voiceover with gTTS, and composes a cinematic recap video.
          </p>
        </div>

        {/* Input card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
          <div className="space-y-4">
            {/* YouTube URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">YouTube Link</label>
              <input
                type="text"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:border-[#771BFF] focus:ring-2 focus:ring-purple-100 focus:outline-none"
              />
            </div>

            {/* Language */}
            <div className="flex items-center gap-4">
              <label className="text-sm font-semibold text-gray-700">Voiceover Language:</label>
              <div className="flex gap-2">
                <button onClick={() => setLanguage('my')}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    language === 'my' ? 'bg-[#771BFF] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}>
                  🇲🇲 Burmese
                </button>
                <button onClick={() => setLanguage('en')}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    language === 'en' ? 'bg-[#771BFF] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}>
                  🇬🇧 English
                </button>
              </div>
            </div>

            {/* Custom prompt */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Custom Script <span className="text-gray-400 font-normal">(optional — AI generates if blank)</span>
              </label>
              <textarea
                value={customPrompt}
                onChange={e => setCustomPrompt(e.target.value)}
                placeholder="e.g., Summarize this cooking tutorial in Burmese with 5 key steps..."
                rows={3}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:border-[#771BFF] focus:ring-2 focus:ring-purple-100 focus:outline-none resize-none"
              />
            </div>

            {/* Action */}
            <button
              onClick={runRecap}
              disabled={loading || !url}
              className="w-full py-3.5 bg-[#771BFF] text-white font-bold rounded-xl hover:bg-[#5B0FCC] disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2">
              {loading ? (
                <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Generating Recap...</>
              ) : (
                '🎬 Generate Recap Video'
              )}
            </button>
          </div>
        </div>

        {/* Pipeline steps */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Pipeline Steps</h3>
          <div className="flex items-center gap-2 flex-wrap text-xs text-gray-500">
            {['YouTube Link', 'yt-dlp Info', 'Keyframes', 'Ollama Script', 'gTTS Voice', 'FFmpeg Edit', 'Final MP4'].map((step, i) => (
              <div key={step} className="flex items-center">
                <span className="px-2.5 py-1.5 bg-gray-100 rounded-lg font-medium">{step}</span>
                {i < 6 && <span className="text-gray-300 mx-0.5">→</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Log output */}
        {(log || loading) && (
          <div className="bg-gray-900 rounded-2xl p-5 font-mono text-xs text-green-400 leading-relaxed max-h-96 overflow-y-auto">
            {log.split('\n').map((line, i) => (
              <div key={i}>{line || '\u00A0'}</div>
            ))}
          </div>
        )}

        {/* Result */}
        {result && result.success && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-green-800 mb-2">✅ Recap Generated!</h3>
            <p className="text-sm text-green-700">Your recap video is ready in <code className="bg-green-100 px-2 py-0.5 rounded text-xs">~/Vidora_Output/</code></p>
          </div>
        )}

        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-red-800 mb-2">❌ Failed</h3>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
