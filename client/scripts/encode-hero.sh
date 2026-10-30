#!/usr/bin/env bash
# Re-encode a generated hero video so it can be scrubbed smoothly by scroll.
#
#   ./scripts/encode-hero.sh path/to/wide.mp4            -> public/hero.mp4
#   ./scripts/encode-hero.sh path/to/tall.mp4 mobile     -> public/hero-mobile.mp4
#
# Scrubbing seeks to arbitrary frames, so the file needs a keyframe every few
# frames (-g 3) and no audio. 1920 px wide (900 px on phones) keeps detail
# crisp while the file stays small enough for a hero; a straight 4K export
# would be tens of megabytes.
set -euo pipefail

input="${1:?usage: encode-hero.sh <input.mp4> [mobile]}"
dir="$(dirname "$0")/../public"

if [ "${2:-}" = "mobile" ]; then
  output="$dir/hero-mobile.mp4"
  scale="900:-2"
  crf=23
else
  output="$dir/hero.mp4"
  scale="1920:-2"
  crf=22
fi

ffmpeg -y -i "$input" \
  -vf "scale=$scale" \
  -c:v libx264 -preset slow -crf "$crf" -g 3 -keyint_min 3 -sc_threshold 0 \
  -pix_fmt yuv420p -an -movflags +faststart \
  "$output"

echo "Wrote $output ($(du -h "$output" | cut -f1))"
