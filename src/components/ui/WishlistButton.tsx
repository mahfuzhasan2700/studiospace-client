'use client';

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

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(studioId, studioTitle);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={saved ? 'Remove from saved' : 'Save to wishlist'}
      className={`group flex items-center gap-1.5 transition-all ${className}`}
    >
      <div
        className={`p-2 rounded-full backdrop-blur-md transition-all ${
          saved
            ? 'bg-red-500 text-white shadow-md shadow-red-500/20'
            : 'bg-black/50 text-white hover:bg-black/70 hover:scale-105'
        }`}
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

