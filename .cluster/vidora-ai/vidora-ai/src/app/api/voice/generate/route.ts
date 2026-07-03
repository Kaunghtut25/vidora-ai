// POST /api/voice/generate — Generate voice audio from text
import { NextRequest, NextResponse } from 'next/server';
import { voiceEngine } from '@/lib/voice-engine';

export async function POST(request: NextRequest) {
  try {
    const { text, voiceId, engine } = await request.json();

    if (!text || !voiceId) {
      return NextResponse.json(
        { success: false, error: 'Missing text or voiceId' },
        { status: 400 }
      );
    }

    // Standard voice generation (Edge TTS)
    const result = await voiceEngine.generate(text, voiceId);
    return NextResponse.json(result);

  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

// GET /api/voice/generate — Health check + list voices
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    engines: ['edge-tts'],
    voices: voiceEngine.getVoices().map(v => ({
      id: v.id,
      name: v.name,
      gender: v.gender,
      language: v.language,
      accent: v.accent,
      edgeTTS: v.edgeTTS || null
    })),
    total: voiceEngine.getVoices().length,
    default: 'edge-tts'
  });
}
