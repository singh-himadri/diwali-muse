// Web Audio API Synthesizer for Festive Diwali Sounds & Ambient Music
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.isMusicPlaying = false;
    this.musicTimer = null;
    this.droneGain = null;
    this.masterGain = null;
    this.initialized = false;
  }

  init() {
    if (this.initialized && this.ctx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.7, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
      this.initialized = true;
    } catch (e) {
      console.warn('Web Audio not supported', e);
    }
  }

  ensureContext() {
    if (!this.initialized) this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(muted ? 0 : 0.7, this.ctx.currentTime, 0.05);
    }
  }

  // Harmonic Temple Chime / Singing Bowl (e.g. for Diya ignition, touching steps)
  playChime(freq = 528, duration = 2.5) {
    this.ensureContext();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    const partials = [1, 2.01, 3.02, 4.2];
    const gains = [0.4, 0.18, 0.08, 0.03];

    partials.forEach((mult, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = i === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq * mult, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(gains[i], now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    });
  }

  // Soft whoosh & warm ignition sound for Diya
  playFlameIgnite() {
    this.ensureContext();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    
    // Low whoosh (filtered noise)
    const bufferSize = this.ctx.sampleRate * 0.4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, now);
    filter.frequency.exponentialRampToValueAtTime(900, now + 0.15);
    filter.frequency.exponentialRampToValueAtTime(150, now + 0.4);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(now);
    noise.stop(now + 0.45);

    // Warm chord chime accompanying the flame
    this.playChime(440, 2.0);
    setTimeout(() => this.playChime(660, 2.0), 90);
  }

  // Melodic harp-like ascending arpeggio for Rangoli blooming
  playRangoliGlissando() {
    this.ensureContext();
    if (!this.ctx || this.isMuted) return;

    // Raag Bhupali notes (C, D, E, G, A in Hz)
    const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 659.25];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playChime(freq, 1.8);
      }, idx * 120);
    });
  }

  // Lantern ascending sound: shimmering ethereal resonance
  playLanternAscent() {
    this.ensureContext();
    if (!this.ctx || this.isMuted) return;

    const chords = [392.0, 493.88, 587.33, 783.99]; // G major 7 ethereal chord
    chords.forEach((note, i) => {
      setTimeout(() => {
        this.playChime(note, 3.2);
      }, i * 160);
    });
  }

  // Firework Launch Whistle
  playFireworkLaunch() {
    this.ensureContext();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.5);

    gain.gain.setValueAtTime(0.02, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.6);
  }

  // Firework Burst: Sub-bass thump + crackling shower
  playFireworkBurst(type = 'peony') {
    this.ensureContext();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;

    // Sub thump
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(110, now);
    subOsc.frequency.exponentialRampToValueAtTime(35, now + 0.35);

    subGain.gain.setValueAtTime(0.45, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    subOsc.connect(subGain);
    subGain.connect(this.masterGain);
    subOsc.start(now);
    subOsc.stop(now + 0.45);

    // Crackle noise
    const duration = type === 'willow' ? 0.9 : 0.5;
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-3 * (i / bufferSize));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2200, now);
    filter.Q.setValueAtTime(2.5, now);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.25, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    noise.start(now);
    noise.stop(now + duration + 0.05);
  }

  // Sparkler (Phuljhadi) crackle burst
  playSparklerCrackle() {
    this.ensureContext();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // High frequency micro pop
    osc.type = 'square';
    osc.frequency.setValueAtTime(800 + Math.random() * 2200, now);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.04);
  }

  // Soft Indian classical ambient tanpura drone + meditative chime melody
  startAmbientMusic() {
    if (this.isMusicPlaying) return;
    this.ensureContext();
    if (!this.ctx) return;

    this.isMusicPlaying = true;
    const now = this.ctx.currentTime;

    // Tanpura Drone (Sa & Pa: 130.81Hz and 196Hz)
    const droneGain = this.ctx.createGain();
    droneGain.gain.setValueAtTime(0.001, now);
    droneGain.gain.linearRampToValueAtTime(0.12, now + 3);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, now);

    const f1 = 130.81; // C3
    const f2 = 196.00; // G3
    const f3 = 261.63; // C4

    [f1, f2, f3].forEach((freq) => {
      const osc = this.ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 0.5, now);
      
      const subGain = this.ctx.createGain();
      subGain.gain.value = 0.08;
      
      osc.connect(subGain);
      subGain.connect(filter);
      osc.start(now);
    });

    filter.connect(droneGain);
    droneGain.connect(this.masterGain);
    this.droneGain = droneGain;

    // Ambient sitar/flute pentatonic notes in Raag Yaman / Bhupali
    const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
    const playNextNote = () => {
      if (!this.isMusicPlaying) return;
      const note = scale[Math.floor(Math.random() * scale.length)];
      this.playChime(note, 3.5);
      // Interval between notes: 1.8 to 3.8 seconds
      const delay = 1800 + Math.random() * 2000;
      this.musicTimer = setTimeout(playNextNote, delay);
    };

    setTimeout(playNextNote, 1200);
  }

  stopAmbientMusic() {
    this.isMusicPlaying = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
    if (this.droneGain && this.ctx) {
      this.droneGain.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.5);
    }
  }

  toggleMusic() {
    if (this.isMusicPlaying) {
      this.stopAmbientMusic();
      return false;
    } else {
      this.startAmbientMusic();
      return true;
    }
  }
}

export const sound = new SoundEngine();

