'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader2, Sparkles, Video, Search, PenTool, Scissors, Palette, ArrowRight, Play, CheckCircle2, Clock } from 'lucide-react';

interface Message {
  role: 'user' | 'agent';
  content: string;
}

interface AgentDef {
  id: number;
  name: string;
  role: string;
  backstory: string;
  tools: string[];
  powered_by: string;
  icon: string;
  color: string;
}

const AGENTS: AgentDef[] = [
  {
    id: 1, name: 'HKUDS VideoAgent', role: 'Video Content Intelligence',
    backstory: 'Analyzes raw footage, detects scenes/objects/speech, builds temporal video memory.',
    tools: ['analyze_video_memory', 'extract_audio_for_transcription'],
    powered_by: 'HKUDS/VideoAgent', icon: '🔍', color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 2, name: 'FireRed-OpenStoryline', role: 'Creative Director & Scriptwriter',
    backstory: 'Generates rhythm-aware narratives, emotional scripts, and visual flow plans.',
    tools: ['script_generator', 'storyboard_planner'],
    powered_by: 'FireRedTeam/FireRed-OpenStoryline', icon: '✍️', color: 'from-purple-500 to-pink-500'
  },
  {
    id: 3, name: 'video-use', role: 'Autonomous Video Editor',
    backstory: 'LLM-driven editor: jump cuts, 30ms fades, subtitles. Self-evaluates output.',
    tools: ['cut_video', 'audio_fade', 'burn_subtitles', 'concat_scenes'],
    powered_by: 'browser-use/video-use', icon: '✂️', color: 'from-orange-500 to-red-500'
  },
  {
    id: 4, name: 'LTX Engine', role: 'VFX & Rendering Engine',
    backstory: 'AI transitions, color grading, final H.264 1080p render.',
    tools: ['transition_frames', 'render_final'],
    powered_by: 'Lightricks/LTX-Video', icon: '🎨', color: 'from-green-500 to-emerald-500'
  }
];

const QUICK_ACTIONS = [
  { label: 'Analyze Video', prompt: 'Analyze video memory at path:' },
  { label: 'Write Script', prompt: 'Write a Burmese video script about:' },
  { label: 'Quick Cut', prompt: 'Quick cut video from path: with segments:' },
  { label: 'Full Production', prompt: 'Run full 4-agent production on video:' },
];

export default function AgentPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'agent', content: 'Hey! The 4-Agent Video Production Crew is online 🦞\n\n▸ Agent 1: HKUDS VideoAgent — Analyzes your video\n▸ Agent 2: FireRed — Writes the script & storyboard\n▸ Agent 3: video-use — Cuts, fades, subtitles\n▸ Agent 4: LTX Engine — Transitions, VFX, final render\n\nDrop a video path + prompt to start production!\nOr use /analyze for quick analysis.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [crewStatus, setCrewStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [activeStage, setActiveStage] = useState(-1);
  const [showPipeline, setShowPipeline] = useState(true);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/crew?action=agents').then(r => r.json()).then(d => {
      setCrewStatus(d.total_agents === 4 ? 'online' : 'offline');
    }).catch(() => setCrewStatus('offline'));
  }, []);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const send = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || loading) return;

    const userMsg: Message = { role: 'user', content: msg };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // Detect intent
      let action = 'chat';
      let payload: any = { message: msg };

      if (msg.startsWith('/analyze') || msg.toLowerCase().includes('analyze video')) {
        action = 'analyze';
        const path = msg.replace('/analyze', '').replace('analyze video', '').trim();
        payload = { action: 'analyze', video_path: path };
        setActiveStage(0);
      } else if (msg.toLowerCase().includes('full production') || msg.toLowerCase().includes('produce')) {
        action = 'produce';
        setActiveStage(0);
      }

      let endpoint = '/api/agent';
      let body: any = { message: msg, history: messages.map(m => ({ role: m.role === 'agent' ? 'assistant' : 'user', content: m.content })) };

      if (action === 'analyze' || action === 'produce') {
        endpoint = '/api/crew';
        body = payload;
      }

      const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await res.json();

      if (action === 'analyze') {
        setMessages(prev => [...prev, { role: 'agent', content: `🔍 **HKUDS VideoAgent Analysis**\n\n\`\`\`json\n${JSON.stringify(data.result || data.output || data, null, 2)}\n\`\`\`` }]);
        setActiveStage(-1);
      } else if (action === 'produce') {
        setMessages(prev => [...prev, { role: 'agent', content: `✅ **4-Agent Production Complete**\n\nPipeline: HKUDS → FireRed → video-use → LTX\n\n${JSON.stringify(data.result, null, 2)}` }]);
        setActiveStage(-1);
      } else {
        setMessages(prev => [...prev, { role: 'agent', content: data.reply || JSON.stringify(data) }]);
      }
    } catch (err: any) {
      setMessages(prev => [...prev, { role: 'agent', content: `⚠️ Crew is offline: ${err.message}` }]);
      setActiveStage(-1);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
      {/* Header */}
      <div className="border-b border-[#1a1a1a] px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#F7931E] flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-white font-semibold">Vidora AI — 4-Agent Production Crew</h1>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${crewStatus === 'online' ? 'bg-green-400' : crewStatus === 'offline' ? 'bg-red-400' : 'bg-yellow-400 animate-pulse'}`} />
                  <span className="text-xs text-gray-500">
                    {crewStatus === 'online' ? '4 agents · CrewAI + Ollama' : crewStatus === 'offline' ? 'offline' : 'connecting...'}
                  </span>
                </div>
              </div>
            </div>
            <button onClick={() => setShowPipeline(!showPipeline)}
              className="text-xs text-gray-500 hover:text-gray-300 px-3 py-1.5 rounded-lg bg-[#111] border border-[#222]">
              {showPipeline ? 'Hide Pipeline' : 'Show Pipeline'}
            </button>
          </div>

          {/* Pipeline Visualization */}
          <AnimatePresence>
            {showPipeline && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-gray-500 font-medium">Pipeline:</span>
                  <span className="text-xs text-gray-600">Sequential · 4 stages</span>
                </div>
                <div className="flex items-center gap-0">
                  {AGENTS.map((agent, i) => (
                    <div key={agent.id} className="flex items-center flex-1">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setActiveStage(activeStage === i ? -1 : i)}
                        className={`flex-1 p-3 rounded-xl border cursor-pointer transition-all ${
                          activeStage === i
                            ? 'border-[#FF6B35] bg-[#1a1005]'
                            : activeStage > i
                            ? 'border-green-500/30 bg-[#0a1a0a]'
                            : 'border-[#1a1a1a] bg-[#0d0d0d] hover:border-[#333]'
                        }`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{agent.icon}</span>
                          <span className={`text-xs font-semibold ${activeStage === i ? 'text-[#FF6B35]' : 'text-gray-400'}`}>
                            {agent.name}
                          </span>
                          {activeStage > i && <CheckCircle2 className="w-3 h-3 text-green-500 ml-auto" />}
                          {activeStage === i && loading && <Loader2 className="w-3 h-3 text-[#FF6B35] animate-spin ml-auto" />}
                        </div>
                        <div className="text-[10px] text-gray-600 leading-tight">{agent.role}</div>
                        {activeStage === i && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                            className="mt-2 pt-2 border-t border-[#1a1a1a]">
                            <div className="text-[10px] text-gray-500 mb-1">Tools: {agent.tools.join(', ')}</div>
                            <div className="text-[10px] text-gray-600">Built on {agent.powered_by}</div>
                          </motion.div>
                        )}
                      </motion.div>
                      {i < 3 && (
                        <div className="flex-shrink-0 mx-1">
                          <ArrowRight className={`w-4 h-4 ${activeStage > i ? 'text-green-500' : activeStage === i ? 'text-[#FF6B35]' : 'text-gray-700'}`} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Chat */}
      <div ref={chatRef} className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-3xl mx-auto space-y-4">
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                {msg.role === 'agent' && (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF6B35] to-[#F7931E] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-first' : ''}`}>
                  <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-[#FF6B35] text-white rounded-br-md'
                      : 'bg-[#141414] border border-[#222] text-gray-200 rounded-bl-md'
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: msg.content
                      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#FFB627]">$1</strong>')
                      .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="mt-2 p-3 bg-[#0a0a0a] rounded-lg border border-[#222] text-xs text-gray-400 overflow-x-auto"><code>$2</code></pre>')
                      .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 bg-[#1a1a1a] rounded text-xs text-[#FFB627]">$1</code>')
                  }} />
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-4 h-4 text-gray-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF6B35] to-[#F7931E] flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-[#141414] border border-[#222] rounded-bl-md">
                <Loader2 className="w-4 h-4 text-gray-500 animate-spin" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      {messages.length <= 1 && (
        <div className="max-w-3xl mx-auto px-6 pb-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {QUICK_ACTIONS.map((action) => (
              <button key={action.label} onClick={() => send(action.prompt)}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#111] border border-[#222] rounded-xl text-sm text-gray-300 hover:border-[#444] hover:text-white transition-all whitespace-nowrap flex-shrink-0">
                {action.label === 'Analyze Video' && <Search className="w-4 h-4 text-blue-400" />}
                {action.label === 'Write Script' && <PenTool className="w-4 h-4 text-purple-400" />}
                {action.label === 'Quick Cut' && <Scissors className="w-4 h-4 text-orange-400" />}
                {action.label === 'Full Production' && <Play className="w-4 h-4 text-green-400" />}
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-[#1a1a1a] px-6 py-4">
        <div className="max-w-3xl mx-auto flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && send()}
            placeholder="Command the 4-agent crew... (/analyze, write script, full production)"
            className="flex-1 bg-[#111] border border-[#222] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-[#FF6B35] focus:outline-none text-sm"
            disabled={loading}
          />
          <button onClick={() => send()}
            disabled={!input.trim() || loading}
            className="px-4 py-3 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white rounded-xl hover:opacity-90 disabled:opacity-30 transition-opacity">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
