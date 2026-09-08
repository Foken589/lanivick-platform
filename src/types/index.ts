export type ProductCategory = 'cakes' | 'pastries' | 'meals' | 'treats';

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
  city: 'Lokoja' | 'Abuja';
  streetAddress: string;
  landmark?: string;
  fulfillmentType: 'delivery' | 'pickup-lokoja' | 'pickup-abuja';
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
  fulfillmentType: 'delivery' | 'pickup-lokoja' | 'pickup-abuja';
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

export type HairCategory = 'braids' | 'twists' | 'locs' | 'weaving' | 'wigs' | 'natural';

export interface HairService {
  id: string;
  name: string;
  description: string;
  category: HairCategory;
  startingPrice: number;
  duration: string;
  image: string;
  lengthsAvailable: string[];
  sizesAvailable: string[];
  homeServiceEligible: boolean;
  popular?: boolean;
}

export type BookingStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface HairBooking {
  id: string;
  userId?: string;
  serviceId: string;
  serviceName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  appointmentDate: string;
  appointmentTime: string;
  locationType: 'salon' | 'home_service';
  studioCity: 'Lokoja' | 'Abuja';
  homeAddress?: string;
  hairLength?: string;
  hairSize?: string;
  referenceImageUrl?: string;
  specialNotes?: string;
  estimatedPrice: number;
  status: BookingStatus;
  createdAt: string;
}

export type CateringEventType =
  | 'Wedding'
  | 'Birthday Party'
  | 'Corporate Event'
  | 'Private Dinner'
  | 'Funeral Banquet'
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
  city: 'Lokoja' | 'Abuja' | 'Other';
  guestCount: number;
  cuisinePreference: string[];
  budgetRange: string;
  dietaryRequirements?: string;
  specialRequests?: string;
  status: CateringStatus;
  estimatedQuote?: number;
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  city: 'Lokoja' | 'Abuja';
  category: 'Cakes' | 'Pastries' | 'Hair' | 'Catering';
  rating: number;
  text: string;
  date: string;
  verified: boolean;
  avatar?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'cakes' | 'pastries' | 'hair' | 'catering';
  image: string;
  caption: string;
}

export interface StoreSettings {
  whatsappNumber: string;
  callPhone: string;
  lokojaAddress: string;
  abujaAddress: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  announcement: string;
  deliveryFeeLokoja: number;
  deliveryFeeAbuja: number;
  homeServiceHairSurcharge: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  savedAddresses: DeliveryAddress[];
  favorites: string[];
  createdAt: string;
}
