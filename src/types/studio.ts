export type StudioCategory =
  | 'photo-studio'
  | 'film-stage'
  | 'podcast-lounge'
  | 'music-suite'
  | 'workshop';

export interface StudioAddress {
  line1: string;
  area: string;
  city: string;
  country: string;
}

export interface TimeInterval {
  start: string;
  end: string;
}

export type OperatingHours = {
  [day in 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday']?: TimeInterval[];
};

export interface Studio {
  id: string;
  title: string;
  category: StudioCategory;
  hourlyRateCents: number;
  securityDepositCents: number;
  currency: string;
  maxCapacity: number;
  address: StudioAddress;
  imageUrl: string;
  imageUrls: string[];
  amenities: string[];
  rating: number | null;
  reviewCount: number;
  location: string;
  createdAt: string;
}

export interface StudioDetail extends Studio {
  overview: string;
  timezone: string;
  operatingHours: OperatingHours;
  host: {
    name: string;
    image: string | null;
    email?: string;
  };
  updatedAt: string;
}

export interface StudioFilterParams {
  category?: string;
  search?: string;
  sort?: 'newest' | 'price-asc' | 'price-desc' | 'rating-desc';
  page?: number;
  limit?: number;
}
