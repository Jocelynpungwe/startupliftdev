#!/usr/bin/env bash
# Re-encode a generated hero video so it can be scrubbed smoothly by scroll.
#
#   ./scripts/encode-hero.sh path/to/original.mp4
#
# Scrubbing seeks to arbitrary frames, so the file needs a keyframe every few
# frames (-g 3) and no audio. The downscale keeps the file small enough for a
# hero (a straight 4K export would be tens of megabytes).
set -euo pipefail

input="${1:?usage: encode-hero.sh <input.mp4>}"
output="$(dirname "$0")/../public/hero.mp4"

ffmpeg -y -i "$input" \
  -vf "scale=1600:-2" \
  -c:v libx264 -preset slow -crf 26 -g 3 -keyint_min 3 -sc_threshold 0 \
  -pix_fmt yuv420p -an -movflags +faststart \
  "$output"

echo "Wrote $output ($(du -h "$output" | cut -f1))"
