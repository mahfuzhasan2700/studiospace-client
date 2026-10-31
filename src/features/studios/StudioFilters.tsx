'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X } from 'lucide-react';

const categories = [
  { slug: '', label: 'All Studios' },
  { slug: 'photo-studio', label: 'Photo Studios' },
  { slug: 'film-stage', label: 'Sound Stages' },
  { slug: 'podcast-lounge', label: 'Podcast Lounges' },
  { slug: 'music-suite', label: 'Music Suites' },
  { slug: 'workshop', label: 'Art Workshops' }
];

export function StudioFilters({ currentCategory, currentSearch, currentSort }: {
  currentCategory?: string;
  currentSearch?: string;
  currentSort?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = React.useState(currentSearch || '');

  const updateFilter = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, val]) => {
      if (!val) {
        params.delete(key);
      } else {
        params.set(key, val);
      }
    });
    router.push(`/studios?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilter({ search: searchInput.trim() || null });
  };

  const handleClearSearch = () => {
    setSearchInput('');
    updateFilter({ search: null });
  };

  return (
    <div className="space-y-6">
      {/* Search Bar & Sort Dropdown */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ss-muted" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by studio name, area, city, or overview..."
            className="w-full pl-10 pr-10 py-2.5 rounded-control bg-ss-surface border border-ss-control-border text-sm text-ss-text placeholder:text-ss-muted/60 focus:outline-none focus:ring-1 focus:ring-ss-accent"
          />
          {searchInput && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ss-muted hover:text-ss-text"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </form>

        {/* Sort Select */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <SlidersHorizontal className="w-4 h-4 text-ss-muted shrink-0" />
          <select
            value={currentSort || 'newest'}
            onChange={(e) => updateFilter({ sort: e.target.value })}
            className="text-xs px-3 py-2.5 rounded-control bg-ss-surface border border-ss-control-border text-ss-text font-medium focus:outline-none focus:ring-1 focus:ring-ss-accent cursor-pointer"
          >
            <option value="newest">Sort: Newest Added</option>
            <option value="price-asc">Sort: Price (Low to High)</option>
            <option value="price-desc">Sort: Price (High to Low)</option>
            <option value="rating-desc">Sort: Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = (currentCategory || '') === cat.slug;
          return (
            <button
              key={cat.slug}
              type="button"
              onClick={() => updateFilter({ category: cat.slug || null })}
              className={`px-4 py-2 rounded-control text-xs font-semibold whitespace-nowrap transition-colors duration-150 ${
                isSelected
                  ? 'bg-ss-accent text-ss-on-accent shadow-sm'
                  : 'bg-ss-surface border border-ss-divider text-ss-text/80 hover:text-ss-text hover:bg-ss-surface-raised'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Active Filter Badges */}
      {(currentCategory || currentSearch || (currentSort && currentSort !== 'newest')) && (
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-ss-muted font-medium">Active filters:</span>

          {currentCategory && (
            <button
              type="button"
              onClick={() => updateFilter({ category: null })}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-ss-accent/10 text-ss-accent border border-ss-accent/20 hover:bg-ss-accent/20 transition-colors font-medium"
            >
              Category: {categories.find((c) => c.slug === currentCategory)?.label || currentCategory}
              <X className="w-3 h-3" />
            </button>
          )}

          {currentSearch && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-ss-accent/10 text-ss-accent border border-ss-accent/20 hover:bg-ss-accent/20 transition-colors font-medium"
            >
              Search: &quot;{currentSearch}&quot;
              <X className="w-3 h-3" />
            </button>
          )}

          {currentSort && currentSort !== 'newest' && (
            <button
              type="button"
              onClick={() => updateFilter({ sort: null })}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-ss-accent/10 text-ss-accent border border-ss-accent/20 hover:bg-ss-accent/20 transition-colors font-medium"
            >
              Sort: {currentSort}
              <X className="w-3 h-3" />
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              setSearchInput('');
              router.push('/studios');
            }}
            className="text-xs text-ss-muted hover:text-ss-text underline underline-offset-4 ml-1"
          >
            Reset all
          </button>
        </div>
      )}
    </div>
  );
}


