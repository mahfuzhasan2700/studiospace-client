import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Studio } from '@/types/studio';
import { StudioCard } from '@/components/ui/StudioCard';

export function FeaturedStudios({ studios, catalogAvailable }: { studios: Studio[]; catalogAvailable: boolean }) {
  return (
    <section className="home-section featured-section">
      <div className="home-section__heading">
        <div>
          <p className="section-kicker"><Sparkles size={14} /> Fresh from the catalog</p>
          <h2>Studios worth a closer look.</h2>
        </div>
        <Link href="/studios" className="section-link">Explore all studios <ArrowRight size={16} /></Link>
      </div>
      {!catalogAvailable ? (
        <div className="catalog-message" role="status">
          <p>The studio catalog is taking a moment to load.</p>
          <Link href="/studios">Open the full catalog</Link>
        </div>
      ) : studios.length === 0 ? (
        <div className="catalog-message" role="status">
          <p>No studios have been featured yet.</p>
          <Link href="/add-studio">List the first creative space</Link>
        </div>
      ) : (
        <div className="studio-grid">
          {studios.slice(0, 6).map((studio) => <StudioCard key={studio.id} studio={studio} />)}
        </div>
      )}
    </section>
  );
}
