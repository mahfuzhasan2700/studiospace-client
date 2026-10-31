export type BookingStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface Booking {
  id: string;
  studioId: string;
  studioTitle: string;
  studioImage: string;
  studioLocation: string;
  hostId: string;
  hostEmail: string;
  hostName: string;
  customerId: string;
  customerEmail: string;
  customerName: string;
  date: string;
  startTime: string;
  endTime: string;
  startDateTime: string;
  endDateTime: string;
  durationHours: number;
  hourlyRateCents: number;
  subtotalCents: number;
  securityDepositCents: number;
  totalPriceCents: number;
  currency: string;
  notes?: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingPayload {
  studioId: string;
  date: string;
  startTime: string;
  endTime: string;
  notes?: string;
}

