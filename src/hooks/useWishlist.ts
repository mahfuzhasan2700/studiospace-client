'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

const STORAGE_KEY = 'studiospace_wishlist_ids';

export function useWishlist() {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setWishlist(JSON.parse(stored));
      }
    } catch {
      // ignore
    } finally {
      setIsLoaded(true);
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setWishlist(JSON.parse(e.newValue));
        } catch {
          // ignore
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const toggleWishlist = useCallback(
    (studioId: string, studioTitle?: string) => {
      setWishlist((prev) => {
        const exists = prev.includes(studioId);
        let updated: string[];
        if (exists) {
          updated = prev.filter((id) => id !== studioId);
          toast.info(`Removed ${studioTitle ? `"${studioTitle}"` : 'studio'} from saved wishlist`);
        } else {
          updated = [...prev, studioId];
          toast.success(`Saved ${studioTitle ? `"${studioTitle}"` : 'studio'} to wishlist!`);
        }

        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch {
          // ignore
        }
        return updated;
      });
    },
    []
  );

  const isSaved = useCallback(
    (studioId: string) => wishlist.includes(studioId),
    [wishlist]
  );

  return { wishlist, isSaved, toggleWishlist, isLoaded };
}
