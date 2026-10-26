-- ====================================================================
-- LANIVICK CONFECTIONARY — PRODUCTION DATABASE SCHEMA
-- Location: Area G, Pyakasa, off Airport Road, Abuja, FCT
-- PostgreSQL / Supabase Migration
-- ====================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ENUM TYPES
CREATE TYPE user_role AS ENUM ('customer', 'admin', 'staff');
CREATE TYPE order_status AS ENUM (
  'Pending',
  'Confirmed',
  'Preparing',
  'Ready',
  'Out for Delivery',
  'Completed',
  'Cancelled'
);
CREATE TYPE payment_status AS ENUM ('unpaid', 'paid', 'refunded', 'pay_on_delivery');
CREATE TYPE payment_method AS ENUM ('paystack', 'flutterwave', 'bank_transfer', 'delivery');
CREATE TYPE catering_status AS ENUM ('New', 'Reviewing', 'Quoted', 'Confirmed', 'Completed');

-- 2. USERS & PROFILES
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  alternate_phone TEXT,
  role user_role DEFAULT 'customer',
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Saved delivery addresses
CREATE TABLE IF NOT EXISTS saved_addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  recipient_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL DEFAULT 'Abuja',
  street_address TEXT NOT NULL,
  landmark TEXT,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CATEGORIES
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PRODUCTS & VARIANTS
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  category_id TEXT REFERENCES categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
  original_price NUMERIC(12, 2),
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  emoji TEXT,
  is_popular BOOLEAN DEFAULT FALSE,
  is_best_seller BOOLEAN DEFAULT FALSE,
  in_stock BOOLEAN DEFAULT TRUE,
  preparation_time TEXT NOT NULL DEFAULT '24 hours',
  allow_cake_customization BOOLEAN DEFAULT FALSE,
  dietary_tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS product_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id TEXT REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price NUMERIC(12, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. ORDERS & ORDER ITEMS
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY, -- e.g. LAN-89241
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  subtotal NUMERIC(12, 2) NOT NULL CHECK (subtotal >= 0),
  delivery_fee NUMERIC(12, 2) NOT NULL DEFAULT 0,
  total NUMERIC(12, 2) NOT NULL CHECK (total >= 0),
  fulfillment_type TEXT NOT NULL CHECK (fulfillment_type IN ('delivery', 'pickup-pyakasa')),
  city TEXT DEFAULT 'Abuja',
  street_address TEXT,
  landmark TEXT,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  notes TEXT,
  payment_method payment_method NOT NULL,
  payment_status payment_status NOT NULL DEFAULT 'unpaid',
  payment_reference TEXT,
  status order_status NOT NULL DEFAULT 'Pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id TEXT REFERENCES orders(id) ON DELETE CASCADE,
  product_id TEXT REFERENCES products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  quantity INT NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(12, 2) NOT NULL,
  total_price NUMERIC(12, 2) NOT NULL,
  -- Cake Customization Specs
  cake_flavour TEXT,
  cake_size TEXT,
  cake_filling TEXT,
  cake_frosting TEXT,
  cake_inscription TEXT,
  reference_image_url TEXT,
  custom_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. PAYMENTS LEDGER
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id TEXT REFERENCES orders(id) ON DELETE CASCADE,
  provider TEXT NOT NULL, -- 'paystack', 'flutterwave', 'bank_transfer'
  reference TEXT NOT NULL UNIQUE,
  amount NUMERIC(12, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'NGN',
  status payment_status NOT NULL,
  channel TEXT, -- card, bank, ussd, qr
  raw_payload JSONB,
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. CATERING & EVENT REQUESTS
CREATE TABLE IF NOT EXISTS catering_requests (
  id TEXT PRIMARY KEY, -- e.g. CAT-3180
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  event_type TEXT NOT NULL,
  event_date DATE NOT NULL,
  event_location TEXT NOT NULL,
  city TEXT NOT NULL DEFAULT 'Abuja',
  guest_count INT NOT NULL CHECK (guest_count >= 1),
  cuisine_preferences TEXT[] NOT NULL,
  budget_range TEXT NOT NULL,
  dietary_requirements TEXT,
  special_requests TEXT,
  status catering_status NOT NULL DEFAULT 'New',
  estimated_quote NUMERIC(12, 2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. BAKING & PASTRY TRAINING ENQUIRIES
CREATE TABLE IF NOT EXISTS training_enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  interest_area TEXT NOT NULL,
  preferred_schedule TEXT NOT NULL,
  experience_level TEXT NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'New',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. CORPORATE & INSTITUTIONAL PARTNERSHIPS
CREATE TABLE IF NOT EXISTS partnership_enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  organization_type TEXT NOT NULL,
  collaboration_type TEXT NOT NULL,
  estimated_frequency TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'New',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. REVIEWS & TESTIMONIALS
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author TEXT NOT NULL,
  role TEXT,
  city TEXT NOT NULL DEFAULT 'Abuja',
  category TEXT NOT NULL CHECK (category IN ('Cakes', 'Pastries', 'Snacks', 'Events')),
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  date TEXT NOT NULL,
  verified BOOLEAN DEFAULT TRUE,
  avatar_url TEXT,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. GALLERY
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('cakes', 'pastries', 'snacks', 'events')),
  image_url TEXT NOT NULL,
  caption TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. STORE SETTINGS
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. PERFORMANCE INDEXES
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_catering_date ON catering_requests(event_date);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);

-- 15. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE catering_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE partnership_enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can insert an order" ON orders
  FOR INSERT WITH CHECK (true);

-- 16. SEED DATA
INSERT INTO categories (id, name, description, icon, display_order) VALUES
('cakes', 'Cakes', 'Celebration, birthday & custom tiered cakes', '🎂', 1),
('pastries', 'Pastries', 'Flaky beef meat pies, sausage rolls, and egg rolls', '🥧', 2),
('snacks', 'VIP Chops & Snacks', 'Crispy spring rolls, samosas, peppered wings & puff puff', '🍢', 3),
('drinks', 'Natural Drinks', 'Fresh zobo infusion, tigernut milk, juices & fruit parfaits', '🥤', 4),
('packages', 'Packages & Boxes', 'Corporate breakfast boxes, meeting snack packs & party packages', '🎁', 5)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  display_order = EXCLUDED.display_order;
