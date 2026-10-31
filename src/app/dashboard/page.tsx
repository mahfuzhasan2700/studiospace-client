'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from '@/lib/auth-client';
import { fetchMyStudios, fetchMyBookings, fetchHostBookings } from '@/lib/api';
import { Studio } from '@/types/studio';
import { Booking } from '@/types/booking';
import {
  Building2,
  Calendar,
  DollarSign,
  Plus,
  ArrowRight,
  Sparkles,
  Clock,
  CheckCircle2,
  Loader2
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [studios, setStudios] = useState<Studio[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [hostRequests, setHostRequests] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push('/login?callbackUrl=/dashboard');
      return;
    }

    if (session?.user) {
      Promise.all([
        fetchMyStudios().catch(() => []),
        fetchMyBookings().catch(() => []),
        fetchHostBookings().catch(() => [])
      ])
        .then(([s, b, h]) => {
          setStudios(s);
          setBookings(b);
          setHostRequests(h);
        })
        .finally(() => setLoading(false));
    }
  }, [isPending, session, router]);

  if (isPending || loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-ss-accent animate-spin" />
        <p className="text-sm text-ss-muted font-medium">Loading your creator dashboard...</p>
      </div>
    );
  }

  const user = session?.user;
  const pendingRequestsCount = hostRequests.filter((r) => r.status === 'Pending').length;

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-ss-surface via-ss-surface to-ss-accent/10 border border-ss-border rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ss-accent mb-2">
            <Sparkles className="w-4 h-4" /> Creator & Host Hub
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Welcome back, {user?.name || 'Creator'}!
          </h1>
          <p className="text-ss-muted text-sm mt-1 max-w-xl">
            Manage your creative workspaces, track incoming production reservations, and reserve
            premier studios across New York.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/add-studio"
            className="px-5 py-2.5 rounded-xl bg-ss-accent text-white font-semibold text-sm hover:opacity-90 shadow-md shadow-ss-accent/20 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add Studio
          </Link>
          <Link
            href="/studios"
            className="px-5 py-2.5 rounded-xl border border-ss-border bg-ss-bg font-semibold text-sm hover:border-ss-accent transition-colors"
          >
            Explore Studios
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-2xl bg-ss-surface border border-ss-border">
          <div className="w-10 h-10 rounded-xl bg-ss-accent/10 text-ss-accent flex items-center justify-center mb-3">
            <Building2 className="w-5 h-5" />
          </div>
          <span className="text-xs uppercase font-mono tracking-wider text-ss-muted block">
            Listed Studios
          </span>
          <span className="text-2xl font-extrabold text-ss-text mt-1 block">
            {studios.length}
          </span>
          <Link
            href="/my-listings"
            className="inline-flex items-center gap-1 text-xs text-ss-accent font-semibold mt-3 hover:underline"
          >
            Manage listings <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="p-6 rounded-2xl bg-ss-surface border border-ss-border">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-3">
            <Calendar className="w-5 h-5" />
          </div>
          <span className="text-xs uppercase font-mono tracking-wider text-ss-muted block">
            My Reservations
          </span>
          <span className="text-2xl font-extrabold text-ss-text mt-1 block">
            {bookings.length}
          </span>
          <Link
            href="/my-bookings"
            className="inline-flex items-center gap-1 text-xs text-ss-accent font-semibold mt-3 hover:underline"
          >
            View bookings <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="p-6 rounded-2xl bg-ss-surface border border-ss-border">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-3">
            <Clock className="w-5 h-5" />
          </div>
          <span className="text-xs uppercase font-mono tracking-wider text-ss-muted block">
            Pending Host Requests
          </span>
          <span className="text-2xl font-extrabold text-ss-text mt-1 block">
            {pendingRequestsCount}
          </span>
          <Link
            href="/my-bookings"
            className="inline-flex items-center gap-1 text-xs text-ss-accent font-semibold mt-3 hover:underline"
          >
            Review requests <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="p-6 rounded-2xl bg-ss-surface border border-ss-border">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-3">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <span className="text-xs uppercase font-mono tracking-wider text-ss-muted block">
            Account Status
          </span>
          <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-1 block">
            Verified Creator
          </span>
          <span className="text-xs text-ss-muted mt-3 block truncate">{user?.email}</span>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-ss-surface border border-ss-border flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold">Manage Your Creative Spaces</h3>
            <p className="text-xs text-ss-muted mt-1 leading-relaxed">
              Add new soundstages, photo lofts, or podcast suites. Edit your hourly rates and
              monitor customer bookings.
            </p>
          </div>
          <div className="flex items-center gap-3 mt-6">
            <Link
              href="/my-listings"
              className="px-4 py-2 rounded-xl bg-ss-bg border border-ss-border text-xs font-semibold hover:border-ss-accent"
            >
              My Listings ({studios.length})
            </Link>
            <Link
              href="/add-studio"
              className="px-4 py-2 rounded-xl bg-ss-accent text-white text-xs font-semibold hover:opacity-90"
            >
              + List New Space
            </Link>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-ss-surface border border-ss-border flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold">Upcoming Sessions & Invoices</h3>
            <p className="text-xs text-ss-muted mt-1 leading-relaxed">
              View your reserved studio times, check door codes, print official invoices, or cancel
              pending sessions.
            </p>
          </div>
          <div className="flex items-center gap-3 mt-6">
            <Link
              href="/my-bookings"
              className="px-4 py-2 rounded-xl bg-ss-bg border border-ss-border text-xs font-semibold hover:border-ss-accent"
            >
              My Bookings ({bookings.length})
            </Link>
            <Link
              href="/studios"
              className="px-4 py-2 rounded-xl bg-ss-accent text-white text-xs font-semibold hover:opacity-90"
            >
              Browse Studios
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

