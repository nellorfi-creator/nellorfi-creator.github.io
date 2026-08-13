#!/usr/bin/env bash
# Homepage intro + hero from high-res stills (1600px) plus the sharper 848p boxe clips.
# Tour 640p is skipped: upscaling it is what made the previous cut look grainy.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
P="$ROOT/public/photos/live"
SACCHI="$ROOT/public/media/boxe/tour-sala-sacchi.mp4"
RING="$ROOT/public/media/boxe/tour-ring.mp4"
OUT_DIR="$ROOT/public/media"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

W=1920
H=1080
FPS=30
ENCODE=(-c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p)

# Gentle grade: no grain, no crush, light denoise before upscale.
VIDEO_VF="hqdn3d=1.0:0.8:2.5:2.5,scale=${W}:${H}:force_original_aspect_ratio=increase:flags=lanczos+accurate_rnd+full_chroma_int,crop=${W}:${H},setsar=1,fps=${FPS},eq=contrast=1.06:saturation=1.05,cas=strength=0.32"

photo_clip() {
  local src="$1" dur="$2" dest="$3" focus="${4:-0.40}"
  local png="$TMP/$(basename "$dest" .mp4).png"
  ffmpeg -y -i "$src" -frames:v 1 "$png"
  # Slow Ken Burns: start ~10% oversampled, push in. Crop keeps 1920x1080.
  ffmpeg -y -loop 1 -framerate "$FPS" -i "$png" -t "$dur" -an \
    -vf "scale=w='trunc((2112+288*t/${dur})/2)*2':h='trunc((1590+216*t/${dur})/2)*2':eval=frame:flags=lanczos,crop=${W}:${H}:(iw-ow)/2:(ih-oh)*${focus},setsar=1,eq=contrast=1.05:saturation=1.04" \
    "${ENCODE[@]}" "$dest"
}

video_clip() {
  local src="$1" start="$2" dur="$3" dest="$4"
  ffmpeg -y -ss "$start" -i "$src" -t "$dur" -an \
    -vf "$VIDEO_VF" \
    "${ENCODE[@]}" "$dest"
}

echo "Photo clips…"
photo_clip "$P/hero-sala.webp" 1.15 "$TMP/c1.mp4" 0.40
photo_clip "$P/philosophy/macchine-centrale.webp" 1.15 "$TMP/c2.mp4" 0.48
photo_clip "$P/philosophy/corridoio-arancio.webp" 1.15 "$TMP/c3.mp4" 0.45
photo_clip "$P/philosophy/plate-row.webp" 1.15 "$TMP/c6.mp4" 0.40
photo_clip "$P/boxe-sacchi.webp" 1.85 "$TMP/c8.mp4" 0.38

echo "Boxe clips…"
video_clip "$SACCHI" 7.4 1.15 "$TMP/c4.mp4"
video_clip "$RING" 15.2 1.15 "$TMP/c5.mp4"
video_clip "$SACCHI" 15.2 1.15 "$TMP/c7.mp4"

ffmpeg -y -f lavfi -i "color=c=0xff4d00:s=${W}x${H}:d=0.06:r=${FPS}" \
  "${ENCODE[@]}" "$TMP/flash.mp4"

{
  echo "file '$TMP/c1.mp4'"
  echo "file '$TMP/flash.mp4'"
  echo "file '$TMP/c2.mp4'"
  echo "file '$TMP/flash.mp4'"
  echo "file '$TMP/c3.mp4'"
  echo "file '$TMP/flash.mp4'"
  echo "file '$TMP/c4.mp4'"
  echo "file '$TMP/flash.mp4'"
  echo "file '$TMP/c5.mp4'"
  echo "file '$TMP/flash.mp4'"
  echo "file '$TMP/c6.mp4'"
  echo "file '$TMP/flash.mp4'"
  echo "file '$TMP/c7.mp4'"
  echo "file '$TMP/flash.mp4'"
  echo "file '$TMP/c8.mp4'"
} > "$TMP/list.txt"

echo "Concat intro…"
ffmpeg -y -f concat -safe 0 -i "$TMP/list.txt" -an \
  "${ENCODE[@]}" -movflags +faststart \
  "$OUT_DIR/intro-cinematic.mp4"

echo "Hero loop from stills…"
photo_clip "$P/hero-sala.webp" 7.2 "$TMP/h1.mp4" 0.40
photo_clip "$P/philosophy/macchine-centrale.webp" 7.2 "$TMP/h2.mp4" 0.48
ffmpeg -y -i "$TMP/h1.mp4" -i "$TMP/h2.mp4" -filter_complex \
  "[0:v][1:v]xfade=transition=fade:duration=1.1:offset=6.1,fade=t=in:st=0:d=0.55,fade=t=out:st=11.35:d=0.75,setsar=1" \
  -an "${ENCODE[@]}" -movflags +faststart \
  "$OUT_DIR/hero-loop.mp4"

echo "Done."
ls -lh "$OUT_DIR/intro-cinematic.mp4" "$OUT_DIR/hero-loop.mp4"
ffprobe -v error -show_entries format=duration,size -of default=noprint_wrappers=1 "$OUT_DIR/intro-cinematic.mp4"
echo '---'
ffprobe -v error -show_entries format=duration,size -of default=noprint_wrappers=1 "$OUT_DIR/hero-loop.mp4"
