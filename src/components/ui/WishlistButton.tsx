'use client';

import * as React from 'react';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/hooks/useWishlist';

interface WishlistButtonProps {
  studioId: string;
  studioTitle?: string;
  className?: string;
  showText?: boolean;
}

export function WishlistButton({
  studioId,
  studioTitle,
  className = '',
  showText = false
}: WishlistButtonProps) {
  const { isSaved, toggleWishlist } = useWishlist();
  const saved = isSaved(studioId);
  const [justClicked, setJustClicked] = React.useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setJustClicked(true);
    setTimeout(() => setJustClicked(false), 350);
    toggleWishlist(studioId, studioTitle);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={saved ? 'Remove from saved' : 'Save to wishlist'}
      className={`group flex items-center gap-1.5 transition-all ${justClicked ? 'scale-110' : ''} ${className}`}
    >
      <div
        className={`p-2 rounded-full backdrop-blur-md transition-all ${
          saved
            ? 'bg-red-500 text-white shadow-md shadow-red-500/20'
            : 'bg-black/50 text-white hover:bg-black/70 hover:scale-105'
        } ${justClicked ? 'animate-heart-pop' : ''}`}
      >
        <Heart
          className={`w-4 h-4 transition-transform duration-200 ${
            saved ? 'fill-current scale-110' : 'group-hover:scale-110'
          }`}
        />
      </div>
      {showText && (
        <span className="text-xs font-semibold">
          {saved ? 'Saved in Wishlist' : 'Save to Wishlist'}
        </span>
      )}
    </button>
  );
}

