# Lanivick Confectionary & Vicky's Hairplace — Commercial Business Platform

> **"Made with love. Served with style."**  
> A high-converting, luxury commercial web application for **Lanivick Confectionary** (artisanal celebration cakes, savory pastries, traditional Nigerian party feasts, continental dishes) and **Vicky's Hairplace** (professional braids, knotless braids, locs, twists, wigs, and luxury home service) serving **Lokoja** and **Abuja**.

---

## 🌟 Executive Highlights

- **Dual-Engine Business Platform**: Harmoniously houses artisanal food/confectionery e-commerce alongside a full-fledged salon appointment & home service booking engine.
- **Editorial Luxury Aesthetic**: Curated color palette featuring deep royal wine (`#6d1530`), warm metallic gold (`#d8a83e`), rich cream (`#fff8ed`), and charcoal ink (`#241c20`), paired with `Playfair Display` serif typography and `Plus Jakarta Sans`.
- **Interactive Custom Cake Builder**: Multi-step wizard allowing customers to select sponge sizes (6" to 2-Tier Grand), sponge flavours, fillings, frostings, personalized plaque inscription with live visual preview, event date, and reference photo uploads.
- **Vicky's Hairplace Booking Engine**: Service catalog covering Knotless Box Braids, Passion Twists, Ghana Weaving, Locs Retwist & Dread Relock, Wigs & Revamp with a toggle for **VIP Home Service** (calculating travel surcharges for Lokoja & Abuja).
- **Catering Quotation Concierge**: Interactive guest count slider (20 to 800+ guests), cuisine checklists (smoky party jollof, small chops, continental pasta, swallows), and instant budget estimators.
- **Strategic WhatsApp Integration Layer**: Pre-formatted, polite Nigerian business WhatsApp links for instant order confirmation, hair slot reservation, catering quotation, and admin status broadcasts to customers.
- **Customer Portal & Real-Time Tracker**: 7-stage order status stepper (`Pending` → `Confirmed` → `Preparing` → `Ready` → `Out for Delivery` → `Completed`), booking calendar, saved addresses, and printable PDF receipts.
- **Protected Administrator Suite**: Real-time business analytics (Gross Paid Revenue, Active Pipeline, Bookings, Leads), live order status updater, payment status toggles, product inventory stock switch, catering proposals, and bank settings.
- **Production Architecture**: Complete PostgreSQL / Supabase migration schema (`database/schema.sql`) with 15 tables and Row Level Security (RLS) policies.

---

## 🏗️ Technical Architecture & Stack

```
lanivick-platform/
├── database/
│   └── schema.sql                # Complete PostgreSQL / Supabase schema (15 tables + RLS)
├── public/
│   └── favicon.svg               # Brand monogram favicon
├── src/
│   ├── components/
│   │   ├── cakes/
│   │   │   └── CakeCustomizerModal.tsx   # Interactive Custom Cake Builder
│   │   ├── cart/
│   │   │   └── CartDrawer.tsx            # Slide-over cart drawer with live specs
│   │   ├── catering/
│   │   │   └── CateringQuoteModal.tsx    # Catering inquiry & budget calculator
│   │   ├── checkout/
│   │   │   └── CheckoutModal.tsx         # Multi-step checkout with delivery zones
│   │   ├── common/
│   │   │   └── PrintableInvoiceModal.tsx # Formatted printable & downloadable receipt
│   │   ├── hair/
│   │   │   ├── HairBookingModal.tsx      # Hairstyle booking with home-service toggle
│   │   │   └── HairServiceCard.tsx       # Hairstyle card component
│   │   ├── layout/
│   │   │   ├── Footer.tsx                # Locations, hours, and brand links
│   │   │   └── Navbar.tsx                # Sticky luxury nav with mobile drawer
│   │   └── products/
│   │       └── ProductCard.tsx           # Product card with instant add/customize
│   ├── context/
│   │   ├── AuthContext.tsx               # Auth & Role-Based Access (Customer & Admin)
│   │   ├── CartContext.tsx               # Reactive Cart State with LocalStorage sync
│   │   └── NotificationContext.tsx       # Accessible Toast alert engine
│   ├── pages/
│   │   ├── About.tsx                     # Brand story & 4 core pillars
│   │   ├── AdminDashboard.tsx            # Protected executive console & operations
│   │   ├── Auth.tsx                      # Login, Signup, Reset & 1-click Demo switches
│   │   ├── CakesPastries.tsx             # Dedicated bakery showcase & custom builder
│   │   ├── Catering.tsx                  # Event feast packages & catering FAQ
│   │   ├── Contact.tsx                   # Studio addresses, phone, & WhatsApp chat
│   │   ├── CustomerDashboard.tsx         # Customer portal with 7-stage order tracker
│   │   ├── HairServices.tsx              # Vicky's Hairplace catalog & guide
│   │   ├── Home.tsx                      # Dual-Hero landing page & portfolio
│   │   └── OrderOnline.tsx               # Filterable & searchable menu catalog
│   ├── services/
│   │   ├── dataService.ts                # Seed store & persistent localStorage adapter
│   │   ├── paymentService.ts             # Paystack / Flutterwave integration layer
│   │   └── whatsappService.ts            # High-converting WhatsApp message generators
│   ├── types/
│   │   └── index.ts                      # Strict TypeScript domain interfaces
│   ├── App.tsx                           # Master Router & global layout
│   ├── index.css                         # Tailwind directives & luxury styles
│   └── main.tsx                          # App bootstrap entry
├── .env.example                          # Environment variable blueprint
├── package.json
├── QA_CHECKLIST.md                       # Complete QA verification matrix
├── tailwind.config.js                    # Brand color tokens, fonts & shadows
└── vite.config.ts
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18+ or v24+)
- npm (v9+)

### Installation & Run

1. Navigate to the project directory:
   ```bash
   cd lanivick-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:5173` (or the URL shown in your terminal).

5. To test building for production:
   ```bash
   npm run build
   ```

---

## 🔑 Demo Access & Testing Credentials

No registration required to test all features:
- **Instant Demo Customer**: Click "Demo Customer" in the top user menu or on the `/auth` page. Pre-loaded with orders, active deliveries in Lokoja, and saved favorites.
- **Instant Demo Administrator**: Click "Demo Admin" on the `/auth` page or in the user dropdown. Unlocks the protected **Admin Portal** (`/admin`) to update order statuses in real time, view gross revenue, manage menu inventory, and contact clients on WhatsApp.

---

## 💳 Payment Gateway Integration (Paystack & Flutterwave)

The application includes an integration layer in `src/services/paymentService.ts`:
- **Out of the box**: Runs in a test simulation mode that generates valid references and allows end-to-end checkout verification without real bank cards.
- **To connect Live Paystack**:
  1. Set `VITE_PAYMENT_PROVIDER="paystack"` in your `.env` file.
  2. Set `VITE_PAYSTACK_PUBLIC_KEY="pk_live_xxxxxxxx"` (or your test key `pk_test_xxxxxxxx`).
  3. The service dynamically loads Paystack Inline popup without any external code modifications.

---

## 🗄️ Database & Backend Production Deployment

To connect this frontend to a live **Supabase** or **PostgreSQL** database:
1. Create a new project in [Supabase](https://supabase.com).
2. Navigate to the **SQL Editor** in your Supabase dashboard.
3. Paste and run the contents of [`database/schema.sql`](./database/schema.sql).
4. Copy your `Project URL` and `anon public key` into your `.env` file (`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`).
5. Replace the LocalStorage adapter calls in `src/services/dataService.ts` with Supabase client calls (`supabase.from('orders').select('*')`).

---

## 📱 Contact & Operations Details

- **Business Name**: Lanivick Confectionary & Vicky's Hairplace
- **Owner / Lead**: Victoria
- **Phone / Call Line**: `0916 222 6176` / `+234 916 222 6176`
- **WhatsApp**: `https://wa.me/2349162226176`
- **Physical Hubs**:
  - **Lokoja Hub**: Phase 2, Ganaja Junction / Lokongoma, Lokoja, Kogi State.
  - **Abuja Branch**: Gwarinpa Estate / Wuse II Pickup Hub, Abuja, FCT.
