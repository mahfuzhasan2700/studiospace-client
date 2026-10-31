import React from 'react';
import { StudioFilters } from '@/features/studios/StudioFilters';
import { StudioCard } from '@/components/ui/StudioCard';
import { fetchStudios } from '@/lib/api';
import { Studio } from '@/types/studio';
import { Sparkles, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default async function StudiosPage(props: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const category = searchParams.category;
  const search = searchParams.search;
  const sort = (searchParams.sort as any) || 'newest';
  const page = parseInt(searchParams.page || '1', 10) || 1;

  let studios: Studio[] = [];
  let meta = { page: 1, limit: 12, total: 0, totalPages: 1 };

  try {
    const res = await fetchStudios({ category, search, sort, page, limit: 24 });
    studios = res.data;
    meta = res.meta;
  } catch (err) {
    console.error('Failed to fetch studios:', err);
  }

  return (
    <div className="py-12 bg-ss-bg min-h-screen">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Title */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-ss-accent font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Marketplace Catalog</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-ss-text">
            Explore Creative Production Studios
          </h1>
          <p className="text-sm text-ss-muted max-w-2xl leading-relaxed">
            Discover and reserve vetted cyclorama walls, sound stages, podcast recording lounges, and maker workshops with transparent hourly pricing.
          </p>
        </div>

        {/* Search, Filter Pills & Sort Controls */}
        <StudioFilters
          currentCategory={category}
          currentSearch={search}
          currentSort={sort}
        />

        {/* Results Count Bar */}
        <div className="flex items-center justify-between text-xs font-mono text-ss-muted border-b border-ss-divider pb-3">
          <span>
            Showing <strong className="text-ss-text font-bold">{studios.length}</strong> of{' '}
            <strong className="text-ss-text font-bold">{meta.total}</strong> spaces available
          </span>
          {(category || search) && (
            <Link
              href="/studios"
              className="inline-flex items-center gap-1 text-ss-accent hover:underline font-semibold"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset all filters</span>
            </Link>
          )}
        </div>

        {/* Studios Grid */}
        {studios.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-ss-divider rounded-dialog bg-ss-surface p-8 max-w-lg mx-auto space-y-4">
            <p className="font-heading font-bold text-lg text-ss-text">No Studios Found</p>
            <p className="text-xs text-ss-muted leading-relaxed">
              We couldn&apos;t find any studios matching your current search parameters. Try adjusting your category or clearing keyword filters.
            </p>
            <div>
              <Link
                href="/studios"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-control text-xs font-semibold bg-ss-accent text-ss-on-accent hover:bg-ss-accent-hover transition-colors shadow-sm"
              >
                Reset All Filters
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {studios.map((studio) => (
              <StudioCard key={studio.id} studio={studio} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
