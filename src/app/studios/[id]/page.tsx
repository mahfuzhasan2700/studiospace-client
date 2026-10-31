import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchStudioById } from '@/lib/api';
import { StudioDetail } from '@/types/studio';
import { BookingWidget } from '@/features/bookings/BookingWidget';
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
    <div className="py-10 bg-ss-bg min-h-screen">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb / Back Link */}
        <div className="flex items-center justify-between">
          <Link
            href="/studios"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-ss-muted hover:text-ss-text transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Studios</span>
          </Link>

          <span className="text-xs uppercase font-mono tracking-wider px-2.5 py-1 rounded-control bg-ss-surface border border-ss-divider text-ss-accent font-semibold">
            {studio.category.replace('-', ' ')}
          </span>
        </div>

        {/* Studio Title & Quick Specs Header */}
        <div className="space-y-3">
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-ss-text">
            {studio.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-ss-muted font-medium">
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-ss-accent" />
              <span>{studio.address.line1}, {studio.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span>Max Capacity: {studio.maxCapacity} people</span>
            </div>
            {studio.rating && (
              <div className="flex items-center gap-1 text-ss-text font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span>{studio.rating.toFixed(1)}</span>
                <span className="text-ss-muted font-normal">({studio.reviewCount} verified reviews)</span>
              </div>
            )}
          </div>
        </div>

        {/* Gallery Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 rounded-dialog overflow-hidden">
          {/* Main Hero Photo */}
          <div className="lg:col-span-2 relative aspect-[16/10] bg-ss-surface-raised rounded-image overflow-hidden border border-ss-divider">
            <img
              src={studio.imageUrls[0] || studio.imageUrl}
              alt={studio.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Secondary Photos */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            {studio.imageUrls.slice(1, 3).map((imgUrl, idx) => (
              <div key={idx} className="relative aspect-[16/10] bg-ss-surface-raised rounded-image overflow-hidden border border-ss-divider">
                <img
                  src={imgUrl}
                  alt={`${studio.title} preview ${idx + 2}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
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
                    className="flex items-center gap-2.5 p-3 rounded-control bg-ss-surface border border-ss-divider text-xs text-ss-text font-medium"
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
              <div className="p-5 rounded-dialog bg-ss-surface border border-ss-divider flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {studio.host.image ? (
                    <img
                      src={studio.host.image}
                      alt={studio.host.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-ss-accent"
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
                      <ShieldCheck className="w-3.5 h-3.5 text-ss-accent" />
                      <span>Identity & Space Ownership Verified</span>
                    </div>
                  </div>
                </div>

                <div className="hidden sm:block text-right text-xs text-ss-muted font-mono">
                  <span>Standard Response Time:</span>
                  <p className="font-bold text-ss-text font-sans">&lt; 1 hour</p>
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
                Studio Timezone: <strong className="text-ss-text">{studio.timezone}</strong>
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => {
                  const schedule = studio.operatingHours[day as keyof typeof studio.operatingHours];
                  const hoursText = schedule && schedule.length > 0 ? `${schedule[0].start} - ${schedule[0].end}` : 'Closed';
                  return (
                    <div key={day} className="p-2.5 rounded-control bg-ss-surface border border-ss-divider">
                      <p className="font-semibold capitalize text-ss-text">{day}</p>
                      <p className="text-ss-muted text-[11px] mt-0.5">{hoursText}</p>
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
