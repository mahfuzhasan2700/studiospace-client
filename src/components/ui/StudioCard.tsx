import React from 'react';
import Link from 'next/link';
import { MapPin, Users, Star, ArrowUpRight } from 'lucide-react';
import { Studio } from '@/types/studio';
import { WishlistButton } from './WishlistButton';


const categoryLabels: Record<string, string> = {
  'photo-studio': 'Photo Studio',
  'film-stage': 'Film Stage',
  'podcast-lounge': 'Podcast Lounge',
  'music-suite': 'Music Suite',
  'workshop': 'Workshop'
};

export function StudioCard({ studio }: { studio: Studio }) {
  const priceDollars = Math.round(studio.hourlyRateCents / 100);
  const formattedCategory = categoryLabels[studio.category] || studio.category;

  return (
    <div className="group flex flex-col h-full bg-ss-surface border border-ss-divider rounded-dialog overflow-hidden hover:border-ss-control-border transition-all duration-200 shadow-sm hover:shadow-md">
      {/* 4:3 Image Container with Category Badge */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-ss-surface-raised">
        <img
          src={studio.imageUrl}
          alt={studio.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-control text-[11px] font-semibold uppercase tracking-wider bg-ss-surface/90 text-ss-text backdrop-blur-sm border border-ss-divider/50 shadow-sm">
            {formattedCategory}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          {studio.rating && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-control text-xs font-semibold bg-ss-surface/90 text-ss-text backdrop-blur-sm border border-ss-divider/50">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span>{studio.rating.toFixed(1)}</span>
            </div>
          )}
          <WishlistButton studioId={studio.id} studioTitle={studio.title} />
        </div>

      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div className="space-y-2.5">
          {/* Location & Capacity */}
          <div className="flex items-center justify-between text-xs text-ss-muted font-medium">
            <div className="flex items-center gap-1 truncate max-w-[70%]">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-ss-accent" />
              <span className="truncate">{studio.location}</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Users className="w-3.5 h-3.5 shrink-0" />
              <span>Up to {studio.maxCapacity}</span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/studios/${studio.id}`} className="block focus:outline-none">
            <h3 className="font-heading font-bold text-lg text-ss-text line-clamp-1 group-hover:text-ss-accent transition-colors">
              {studio.title}
            </h3>
          </Link>

          {/* Amenities Pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {studio.amenities.slice(0, 2).map((amenity, idx) => (
              <span
                key={idx}
                className="text-[11px] px-2 py-0.5 rounded-control bg-ss-surface-raised text-ss-muted font-medium truncate max-w-[140px]"
              >
                {amenity}
              </span>
            ))}
            {studio.amenities.length > 2 && (
              <span className="text-[11px] px-1.5 py-0.5 rounded-control bg-ss-surface-raised text-ss-muted font-medium">
                +{studio.amenities.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* Pricing & View Details Action */}
        <div className="pt-4 mt-4 border-t border-ss-divider flex items-center justify-between">
          <div>
            <span className="font-heading font-extrabold text-xl text-ss-text">
              ${priceDollars}
            </span>
            <span className="text-xs text-ss-muted font-normal ml-1">/ hr</span>
          </div>

          <Link
            href={`/studios/${studio.id}`}
            className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-control text-xs font-semibold bg-ss-accent text-ss-on-accent hover:bg-ss-accent-hover transition-colors shadow-sm"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

