#!/usr/bin/env bash
# Cinematic homepage intro + hero loop from existing gym footage.
# Sources are low-res; grade/crop/grain hide the upscale on a dark overlay.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TOUR="$ROOT/public/media/revenge-gym-tour.mp4"
SACCHI="$ROOT/public/media/boxe/tour-sala-sacchi.mp4"
RING="$ROOT/public/media/boxe/tour-ring.mp4"
OUT_DIR="$ROOT/public/media"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

GRADE="scale=1280:720:force_original_aspect_ratio=increase:flags=lanczos,crop=1280:720,setsar=1,fps=30,eq=contrast=1.28:brightness=-0.08:saturation=1.16:gamma=0.88,unsharp=5:5:0.5,vignette=PI/5,noise=alls=7:allf=t"

cut_clip() {
  local src="$1" start="$2" dur="$3" dest="$4"
  ffmpeg -y -ss "$start" -i "$src" -t "$dur" -an \
    -vf "$GRADE" \
    -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p \
    "$dest"
}

echo "Cutting intro clips…"
cut_clip "$TOUR"  20.0 1.15 "$TMP/c1.mp4"
cut_clip "$TOUR"  27.4 1.15 "$TMP/c2.mp4"
cut_clip "$TOUR"  15.4 1.15 "$TMP/c3.mp4"
cut_clip "$SACCHI" 7.4 1.15 "$TMP/c4.mp4"
cut_clip "$RING"  15.2 1.15 "$TMP/c5.mp4"
cut_clip "$TOUR"  33.4 1.15 "$TMP/c6.mp4"
cut_clip "$SACCHI" 15.2 1.15 "$TMP/c7.mp4"
cut_clip "$TOUR"  39.2 1.85 "$TMP/c8.mp4"

ffmpeg -y -f lavfi -i "color=c=0xff4d00:s=1280x720:d=0.06:r=30" \
  -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p "$TMP/flash.mp4"

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
  -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart \
  "$OUT_DIR/intro-cinematic.mp4"

echo "Hero loop…"
ffmpeg -y -ss 18.2 -i "$TOUR" -t 12 -an \
  -vf "${GRADE},setpts=1.18*PTS,fade=t=in:st=0:d=0.7,fade=t=out:st=13.3:d=0.7" \
  -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p -movflags +faststart \
  "$OUT_DIR/hero-loop.mp4"

echo "Done."
ls -lh "$OUT_DIR/intro-cinematic.mp4" "$OUT_DIR/hero-loop.mp4"
ffprobe -v error -show_entries format=duration,size -of default=noprint_wrappers=1 "$OUT_DIR/intro-cinematic.mp4"
ffprobe -v error -show_entries format=duration,size -of default=noprint_wrappers=1 "$OUT_DIR/hero-loop.mp4"
