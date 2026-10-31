'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { FallbackImage } from '@/components/ui/FallbackImage';

const slides = [
  {
    id: 'photo',
    title: 'Make room for the shot.',
    subtitle: 'Daylight studios & cycloramas',
    description: 'Find a bright, production-ready space for the image you have in mind.',
    imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1600&q=85',
    tag: 'Photography',
    category: 'photo-studio',
    imageAlt: 'Camera equipment ready inside a daylight photography studio',
  },
  {
    id: 'film',
    title: 'Set the scene. Then roll.',
    subtitle: 'Cinema stages & soundproof sets',
    description: 'From a quiet interview to a full crew call, book a stage that fits the production.',
    imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=85',
    tag: 'Film & production',
    category: 'film-stage',
    imageAlt: 'Film camera on a production set',
  },
  {
    id: 'audio',
    title: 'Find your room tone.',
    subtitle: 'Podcast lounges & music suites',
    description: 'Book treated rooms and recording setups that keep the focus on the sound.',
    imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1600&q=85',
    tag: 'Podcast & audio',
    category: 'podcast-lounge',
    imageAlt: 'Microphone and audio equipment in a recording room',
  },
];

export function HeroSlider() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const reduceMotion = React.useRef(false);
  const slide = slides[activeIndex];

  React.useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => { reduceMotion.current = media.matches; };
    updatePreference();
    media.addEventListener('change', updatePreference);
    return () => media.removeEventListener('change', updatePreference);
  }, []);

  React.useEffect(() => {
    if (paused || reduceMotion.current) return;
    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % slides.length), 7000);
    return () => window.clearInterval(timer);
  }, [paused]);

  const changeSlide = (direction: number) => {
    setActiveIndex((current) => (current + direction + slides.length) % slides.length);
    setPaused(true);
  };

  return (
    <section
      className="hero-stage"
      aria-label="Featured creative spaces"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') changeSlide(-1);
        if (event.key === 'ArrowRight') changeSlide(1);
      }}
    >
      <div className="hero-stage__inner">
        <div className="hero-stage__copy" key={slide.id}>
          <p className="hero-stage__eyebrow"><span className="hero-stage__live-dot" /> {slide.tag}</p>
          <h1>{slide.title}</h1>
          <p className="hero-stage__description">{slide.description}</p>
          <div className="hero-stage__actions">
            <Link href={`/studios?category=${slide.category}`} className="hero-stage__primary">
              Explore studios <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link href="/add-studio" className="hero-stage__secondary">Host a creative space</Link>
          </div>
          <div className="hero-stage__facts" aria-label="Platform features">
            <span>Verified host profiles</span>
            <span>Clear hourly pricing</span>
            <span>Protected booking flow</span>
          </div>
        </div>

        <div className="hero-stage__visual" key={`frame-${slide.id}`} aria-live="polite">
          <FallbackImage src={slide.imageUrl} alt={slide.imageAlt} className="hero-stage__image" loading="eager" sizes="(max-width: 1024px) 100vw, 58vw" />
          <div className="hero-stage__scrim" />
          <div className="hero-stage__caption">
            <span className="hero-stage__frame-label">StudioSpace / Featured frame</span>
            <span>{slide.subtitle}</span>
          </div>
          <div className="hero-stage__frame-index">{String(activeIndex + 1).padStart(2, '0')} <i>/</i> {String(slides.length).padStart(2, '0')}</div>
        </div>
      </div>

      <div className="hero-stage__controls">
        <div className="hero-stage__progress" role="tablist" aria-label="Choose featured space">
          {slides.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Show ${item.tag}`}
                className={`relative overflow-hidden transition-all duration-300 ${isActive ? 'is-active' : ''}`}
                onClick={() => { setActiveIndex(index); setPaused(true); }}
              >
                <span>{item.tag}</span>
                {isActive && !paused && (
                  <span
                    key={`progress-${activeIndex}`}
                    className="absolute bottom-0 left-0 h-[2px] bg-ss-accent w-full animate-slide-progress"
                  />
                )}
              </button>
            );
          })}
        </div>
        <div className="hero-stage__buttons">
          <button type="button" onClick={() => changeSlide(-1)} aria-label="Previous featured space"><ChevronLeft size={18} /></button>
          <button type="button" onClick={() => changeSlide(1)} aria-label="Next featured space"><ChevronRight size={18} /></button>
          <button type="button" onClick={() => setPaused((value) => !value)} aria-label={paused ? 'Resume featured slides' : 'Pause featured slides'}>
            {paused ? <Play size={15} /> : <Pause size={15} />}
          </button>
        </div>
      </div>
    </section>
  );
}
