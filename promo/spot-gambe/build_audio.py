"""Sound design dello Spot #2 — Focus Gambe.

Base musicale: promo/spot-music.mp3, la traccia gia' usata per gli altri spot.
E' a ~126 BPM e viene portata a 132 (stretch 4.8%, pitch invariato) per
allinearsi alla griglia dei tagli; il suo stacco piu' forte viene fatto
coincidere con la rivelazione della 21a macchina.

Sopra la base, tutto sintetizzato: uno swoosh per ogni scritta a schermo,
battito cardiaco in crescendo prima della 21a, impatti, riser e clangori.

USE_REAL_MUSIC=0 come variabile d'ambiente per tornare alla base sintetica.
"""

import numpy as np
import subprocess
import sys
import os
import wave

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from timeline import (  # noqa: E402
    FPS, TOTAL_FRAMES, TEXT_EVENTS, IMPACTS,
    HEART_START, HEART_END, HEART_BPM, HEART_GAIN,
    SILENCE_IN, SILENCE_OUT, sec,
)

SR = 44100
BPM = 132.0
BEAT = 60.0 / BPM
DUR = TOTAL_FRAMES / FPS
N = int(SR * DUR)
OUT_WAV = "/tmp/gambe-audio.wav"

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
MUSIC_MP3 = os.path.join(REPO, "promo", "spot-music.mp3")
MUSIC_WAV = "/tmp/music-132.wav"
MUSIC_SRC_BPM = 126.0
USE_REAL_MUSIC = os.environ.get("USE_REAL_MUSIC", "1") == "1" and os.path.exists(MUSIC_MP3)

# il punto della traccia da far cadere sulla rivelazione della 21a macchina
MUSIC_ANCHOR = 77.0
ANCHOR_AT = 43.0
MUSIC_IN = 4.0

rng = np.random.default_rng(7)
buf = np.zeros((N, 2), dtype=np.float64)


def add(sig, t, pan=0.0, gain=1.0):
    """Somma un segnale mono nel buffer stereo a partire dal tempo t."""
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


def env_exp(n, decay):
    return np.exp(-np.linspace(0, 1, n) * decay)


def onepole_lp(x, cutoff):
    """Lowpass a un polo con cutoff variabile nel tempo (array o scalare)."""
    if np.isscalar(cutoff):
        cutoff = np.full(len(x), float(cutoff))
    a = 1.0 - np.exp(-2.0 * np.pi * np.clip(cutoff, 20, SR / 2.2) / SR)
    y = np.empty_like(x)
    prev = 0.0
    for i in range(len(x)):
        prev += a[i] * (x[i] - prev)
        y[i] = prev
    return y


def onepole_hp(x, cutoff):
    return x - onepole_lp(x, cutoff)


# ------------------------------------------------------------------ percussioni
def kick(dur=0.40, f_start=150.0, f_end=44.0, drive=1.7):
    n = int(SR * dur)
    t = np.arange(n) / SR
    f = f_end + (f_start - f_end) * np.exp(-t * 26)
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 8.5)
    click = rng.uniform(-1, 1, n) * np.exp(-t * 380) * 0.35
    return np.tanh((body + click) * drive) * 0.92


def hat(dur=0.055, bright=1.0):
    n = int(SR * dur)
    t = np.arange(n) / SR
    x = rng.uniform(-1, 1, n)
    x = onepole_hp(x, 6500 * bright)
    return x * np.exp(-t * 95) * 0.30


def bass(freq, dur, drive=3.2):
    n = int(SR * dur)
    t = np.arange(n) / SR
    saw = 2.0 * (t * freq - np.floor(0.5 + t * freq))
    sub = np.sin(2 * np.pi * freq * 0.5 * t)
    x = np.tanh((saw * 0.7 + sub * 0.9) * drive)
    x = onepole_lp(x, np.linspace(2200, 500, n))
    return x * np.exp(-t * 3.0) * 0.42


def pluck(freq, dur=0.10):
    n = int(SR * dur)
    t = np.arange(n) / SR
    x = np.sign(np.sin(2 * np.pi * freq * t)) * 0.35 + np.sin(2 * np.pi * freq * t) * 0.65
    return x * np.exp(-t * 26) * 0.16


def pad(dur, gain=1.0):
    n = int(SR * dur)
    t = np.arange(n) / SR
    x = (np.sin(2 * np.pi * 55 * t) * 0.6
         + np.sin(2 * np.pi * 82.5 * t) * 0.25
         + np.sin(2 * np.pi * 110 * t) * 0.12)
    trem = 1.0 + 0.10 * np.sin(2 * np.pi * 0.7 * t)
    fade = np.minimum(1.0, np.minimum(t / 0.4, (dur - t) / 0.6))
    return x * trem * np.clip(fade, 0, 1) * 0.20 * gain


# ------------------------------------------------------------------ swoosh
def swoosh(variant="sharp_01"):
    spec = {
        # durata, cutoff iniziale, cutoff di picco, decay, reverse
        "sharp_01":     (0.26, 400, 9000, 7.0, False),
        "sharp_03":     (0.22, 600, 11000, 8.5, False),
        "air_tight_02": (0.18, 900, 13000, 11.0, False),
        "deep_02":      (0.42, 150, 4200, 4.2, False),
        "reverse_long": (0.70, 200, 6500, 3.0, True),
    }[variant]
    dur, c0, c1, decay, reverse = spec
    n = int(SR * dur)
    t = np.arange(n) / SR
    x = rng.uniform(-1, 1, n)
    # il cutoff sale e ricade: e' cio' che da' la sensazione di "aria che taglia"
    shape = np.sin(np.pi * np.linspace(0, 1, n)) ** 0.7
    cutoff = c0 + (c1 - c0) * shape
    x = onepole_hp(x, cutoff * 0.35)
    x = onepole_lp(x, cutoff)
    body = x * np.exp(-t * decay) * shape
    # una punta tonale che rende il fruscio "affilato" invece di solo rumore
    tone = np.sin(2 * np.pi * (300 + 2600 * shape) * t) * np.exp(-t * decay * 1.6) * 0.12
    out = (body + tone) * 0.55
    if reverse:
        out = out[::-1].copy()
    return out


# ------------------------------------------------------------------ impatti
def impact(kind="huge"):
    if kind == "metal_low":
        dur = 0.9
        n = int(SR * dur)
        t = np.arange(n) / SR
        metal = sum(np.sin(2 * np.pi * f * t) * np.exp(-t * d)
                    for f, d in [(180, 14), (317, 18), (523, 22), (861, 26)])
        thud = np.sin(2 * np.pi * (95 - 45 * np.exp(-t * 8)) * t) * np.exp(-t * 9)
        return np.tanh((metal * 0.22 + thud * 1.1) * 1.4) * 0.7
    if kind == "huge":
        dur = 2.4
        n = int(SR * dur)
        t = np.arange(n) / SR
        f = 34 + 120 * np.exp(-t * 12)
        sub = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 1.7)
        crack = onepole_hp(rng.uniform(-1, 1, n), 2500) * np.exp(-t * 30) * 0.55
        boom = onepole_lp(rng.uniform(-1, 1, n), 220) * np.exp(-t * 4.5) * 0.5
        return np.tanh((sub * 1.5 + crack + boom) * 1.25) * 0.95
    # final
    dur = 3.2
    n = int(SR * dur)
    t = np.arange(n) / SR
    f = 40 + 90 * np.exp(-t * 9)
    sub = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 1.1)
    tail = onepole_lp(rng.uniform(-1, 1, n), 900) * np.exp(-t * 1.6) * 0.35
    return np.tanh((sub * 1.4 + tail) * 1.15) * 0.85


def heart_thump(amp):
    dur = 0.30
    n = int(SR * dur)
    t = np.arange(n) / SR
    x = (np.sin(2 * np.pi * 48 * t) * 0.75 + np.sin(2 * np.pi * 33 * t) * 0.45)
    x = onepole_lp(x, 160)
    return x * np.exp(-t * 19) * amp


def riser(dur):
    n = int(SR * dur)
    t = np.arange(n) / SR
    p = t / dur
    noise = rng.uniform(-1, 1, n)
    noise = onepole_hp(noise, 300 + 5200 * p ** 2)
    tone = np.sin(2 * np.pi * np.cumsum(110 + 620 * p ** 2.4) / SR)
    return (noise * 0.30 + tone * 0.16) * (p ** 2.2) * 0.75


# ------------------------------------------------------------------ musica
def music_state(t):
    """Layer attivi e guadagno per ogni istante, secondo il pacing dello script."""
    if 4.0 <= t < 8.0:
        return dict(kick=1, bass=1, hat=0, arp=0, gain=0.75, half=False)
    if 8.0 <= t < 16.0:
        return dict(kick=1, bass=1, hat=1, arp=0, gain=1.00, half=False)
    if 16.0 <= t < 20.0:
        return dict(kick=1, bass=1, hat=0, arp=0, gain=0.70, half=True)
    if 20.0 <= t < 28.0:
        return dict(kick=1, bass=1, hat=1, arp=1 if t >= 24.0 else 0, gain=1.00, half=False)
    if 28.0 <= t < 31.0:
        return dict(kick=0, bass=0, hat=0, arp=0, gain=0.0, half=False)
    if 31.0 <= t < 38.0:
        return dict(kick=1, bass=1, hat=1, arp=0, gain=1.05, half=False)
    if 38.0 <= t < 39.6:
        # la base si svuota: resta solo la cassa che sfuma
        g = 0.75 * (1.0 - (t - 38.0) / 1.6)
        return dict(kick=1, bass=0, hat=0, arp=0, gain=max(g, 0.0), half=True)
    if 43.0 <= t < 50.6:
        return dict(kick=1, bass=1, hat=1, arp=1, gain=1.15, half=False)
    return dict(kick=0, bass=0, hat=0, arp=0, gain=0.0, half=False)


BASS_ROOTS = [55.00, 55.00, 73.42, 61.74]      # A1 A1 D2 B1
ARP_SCALE = [220.00, 261.63, 293.66, 329.63, 392.00]

# --------------------------------------------------------------- base reale
def load_music():
    """Porta la traccia a 132 BPM e ne trova la fase dei battiti."""
    if not os.path.exists(MUSIC_WAV):
        subprocess.run(
            ["ffmpeg", "-y", "-i", MUSIC_MP3,
             "-filter:a", f"atempo={BPM/MUSIC_SRC_BPM:.6f}",
             "-ar", str(SR), "-ac", "2", MUSIC_WAV],
            check=True, capture_output=True)
    with wave.open(MUSIC_WAV, "rb") as w:
        raw = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16)
    m = raw.astype(np.float64).reshape(-1, 2) / 32768.0

    # fase dei battiti: quale offset allinea meglio una griglia a 132 BPM
    mono = m.mean(axis=1)
    hop = 256
    nf = len(mono) // hop
    envel = np.sqrt(np.mean(mono[:nf * hop].reshape(nf, hop) ** 2, axis=1))
    onset = np.clip(np.diff(envel, prepend=envel[0]), 0, None)
    beat_len = BEAT * SR / hop
    best_phase, best_score = 0.0, -1.0
    for k in range(60):
        ph = k / 60.0 * beat_len
        idx = (ph + np.arange(int((nf - 2) / beat_len)) * beat_len).astype(int)
        score = onset[idx].sum()
        if score > best_score:
            best_score, best_phase = score, ph * hop / SR
    return m, best_phase


def automation_gain(t):
    """Dinamica imposta alla base: l'immagine corre, il testo respira."""
    if t < MUSIC_IN:
        return 0.0
    if t < 8.0:
        return 0.60          # dichiarazione: lascia spazio alla lettura
    if t < 16.0:
        return 0.95          # raffica 1
    if t < 20.0:
        return 0.52          # frenata: la base si chiude e va sotto
    if t < 28.0:
        return 0.95          # raffica 2
    if t < 31.0:
        return 0.0           # freeze: solo il pad
    if t < 38.0:
        return 1.00          # raffica 3
    if t < 39.6:
        return 0.65 * (1.0 - (t - 38.0) / 1.6)   # si svuota
    if t < ANCHOR_AT:
        return 0.0           # sospensione: solo battito e riser
    if t < 50.6:
        return 1.10          # drop sulla 21a
    return max(0.0, 1.10 * (1.0 - (t - 50.6) / 1.4))


if USE_REAL_MUSIC:
    print("Base musicale reale (spot-music.mp3 -> 132 BPM)...")
    music, phase = load_music()
    # allinea un battito della traccia all'ingresso musica, e il suo stacco
    # piu' forte alla rivelazione della 21a macchina
    raw_start = MUSIC_ANCHOR - (ANCHOR_AT - MUSIC_IN)
    k = round((raw_start - phase) / BEAT)
    music_start = phase + k * BEAT
    print(f"  fase battiti {phase*1000:.0f} ms · ingresso dalla traccia a {music_start:.3f}s")

    need = int((DUR - MUSIC_IN) * SR)
    i0 = int(music_start * SR)
    seg = music[i0:i0 + need]
    if len(seg) < need:
        seg = np.pad(seg, ((0, need - len(seg)), (0, 0)))

    # automazione di guadagno a risoluzione di campione, con rampe morbide
    tt = MUSIC_IN + np.arange(need) / SR
    gains = np.array([automation_gain(v) for v in np.arange(MUSIC_IN, DUR, 0.005)])
    gain_env = np.interp(tt, np.arange(MUSIC_IN, DUR, 0.005)[:len(gains)], gains)
    # smussa i gradini per evitare click sui tagli di livello
    win = int(0.05 * SR)
    kern = np.ones(win) / win
    gain_env = np.convolve(gain_env, kern, mode="same")
    seg = seg * gain_env[:, None]

    # nella frenata la base passa sotto un filtro: libera l'orecchio per il testo
    f0, f1 = int((16.0 - MUSIC_IN) * SR), int((20.0 - MUSIC_IN) * SR)
    for ch in range(2):
        seg[f0:f1, ch] = onepole_lp(seg[f0:f1, ch], 780)

    add(seg[:, 0], MUSIC_IN, -1.0, 0.72)
    add(seg[:, 1], MUSIC_IN, 1.0, 0.72)
else:
    print("Sintesi musica...")
    beat_i = 0
    t = 4.0
    while t < DUR:
        st = music_state(t)
        if st["gain"] > 0:
            bar_pos = beat_i % 4
            if st["kick"] and (not st["half"] or bar_pos % 2 == 0):
                add(kick(), t, 0.0, 0.95 * st["gain"])
            if st["bass"]:
                add(bass(BASS_ROOTS[bar_pos], BEAT * 0.95), t, 0.0, 0.9 * st["gain"])
            if st["hat"]:
                for k in range(4):
                    sub_t = t + k * BEAT / 4.0
                    g = 0.55 if k % 2 else 1.0
                    add(hat(bright=1.0 + 0.15 * (k % 2)), sub_t,
                        0.25 if k % 2 else -0.25, g * 0.8 * st["gain"])
            if st["arp"]:
                # sale di un semitono ogni due battute: cresce senza dirlo
                step = int((t - 20.0) / (BEAT * 8)) if t < 43.0 else 6
                for k in range(4):
                    f = ARP_SCALE[(beat_i * 4 + k) % len(ARP_SCALE)] * (2 ** (step / 12.0))
                    add(pluck(f), t + k * BEAT / 4.0,
                        -0.35 + 0.7 * (k % 2), 0.8 * st["gain"])
        beat_i += 1
        t += BEAT

# pad sotto il freeze della S6 e sotto la sospensione della S8
add(pad(3.2, gain=1.0), 27.9, 0.0, 1.0)
add(pad(5.0, gain=0.8), 38.0, 0.0, 1.0)

# ------------------------------------------------------------------ swoosh
print(f"Swoosh: {len(TEXT_EVENTS)} eventi...")
for idx, (frame, variant, gain) in enumerate(TEXT_EVENTS):
    pan = -0.45 if idx % 2 == 0 else 0.45
    add(swoosh(variant), sec(frame) - 0.02, pan, gain)

# ------------------------------------------------------------------ impatti
print("Impatti...")
for frame, kind, gain in IMPACTS:
    add(impact(kind), sec(frame), 0.0, gain)

# clangore di piastre come texture nelle raffiche
for frame, _, _ in TEXT_EVENTS:
    t_ev = sec(frame)
    if 8.0 <= t_ev < 16.0 or 20.0 <= t_ev < 28.0 or 31.0 <= t_ev < 38.0:
        add(impact("metal_low")[: int(SR * 0.35)], t_ev + 0.05,
            rng.uniform(-0.5, 0.5), 0.16)

# ------------------------------------------------------------------ battito + riser
print("Battito cardiaco in crescendo...")
t = HEART_START
while t < HEART_END:
    p = (t - HEART_START) / (HEART_END - HEART_START)
    bpm = HEART_BPM[0] + (HEART_BPM[1] - HEART_BPM[0]) * p
    amp = HEART_GAIN[0] * (HEART_GAIN[1] / HEART_GAIN[0]) ** p
    add(heart_thump(amp), t, 0.0, 1.0)                      # lub
    add(heart_thump(amp * 0.62), t + 0.16, 0.0, 1.0)        # dub
    t += 60.0 / bpm

add(riser(4.6), 38.1, 0.0, 0.85)

# ------------------------------------------------------------------ silenzio assoluto
# il battito non sfuma: viene tagliato di netto, e il vuoto fa da detonatore
i0, i1 = int(SILENCE_IN * SR), int(SILENCE_OUT * SR)
fade = np.linspace(1.0, 0.0, min(600, i1 - i0))
buf[i0:i0 + len(fade)] *= fade[:, None]
buf[i0 + len(fade):i1] = 0.0

# silenzio totale sui primi 8 frame (0.32 s)
i_hook = int(sec(8) * SR)
buf[:i_hook] = 0.0

# ------------------------------------------------------------------ master
print("Master...")
buf = np.tanh(buf * 1.05) * 0.96
peak = np.max(np.abs(buf))
if peak > 0:
    buf *= 0.94 / peak
rms = np.sqrt(np.mean(buf ** 2))
print(f"  picco {20*np.log10(np.max(np.abs(buf))):.1f} dBFS · RMS {20*np.log10(rms):.1f} dBFS")

pcm = (np.clip(buf, -1, 1) * 32767).astype(np.int16)
import wave  # noqa: E402
with wave.open(OUT_WAV, "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(pcm.tobytes())
print(f"OK -> {OUT_WAV} ({os.path.getsize(OUT_WAV)//1024} KB, {DUR:.2f}s)")
