#!/bin/bash
# Assembla i frame e la traccia audio nel master verticale dello Spot #2.
#
# I tagli 1:1 e 16:9 NON si ottengono ritagliando questo master: i cartelli
# delle macchine vivono nel terzo inferiore e un crop centrale li decapita.
# Servono render dedicati con il testo riposizionato.
set -e

FRAMES=/tmp/gambe-frames
AUDIO=/tmp/gambe-audio.wav
MEDIA="$(cd "$(dirname "$0")/../.." && pwd)/public/media"
BASE="spot-gambe-21-macchine"

TMP=/tmp/gambe-master.mp4

# Si encoda in /tmp e si copia solo dopo la verifica: il rewrite in-place di
# +faststart sul percorso finale ha prodotto file con NAL corrotti.
echo "== master 9:16 =="
ffmpeg -y -framerate 25 -i "$FRAMES/f%05d.jpg" -i "$AUDIO" \
  -c:v libx264 -preset slower -crf 22 -pix_fmt yuv420p \
  -c:a aac -b:a 256k -ar 44100 \
  -af "loudnorm=I=-14:TP=-1.5:LRA=11" \
  -movflags +faststart -shortest \
  "$TMP"

echo "== verifica integrita' =="
errs=$(ffmpeg -v error -i "$TMP" -f null - 2>&1 | wc -l | tr -d ' ')
frames=$(ffprobe -v error -count_frames -select_streams v:0 \
  -show_entries stream=nb_read_frames -of default=noprint_wrappers=1:nokey=1 "$TMP")
echo "  errori: $errs · frame: $frames"
if [ "$errs" != "0" ] || [ "$frames" != "1300" ]; then
  echo "ENCODE NON VALIDO: non pubblico." >&2
  exit 1
fi

cp "$TMP" "$MEDIA/$BASE.mp4"

echo "== poster (rivelazione della 21a) =="
ffmpeg -y -i "$TMP" -ss 44.2 -frames:v 1 -q:v 2 /tmp/gambe-poster.jpg
cp /tmp/gambe-poster.jpg "$MEDIA/$BASE-poster.jpg"

echo
ls -lh "$MEDIA/$BASE"*
