// Oscillator-based emergency siren burst — no external assets needed
function playEmergencySiren() {
  try {
    const ctx = new AudioContext();

    // Short two-tone siren: low → high, twice
    const tones = [
      { freq: 660, start: 0, end: 0.12 },
      { freq: 880, start: 0.12, end: 0.24 },
      { freq: 660, start: 0.24, end: 0.36 },
      { freq: 880, start: 0.36, end: 0.48 },
    ];

    tones.forEach(({ freq, start, end }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "square";
      osc.frequency.value = freq;

      // Quick fade-in/out to avoid clicks
      gain.gain.setValueAtTime(0, ctx.currentTime + start);
      gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + start + 0.02);
      gain.gain.setValueAtTime(0.15, ctx.currentTime + end - 0.02);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + end);

      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime + start);
      osc.stop(ctx.currentTime + end);
    });

    // Clean up context after playback
    setTimeout(() => ctx.close(), 600);
  } catch {
    // AudioContext not supported — fail silently
  }
}

// Vibration API wrapper with pattern
function vibratePattern() {
  if (navigator.vibrate) {
    // Two strong pulses: vibrate 120ms, pause 80ms, vibrate 200ms
    navigator.vibrate([120, 80, 200]);
  }
}

/**
 * Trigger combined haptic + audio feedback for emergency SOS.
 * Safe to call in any environment — gracefully degrades.
 */
export function triggerEmergencyFeedback() {
  vibratePattern();
  playEmergencySiren();
}
