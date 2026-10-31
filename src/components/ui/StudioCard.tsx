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
    <div className="group flex flex-col h-full bg-ss-surface border border-ss-divider/70 rounded-dialog overflow-hidden hover:border-ss-accent/60 transition-all duration-300 hover-lift shadow-sm">
      {/* 4:3 Image Container with Floating Frosted Badges */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-ss-surface-raised">
        <img
          src={studio.imageUrl}
          alt={studio.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="glass-pill px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
            {formattedCategory}
          </span>
        </div>

        {/* Rating & Wishlist Floating Badges */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          {studio.rating && (
            <div className="glass-pill flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-sm">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{studio.rating.toFixed(1)}</span>
            </div>
          )}
          <WishlistButton studioId={studio.id} studioTitle={studio.title} />
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div className="space-y-2.5">
          {/* Location & Capacity */}
          <div className="flex items-center justify-between text-xs text-ss-muted font-medium">
            <div className="flex items-center gap-1.5 truncate max-w-[70%]">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-ss-accent" />
              <span className="truncate">{studio.location}</span>
            </div>
            <div className="flex items-center gap-1 shrink-0 bg-ss-surface-raised px-2 py-0.5 rounded-md font-mono text-[11px]">
              <Users className="w-3 h-3 shrink-0 text-ss-muted" />
              <span>{studio.maxCapacity} cap</span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/studios/${studio.id}`} className="block focus:outline-none">
            <h3 className="font-heading font-extrabold text-lg text-ss-text line-clamp-1 group-hover:text-ss-accent transition-colors duration-200">
              {studio.title}
            </h3>
          </Link>

          {/* Amenities Pills */}
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {studio.amenities.slice(0, 3).map((amenity, idx) => (
              <span
                key={idx}
                className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-ss-surface-raised text-ss-muted font-semibold truncate max-w-[130px] border border-ss-divider/40"
              >
                {amenity}
              </span>
            ))}
            {studio.amenities.length > 3 && (
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-ss-surface-raised text-ss-muted font-semibold border border-ss-divider/40">
                +{studio.amenities.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Pricing & View Details Action */}
        <div className="pt-3.5 border-t border-ss-divider/60 flex items-center justify-between">
          <div className="flex items-baseline">
            <span className="font-heading font-black text-2xl text-ss-text">
              ${priceDollars}
            </span>
            <span className="text-xs text-ss-muted font-medium ml-1">/ hour</span>
          </div>

          <Link
            href={`/studios/${studio.id}`}
            className="inline-flex items-center gap-1 px-4 py-2 rounded-control text-xs font-bold bg-ss-accent text-ss-on-accent hover:bg-ss-accent-hover transition-all duration-200 shadow-sm hover:scale-[1.03] active:scale-[0.98]"
          >
            <span>Reserve</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}


