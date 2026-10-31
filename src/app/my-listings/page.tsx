'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';
import {
  Building2,
  Plus,
  Edit3,
  Trash2,
  ExternalLink,
  MapPin,
  Clock,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useSession } from '@/lib/auth-client';
import { fetchMyStudios, deleteStudio } from '@/lib/api';
import { Studio } from '@/types/studio';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';

export default function MyListingsPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Deletion modal state
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [studioToDelete, setStudioToDelete] = useState<Studio | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push('/login?callbackUrl=/my-listings');
      return;
    }

    if (session?.user) {
      loadListings();
    }
  }, [isPending, session, router]);

  const loadListings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchMyStudios();
      setStudios(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load your studio listings');
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (studio: Studio) => {
    setStudioToDelete(studio);
    setDeletingId(studio.id);
  };

  const closeDeleteModal = () => {
    setStudioToDelete(null);
    setDeletingId(null);
  };

  const handleConfirmDelete = async () => {
    if (!deletingId) return;

    try {
      setIsDeleting(true);
      await deleteStudio(deletingId);
      toast.success('Studio listing deleted successfully.');
      setStudios((prev) => prev.filter((s) => s.id !== deletingId));
      closeDeleteModal();
    } catch (err: any) {
      toast.error(err.message || 'Could not delete studio listing.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (isPending || loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-ss-accent animate-spin" />
        <p className="text-sm text-ss-muted font-medium">Loading your studio spaces...</p>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-ss-border">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">My Studio Listings</h1>
          <p className="text-ss-muted text-sm mt-1">
            Manage your spaces, update pricing, and monitor listing status.
          </p>
        </div>

        <Link
          href="/add-studio"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-ss-accent text-white font-semibold text-sm hover:opacity-90 shadow-md shadow-ss-accent/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add New Studio
        </Link>
      </div>

      {error ? (
        <div className="my-12 p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-center max-w-lg mx-auto">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <h3 className="font-semibold text-red-500">Failed to load listings</h3>
          <p className="text-xs text-ss-muted mt-1 mb-4">{error}</p>
          <button
            onClick={loadListings}
            className="px-4 py-2 bg-ss-surface border border-ss-border rounded-xl text-xs font-semibold hover:border-ss-accent"
          >
            Retry
          </button>
        </div>
      ) : studios.length === 0 ? (
        /* Empty State */
        <div className="my-16 text-center max-w-md mx-auto p-8 rounded-3xl bg-ss-surface border border-ss-border">
          <div className="w-16 h-16 rounded-2xl bg-ss-accent/10 text-ss-accent flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold tracking-tight">No Studio Listings Yet</h3>
          <p className="text-ss-muted text-sm mt-2 mb-6">
            You haven't listed any creative studios. Start earning by sharing your soundstage,
            photo loft, or podcast suite with creators.
          </p>
          <Link
            href="/add-studio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-ss-accent text-white font-semibold text-sm hover:opacity-90 transition-all shadow-lg shadow-ss-accent/20"
          >
            <Plus className="w-4 h-4" /> Create Your First Listing
          </Link>
        </div>
      ) : (
        /* Listings Grid / Table */
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studios.map((studio) => (
            <div
              key={studio.id}
              className="bg-ss-surface border border-ss-border rounded-2xl overflow-hidden flex flex-col hover:border-ss-accent/40 transition-all shadow-sm"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[16/10] bg-ss-bg overflow-hidden group">
                <Image
                  src={studio.imageUrl}
                  alt={studio.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-white text-xs font-medium">
                  {studio.category.replace('-', ' ')}
                </span>
                <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-ss-surface/90 backdrop-blur-md text-ss-text font-bold text-xs">
                  ${(studio.hourlyRateCents / 100).toFixed(0)} / hr
                </span>
              </div>

              {/* Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg text-ss-text line-clamp-1 mb-1.5">
                    {studio.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-ss-muted mb-3">
                    <MapPin className="w-3.5 h-3.5 text-ss-accent shrink-0" />
                    <span className="truncate">{studio.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-ss-muted pt-2 border-t border-ss-border">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Listed: {new Date(studio.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 mt-4 border-t border-ss-border">
                  <Link
                    href={`/studios/${studio.id}`}
                    className="p-2 rounded-xl border border-ss-border text-ss-muted hover:text-ss-text hover:border-ss-accent transition-colors"
                    title="View Public Page"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  <Link
                    href={`/studios/edit/${studio.id}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-ss-border text-xs font-semibold hover:border-ss-accent text-ss-text transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit
                  </Link>

                  <button
                    type="button"
                    onClick={() => openDeleteModal(studio)}
                    className="p-2 rounded-xl border border-red-500/20 text-red-500 hover:bg-red-500/10 transition-colors"
                    title="Delete Listing"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Custom Confirmation Modal (No browser confirm()!) */}
      <ConfirmDialog
        isOpen={!!studioToDelete}
        title="Delete Studio Listing?"
        description={`Are you sure you want to permanently delete "${studioToDelete?.title}"? This listing will be immediately removed from search results.`}
        confirmLabel="Yes, Delete Listing"
        cancelLabel="Keep Listing"
        isDestructive={true}
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onClose={closeDeleteModal}
      />
    </div>
  );
}

