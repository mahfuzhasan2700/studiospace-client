'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  Calendar,
  Clock,
  DollarSign,
  ShieldCheck,
  Info,
  Loader2,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { StudioDetail } from '@/types/studio';
import { useSession } from '@/lib/auth-client';
import { createBooking } from '@/lib/api';

interface BookingWidgetProps {
  studio: StudioDetail;
}

export function BookingWidget({ studio }: BookingWidgetProps) {
  const router = useRouter();
  const { data: session } = useSession();

  // Tomorrow's date formatted as YYYY-MM-DD
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];

  const [date, setDate] = useState(defaultDateStr);
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('14:00');
  const [notes, setNotes] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [conflictError, setConflictError] = useState<string | null>(null);

  // Parse duration
  const startH = parseInt(startTime.split(':')[0], 10);
  const endH = parseInt(endTime.split(':')[0], 10);
  const durationHours = Math.max(0, endH - startH);

  const hourlyRateDollars = studio.hourlyRateCents / 100;
  const depositDollars = studio.securityDepositCents / 100;
  const subtotalDollars = hourlyRateDollars * durationHours;
  const totalCostDollars = subtotalDollars + depositDollars;

  const handleOpenBookingModal = () => {
    if (!session?.user) {
      router.push(`/login?callbackUrl=/studios/${studio.id}`);
      return;
    }

    if (durationHours <= 0) {
      toast.error('End time must be later than start time.');
      return;
    }

    setConflictError(null);
    setIsModalOpen(true);
  };

  const handleConfirmBooking = async () => {
    setIsSubmitting(true);
    setConflictError(null);

    try {
      await createBooking({
        studioId: studio.id,
        date,
        startTime,
        endTime,
        notes: notes.trim() || undefined
      });

      toast.success('Booking request placed successfully! Redirecting to My Bookings...');
      setIsModalOpen(false);
      router.push('/my-bookings');
    } catch (err: any) {
      const msg = err.message || 'Failed to place booking request.';
      // Challenge 2: Concurrency & Double-Booking Prevention feedback
      if (msg.includes('already been booked') || msg.includes('conflict')) {
        setConflictError(
          'This time slot has already been booked. Please select another time.'
        );
        toast.error('This time slot has already been booked. Please select another time.');
      } else {
        toast.error(msg);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-ss-surface border border-ss-border shadow-xl space-y-6">
      {/* Price Header */}
      <div className="flex items-baseline justify-between border-b border-ss-border pb-4">
        <div>
          <span className="text-3xl font-extrabold tracking-tight text-ss-text">
            ${hourlyRateDollars}
          </span>
          <span className="text-xs text-ss-muted ml-1 font-medium">/ hour</span>
        </div>
        <div className="text-right">
          <span className="text-[11px] font-mono text-ss-muted uppercase block">
            Deposit
          </span>
          <span className="text-xs font-semibold text-ss-text">
            ${depositDollars} refundable
          </span>
        </div>
      </div>

      {/* Date & Time Selection */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-ss-muted mb-1.5 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-ss-accent" /> Select Date
          </label>
          <input
            type="date"
            min={new Date().toISOString().split('T')[0]}
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setConflictError(null);
            }}
            className="w-full px-3.5 py-2.5 rounded-xl border border-ss-border bg-ss-bg text-sm focus:outline-none focus:ring-2 focus:ring-ss-accent"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ss-muted mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-ss-accent" /> Start Time
            </label>
            <select
              value={startTime}
              onChange={(e) => {
                setStartTime(e.target.value);
                setConflictError(null);
              }}
              className="w-full px-3 py-2.5 rounded-xl border border-ss-border bg-ss-bg text-sm focus:outline-none focus:ring-2 focus:ring-ss-accent"
            >
              {[
                '08:00',
                '09:00',
                '10:00',
                '11:00',
                '12:00',
                '13:00',
                '14:00',
                '15:00',
                '16:00',
                '17:00',
                '18:00',
                '19:00',
                '20:00'
              ].map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ss-muted mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-ss-accent" /> End Time
            </label>
            <select
              value={endTime}
              onChange={(e) => {
                setEndTime(e.target.value);
                setConflictError(null);
              }}
              className="w-full px-3 py-2.5 rounded-xl border border-ss-border bg-ss-bg text-sm focus:outline-none focus:ring-2 focus:ring-ss-accent"
            >
              {[
                '09:00',
                '10:00',
                '11:00',
                '12:00',
                '13:00',
                '14:00',
                '15:00',
                '16:00',
                '17:00',
                '18:00',
                '19:00',
                '20:00',
                '21:00',
                '22:00'
              ].map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-ss-muted mb-1.5">
            Production Session Notes (Optional)
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. 4-person crew, photo shoot with lighting setup..."
            className="w-full px-3.5 py-2 rounded-xl border border-ss-border bg-ss-bg text-xs focus:outline-none focus:ring-2 focus:ring-ss-accent"
          />
        </div>
      </div>

      {/* Live Cost Calculation Breakdown */}
      <div className="space-y-2.5 pt-4 border-t border-ss-border text-xs">
        <div className="flex items-center justify-between text-ss-muted">
          <span>
            ${hourlyRateDollars} × {durationHours} hr{durationHours === 1 ? '' : 's'}
          </span>
          <span className="font-semibold text-ss-text">${subtotalDollars}</span>
        </div>
        <div className="flex items-center justify-between text-ss-muted">
          <span>Refundable Security Deposit</span>
          <span className="font-semibold text-ss-text">${depositDollars}</span>
        </div>
        <div className="flex items-center justify-between text-ss-muted">
          <span>Cleaning & Studio Prep Fee</span>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">Included ($0)</span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-ss-border text-sm font-bold">
          <span className="text-ss-text">Total Estimated</span>
          <span className="text-ss-accent text-base">${totalCostDollars}</span>
        </div>
      </div>

      {/* Challenge 2 Error Alert Callout */}
      {conflictError && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-2.5 text-xs text-red-500">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <p className="font-medium">{conflictError}</p>
        </div>
      )}

      {/* CTA Button */}
      <button
        type="button"
        onClick={handleOpenBookingModal}
        disabled={durationHours <= 0}
        className="w-full py-3.5 rounded-xl bg-ss-accent text-white font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-ss-accent/25 flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {session?.user ? 'Reserve Studio Space' : 'Sign in to Reserve'}
      </button>

      {/* Trust Badge */}
      <div className="flex items-center justify-center gap-2 text-[11px] text-ss-muted text-center pt-1">
        <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        <span>No charge until host confirms your session</span>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-ss-surface border border-ss-border rounded-2xl p-6 sm:p-8 shadow-2xl relative space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-ss-accent bg-ss-accent/10 px-2.5 py-0.5 rounded-md">
                Booking Summary
              </span>
              <h3 className="text-2xl font-extrabold tracking-tight mt-2">{studio.title}</h3>
              <p className="text-xs text-ss-muted mt-1">{studio.location}</p>
            </div>

            {/* Session details card */}
            <div className="p-4 rounded-xl bg-ss-bg border border-ss-border space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-ss-muted">Reserved Date:</span>
                <span className="font-bold text-ss-text">{date}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ss-muted">Time Window:</span>
                <span className="font-bold text-ss-text">
                  {startTime} - {endTime} ({durationHours} hours)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ss-muted">Host Contact:</span>
                <span className="font-bold text-ss-text">{studio.host.name}</span>
              </div>
              {notes && (
                <div className="pt-2 border-t border-ss-border">
                  <span className="text-ss-muted block mb-0.5">Notes:</span>
                  <p className="text-ss-text italic">{notes}</p>
                </div>
              )}
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-2 text-xs border-t border-ss-border pt-4">
              <div className="flex justify-between text-ss-muted">
                <span>Studio Rate (${hourlyRateDollars}/hr × {durationHours} hrs)</span>
                <span className="font-semibold text-ss-text">${subtotalDollars}</span>
              </div>
              <div className="flex justify-between text-ss-muted">
                <span>Refundable Deposit</span>
                <span className="font-semibold text-ss-text">${depositDollars}</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-ss-text pt-2 border-t border-ss-border">
                <span>Total Amount Due</span>
                <span className="text-ss-accent">${totalCostDollars}</span>
              </div>
            </div>

            {/* Error in modal if any */}
            {conflictError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-500 font-medium">
                {conflictError}
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-ss-border">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-ss-border text-sm font-semibold hover:bg-ss-bg transition-colors"
              >
                Back to Edit
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleConfirmBooking}
                className="px-6 py-2.5 rounded-xl bg-ss-accent text-white text-sm font-bold hover:opacity-90 shadow-md shadow-ss-accent/20 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Confirming...
                  </>
                ) : (
                  'Confirm & Request Booking'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

