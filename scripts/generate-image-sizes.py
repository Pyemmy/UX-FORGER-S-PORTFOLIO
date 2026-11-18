#!/usr/bin/env python3
"""Regenerate src/data/imageSizes.ts after adding or replacing images in public/assets.

Usage:  python3 scripts/generate-image-sizes.py      (needs Pillow: pip install pillow)
Images with known sizes reserve their space before loading, so the page never jumps.
"""
import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS = os.path.join(ROOT, "public", "assets")
OUT = os.path.join(ROOT, "src", "data", "imageSizes.ts")

lines = [
    "// Generated from public/assets — intrinsic sizes so images reserve space before loading (no layout shift).",
    "// Re-run `python3 scripts/generate-image-sizes.py` after adding or replacing images.",
    "export const IMAGE_SIZES: Record<string, { w: number; h: number }> = {",
]
for folder, _, files in sorted(os.walk(ASSETS)):
    for name in sorted(files):
        if not name.lower().endswith((".webp", ".png", ".jpg", ".jpeg", ".avif")):
            continue
        path = os.path.join(folder, name)
        w, h = Image.open(path).size
        url = "/" + os.path.relpath(path, os.path.join(ROOT, "public")).replace(os.sep, "/")
        lines.append(f"  '{url}': {{ w: {w}, h: {h} }},")
lines += ["};", "", "export const sizeOf = (src?: string) => (src ? IMAGE_SIZES[src] : undefined);", ""]
with open(OUT, "w") as f:
    f.write("\n".join(lines))
print(f"wrote {OUT}")
