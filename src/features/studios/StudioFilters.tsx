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
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md group">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ss-muted transition-colors group-focus-within:text-ss-accent" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by studio name, area, city, or overview..."
            className="w-full pl-10 pr-10 py-2.5 rounded-full bg-ss-surface/80 backdrop-blur-md border border-ss-control-border text-sm text-ss-text placeholder:text-ss-muted/60 transition-all duration-200 focus:outline-none focus:border-ss-accent focus:ring-2 focus:ring-ss-accent/20 focus:bg-ss-surface"
          />
          {searchInput && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-ss-muted hover:text-ss-text hover:bg-ss-surface-raised transition-colors"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </form>

        {/* Sort Select */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <SlidersHorizontal className="w-4 h-4 text-ss-muted shrink-0" />
          <select
            value={currentSort || 'newest'}
            onChange={(e) => updateFilter({ sort: e.target.value })}
            className="text-xs px-3.5 py-2.5 rounded-full bg-ss-surface/80 backdrop-blur-md border border-ss-control-border text-ss-text font-medium transition-all duration-200 focus:outline-none focus:border-ss-accent focus:ring-2 focus:ring-ss-accent/20 cursor-pointer hover:border-ss-accent/40"
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
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 active:scale-95 ${
                isSelected
                  ? 'bg-ss-accent text-ss-on-accent shadow-md shadow-ss-accent/25 scale-[1.02]'
                  : 'bg-ss-surface/70 backdrop-blur-sm border border-ss-divider text-ss-text/80 hover:text-ss-text hover:bg-ss-surface-raised hover:border-ss-accent/30 hover:scale-[1.02]'
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
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ss-accent/10 text-ss-accent border border-ss-accent/25 hover:bg-ss-accent/20 transition-all font-medium hover:scale-105 active:scale-95"
            >
              <span>Category: {categories.find((c) => c.slug === currentCategory)?.label || currentCategory}</span>
              <X className="w-3 h-3" />
            </button>
          )}

          {currentSearch && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ss-accent/10 text-ss-accent border border-ss-accent/25 hover:bg-ss-accent/20 transition-all font-medium hover:scale-105 active:scale-95"
            >
              <span>Search: &quot;{currentSearch}&quot;</span>
              <X className="w-3 h-3" />
            </button>
          )}

          {currentSort && currentSort !== 'newest' && (
            <button
              type="button"
              onClick={() => updateFilter({ sort: null })}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ss-accent/10 text-ss-accent border border-ss-accent/25 hover:bg-ss-accent/20 transition-all font-medium hover:scale-105 active:scale-95"
            >
              <span>Sort: {currentSort}</span>
              <X className="w-3 h-3" />
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              setSearchInput('');
              router.push('/studios');
            }}
            className="text-xs text-ss-muted hover:text-ss-accent font-medium underline underline-offset-4 ml-1 transition-colors"
          >
            Reset all
          </button>
        </div>
      )}
    </div>
  );
}


