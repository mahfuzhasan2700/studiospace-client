'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import {
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
  Printer,
  FileText,
  User,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { useSession } from '@/lib/auth-client';
import {
  fetchMyBookings,
  fetchHostBookings,
  cancelBooking,
  confirmBooking
} from '@/lib/api';
import { Booking, BookingStatus } from '@/types/booking';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { FallbackImage } from '@/components/ui/FallbackImage';

export default function MyBookingsPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [activeTab, setActiveTab] = useState<'creator' | 'host'>('creator');
  const [creatorBookings, setCreatorBookings] = useState<Booking[]>([]);
  const [hostBookings, setHostBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cancellation modal
  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  // Confirmation modal (Host action)
  const [bookingToConfirm, setBookingToConfirm] = useState<Booking | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push('/login?callbackUrl=/my-bookings');
      return;
    }

    if (session?.user) {
      loadAllBookings();
    }
  }, [isPending, session, router]);

  const loadAllBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const [creatorData, hostData] = await Promise.all([
        fetchMyBookings(),
        fetchHostBookings().catch(() => [])
      ]);
      setCreatorBookings(creatorData);
      setHostBookings(hostData);
    } catch (err: any) {
      setError(err.message || 'Failed to load booking reservations');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmCancel = async () => {
    if (!bookingToCancel) return;

    try {
      setIsCancelling(true);
      const updated = await cancelBooking(bookingToCancel.id);
      toast.success('Booking cancelled successfully.');
      setCreatorBookings((prev) =>
        prev.map((b) => (b.id === updated.id ? updated : b))
      );
      setHostBookings((prev) =>
        prev.map((b) => (b.id === updated.id ? updated : b))
      );
      setBookingToCancel(null);
    } catch (err: any) {
      toast.error(err.message || 'Could not cancel booking.');
    } finally {
      setIsCancelling(false);
    }
  };

  const handleHostConfirmBooking = async () => {
    if (!bookingToConfirm) return;

    try {
      setIsConfirming(true);
      const updated = await confirmBooking(bookingToConfirm.id);
      toast.success('Booking request accepted and confirmed!');
      setHostBookings((prev) =>
        prev.map((b) => (b.id === updated.id ? updated : b))
      );
      setBookingToConfirm(null);
    } catch (err: any) {
      toast.error(err.message || 'Failed to confirm booking.');
    } finally {
      setIsConfirming(false);
    }
  };

  const handlePrintInvoice = (booking: Booking) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast.error('Please allow popups to generate the printable receipt.');
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice - ${booking.id}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #111; max-width: 800px; margin: 0 auto; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #222; padding-bottom: 20px; }
            .brand { font-size: 24px; font-weight: 800; }
            .status { font-size: 14px; text-transform: uppercase; font-weight: 700; color: #059669; }
            .meta { margin-top: 30px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 14px; }
            .table { width: 100%; border-collapse: collapse; margin-top: 30px; }
            .table th, .table td { text-align: left; padding: 12px; border-bottom: 1px solid #ddd; font-size: 14px; }
            .table th { background: #f4f4f5; }
            .total { text-align: right; margin-top: 20px; font-size: 18px; font-weight: 700; }
            .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #eee; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="brand">STUDIOSPACE</div>
              <p>Peer-to-Peer Creative Workspace Sharing</p>
            </div>
            <div style="text-align: right;">
              <h2>INVOICE / RECEIPT</h2>
              <p>Reference: #INV-${booking.id.slice(-6).toUpperCase()}</p>
              <div class="status">Status: ${booking.status}</div>
            </div>
          </div>

          <div class="meta">
            <div>
              <strong>Studio Details:</strong><br />
              ${booking.studioTitle}<br />
              ${booking.studioLocation}<br />
              Host: ${booking.hostName} (${booking.hostEmail})
            </div>
            <div>
              <strong>Creator / Billed To:</strong><br />
              ${booking.customerName}<br />
              ${booking.customerEmail}<br />
              Date: ${booking.date}<br />
              Session Time: ${booking.startTime} - ${booking.endTime} (${booking.durationHours} hrs)
            </div>
          </div>

          <table class="table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Hours</th>
                <th>Hourly Rate</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Studio Session Rental (${booking.studioTitle})</td>
                <td>${booking.durationHours} hrs</td>
                <td>$${(booking.hourlyRateCents / 100).toFixed(2)}</td>
                <td>$${(booking.subtotalCents / 100).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Refundable Security Deposit</td>
                <td>-</td>
                <td>-</td>
                <td>$${(booking.securityDepositCents / 100).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <div class="total">
            Total Paid / Reserved: $${(booking.totalPriceCents / 100).toFixed(2)} ${booking.currency}
          </div>

          <div class="footer">
            Thank you for creating with StudioSpace. For support contact support@studiospace.io
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const renderStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'Confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 backdrop-blur-sm shadow-sm shadow-emerald-500/10">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Confirmed</span>
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/25 backdrop-blur-sm shadow-sm shadow-amber-500/10">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span>Pending Host</span>
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-rose-500/10 text-rose-500 border border-rose-500/25 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            <span>Cancelled</span>
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-blue-500/10 text-blue-500 border border-blue-500/25 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>Completed</span>
          </span>
        );
      default:
        return null;
    }
  };

  if (isPending || loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-ss-accent animate-spin" />
        <p className="text-sm text-ss-muted font-medium">Loading booking reservations...</p>
      </div>
    );
  }

  const currentBookings = activeTab === 'creator' ? creatorBookings : hostBookings;

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-ss-divider">
        <div>
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-ss-text">Reservations & Bookings</h1>
          <p className="text-ss-muted text-sm mt-1">
            Track studio reservations, schedules, invoices, and incoming host requests.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 rounded-full glass-panel border border-ss-divider/80 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('creator')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 active:scale-95 cursor-pointer ${
              activeTab === 'creator'
                ? 'bg-ss-accent text-ss-on-accent shadow-sm'
                : 'text-ss-muted hover:text-ss-text'
            }`}
          >
            My Reservations ({creatorBookings.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('host')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 active:scale-95 cursor-pointer ${
              activeTab === 'host'
                ? 'bg-ss-accent text-ss-on-accent shadow-sm'
                : 'text-ss-muted hover:text-ss-text'
            }`}
          >
            Host Requests ({hostBookings.length})
          </button>
        </div>
      </div>

      {error ? (
        <div className="my-12 p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-center max-w-lg mx-auto">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <h3 className="font-semibold text-red-500">Failed to load reservations</h3>
          <p className="text-xs text-ss-muted mt-1 mb-4">{error}</p>
          <button
            onClick={loadAllBookings}
            className="px-4 py-2 bg-ss-surface border border-ss-border rounded-xl text-xs font-semibold hover:border-ss-accent"
          >
            Retry
          </button>
        </div>
      ) : currentBookings.length === 0 ? (
        /* Empty State */
        <div className="my-16 text-center max-w-md mx-auto p-8 rounded-3xl bg-ss-surface border border-ss-border">
          <div className="w-16 h-16 rounded-2xl bg-ss-accent/10 text-ss-accent flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold tracking-tight">
            {activeTab === 'creator'
              ? 'No Studio Reservations'
              : 'No Incoming Booking Requests'}
          </h3>
          <p className="text-ss-muted text-sm mt-2 mb-6">
            {activeTab === 'creator'
              ? 'You have not booked any creative workspaces yet. Explore cycloramas, music suites, and podcast lounges.'
              : 'You have no pending requests for your listed studios at the moment.'}
          </p>
          {activeTab === 'creator' && (
            <Link
              href="/studios"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-ss-accent text-white font-semibold text-sm hover:opacity-90 transition-all shadow-lg shadow-ss-accent/20"
            >
              Explore Studios <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      ) : (
        /* Bookings List / Cards */
        <div className="mt-8 space-y-4">
          {currentBookings.map((b) => (
            <div
              key={b.id}
              className="glass-panel border border-ss-divider/80 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-ss-accent/40 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5 group"
            >
              {/* Left Details */}
              <div className="flex items-start gap-4 flex-1">
                <div className="relative w-20 h-20 sm:w-28 sm:h-24 rounded-xl overflow-hidden shrink-0 bg-ss-bg border border-ss-divider">
                  <FallbackImage
                    src={b.studioImage || 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80'}
                    alt={b.studioTitle}
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>

                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/studios/${b.studioId}`}
                      className="font-heading font-bold text-base sm:text-lg text-ss-text hover:text-ss-accent truncate transition-colors"
                    >
                      {b.studioTitle}
                    </Link>
                    {renderStatusBadge(b.status)}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-ss-muted">
                    <MapPin className="w-3.5 h-3.5 text-ss-accent shrink-0" />
                    <span className="truncate">{b.studioLocation}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                    <span className="flex items-center gap-1 font-mono font-medium text-ss-text">
                      <Calendar className="w-3.5 h-3.5 text-ss-muted" /> {b.date}
                    </span>
                    <span className="flex items-center gap-1 font-mono font-medium text-ss-text">
                      <Clock className="w-3.5 h-3.5 text-ss-muted" /> {b.startTime} - {b.endTime} ({b.durationHours}h)
                    </span>
                    <span className="text-ss-muted">
                      {activeTab === 'creator' ? `Host: ${b.hostName}` : `Creator: ${b.customerName}`}
                    </span>
                  </div>

                  {b.notes && (
                    <p className="text-xs text-ss-muted italic line-clamp-1 pt-0.5">
                      &quot;{b.notes}&quot;
                    </p>
                  )}
                </div>
              </div>

              {/* Right Price & Actions */}
              <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 pt-4 md:pt-0 border-ss-divider gap-4 shrink-0">
                <div className="text-left md:text-right">
                  <span className="text-[10px] uppercase tracking-wider text-ss-muted block font-mono">
                    Total Amount
                  </span>
                  <span className="font-heading font-mono text-xl sm:text-2xl font-extrabold text-ss-text">
                    ${(b.totalPriceCents / 100).toFixed(0)}
                  </span>
                  <span className="text-[10px] text-ss-muted block font-mono">
                    (${b.hourlyRateCents / 100}/hr + ${(b.securityDepositCents / 100).toFixed(0)} deposit)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Printable Invoice (Bonus 1) */}
                  <button
                    type="button"
                    onClick={() => handlePrintInvoice(b)}
                    className="p-2.5 rounded-full border border-ss-divider text-ss-muted hover:text-ss-text hover:border-ss-accent hover:bg-ss-surface-raised transition-all duration-200 active:scale-95 cursor-pointer"
                    title="Print / Download PDF Receipt"
                  >
                    <Printer className="w-4 h-4" />
                  </button>

                  {/* Host Accept Action */}
                  {activeTab === 'host' && b.status === 'Pending' && (
                    <button
                      type="button"
                      onClick={() => setBookingToConfirm(b)}
                      className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all duration-200 shadow-md shadow-emerald-600/20 active:scale-95 cursor-pointer"
                    >
                      Accept & Confirm
                    </button>
                  )}

                  {/* Cancel Action (Pending or Confirmed) */}
                  {(b.status === 'Pending' || b.status === 'Confirmed') && (
                    <button
                      type="button"
                      onClick={() => setBookingToCancel(b)}
                      className="px-4 py-2 rounded-full border border-rose-500/25 text-rose-500 text-xs font-semibold hover:bg-rose-500/10 transition-all duration-200 active:scale-95 cursor-pointer"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cancel Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!bookingToCancel}
        title="Cancel This Reservation?"
        description={`Are you sure you want to cancel the booking for "${bookingToCancel?.studioTitle}" on ${bookingToCancel?.date} (${bookingToCancel?.startTime} - ${bookingToCancel?.endTime})? This will release the studio slot.`}
        confirmLabel="Yes, Cancel Booking"
        cancelLabel="Keep Reservation"
        isDestructive={true}
        isLoading={isCancelling}
        onConfirm={handleConfirmCancel}
        onClose={() => setBookingToCancel(null)}
      />

      {/* Host Confirm Dialog */}
      <ConfirmDialog
        isOpen={!!bookingToConfirm}
        title="Accept & Confirm Reservation?"
        description={`Confirm booking request from ${bookingToConfirm?.customerName} for ${bookingToConfirm?.studioTitle} on ${bookingToConfirm?.date} (${bookingToConfirm?.startTime} - ${bookingToConfirm?.endTime}). Once confirmed, the time slot is locked against double-booking.`}
        confirmLabel="Confirm Reservation"
        cancelLabel="Review Later"
        isDestructive={false}
        isLoading={isConfirming}
        onConfirm={handleHostConfirmBooking}
        onClose={() => setBookingToConfirm(null)}
      />
    </div>
  );
}

