import React from 'react';
import Link from 'next/link';
import { Camera, Film, Mic, Music, Palette, ArrowRight } from 'lucide-react';

const categories = [
  {
    slug: 'photo-studio',
    name: 'Photo Studios',
    subtitle: 'Cyclorama walls, natural daylight & high ceilings',
    icon: Camera,
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80',
    count: '24+ spaces'
  },
  {
    slug: 'film-stage',
    name: 'Sound Stages',
    subtitle: 'Green screens, lighting grids & soundproof stages',
    icon: Film,
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80',
    count: '16+ stages'
  },
  {
    slug: 'podcast-lounge',
    name: 'Podcast Rooms',
    subtitle: 'Multi-cam 4K, broadcast mics & acoustic walls',
    icon: Mic,
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80',
    count: '18+ rooms'
  },
  {
    slug: 'music-suite',
    name: 'Music Suites',
    subtitle: 'Vocal isolation booths & professional monitor setups',
    icon: Music,
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80',
    count: '20+ suites'
  },
  {
    slug: 'workshop',
    name: 'Art Workshops',
    subtitle: 'Printmaking, ceramics & spacious tactile maker lofts',
    icon: Palette,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80',
    count: '12+ workshops'
  }
];

export function CategoryGrid() {
  return (
    <section className="py-16 border-b border-ss-divider bg-ss-bg transition-colors duration-200">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-xs uppercase font-mono tracking-widest text-ss-accent font-semibold mb-2">
              Explore By Discipline
            </p>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-ss-text">
              Browse Studio Categories
            </h2>
          </div>
          <Link
            href="/studios"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ss-accent hover:text-ss-accent-hover transition-colors"
          >
            <span>View All Workspaces</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                href={`/studios?category=${cat.slug}`}
                className="group relative rounded-dialog overflow-hidden border border-ss-divider/70 bg-ss-surface p-5 flex flex-col justify-between hover:border-ss-accent/60 hover-lift transition-all duration-300 min-h-[220px]"
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-25 dark:opacity-20"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ss-surface via-ss-surface/85 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="w-11 h-11 rounded-control bg-ss-surface-raised border border-ss-divider/80 flex items-center justify-center text-ss-accent group-hover:bg-ss-accent group-hover:text-ss-on-accent group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-ss-muted bg-ss-surface-raised/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-ss-divider/40">
                    {cat.count}
                  </span>
                </div>

                <div className="relative z-10 mt-6 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-extrabold text-base text-ss-text group-hover:text-ss-accent transition-colors">
                      {cat.name}
                    </h3>
                    <ArrowRight className="w-3.5 h-3.5 text-ss-accent opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </div>
                  <p className="text-xs text-ss-muted leading-snug line-clamp-2">
                    {cat.subtitle}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}


