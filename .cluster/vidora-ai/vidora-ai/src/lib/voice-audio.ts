/**
 * Voice Audio Preview Utility
 * Generates synthetic audio previews using the Web Audio API.
 * Each voice has a unique frequency, wave type, and vibrato for natural sound.
 */

export interface VoiceProfile {
  frequency: number;
  waveType: OscillatorType;
  vibratoDepth: number; // Hz deviation
  vibratoRate: number; // Hz oscillation speed
}

// Voice-specific audio profiles
export const VOICE_PROFILES: Record<string, VoiceProfile> = {
  // Female voices (triangle wave, higher pitch)
  sophia:   { frequency: 220, waveType: 'triangle', vibratoDepth: 4, vibratoRate: 5.5 },
  elena:    { frequency: 240, waveType: 'triangle', vibratoDepth: 3.5, vibratoRate: 6.0 },
  priya:    { frequency: 260, waveType: 'triangle', vibratoDepth: 5, vibratoRate: 5.0 },
  aisha:    { frequency: 230, waveType: 'triangle', vibratoDepth: 4.5, vibratoRate: 6.5 },
  'aye-myat': { frequency: 225, waveType: 'triangle', vibratoDepth: 4, vibratoRate: 5.8 },
  thida:    { frequency: 235, waveType: 'triangle', vibratoDepth: 3.8, vibratoRate: 6.2 },

  // Male voices (sawtooth wave, lower pitch)
  marcus:   { frequency: 130, waveType: 'sawtooth', vibratoDepth: 3, vibratoRate: 4.5 },
  david:    { frequency: 140, waveType: 'sawtooth', vibratoDepth: 3.5, vibratoRate: 5.0 },
  james:    { frequency: 135, waveType: 'sawtooth', vibratoDepth: 4, vibratoRate: 4.8 },
  thomas:   { frequency: 145, waveType: 'sawtooth', vibratoDepth: 3, vibratoRate: 5.2 },
  'ko-ko':  { frequency: 132, waveType: 'sawtooth', vibratoDepth: 3.5, vibratoRate: 4.6 },
  'min-thu': { frequency: 138, waveType: 'sawtooth', vibratoDepth: 4, vibratoRate: 5.0 },
};

// Active audio nodes for cleanup
let activeNodes: { osc: OscillatorNode; gain: GainNode; lfo: OscillatorNode; lfoGain: GainNode } | null = null;
let activeContext: AudioContext | null = null;

/**
 * Stop any currently playing voice preview.
 */
export function stopVoicePreview(): void {
  if (activeNodes) {
    const { osc, gain, lfo, lfoGain } = activeNodes;
    // Quick fade out to avoid clicks
    const ctx = activeContext;
    if (ctx) {
      const now = ctx.currentTime;
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(gain.gain.value, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.05);
    }
    try {
      osc.stop(activeContext ? activeContext.currentTime + 0.06 : 0);
      lfo.stop(activeContext ? activeContext.currentTime + 0.06 : 0);
    } catch {
      // Already stopped
    }
    lfoGain.disconnect();
    lfo.disconnect();
    osc.disconnect();
    gain.disconnect();
    activeNodes = null;
  }
  if (activeContext) {
    activeContext.close().catch(() => {});
    activeContext = null;
  }
}

/**
 * Play a 3-second synthetic voice preview.
 * @param voiceId - The voice ID (must exist in VOICE_PROFILES)
 * @returns A promise that resolves when playback finishes, or rejects on error.
 */
export function playVoicePreview(voiceId: string): Promise<void> {
  // Stop any existing playback
  stopVoicePreview();

  const profile = VOICE_PROFILES[voiceId];
  if (!profile) {
    console.warn(`No audio profile for voice: ${voiceId}`);
    return Promise.resolve();
  }

  // Create AudioContext (browsers require user gesture — this is called from onClick)
  const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) {
    console.warn('Web Audio API not supported');
    return Promise.resolve();
  }

  activeContext = new AudioContextClass();

  const ctx = activeContext;
  const now = ctx.currentTime;
  const duration = 3.0; // 3 seconds

  // Main oscillator — the voice tone
  const osc = ctx.createOscillator();
  osc.type = profile.waveType;
  osc.frequency.setValueAtTime(profile.frequency, now);

  // Vibrato: LFO modulates the main oscillator's frequency
  const lfo = ctx.createOscillator();
  lfo.type = 'sine';
  lfo.frequency.setValueAtTime(profile.vibratoRate, now);

  const lfoGain = ctx.createGain();
  lfoGain.gain.setValueAtTime(profile.vibratoDepth, now);

  // Connect LFO → main oscillator frequency
  lfo.connect(lfoGain);
  lfoGain.connect(osc.frequency);

  // Gain envelope for fade in/out
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, now);

  // Fade in (0.15s)
  gain.gain.linearRampToValueAtTime(0.15, now + 0.15);

  // Sustain
  gain.gain.setValueAtTime(0.15, now + duration - 0.3);

  // Fade out (0.3s)
  gain.gain.linearRampToValueAtTime(0, now + duration);

  // Add a lowpass filter for warmer sound
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(profile.frequency * 4, now);
  filter.Q.setValueAtTime(1, now);

  // Connect: osc → filter → gain → destination
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  // Start oscillators
  osc.start(now);
  lfo.start(now);

  // Stop after duration
  osc.stop(now + duration);
  lfo.stop(now + duration);

  activeNodes = { osc, gain, lfo, lfoGain };

  return new Promise<void>((resolve) => {
    osc.onended = () => {
      // Cleanup
      try {
        filter.disconnect();
      } catch {
        // Already disconnected
      }
      activeNodes = null;
      if (activeContext) {
        activeContext.close().catch(() => {});
        activeContext = null;
      }
      resolve();
    };
  });
}

/**
 * Check if a voice preview is currently playing.
 */
export function isVoicePreviewPlaying(): boolean {
  return activeNodes !== null;
}
