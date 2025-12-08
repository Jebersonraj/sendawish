let audioCtx: AudioContext | null = null;

const getCtx = () => {
    if (!audioCtx && typeof window !== 'undefined') {
        audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioCtx;
};

const playTone = (freq: number, type: OscillatorType, duration: number, delay = 0, vol = 0.1) => {
    const ctx = getCtx();
    if (!ctx) return;
    if (ctx.state === 'suspended') {
        ctx.resume().catch((err) => console.error("AudioContext resume failed:", err));
    }
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
    gain.gain.setValueAtTime(vol, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration);
};

const playNoise = (duration: number) => {
    const ctx = getCtx();
    if (!ctx) return;
    if (ctx.state === 'suspended') {
        ctx.resume().catch((err) => console.error("AudioContext resume failed:", err));
    }
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    noise.connect(gain);
    gain.connect(ctx.destination);
    noise.start();
};
export const playPop = () => {
    playTone(600, 'sine', 0.1, 0, 0.1);
    setTimeout(() => playTone(300, 'triangle', 0.1, 0, 0.1), 50);
};
export const playSparkle = () => {
    [500, 800, 1100, 1400, 1800].forEach((freq, i) => {
        playTone(freq, 'sine', 0.4, i * 0.08, 0.05);
    });
};
export const playChime = () => {
    playTone(800, 'sine', 2.0, 0, 0.1);
    playTone(1200, 'sine', 2.0, 0.1, 0.1);
};
export const playHarp = () => {
    const notes = [440, 493, 554, 587, 659, 740];
    notes.forEach((freq, i) => playTone(freq, 'triangle', 1.0, i * 0.15, 0.05));
};
export const playCelebration = () => {
    playTone(400, 'square', 0.2);
    playTone(600, 'square', 0.2, 0.1);
    playTone(800, 'square', 0.4, 0.2);
    playNoise(0.3);
};
export const playSuccess = () => {
    playTone(500, 'sine', 0.2);
    playTone(1000, 'sine', 0.4, 0.1);
};
export const playThemeSound = (animationType: string) => {
    switch (animationType) {
        case 'confetti': return playCelebration();
        case 'hearts': return playHarp();
        case 'snow': return playChime();
        case 'sparkles': return playSparkle();
        case 'bubbles': return playPop();
        default: return playPop();
    }
};