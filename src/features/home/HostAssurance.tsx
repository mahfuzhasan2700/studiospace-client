import React from 'react';
import Link from 'next/link';
import { ShieldCheck, UserCheck, Wrench, Headphones, CheckCircle2 } from 'lucide-react';
import { FallbackImage } from '@/components/ui/FallbackImage';

const assurances = [
  {
    title: '$1,000,000 Liability Protection',
    description: 'Every completed reservation is protected with property damage insurance and comprehensive general liability coverage.',
    icon: ShieldCheck
  },
  {
    title: 'Strictly Verified Creator Profiles',
    description: 'Both hosts and booking crews undergo identity and credential validation before production access is granted.',
    icon: UserCheck
  },
  {
    title: 'Equipment Handling & Safety Guarantees',
    description: 'Detailed stage check-in inventories ensure lights, cameras, and studio amenities are accounted for safely.',
    icon: Wrench
  },
  {
    title: '24/7 Dedicated Support Hotline',
    description: 'Our emergency logistics team is always on call for last-minute equipment needs or technical shoot assistance.',
    icon: Headphones
  }
];

export function HostAssurance() {
  return (
    <section className="py-16 lg:py-24 bg-ss-surface border-b border-ss-divider transition-colors duration-200">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Image with Stats Overlay */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] w-full rounded-dialog overflow-hidden border border-ss-divider shadow-md bg-ss-surface-raised">
              <FallbackImage
                src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80"
                alt="Studio production team on set"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              
              {/* Trust Badge Floating Card */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-control bg-ss-surface/95 backdrop-blur-md border border-ss-divider text-ss-text shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-sm">100% Certified Workspaces</p>
                    <p className="text-xs text-ss-muted">Verified acoustic ratings & power grids</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Platform Policies */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <p className="text-xs uppercase font-mono tracking-widest text-ss-accent font-semibold">
                Creator Assurances
              </p>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-ss-text tracking-tight">
                Host Guarantee & Creator Support
              </h2>
              <p className="text-sm text-ss-muted leading-relaxed">
                Whether you are renting out an empty warehouse cyclorama or booking a multi-camera podcast studio for the first time, our built-in safety net keeps your production protected.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {assurances.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="space-y-2">
                    <div className="w-9 h-9 rounded-control bg-ss-surface-raised border border-ss-divider flex items-center justify-center text-ss-accent">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-heading font-bold text-base text-ss-text">
                      {item.title}
                    </h3>
                    <p className="text-xs text-ss-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex items-center gap-4">
              <Link
                href="/studios"
                className="px-6 py-2.5 rounded-control text-xs font-semibold bg-ss-accent text-ss-on-accent hover:bg-ss-accent-hover transition-colors shadow-sm"
              >
                Explore Protected Studios
              </Link>
              <Link
                href="/about"
                className="text-xs font-semibold text-ss-muted hover:text-ss-text transition-colors"
              >
                Read Policy Terms →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

