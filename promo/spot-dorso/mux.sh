#!/bin/bash
set -e
FRAMES=/tmp/dorso-frames
AUDIO=/tmp/dorso-audio.wav
TMP=/tmp/dorso-master.mp4
MEDIA="$(cd "$(dirname "$0")/../.." && pwd)/public/media"
BASE="spot-dorso-10-macchine"

ffmpeg -y -framerate 25 -i "$FRAMES/f%05d.jpg" -i "$AUDIO" \
  -c:v libx264 -preset slower -crf 22 -pix_fmt yuv420p \
  -c:a aac -b:a 256k -ar 44100 \
  -af "loudnorm=I=-14:TP=-1.5:LRA=11" \
  -movflags +faststart -shortest "$TMP"

errs=$(ffmpeg -v error -i "$TMP" -f null - 2>&1 | wc -l | tr -d ' ')
frames=$(ffprobe -v error -count_frames -select_streams v:0 \
  -show_entries stream=nb_read_frames -of default=noprint_wrappers=1:nokey=1 "$TMP")
echo "errori: $errs · frame: $frames (attesi 850)"
[ "$errs" = "0" ] || exit 1

cp "$TMP" "$MEDIA/$BASE.mp4"
ffmpeg -y -i "$TMP" -ss 26.0 -frames:v 1 -update 1 -q:v 2 /tmp/dorso-poster.jpg
cp /tmp/dorso-poster.jpg "$MEDIA/$BASE-poster.jpg"
ls -lh "$MEDIA/$BASE"*
