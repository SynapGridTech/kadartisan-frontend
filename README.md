# KadArtisan Frontend

KadArtisan is a digital platform designed to connect skilled local artisans with customers seeking reliable and verified services.  
This repository contains the frontend application for the KadArtisan MVP.

The MVP focuses on Kaduna State, with a scalable architecture to support expansion across Northern Nigeria.

---

## 🎯 Purpose

The frontend application provides:
- Artisan discovery and search
- Artisan profile creation and management
- Customer booking requests
- Reviews and ratings
- Admin and artisan dashboards
- Mobile-first, accessible user experience

---

## 🧑‍💼 Target Users

- **Artisans** – Create verified profiles, upload work samples, manage bookings
- **Customers** – Discover artisans, request services, leave reviews
- **Administrators** – Monitor activity, verify artisans, manage reports

---

## 🧱 Tech Stack (Recommended)

- **Framework:** React / Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit / Zustand
- **Data Fetching:** Axios / React Query
- **Forms & Validation:** React Hook Form + Zod
- **Auth:** JWT-based authentication
- **Maps (Optional):** Google Maps / Mapbox
- **UI Components:** Headless UI / ShadCN (optional)

---

## 📐 Key Features (MVP)

- Responsive landing page
- Artisan registration & login
- Artisan profile setup (skills, bio, work samples)
- Artisan discovery by category, location, rating
- Booking request flow
- Review & rating UI
- Artisan dashboard
- Admin dashboard (basic)
- Accessibility-focused UI (large tap targets, readable fonts)

---

## 🗂️ Project Structure (Example)

```text
src/
├── components/
├── pages/
├── features/
│   ├── auth/
│   ├── artisans/
│   ├── bookings/
│   └── reviews/
├── services/
├── hooks/
├── utils/
└── styles/
