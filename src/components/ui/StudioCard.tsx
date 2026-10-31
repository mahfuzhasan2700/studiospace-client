import React from 'react';
import Link from 'next/link';
import { MapPin, Users, Star, ArrowUpRight } from 'lucide-react';
import { Studio } from '@/types/studio';
import { WishlistButton } from './WishlistButton';
import { FallbackImage } from './FallbackImage';


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
    <article className="studio-card group">
      <Link href={`/studios/${studio.id}`} className="studio-card__media" aria-label={`View ${studio.title}`}>
        <FallbackImage
          src={studio.imageUrl}
          alt={studio.title}
          className="studio-card__image"
        />
        <span className="studio-card__shade" />
        <span className="studio-card__category">{formattedCategory}</span>
        {studio.rating && (
          <span className="studio-card__rating"><Star size={13} fill="currentColor" /> {studio.rating.toFixed(1)}</span>
        )}
      </Link>
      <div className="studio-card__body">
        <div className="studio-card__meta">
          <span><MapPin size={13} /> {studio.location}</span>
          <span><Users size={13} /> {studio.maxCapacity} guests</span>
        </div>
        <div className="studio-card__title-row">
          <Link href={`/studios/${studio.id}`}><h3>{studio.title}</h3></Link>
          <WishlistButton studioId={studio.id} studioTitle={studio.title} />
        </div>
        {studio.amenities.length > 0 && (
          <div className="studio-card__amenities">
            {studio.amenities.slice(0, 2).map((amenity) => <span key={amenity}>{amenity}</span>)}
            {studio.amenities.length > 2 && <span>+{studio.amenities.length - 2}</span>}
          </div>
        )}
        <div className="studio-card__footer">
          <p><strong>${priceDollars}</strong><span> / hour</span></p>
          <Link href={`/studios/${studio.id}`} className="studio-card__action">View studio <ArrowUpRight size={15} /></Link>
        </div>
      </div>
    </article>
  );
}


