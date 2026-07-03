// POST /api/recap — YouTube Link → Movie Recap + Burmese Voiceover
import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const VENV_PYTHON = '/Users/kaung/.openclaw-autoclaw/workspace/.venv-agents-py312/bin/python3';

export async function POST(request: NextRequest) {
  try {
    const { url, language, custom_prompt } = await request.json();

    if (!url || !url.includes('youtube.com') && !url.includes('youtu.be')) {
      return NextResponse.json({ error: 'Please provide a valid YouTube URL' }, { status: 400 });
    }

    const lang = language || 'my';
    const prompt = custom_prompt || '';

    const recapScript = `${process.cwd()}/src/lib/recap_from_link.py`;
    const cmd = `PYTHONPATH=${process.cwd()}/src/lib ${VENV_PYTHON} ${recapScript} "${url}" --lang ${lang}${prompt ? ` --prompt "${prompt.replace(/"/g, '\\"')}"` : ''}`;

    console.log('🎬 Starting recap pipeline...');
    const { stdout, stderr } = await execAsync(cmd, {
      timeout: 300000,
      maxBuffer: 10 * 1024 * 1024,
      cwd: process.cwd(),
      env: { ...process.env, OPENAI_API_KEY: 'ollama', OPENAI_API_BASE: 'http://localhost:11434/v1' }
    });

    return NextResponse.json({ success: true, output: stdout, stderr: stderr || '' });

  } catch (err: any) {
    console.error('Recap failed:', err.message);
    return NextResponse.json({
      success: false,
      error: err.message,
      stderr: err.stderr || ''
    }, { status: 500 });
  }
}

// GET /api/recap — check status
export async function GET() {
  return NextResponse.json({
    status: 'online',
    pipeline: 'YouTube → yt-dlp frames → Ollama script → Arena AI Burmese → FFmpeg Ken Burns',
    features: ['YouTube link input', 'Burmese AI narration', 'Keyframe extraction', 'Ken Burns effect', 'Burmese subtitles', 'Arena AI Agent Mod voiceover']
  });
}
