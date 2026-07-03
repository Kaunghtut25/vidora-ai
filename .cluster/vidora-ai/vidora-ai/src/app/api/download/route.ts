// POST /api/download — YouTube Video/MP3 Downloader
// GET /api/download?formats=<url> — List available formats
// GET /api/download?search=<query> — Search YouTube
import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import os from 'os';

const execAsync = promisify(exec);
const DOWNLOAD_DIR = path.join(os.homedir(), 'Vidora_Output');

// ── POST: Download video/audio ──
export async function POST(request: NextRequest) {
  try {
    const { url, formatId } = await request.json();

    if (!url) {
      return NextResponse.json({ success: false, error: 'Missing YouTube URL' }, { status: 400 });
    }

    await execAsync(`mkdir -p "${DOWNLOAD_DIR}"`);

    // Build output filename from video info
    const infoCmd = `cd "${DOWNLOAD_DIR}" && yt-dlp --no-playlist --no-warnings --print "%(title)s___%(id)s" --max-downloads 1 "${url}"`;
    let titleSafe: string;
    try {
      const { stdout } = await execAsync(infoCmd, { timeout: 15000 });
      titleSafe = stdout.trim().replace(/[\/:*?"<>|]/g, '_').substring(0, 80);
    } catch {
      titleSafe = 'vidora_download';
    }

    let cmd: string;
    let ext: string;

    if (formatId && formatId.startsWith('audio_')) {
      // Audio download — specified bitrate
      const bitrate = formatId.replace('audio_', '');
      ext = 'mp3';
      const output = `${titleSafe}_${bitrate}kbps.%(ext)s`;
      cmd = `cd "${DOWNLOAD_DIR}" && yt-dlp --no-playlist --no-warnings -x --audio-format mp3 --audio-quality ${bitrate}K -o "${output}" "${url}"`;
    } else if (formatId && formatId.includes('+')) {
      // Specific video+audio format
      ext = 'mp4';
      const output = `${titleSafe}_${formatId.replace(/\+/g,'_')}.%(ext)s`;
      cmd = `cd "${DOWNLOAD_DIR}" && yt-dlp --no-playlist --no-warnings -f "${formatId}" --merge-output-format mp4 -o "${output}" "${url}"`;
    } else if (formatId) {
      // Specific format code
      ext = 'mp4';
      const output = `${titleSafe}_${formatId}.%(ext)s`;
      cmd = `cd "${DOWNLOAD_DIR}" && yt-dlp --no-playlist --no-warnings -f "${formatId}" -o "${output}" "${url}"`;
    } else {
      // Default: best video+audio
      ext = 'mp4';
      const output = `${titleSafe}.%(ext)s`;
      cmd = `cd "${DOWNLOAD_DIR}" && yt-dlp --no-playlist --no-warnings -f "best[height<=1080]" --merge-output-format mp4 -o "${output}" "${url}"`;
    }

    // Fire download
    exec(cmd, { timeout: 600000 }, (error) => {
      if (error) console.error('Download error:', error.message);
    });

    return NextResponse.json({
      success: true,
      status: 'downloading',
      title: titleSafe,
      message: `Downloading ${titleSafe}...`
    });

  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// ── GET: Search / Format list / File check ──
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get('search');
    const formatsUrl = searchParams.get('formats');
    const filepath = searchParams.get('file');

    // Check file status
    if (filepath) {
      if (fs.existsSync(filepath)) {
        const stat = fs.statSync(filepath);
        return NextResponse.json({ exists: true, size: stat.size, sizeMB: (stat.size / 1048576).toFixed(1) });
      }
      return NextResponse.json({ exists: false });
    }

    // Search YouTube
    if (searchQuery) {
      const cmd = `yt-dlp --no-playlist --no-warnings --flat-playlist --print "%(title)s||%(id)s||%(duration)s||%(channel)s" "ytsearch10:${searchQuery}"`;
      try {
        const { stdout } = await execAsync(cmd, { timeout: 15000 });
        const results = stdout.trim().split('\n').filter(Boolean).map(line => {
          const [title, id, duration, channel] = line.split('||');
          return {
            title,
            id,
            duration: duration ? `${Math.floor(Number(duration)/60)}:${String(Number(duration)%60).padStart(2,'0')}` : '?',
            channel,
            url: `https://www.youtube.com/watch?v=${id}`,
            thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
          };
        });
        return NextResponse.json({ results });
      } catch {
        return NextResponse.json({ results: [], error: 'Search failed — try pasting a URL directly' });
      }
    }

    // Get available formats for a URL
    if (formatsUrl) {
      const cmd = `yt-dlp --no-playlist --no-warnings --print "%(title)s||%(duration)s||%(thumbnail)s" "${formatsUrl}"`;
      let info = { title: 'Unknown', duration: '?', thumbnail: '' };
      try {
        const { stdout } = await execAsync(cmd, { timeout: 10000 });
        const parts = stdout.trim().split('||');
        info = { title: parts[0] || 'Unknown', duration: parts[1] || '?', thumbnail: parts[2] || '' };
      } catch {}

      // Get formats
      const fmtCmd = `yt-dlp --no-playlist --no-warnings -F "${formatsUrl}"`;
      try {
        const { stdout } = await execAsync(fmtCmd, { timeout: 15000 });
        const lines = stdout.split('\n');
        const formats: any[] = [];
        const audioFormats: any[] = [];
        
        for (const line of lines) {
          // Parse format lines like: "22  mp4  1280x720  ..."
          const match = line.match(/^(\d+)\s+(\w+)\s+(\d+x?\d*)\s+/);
          if (match) {
            const [_, code, container, res] = match;
            const isAudio = container === 'm4a' || line.includes('audio only');
            const note = line.includes('video only') ? 'video only' : line.includes('audio only') ? 'audio only' : '';
            
            const entry = {
              code,
              container,
              resolution: res || 'audio',
              note,
              size: line.match(/(\d+\.?\d*\s*\w+B)/)?.[1] || ''
            };

            if (isAudio || line.includes('audio only')) {
              audioFormats.push(entry);
            } else if (container !== 'mhtml') {
              formats.push(entry);
            }
          }
        }

        return NextResponse.json({
          video: info,
          videoFormats: formats.slice(0, 15),
          audioFormats: [
            { code: 'audio_320', container: 'mp3', resolution: '320kbps', note: 'best quality', size: '' },
            { code: 'audio_256', container: 'mp3', resolution: '256kbps', note: 'high quality', size: '' },
            { code: 'audio_192', container: 'mp3', resolution: '192kbps', note: 'good quality', size: '' },
            { code: 'audio_128', container: 'mp3', resolution: '128kbps', note: 'standard', size: '' },
            { code: 'audio_96', container: 'mp3', resolution: '96kbps', note: 'small file', size: '' },
          ]
        });
      } catch {
        return NextResponse.json({ video: info, videoFormats: [], audioFormats: [] });
      }
    }

    // List recent downloads
    if (!fs.existsSync(DOWNLOAD_DIR)) {
      return NextResponse.json({ downloads: [] });
    }

    const files = fs.readdirSync(DOWNLOAD_DIR)
      .filter(f => /\.(mp4|mp3|webm|mkv|avi|flv|wav|m4a)$/i.test(f))
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
      .slice(0, 30);

    return NextResponse.json({ downloads: files });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
