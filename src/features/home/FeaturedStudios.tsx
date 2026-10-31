import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Studio } from '@/types/studio';
import { StudioCard } from '@/components/ui/StudioCard';

export function FeaturedStudios({ studios }: { studios: Studio[] }) {
  return (
    <section className="py-16 lg:py-20 bg-ss-surface border-b border-ss-divider transition-colors duration-200">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase font-mono tracking-widest text-ss-accent font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Handpicked Workspaces</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-ss-text">
              Featured Production Studios
            </h2>
          </div>
          <Link
            href="/studios"
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-ss-divider/80 text-xs font-bold text-ss-accent hover:border-ss-accent/40 transition-all hover:scale-105 active:scale-95 cursor-pointer self-start sm:self-auto"
          >
            <span>Explore All 20+ Studios</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {studios.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-ss-divider rounded-dialog p-8">
            <p className="text-ss-muted text-sm">No featured studios currently available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {studios.slice(0, 6).map((studio) => (
              <StudioCard key={studio.id} studio={studio} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

