'use client';

import * as React from 'react';
import { Aperture } from 'lucide-react';

type FallbackImageProps = {
  src?: string | null;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  sizes?: string;
};

/** An external-image-safe renderer for listing URLs that may be missing or unavailable. */
export function FallbackImage({ src, alt, className = '', loading = 'lazy', sizes }: FallbackImageProps) {
  const [failedSrc, setFailedSrc] = React.useState<string | null>(null);
  const validSrc = typeof src === 'string' && /^https?:\/\//i.test(src.trim()) ? src.trim() : '';
  const showFallback = !validSrc || failedSrc === validSrc;

  React.useEffect(() => {
    if (validSrc !== failedSrc) setFailedSrc(null);
  }, [failedSrc, validSrc]);

  if (showFallback) {
    return (
      <div className={`studio-image-fallback ${className}`} role="img" aria-label={alt}>
        <Aperture aria-hidden="true" className="studio-image-fallback__icon" />
        <span>StudioSpace</span>
      </div>
    );
  }

  return (
    <img
      src={validSrc}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      sizes={sizes}
      onError={() => setFailedSrc(validSrc)}
    />
  );
}
