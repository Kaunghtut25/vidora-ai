// GET /api/voice/play — Serve generated voice audio files
import { NextRequest, NextResponse } from 'next/server';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

export async function GET(request: NextRequest) {
  const file = request.nextUrl.searchParams.get('file');
  
  if (!file) {
    return NextResponse.json({ error: 'Missing file parameter' }, { status: 400 });
  }

  // Security: only serve from /tmp/vidora-voice
  const safeFile = file.replace(/[^a-zA-Z0-9_.-]/g, '');
  const filepath = join('/tmp/vidora-voice', safeFile);

  if (!existsSync(filepath)) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  try {
    const audio = readFileSync(filepath);
    return new NextResponse(audio, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': `inline; filename="${safeFile}"`,
        'Cache-Control': 'public, max-age=3600',
        'Content-Length': String(audio.length)
      }
    });
  } catch {
    return NextResponse.json({ error: 'Failed to read audio' }, { status: 500 });
  }
}
