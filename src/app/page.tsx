import React from 'react';
import { HeroSlider } from '@/features/home/HeroSlider';
import { CategoryGrid } from '@/features/home/CategoryGrid';
import { FeaturedStudios } from '@/features/home/FeaturedStudios';
import { HowItWorks } from '@/features/home/HowItWorks';
import { HostAssurance } from '@/features/home/HostAssurance';
import { fetchFeaturedStudios } from '@/lib/api';
import { Studio } from '@/types/studio';

export const dynamic = 'force-dynamic';


export default async function HomePage() {
  let featuredStudios: Studio[] = [];
  try {
    featuredStudios = await fetchFeaturedStudios(6);
  } catch (error) {
    console.error('Failed to load featured studios for home page:', error);
  }

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Slider (At least 3 slides) */}
      <HeroSlider />

      {/* 2. Browse by Studio Categories */}
      <CategoryGrid />

      {/* 3. Dynamic Featured Studios Section (Limit 6 from MongoDB) */}
      <FeaturedStudios studios={featuredStudios} />

      {/* 4. Extra Section 1: How Booking Works (4-Step Workflow) */}
      <HowItWorks />

      {/* 5. Extra Section 2: Host Guarantee & Creator Support */}
      <HostAssurance />
    </div>
  );
}
