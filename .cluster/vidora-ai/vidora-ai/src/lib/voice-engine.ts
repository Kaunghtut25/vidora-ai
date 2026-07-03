/**
 * Vidora Voice Engine — Real voice generation
 * Supports: Edge TTS (20 English voices)
 */
import { voices } from '@/data/voices';
import type { Voice } from '@/types';

// ── Types ──
export interface VoiceGenResult {
  success: boolean;
  audioPath?: string;
  audioUrl?: string;
  error?: string;
  engine: 'edge-tts';
  voice: string;
}

export type VoiceEngineMode = 'edge-tts';

// ── Voice Engine ──
export class VoiceEngine {
  private mode: VoiceEngineMode;

  constructor(mode: VoiceEngineMode = 'edge-tts') {
    this.mode = mode;
  }

  /** Get a voice object by ID */
  getVoice(voiceId: string): Voice | undefined {
    return voices.find(v => v.id === voiceId);
  }

  /** Generate voice audio from text */
  async generate(text: string, voiceId: string): Promise<VoiceGenResult> {
    const voice = this.getVoice(voiceId);
    if (!voice) {
      return { success: false, error: `Voice not found: ${voiceId}`, engine: 'edge-tts', voice: voiceId };
    }

    // Edge TTS for all voices
    if (voice.edgeTTS) {
      return this.generateEdgeTTS(text, voice);
    }

    return { success: false, error: `No Edge TTS voice configured for: ${voice.name}`, engine: 'edge-tts', voice: voice.name };
  }

  /** Edge TTS generation — 20+ realistic voices */
  private async generateEdgeTTS(text: string, voice: Voice): Promise<VoiceGenResult> {
    try {
      const { exec } = await import('child_process');
      const { promisify } = await import('util');
      const execAsync = promisify(exec);
      
      const tempDir = '/tmp/vidora-voice';
      await execAsync(`mkdir -p ${tempDir}`);
      
      const filename = `${voice.id}_${Date.now()}.mp3`;
      const filepath = `${tempDir}/${filename}`;
      
      // Use edge-tts CLI
      const cmd = `python3 -m edge_tts --voice "${voice.edgeTTS}" --text "${text.replace(/"/g, '\\"')}" --write-media "${filepath}"`;
      await execAsync(cmd, { timeout: 30000 });
      
      return {
        success: true,
        audioPath: filepath,
        audioUrl: `/api/voice/play?file=${filename}`,
        engine: 'edge-tts',
        voice: voice.name
      };
    } catch (err: any) {
      console.error('Edge TTS error:', err.message);
      return {
        success: false,
        error: `Voice generation failed: ${err.message}`,
        engine: 'edge-tts',
        voice: voice.name
      };
    }
  }

  /** Get available voices for Vidora UI */
  getVoices(): Voice[] {
    return voices;
  }

  /** Get English voices only */
  getEnglishVoices(): Voice[] {
    return voices.filter(v => v.language === 'English');
  }
}

// Singleton
export const voiceEngine = new VoiceEngine('edge-tts');
