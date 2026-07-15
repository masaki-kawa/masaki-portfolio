#!/usr/bin/env bash
# Extract scroll-scrub frames from the boundary travel clips.
#
# Input : public/transitions/b1.mp4 … b4.mp4 (AI-generated camera moves,
#         first frame = previous chapter's scene, last frame = next one)
# Output: public/transitions/bK/f001.jpg … + meta.json per clip
#
# Frames are what the site actually loads; the mp4 itself never ships.
set -euo pipefail
cd "$(dirname "$0")/.."

FPS=12          # 12 fps of a ~5s clip ≈ 60 frames per boundary
WIDTH=1280      # plenty under the grade/grain overlay
QUALITY=5       # ffmpeg -q:v (2 best .. 31 worst)

for k in 1 2 3 4; do
  src="public/transitions/b${k}.mp4"
  [ -f "$src" ] || { echo "skip b${k} (no clip)"; continue; }
  out="public/transitions/b${k}"
  rm -rf "$out" && mkdir -p "$out"
  ffmpeg -v error -i "$src" -vf "fps=${FPS},scale=${WIDTH}:-2" -q:v ${QUALITY} "$out/f%03d.jpg"
  n=$(ls "$out" | grep -c '^f[0-9]*\.jpg$')
  printf '{ "frames": %d }\n' "$n" > "$out/meta.json"
  echo "b${k}: ${n} frames"
done
