# StudioSpace — Client Frontend Web Application

[![Next.js](https://img.shields.io/badge/Next.js-16.4.0_App_Router-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![BetterAuth](https://img.shields.io/badge/BetterAuth-React_Client-purple)](https://better-auth.com/)
[![Vercel Production](https://img.shields.io/badge/Vercel-Deployed-success?logo=vercel)](https://studiospace-client-eight.vercel.app)
[![Node.js](https://img.shields.io/badge/Node.js-v24.20.0-green?logo=node.js)](https://nodejs.org/)

> **StudioSpace** is a peer-to-peer creative production workspace marketplace built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Claude.ai-inspired editorial minimalism**.
> Creators discover, filter, inspect dynamic availability, and reserve photography cycloramas, film sound stages, podcast lounges, and music suites with transparent hourly pricing and zero double-booking concurrency conflicts.

---

## 🌐 Live Production Deployments

| Resource | URL | Status |
| :--- | :--- | :---: |
| **Client Frontend Application** | [https://studiospace-client-eight.vercel.app](https://studiospace-client-eight.vercel.app) | 🟢 Live |
| **Backend REST API** | [https://studiospace-server-theta.vercel.app](https://studiospace-server-theta.vercel.app) | 🟢 Live |
| **Client GitHub Repository** | [github.com/mahfuzhasan2700/studiospace-client](https://github.com/mahfuzhasan2700/studiospace-client) | 🟢 Public |
| **Server GitHub Repository** | [github.com/mahfuzhasan2700/studiospace-server](https://github.com/mahfuzhasan2700/studiospace-server) | 🟢 Public |

---

## 🔑 Examiner Test Accounts

Examiners can test all platform roles and permissions immediately with pre-seeded accounts:

| Role | Email | Password | Permissions & Workflow |
| :--- | :--- | :--- | :--- |
| **Studio Host** | `host@studiospace.io` | `Host1234!` | Full CRUD on listings (`/add-studio`, `/my-listings`, `/studios/edit/[id]`), review and confirm incoming creator booking requests, lock time slots. |
| **Creator / Director** | `creator@studiospace.io` | `Creator1234!` | Explore catalog (`/studios`), reserve workspaces via interactive widget, manage reservations (`/my-bookings`), cancel pending sessions, download PDF receipts. |

*Self-registration via `/register` is fully supported with real-time password validation (min 6 characters, uppercase + lowercase).*

---

## 🏛️ Architecture & System Design

```
┌────────────────────────────────────────────────────────────────────────┐
│                   STUDIOSPACE FRONTEND (Next.js 16)                    │
│                                                                        │
│  [Claude Typography]     [Motion Dynamics]       [Theme Tokens]        │
│  Lora / Newsreader       Auto-Slide Progress     Light / Dark Mode     │
│  Inter / JetBrains       Scroll-Aware Nav        CSS Variables         │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
               Same-Origin Rewrite  │  /api/* -> ${SERVER_URL}/api/*
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   STUDIOSPACE SERVER (Express 5)                       │
│                                                                        │
│  [Challenge 1]           [Challenge 2]           [Dual-Role Engine]    │
│  JWT in HTTPOnly Cookie  Interval Concurrency    Host Listings &       │
│  CSRF & Session Bound    Atomic MongoDB Check    Creator Bookings      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   DATABASE (MongoDB Atlas Replica Set)                 │
│      Collections: studios  •  bookings  •  users  •  sessions          │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 All 12 Production Routes

The application features complete end-to-end routing with zero dead links:

| Path | Page Description | Access Control | Key Features |
| :--- | :--- | :---: | :--- |
| `/` | **Home Page** | Public | Auto-progressing Hero Slider (7s timer bar), dynamic Category rail, Featured Studios grid, platform trust metrics. |
| `/studios` | **Studio Catalog & Search** | Public | Multi-criteria search, category filters, sorting (Price/Rating/Newest), active filter dismiss pills, pagination. |
| `/studios/[id]` | **Studio Details** | Public | High-res photo gallery with fallback safety, equipped amenities, host verification badge, sticky booking widget. |
| `/studios/edit/[id]` | **Edit Studio** | Host Only | Update specs, pricing, amenities, and photo URLs with ownership verification. |
| `/add-studio` | **List New Space** | Host Only | Dynamic multi-photo inputs, amenities selector, deposit & rate configuration. |
| `/my-bookings` | **Reservations Hub** | Authenticated | Dual-view tabs (Creator Reservations & Host Requests), live pulsing status beacons, cancellation modal, printable PDF invoice. |
| `/my-listings` | **Inventory Hub** | Host Only | Host workspace management, quick link to public view, custom non-native deletion confirmation modal. |
| `/saved` | **Wishlist Workspaces** | Public / Local | Bookmark studios with interactive heart pop micro-animation, persistent storage across sessions. |
| `/dashboard` | **Activity Overview** | Authenticated | Metrics cards showing total reservations, hosted spaces, and quick action shortcuts. |
| `/how-it-works` | **Platform Guide** | Public | Step-by-step workflow guide for creators and studio hosts, safety policies. |
| `/about` | **About StudioSpace** | Public | Mission statement, team story, and creative community standards. |
| `/login` & `/register` | **Authentication** | Public | BetterAuth integration with credential validation and automatic redirection to requested URL. |

---

## 🛡️ Core Assignment Challenges Implemented

### 1. Challenge 1: JWT in HTTPOnly Cookie Auth Integration
* **Implementation**: Upon session creation via BetterAuth, the client exchanges the session with `POST /api/session/token`. The server issues an HS256-signed JWT inside a dedicated `token` cookie with `HttpOnly; SameSite=Lax; Secure`.
* **Security Benefit**: Authentication tokens are physically inaccessible to browser JavaScript (`document.cookie`), preventing XSS token harvesting.
* **Session Resilience**: Hard browser refreshes on protected routes (`/my-bookings`, `/my-listings`, `/add-studio`) seamlessly verify the cookie without flashing logout states.

### 2. Challenge 2: Concurrency & Double-Booking Prevention
* **Implementation**: The booking widget and backend evaluate interval overlaps against all `Confirmed` sessions in MongoDB:
  $$\text{Overlap} \iff (\text{Existing Start} < \text{Requested End}) \land (\text{Existing End} > \text{Requested Start})$$
* **User Feedback**: When a conflict occurs, the API returns **HTTP 409 Conflict** with:
  > *"This time slot has already been booked. Please select another time."*
* **Frontend Handling**: Visually highlighted in the booking widget with an animated warning alert and Sonner error toast.

### 3. Challenge 3: Dark / Light Mode Switch
* **Implementation**: Built with `next-themes` and a custom CSS variable design token system (`--ss-bg`, `--ss-surface`, `--ss-text`, `--ss-muted`, `--ss-accent`).
* **Design Consistency**: Smooth 300ms transition between warm paper-toned editorial light mode and deep contrast dark mode without layout shift.

---

## 🎨 Claude.ai Typography & Motion Dynamics

1. **Claude Editorial Font Stack**:
   * **Headings**: `Anthropic Serif` / `Lora` / `Newsreader` / `Tiempos Headline` (warm literary editorial serif).
   * **Body & UI**: `Anthropic Sans` / `Inter` (high-legibility neo-grotesque sans).
   * **Data & Pricing**: `Anthropic Mono` / `JetBrains Mono` (crisp monospaced specs).
2. **Motion Dynamics & UI Automation**:
   * **Automated Slider Progress Bar**: Linear countdown timer bar (`animate-slide-progress`) on the active hero tab with auto-pause on mouse hover.
   * **Scroll-Aware Header**: Automated scroll listener adds frosted glass blur (`backdrop-blur-xl`) and elevation when scrolled.
   * **Card Spring Physics**: Smooth card lift (`transform: translateY(-6px)`) with cubic-bezier easing and floating category badges.
   * **Dual-Tier Image Fallback**: `<FallbackImage />` gracefully falls back to verified daylight studio photography if external images 404.
   * **Wishlist Pop Animation**: Interactive heart spring scale animation (`scale-1.35 -> scale-1`) on bookmark toggle.

---

## 📦 Local Development Setup

### Prerequisites
- Node.js `v20.x` or `v24.x`
- Git

### 1. Clone & Install
```bash
git clone https://github.com/mahfuzhasan2700/studiospace-client.git
cd studiospace-client
npm install --legacy-peer-deps
```

### 2. Environment Variables
Create `.env.local` in the project root:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
SERVER_URL=http://localhost:5000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

### 3. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build Verification
```bash
npm run build
```
*(Runs Next.js 16 Webpack build and type checks across all 12 routes with 0 errors).*

---

## 📄 License & Attribution

Developed by **Mahfuz Hasan** for the **StudioSpace Marketplace Platform**.
All studio imagery licensed under Unsplash License. Open-source under the MIT License.
