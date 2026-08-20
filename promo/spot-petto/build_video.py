"""Spot #3 — Focus Petto. Montaggio semplice: un'inquadratura veloce per macchina,
scritte principali lente e centrate, niente blackout ne' contatore."""

import os
import sys
import shutil

import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageChops, ImageEnhance, ImageFilter

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from timeline import (  # noqa: E402
    FPS, W, H, SRC, TOTAL_FRAMES, SCENES,
    BLOCK_1, BLOCK_2, MACHINES, SLOT_FAST, SLOT_WHIP,
    ORANGE, WHITE, GREY,
)

FRAMES_DIR = "/tmp/petto-frames"
REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
LOGO = f"{REPO}/public/brand/revenge-gym-logo.png"
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


def base(name):
    if name not in _base_cache:
        _base_cache[name] = Image.open(f"{SRC}/{name}.jpg").convert("RGB")
    return _base_cache[name]


def shot(name, zoom=1.0, px=0.5, py=0.5):
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
    return im.crop((int(x), int(y), int(x + ww), int(y + wh))).resize((W, H), Image.BICUBIC)


GRADE = (1.06, 0.04, 0.0, 0, 0.0, 0.99, 0.02, 0, 0.0, 0.02, 0.91, 0)


def grade(im, brightness=1.0, contrast=1.12, saturation=1.08):
    im = im.convert("RGB", GRADE)
    if contrast != 1.0:
        im = ImageEnhance.Contrast(im).enhance(contrast)
    if saturation != 1.0:
        im = ImageEnhance.Color(im).enhance(saturation)
    if brightness != 1.0:
        im = ImageEnhance.Brightness(im).enhance(brightness)
    return im


def _gradient():
    gh = int(H * 0.45)
    alpha = np.zeros((H, W), dtype=np.uint8)
    alpha[H - gh:, :] = (195 * (np.linspace(0, 1, gh) ** 1.4)).astype(np.uint8)[:, None]
    rgba = np.zeros((H, W, 4), dtype=np.uint8)
    rgba[..., 3] = alpha
    return Image.fromarray(rgba)


def _vignette():
    yy, xx = np.mgrid[0:H, 0:W]
    r = np.sqrt(((xx - W / 2) / (W / 2)) ** 2 + ((yy - H / 2) / (H / 2)) ** 2)
    v = np.clip(1.0 - 0.38 * np.clip((r - 0.58) / 0.82, 0, 1) ** 1.5, 0, 1)
    arr = (v * 255).astype(np.uint8)
    return Image.merge("RGB", [Image.fromarray(arr)] * 3)


GRADIENT = _gradient()
VIGNETTE = _vignette()


def finish(im):
    im = ImageChops.multiply(im, VIGNETTE)
    return Image.alpha_composite(im.convert("RGBA"), GRADIENT).convert("RGB")


def flash(im, amount):
    if amount <= 0:
        return im
    white = Image.new("RGB", im.size, (255, 255, 255))
    return Image.blend(im, white, min(amount, 1.0))


def tracked_width(draw, s, f, tracking):
    return sum(draw.textlength(c, font=f) for c in s) + tracking * max(len(s) - 1, 0)


def draw_tracked(draw, x, y, s, f, fill, tracking=0, shadow=3):
    cx = x
    for c in s:
        if shadow:
            draw.text((cx + shadow, y + shadow), c, font=f, fill=(0, 0, 0, 190))
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


def centered(layer, y, s, f, fill, tracking=4, shadow=3):
    d = ImageDraw.Draw(layer)
    w = tracked_width(d, s, f, tracking)
    draw_tracked(d, (W - w) / 2, y, s, f, fill, tracking, shadow)


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


def scrim(im, y_center=H * 0.58, half=H * 0.22, alpha=165):
    y = np.arange(H)
    d = np.abs(y - y_center) / half
    a = np.clip(1.0 - d ** 2, 0, 1) ** 1.2 * alpha
    rgba = np.zeros((H, W, 4), dtype=np.uint8)
    rgba[..., 3] = a.astype(np.uint8)[:, None]
    return Image.alpha_composite(im.convert("RGBA"), Image.fromarray(rgba)).convert("RGB")


def ease_out(p):
    return 1 - (1 - p) ** 3


def machine_card(number, name, brand):
    layer = text_layer()
    d = ImageDraw.Draw(layer)
    x = 72
    d.rectangle([x, H - 470, x + 96, H - 463], fill=ORANGE + (255,))
    draw_tracked(d, x, H - 450, number, font(138, IDX_HEAVY), ORANGE + (255,), 4, 4)
    f_name = fit_font(d, name, W - 160, 76, 38, 2)
    draw_tracked(d, x, H - 260, name, f_name, WHITE + (255,), 2, 3)
    draw_tracked(d, x + 2, H - 182, brand.upper(), font(40, IDX_MEDIUM), GREY + (255,), 6, 2)
    return layer


def pan_center(i, local, slot):
    """Push-in lento durante il taglio veloce: l'immagine corre, il cartello resta."""
    p = local / max(slot - 1, 1)
    px = 0.38 + 0.24 * ((i * 17 + 5) % 10) / 10.0 + 0.08 * p
    py = 0.40 + 0.18 * ((i * 23 + 3) % 10) / 10.0
    zoom = 1.12 + 0.22 * p
    return px, py, zoom


def fast_machine(machines, slot, local, idx_offset=0):
    idx = min(local // slot, len(machines) - 1)
    inner = local - idx * slot
    fname, num, label, brand = machines[idx]
    px, py, zoom = pan_center(idx + idx_offset, inner, slot)
    im = finish(grade(shot(fname, zoom=zoom, px=px, py=py)))
    if inner < 2:
        im = flash(im, 0.55 if inner == 0 else 0.22)
    if inner >= 2:
        card = machine_card(num, label, brand)
        im = composite(im, card, min((inner - 2) / 4.0, 1.0))
    return im


def claim_scene(bg_name, lines, local, total, px=0.5, py=0.48):
    """Immagine quasi ferma + testo grande al centro: tempo per leggere."""
    p = local / max(total - 1, 1)
    zoom = 1.18 + 0.04 * p
    im = finish(grade(shot(bg_name, zoom=zoom, px=px, py=py), brightness=0.82))
    im = scrim(im, H * 0.56, H * 0.28, 175)
    layer = text_layer()
    if local >= 8:
        for i, (text, color, size, y_off) in enumerate(lines):
            delay = 8 + i * 10
            if local >= delay:
                a = min((local - delay) / 8.0, 1.0)
                if local >= total - 12:
                    a = min(a, max(0.0, (total - local) / 12.0))
                l = text_layer()
                f = fit_font(ImageDraw.Draw(l), text, W - 160, size, 44, 4)
                centered(l, int(H * y_off), text, f, color + (255,), 5, 0)
                im = composite(im, l, a)
    return im


# ------------------------------------------------------------------ scene
def render_s1(local):
    if local < 10:
        return Image.new("RGB", (W, H), (0, 0, 0))
    im = Image.new("RGB", (W, H), (0, 0, 0))
    if local < 18:
        return im
    a_in = min((local - 18) / 10.0, 1.0)
    a_out = 1.0 if local < 82 else max(0.0, 1.0 - (local - 82) / 10.0)
    layer = text_layer()
    f = fit_font(ImageDraw.Draw(layer), "NON UNA SOLA SPINTA.", W - 140, 98, 52, 5)
    centered(layer, int(H * 0.44), "NON UNA SOLA SPINTA.", f, WHITE + (255,), 5, 0)
    return composite(im, layer, a_in * a_out)


def render_s2(local):
    p = local / 87.0
    im = finish(grade(shot("_athlete", zoom=1.05 + 0.06 * p, px=0.5 - 0.08 * p, py=0.42)))
    im = scrim(im, H * 0.62, H * 0.24, 160)
    if local >= 10:
        a1 = min((local - 10) / 10.0, 1.0)
        layer = text_layer()
        f = font(72, IDX_DEMI)
        centered(layer, int(H * 0.58), "AREA PETTO", f, WHITE + (220,), 14, 0)
        im = composite(im, layer, a1)
    if local >= 28:
        a2 = min((local - 28) / 12.0, 1.0)
        layer = text_layer()
        f = font(156, IDX_HEAVY)
        centered(layer, int(H * 0.66), "12 MACCHINE", f, ORANGE + (255,), 8, 0)
        im = composite(im, layer, a2)
    return im


def render_s3(local):
    return fast_machine(BLOCK_1, SLOT_FAST, local)


def render_s4(local):
    return claim_scene(
        "super-horizontal-multi-press-panatta",
        [("SPINGI DA OGNI ANGOLO.", WHITE, 92, 0.52)],
        local, 100, px=0.48, py=0.44,
    )


def render_s5(local):
    return fast_machine(BLOCK_2, SLOT_FAST, local, idx_offset=6)


def render_s6(local):
    return claim_scene(
        "pec-fly",
        [
            ("APRI.", ORANGE, 118, 0.48),
            ("ISOLA.", WHITE, 118, 0.56),
            ("COSTRUISCI.", WHITE, 92, 0.64),
        ],
        local, 100, px=0.52, py=0.46,
    )


def render_s7(local):
    return fast_machine(MACHINES, SLOT_WHIP, local)


_logo_cache = {}


def logo_img(width):
    if width not in _logo_cache:
        im = Image.open(LOGO).convert("RGBA")
        r = width / im.width
        _logo_cache[width] = im.resize((width, int(im.height * r)), Image.LANCZOS)
    return _logo_cache[width]


def render_s8(local):
    if local < 55:
        p = local / 54.0
        im = finish(grade(shot("chest-press-life-fitness", zoom=1.08 + 0.05 * p, px=0.5, py=0.45)))
        im = scrim(im, H * 0.60, H * 0.26, 170)
        if local >= 4:
            a = min((local - 4) / 8.0, 1.0)
            if local >= 42:
                a = min(a, max(0.0, 1.0 - (local - 42) / 8.0))
            layer = text_layer()
            f = fit_font(ImageDraw.Draw(layer), "12 POSTAZIONI PETTO.", W - 140, 88, 46, 4)
            centered(layer, int(H * 0.54), "12 POSTAZIONI PETTO.", f, WHITE + (255,), 4, 0)
            im = composite(im, layer, a)
        if local >= 48:
            a2 = min((local - 48) / 8.0, 1.0)
            layer = text_layer()
            f = font(120, IDX_HEAVY)
            centered(layer, int(H * 0.62), "OGNI ANGOLO.", f, ORANGE + (255,), 6, 0)
            f2 = font(120, IDX_HEAVY)
            centered(layer, int(H * 0.70), "UN PETTO.", f2, WHITE + (255,), 6, 0)
            im = composite(im, layer, a2)
        return im

    im = Image.new("RGB", (W, H), (8, 6, 5))
    l = local - 55
    if l < 2:
        return im
    a = min((l - 2) / 8.0, 1.0)
    layer = text_layer()
    lg = logo_img(740)
    layer.paste(lg, ((W - lg.width) // 2, int(H * 0.38) - lg.height // 2), lg)
    d = ImageDraw.Draw(layer)
    centered(layer, int(H * 0.50), "LADISPOLI", font(54, IDX_DEMI), WHITE + (230,), 16, 0)
    d.rectangle([W // 2 - 56, int(H * 0.565), W // 2 + 56, int(H * 0.565) + 5], fill=ORANGE + (255,))
    f = fit_font(d, SITE_URL, W - 180, 62, 38, 8)
    centered(layer, int(H * 0.60), SITE_URL, f, ORANGE + (255,), 8, 0)
    return composite(im, layer, a)


RENDERERS = {
    "S1_HOOK": lambda l, f: render_s1(l),
    "S2_INTRO": lambda l, f: render_s2(l),
    "S3_BLOCCO_1": lambda l, f: render_s3(l),
    "S4_CLAIM_1": lambda l, f: render_s4(l),
    "S5_BLOCCO_2": lambda l, f: render_s5(l),
    "S6_CLAIM_2": lambda l, f: render_s6(l),
    "S7_RAFFICA": lambda l, f: render_s7(l),
    "S8_PAYOFF": lambda l, f: render_s8(l),
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
    if len(sys.argv) > 1 and sys.argv[1] == "--preview":
        os.makedirs("/tmp/petto-preview", exist_ok=True)
        for f in [int(x) for x in sys.argv[2].split(",")]:
            render_frame(f).save(f"/tmp/petto-preview/f{f:05d}.jpg", quality=92)
        print("preview ok:", sys.argv[2])
        return

    if os.path.isdir(FRAMES_DIR):
        shutil.rmtree(FRAMES_DIR)
    os.makedirs(FRAMES_DIR)
    print(f"Rendering {TOTAL_FRAMES} frame...")
    for f in range(TOTAL_FRAMES):
        render_frame(f).save(f"{FRAMES_DIR}/f{f:05d}.jpg", quality=90)
        if f % 100 == 0:
            print(f"  {f:5d}/{TOTAL_FRAMES}  {scene_of(f)[0]}")
    print("Frame completati.")


if __name__ == "__main__":
    main()
