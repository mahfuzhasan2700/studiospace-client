'use client';

import * as React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Swiper as SwiperType } from 'swiper';

const slides = [
  {
    id: 1,
    title: 'Your Next Shoot Starts Here',
    subtitle: 'Daylight Cyc Walls & Photo Studios',
    description: 'Discover sun-drenched industrial lofts, 20-foot cycloramas, and fully equipped photography stages curated for fashion, editorial, and commercial campaigns.',
    imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1600&q=85',
    tag: 'Photography Studios'
  },
  {
    id: 2,
    title: 'Set the Scene for Your Next Film',
    subtitle: 'Cinema Stages & Virtual Production',
    description: 'Acoustically decoupled sound stages with heavy pipe grids, silent HVAC, 3-phase camlock power, and curved green screens ready for broadcast production.',
    imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=85',
    tag: 'Sound Stages'
  },
  {
    id: 3,
    title: 'Rooms Calibrated for Your Sound',
    subtitle: 'Video Podcast Lounges & Music Suites',
    description: 'Precision-tuned recording studios equipped with Genelec monitors, vocal isolation booths, and 4K multi-cam podcast lounges with live switching.',
    imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1600&q=85',
    tag: 'Podcast & Audio'
  }
];

export function HeroSlider() {
  const [swiperInstance, setSwiperInstance] = React.useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <div className="relative w-full bg-gradient-to-b from-ss-surface via-ss-bg to-ss-bg border-b border-ss-divider/70 overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[550px] h-[550px] rounded-full bg-ss-accent/10 blur-[120px] animate-pulse-glow" />
      <div className="pointer-events-none absolute top-1/2 -right-40 w-[450px] h-[450px] rounded-full bg-ss-accent/5 blur-[100px]" />

      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={700}
        autoplay={{ delay: 6500, disableOnInteraction: true }}
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left 5 Columns: Punchy Headline & CTAs */}
                <div className="lg:col-span-5 space-y-6 z-10 animate-fade-up">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ss-surface border border-ss-divider/80 text-xs font-bold uppercase tracking-wider text-ss-accent shadow-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ss-accent opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-ss-accent" />
                    </span>
                    <span>{slide.tag}</span>
                  </div>

                  <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-ss-text leading-[1.08] tracking-tight">
                    {slide.title}
                  </h1>

                  <p className="text-base sm:text-lg text-ss-muted leading-relaxed font-normal">
                    {slide.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Link
                      href="/studios"
                      className="px-6 py-3 rounded-control text-sm font-bold bg-ss-accent text-ss-on-accent hover:bg-ss-accent-hover transition-all duration-200 shadow-md shadow-ss-accent/20 hover:scale-[1.03] active:scale-[0.98] flex items-center gap-2"
                    >
                      <span>Explore Studios</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/add-studio"
                      className="px-6 py-3 rounded-control text-sm font-semibold border border-ss-control-border text-ss-text hover:bg-ss-surface transition-all duration-200 hover:border-ss-accent"
                    >
                      Host a Creative Space
                    </Link>
                  </div>

                  {/* Trust Micro-Metrics */}
                  <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-ss-divider/50 text-xs font-mono text-ss-muted">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Verified Hosts
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      Zero Overlap Concurrency
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      Instant PDF Invoicing
                    </span>
                  </div>
                </div>

                {/* Right 7 Columns: Dominant High-Res Photograph */}
                <div className="lg:col-span-7">
                  <div className="relative aspect-[16/10] w-full rounded-dialog overflow-hidden border border-ss-divider/80 shadow-2xl bg-ss-surface-raised group">
                    <img
                      src={slide.imageUrl}
                      alt={slide.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 text-white flex items-center justify-between">
                      <div>
                        <p className="text-xs font-mono uppercase tracking-widest text-white/80">{slide.subtitle}</p>
                        <p className="text-sm font-bold mt-0.5 text-white/95">Brooklyn & Manhattan Premier Workspaces</p>
                      </div>
                      <span className="glass-pill px-3 py-1 rounded-full text-[11px] font-mono text-white/90">
                        HD 4K Ready
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>


      {/* Slide Navigation and 01 / 03 Counter */}
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 pb-8 flex items-center justify-between text-xs font-mono text-ss-muted">
        <div className="flex items-center gap-3">
          <span className="font-bold text-ss-text text-sm">
            0{activeIndex + 1}
          </span>
          <span className="text-ss-divider">/</span>
          <span>0{slides.length}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => swiperInstance?.slidePrev()}
            className="w-8 h-8 rounded-control border border-ss-divider hover:bg-ss-surface-raised text-ss-text flex items-center justify-center transition-colors focus:outline-none"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => swiperInstance?.slideNext()}
            className="w-8 h-8 rounded-control border border-ss-divider hover:bg-ss-surface-raised text-ss-text flex items-center justify-center transition-colors focus:outline-none"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

