'use client';

import * as React from 'react';
import Link from 'next/link';
import { Aperture, ArrowRight, Instagram, Youtube, Linkedin, Github } from 'lucide-react';
import { toast } from 'sonner';

export function Footer() {
  const [email, setEmail] = React.useState('');

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    toast.success('Thank you! You have subscribed to StudioSpace production dispatches.');
    setEmail('');
  };

  return (
    <footer className="mt-auto border-t border-ss-divider bg-ss-surface transition-colors duration-200">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Column 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-control bg-ss-accent text-ss-on-accent flex items-center justify-center">
                <Aperture className="w-5 h-5" />
              </div>
              <span className="font-heading font-extrabold text-xl tracking-tight text-ss-text">
                Studio<span className="text-ss-accent">Space</span>
              </span>
            </Link>

            <p className="text-sm text-ss-muted leading-relaxed max-w-sm">
              The premier peer-to-peer workspace and production studio marketplace. Empowering photographers, filmmakers, podcasters, and musicians to find transparent, production-ready creative spaces.
            </p>

            <div className="pt-2">
              <p className="text-xs font-mono uppercase tracking-wider text-ss-muted mb-3">Connect With Us</p>
              <div className="flex items-center gap-3">
                {/* Official New X Logo (NOT the Twitter Bird) */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-control border border-ss-divider flex items-center justify-center text-ss-text hover:text-ss-accent hover:border-ss-accent transition-colors"
                  aria-label="X (formerly Twitter)"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-control border border-ss-divider flex items-center justify-center text-ss-text hover:text-ss-accent hover:border-ss-accent transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-control border border-ss-divider flex items-center justify-center text-ss-text hover:text-ss-accent hover:border-ss-accent transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com/mahfuzhasan2700"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-control border border-ss-divider flex items-center justify-center text-ss-text hover:text-ss-accent hover:border-ss-accent transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h4 className="font-heading font-semibold text-sm text-ss-text uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-ss-muted hover:text-ss-text transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/studios" className="text-ss-muted hover:text-ss-text transition-colors">
                  All Studios
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-ss-muted hover:text-ss-text transition-colors">
                  How Booking Works
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-ss-muted hover:text-ss-text transition-colors">
                  About StudioSpace
                </Link>
              </li>
              <li>
                <Link href="/add-studio" className="text-ss-muted hover:text-ss-text transition-colors">
                  Host Your Space
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Categories */}
          <div>
            <h4 className="font-heading font-semibold text-sm text-ss-text uppercase tracking-wider mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/studios?category=photo-studio" className="text-ss-muted hover:text-ss-text transition-colors">
                  Photo Studios
                </Link>
              </li>
              <li>
                <Link href="/studios?category=film-stage" className="text-ss-muted hover:text-ss-text transition-colors">
                  Cinema Sound Stages
                </Link>
              </li>
              <li>
                <Link href="/studios?category=podcast-lounge" className="text-ss-muted hover:text-ss-text transition-colors">
                  Podcast Lounges
                </Link>
              </li>
              <li>
                <Link href="/studios?category=music-suite" className="text-ss-muted hover:text-ss-text transition-colors">
                  Music Recording Suites
                </Link>
              </li>
              <li>
                <Link href="/studios?category=workshop" className="text-ss-muted hover:text-ss-text transition-colors">
                  Art & Craft Workshops
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Newsletter */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-sm text-ss-text uppercase tracking-wider">
              Newsletter
            </h4>
            <p className="text-xs text-ss-muted leading-relaxed">
              Curated gear guides, exclusive studio discounts, and creator spotlights delivered monthly.
            </p>
            <form onSubmit={handleNewsletter} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="creator@studiospace.io"
                  className="w-full text-xs px-3.5 py-2.5 rounded-control bg-ss-bg border border-ss-control-border text-ss-text placeholder:text-ss-muted/60 focus:outline-none focus:ring-1 focus:ring-ss-accent"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-3 rounded-control text-xs font-semibold bg-ss-accent text-ss-on-accent hover:bg-ss-accent-hover flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <span>Subscribe Dispatch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Terms */}
        <div className="mt-12 pt-6 border-t border-ss-divider flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ss-muted">
          <p>© {new Date().getFullYear()} StudioSpace Inc. All production rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-ss-text cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-ss-text cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-ss-text cursor-pointer transition-colors">Host Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
