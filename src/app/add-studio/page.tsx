'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import { StudioForm } from '@/features/studios/StudioForm';
import { Loader2 } from 'lucide-react';

export default function AddStudioPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push('/login?callbackUrl=/add-studio');
    }
  }, [isPending, session, router]);

  if (isPending) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-ss-accent animate-spin" />
        <p className="text-sm text-ss-muted font-medium">Verifying host credentials...</p>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="max-w-4xl mx-auto mb-8 text-center sm:text-left">
        <span className="text-xs uppercase tracking-wider font-bold text-ss-accent bg-ss-accent/10 px-3 py-1 rounded-full">
          Host Studio Listing
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3">
          List Your Creative Space
        </h1>
        <p className="text-ss-muted text-base mt-2">
          Reach thousands of photographers, filmmakers, podcasters, and musicians. Set your hourly
          rates, rules, and availability.
        </p>
      </div>

      <StudioForm
        mode="create"
        userEmail={session.user.email || ''}
        userName={session.user.name || 'Studio Host'}
      />
    </div>
  );
}

