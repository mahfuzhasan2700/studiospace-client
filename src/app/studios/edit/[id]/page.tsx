'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import { fetchStudioById } from '@/lib/api';
import { StudioDetail } from '@/types/studio';
import { StudioForm } from '@/features/studios/StudioForm';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface EditStudioPageProps {
  params: Promise<{ id: string }>;
}

export default function EditStudioPage({ params }: EditStudioPageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [studio, setStudio] = useState<StudioDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push(`/login?callbackUrl=/studios/edit/${resolvedParams.id}`);
      return;
    }

    if (session?.user) {
      fetchStudioById(resolvedParams.id)
        .then((data) => {
          setStudio(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message || 'Failed to load studio details');
          setLoading(false);
        });
    }
  }, [isPending, session, router, resolvedParams.id]);

  if (isPending || loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-ss-accent animate-spin" />
        <p className="text-sm text-ss-muted font-medium">Loading studio details for editing...</p>
      </div>
    );
  }

  if (error || !studio) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold mb-2">Unable to load studio</h2>
        <p className="text-ss-muted mb-6">{error || 'Studio listing not found.'}</p>
        <Link
          href="/my-listings"
          className="px-5 py-2.5 rounded-xl bg-ss-accent text-white font-medium text-sm flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to My Listings
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="max-w-4xl mx-auto mb-8">
        <Link
          href="/my-listings"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-ss-muted hover:text-ss-accent mb-4 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to My Listings
        </Link>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Edit Studio Listing
        </h1>
        <p className="text-ss-muted text-base mt-2">
          Update pricing, amenities, description, and specifications for {studio.title}.
        </p>
      </div>

      <StudioForm
        initialData={studio}
        mode="edit"
        userEmail={session?.user?.email || ''}
        userName={session?.user?.name || 'Studio Host'}
      />
    </div>
  );
}

