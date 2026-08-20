"""Audio semplice per lo Spot Petto: traccia promo + swoosh sulle scritte principali."""

import os
import sys
import wave
import subprocess
import numpy as np

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from timeline import FPS, TOTAL_FRAMES, TEXT_EVENTS, IMPACTS, MUSIC_IN, sec

SR = 44100
DUR = TOTAL_FRAMES / FPS
N = int(SR * DUR)
OUT_WAV = "/tmp/petto-audio.wav"
REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
MUSIC_MP3 = os.path.join(REPO, "promo", "spot-music.mp3")
MUSIC_WAV = "/tmp/petto-music.wav"
BPM = 128.0
BEAT = 60.0 / BPM

buf = np.zeros((N, 2), dtype=np.float64)
rng = np.random.default_rng(19)


def add(sig, t, pan=0.0, gain=1.0):
    i = int(t * SR)
    if i < 0:
        sig = sig[-i:]
        i = 0
    if i >= N:
        return
    sig = sig[: N - i]
    left = gain * np.sqrt((1.0 - pan) / 2.0) * np.sqrt(2)
    right = gain * np.sqrt((1.0 + pan) / 2.0) * np.sqrt(2)
    buf[i:i + len(sig), 0] += sig * left
    buf[i:i + len(sig), 1] += sig * right


def onepole_lp(x, cutoff):
    if np.isscalar(cutoff):
        cutoff = np.full(len(x), float(cutoff))
    a = 1.0 - np.exp(-2.0 * np.pi * np.clip(cutoff, 20, SR / 2.2) / SR)
    y = np.empty_like(x)
    prev = 0.0
    for i in range(len(x)):
        prev += a[i] * (x[i] - prev)
        y[i] = prev
    return y


def swoosh(variant="sharp_01"):
    spec = {
        "sharp_01": (0.24, 500, 9500, 8.0),
        "sharp_03": (0.20, 700, 10500, 9.0),
        "air_tight_02": (0.17, 900, 12000, 10.0),
        "deep_02": (0.38, 180, 4000, 4.5),
    }[variant]
    dur, c0, c1, decay = spec
    n = int(SR * dur)
    t = np.arange(n) / SR
    x = rng.uniform(-1, 1, n)
    shape = np.sin(np.pi * np.linspace(0, 1, n)) ** 0.75
    cutoff = c0 + (c1 - c0) * shape
    x = onepole_lp(x, cutoff)
    return x * np.exp(-t * decay) * shape * 0.50


def impact(kind="soft"):
    n = int(SR * (2.0 if kind == "final" else 0.7))
    t = np.arange(n) / SR
    f = 55 + 80 * np.exp(-t * 10)
    sub = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * (2.5 if kind == "final" else 6))
    return np.tanh(sub * (1.8 if kind == "final" else 1.1)) * (0.85 if kind == "final" else 0.55)


def load_music():
    if not os.path.exists(MUSIC_WAV):
        subprocess.run(
            ["ffmpeg", "-y", "-i", MUSIC_MP3, "-filter:a", "atempo=1.015873",
             "-ar", str(SR), "-ac", "2", MUSIC_WAV],
            check=True, capture_output=True)
    with wave.open(MUSIC_WAV, "rb") as w:
        raw = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16)
    return raw.astype(np.float64).reshape(-1, 2) / 32768.0


def gain_at(t):
    if t < MUSIC_IN:
        return 0.0
    if 7.7 <= t < 11.7:
        return 0.55
    if 12.3 <= t < 16.3:
        return 0.55
    if 21.1 <= t < 25.1:
        return 0.52
    if 25.1 <= t < 29.1:
        return 0.50
    return 0.88


print("Base musicale...")
music = load_music()
need = int((DUR - MUSIC_IN) * SR)
seg = music[:need]
if len(seg) < need:
    seg = np.pad(seg, ((0, need - len(seg)), (0, 0)))
tt = MUSIC_IN + np.arange(need) / SR
gains = np.array([gain_at(v) for v in np.arange(MUSIC_IN, DUR, 0.01)])
gain_env = np.interp(tt, np.arange(MUSIC_IN, DUR, 0.01)[:len(gains)], gains)
win = int(0.06 * SR)
gain_env = np.convolve(gain_env, np.ones(win) / win, mode="same")
seg = seg * gain_env[:, None]
add(seg[:, 0], MUSIC_IN, -1.0, 0.68)
add(seg[:, 1], MUSIC_IN, 1.0, 0.68)

print(f"Swoosh: {len(TEXT_EVENTS)}...")
for i, (frame, variant, gain) in enumerate(TEXT_EVENTS):
    add(swoosh(variant), sec(frame) - 0.02, -0.4 if i % 2 == 0 else 0.4, gain)

for frame, kind, gain in IMPACTS:
    add(impact(kind), sec(frame), 0.0, gain)

buf = np.tanh(buf * 1.02) * 0.95
peak = np.max(np.abs(buf))
if peak > 0:
    buf *= 0.94 / peak

pcm = (np.clip(buf, -1, 1) * 32767).astype(np.int16)
with wave.open(OUT_WAV, "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(pcm.tobytes())
print(f"OK -> {OUT_WAV} ({DUR:.1f}s)")
