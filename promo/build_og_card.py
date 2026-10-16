#!/usr/bin/env python3
"""Open Graph card for revengegymboxe.it — the image WhatsApp and Facebook show when the link is pasted."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public/media/og-vieni-a-trovarci.jpg"
PHOTO = ROOT / "public/photos/live/sala-panoramica-oggi.webp"
LOGO = ROOT / "public/brand/revenge-gym-logo.png"
FONT = Path("/System/Library/Fonts/Supplemental/DIN Condensed Bold.ttf")

W, H = 1200, 630
ORANGE = (255, 77, 0, 255)
WHITE = (255, 255, 255, 255)
MUTED = (214, 214, 214, 255)


def font(size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONT), size=size)


def cover(src: Image.Image, box: tuple[int, int], focus_y: float) -> Image.Image:
    tw, th = box
    scale = max(tw / src.width, th / src.height)
    resized = src.resize((round(src.width * scale), round(src.height * scale)), Image.Resampling.LANCZOS)
    left = max(0, (resized.width - tw) // 2)
    top = max(0, min(resized.height - th, round((resized.height - th) * focus_y)))
    return resized.crop((left, top, left + tw, top + th))


def logo_mark() -> Image.Image:
    im = Image.open(LOGO).convert("RGBA")
    pixels = im.getdata()
    keyed = []
    for r, g, b, a in pixels:
        if r < 28 and g < 28 and b < 28:
            keyed.append((r, g, b, 0))
        else:
            keyed.append((r, g, b, a))
    im.putdata(keyed)
    bbox = im.getbbox()
    if bbox:
        im = im.crop(bbox)
    target_w = 430
    target_h = round(im.height * (target_w / im.width))
    return im.resize((target_w, target_h), Image.Resampling.LANCZOS)


def main() -> None:
    photo = Image.open(PHOTO).convert("RGB")
    photo = cover(photo, (W, H), focus_y=0.42)
    photo = ImageEnhance.Brightness(photo).enhance(0.9)
    photo = ImageEnhance.Contrast(photo).enhance(1.06)
    photo = ImageEnhance.Color(photo).enhance(1.08)

    card = photo.convert("RGBA")
    shade = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    pix = shade.load()
    for x in range(W):
        if x < 500:
            alpha = 236
        elif x < 920:
            t = (x - 500) / (920 - 500)
            t = t * t * (3 - 2 * t)
            alpha = round(236 * (1 - t))
        else:
            alpha = 0
        for y in range(H):
            pix[x, y] = (8, 8, 8, alpha)
    card = Image.alpha_composite(card, shade)

    # Soft vignette on the far right so the fluorescent ceiling does not blow out the edge.
    vignette = Image.new("L", (W, H), 0)
    vp = vignette.load()
    for y in range(H):
        for x in range(W):
            edge = max(0, (x - 980) / 220, (y - 520) / 140, (80 - y) / 160)
            vp[x, y] = min(255, round(edge * 90))
    dark = Image.new("RGBA", (W, H), (0, 0, 0, 255))
    card = Image.composite(dark, card, vignette.filter(ImageFilter.GaussianBlur(8)))

    draw = ImageDraw.Draw(card)
    mark = logo_mark()
    text_x = 56
    headline = "VIENI A TROVARCI"
    place = "VIA BERNA 8   ·   LADISPOLI"
    url = "revengegymboxe.it"
    f_head = font(78)
    f_place = font(30)
    f_url = font(28)

    block_h = mark.height + 28 + 6 + 22 + 78 + 16 + 30 + 18 + 28
    y = (H - block_h) // 2

    card.paste(mark, (text_x, y), mark)
    y += mark.height + 28
    draw.rectangle((text_x, y, text_x + 72, y + 6), fill=ORANGE)
    y += 6 + 22
    draw.text((text_x, y), headline, font=f_head, fill=WHITE)
    y += 78 + 16
    draw.text((text_x, y), place, font=f_place, fill=MUTED)
    y += 30 + 18
    draw.text((text_x, y), url, font=f_url, fill=ORANGE)

    rgb = card.convert("RGB")
    OUT.parent.mkdir(parents=True, exist_ok=True)
    rgb.save(OUT, format="JPEG", quality=86, optimize=True, progressive=False)
    print(f"{OUT}  {OUT.stat().st_size} bytes")


if __name__ == "__main__":
    main()
