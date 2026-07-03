'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Music, Video, Link, Clock, HardDrive, CheckCircle, AlertCircle, Loader2, History, Trash2 } from 'lucide-react';

interface DownloadItem {
  filename: string;
  path: string;
  size: string;
  sizeMB: string;
  modified: string;
}

export default function DownloadPage() {
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState<'video' | 'mp3'>('video');
  const [quality, setQuality] = useState('720p');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'downloading' | 'ready' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [filepath, setFilepath] = useState('');
  const [history, setHistory] = useState<DownloadItem[]>([]);
  const [checkingFile, setCheckingFile] = useState<string | null>(null);

  // Load download history
  useEffect(() => {
    fetch('/api/download').then(r => r.json()).then(d => {
      if (d.downloads) setHistory(d.downloads);
    }).catch(() => {});
  }, [status]);

  const handleDownload = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setStatus('downloading');
    setMessage('Starting download...');

    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim(), format, quality })
      });
      const data = await res.json();

      if (data.success) {
        setFilepath(data.filepath);
        setMessage(data.message);
        
        // Poll for file completion
        const checkFile = async () => {
          const check = await fetch(`/api/download?file=${encodeURIComponent(data.filepath)}`);
          const result = await check.json();
          
          if (result.exists) {
            setStatus('ready');
            setMessage(`${result.sizeMB} MB — Ready`);
            setLoading(false);
            return true;
          }
          return false;
        };

        // Poll every 3 seconds for 5 minutes
        let attempts = 0;
        const interval = setInterval(async () => {
          attempts++;
          const done = await checkFile();
          if (done || attempts > 100) {
            clearInterval(interval);
            if (attempts > 100 && !done) {
              setStatus('error');
              setMessage('Download timed out');
              setLoading(false);
            }
          }
        }, 3000);
      } else {
        setStatus('error');
        setMessage(data.error || 'Download failed');
        setLoading(false);
      }
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || 'Network error');
      setLoading(false);
    }
  };

  const checkExisting = async (item: DownloadItem) => {
    setCheckingFile(item.path);
    const check = await fetch(`/api/download?file=${encodeURIComponent(item.path)}`);
    const result = await check.json();
    if (result.exists) {
      setFilepath(item.path);
      setStatus('ready');
      setMessage(`${result.sizeMB} MB — Ready in Finder`);
    } else {
      setMessage('File no longer exists');
    }
    setCheckingFile(null);
  };

  const openInFinder = (path: string) => {
    window.open(`file://${path}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm mb-4">
            <Download className="w-4 h-4" />
            YouTube Downloader
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">
            Download YouTube Videos
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto">
            Paste any YouTube link — download as MP4 video or extract MP3 audio. Powered by yt-dlp.
          </p>
        </motion.div>

        {/* Download Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-[#111] border border-[#222] rounded-2xl p-6 mb-8">
          
          {/* URL Input */}
          <div className="mb-5">
            <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <Link className="w-4 h-4" />
              YouTube URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-orange-500 focus:outline-none transition-colors"
              disabled={loading}
            />
          </div>

          {/* Format & Quality */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                Format
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setFormat('video')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    format === 'video'
                      ? 'bg-orange-500/20 border border-orange-500 text-orange-400'
                      : 'bg-[#1a1a1a] border border-[#2a2a2a] text-gray-400 hover:border-gray-600'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  MP4
                </button>
                <button
                  onClick={() => setFormat('mp3')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    format === 'mp3'
                      ? 'bg-orange-500/20 border border-orange-500 text-orange-400'
                      : 'bg-[#1a1a1a] border border-[#2a2a2a] text-gray-400 hover:border-gray-600'
                  }`}
                >
                  <Music className="w-4 h-4" />
                  MP3
                </button>
              </div>
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                <HardDrive className="w-4 h-4" />
                Quality
              </label>
              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-2.5 text-white focus:border-orange-500 focus:outline-none transition-colors"
                disabled={format === 'mp3'}
              >
                <option value="1080p">1080p</option>
                <option value="720p">720p</option>
                <option value="480p">480p</option>
                <option value="360p">360p</option>
              </select>
            </div>
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            disabled={loading || !url.trim()}
            className="w-full py-3 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {status === 'downloading' ? 'Downloading...' : 'Processing...'}
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Download {format === 'mp3' ? 'MP3' : 'Video'}
              </>
            )}
          </button>

          {/* Status Messages */}
          <AnimatePresence>
            {status !== 'idle' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4"
              >
                {status === 'downloading' && (
                  <div className="flex items-center gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                    <div>
                      <p className="text-blue-400 text-sm font-medium">Downloading</p>
                      <p className="text-gray-500 text-xs">{message}</p>
                    </div>
                  </div>
                )}
                {status === 'ready' && (
                  <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="text-green-400 text-sm font-medium">Ready</p>
                      <p className="text-gray-500 text-xs">{message}</p>
                      <p className="text-gray-600 text-xs mt-0.5 font-mono truncate max-w-[400px]">{filepath}</p>
                    </div>
                    <button
                      onClick={() => openInFinder(filepath)}
                      className="ml-auto text-xs text-orange-400 hover:text-orange-300"
                    >
                      Open →
                    </button>
                  </div>
                )}
                {status === 'error' && (
                  <div className="flex items-center gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <p className="text-red-400 text-sm">{message}</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Download History */}
        {history.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="bg-[#111] border border-[#222] rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <History className="w-4 h-4 text-gray-500" />
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Recent Downloads</h2>
              <span className="text-xs text-gray-600 ml-auto">{history.length} files</span>
            </div>
            <div className="space-y-1">
              {history.map((item, i) => (
                <button
                  key={item.path}
                  onClick={() => checkExisting(item)}
                  className="w-full flex items-center gap-3 p-3 hover:bg-[#1a1a1a] rounded-xl transition-colors text-left group"
                >
                  {item.filename.endsWith('.mp3') ? (
                    <Music className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  ) : (
                    <Video className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm truncate group-hover:text-orange-400 transition-colors">
                      {item.filename.replace(/\.(mp4|mp3|webm)$/, '')}
                    </p>
                    <p className="text-gray-600 text-xs flex items-center gap-2">
                      <span>{item.sizeMB} MB</span>
                      <span>·</span>
                      <Clock className="w-3 h-3" />
                      <span>{new Date(item.modified).toLocaleDateString()}</span>
                    </p>
                  </div>
                  {checkingFile === item.path ? (
                    <Loader2 className="w-4 h-4 text-gray-500 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4 text-gray-600 group-hover:text-orange-400 transition-colors" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
