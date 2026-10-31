import React from 'react';
import Link from 'next/link';
import { Aperture, Target, HeartHandshake, Sparkles, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="py-14 bg-ss-bg min-h-screen">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase font-mono tracking-widest text-ss-accent font-semibold">
              <Aperture className="w-3.5 h-3.5" />
              <span>Our Platform Mission</span>
            </div>
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-ss-text leading-tight">
              Empowering Creative Independence
            </h1>
            <p className="text-base text-ss-muted leading-relaxed">
              StudioSpace was founded on a simple truth: world-class creative production shouldn&apos;t be gatekept behind massive commercial leases, multi-thousand-dollar studio retainers, or hidden broker commissions.
            </p>
            <p className="text-sm text-ss-muted leading-relaxed">
              We connected independent studio owners with fellow cinematographers, photographers, sound designers, and makers. By decentralizing production stage access, we help creative spaces stay utilized while empowering artists to book only the exact hours they need.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="aspect-[4/3] rounded-dialog overflow-hidden border border-ss-divider shadow-md bg-ss-surface-raised">
              <img
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80"
                alt="Studio space interior"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Pillars / Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-dialog bg-ss-surface border border-ss-divider space-y-3">
            <div className="w-10 h-10 rounded-control bg-ss-surface-raised text-ss-accent flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-lg text-ss-text">
              Radical Price Transparency
            </h3>
            <p className="text-xs text-ss-muted leading-relaxed">
              Every listing displays unambiguous hourly rates and refundable security deposits. Zero hidden platform markups or undisclosed cleaning surcharges.
            </p>
          </div>

          <div className="p-6 rounded-dialog bg-ss-surface border border-ss-divider space-y-3">
            <div className="w-10 h-10 rounded-control bg-ss-surface-raised text-ss-accent flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-lg text-ss-text">
              Community First
            </h3>
            <p className="text-xs text-ss-muted leading-relaxed">
              Hosts retain the lion&apos;s share of booking revenue, fostering sustainable creative hubs in neighborhoods ranging from Tejgaon and Banani to international arts districts.
            </p>
          </div>

          <div className="p-6 rounded-dialog bg-ss-surface border border-ss-divider space-y-3">
            <div className="w-10 h-10 rounded-control bg-ss-surface-raised text-ss-accent flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-lg text-ss-text">
              Production-Grade Standards
            </h3>
            <p className="text-xs text-ss-muted leading-relaxed">
              We vet power ratings, acoustic isolation levels, and rigging safety so you never arrive at a booking that fails your director of photography&apos;s standards.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 rounded-dialog bg-ss-surface border border-ss-divider flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-heading font-bold text-xl text-ss-text">Have a creative space to share?</h3>
            <p className="text-xs text-ss-muted mt-1">Turn your downtime into passive production revenue.</p>
          </div>
          <Link
            href="/add-studio"
            className="px-6 py-2.5 rounded-control text-xs font-semibold bg-ss-accent text-ss-on-accent hover:bg-ss-accent-hover transition-colors shrink-0 flex items-center gap-2"
          >
            <span>List Your Studio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

