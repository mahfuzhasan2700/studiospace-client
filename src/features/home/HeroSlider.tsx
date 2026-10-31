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
    <div className="relative w-full bg-ss-surface border-b border-ss-divider overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={700}
        autoplay={{ delay: 6500, disableOnInteraction: true }}
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={slide.id}>
            <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left 5 Columns: Punchy Headline & CTAs */}
                <div className="lg:col-span-5 space-y-6 z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-control bg-ss-surface-raised border border-ss-divider text-xs font-semibold uppercase tracking-wider text-ss-accent">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{slide.tag}</span>
                  </div>

                  <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-ss-text leading-[1.05] tracking-tight">
                    {slide.title}
                  </h1>

                  <p className="text-base sm:text-lg text-ss-muted leading-relaxed font-normal">
                    {slide.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Link
                      href="/studios"
                      className="px-6 py-3 rounded-control text-sm font-semibold bg-ss-accent text-ss-on-accent hover:bg-ss-accent-hover transition-colors shadow-sm flex items-center gap-2"
                    >
                      <span>Explore Studios</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/studios"
                      className="px-6 py-3 rounded-control text-sm font-semibold border border-ss-control-border text-ss-text hover:bg-ss-surface-raised transition-colors"
                    >
                      Host Your Space
                    </Link>
                  </div>
                </div>

                {/* Right 7 Columns: Dominant High-Res Photograph */}
                <div className="lg:col-span-7">
                  <div className="relative aspect-[16/10] w-full rounded-dialog overflow-hidden border border-ss-divider shadow-md bg-ss-surface-raised">
                    <img
                      src={slide.imageUrl}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-xs font-mono uppercase tracking-widest text-white/80">{slide.subtitle}</p>
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

