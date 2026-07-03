// POST /api/agent — Vidora AI Agent (Ollama-powered)
// The agent can: generate scripts, analyze videos, trigger downloads, create recaps
import { NextRequest, NextResponse } from 'next/server';

const OLLAMA = 'http://localhost:11434';
const MODEL = 'gemma3:4b'; // Fastest, most efficient — 3.3GB, instant response

interface AgentTool {
  name: string;
  description: string;
  parameters: Record<string, any>;
}

const TOOLS: AgentTool[] = [
  {
    name: 'generate_script',
    description: 'Generate a video script on any topic in English or Burmese',
    parameters: {
      topic: 'string - the video topic',
      language: "'English' | 'Burmese'",
      style: "'Educational' | 'Storytelling' | 'Vlog' | 'Sales' | 'Corporate'",
      duration_minutes: 'number - target video length'
    }
  },
  {
    name: 'create_recap',
    description: 'Create a video recap from a YouTube link — extracts info, generates Burmese voiceover, edits video',
    parameters: {
      youtube_url: 'string - YouTube video URL',
      language: "'English' | 'Burmese'",
      style: "'summary' | 'review' | 'educational'"
    }
  },
  {
    name: 'download_video',
    description: 'Download a YouTube video as MP4 or MP3 in the background',
    parameters: {
      youtube_url: 'string - YouTube video URL',
      format: "'mp4' | 'mp3'",
      quality: "'720p' | '1080p' | '480p' | '320kbps' | '128kbps'"
    }
  },
  {
    name: 'search_web',
    description: 'Search the web for information about a topic',
    parameters: {
      query: 'string - search query'
    }
  },
  {
    name: 'generate_voice',
    description: 'Generate AI voiceover audio from text',
    parameters: {
      text: 'string - text to convert to speech',
      voice: 'string - voice ID (andrew, emma, brian, jenny, guy, etc.)'
    }
  }
];

const SYSTEM_PROMPT = `You are the Vidora AI Agent — an AI assistant built into the Vidora AI video creation platform.

Your purpose: Help users create videos, generate scripts, download content, and manage their video projects.

You can:
- Generate video scripts in English and Burmese
- Create video recaps from YouTube links
- Download YouTube videos and audio
- Generate AI voiceovers
- Answer questions about video creation

Tools available: ${JSON.stringify(TOOLS.map(t => t.name))}

When the user asks for something you can do, respond helpfully and use the appropriate tool.
If they ask for something you can't do, explain what you CAN do instead.

Be concise, friendly, and helpful. Use Burmese when the user writes in Burmese.
Never mention API keys, credits, or that you're running on Ollama — just help them create.`;

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message required' }, { status: 400 });
    }

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...(history || []).slice(-10),
      { role: 'user', content: message }
    ];

    const response = await fetch(`${OLLAMA}/v1/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        messages,
        max_tokens: 1024,
        temperature: 0.7,
        stream: false
      }),
      signal: AbortSignal.timeout(60000)
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'Sorry, I could not process that.';

    // Check if the AI wants to call a tool
    const toolMatch = reply.match(/```tool\n(\w+)\n(.*?)```/s);
    let tool = null;

    if (toolMatch) {
      try {
        tool = {
          name: toolMatch[1],
          params: JSON.parse(toolMatch[2])
        };
      } catch {}
    }

    return NextResponse.json({
      reply,
      tool,
      model: MODEL
    });

  } catch (err: any) {
    // Fallback: return a helpful message when Ollama is unavailable
    return NextResponse.json({
      reply: "I'm currently unavailable. Please try again in a moment, or use the direct tools: Script Generator, Voice Studio, and YouTube Downloader from the sidebar.",
      tool: null,
      model: MODEL
    });
  }
}

// GET — health check
export async function GET() {
  try {
    const r = await fetch(`${OLLAMA}/api/tags`, { signal: AbortSignal.timeout(3000) });
    const data = await r.json();
    return NextResponse.json({
      status: 'online',
      models: data.models?.length || 0,
      model: MODEL,
      tools: TOOLS.map(t => t.name)
    });
  } catch {
    return NextResponse.json({ status: 'offline', models: 0 });
  }
}
