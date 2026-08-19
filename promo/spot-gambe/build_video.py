"""Montaggio video dello Spot #2 — Focus Gambe.

Rende 1300 frame (52 s @ 25 fps, 1080x1920) seguendo scena per scena il pacing
dello script: raffiche veloci sulle macchine, frenate in slow-motion sui claim,
blackout con contatore prima della rivelazione della 21a macchina.
"""

import os
import sys
import math
import shutil
import subprocess

import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageChops, ImageEnhance, ImageFilter

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from timeline import (  # noqa: E402
    FPS, W, H, SRC, TOTAL_FRAMES, SCENES, BURST_SLOTS, MACHINE_21,
    ORANGE, WHITE, GREY,
)

FRAMES_DIR = "/tmp/gambe-frames"
REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
LOGO = f"{REPO}/public/brand/revenge-gym-logo.png"

# dominio ufficiale, allineato al CNAME del repo
SITE_URL = "REVENGEGYMBOXE.IT"

FONT_FILE = "/System/Library/Fonts/Avenir Next Condensed.ttc"
IDX_HEAVY, IDX_DEMI, IDX_MEDIUM = 8, 2, 5

_font_cache = {}
_base_cache = {}


def font(size, idx=IDX_HEAVY):
    key = (size, idx)
    if key not in _font_cache:
        _font_cache[key] = ImageFont.truetype(FONT_FILE, size, index=idx)
    return _font_cache[key]


# --------------------------------------------------------------------- immagini
def base(name):
    if name not in _base_cache:
        im = Image.open(f"{SRC}/{name}.jpg").convert("RGB")
        _base_cache[name] = im
    return _base_cache[name]


def shot(name, zoom=1.0, px=0.5, py=0.5, blur=0.0):
    """Ritaglio 9:16 dell'immagine sorgente, con zoom e panoramica."""
    im = base(name)
    bw, bh = im.size
    if bw / bh > W / H:
        wh, ww = float(bh), bh * W / H
    else:
        ww, wh = float(bw), bw * H / W
    ww /= zoom
    wh /= zoom
    x = (bw - ww) * px
    y = (bh - wh) * py
    out = im.crop((int(x), int(y), int(x + ww), int(y + wh))).resize((W, H), Image.BICUBIC)
    if blur:
        out = out.filter(ImageFilter.GaussianBlur(blur))
    return out


# grading caldo: spinge l'arancio e chiude il blu, la palette dello spot
GRADE_MATRIX = (
    1.07, 0.03, 0.00, 0,
    0.00, 0.99, 0.01, 0,
    0.00, 0.02, 0.90, 0,
)


def grade(im, brightness=1.0, contrast=1.14, saturation=1.06):
    im = im.convert("RGB", GRADE_MATRIX)
    if contrast != 1.0:
        im = ImageEnhance.Contrast(im).enhance(contrast)
    if saturation != 1.0:
        im = ImageEnhance.Color(im).enhance(saturation)
    if brightness != 1.0:
        im = ImageEnhance.Brightness(im).enhance(brightness)
    return im


def _make_gradient():
    gh = int(H * 0.48)
    alpha = np.zeros((H, W), dtype=np.uint8)
    ramp = (205 * (np.linspace(0, 1, gh) ** 1.5)).astype(np.uint8)
    alpha[H - gh:, :] = ramp[:, None]
    rgba = np.zeros((H, W, 4), dtype=np.uint8)
    rgba[..., 3] = alpha
    return Image.fromarray(rgba)


_scrim_cache = {}


def _scrim_layer(y_center, y_half, max_alpha):
    key = (y_center, y_half, max_alpha)
    if key not in _scrim_cache:
        y = np.arange(H)
        d = np.abs(y - y_center) / float(y_half)
        a = np.clip(1.0 - d ** 2, 0, 1) ** 1.2 * max_alpha
        rgba = np.zeros((H, W, 4), dtype=np.uint8)
        rgba[..., 3] = a.astype(np.uint8)[:, None]
        _scrim_cache[key] = Image.fromarray(rgba)
    return _scrim_cache[key]


def scrim(im, y_center, y_half, max_alpha=155):
    """Banda scura morbida dietro i claim: il testo deve restare leggibile
    anche sopra le inquadrature piu' affollate della sala."""
    layer = _scrim_layer(int(y_center), int(y_half), int(max_alpha))
    return Image.alpha_composite(im.convert("RGBA"), layer).convert("RGB")


def _make_vignette():
    yy, xx = np.mgrid[0:H, 0:W]
    cx, cy = W / 2, H / 2
    r = np.sqrt(((xx - cx) / cx) ** 2 + ((yy - cy) / cy) ** 2)
    v = np.clip(1.0 - 0.42 * np.clip((r - 0.55) / 0.85, 0, 1) ** 1.6, 0, 1)
    arr = (v * 255).astype(np.uint8)
    return Image.merge("RGB", [Image.fromarray(arr)] * 3)


def _make_noise(n=6):
    out = []
    rng = np.random.default_rng(11)
    for _ in range(n):
        small = rng.normal(128, 16, (H // 3, W // 3)).clip(0, 255).astype(np.uint8)
        im = Image.fromarray(small).resize((W, H), Image.BILINEAR)
        out.append(Image.merge("RGB", [im] * 3))
    return out


print("Precalcolo overlay...")
GRADIENT = _make_gradient()
VIGNETTE = _make_vignette()
NOISE = _make_noise()


def apply_vignette(im):
    return ImageChops.multiply(im, VIGNETTE)


def apply_grain(im, frame, amount=0.07):
    return Image.blend(im, NOISE[frame % len(NOISE)], amount)


def apply_gradient(im):
    im = im.convert("RGBA")
    return Image.alpha_composite(im, GRADIENT).convert("RGB")


def flash(im, amount):
    if amount <= 0:
        return im
    white = Image.new("RGB", im.size, (255, 255, 255))
    return Image.blend(im, white, min(amount, 1.0))


def chroma_shift(im, px=2):
    r, g, b = im.split()
    r = ImageChops.offset(r, px, 0)
    b = ImageChops.offset(b, -px, 0)
    return Image.merge("RGB", (r, g, b))


# ----------------------------------------------------------------------- testo
def tracked_width(draw, s, f, tracking):
    if not s:
        return 0
    return sum(draw.textlength(c, font=f) for c in s) + tracking * (len(s) - 1)


def draw_tracked(draw, x, y, s, f, fill, tracking=0, shadow=3):
    if shadow:
        cx = x
        for c in s:
            draw.text((cx + shadow, y + shadow), c, font=f, fill=(0, 0, 0, 190))
            cx += draw.textlength(c, font=f) + tracking
    cx = x
    for c in s:
        draw.text((cx, y), c, font=f, fill=fill)
        cx += draw.textlength(c, font=f) + tracking


def fit_font(draw, s, max_w, start, minimum, tracking, idx=IDX_HEAVY):
    size = start
    while size > minimum:
        f = font(size, idx)
        if tracked_width(draw, s, f, tracking) <= max_w:
            return f
        size -= 2
    return font(minimum, idx)


def centered(draw, y, s, f, fill, tracking=0, shadow=3):
    w = tracked_width(draw, s, f, tracking)
    draw_tracked(draw, (W - w) / 2, y, s, f, fill, tracking, shadow)
    return w


def text_layer():
    return Image.new("RGBA", (W, H), (0, 0, 0, 0))


def composite(im, layer, alpha=1.0):
    if alpha <= 0:
        return im
    if alpha < 1.0:
        a = layer.getchannel("A").point(lambda v: int(v * alpha))
        layer = layer.copy()
        layer.putalpha(a)
    return Image.alpha_composite(im.convert("RGBA"), layer).convert("RGB")


def stamp(im, s, f, fill, cx, cy, scale=1.0, blur=0.0, tracking=6):
    """Testo con animazione di scala e motion blur, per gli impatti numerici."""
    tmp = text_layer()
    d = ImageDraw.Draw(tmp)
    w = tracked_width(d, s, f, tracking)
    bbox = f.getbbox(s)
    hh = bbox[3] - bbox[1]
    draw_tracked(d, (W - w) / 2, cy, s, f, fill, tracking, shadow=4)
    if scale != 1.0:
        nw, nh = int(W * scale), int(H * scale)
        tmp = tmp.resize((nw, nh), Image.BICUBIC)
        ox, oy = (nw - W) // 2, int((nh - H) * (cy + hh / 2) / H)
        tmp = tmp.crop((ox, oy, ox + W, oy + H))
    if blur > 0:
        tmp = tmp.filter(ImageFilter.GaussianBlur(blur))
    return Image.alpha_composite(im.convert("RGBA"), tmp).convert("RGB")


def ease_out(p):
    return 1 - (1 - p) ** 3


# --------------------------------------------------------- cartello macchina
def machine_card(number, name, brand, alpha=1.0, dx=0.0):
    layer = text_layer()
    d = ImageDraw.Draw(layer)
    x = 78 + dx
    max_w = W - 78 - 90

    y_rule = H - 486
    d.rectangle([x, y_rule, x + 104, y_rule + 7], fill=ORANGE + (255,))

    f_num = font(152, IDX_HEAVY)
    draw_tracked(d, x, y_rule + 26, number, f_num, ORANGE + (255,), 4, shadow=4)

    f_name = fit_font(d, name, max_w, 82, 44, 3)
    draw_tracked(d, x, H - 268, name, f_name, WHITE + (255,), 3, shadow=3)

    f_brand = font(42, IDX_MEDIUM)
    draw_tracked(d, x + 3, H - 186, brand.upper(), f_brand, GREY + (255,), 7, shadow=2)

    if alpha < 1.0:
        a = layer.getchannel("A").point(lambda v: int(v * alpha))
        layer.putalpha(a)
    return layer


# offset deterministici per variare i punti di dettaglio macchina per macchina
def detail_center(i, sub):
    r = (i * 7919 + sub * 104729) % 1000 / 1000.0
    px = 0.30 + 0.40 * r
    py = 0.28 + 0.34 * (((i * 6151 + sub * 33) % 1000) / 1000.0)
    return px, py


def burst_frame(machines, slot, local, scene_bright=1.0):
    """Un frame di raffica: 3 micro-inquadrature (dettaglio, medio, largo)."""
    idx = min(local // slot, len(machines) - 1)
    inner = local - idx * slot
    name_file, number, label, brand = machines[idx]

    if inner < 9:
        sub, p = 0, inner / 9.0
        zoom = 2.30 + 0.16 * p
    elif inner < 19:
        sub, p = 1, (inner - 9) / 10.0
        zoom = 1.54 + 0.12 * p
    else:
        sub, p = 2, (inner - 19) / max(slot - 19, 1)
        zoom = 1.05 + 0.10 * p

    px, py = detail_center(idx, sub)
    if sub == 2:
        px, py = 0.5, 0.46
    im = shot(name_file, zoom=zoom, px=px, py=py)
    im = grade(im, brightness=scene_bright)
    im = apply_vignette(im)
    im = apply_gradient(im)

    # flash bianco di 2 frame ogni due macchine, per resettare l'occhio
    if idx % 2 == 1 and inner < 2:
        im = flash(im, 0.80 if inner == 0 else 0.34)

    if inner >= 1:
        p_in = min((inner - 1) / 5.0, 1.0)
        card = machine_card(number, label, brand,
                            alpha=ease_out(p_in),
                            dx=-42 * (1 - ease_out(p_in)))
        im = composite(im, card)
    return im


# ------------------------------------------------------------------ le scene
def render_s1(local):
    if local < 8:
        return Image.new("RGB", (W, H), (0, 0, 0))
    if local < 11:
        im = shot("rack-hammer", zoom=3.4, px=0.46, py=0.30)
        im = grade(im, brightness=1.35, contrast=1.45)
        return flash(im, 0.18)
    im = Image.new("RGB", (W, H), (0, 0, 0))
    if local < 15:
        return im
    if local <= 88:
        a = min((local - 15) / 4.0, 1.0)
    elif local <= 96:
        a = 1.0 - (local - 88) / 8.0
    else:
        return im
    layer = text_layer()
    d = ImageDraw.Draw(layer)
    f = fit_font(d, "IL GIORNO CHE TUTTI EVITANO.", W - 200, 96, 50, 4)
    centered(d, int(H * 0.44), "IL GIORNO CHE TUTTI EVITANO.", f, WHITE + (255,), 4, shadow=0)
    return composite(im, layer, a)


def render_s2(local):
    p = local / 99.0
    im = shot("_corridoio", zoom=1.0, px=0.14 + 0.72 * p, py=0.52)
    im = grade(im, brightness=0.88)
    im = apply_vignette(im)
    im = apply_gradient(im)
    im = scrim(im, H * 0.60, H * 0.24, 170)

    if local < 5:
        return im
    if local < 43:
        a = min((local - 5) / 4.0, 1.0)
        layer = text_layer()
        d = ImageDraw.Draw(layer)
        f = fit_font(d, "NOI L'ABBIAMO ARMATO", W - 200, 92, 50, 5)
        centered(d, int(H * 0.60), "NOI L'ABBIAMO ARMATO", f, WHITE + (255,), 5)
        return composite(im, layer, a)

    q = min((local - 43) / 6.0, 1.0)
    scale = 1.0 + 0.08 * (1 - ease_out(q))
    blur = 6.0 * (1 - ease_out(q))
    layer = text_layer()
    d = ImageDraw.Draw(layer)
    f_small = font(72, IDX_DEMI)
    centered(d, int(H * 0.535), "NE ABBIAMO MESSE", f_small, WHITE + (230,), 6)
    im = composite(im, layer)
    return stamp(im, "21 VOLTE.", font(168, IDX_HEAVY), ORANGE + (255,),
                 W // 2, int(H * 0.615), scale=scale, blur=blur, tracking=6)


def render_s3(local):
    start, slot, machines = BURST_SLOTS["S3_RAFFICA_1"]
    return burst_frame(machines, slot, min(local, slot * len(machines) - 1))


def render_s4(local):
    # speed ramp: la frenata avviene nei primi 5 frame, poi slow-motion fluido
    p = local / 99.0
    ramp = min(local / 5.0, 1.0)
    zoom = 1.88 + 0.02 * ramp + 0.06 * p
    im = shot("pressa-orizzontale-life-fitness", zoom=zoom, px=0.52, py=0.44)
    im = grade(im, brightness=0.82, contrast=1.22)
    im = apply_vignette(im)
    im = apply_gradient(im)
    im = scrim(im, H * 0.61, H * 0.23, 160)

    layer = text_layer()
    d = ImageDraw.Draw(layer)
    if local >= 5:
        a1 = min((local - 5) / 5.0, 1.0)
        f1 = fit_font(d, "QUI NON SI SIMULA.", W - 200, 94, 50, 4)
        l1 = text_layer()
        d1 = ImageDraw.Draw(l1)
        centered(d1, int(H * 0.56), "QUI NON SI SIMULA.", f1, WHITE + (255,), 4)
        im = composite(im, l1, a1)
    if local >= 13:
        a2 = min((local - 13) / 5.0, 1.0)
        f2 = font(132, IDX_HEAVY)
        l2 = text_layer()
        d2 = ImageDraw.Draw(l2)
        centered(d2, int(H * 0.635), "SI SPINGE.", f2, ORANGE + (255,), 6)
        im = composite(im, l2, a2)
    return im


def render_s5(local):
    start, slot, machines = BURST_SLOTS["S5_RAFFICA_2"]
    return burst_frame(machines, slot, min(local, slot * len(machines) - 1))


def render_s6(local):
    # freeze frame: nessun movimento reale, solo un push-in digitale lentissimo
    p = local / 74.0
    im = shot("calf-machine-hammer", zoom=1.50 + 0.06 * p, px=0.5, py=0.40)
    im = grade(im, brightness=0.90, contrast=1.26, saturation=0.94)
    im = chroma_shift(im, 2)
    im = apply_vignette(im)
    im = apply_grain(im, local, 0.085)
    im = apply_gradient(im)
    im = scrim(im, H * 0.62, H * 0.20, 155)
    if local >= 4:
        a = min((local - 4) / 5.0, 1.0)
        layer = text_layer()
        d = ImageDraw.Draw(layer)
        f = fit_font(d, "OGNI FIBRA HA LA SUA MACCHINA.", W - 180, 88, 46, 3)
        centered(d, int(H * 0.60), "OGNI FIBRA HA LA SUA MACCHINA.", f, WHITE + (255,), 3)
        im = composite(im, layer, a)
    return im


def render_s7(local):
    start, slot, machines = BURST_SLOTS["S7_RAFFICA_3"]
    total = slot * len(machines)
    p = min(local / max(total - 1, 1), 1.0)
    # la luce si abbassa progressivamente: stiamo entrando nel finale
    return burst_frame(machines, slot, min(local, total - 1),
                       scene_bright=1.0 - 0.28 * p)


S8_FLASHES = {970: "_athlete", 971: "_athlete",
              984: "smith-machine-hammer", 985: "smith-machine-hammer",
              998: "_platerow", 999: "_platerow",
              1010: "rack-hammer", 1011: "rack-hammer"}


def render_s8(local, frame):
    black = Image.new("RGB", (W, H), (0, 0, 0))

    if frame in S8_FLASHES:
        im = shot(S8_FLASHES[frame], zoom=2.9,
                  px=0.5, py=0.34 + 0.08 * (frame % 2))
        im = grade(im, brightness=0.52, contrast=1.5, saturation=0.7)
        return apply_vignette(im)

    if local < 12:
        return black

    im = black
    # il contatore fermo a 20, che vibra
    if 12 <= local <= 70:
        if local <= 65:
            a = min((local - 12) / 4.0, 1.0)
        else:
            a = max(1.0 - (local - 65) / 5.0, 0.0)
        rng = np.random.default_rng(frame)
        jx, jy = rng.integers(-3, 4), rng.integers(-3, 4)
        layer = text_layer()
        d = ImageDraw.Draw(layer)
        f = font(400, IDX_HEAVY)
        w = tracked_width(d, "20", f, 10)
        draw_tracked(d, (W - w) / 2 + jx, int(H * 0.38) + jy, "20", f,
                     ORANGE + (255,), 10, shadow=0)
        im = composite(im, layer, a)

    # il sussurro
    if local >= 81:
        if local <= 112:
            a = min((local - 81) / 6.0, 1.0)
        else:
            a = max(1.0 - (local - 112) / 5.0, 0.0)
        layer = text_layer()
        d = ImageDraw.Draw(layer)
        f = font(66, IDX_DEMI)
        centered(d, int(H * 0.47), "NE MANCA UNA.", f, (255, 255, 255, 180), 10, shadow=0)
        im = composite(im, layer, a)
    return im


def render_s9(local):
    p = local / 74.0
    # tilt lentissimo dal basso verso l'alto: il monolite
    im = shot("rack-hammer", zoom=1.46, px=0.5, py=0.86 - 0.74 * ease_out(p) * 0.98)
    # il monolite vive nel buio: solo cosi' l'arancio della 21a stacca davvero
    im = grade(im, brightness=0.54, contrast=1.42, saturation=0.50)
    im = apply_vignette(im)
    im = apply_gradient(im)
    im = scrim(im, H * 0.44, H * 0.26, 120)

    if local >= 2:
        q = min((local - 2) / 4.0, 1.0)
        scale = 1.0 + 0.30 * (1 - ease_out(q))
        blur = 10.0 * (1 - ease_out(q))
        layer = text_layer()
        d = ImageDraw.Draw(layer)
        f_name = font(120, IDX_HEAVY)
        centered(d, H - 310, "RACK", f_name, WHITE + (255,), 6)
        f_brand = font(46, IDX_MEDIUM)
        centered(d, H - 192, "HAMMER STRENGTH", f_brand, GREY + (255,), 9)
        im = composite(im, layer, min((local - 2) / 6.0, 1.0))
        im = stamp(im, "21", font(330, IDX_HEAVY), ORANGE + (255,),
                   W // 2, int(H * 0.34), scale=scale, blur=blur, tracking=8)
    return im


_logo_cache = {}


def logo_img(width):
    if width not in _logo_cache:
        im = Image.open(LOGO).convert("RGBA")
        r = width / im.width
        _logo_cache[width] = im.resize((width, int(im.height * r)), Image.LANCZOS)
    return _logo_cache[width]


def render_s10(local):
    if local < 80:
        p = local / 79.0
        im = shot("_salawide", zoom=1.16 + 0.07 * p, px=0.5, py=0.52)
        im = grade(im, brightness=0.90, saturation=1.12)
        im = apply_vignette(im)
        im = apply_gradient(im)
        im = scrim(im, H * 0.60, H * 0.24, 165)
        if local < 40:
            if local >= 2:
                a = min((local - 2) / 5.0, 1.0)
                if local >= 35:
                    a = max(1.0 - (local - 35) / 5.0, 0.0)
                layer = text_layer()
                d = ImageDraw.Draw(layer)
                f = fit_font(d, "21 MACCHINE PER LE GAMBE.", W - 180, 92, 48, 4)
                centered(d, int(H * 0.58), "21 MACCHINE PER LE GAMBE.", f, WHITE + (255,), 4)
                im = composite(im, layer, a)
        else:
            q = min((local - 42) / 5.0, 1.0)
            if q > 0:
                scale = 1.0 + 0.12 * (1 - ease_out(q))
                blur = 5.0 * (1 - ease_out(q))
                im = stamp(im, "ZERO SCUSE.", font(160, IDX_HEAVY), ORANGE + (255,),
                           W // 2, int(H * 0.56), scale=scale, blur=blur, tracking=6)
        return im

    # chiusura statica: l'ultimo frame deve poter essere screenshottato
    im = Image.new("RGB", (W, H), (8, 6, 5))
    l = local - 80
    if l < 2:
        return im
    a = min((l - 2) / 6.0, 1.0)
    layer = text_layer()
    lg = logo_img(760)
    layer.paste(lg, ((W - lg.width) // 2, int(H * 0.38) - lg.height // 2), lg)
    d = ImageDraw.Draw(layer)
    f1 = font(56, IDX_DEMI)
    centered(d, int(H * 0.50), "LADISPOLI", f1, WHITE + (235,), 18, shadow=0)
    d.rectangle([W // 2 - 60, int(H * 0.565), W // 2 + 60, int(H * 0.565) + 5],
                fill=ORANGE + (255,))
    f2 = fit_font(d, SITE_URL, W - 200, 66, 40, 8)
    centered(d, int(H * 0.60), SITE_URL, f2, ORANGE + (255,), 8, shadow=0)
    return composite(im, layer, a)


RENDERERS = {
    "S1_HOOK": lambda l, f: render_s1(l),
    "S2_DICHIARAZIONE": lambda l, f: render_s2(l),
    "S3_RAFFICA_1": lambda l, f: render_s3(l),
    "S4_FRENATA_1": lambda l, f: render_s4(l),
    "S5_RAFFICA_2": lambda l, f: render_s5(l),
    "S6_FRENATA_2": lambda l, f: render_s6(l),
    "S7_RAFFICA_3": lambda l, f: render_s7(l),
    "S8_SOSPENSIONE": render_s8,
    "S9_VENTUNESIMA": lambda l, f: render_s9(l),
    "S10_PAYOFF": lambda l, f: render_s10(l),
}


def scene_of(frame):
    for name, start, n in SCENES:
        if start <= frame < start + n:
            return name, frame - start
    raise ValueError(frame)


def render_frame(frame):
    name, local = scene_of(frame)
    return RENDERERS[name](local, frame)


def main():
    only = None
    if len(sys.argv) > 1 and sys.argv[1] == "--preview":
        only = [int(x) for x in sys.argv[2].split(",")]

    if only:
        os.makedirs("/tmp/gambe-preview", exist_ok=True)
        for f in only:
            render_frame(f).save(f"/tmp/gambe-preview/f{f:05d}.jpg", quality=92)
        print("preview ok:", only)
        return

    if os.path.isdir(FRAMES_DIR):
        shutil.rmtree(FRAMES_DIR)
    os.makedirs(FRAMES_DIR)

    print(f"Rendering {TOTAL_FRAMES} frame...")
    for f in range(TOTAL_FRAMES):
        render_frame(f).save(f"{FRAMES_DIR}/f{f:05d}.jpg", quality=90)
        if f % 100 == 0:
            name, _ = scene_of(f)
            print(f"  {f:5d}/{TOTAL_FRAMES}  {name}")
    print("Frame completati.")


if __name__ == "__main__":
    main()
