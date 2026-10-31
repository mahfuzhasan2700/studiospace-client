'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heart, ArrowRight, Loader2 } from 'lucide-react';
import { useWishlist } from '@/hooks/useWishlist';
import { fetchStudios } from '@/lib/api';
import { Studio } from '@/types/studio';
import { StudioCard } from '@/components/ui/StudioCard';

export default function SavedStudiosPage() {
  const { wishlist, isLoaded } = useWishlist();
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    if (wishlist.length === 0) {
      setStudios([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchStudios({ limit: 50 })
      .then((res) => {
        const savedList = res.data.filter((s) => wishlist.includes(s.id));
        setStudios(savedList);
      })
      .catch(() => setStudios([]))
      .finally(() => setLoading(false));
  }, [wishlist, isLoaded]);

  if (!isLoaded || loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-ss-accent animate-spin" />
        <p className="text-sm text-ss-muted font-medium">Loading saved studios...</p>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="pb-8 border-b border-ss-border">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-500 mb-1">
          <Heart className="w-4 h-4 fill-current" /> My Saved Spaces
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">Saved Studios Wishlist</h1>
        <p className="text-ss-muted text-sm mt-1">
          Workspaces you bookmarked for upcoming video productions, photo shoots, and recording
          sessions.
        </p>
      </div>

      {studios.length === 0 ? (
        /* Empty State */
        <div className="my-16 text-center max-w-md mx-auto p-8 rounded-3xl bg-ss-surface border border-ss-border">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold tracking-tight">Your Wishlist is Empty</h3>
          <p className="text-ss-muted text-sm mt-2 mb-6">
            Click the heart icon on any studio card or detail page to save spaces for quick
            booking later.
          </p>
          <Link
            href="/studios"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-ss-accent text-white font-semibold text-sm hover:opacity-90 transition-all shadow-lg shadow-ss-accent/20"
          >
            Explore Studios <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        /* Grid */
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {studios.map((studio) => (
            <StudioCard key={studio.id} studio={studio} />
          ))}
        </div>
      )}
    </div>
  );
}
