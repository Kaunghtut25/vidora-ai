// POST /api/download — Download YouTube video or extract audio
import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import os from 'os';

const execAsync = promisify(exec);

const DOWNLOAD_DIR = path.join(os.homedir(), 'Vidora_Output');

export async function POST(request: NextRequest) {
  try {
    const { url, format, quality } = await request.json();

    if (!url) {
      return NextResponse.json({ success: false, error: 'Missing YouTube URL' }, { status: 400 });
    }

    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
      return NextResponse.json({ success: false, error: 'Only YouTube URLs are supported' }, { status: 400 });
    }

    // Ensure download directory exists
    await execAsync(`mkdir -p "${DOWNLOAD_DIR}"`);

    const formatMode = format || 'video';
    const qualityLevel = quality || '720p';

    // Build yt-dlp command
    let cmd = `cd "${DOWNLOAD_DIR}" && yt-dlp --no-playlist --no-warnings --print filename -o "%(title)s_%(id)s.%(ext)s"`;
    let outputTemplate: string;

    if (formatMode === 'mp3' || formatMode === 'audio') {
      // Extract audio as MP3
      outputTemplate = '%(title)s_%(id)s_audio.mp3';
      cmd = `cd "${DOWNLOAD_DIR}" && yt-dlp --no-playlist --no-warnings -x --audio-format mp3 --audio-quality 0 -o "${outputTemplate}"`;
    } else {
      // Download video
      let formatStr = 'best[height<=720]/best';
      if (qualityLevel === '1080p') formatStr = 'best[height<=1080]/best';
      else if (qualityLevel === '480p') formatStr = 'best[height<=480]/best';
      else if (qualityLevel === '360p') formatStr = 'best[height<=360]/worst';
      
      outputTemplate = '%(title)s_%(id)s.%(ext)s';
      cmd = `cd "${DOWNLOAD_DIR}" && yt-dlp --no-playlist --no-warnings -f "${formatStr}" --merge-output-format mp4 -o "${outputTemplate}"`;
    }

    // First get the info to find the filename
    const infoCmd = `cd "${DOWNLOAD_DIR}" && yt-dlp --no-playlist --no-warnings --print filename -o "${outputTemplate}" "${url}"`;
    
    let filename: string;
    try {
      const { stdout } = await execAsync(infoCmd, { timeout: 15000 });
      filename = stdout.trim();
    } catch {
      // Fallback: use video ID
      const videoId = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)?.[1] || 'video';
      const ext = formatMode === 'mp3' || formatMode === 'audio' ? 'mp3' : 'mp4';
      filename = `vidora_download_${videoId}.${ext}`;
    }

    const filepath = path.join(DOWNLOAD_DIR, filename);

    // Check if already downloaded
    if (fs.existsSync(filepath)) {
      return NextResponse.json({
        success: true,
        filepath,
        filename,
        status: 'ready',
        message: 'Already downloaded'
      });
    }

    // Start download (async, return job status)
    const fullCmd = `${cmd} "${url}"`;
    
    // Fire and forget — return "downloading" status
    exec(fullCmd, { timeout: 300000 }, (error, stdout, stderr) => {
      if (error) {
        console.error('Download error:', error.message);
      }
    });

    return NextResponse.json({
      success: true,
      filepath,
      filename,
      status: 'downloading',
      message: 'Download started'
    });

  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

// GET /api/download — Check file status or list downloads
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filepath = searchParams.get('file');

    if (filepath) {
      // Check specific file
      if (fs.existsSync(filepath)) {
        const stat = fs.statSync(filepath);
        return NextResponse.json({
          exists: true,
          size: stat.size,
          sizeMB: (stat.size / 1048576).toFixed(1),
          modified: stat.mtime.toISOString()
        });
      }
      return NextResponse.json({ exists: false });
    }

    // List recent downloads
    if (!fs.existsSync(DOWNLOAD_DIR)) {
      return NextResponse.json({ downloads: [] });
    }

    const files = fs.readdirSync(DOWNLOAD_DIR)
      .filter(f => f.endsWith('.mp4') || f.endsWith('.mp3') || f.endsWith('.webm'))
      .map(f => {
        const fp = path.join(DOWNLOAD_DIR, f);
        const stat = fs.statSync(fp);
        return {
          filename: f,
          path: fp,
          size: stat.size,
          sizeMB: (stat.size / 1048576).toFixed(1),
          modified: stat.mtime.toISOString()
        };
      })
      .sort((a, b) => new Date(b.modified).getTime() - new Date(a.modified).getTime())
      .slice(0, 20);

    return NextResponse.json({ downloads: files });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
