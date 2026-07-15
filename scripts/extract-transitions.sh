#!/usr/bin/env bash
# Extract scroll-scrub frames from the boundary travel clips, and cut
# the chapter stills from the clip endpoints so footage and backdrop
# are pixel-identical at every seam.
#
# Input : public/transitions/b1.mp4 … b4.mp4 (10s AI travel clips,
#         first/last frames pinned on the chapter scene images)
# Output: public/transitions/bK/f001.jpg … + meta.json per clip
#         public/scenes/ch01.png … ch05.png (frame grabs)
set -euo pipefail
cd "$(dirname "$0")/.."

FPS=12          # 12 fps of a 10s clip = 120 frames per boundary
WIDTH=1280      # plenty under the grade/grain overlay
QUALITY=5       # ffmpeg -q:v (2 best .. 31 worst)
# the generator stamps a small sparkle bottom-right at source res
DELOGO="delogo=x=1674:y=834:w=178:h=160"

for k in 1 2 3 4; do
  src="public/transitions/b${k}.mp4"
  [ -f "$src" ] || { echo "skip b${k} (no clip)"; continue; }
  out="public/transitions/b${k}"
  rm -rf "$out" && mkdir -p "$out"
  ffmpeg -v error -i "$src" -vf "${DELOGO},fps=${FPS},scale=${WIDTH}:-2" -q:v ${QUALITY} "$out/f%03d.jpg"
  n=$(ls "$out" | grep -c '^f[0-9]*\.jpg$')
  printf '{ "frames": %d }\n' "$n" > "$out/meta.json"
  echo "b${k}: ${n} frames"
done

# chapter stills = clip endpoints (full 1920 res, watermark removed)
grab_first() { ffmpeg -v error -i "$1" -vf "$DELOGO" -frames:v 1 -y "$2"; }
grab_last()  { ffmpeg -v error -sseof -0.2 -i "$1" -vf "$DELOGO" -frames:v 1 -update 1 -y "$2"; }
if [ -f public/transitions/b1.mp4 ]; then
  grab_first public/transitions/b1.mp4 public/scenes/ch01.png
  grab_last  public/transitions/b1.mp4 public/scenes/ch02.png
  grab_last  public/transitions/b2.mp4 public/scenes/ch03.png
  grab_last  public/transitions/b3.mp4 public/scenes/ch04.png
  grab_last  public/transitions/b4.mp4 public/scenes/ch05.png
  echo "chapter stills regrabbed from clip endpoints"
fi
