import React, { useLayoutEffect, useRef, useState } from 'react';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  /** Rendered instead of the image if it fails to load (e.g. a screenshot not added yet). */
  fallback?: React.ReactNode;
  /** Fade the image in once decoded to avoid harsh pop-in. */
  fadeIn?: boolean;
}

// useLayoutEffect warns during server rendering; it's a no-op there anyway.
const useIsoLayoutEffect = typeof window === 'undefined' ? () => {} : useLayoutEffect;

/** <img> with lazy loading, async decoding, fade-in, and a graceful fallback. */
export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  fallback = null,
  fadeIn = true,
  className = '',
  loading = 'lazy',
  onLoad,
  onError,
  ...rest
}) => {
  const ref = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);
  // Start "loaded" so pre-rendered HTML never hides images; the client decides on mount.
  const [loaded, setLoaded] = useState(true);

  // The page is pre-rendered, so an image may finish (or fail) before React hydrates and
  // attaches onLoad/onError. Check the real state on mount instead of waiting for events.
  useIsoLayoutEffect(() => {
    const img = ref.current;
    if (!img) return;
    if (img.complete) {
      if (img.naturalWidth === 0) setFailed(true);
      return; // already decoded: keep it visible, no fade needed
    }
    if (fadeIn) setLoaded(false);
  }, [src, fadeIn]);

  if (failed) return <>{fallback}</>;

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      draggable={false}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      onError={(e) => {
        setFailed(true);
        onError?.(e);
      }}
      className={`${className} ${fadeIn ? `transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}` : ''}`}
      {...rest}
    />
  );
};
