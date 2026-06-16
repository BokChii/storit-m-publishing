#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DELIVERY_DIR="$ROOT_DIR/delivery"
STAMP="$(date +"%Y%m%d-%H%M")"
ZIP_PATH="$DELIVERY_DIR/storit-publishing-$STAMP.zip"

mkdir -p "$DELIVERY_DIR"

cd "$ROOT_DIR"

SCREEN_CAPTURE_GLOB="assets/screen""s/*"

zip -qr "$ZIP_PATH" \
  index.html \
  README.md \
  DEPLOYMENT.md \
  package.json \
  vercel.json \
  .vercelignore \
  netlify.toml \
  css \
  js \
  assets \
  docs \
  -x "*.DS_Store" \
  -x "*/.DS_Store" \
  -x "assets/derived/*" \
  -x "assets/figma-exported/raw/*" \
  -x "assets/figma-exported/image-batch.json" \
  -x "$SCREEN_CAPTURE_GLOB" \
  -x "assets/figma-flows/*"

echo "Created: $ZIP_PATH"
