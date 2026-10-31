import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchStudioById } from '@/lib/api';
import { StudioDetail } from '@/types/studio';
import { BookingWidget } from '@/features/bookings/BookingWidget';
import { FallbackImage } from '@/components/ui/FallbackImage';
import {

  MapPin,
  Users,
  Star,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Calendar,
  Info
} from 'lucide-react';

export default async function StudioDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { id } = params;

  let studio: StudioDetail | null = null;
  try {
    studio = await fetchStudioById(id);
  } catch (error) {
    notFound();
  }

  if (!studio) {
    notFound();
  }

  const priceDollars = Math.round(studio.hourlyRateCents / 100);
  const depositDollars = Math.round(studio.securityDepositCents / 100);

  return (
    <div className="py-10 bg-ss-bg min-h-screen relative overflow-hidden">
      {/* Ambient background blur */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-ss-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative">
        {/* Breadcrumb / Back Link */}
        <div className="flex items-center justify-between">
          <Link
            href="/studios"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-ss-muted hover:text-ss-text transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to All Studios</span>
          </Link>

          <span className="text-xs uppercase font-mono tracking-wider px-3 py-1 rounded-full glass-panel border border-ss-divider text-ss-accent font-semibold shadow-sm">
            {studio.category.replace('-', ' ')}
          </span>
        </div>

        {/* Studio Title & Quick Specs Header */}
        <div className="space-y-3">
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-ss-text tracking-tight">
            {studio.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-ss-muted font-medium">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-ss-accent" />
              <span>{studio.address.line1}, {studio.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              <span>Max Capacity: {studio.maxCapacity} people</span>
            </div>
            {studio.rating && (
              <div className="flex items-center gap-1.5 text-ss-text font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span className="font-mono">{studio.rating.toFixed(1)}</span>
                <span className="text-ss-muted font-normal">({studio.reviewCount} verified reviews)</span>
              </div>
            )}
          </div>
        </div>

        {/* Gallery Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 rounded-3xl overflow-hidden shadow-sm">
          {/* Main Hero Photo */}
          <div className="lg:col-span-2 relative aspect-[16/10] bg-ss-surface-raised rounded-2xl overflow-hidden border border-ss-divider/80 group">
            <FallbackImage
              src={studio.imageUrls[0] || studio.imageUrl}
              alt={studio.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>

          {/* Secondary Photos */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            {studio.imageUrls.slice(1, 3).map((imgUrl, idx) => (
              <div key={idx} className="relative aspect-[16/10] bg-ss-surface-raised rounded-2xl overflow-hidden border border-ss-divider/80 group">
                <FallbackImage
                  src={imgUrl}
                  alt={`${studio.title} preview ${idx + 2}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Two-Column Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-4">
          {/* Left Column (8 cols): Specifications, Overview, Amenities, Host */}
          <div className="lg:col-span-8 space-y-10">
            {/* Overview */}
            <div className="space-y-4">
              <h2 className="font-heading font-bold text-xl text-ss-text">
                About this Creative Space
              </h2>
              <p className="text-sm text-ss-muted leading-relaxed whitespace-pre-line">
                {studio.overview}
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="space-y-4 pt-4 border-t border-ss-divider">
              <h2 className="font-heading font-bold text-xl text-ss-text">
                Equipped Amenities & Gear
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {studio.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3.5 rounded-2xl glass-panel border border-ss-divider/80 text-xs text-ss-text font-medium hover:border-ss-accent/30 transition-all duration-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Host Information */}
            <div className="space-y-4 pt-4 border-t border-ss-divider">
              <h2 className="font-heading font-bold text-xl text-ss-text">
                Hosted by Verified Creator
              </h2>
              <div className="p-6 rounded-3xl glass-panel border border-ss-divider/80 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {studio.host.image ? (
                    <FallbackImage
                      src={studio.host.image}
                      alt={studio.host.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-ss-accent shadow-sm"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-ss-accent/20 text-ss-accent font-bold text-xl flex items-center justify-center">
                      {studio.host.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="font-heading font-bold text-base text-ss-text">
                      {studio.host.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-ss-muted mt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Identity & Space Ownership Verified</span>
                    </div>
                  </div>
                </div>

                <div className="hidden sm:block text-right text-xs text-ss-muted font-mono">
                  <span>Standard Response Time:</span>
                  <p className="font-bold text-ss-text font-sans mt-0.5">&lt; 1 hour</p>
                </div>
              </div>
            </div>

            {/* Operating Hours and Timezone */}
            <div className="space-y-3 pt-4 border-t border-ss-divider">
              <h2 className="font-heading font-bold text-xl text-ss-text flex items-center gap-2">
                <Clock className="w-5 h-5 text-ss-accent" />
                <span>Operating Hours</span>
              </h2>
              <p className="text-xs text-ss-muted">
                Studio Timezone: <strong className="text-ss-text font-mono">{studio.timezone}</strong>
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-xs">
                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => {
                  const schedule = studio.operatingHours[day as keyof typeof studio.operatingHours];
                  const hoursText = schedule && schedule.length > 0 ? `${schedule[0].start} - ${schedule[0].end}` : 'Closed';
                  return (
                    <div key={day} className="p-3 rounded-2xl glass-panel border border-ss-divider/80">
                      <p className="font-semibold capitalize text-ss-text">{day}</p>
                      <p className="text-ss-muted font-mono text-[11px] mt-0.5">{hoursText}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Sticky Booking Card Panel */}
          <div className="lg:col-span-4 sticky top-24" id="book">
            <BookingWidget studio={studio} />
          </div>

        </div>
      </div>
    </div>
  );
}
