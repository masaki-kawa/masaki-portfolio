#!/usr/bin/env bash
# Prepare the boundary travel clips for scroll scrubbing, and cut the
# chapter stills from the clip endpoints so footage and backdrop are
# pixel-identical at every seam.
#
# Input : public/transitions/b1.mp4 … b4.mp4 (10s AI travel clips,
#         first/last frames pinned on the chapter scene images)
# Output: public/transitions/bK.scrub.mp4  — all-intra encode: every
#         frame is a keyframe, so video.currentTime seeks land
#         instantly on any frame (scroll position = playhead)
#         public/scenes/ch01.png … ch05.png (frame grabs)
set -euo pipefail
cd "$(dirname "$0")/.."

WIDTH=1152      # plenty under the grade/grain overlay
CRF=23          # all-intra inflates size; 23 keeps clips ~8-12MB
# the generator stamps a small sparkle bottom-right at source res
DELOGO="delogo=x=1674:y=834:w=178:h=160"

for k in 1 2 3 4; do
  src="public/transitions/b${k}.mp4"
  [ -f "$src" ] || { echo "skip b${k} (no clip)"; continue; }
  ffmpeg -v error -i "$src" -vf "${DELOGO},scale=${WIDTH}:-2" -an \
    -c:v libx264 -preset slow -crf ${CRF} -g 1 -pix_fmt yuv420p \
    -movflags +faststart -y "public/transitions/b${k}.scrub.mp4"
  echo "b${k}.scrub.mp4: $(du -h "public/transitions/b${k}.scrub.mp4" | cut -f1)"
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
