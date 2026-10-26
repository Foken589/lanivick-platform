export type ProductCategory = 'cakes' | 'pastries' | 'snacks' | 'drinks' | 'packages';

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  emoji?: string;
  isPopular?: boolean;
  isBestSeller?: boolean;
  inStock: boolean;
  preparationTime: string;
  dietary?: string[];
  variants?: ProductVariant[];
  allowCakeCustomization?: boolean;
}

export interface CakeCustomization {
  flavour: string;
  size: string;
  filling: string;
  frosting: string;
  inscription: string;
  eventDate: string;
  deliveryWindow: string;
  referenceImageUrl?: string;
  customNotes?: string;
  additionalPrice: number;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  variant?: ProductVariant;
  cakeCustomization?: CakeCustomization;
  unitPrice: number;
  totalPrice: number;
}

export interface DeliveryAddress {
  fullName: string;
  phone: string;
  city: string; // e.g. Abuja (Pyakasa, Airport Road, Gwarinpa, Central, etc.)
  streetAddress: string;
  landmark?: string;
  fulfillmentType: 'delivery' | 'pickup-pyakasa';
}

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Preparing'
  | 'Ready'
  | 'Out for Delivery'
  | 'Completed'
  | 'Cancelled';

export type PaymentStatus = 'unpaid' | 'paid' | 'pay_on_delivery';

export type PaymentMethod = 'paystack' | 'flutterwave' | 'bank_transfer' | 'delivery';

export interface Order {
  id: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  fulfillmentType: 'delivery' | 'pickup-pyakasa';
  deliveryAddress?: DeliveryAddress;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentReference?: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export type CateringEventType =
  | 'Wedding'
  | 'Birthday Party'
  | 'Corporate Event'
  | 'Office Breakfast'
  | 'School Event'
  | 'Church Function'
  | 'Anniversary'
  | 'Graduation'
  | 'Other';

export type CateringStatus = 'New' | 'Reviewing' | 'Quoted' | 'Confirmed' | 'Completed';

export interface CateringRequest {
  id: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventType: CateringEventType;
  eventDate: string;
  eventLocation: string;
  city: string;
  guestCount: number;
  cuisinePreference: string[]; // e.g. Custom Celebration Cake, VIP Small Chops, Office Breakfast Boxes
  budgetRange: string;
  dietaryRequirements?: string;
  specialRequests?: string;
  status: CateringStatus;
  estimatedQuote?: number;
  createdAt: string;
}

export interface TrainingEnquiry {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  interestArea: 'Baking Fundamentals' | 'Pastries & Meat Pies' | 'Cake Decoration' | 'Complete Masterclass';
  preferredSchedule: 'Weekday Morning' | 'Weekend Intensive' | 'Flexible';
  experienceLevel: 'Beginner' | 'Intermediate';
  notes?: string;
  createdAt: string;
}

export interface PartnershipEnquiry {
  id: string;
  organizationName: string;
  contactPerson: string;
  phone: string;
  email: string;
  organizationType: 'Event Planner' | 'School' | 'Office / Corporate' | 'Church' | 'Hotel' | 'Government Agency' | 'Other';
  collaborationType: 'Regular Snack Supply' | 'Event Catering Partnership' | 'Corporate Gift Boxes' | 'Wholesale / Bulk Orders';
  estimatedFrequency?: string;
  message: string;
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  city: string;
  category: 'Cakes' | 'Pastries' | 'Snacks' | 'Events';
  rating: number;
  text: string;
  date: string;
  verified: boolean;
  avatar?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'cakes' | 'pastries' | 'snacks' | 'events';
  image: string;
  caption: string;
}

export interface StoreSettings {
  businessName: string;
  slogan: string;
  tagline?: string;
  whatsappNumber: string;
  callPhone: string;
  email: string;
  address: string; // Area G, Pyakasa, off Airport Road, Abuja, FCT
  abujaAddress?: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  announcement: string;
  deliveryFeePyakasa?: number;
  deliveryFeeLokoja?: number;
  deliveryFeeAbuja: number;
  deliveryCoverage: string;
  openingHours: string;
  ceoName?: string;
  ceoTitle?: string;
  ceoQuote?: string;
  facebookPage?: string;
  instagramPage?: string;
  tiktokPage?: string;
  adminPassword?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  title?: string;
  savedAddresses: DeliveryAddress[];
  favorites: string[];
  createdAt: string;
}
