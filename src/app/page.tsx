import React from 'react';
import { HeroSlider } from '@/features/home/HeroSlider';
import { CategoryGrid } from '@/features/home/CategoryGrid';
import { FeaturedStudios } from '@/features/home/FeaturedStudios';
import { HowItWorks } from '@/features/home/HowItWorks';
import { HostAssurance } from '@/features/home/HostAssurance';
import { fetchFeaturedStudios, fetchStudios } from '@/lib/api';
import { Studio } from '@/types/studio';

export const dynamic = 'force-dynamic';

const studioCategories = ['photo-studio', 'film-stage', 'podcast-lounge', 'music-suite', 'workshop'] as const;

export default async function HomePage() {
  let featuredStudios: Studio[] = [];
  let categoryCounts: Record<string, number | null> = {};
  let catalogAvailable = true;

  try {
    const [featured, ...categoryResults] = await Promise.all([
      fetchFeaturedStudios(6),
      ...studioCategories.map((category) => fetchStudios({ category, page: 1, limit: 1 })),
    ]);
    featuredStudios = featured;
    categoryCounts = Object.fromEntries(
      studioCategories.map((category, index) => [category, (categoryResults[index] as any)?.meta?.total ?? null])
    );
  } catch (error) {
    catalogAvailable = false;
    console.error('Failed to load StudioSpace catalog data:', error);
  }

  return (
    <div className="flex flex-col w-full">
      <HeroSlider />
      <CategoryGrid counts={categoryCounts} catalogAvailable={catalogAvailable} />
      <FeaturedStudios studios={featuredStudios} catalogAvailable={catalogAvailable} />
      <HowItWorks />
      <HostAssurance />
    </div>
  );
}
