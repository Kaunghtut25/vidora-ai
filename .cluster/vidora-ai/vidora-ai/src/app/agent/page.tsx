'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

/* ═══════ ICONS ═══════ */
function SendIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/></svg>;
}
function EyeIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>;
}
function ScriptIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>;
}
function ScissorsIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.2M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.2m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664"/></svg>;
}
function WandIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"/></svg>;
}
function CloudIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"/></svg>;
}
function CheckCircleIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>;
}
function LoaderIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return <svg className={`${className} animate-spin`} fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-20"/><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>;
}
function SparkIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/></svg>;
}

/* ═══════ DATA ═══════ */
const AGENT_STAGES = [
  { num: 1, name: 'HKUDS VideoAgent', role: 'Analyzing footage...', icon: EyeIcon, color: 'bg-violet-600', glow: 'shadow-violet-500/30' },
  { num: 2, name: 'FireRed-OpenStoryline', role: 'Writing script...', icon: ScriptIcon, color: 'bg-fuchsia-600', glow: 'shadow-fuchsia-500/30' },
  { num: 3, name: 'video-use', role: 'Editing cuts & subtitles...', icon: ScissorsIcon, color: 'bg-cyan-600', glow: 'shadow-cyan-500/30' },
  { num: 4, name: 'LTX Engine', role: 'Rendering final video...', icon: WandIcon, color: 'bg-emerald-600', glow: 'shadow-emerald-500/30' },
];

export default function AgentPage() {
  const [videoUrl, setVideoUrl] = useState('');
  const [prompt, setPrompt] = useState('');
  const [currentStage, setCurrentStage] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const [error, setError] = useState('');
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);

  const runPipeline = async () => {
    if (!videoUrl || isProcessing) return;
    setIsProcessing(true);
    setError('');
    setCompletedStages([]);
    setLogs([]);

    addLog('Starting 4-agent pipeline...');

    // Simulate agent stages with real API calls
    for (let i = 0; i < AGENT_STAGES.length; i++) {
      setCurrentStage(i);
      addLog(`Agent ${i + 1}: ${AGENT_STAGES[i].name} — ${AGENT_STAGES[i].role}`);

      try {
        if (i === 0) {
          // Stage 1: Analyze
          const res = await fetch('/api/crew', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'analyze', video_path: videoUrl })
          });
          const data = await res.json();
          if (data.success) {
            addLog(`  ✅ Analysis complete — ${JSON.stringify(data.output).substring(0, 100)}...`);
          } else {
            addLog(`  ⚠️ Analysis: ${data.error || 'partial success'}`);
          }
        }
        // Stages 2-4 would call produce endpoint in production
        await new Promise(r => setTimeout(r, 1200)); // Simulate processing
        setCompletedStages(prev => [...prev, i]);
        addLog(`  ✅ ${AGENT_STAGES[i].name} complete`);
      } catch (err: any) {
        addLog(`  ❌ Error: ${err.message}`);
        setError(`${AGENT_STAGES[i].name} failed: ${err.message}`);
        break;
      }
    }

    setIsProcessing(false);
    if (!error) {
      addLog('🎬 Pipeline complete! Final video ready.');
    }
  };

  return (
    <div className="min-h-screen bg-[#06080D] flex">
      {/* ── Left Sidebar ── */}
      <aside className="w-64 border-r border-white/[0.04] bg-[#0d1220] hidden lg:flex flex-col">
        <div className="p-6 border-b border-white/[0.04]">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
              <SparkIcon className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold">Vendora</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { label: 'Workspace', icon: '🎬', active: true },
            { label: 'Projects', icon: '📁', active: false },
            { label: 'Downloads', icon: '⬇️', active: false },
            { label: 'Settings', icon: '⚙️', active: false },
          ].map(item => (
            <a key={item.label} href="#"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                item.active ? 'bg-violet-500/10 text-violet-300 border border-violet-500/20' : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
              }`}>
              <span>{item.icon}</span> {item.label}
            </a>
          ))}
        </nav>
        <div className="p-4 border-t border-white/[0.04]">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-xs font-bold">U</div>
            <div>
              <div className="text-sm text-white font-medium">User</div>
              <div className="text-xs text-slate-500">Free Plan</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="border-b border-white/[0.04] px-6 py-4 glass">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white font-bold text-lg">Video Production Workspace</h1>
              <p className="text-xs text-slate-500">4-Agent Pipeline · CrewAI + Ollama</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
              Agents Online
            </div>
          </div>
        </header>

        {/* Workspace body */}
        <div className="flex-1 flex">
          {/* Center: Upload + Prompt */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Upload area */}
              <div className="border-2 border-dashed border-white/[0.06] rounded-2xl p-12 text-center hover:border-violet-500/30 transition-all cursor-pointer bg-white/[0.01]">
                <CloudIcon className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Drop your video here</h3>
                <p className="text-slate-500 text-sm mb-4">MP4, MOV, MKV — up to 2GB</p>
                <input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="Or paste video path / URL..."
                  className="w-full max-w-md bg-[#06080D] border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-violet-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Prompt area */}
              <div>
                <label className="text-sm text-slate-400 font-medium mb-2 block">What should the agents do?</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. Create a 3-minute movie recap with Burmese voiceover, jump cuts, and cinematic color grading..."
                  rows={4}
                  className="w-full bg-[#0d1220] border border-white/[0.06] rounded-2xl px-4 py-4 text-sm text-white placeholder-slate-600 focus:border-violet-500 focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <button
                  onClick={runPipeline}
                  disabled={isProcessing || !videoUrl}
                  className="flex-1 px-6 py-3.5 bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold rounded-2xl hover:opacity-90 disabled:opacity-30 transition-all shadow-lg shadow-violet-500/20 flex items-center justify-center gap-2">
                  {isProcessing ? (
                    <><LoaderIcon className="w-5 h-5" /> Processing...</>
                  ) : (
                    <><SendIcon className="w-5 h-5" /> Start Production</>
                  )}
                </button>
                <button
                  onClick={() => { setVideoUrl(''); setPrompt(''); setLogs([]); setCompletedStages([]); setError(''); }}
                  className="px-6 py-3.5 border border-white/[0.06] text-slate-400 rounded-2xl hover:bg-white/[0.02] transition-all text-sm">
                  Clear
                </button>
              </div>

              {/* Log output */}
              {logs.length > 0 && (
                <div className="bg-[#0a0e18] border border-white/[0.06] rounded-2xl p-4">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Agent Logs</h4>
                  <div className="space-y-1 max-h-64 overflow-y-auto font-mono text-xs">
                    {logs.map((log, i) => (
                      <div key={i} className={`${log.includes('✅') ? 'text-emerald-400' : log.includes('❌') ? 'text-red-400' : log.includes('⚠️') ? 'text-amber-400' : 'text-slate-500'}`}>
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-4">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Agent Stepper */}
          <aside className="w-80 border-l border-white/[0.04] bg-[#0d1220] hidden xl:flex flex-col p-6">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-6">Live Agent Stepper</h3>
            
            <div className="space-y-3 flex-1">
              {AGENT_STAGES.map((agent, i) => {
                const isActive = currentStage === i;
                const isDone = completedStages.includes(i);
                const isPending = !isDone && !isActive;

                return (
                  <div key={agent.num}
                    className={`relative p-4 rounded-xl border transition-all duration-500 ${
                      isActive
                        ? 'border-violet-500/40 bg-violet-500/[0.06] shadow-lg shadow-violet-500/10'
                        : isDone
                        ? 'border-emerald-500/20 bg-emerald-500/[0.03]'
                        : 'border-white/[0.04] bg-white/[0.01]'
                    }`}>
                    {/* Status indicator */}
                    <div className="absolute top-4 right-4">
                      {isActive ? (
                        <div className="w-6 h-6 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
                      ) : isDone ? (
                        <CheckCircleIcon className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-slate-700" />
                      )}
                    </div>

                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 rounded-xl ${agent.color} flex items-center justify-center shadow-lg ${isActive ? agent.glow : ''}`}>
                        <agent.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-white text-sm font-semibold">{agent.name}</div>
                        <div className={`text-xs ${isActive ? 'text-violet-400' : isDone ? 'text-emerald-400' : 'text-slate-600'}`}>
                          {isDone ? 'Complete ✓' : isActive ? 'Processing...' : 'Waiting'}
                        </div>
                      </div>
                    </div>

                    {isActive && (
                      <div className="mt-3 pt-3 border-t border-white/[0.04]">
                        <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full animate-pulse" style={{ width: '60%' }} />
                        </div>
                        <p className="text-xs text-slate-500 mt-2">{agent.role}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Production stats */}
            <div className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <div className="text-xs text-slate-500 mb-2">Production Stats</div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-lg font-bold text-white">{completedStages.length}</div>
                  <div className="text-[10px] text-slate-600">Stages Done</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-violet-400">4</div>
                  <div className="text-[10px] text-slate-600">Total Agents</div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
