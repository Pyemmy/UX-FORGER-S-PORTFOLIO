// Generated from public/assets — intrinsic sizes so images reserve space before loading (no layout shift).
// Re-run `python3 scripts/generate-image-sizes.py` after adding or replacing images.
export const IMAGE_SIZES: Record<string, { w: number; h: number }> = {
  '/assets/photos/avatar.webp': { w: 192, h: 192 },
  '/assets/photos/cooking-strip.webp': { w: 1200, h: 900 },
  '/assets/photos/cooking.webp': { w: 700, h: 1244 },
  '/assets/photos/founder.webp': { w: 1000, h: 1332 },
  '/assets/photos/gaming.webp': { w: 700, h: 933 },
  '/assets/photos/portrait.webp': { w: 1000, h: 1333 },
  '/assets/photos/qas-stage.webp': { w: 768, h: 453 },
  '/assets/photos/speaker-afriai.webp': { w: 900, h: 900 },
  '/assets/photos/stage-tid.webp': { w: 1200, h: 900 },
  '/assets/photos/teaching.webp': { w: 1200, h: 1103 },
  '/assets/projects/babasika-2.webp': { w: 1600, h: 1200 },
  '/assets/projects/babasika.webp': { w: 1440, h: 954 },
  '/assets/projects/forge-ai.webp': { w: 1444, h: 940 },
  '/assets/projects/pocketa-2.webp': { w: 1160, h: 1040 },
  '/assets/projects/pocketa.webp': { w: 1600, h: 1200 },
  '/assets/projects/qualityhub-2.webp': { w: 1600, h: 1200 },
  '/assets/projects/qualityhub.webp': { w: 1438, h: 983 },
  '/assets/projects/quickbill-2.webp': { w: 1600, h: 1222 },
  '/assets/projects/quickbill.webp': { w: 1440, h: 1000 },
  '/assets/projects/ventics-ai-2.webp': { w: 1600, h: 1200 },
  '/assets/projects/ventics-ai-3.webp': { w: 1600, h: 1200 },
  '/assets/projects/ventics-ai.webp': { w: 1440, h: 1007 },
};

export const sizeOf = (src?: string) => (src ? IMAGE_SIZES[src] : undefined);
