'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  Building2,
  DollarSign,
  MapPin,
  Users,
  Image as ImageIcon,
  CheckSquare,
  Sparkles,
  Loader2,
  Plus,
  Trash2,
  Info
} from 'lucide-react';
import { StudioDetail, StudioCategory } from '@/types/studio';
import { createStudio, updateStudio } from '@/lib/api';
import { FallbackImage } from '@/components/ui/FallbackImage';

interface StudioFormProps {
  initialData?: StudioDetail;
  mode: 'create' | 'edit';
  userEmail: string;
  userName: string;
}

const CATEGORY_OPTIONS: { value: StudioCategory; label: string }[] = [
  { value: 'photo-studio', label: 'Photography Studio' },
  { value: 'film-stage', label: 'Dance & Film Soundstage' },
  { value: 'podcast-lounge', label: 'Podcast & Broadcast Lounge' },
  { value: 'music-suite', label: 'Music Production Suite' },
  { value: 'workshop', label: 'Art & Design Workspace' }
];

const AVAILABLE_AMENITIES = [
  'Cyclorama Wall',
  'Sound Isolation',
  'High-speed Wifi',
  'RGB LED Lighting Grid',
  'Hair & Makeup Station',
  'Private Dressing Room',
  'Professional Audio Monitors',
  'Freight Elevator',
  'Air Conditioning',
  'Kitchenette',
  'Green Screen Backdrop',
  'Microphones Included',
  'Natural Daylight',
  'Drive-in Access',
  'Lounge Area',
  'Coffee Bar'
];

const PRESET_IMAGES = [
  {
    name: 'Modern Soundstage',
    url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Daylight Photo Loft',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Podcast Room',
    url: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Music Suite',
    url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80'
  }
];

export function StudioForm({ initialData, mode, userEmail, userName }: StudioFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [title, setTitle] = useState(initialData?.title || '');
  const [category, setCategory] = useState<StudioCategory>(initialData?.category || 'photo-studio');
  const [hourlyRate, setHourlyRate] = useState(
    initialData ? (initialData.hourlyRateCents / 100).toString() : '95'
  );
  const [securityDeposit, setSecurityDeposit] = useState(
    initialData ? (initialData.securityDepositCents / 100).toString() : '150'
  );
  const [maxCapacity, setMaxCapacity] = useState(
    initialData ? initialData.maxCapacity.toString() : '10'
  );
  const [line1, setLine1] = useState(initialData?.address.line1 || '');
  const [area, setArea] = useState(initialData?.address.area || '');
  const [city, setCity] = useState(initialData?.address.city || 'Brooklyn');
  const [country, setCountry] = useState(initialData?.address.country || 'US');
  const [overview, setOverview] = useState(initialData?.overview || '');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    initialData?.amenities || ['High-speed Wifi', 'Air Conditioning', 'Sound Isolation']
  );
  const [imageUrls, setImageUrls] = useState<string[]>(
    initialData?.imageUrls?.length
      ? initialData.imageUrls
      : [
          'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80'
        ]
  );
  const [newImageUrl, setNewImageUrl] = useState('');

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const addImageUrl = () => {
    if (!newImageUrl.trim()) return;
    if (!newImageUrl.startsWith('http')) {
      toast.error('Image link must start with http:// or https://');
      return;
    }
    setImageUrls((prev) => [...prev, newImageUrl.trim()]);
    setNewImageUrl('');
  };

  const removeImageUrl = (indexToRemove: number) => {
    if (imageUrls.length <= 1) {
      toast.error('At least one studio photo is required.');
      return;
    }
    setImageUrls((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || title.length < 3) {
      toast.error('Title must be at least 3 characters long.');
      return;
    }

    if (!line1.trim() || !area.trim() || !city.trim()) {
      toast.error('Please complete the full address fields.');
      return;
    }

    const rateNum = parseFloat(hourlyRate);
    if (isNaN(rateNum) || rateNum <= 0) {
      toast.error('Please enter a valid hourly rate.');
      return;
    }

    const depositNum = parseFloat(securityDeposit || '0');
    if (isNaN(depositNum) || depositNum < 0) {
      toast.error('Please enter a valid security deposit.');
      return;
    }

    const capacityNum = parseInt(maxCapacity, 10);
    if (isNaN(capacityNum) || capacityNum < 1) {
      toast.error('Maximum capacity must be at least 1 person.');
      return;
    }

    if (overview.trim().length < 20) {
      toast.error('Please provide a detailed overview (at least 20 characters).');
      return;
    }

    if (imageUrls.length === 0) {
      toast.error('Please provide at least one photo for the studio listing.');
      return;
    }

    if (selectedAmenities.length === 0) {
      toast.error('Please select at least one amenity.');
      return;
    }

    setSubmitting(true);

    const payload = {
      title: title.trim(),
      category,
      hourlyRateCents: Math.round(rateNum * 100),
      securityDepositCents: Math.round(depositNum * 100),
      currency: 'USD',
      maxCapacity: capacityNum,
      address: {
        line1: line1.trim(),
        area: area.trim(),
        city: city.trim(),
        country: country.trim()
      },
      imageUrls,
      amenities: selectedAmenities,
      overview: overview.trim(),
      timezone: 'Asia/Dhaka'
    };

    try {
      if (mode === 'create') {
        await createStudio(payload);
        toast.success('Studio listing published successfully!');
      } else if (initialData?.id) {
        await updateStudio(initialData.id, payload);
        toast.success('Studio listing updated successfully!');
      }
      router.push('/my-listings');
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || 'Failed to save studio listing.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
      {/* 1. Basics */}
      <div className="bg-ss-surface border border-ss-border rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-ss-border pb-4">
          <Building2 className="w-6 h-6 text-ss-accent" />
          <h2 className="text-xl font-bold tracking-tight">Studio Fundamentals</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Studio Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Acoustic Soundstage Brooklyn or Daylight Loft Studio"
              className="w-full px-4 py-2.5 rounded-xl border border-ss-border bg-ss-bg focus:outline-none focus:ring-2 focus:ring-ss-accent"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as StudioCategory)}
                className="w-full px-4 py-2.5 rounded-xl border border-ss-border bg-ss-bg focus:outline-none focus:ring-2 focus:ring-ss-accent"
              >
                {CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Max Capacity (People) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Users className="w-5 h-5 absolute left-3 top-3 text-ss-muted" />
                <input
                  type="number"
                  min="1"
                  max="200"
                  value={maxCapacity}
                  onChange={(e) => setMaxCapacity(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-ss-border bg-ss-bg focus:outline-none focus:ring-2 focus:ring-ss-accent"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Rates & Pricing */}
      <div className="bg-ss-surface border border-ss-border rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-ss-border pb-4">
          <DollarSign className="w-6 h-6 text-ss-accent" />
          <h2 className="text-xl font-bold tracking-tight">Pricing & Security</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Hourly Rate ($ USD / hour) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-ss-muted font-semibold">$</span>
              <input
                type="number"
                step="1"
                min="10"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-ss-border bg-ss-bg focus:outline-none focus:ring-2 focus:ring-ss-accent"
                required
              />
            </div>
            <p className="text-xs text-ss-muted mt-1.5">Standard hourly rate billed to creators.</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              Refundable Security Deposit ($ USD)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-ss-muted font-semibold">$</span>
              <input
                type="number"
                step="1"
                min="0"
                value={securityDeposit}
                onChange={(e) => setSecurityDeposit(e.target.value)}
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-ss-border bg-ss-bg focus:outline-none focus:ring-2 focus:ring-ss-accent"
              />
            </div>
            <p className="text-xs text-ss-muted mt-1.5">Held during session; released after checkout.</p>
          </div>
        </div>
      </div>

      {/* 3. Location */}
      <div className="bg-ss-surface border border-ss-border rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-ss-border pb-4">
          <MapPin className="w-6 h-6 text-ss-accent" />
          <h2 className="text-xl font-bold tracking-tight">Location & Address</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Street Address & Suite <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={line1}
              onChange={(e) => setLine1(e.target.value)}
              placeholder="e.g. 142 S 4th St, 3rd Floor"
              className="w-full px-4 py-2.5 rounded-xl border border-ss-border bg-ss-bg focus:outline-none focus:ring-2 focus:ring-ss-accent"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Neighborhood / Area <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="e.g. Williamsburg"
                className="w-full px-4 py-2.5 rounded-xl border border-ss-border bg-ss-bg focus:outline-none focus:ring-2 focus:ring-ss-accent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Brooklyn"
                className="w-full px-4 py-2.5 rounded-xl border border-ss-border bg-ss-bg focus:outline-none focus:ring-2 focus:ring-ss-accent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Country <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="e.g. US"
                className="w-full px-4 py-2.5 rounded-xl border border-ss-border bg-ss-bg focus:outline-none focus:ring-2 focus:ring-ss-accent"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Amenities */}
      <div className="bg-ss-surface border border-ss-border rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-ss-border pb-4">
          <CheckSquare className="w-6 h-6 text-ss-accent" />
          <h2 className="text-xl font-bold tracking-tight">Studio Amenities</h2>
        </div>

        <p className="text-sm text-ss-muted">
          Select all amenities and equipment included in the space:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {AVAILABLE_AMENITIES.map((amenity) => {
            const checked = selectedAmenities.includes(amenity);
            return (
              <button
                type="button"
                key={amenity}
                onClick={() => toggleAmenity(amenity)}
                className={`flex items-center gap-2.5 p-3 rounded-xl border text-sm font-medium text-left transition-all ${
                  checked
                    ? 'border-ss-accent bg-ss-accent/10 text-ss-accent ring-1 ring-ss-accent'
                    : 'border-ss-border hover:bg-ss-bg text-ss-muted hover:text-ss-text'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center border text-xs ${
                    checked
                      ? 'bg-ss-accent border-ss-accent text-white'
                      : 'border-ss-border bg-ss-surface'
                  }`}
                >
                  {checked && '✓'}
                </div>
                <span className="truncate">{amenity}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Description & Overview */}
      <div className="bg-ss-surface border border-ss-border rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-ss-border pb-4">
          <Info className="w-6 h-6 text-ss-accent" />
          <h2 className="text-xl font-bold tracking-tight">Space Overview & Studio Rules</h2>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">
            Detailed Overview <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={5}
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            placeholder="Describe the aesthetic, ceiling height, noise isolation, lighting setup, parking access, and house rules..."
            className="w-full px-4 py-3 rounded-xl border border-ss-border bg-ss-bg focus:outline-none focus:ring-2 focus:ring-ss-accent text-sm leading-relaxed"
            required
          />
          <p className="text-xs text-ss-muted mt-1.5">Minimum 20 characters.</p>
        </div>
      </div>

      {/* 6. Studio Photography */}
      <div className="bg-ss-surface border border-ss-border rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-ss-border pb-4">
          <ImageIcon className="w-6 h-6 text-ss-accent" />
          <h2 className="text-xl font-bold tracking-tight">Studio Photos & Image Hosting</h2>
        </div>

        <p className="text-sm text-ss-muted">
          Add high-resolution image URLs (ImgBB or direct image URLs). First image will be used as
          the primary listing thumbnail.
        </p>

        {/* Preset suggestions */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-ss-muted flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-ss-accent" /> Quick Sample Presets:
          </span>
          {PRESET_IMAGES.map((preset) => (
            <button
              type="button"
              key={preset.name}
              onClick={() => {
                if (!imageUrls.includes(preset.url)) {
                  setImageUrls((prev) => [...prev, preset.url]);
                }
              }}
              className="text-xs px-2.5 py-1 rounded-full border border-ss-border bg-ss-bg hover:border-ss-accent hover:text-ss-accent transition-colors"
            >
              + {preset.name}
            </button>
          ))}
        </div>

        {/* Input box */}
        <div className="flex gap-2">
          <input
            type="url"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            placeholder="Paste direct image link or ImgBB URL (https://...)"
            className="flex-1 px-4 py-2.5 rounded-xl border border-ss-border bg-ss-bg focus:outline-none focus:ring-2 focus:ring-ss-accent text-sm"
          />
          <button
            type="button"
            onClick={addImageUrl}
            className="px-4 py-2.5 bg-ss-surface border border-ss-border rounded-xl font-semibold text-sm hover:border-ss-accent flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>

        {/* Thumbnails grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          {imageUrls.map((url, idx) => (
            <div
              key={idx}
              className="group relative aspect-video rounded-xl overflow-hidden border border-ss-border bg-ss-bg"
            >
              <FallbackImage
                src={url}
                alt={`Studio Image ${idx + 1}`}
                className="absolute inset-0 h-full w-full object-cover"
              />
              {idx === 0 && (
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-ss-accent text-white text-[10px] font-bold uppercase tracking-wider shadow">
                  Cover
                </span>
              )}
              <button
                type="button"
                onClick={() => removeImageUrl(idx)}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700 shadow"
                title="Remove image"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Host Verification (Read-only) */}
      <div className="bg-ss-surface border border-ss-border rounded-2xl p-6 sm:p-8 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-ss-muted">
          Host Identity Verification
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-ss-muted mb-1">
              Host Name (Auto-filled)
            </label>
            <input
              type="text"
              readOnly
              value={userName}
              className="w-full px-4 py-2 rounded-xl border border-ss-border bg-ss-bg/50 text-ss-muted text-sm cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-ss-muted mb-1">
              Host Contact Email (Auto-filled)
            </label>
            <input
              type="text"
              readOnly
              value={userEmail}
              className="w-full px-4 py-2 rounded-xl border border-ss-border bg-ss-bg/50 text-ss-muted text-sm cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      {/* Submit CTA */}
      <div className="flex items-center justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 rounded-xl border border-ss-border font-semibold text-sm hover:bg-ss-surface transition-colors"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={submitting}
          className="px-8 py-3 rounded-xl bg-ss-accent text-white font-semibold text-sm hover:opacity-90 shadow-lg shadow-ss-accent/20 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Saving Listing...
            </>
          ) : mode === 'create' ? (
            'Publish Studio Listing'
          ) : (
            'Save Changes'
          )}
        </button>
      </div>
    </form>
  );
}

