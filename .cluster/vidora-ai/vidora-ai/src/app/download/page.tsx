'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Music, Video, Search, Clock, CheckCircle, AlertCircle, Loader2, History, FileVideo, FileAudio } from 'lucide-react';

interface SearchResult {
  title: string; id: string; duration: string; channel: string;
  url: string; thumbnail: string;
}

interface FormatEntry {
  code: string; container: string; resolution: string; note: string; size: string;
}

interface VideoInfo {
  title: string; duration: string; thumbnail: string;
}

interface FormatData {
  video: VideoInfo;
  videoFormats: FormatEntry[];
  audioFormats: FormatEntry[];
}

interface HistoryItem {
  filename: string; path: string; size: string; sizeMB: string; modified: string;
}

export default function DownloadPage() {
  const [url, setUrl] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [formatData, setFormatData] = useState<FormatData | null>(null);
  const [loadingFormats, setLoadingFormats] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load history
  const loadHistory = useCallback(async () => {
    try {
      const r = await fetch('/api/download');
      const d = await r.json();
      if (d.downloads) setHistory(d.downloads);
    } catch {}
  }, []);

  useEffect(() => { loadHistory(); }, [loadHistory]);

  // Search YouTube
  const doSearch = async () => {
    if (!searchQuery.trim()) return;
    setSearching(true);
    setFormatData(null);
    try {
      const r = await fetch(`/api/download?search=${encodeURIComponent(searchQuery.trim())}`);
      const d = await r.json();
      setSearchResults(d.results || []);
    } catch {
      setSearchResults([]);
    }
    setSearching(false);
  };

  // Get formats when URL is entered
  const analyzeUrl = async (ytUrl: string) => {
    if (!ytUrl.trim()) return;
    setLoadingFormats(true);
    setSearchResults([]);
    try {
      const r = await fetch(`/api/download?formats=${encodeURIComponent(ytUrl.trim())}`);
      const d = await r.json();
      setFormatData(d);
    } catch {
      setFormatData(null);
    }
    setLoadingFormats(false);
  };

  // Start download
  const startDownload = async (formatId: string) => {
    setDownloading(formatId);
    setStatusMsg('Starting download...');
    try {
      const r = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, formatId })
      });
      const d = await r.json();
      if (d.success) {
        setStatusMsg(`✅ Downloading "${d.title}" — check ~/Vidora_Output/`);
        setTimeout(() => { setDownloading(null); setStatusMsg(''); loadHistory(); }, 4000);
      } else {
        setStatusMsg(`❌ ${d.error}`);
        setDownloading(null);
      }
    } catch (err: any) {
      setStatusMsg(`❌ ${err.message}`);
      setDownloading(null);
    }
  };

  const selectSearchResult = (result: SearchResult) => {
    setUrl(result.url);
    setSearchResults([]);
    setSearchQuery('');
    analyzeUrl(result.url);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm mb-4">
            <Download className="w-4 h-4" /> Free YouTube Downloader
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Download YouTube Videos & MP3
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Paste a YouTube link or search — download in MP4, MP3, WEBM. No registration. No limits. Powered by yt-dlp.
          </p>
        </motion.div>

        {/* Search + URL Bar */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-[#111] border border-[#222] rounded-2xl p-4 sm:p-6 mb-6">
          
          {/* URL Input */}
          <div className="flex gap-3 mb-4">
            <div className="flex-1 relative">
              <input
                type="url"
                value={url}
                onChange={(e) => { setUrl(e.target.value); if (!e.target.value) setFormatData(null); }}
                onKeyDown={(e) => e.key === 'Enter' && analyzeUrl(url)}
                placeholder="Paste YouTube URL here..."
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:border-orange-500 focus:outline-none transition-colors text-sm"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
            </div>
            <button
              onClick={() => analyzeUrl(url)}
              disabled={!url.trim() || loadingFormats}
              className="px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 flex items-center gap-2 text-sm whitespace-nowrap"
            >
              {loadingFormats ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              Analyze
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && doSearch()}
                placeholder="Or search YouTube..."
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-600 focus:border-orange-500 focus:outline-none transition-colors text-sm"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            </div>
            <button
              onClick={doSearch}
              disabled={!searchQuery.trim() || searching}
              className="px-4 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] text-gray-300 rounded-xl hover:border-gray-500 transition-colors text-sm flex items-center gap-2"
            >
              {searching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              Search
            </button>
          </div>

          {/* Search Results */}
          <AnimatePresence>
            {searchResults.length > 0 && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0 }}
                className="mt-4 space-y-1 max-h-80 overflow-y-auto">
                {searchResults.map((r) => (
                  <button key={r.id} onClick={() => selectSearchResult(r)}
                    className="w-full flex items-center gap-3 p-2.5 hover:bg-[#1a1a1a] rounded-xl transition-colors text-left group">
                    <img src={r.thumbnail} alt="" className="w-28 h-16 rounded-lg object-cover flex-shrink-0 bg-[#1a1a1a]" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate group-hover:text-orange-400">{r.title}</p>
                      <p className="text-gray-500 text-xs flex items-center gap-2 mt-0.5">
                        {r.channel} · {r.duration}
                      </p>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Format Listing (like y2mate) */}
        <AnimatePresence>
          {formatData && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="space-y-4">
              
              {/* Video Info */}
              <div className="bg-[#111] border border-[#222] rounded-2xl p-4 sm:p-6">
                <div className="flex items-start gap-4">
                  {formatData.video.thumbnail && (
                    <img src={formatData.video.thumbnail} alt="" className="w-32 h-18 rounded-xl object-cover flex-shrink-0 bg-[#1a1a1a]" />
                  )}
                  <div className="min-w-0">
                    <h2 className="text-white text-lg font-semibold truncate">{formatData.video.title}</h2>
                    <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                      <Clock className="w-3.5 h-3.5" />
                      {formatData.video.duration}s
                    </p>
                  </div>
                </div>
              </div>

              {/* Video Formats */}
              {formatData.videoFormats.length > 0 && (
                <div className="bg-[#111] border border-[#222] rounded-2xl p-4 sm:p-6">
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-4">
                    <Video className="w-4 h-4 text-orange-400" />
                    Video Formats
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {formatData.videoFormats.map((f) => (
                      <button key={f.code} onClick={() => startDownload(f.code)}
                        disabled={downloading === f.code}
                        className="flex flex-col items-center gap-1 p-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl hover:border-orange-500/50 hover:bg-[#1a1a1a] transition-all group">
                        {downloading === f.code ? (
                          <Loader2 className="w-5 h-5 text-orange-400 animate-spin" />
                        ) : (
                          <Download className="w-5 h-5 text-gray-500 group-hover:text-orange-400 transition-colors" />
                        )}
                        <span className="text-white text-sm font-semibold">{f.resolution}</span>
                        <span className="text-gray-500 text-[10px] uppercase">{f.container}{f.note ? ` · ${f.note}` : ''}</span>
                        {f.size && <span className="text-gray-600 text-[10px]">{f.size}</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Audio Formats */}
              <div className="bg-[#111] border border-[#222] rounded-2xl p-4 sm:p-6">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-4">
                  <Music className="w-4 h-4 text-orange-400" />
                  Audio (MP3)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  {formatData.audioFormats.map((f) => (
                    <button key={f.code} onClick={() => startDownload(f.code)}
                      disabled={downloading === f.code}
                      className="flex flex-col items-center gap-1 p-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl hover:border-orange-500/50 transition-all group">
                      {downloading === f.code ? (
                        <Loader2 className="w-5 h-5 text-orange-400 animate-spin" />
                      ) : (
                        <Music className="w-5 h-5 text-gray-500 group-hover:text-orange-400 transition-colors" />
                      )}
                      <span className="text-white text-sm font-semibold">{f.resolution}</span>
                      <span className="text-gray-500 text-[10px]">MP3{f.note ? ` · ${f.note}` : ''}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Status Bar */}
        <AnimatePresence>
          {statusMsg && (
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className={`mt-4 p-4 rounded-xl text-sm flex items-center gap-3 ${
                statusMsg.startsWith('✅') ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                : statusMsg.startsWith('❌') ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                : 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
              }`}>
              {statusMsg.startsWith('✅') ? <CheckCircle className="w-5 h-5" />
               : statusMsg.startsWith('❌') ? <AlertCircle className="w-5 h-5" />
               : <Loader2 className="w-5 h-5 animate-spin" />}
              {statusMsg}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Download History */}
        {history.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="mt-8 bg-[#111] border border-[#222] rounded-2xl p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <History className="w-4 h-4 text-gray-500" />
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Recent Downloads</h2>
              <span className="text-xs text-gray-600 ml-auto">{history.length} files</span>
            </div>
            <div className="space-y-1 max-h-60 overflow-y-auto">
              {history.slice(0, 10).map((item) => (
                <div key={item.path}
                  className="flex items-center gap-3 p-2.5 hover:bg-[#1a1a1a] rounded-xl transition-colors group">
                  {item.filename.endsWith('.mp3') ? (
                    <FileAudio className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  ) : (
                    <FileVideo className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm truncate">{item.filename}</p>
                    <p className="text-gray-600 text-xs">{item.sizeMB} MB · {new Date(item.modified).toLocaleDateString()}</p>
                  </div>
                  <span className="text-xs text-gray-600">{item.sizeMB} MB</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Steps */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { step: '1', title: 'Paste URL', desc: 'Copy any YouTube video link and paste it above' },
            { step: '2', title: 'Choose Format', desc: 'Pick MP4 quality or MP3 bitrate' },
            { step: '3', title: 'Download', desc: 'Click download — file saves to ~/Vidora_Output' },
          ].map((s) => (
            <div key={s.step} className="bg-[#111] border border-[#222] rounded-2xl p-5 text-center">
              <div className="w-10 h-10 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-orange-400 font-bold">{s.step}</span>
              </div>
              <h3 className="text-white font-semibold mb-1">{s.title}</h3>
              <p className="text-gray-500 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
