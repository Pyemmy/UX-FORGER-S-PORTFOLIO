// Lightweight Web Audio synthesizer for tactile UI feedback.
// No audio files: every sound is generated in real time.
// Sounds only ever play in response to a click/tap/keypress (a user gesture),
// so browsers never block or warn about the AudioContext.

type Listener = (muted: boolean) => void;

const STORAGE_KEY = 'uxforger_sound_muted';

class SoundManager {
  private ctx: AudioContext | null = null;
  private listeners = new Set<Listener>();
  public isMuted = false;

  constructor() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) this.isMuted = saved === 'true';
    } catch {
      // storage unavailable (private mode etc.)
    }
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private getCtx(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      this.ctx = new Ctor();
    }
    if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
    return this.ctx;
  }

  setMuted(muted: boolean) {
    this.isMuted = muted;
    try {
      localStorage.setItem(STORAGE_KEY, String(muted));
    } catch {
      // ignore
    }
    this.listeners.forEach((l) => l(muted));
    if (!muted) this.playPop();
  }

  toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  private tone(
    type: OscillatorType,
    from: number,
    to: number,
    duration: number,
    gainStart: number,
    startOffset = 0,
    mid?: { freq: number; at: number },
  ) {
    if (this.isMuted) return;
    try {
      const ctx = this.getCtx();
      if (!ctx) return;
      const t0 = ctx.currentTime + startOffset;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(from, t0);
      if (mid) osc.frequency.exponentialRampToValueAtTime(mid.freq, t0 + mid.at);
      osc.frequency.exponentialRampToValueAtTime(to, t0 + duration * 0.85);
      gain.gain.setValueAtTime(gainStart, t0);
      gain.gain.exponentialRampToValueAtTime(0.001, t0 + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t0);
      osc.stop(t0 + duration + 0.01);
    } catch {
      // ignore audio errors
    }
  }

  /** Bubble-wrap pop */
  playPop(pitch = 1) {
    const base = 480 * pitch;
    this.tone('sine', base, base * 2.2, 0.1, 0.16);
  }

  /** Soft mechanical click */
  playClick() {
    this.tone('triangle', 140, 40, 0.045, 0.14);
  }

  /** Mascot squish */
  playBoing() {
    this.tone('sine', 260, 380, 0.25, 0.18, 0, { freq: 620, at: 0.12 });
  }

  /** Success chime (C major arpeggio) */
  playChime() {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => this.tone('sine', f, f, 0.35, 0.1, i * 0.07));
  }

  /** Page-turn whoosh */
  playWhoosh() {
    this.tone('sine', 180, 420, 0.18, 0.08);
  }
}

export const sounds = new SoundManager();
