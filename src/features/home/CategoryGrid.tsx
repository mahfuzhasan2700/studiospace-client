import React from 'react';
import Link from 'next/link';
import { Camera, Film, Mic, Music, Palette, ArrowRight } from 'lucide-react';
import { FallbackImage } from '@/components/ui/FallbackImage';

const categories = [
  { slug: 'photo-studio', name: 'Photo studios', subtitle: 'Daylight, cyc walls and camera-ready sets', icon: Camera, image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80' },
  { slug: 'film-stage', name: 'Film stages', subtitle: 'Sound stages, lighting grids and green screens', icon: Film, image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80' },
  { slug: 'podcast-lounge', name: 'Podcast rooms', subtitle: 'Acoustic treatment and broadcast-ready gear', icon: Mic, image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80' },
  { slug: 'music-suite', name: 'Music suites', subtitle: 'Recording rooms for focused sessions', icon: Music, image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80' },
  { slug: 'workshop', name: 'Art workshops', subtitle: 'Room to make, build and experiment', icon: Palette, image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80' },
];

export function CategoryGrid({ counts, catalogAvailable }: { counts: Record<string, number | null>; catalogAvailable: boolean }) {
  return (
    <section className="home-section category-section">
      <div className="home-section__heading">
        <div>
          <p className="section-kicker">Pick your discipline</p>
          <h2>Space for the work you make.</h2>
        </div>
        <Link href="/studios" className="section-link">Browse all studios <ArrowRight size={16} /></Link>
      </div>
      <div className="category-rail">
        {categories.map(({ slug, name, subtitle, icon: Icon, image }) => {
          const count = counts[slug];
          return (
            <Link key={slug} href={`/studios?category=${slug}`} className="category-tile">
              <FallbackImage src={image} alt="" className="category-tile__image" />
              <span className="category-tile__shade" />
              <span className="category-tile__top"><Icon size={18} /><span>{catalogAvailable && typeof count === 'number' ? `${count} ${count === 1 ? 'space' : 'spaces'}` : 'Explore spaces'}</span></span>
              <span className="category-tile__copy"><strong>{name}</strong><small>{subtitle}</small></span>
              <ArrowRight className="category-tile__arrow" size={18} />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
