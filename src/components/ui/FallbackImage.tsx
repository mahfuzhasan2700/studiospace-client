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

// Guaranteed high-availability studio fallback image
const DEFAULT_FALLBACK = 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80';

/** An external-image-safe renderer for listing URLs that may be missing, 404, or unavailable. */
export function FallbackImage({ src, alt, className = '', loading = 'lazy', sizes }: FallbackImageProps) {
  const [currentSrc, setCurrentSrc] = React.useState<string>(() => {
    const s = typeof src === 'string' ? src.trim() : '';
    return /^https?:\/\//i.test(s) ? s : DEFAULT_FALLBACK;
  });
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const s = typeof src === 'string' ? src.trim() : '';
    const valid = /^https?:\/\//i.test(s) ? s : DEFAULT_FALLBACK;
    setCurrentSrc(valid);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (currentSrc !== DEFAULT_FALLBACK) {
      // Step 1 fallback: try high-availability studio fallback image
      setCurrentSrc(DEFAULT_FALLBACK);
    } else {
      // Step 2 fallback: if even fallback fails, render stylish branded fallback block
      setHasError(true);
    }
  };

  if (hasError) {
    return (
      <div className={`studio-image-fallback ${className}`} role="img" aria-label={alt || 'StudioSpace workspace'}>
        <Aperture aria-hidden="true" className="studio-image-fallback__icon" />
        <span>StudioSpace</span>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt || 'Studio workspace preview'}
      className={className}
      loading={loading}
      decoding="async"
      sizes={sizes}
      onError={handleError}
    />
  );
}
