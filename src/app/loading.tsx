import React from 'react';

export default function Loading() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full animate-pulse space-y-8">
      {/* Skeleton Header */}
      <div className="space-y-3">
        <div className="h-4 w-32 bg-ss-surface-raised rounded-control" />
        <div className="h-8 w-64 bg-ss-surface-raised rounded-control" />
        <div className="h-4 w-96 bg-ss-surface-raised rounded-control" />
      </div>

      {/* Skeleton Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="rounded-dialog border border-ss-divider bg-ss-surface overflow-hidden space-y-4 p-4"
          >
            <div className="aspect-[4/3] w-full bg-ss-surface-raised rounded-image" />
            <div className="space-y-2">
              <div className="h-4 w-24 bg-ss-surface-raised rounded-control" />
              <div className="h-6 w-3/4 bg-ss-surface-raised rounded-control" />
              <div className="h-4 w-1/2 bg-ss-surface-raised rounded-control" />
            </div>
            <div className="pt-4 border-t border-ss-divider flex justify-between items-center">
              <div className="h-6 w-16 bg-ss-surface-raised rounded-control" />
              <div className="h-8 w-24 bg-ss-surface-raised rounded-control" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
