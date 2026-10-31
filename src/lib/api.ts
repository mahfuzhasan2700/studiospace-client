import { Studio, StudioDetail, StudioFilterParams } from '../types/studio';
import { Booking, CreateBookingPayload } from '../types/booking';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return ''; // browser uses relative same-origin proxy /api/*
  }
  return process.env.SERVER_URL || 'http://localhost:5000';
};


export async function fetchStudios(params: StudioFilterParams = {}): Promise<{
  data: Studio[];
  meta: { page: number; limit: number; total: number; totalPages: number };
}> {
  const query = new URLSearchParams();
  if (params.category) query.set('category', params.category);
  if (params.search) query.set('search', params.search);
  if (params.sort) query.set('sort', params.sort);
  if (params.page) query.set('page', params.page.toString());
  if (params.limit) query.set('limit', params.limit.toString());

  const url = `${getBaseUrl()}/api/studios?${query.toString()}`;
  const res = await fetch(url, {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch studios (${res.status})`);
  }

  const json = await res.json();
  return {
    data: json.data || [],
    meta: json.meta || { page: 1, limit: 12, total: 0, totalPages: 1 }
  };
}

export async function fetchFeaturedStudios(limit = 6): Promise<Studio[]> {
  const url = `${getBaseUrl()}/api/studios/featured?limit=${limit}`;
  const res = await fetch(url, {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch featured studios (${res.status})`);
  }

  const json = await res.json();
  return json.data || [];
}

export async function fetchStudioById(id: string): Promise<StudioDetail> {
  const url = `${getBaseUrl()}/api/studios/${id}`;
  const res = await fetch(url, {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch studio ${id} (${res.status})`);
  }

  const json = await res.json();
  return json.data;
}

// ----------------------------------------------------------------------
// Studio Mutations & Host Listings
// ----------------------------------------------------------------------

export async function fetchMyStudios(): Promise<Studio[]> {
  const res = await fetch(`${getBaseUrl()}/api/studios/my/listings`, {
    credentials: 'include',
    cache: 'no-store'
  });

  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(errorJson?.error?.message || 'Failed to fetch your studio listings');
  }

  const json = await res.json();
  return json.data || [];
}

export async function createStudio(data: Record<string, any>): Promise<StudioDetail> {
  const res = await fetch(`${getBaseUrl()}/api/studios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data)
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json?.error?.message || 'Failed to create studio listing');
  }

  return json.data;
}

export async function updateStudio(id: string, data: Record<string, any>): Promise<StudioDetail> {
  const res = await fetch(`${getBaseUrl()}/api/studios/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data)
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json?.error?.message || 'Failed to update studio listing');
  }

  return json.data;
}

export async function deleteStudio(id: string): Promise<void> {
  const res = await fetch(`${getBaseUrl()}/api/studios/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  });

  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json?.error?.message || 'Failed to delete studio listing');
  }
}

// ----------------------------------------------------------------------
// Booking Operations & Challenge 2 Concurrency Handlers
// ----------------------------------------------------------------------

export async function createBooking(payload: CreateBookingPayload): Promise<Booking> {
  const res = await fetch(`${getBaseUrl()}/api/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload)
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    // Preserves Challenge 2 409 Conflict message: "This time slot has already been booked..."
    throw new Error(json?.error?.message || 'Failed to create booking');
  }

  return json.data;
}

export async function fetchMyBookings(): Promise<Booking[]> {
  const res = await fetch(`${getBaseUrl()}/api/bookings/my`, {
    credentials: 'include',
    cache: 'no-store'
  });

  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json?.error?.message || 'Failed to fetch your bookings');
  }

  const json = await res.json();
  return json.data || [];
}

export async function fetchHostBookings(): Promise<Booking[]> {
  const res = await fetch(`${getBaseUrl()}/api/bookings/host`, {
    credentials: 'include',
    cache: 'no-store'
  });

  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json?.error?.message || 'Failed to fetch host booking requests');
  }

  const json = await res.json();
  return json.data || [];
}

export async function cancelBooking(id: string): Promise<Booking> {
  const res = await fetch(`${getBaseUrl()}/api/bookings/${id}/cancel`, {
    method: 'PATCH',
    credentials: 'include'
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json?.error?.message || 'Failed to cancel booking');
  }

  return json.data;
}

export async function confirmBooking(id: string): Promise<Booking> {
  const res = await fetch(`${getBaseUrl()}/api/bookings/${id}/confirm`, {
    method: 'PATCH',
    credentials: 'include'
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json?.error?.message || 'Failed to confirm booking');
  }

  return json.data;
}

