// Web Audio API ambient acoustic synthesizer
// Plays a warm, soothing romantic piano and soft analog pad chord progression.
// Zero external files, zero latency, runs offline and smoothly on all devices.

class RomanticAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private masterGain: GainNode | null = null;
  private intervalId: any = null;
  private noteIndex: number = 0;

  // F Major / D Minor pentatonic romantic chord progressions
  // Fmaj7, Dm9, Bbmaj7, Csus4 -> C
  private chords = [
    // Fmaj7: F3, C4, E4, A4
    [174.61, 261.63, 329.63, 440.0],
    // Dm9: D3, A3, C4, E4, F4
    [146.83, 220.0, 261.63, 329.63, 349.23],
    // Bbmaj7: Bb2, F3, A3, D4
    [116.54, 174.61, 220.0, 293.66],
    // C6/9: C3, G3, E4, A4, D5
    [130.81, 196.0, 329.63, 440.0, 587.33],
  ];

  // Delicate bell/piano melody notes (in Hz)
  private melodyNotes = [
    523.25, // C5
    587.33, // D5
    659.25, // E5
    698.46, // F5
    783.99, // G5
    880.0,  // A5
    1046.5, // C6
  ];

  private currentChordIndex = 0;

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
  }

  // Play a soft, warm harmonic note (acoustic-like with envelope)
  private playPianoTone(freq: number, startTime: number, duration: number, volume: number = 0.12) {
    if (!this.ctx || !this.masterGain) return;

    // Fundamental oscillator (triangle for soft warmth)
    const osc1 = this.ctx.createOscillator();
    osc1.type = "triangle";
    osc1.frequency.setValueAtTime(freq, startTime);

    // Subtle sine overtone for chime/bell airiness
    const osc2 = this.ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(freq * 2, startTime);

    // Gain envelope (soft attack, long acoustic release)
    const noteGain = this.ctx.createGain();
    noteGain.gain.setValueAtTime(0.0001, startTime);
    noteGain.gain.exponentialRampToValueAtTime(volume, startTime + 0.08);
    noteGain.gain.exponentialRampToValueAtTime(volume * 0.4, startTime + 0.6);
    noteGain.gain.exponentialRampToValueAtTime(0.00001, startTime + duration);

    // Subtle lowpass filter to emulate warm wooden acoustic resonance
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1400, startTime);
    filter.frequency.exponentialRampToValueAtTime(600, startTime + duration);

    osc1.connect(noteGain);
    osc2.connect(noteGain);
    noteGain.connect(filter);
    filter.connect(this.masterGain);

    osc1.start(startTime);
    osc2.start(startTime);
    osc1.stop(startTime + duration);
    osc2.stop(startTime + duration);
  }

  // Play warm atmospheric background drone
  private playPadChord(frequencies: number[], startTime: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;

    frequencies.forEach((freq) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      osc.type = "sine";
      // Slight detune for lush analog warmth
      osc.frequency.setValueAtTime(freq + (Math.random() * 0.4 - 0.2), startTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.exponentialRampToValueAtTime(0.025, startTime + 1.2);
      gain.gain.setValueAtTime(0.02, startTime + duration - 1.2);
      gain.gain.exponentialRampToValueAtTime(0.00001, startTime + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + duration);
    });
  }

  public start() {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    this.isRunning = true;
    this.currentChordIndex = 0;
    this.noteIndex = 0;

    const stepDuration = 3.6; // Seconds per chord bar

    const playCycle = () => {
      if (!this.isRunning || !this.ctx) return;
      const now = this.ctx.currentTime;
      const chord = this.chords[this.currentChordIndex];

      // Warm background pad
      this.playPadChord(chord, now, stepDuration + 0.5);

      // Delicate acoustic arpeggio
      chord.forEach((noteFreq, idx) => {
        const offset = idx * 0.45;
        this.playPianoTone(noteFreq, now + offset, 2.5, 0.08);
      });

      // Romantic high melody sparkle
      const melodyNote = this.melodyNotes[(this.noteIndex * 2) % this.melodyNotes.length];
      this.playPianoTone(melodyNote, now + 1.8, 2.2, 0.045);

      this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;
      this.noteIndex++;
    };

    playCycle();
    this.intervalId = setInterval(playCycle, stepDuration * 1000);
  }

  public stop() {
    this.isRunning = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public toggle(): boolean {
    if (this.isRunning) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isRunning;
  }
}

export const audioSynthesizer = typeof window !== "undefined" ? new RomanticAudioSynthesizer() : null;
