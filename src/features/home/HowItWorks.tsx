import React from 'react';
import { Search, Clock, CalendarCheck, Film } from 'lucide-react';

const steps = [
  {
    step: '01',
    title: 'Discover Spaces',
    description: 'Filter by photography, cinema sound stages, or music lounges. View floor plans, verified equipment inventories, and transparent hourly rates.',
    icon: Search
  },
  {
    step: '02',
    title: 'Select Shoot Hours',
    description: 'Inspect real-time calendar availability. Choose the exact start and end times tailored to your creative production call sheet.',
    icon: Clock
  },
  {
    step: '03',
    title: 'Book Instantly',
    description: 'Submit your reservation with transparent pricing and zero hidden fees. Your slot is immediately secured in the platform schedule.',
    icon: CalendarCheck
  },
  {
    step: '04',
    title: 'Create & Produce',
    description: 'Check in seamlessly with direct host access instructions. Plug into high-speed power and produce your next creative masterpiece.',
    icon: Film
  }
];

export function HowItWorks() {
  return (
    <section className="py-16 lg:py-20 bg-ss-bg border-b border-ss-divider transition-colors duration-200">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
          <p className="text-xs uppercase font-mono tracking-widest text-ss-accent font-semibold">
            Seamless Workflow
          </p>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-ss-text">
            How Booking Works
          </h2>
          <p className="text-sm text-ss-muted">
            From discovering the perfect cyc wall to striking the set, our platform simplifies creative space logistics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative rounded-dialog bg-ss-surface border border-ss-divider p-6 flex flex-col justify-between space-y-6 shadow-sm hover:border-ss-control-border transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-control bg-ss-surface-raised border border-ss-divider flex items-center justify-center text-ss-accent">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-mono font-bold text-2xl text-ss-divider">
                    {item.step}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-heading font-bold text-lg text-ss-text">
                    {item.title}
                  </h3>
                  <p className="text-xs text-ss-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

