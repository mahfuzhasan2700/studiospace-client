import React from 'react';
import Link from 'next/link';
import { Search, Calendar, ShieldCheck, Film, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="py-14 bg-ss-bg min-h-screen">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <p className="text-xs uppercase font-mono tracking-widest text-ss-accent font-semibold">
            Production Roadmap
          </p>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-ss-text">
            How StudioSpace Works
          </h1>
          <p className="text-base text-ss-muted leading-relaxed">
            A transparent production platform built by creators, for creators. Here is how you can find, reserve, and produce in premier workspaces without the traditional bureaucratic studio rental hassle.
          </p>
        </div>

        {/* Steps Detailed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-dialog bg-ss-surface border border-ss-divider space-y-4">
            <div className="w-12 h-12 rounded-control bg-ss-accent text-ss-on-accent flex items-center justify-center font-mono font-bold text-lg">
              01
            </div>
            <h2 className="font-heading font-bold text-2xl text-ss-text">
              1. Discover Verified Creative Spaces
            </h2>
            <p className="text-sm text-ss-muted leading-relaxed">
              Explore photography lofts, commercial film stages, podcast suites, and maker lofts. Inspect authentic stage dimensions, verified equipment inventories, power specs, and clear hourly pricing with no surprise add-on fees.
            </p>
            <ul className="space-y-2 pt-2 text-xs text-ss-text">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Verified floor plans and ceiling clearances</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>High-resolution unedited studio photographs</span>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-dialog bg-ss-surface border border-ss-divider space-y-4">
            <div className="w-12 h-12 rounded-control bg-ss-accent text-ss-on-accent flex items-center justify-center font-mono font-bold text-lg">
              02
            </div>
            <h2 className="font-heading font-bold text-2xl text-ss-text">
              2. Select Production Hours & Request
            </h2>
            <p className="text-sm text-ss-muted leading-relaxed">
              Select your date, start time, and shoot duration. Our intelligent concurrency engine verifies time-slot availability in real-time, preventing accidental double-bookings or conflicting call sheets.
            </p>
            <ul className="space-y-2 pt-2 text-xs text-ss-text">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Automatic subtotal and refundable deposit calculation</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Immediate Pending reservation created in your dashboard</span>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-dialog bg-ss-surface border border-ss-divider space-y-4">
            <div className="w-12 h-12 rounded-control bg-ss-accent text-ss-on-accent flex items-center justify-center font-mono font-bold text-lg">
              03
            </div>
            <h2 className="font-heading font-bold text-2xl text-ss-text">
              3. Host Approval & Seamless Check-In
            </h2>
            <p className="text-sm text-ss-muted leading-relaxed">
              Studio owners receive instant notification and confirm reservations. Once confirmed, you unlock stage door pin-codes, loading dock directions, and host wifi credentials directly in your bookings tab.
            </p>
            <ul className="space-y-2 pt-2 text-xs text-ss-text">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Average host confirmation time under 60 minutes</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Downloadable PDF invoice for accounting and production logs</span>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-dialog bg-ss-surface border border-ss-divider space-y-4">
            <div className="w-12 h-12 rounded-control bg-ss-accent text-ss-on-accent flex items-center justify-center font-mono font-bold text-lg">
              04
            </div>
            <h2 className="font-heading font-bold text-2xl text-ss-text">
              4. Produce with Full Protection
            </h2>
            <p className="text-sm text-ss-muted leading-relaxed">
              Every production session is backed by our \$1,000,000 Host Liability Guarantee and 24/7 creative support team. If any equipment malfunction arises, our emergency team provides immediate dispatch assistance.
            </p>
            <ul className="space-y-2 pt-2 text-xs text-ss-text">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>\$1M property damage & third-party liability coverage</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Transparent review and rating system post-production</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-10 rounded-dialog bg-ss-surface border border-ss-control-border text-center space-y-4">
          <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-ss-text">
            Ready to find your next production workspace?
          </h3>
          <p className="text-sm text-ss-muted max-w-md mx-auto">
            Join thousands of filmmakers, photographers, and audio engineers booking studio hours across the platform.
          </p>
          <div className="pt-2">
            <Link
              href="/studios"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-control text-sm font-semibold bg-ss-accent text-ss-on-accent hover:bg-ss-accent-hover transition-colors shadow-sm"
            >
              <span>Explore Studios Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

