# StudioSpace — Peer-to-Peer Creative Workspace & Production Studio Sharing Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.4.0-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-Database-47A248?logo=mongodb)](https://www.mongodb.com/atlas)
[![BetterAuth](https://img.shields.io/badge/BetterAuth-Authentication-purple)](https://better-auth.com/)

> **Batch 14 Category Harry — StudioSpace**  
> A peer-to-peer marketplace where hosts list film stages, photo studios, podcast suites, and music spaces, and creators discover, inspect availability, and book creative workspaces with transparent hourly pricing and zero double-booking concurrency conflicts.

---

## 🌐 Live URLs & Deployment

- **Client Live Site**: [https://studiospace-client.vercel.app](https://studiospace-client.vercel.app) *(or active hosting)*
- **Backend API**: [https://studiospace-server.onrender.com](https://studiospace-server.onrender.com) *(or active server host)*
- **GitHub Client Repository**: [https://github.com/mahfuzhasan2700/studiospace-client](https://github.com/mahfuzhasan2700/studiospace-client)
- **GitHub Server Repository**: [https://github.com/mahfuzhasan2700/studiospace-server](https://github.com/mahfuzhasan2700/studiospace-server)

---

## 🔑 Examiner Test Credentials

Examiners can log in immediately using these pre-seeded, active accounts:

| Role | Email | Password | Access Capabilities |
| :--- | :--- | :--- | :--- |
| **Studio Host** | `host@studiospace.io` | `Host1234!` | Add new studios, edit/delete listings, review and confirm incoming booking requests |
| **Creator / Director** | `creator@studiospace.io` | `Creator1234!` | Explore studios, book sessions, manage reservations, cancel pending slots, download PDF invoices |

> *Self-registration is also supported with live password security validation (min 6 characters, uppercase + lowercase).*

---

## ✨ 5 Key Architectural Features

1. **Challenge 1: JWT in HTTPOnly Cookie Auth Integration**  
   BetterAuth user management backed by MongoDB Atlas. Upon session creation, an HS256-signed JWT is issued in a secure HTTPOnly cookie (`token`), protecting private mutation routes (`/add-studio`, `/my-listings`, `/my-bookings`) from cross-site scripting (XSS) leaks and ensuring session survival on hard page refreshes.

2. **Challenge 2: Concurrency & Double-Booking Prevention**  
   Server-side interval overlap validation strictly verifies `{ status: 'Confirmed', startTime: { $lt: requestedEnd }, endTime: { $gt: requestedStart } }` before booking creation and host confirmation. Returns HTTP 409 Conflict with the clear, unambiguous message:  
   *`"This time slot has already been booked. Please select another time."`*

3. **Dynamic Studio Discovery & Advanced Filtering**  
   Real-time multi-criteria filtering across 5 creative categories (*Photography Studio, Film & Dance Soundstage, Podcast Lounge, Music Suite, Creative Workshop*), text keyword search, location, sort ordering (Price Low-to-High, High-to-Low, Top-Rated), and active filter badges with one-click reset.

4. **Host Studio Management & Custom Deletion Modal**  
   Full CRUD workflow for hosts: list spaces with technical specs, amenities chips, ImgBB/direct image links, and custom hourly/deposit pricing. Deletions trigger an accessible custom confirmation dialog modal—no native browser `alert()` or `confirm()`—with instant Sonner toast feedback.

5. **Creator Reservation Engine with PDF Invoicing (Bonus)**  
   Creators select dates, start time, and end time with live price calculation (Hourly Rate × Duration + Refundable Deposit). Features two-way reservation tracking (Creator Reservations & Host Requests) and a one-click printable PDF invoice generator for accounting.

---

## 🛠️ Tech Stack

### Client-Side
- **Framework**: Next.js 16 (`16.4.0` App Router with Webpack builder for maximum Windows/Node 24 stability)
- **Language**: TypeScript (`^5.7`)
- **Styling**: Tailwind CSS v3, CSS variables design tokens (`ss-bg`, `ss-surface`, `ss-accent`), `next-themes` (Dark/Light mode switch)
- **UI Components & Icons**: `lucide-react`, `sonner` toasts, `swiper` 11 (Hero slider with autoplay and counters)
- **Auth Client**: BetterAuth React client (`@better-auth/react`)

### Server-Side
- **Runtime**: Node.js v24.20.0
- **Framework**: Express.js 5 / TypeScript
- **Database**: MongoDB Atlas (`studiospace_db`) with official `mongodb` native driver (Strictly **No SQLite**)
- **Authentication**: BetterAuth with MongoDB adapter + `jose` JWT cookies

---

## 🚀 Local Setup & Installation

### Prerequisites
- Node.js `v20.x` or `v24.x`
- Git

### 1. Clone the Repositories
```bash
git clone https://github.com/mahfuzhasan2700/studiospace-client.git
git clone https://github.com/mahfuzhasan2700/studiospace-server.git
```

### 2. Configure Client Environment
In `studiospace-client/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
SERVER_URL=http://localhost:5000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

### 3. Run Development Server
```bash
cd studiospace-client
npm install --legacy-peer-deps
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Repository Structure
```
studiospace-client/
├── src/
│   ├── app/
│   │   ├── (auth)/login & register
│   │   ├── add-studio/             # Host studio listing form
│   │   ├── dashboard/              # Creator & host metrics hub
│   │   ├── my-bookings/            # Reservations & PDF invoice print
│   │   ├── my-listings/            # Host listings & custom deletion
│   │   ├── saved/                  # Wishlist bookmarks
│   │   ├── studios/                # Explore studios & search filters
│   │   │   ├── [id]/               # Studio details & booking widget
│   │   │   └── edit/[id]/          # Edit studio listing
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── components/
│   │   ├── layout/                 # Navbar, Footer, ThemeToggle
│   │   └── ui/                     # StudioCard, ConfirmDialog, WishlistButton
│   ├── features/
│   │   ├── bookings/               # BookingWidget & Concurrency error dialog
│   │   ├── home/                   # HeroSlider, CategoryGrid, FeaturedStudios
│   │   └── studios/                # StudioForm, StudioFilters
│   ├── hooks/                      # useWishlist
│   ├── lib/                        # api client, auth-client
│   └── types/                      # studio.ts, booking.ts
```

---

## 🔒 Security & Challenge Implementations

- **Challenge 1 (JWT in HTTPOnly Cookie)**: Sessions are automatically exchanged for a signed HS256 JWT cookie upon sign-in. All mutations check this cookie server-side.
- **Challenge 2 (Double-Booking Prevention)**: Strict non-overlapping interval query prevents simultaneous bookings for the same studio.
- **Zero Native Alerts**: All confirmations use `<ConfirmDialog />` and notifications use Sonner toasts.
- **No Dummy Lorem Ipsum**: 100% authentic production studio photography and real NYC/Brooklyn studio specs.
