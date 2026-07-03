'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader2, Sparkles, Video, Mic, Download, FileText, Globe } from 'lucide-react';

interface Message {
  role: 'user' | 'agent';
  content: string;
  tool?: { name: string; params: any };
}

const QUICK_ACTIONS = [
  { icon: FileText, label: 'Write Script', prompt: 'Write a 3-minute video script about Myanmar tea culture in Burmese' },
  { icon: Video, label: 'Create Recap', prompt: 'Create a recap video in Burmese from YouTube link:' },
  { icon: Download, label: 'Download MP3', prompt: 'Download audio from YouTube link:' },
  { icon: Mic, label: 'Generate Voice', prompt: 'Generate English voiceover for my video about technology' },
  { icon: Globe, label: 'Research Topic', prompt: 'Research and summarize: AI video creation trends 2026' },
];

export default function AgentPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'agent', content: 'Hey! I\'m the Vidora AI Agent 🦞\n\nI can help you:\n• Write video scripts (English & Burmese)\n• Create video recaps from YouTube links\n• Download videos & audio\n• Generate AI voiceovers\n• Research topics\n\nWhat would you like to create today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [ollamaStatus, setOllamaStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/agent').then(r => r.json()).then(d => {
      setOllamaStatus(d.status === 'online' ? 'online' : 'offline');
    }).catch(() => setOllamaStatus('offline'));
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
      const history = [...messages, userMsg].map(m => ({
        role: m.role === 'agent' ? 'assistant' : 'user',
        content: m.content
      }));

      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, history })
      });

      const data = await res.json();
      const agentMsg: Message = {
        role: 'agent',
        content: data.reply || 'Sorry, I encountered an error.',
        tool: data.tool
      };
      setMessages(prev => [...prev, agentMsg]);
    } catch {
      setMessages(prev => [...prev, { role: 'agent', content: '⚠️ Agent is offline. Try again in a moment, or use the tools from the sidebar.' }]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
      {/* Header */}
      <div className="border-b border-[#1a1a1a] px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#F7931E] flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-white font-semibold">Vidora AI Agent</h1>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${ollamaStatus === 'online' ? 'bg-green-400' : ollamaStatus === 'offline' ? 'bg-red-400' : 'bg-yellow-400 animate-pulse'}`} />
                <span className="text-xs text-gray-500">
                  {ollamaStatus === 'online' ? 'qwen2.5-coder:7b · ready' : ollamaStatus === 'offline' ? 'offline' : 'connecting...'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Sparkles className="w-3.5 h-3.5" />
            Free · Local
          </div>
        </div>
      </div>

      {/* Chat Area */}
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
                  }`}>
                    {msg.content}
                  </div>
                  {msg.tool && (
                    <div className="mt-1.5 px-3 py-1.5 bg-[#FF6B35]/10 border border-[#FF6B35]/20 rounded-lg text-xs text-orange-400 flex items-center gap-2">
                      <Sparkles className="w-3 h-3" />
                      Running: {msg.tool.name}
                    </div>
                  )}
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
                <action.icon className="w-4 h-4 text-orange-400" />
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
            placeholder="Ask me to create, download, or research..."
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
