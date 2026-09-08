# QA Testing & Verification Checklist — Lanivick Business Platform

This checklist verifies all functional, responsive, accessible, and conversion features across the application.

---

## 📋 1. Navigation, Header & Branding
- [x] **Brand Monogram & Typography**: "Lanivick Confectionary & Beauty" rendered with Playfair Display & luxury wine/gold palette.
- [x] **Announcement Ticker**: Displays custom store promotion, Lokoja/Abuja badges, and direct call link.
- [x] **Desktop Navigation**: Smooth transitions to Home, Order Online, Cakes & Pastries, Catering, Hair Services, About, Contact.
- [x] **Mobile Drawer**: Responsive hamburger menu with active link states, quick demo access buttons, and touch tap targets.
- [x] **Floating WhatsApp Badge**: Persistent floating pill button on mobile and desktop opening `0916 222 6176` on WhatsApp.

---

## 🍰 2. Confectionery Catalog & Custom Cake Builder
- [x] **Category Filtering**: Instant switching between All, Cakes, Pastries & Snacks, Meals, and Treats.
- [x] **Search & Sorting**: Live substring query search for items ("meat pie", "vanilla", "jollof") and price sort (Low-to-High / High-to-Low).
- [x] **In-Stock Filtering**: Toggle switch to hide sold-out items.
- [x] **Interactive Custom Cake Builder**:
  - Size selection (6", 8", 10", 2-Tier Grand Celebration) dynamically recalculating base price.
  - Sponge flavour selector (Velvet Vanilla, Belgian Chocolate, Royal Red Velvet, etc.).
  - Filling and outer frosting options.
  - Custom Plaque Inscription input with **live visual gold-foil plaque preview**.
  - Event date picker & delivery time window selector.
  - Image upload file input with instant thumbnail preview.
  - Add to Basket button bundles all custom specifications into a unique cart line item.

---

## 🛒 3. Basket & Multi-Step Checkout
- [x] **Cart Slide-Over**: Smooth slide-over drawer displaying items, customized specifications, and quantity increment/decrement controls.
- [x] **Empty State**: Friendly empty state with "Explore Menu" call to action.
- [x] **Checkout Step**:
  - Pre-fills name, phone, and email if user is authenticated.
  - Fulfillment options: Doorstep Delivery (calculating ₦1,500 for Lokoja vs ₦2,500 for Abuja) and Free Hub Pickups (Lokoja / Abuja).
  - Date & Preferred Time slot selection.
  - Payment options: Paystack Card simulation, Direct Bank Transfer (displaying GTBank details with 1-click copy account number), and Pay on Delivery.
  - Order submission generates a unique order reference (`#LAN-XXXXX`), clears cart, triggers confetti celebration, and presents the WhatsApp Confirmation button.
  - WhatsApp confirmation button formats the complete itemized order with address and prices for `0916 222 6176`.

---

## 💇‍♀️ 4. Vicky's Hairplace Booking Flow
- [x] **Hairstyle Catalog**: Knotless Box Braids, Passion Twists, Ghana Weaving, Locs Retwist & Dread Relock, Wigs & Revamp, Sleek Ponytails.
- [x] **Hair Length & Size Options**: Mid-Back, Waist Length (+₦4,000), Butt/Knee Length (+₦8,000), Smedium/Small (+₦3,000).
- [x] **Home Service Toggle**: Adds home service surcharge (₦5,000) and prompts for home address in Lokoja or Abuja.
- [x] **Appointment Date & Time Slot**: Smart slots (9:00 AM, 11:30 AM, 2:00 PM, 4:30 PM).
- [x] **Reference Hairstyle Upload**: File reader with instant photo preview.
- [x] **Booking Confirmation**: Submits appointment (`#HB-XXXX`), logs into database/localStorage, and offers 1-click WhatsApp dispatch to Vicky.

---

## 🍲 5. Event Catering Concierge
- [x] **Occasion Selector**: Weddings, Birthdays, Corporate Lunches, Private Dinners, Funeral Banquets.
- [x] **Guest Count Slider**: Ranges from 20 to 800+ guests with dynamic baseline cost calculation (~₦4,500/guest).
- [x] **Menu Checklist**: Smoky Party Jollof & Fried Rice, Peppered Meats, VIP Small Chops, Continental Pastas, Traditional Swallows, Desserts.
- [x] **Budget Ranges**: ₦150k-₦350k, ₦350k-₦750k, ₦750k-₦1.5M, ₦1.5M-₦3.5M+.
- [x] **Proposal Submission**: Logs inquiry (`#CAT-XXXX`) and generates formatted WhatsApp proposal text for Victoria.

---

## 👤 6. Customer Dashboard
- [x] **Welcome Profile**: Shows customer name, email, phone, and role.
- [x] **7-Stage Live Order Stepper**: Displays visual progress bar through `Pending` → `Confirmed` → `Preparing` → `Ready` → `Out for Delivery` → `Completed`.
- [x] **Printable PDF Receipt**: Opens official branded invoice preview with customer details, itemized table, and browser print trigger (`window.print()`).
- [x] **Hair Bookings Tab**: Lists upcoming appointments with service name, slot, and salon vs home service venue.
- [x] **Favorites Tab**: Grid of liked products with one-click Add to Basket.
- [x] **Profile & Address Manager**: Update phone, name, and default delivery street address.

---

## 🛡️ 7. Protected Admin Operations Suite
- [x] **Access Protection**: Role-gated route preventing unauthorized visitors and providing 1-click "Enter as Admin" demo switch.
- [x] **Executive Analytics**: Gross Paid Revenue (₦), Active Pipeline Count, Pending Hair Slots, New Catering Inquiries.
- [x] **Live Order Status Updater**: Dropdown that immediately updates customer order status and persists across sessions.
- [x] **Payment Status Toggle**: One-click toggle between `paid` and `unpaid`.
- [x] **Customer WhatsApp Dispatcher**: Admin can message any customer with a prefilled update containing their order status and tracking ID.
- [x] **Invoice Generation**: Formatted printable receipt modal for any order.
- [x] **Hair Bookings Manager**: View client styles, dates, and locations.
- [x] **Catering Proposals Manager**: Review guest counts, cuisine stations, and client budgets.
- [x] **Inventory & Stock Manager**: One-click in-stock / out-of-stock toggle on any product, plus "Add New Product" modal with image, category, and price.
- [x] **Store & Bank Settings**: Update WhatsApp number, call phone, bank details (GTBank account name & number), and delivery fees for Lokoja & Abuja.

---

## ♿ 8. Accessibility, Performance & SEO
- [x] **Semantic HTML**: Structured `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<dialog>` patterns.
- [x] **Accessible Forms & Colors**: High contrast ratio between deep wine/charcoal ink and cream backgrounds.
- [x] **Local SEO & Structured Data**: JSON-LD `Bakery` and `BeautySalon` schemas embedded in `index.html` with Lokoja and Abuja geo-locations.
- [x] **Print Styles**: Clean `@media print` CSS isolating the invoice card for clear A4 paper or PDF export.
