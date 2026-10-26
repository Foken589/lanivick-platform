import {
  Product,
  Order,
  CateringRequest,
  TrainingEnquiry,
  PartnershipEnquiry,
  Review,
  GalleryItem,
  StoreSettings,
  UserProfile,
} from '../types';

export const INITIAL_SETTINGS: StoreSettings = {
  businessName: 'Lanivick Confectionary',
  slogan: 'Premium Taste, Healthy Treats and Perfect Craft',
  tagline: 'Premium Taste, Healthy Treats and Perfect Craft',
  whatsappNumber: '2349162226176',
  callPhone: '+234 916 222 6176',
  email: 'lanivick555@gmail.com',
  address: 'Area G, Pyakasa, off Airport Road, Abuja, Federal Capital Territory, Nigeria',
  abujaAddress: 'Area G, Pyakasa, off Airport Road, Abuja, Federal Capital Territory, Nigeria',
  bankName: 'Official Account Configured Upon Invoice',
  accountNumber: 'Verified Upon Order Confirmation',
  accountName: 'Lanivick Confectionary',
  announcement: '✨ Premium Taste, Healthy Treats and Perfect Craft — Freshly baked cakes, pastries & natural drinks in Pyakasa, Abuja.',
  deliveryFeePyakasa: 1500,
  deliveryFeeLokoja: 1500,
  deliveryFeeAbuja: 2500,
  deliveryCoverage: 'Area G, Pyakasa, Airport Road Corridor, and surrounding areas of Abuja',
  openingHours: 'Monday–Saturday: 8:00 a.m. – 7:00 p.m. | Sunday: Pre-orders & special event orders',
  ceoName: 'Danladi Victoria Lanishe',
  ceoTitle: 'Proprietor & Master Baker',
  ceoQuote: 'Life is what you bake it. We just make it sweeter! ❤️',
  facebookPage: 'Lanivick Confectionary',
  instagramPage: 'lanivick_confectionary',
  tiktokPage: 'lanivickconfectionary',
  adminPassword: 'lanivick2026',
};

export const INITIAL_PRODUCTS: Product[] = [
  // ===================== CAKES & CELEBRATION CAKES =====================
  {
    id: 'cake-vanilla-luxury',
    name: 'Vanilla Celebration Crown Cake',
    category: 'cakes',
    price: 30000,
    originalPrice: 35000,
    description: 'Ultra-moist Madagascar vanilla sponge layered with fluffy buttercream, subtle gold dusting, and elegant piping. Perfect for intimate birthdays and family celebrations.',
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=700&auto=format&fit=crop&q=80',
    emoji: '🎂',
    isPopular: true,
    isBestSeller: true,
    inStock: true,
    preparationTime: '24-48 hours',
    dietary: ['Vegetarian'],
    allowCakeCustomization: true,
  },
  {
    id: 'cake-belgian-chocolate',
    name: 'Decadent Belgian Chocolate Drip Cake',
    category: 'cakes',
    price: 35000,
    description: 'Deep cocoa fudge layers drenched with 70% dark chocolate ganache, crisp chocolate pearls, and artisan crown piping.',
    image: '/images/products/cake-belgian-chocolate.jpg',
    emoji: '🍫',
    isPopular: true,
    inStock: true,
    preparationTime: '24 hours',
    allowCakeCustomization: true,
  },
  {
    id: 'cake-royal-redvelvet',
    name: 'Royal Red Velvet Celebration Cake',
    category: 'cakes',
    price: 35000,
    description: 'Rich scarlet buttermilk sponge filled with tangy cream cheese frosting and white chocolate curls. A show-stopping centerpiece for birthdays and anniversaries.',
    image: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=700&auto=format&fit=crop&q=80',
    emoji: '❤️',
    isPopular: true,
    isBestSeller: true,
    inStock: true,
    preparationTime: '24 hours',
    allowCakeCustomization: true,
  },
  {
    id: 'cake-strawberry-drip',
    name: 'Strawberry Sweetness Celebration Cake',
    category: 'cakes',
    price: 32000,
    description: 'Fluffy strawberry sponge layered with strawberry compote, pink white-chocolate drip, and fresh garden strawberries. As featured in CEO Lanishe signature specials.',
    image: 'https://i.pinimg.com/736x/c9/52/a3/c952a33704729ecb3a56ac810dad513f.jpg',
    emoji: '🍓',
    isPopular: true,
    inStock: true,
    preparationTime: '24 hours',
    allowCakeCustomization: true,
  },
  {
    id: 'cake-naked-berry',
    name: 'Artisanal Naked Berry Cake',
    category: 'cakes',
    price: 30000,
    description: 'Rustic exposed-layer sponge adorned with fresh seasonal berries, vanilla chantilly rosettes, and subtle gold accents.',
    image: 'https://images.unsplash.com/photo-1542826438-bd32f43d626f?w=700&auto=format&fit=crop&q=80',
    emoji: '🎂',
    inStock: true,
    preparationTime: '24 hours',
    allowCakeCustomization: true,
  },
  {
    id: 'cake-bento-chic',
    name: 'Korean Aesthetic Bento Cake',
    category: 'cakes',
    price: 15000,
    description: 'Adorable 4-inch mini cake packaged in an eco-friendly clamshell box with candle. Ideal for intimate surprises, anniversaries, and personal treats.',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=700&auto=format&fit=crop&q=80',
    emoji: '🎁',
    isPopular: true,
    inStock: true,
    preparationTime: '12-24 hours',
    allowCakeCustomization: true,
  },
  {
    id: 'cake-foil-chocolate',
    name: 'Signature Chocolate Foil Container Cake',
    category: 'cakes',
    price: 6500,
    description: 'Lanivick signature foil pan cake. Slow-baked rich chocolate sponge drenched in fudgy ganache and chocolate curls. Portable, convenient comfort.',
    image: 'https://img.freepik.com/premium-photo/chocolate-cake-aluminum-foil-box-packaging_38172-101.jpg',
    emoji: '🍫',
    isPopular: true,
    inStock: true,
    preparationTime: 'Baked daily',
    allowCakeCustomization: true,
  },
  {
    id: 'cake-foil-vanilla',
    name: 'Signature Vanilla Fruit Foil Pan Cake',
    category: 'cakes',
    price: 6000,
    description: 'Tender vanilla sponge in a foil pan, soaked with light syrup and topped with whipped cream and fresh fruit slices.',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=700&auto=format&fit=crop&q=80',
    emoji: '🍰',
    inStock: true,
    preparationTime: 'Baked daily',
    allowCakeCustomization: true,
  },
  {
    id: 'cake-2tier-wedding',
    name: 'Customized Tiered Celebration Cake',
    category: 'cakes',
    price: 65000,
    description: 'Magnificent tiered cake (starting from ₦60,000) tailored with floral artistry, customized colours, and personalized plaque. Final quote based on design.',
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=700&auto=format&fit=crop&q=80',
    emoji: '👑',
    inStock: true,
    preparationTime: '48-72 hours',
    allowCakeCustomization: true,
  },
  {
    id: 'cake-cupcake-single',
    name: 'Individual Gourmet Cupcake',
    category: 'cakes',
    price: 1200,
    description: 'Moist vanilla or chocolate sponge swirled with buttercream frosting. Available in sweet vanilla, red velvet, and chocolate fudge.',
    image: 'https://www.bakemeawish.com/images/products/pr/1000/268_1000.jpg',
    emoji: '🧁',
    inStock: true,
    preparationTime: 'Fresh daily',
  },
  {
    id: 'cake-cupcake-box-6',
    name: 'Artisan Cupcakes (Box of 6)',
    category: 'cakes',
    price: 7200,
    description: 'Assorted luxury cupcakes featuring Red Velvet Cream Cheese, Salted Caramel, and Double Chocolate ganache swirls in a secure gift box.',
    image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=700&auto=format&fit=crop&q=80',
    emoji: '🧁',
    inStock: true,
    preparationTime: 'Fresh daily',
  },
  {
    id: 'cake-cupcake-box-12',
    name: 'Celebration Cupcakes (Box of 12)',
    category: 'cakes',
    price: 14000,
    description: 'A grand celebration dozen: Strawberry Swirl, Red Velvet Cream Cheese, Chocolate Ganache, and Coconut Crunch.',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=700&auto=format&fit=crop&q=80',
    emoji: '🧁',
    isPopular: true,
    inStock: true,
    preparationTime: 'Fresh daily',
  },

  // ===================== PASTRIES & BAKERY DELICACIES =====================
  {
    id: 'pastry-meat-pie',
    name: 'Freshly Baked Flaky Meat Pie',
    category: 'pastries',
    price: 1500,
    description: 'Our pride! Melt-in-your-mouth buttery crust packed with generously seasoned minced beef, potatoes, carrots, and fragrant thyme.',
    image: '/images/products/meat-pie.jpg',
    emoji: '🥧',
    isPopular: true,
    isBestSeller: true,
    inStock: true,
    preparationTime: 'Hot & Fresh Daily',
  },
  {
    id: 'pastry-chicken-pie',
    name: 'Savory Seasoned Chicken Pie',
    category: 'pastries',
    price: 1800,
    description: 'Golden flaky pastry filled with tender shredded chicken breast, sweet carrots, and seasoned garden herbs in savory gravy.',
    image: 'https://easyrecipeschef.com/wp-content/uploads/2025/10/chicken-hand-pies-cross-section-filling-1.jpg',
    emoji: '🥧',
    isPopular: true,
    inStock: true,
    preparationTime: 'Hot & Fresh Daily',
  },
  {
    id: 'pastry-sausage-roll',
    name: 'Golden Flaky Sausage Roll',
    category: 'pastries',
    price: 1200,
    description: 'Crispy rolled pastry wrapping seasoned minced sausage meat with black pepper and nutmeg aroma.',
    image: '/images/products/sausage-roll.jpg',
    emoji: '🌭',
    isPopular: true,
    inStock: true,
    preparationTime: 'Hot & Fresh Daily',
  },
  {
    id: 'pastry-doughnut',
    name: 'Fluffy Glazed Jam Doughnut',
    category: 'pastries',
    price: 1000,
    description: 'Light, cloud-soft yeast doughnut dusted with fine powdered sugar and filled with rich strawberry jam.',
    image: '/images/products/doughnut.jpg',
    emoji: '🍩',
    inStock: true,
    preparationTime: 'Fresh Daily',
  },
  {
    id: 'pastry-chin-chin',
    name: 'Crunchy Vanilla Chin-Chin (500g Jar)',
    category: 'pastries',
    price: 2500,
    description: 'Crisp, golden-brown crunchy fried chin-chin infused with real butter, nutmeg, and aromatic vanilla. Perfectly packaged for snacking.',
    image: '/images/products/chin-chin.jpg',
    emoji: '✨',
    inStock: true,
    preparationTime: 'Packaged & Ready',
  },
  {
    id: 'pastry-cookies',
    name: 'Gourmet Chocolate Chip Cookies (Pack)',
    category: 'pastries',
    price: 3000,
    description: 'Crispy edges with chewy soft centres, packed with semi-sweet chocolate chips and real creamery butter.',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=700&auto=format&fit=crop&q=80',
    emoji: '🍪',
    inStock: true,
    preparationTime: 'Fresh Daily',
  },
  {
    id: 'pastry-brownies',
    name: 'Fudgy Cocoa Walnut Brownies (Box of 4)',
    category: 'pastries',
    price: 3500,
    description: 'Decadent, rich dark chocolate fudge brownies with crackly tops and toasted crunchy walnuts.',
    image: '/images/products/brownies.jpg',
    emoji: '🍫',
    inStock: true,
    preparationTime: 'Fresh Daily',
  },
  {
    id: 'pastry-puff-puff',
    name: 'Sweet Golden Puff-Puff (Pack of 10)',
    category: 'pastries',
    price: 1200,
    description: 'Authentic Nigerian deep-fried sweet dough balls. Crispy outside, tender and fluffy inside with a hint of nutmeg.',
    image: '/images/products/puff-puff.jpg',
    emoji: '🟡',
    inStock: true,
    preparationTime: 'Hot on order',
  },
  {
    id: 'pastry-scotch-egg',
    name: 'Crisp Jumbo Scotch Egg',
    category: 'pastries',
    price: 1500,
    description: 'Hard-boiled whole egg encased in seasoned savory sausage meat and rolled in golden crunchy breadcrumbs.',
    image: '/images/products/scotch-egg.jpg',
    emoji: '🥚',
    inStock: true,
    preparationTime: 'Hot & Fresh Daily',
  },
  {
    id: 'dessert-banana-bread',
    name: 'Moist Walnut Banana Bread Loaf',
    category: 'pastries',
    price: 5000,
    description: 'Slow-baked with ripe caramelized bananas, toasted crushed walnuts, and dark chocolate chips. Heavily aromatic and moist.',
    image: '/images/products/banana-bread.jpg',
    emoji: '🍌',
    inStock: true,
    preparationTime: 'Baked daily',
  },

  // ===================== SNACKS & CATERING PLATTERS =====================
  {
    id: 'snack-small-chops-pack',
    name: 'Lanivick VIP Small Chops Platter (50 Pieces)',
    category: 'snacks',
    price: 15000,
    description: 'The life of every gathering. Generous party platter featuring 20 fluffy puff-puffs, 10 crispy spring rolls, 10 savory samosas, and 10 spicy peppered gizzards.',
    image: '/images/products/samosas.jpg',
    emoji: '🍢',
    isPopular: true,
    isBestSeller: true,
    inStock: true,
    preparationTime: '2 hours',
  },
  {
    id: 'snack-small-chops-large',
    name: 'Executive Small Chops Banquet Tray (100 Pieces)',
    category: 'snacks',
    price: 28000,
    description: 'Complete celebration finger food assortment: 40 puff-puffs, 20 spring rolls, 20 samosas, and 20 peppered proteins with dipping sauce.',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=700&auto=format&fit=crop&q=80',
    emoji: '🍢',
    inStock: true,
    preparationTime: '3 hours',
  },
  {
    id: 'snack-office-breakfast-box',
    name: 'Individual Office Breakfast Box',
    category: 'snacks',
    price: 4000,
    description: 'Hygienically packaged corporate morning meal box: 1 Flaky Meat Pie, 1 Golden Sausage Roll, 1 Glazed Doughnut, and 1 Chilled Fruit Juice.',
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=700&auto=format&fit=crop&q=80',
    emoji: '🍱',
    isPopular: true,
    inStock: true,
    preparationTime: 'Same-day pre-order',
  },
  {
    id: 'snack-meeting-tray',
    name: 'Executive Boardroom Snack Tray',
    category: 'snacks',
    price: 22000,
    description: 'Assorted finger sandwiches, mini meat pies, chicken bites, and mini brownies arranged on a presentation platter for 8-12 executives.',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=700&auto=format&fit=crop&q=80',
    emoji: '👔',
    inStock: true,
    preparationTime: '24 hours notice',
  },

  // ===================== NATURAL DRINKS & REFRESHMENTS =====================
  {
    id: 'drink-fruit-juice',
    name: 'Chilled Fresh Fruit Juice (500ml)',
    category: 'drinks',
    price: 1500,
    description: 'Pure, freshly extracted pineapple and watermelon juice with no artificial concentrates or added sugar.',
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=700&auto=format&fit=crop&q=80',
    emoji: '🍍',
    inStock: true,
    preparationTime: 'Chilled & Ready',
  },
  {
    id: 'drink-zobo',
    name: 'Chilled Hibiscus Zobo Infusion (500ml)',
    category: 'drinks',
    price: 1200,
    description: 'Traditional deep ruby hibiscus beverage spiced with ginger, cloves, and natural pineapple sweetness. 100% organic, revitalizing and immune-boosting.',
    image: '/images/products/zobo-drink.jpg',
    emoji: '🌺',
    isPopular: true,
    inStock: true,
    preparationTime: 'Chilled & Ready',
  },
  {
    id: 'drink-creamy-yogurt',
    name: 'Creamy Artisanal Fruit Yogurt (500ml)',
    category: 'drinks',
    price: 1500,
    description: 'Rich, smooth cultured yogurt prepared with pure milk and lightly sweetened. Nourishing and refreshing.',
    image: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=700&auto=format&fit=crop&q=80',
    emoji: '🥛',
    inStock: true,
    preparationTime: 'Chilled & Ready',
  },
  {
    id: 'drink-tigernut',
    name: 'Traditional Chilled Tigernut Drink (500ml)',
    category: 'drinks',
    price: 1200,
    description: 'Creamy, chilled organic blend of soaked tigernuts (kunun aya), sweet dates, and gentle coconut milk with hint of ginger.',
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=700&auto=format&fit=crop&q=80',
    emoji: '🌰',
    isPopular: true,
    inStock: true,
    preparationTime: 'Chilled & Ready',
  },
  {
    id: 'drink-fruit-smoothie',
    name: 'Tropical Mango Banana Smoothie (500ml)',
    category: 'drinks',
    price: 2000,
    description: 'Thick, creamy blend of ripe bananas, tropical mangoes, and natural yogurt.',
    image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=700&auto=format&fit=crop&q=80',
    emoji: '🥤',
    inStock: true,
    preparationTime: 'Prepared fresh',
  },
  {
    id: 'drink-berry-parfait',
    name: 'Supreme Greek Yogurt Berry Parfait',
    category: 'drinks',
    price: 3500,
    description: 'Creamy unsweetened Greek yogurt layered with organic honey, crunchy oat granola, fresh strawberries, grapes, and chia seeds.',
    image: '/images/products/drink-fruit-parfait.jpg',
    emoji: '🍓',
    isPopular: true,
    isBestSeller: true,
    inStock: true,
    preparationTime: 'Chilled & Ready',
  },

  // ===================== PACKAGES & GIFT BOXES =====================
  {
    id: 'pkg-birthday-surprise',
    name: 'Complete Birthday Celebration Package',
    category: 'packages',
    price: 45000,
    description: 'All-in-one celebration bundle: 1 8-inch Decorated Celebration Cake, 6 Assorted Cupcakes, 2 Chilled Natural Juices, Birthday Candles & Gold Topper.',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=700&auto=format&fit=crop&q=80',
    emoji: '🎉',
    isPopular: true,
    isBestSeller: true,
    inStock: true,
    preparationTime: '24 hours notice',
    allowCakeCustomization: true,
  },
  {
    id: 'pkg-corporate-gift',
    name: 'Executive Confectionery Gift Box',
    category: 'packages',
    price: 25000,
    description: 'Luxury ribbon-tied presentation gift box containing 1 Loaf Walnut Banana Bread, 1 Jar Crunchy Chin-Chin, 1 Box Chocolate Brownies, and 1 Natural Juice bottle.',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=700&auto=format&fit=crop&q=80',
    emoji: '🎁',
    inStock: true,
    preparationTime: '24 hours notice',
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Hajia Fatima Abdullahi',
    role: 'Event Host',
    city: 'Pyakasa, Abuja',
    category: 'Events',
    rating: 5,
    text: 'Lanivick Confectionary supplied small chops and cupcakes for our daughter’s naming ceremony. Fresh, tasty, and delivered right on time along Airport Road!',
    date: 'September 2026',
    verified: true,
  },
  {
    id: 'rev-2',
    author: 'Barrister Aliyu Ibrahim',
    role: 'Corporate Client',
    city: 'Central Area, Abuja',
    category: 'Snacks',
    rating: 5,
    text: 'Their office breakfast boxes made our quarterly partners meeting seamless. Hot meat pies, delicious sausage rolls, and chilled natural fruit juice.',
    date: 'August 2026',
    verified: true,
  },
  {
    id: 'rev-3',
    author: 'Tunde Adeleke',
    role: 'Parent',
    city: 'Lugbe, Abuja',
    category: 'Cakes',
    rating: 5,
    text: 'Ordered the 8-inch Red Velvet cake for my daughter\'s birthday. The customized inscription and fresh texture were outstanding. Not overly sugary, perfectly balanced.',
    date: 'September 2026',
    verified: true,
  },
  {
    id: 'rev-4',
    author: 'Blessing Oladipo',
    role: 'Civil Servant',
    city: 'Abuja',
    category: 'Pastries',
    rating: 5,
    text: 'Their meat pie crust is the flakiest in Abuja! Pure butter, generous meat filling, and no hollow pockets. Plus their fruit parfaits are irresistible.',
    date: 'July 2026',
    verified: true,
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-ceo-main',
    title: 'Proprietor Danladi Victoria Lanishe',
    category: 'cakes',
    image: '/images/ceo-lanishe-main.jpg',
    caption: 'CEO Danladi Victoria Lanishe presenting signature celebration cakes and bakery creations.',
  },
  {
    id: 'gal-ceo-pink',
    title: 'Strawberry Sweetness Celebration Cake',
    category: 'cakes',
    image: '/images/ceo-lanishe-pink.jpg',
    caption: '“Premium Taste, Healthy Treats and Perfect Craft” — Fresh strawberry celebration drip cake.',
  },
  {
    id: 'gal-ceo-chocolate',
    title: 'Artisan Belgian Chocolate Cake',
    category: 'cakes',
    image: '/images/ceo-lanishe-chocolate.jpg',
    caption: 'Rich cocoa layers and gold celebration accents handcrafted by Victoria Lanishe.',
  },
  {
    id: 'gal-bento-foil',
    title: 'Bento Cakes & Foil Pan Specials',
    category: 'cakes',
    image: '/images/lanivick-bento-flyer.jpg',
    caption: 'Korean aesthetic bento surprise boxes, foil pan comfort cakes, and Greek yogurt parfaits.',
  },
  {
    id: 'gal-1',
    title: 'Golden Celebration Milestone Cake',
    category: 'cakes',
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=800&auto=format&fit=crop&q=80',
    caption: 'Madagascar vanilla sponge with gold leaf and handcrafted rosettes.',
  },
  {
    id: 'gal-4',
    title: 'Freshly Baked Flaky Meat Pies & Snacks',
    category: 'pastries',
    image: '/images/products/meat-pie.jpg',
    caption: 'Golden brown pastries straight from the oven at our Pyakasa, Abuja bakery.',
  },
  {
    id: 'gal-6',
    title: 'Rich Chocolate Ganache Celebration Cake',
    category: 'cakes',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80',
    caption: 'Belgian chocolate sponge layered with smooth ganache and chocolate curls.',
  }
];

export const INITIAL_ORDERS: Order[] = [];

export const INITIAL_CATERING_REQUESTS: CateringRequest[] = [];

export const INITIAL_TRAINING_ENQUIRIES: TrainingEnquiry[] = [];

export const INITIAL_PARTNERSHIP_ENQUIRIES: PartnershipEnquiry[] = [];

export const DEFAULT_USER: UserProfile = {
  id: 'usr-customer-01',
  name: 'Chioma Adebayo',
  email: 'chioma@lanivick.ng',
  phone: '0806 123 4567',
  role: 'customer',
  savedAddresses: [
    {
      fullName: 'Chioma Adebayo',
      phone: '0806 123 4567',
      city: 'Abuja',
      streetAddress: 'House 4, Area G, Pyakasa, off Airport Road, Abuja',
      landmark: 'Near Airport Road Junction',
      fulfillmentType: 'delivery'
    }
  ],
  favorites: ['cake-vanilla-luxury', 'pastry-meat-pie', 'snack-small-chops-pack'],
  createdAt: '2026-01-15T10:00:00Z',
};

export const INITIAL_ADMINS: UserProfile[] = [
  {
    id: 'usr-admin-01',
    name: 'Danladi Victoria Lanishe (Proprietor)',
    email: 'lanivick555@gmail.com',
    phone: '0916 222 6176',
    role: 'admin',
    title: 'Proprietor & Master Baker',
    savedAddresses: [],
    favorites: [],
    createdAt: '2025-01-01T00:00:00Z',
  },
  {
    id: 'usr-admin-02',
    name: 'Ayuba F. Yohanna',
    email: 'ayubafyohanna@gmail.com',
    phone: '0916 222 6176',
    role: 'admin',
    title: 'Platform Administrator',
    savedAddresses: [],
    favorites: [],
    createdAt: '2026-01-01T00:00:00Z',
  },
];

export const ADMIN_USER: UserProfile = INITIAL_ADMINS[0];
export const AYUBA_ADMIN_USER: UserProfile = INITIAL_ADMINS[1];

export const DEFAULT_ADMIN_PASSWORDS: Record<string, string> = {
  'lanivick555@gmail.com': 'lanivick2026',
  'ayubafyohanna@gmail.com': 'ayvick@123',
};

// LOCAL STORAGE PERSISTENCE HELPER
class DataStorageService {
  private getStorage<T>(key: string, defaultValue: T): T {
    try {
      const saved = localStorage.getItem(`lanivick_${key}`);
      return saved ? JSON.parse(saved) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  private setStorage<T>(key: string, value: T): void {
    try {
      localStorage.setItem(`lanivick_${key}`, JSON.stringify(value));
      window.dispatchEvent(new Event(`lanivick_update_${key}`));
    } catch (e) {
      console.error('LocalStorage write error', e);
    }
  }

  // Settings
  getSettings(): StoreSettings {
    return this.getStorage<StoreSettings>('settings', INITIAL_SETTINGS);
  }

  updateSettings(settings: StoreSettings): void {
    this.setStorage('settings', settings);
  }

  // Products
  getProducts(): Product[] {
    const products = this.getStorage<Product[]>('products_v2', INITIAL_PRODUCTS);
    const deletedIds = this.getStorage<string[]>('deleted_products', []);

    const sanitized = products.map((p) => {
      const canonical = INITIAL_PRODUCTS.find((cp) => cp.id === p.id);
      if (!canonical) return p;
      if (
        p.image.includes('share.google') ||
        p.image.includes('photo-1621236378699') ||
        p.image.includes('photo-1605698802008') ||
        p.image.includes('photo-1541592106381') ||
        (p.id === 'cake-foil-chocolate' && p.image.includes('photo-1606313564200')) ||
        (p.id === 'pastry-sausage-roll' && p.image.includes('photo-1509722747041')) ||
        (p.id === 'dessert-banana-bread' && p.category === 'drinks')
      ) {
        return { ...p, image: canonical.image, category: canonical.category };
      }
      return p;
    });

    for (const cp of INITIAL_PRODUCTS) {
      if (!sanitized.some((p) => p.id === cp.id) && !deletedIds.includes(cp.id)) {
        sanitized.push(cp);
      }
    }
    return sanitized.filter((p) => !deletedIds.includes(p.id));
  }

  updateProduct(updated: Product): void {
    const products = this.getProducts().map((p) => (p.id === updated.id ? updated : p));
    this.setStorage('products_v2', products);
  }

  addProduct(newProd: Product): void {
    const products = [newProd, ...this.getProducts()];
    this.setStorage('products_v2', products);
  }

  deleteProduct(productId: string): boolean {
    const deletedIds = this.getStorage<string[]>('deleted_products', []);
    if (!deletedIds.includes(productId)) {
      deletedIds.push(productId);
      this.setStorage('deleted_products', deletedIds);
    }
    const products = this.getProducts().filter((p) => p.id !== productId);
    this.setStorage('products_v2', products);
    window.dispatchEvent(new Event('lanivick_update_products'));
    return true;
  }

  toggleProductStock(productId: string): void {
    const products = this.getProducts().map((p) => {
      if (p.id === productId) {
        return { ...p, inStock: !p.inStock };
      }
      return p;
    });
    this.setStorage('products_v2', products);
  }

  // Orders
  getOrders(): Order[] {
    return this.getStorage<Order[]>('orders', INITIAL_ORDERS);
  }

  createOrder(order: Order): void {
    const orders = [order, ...this.getOrders()];
    this.setStorage('orders', orders);
  }

  updateOrderStatus(orderId: string, status: Order['status']): void {
    const orders = this.getOrders().map(o => {
      if (o.id === orderId) {
        return { ...o, status, updatedAt: new Date().toISOString() };
      }
      return o;
    });
    this.setStorage('orders', orders);
  }

  updateOrderPayment(orderId: string, paymentStatus: Order['paymentStatus']): void {
    const orders = this.getOrders().map(o => {
      if (o.id === orderId) {
        return { ...o, paymentStatus, updatedAt: new Date().toISOString() };
      }
      return o;
    });
    this.setStorage('orders', orders);
  }

  // Event & Catering Requests
  getCateringRequests(): CateringRequest[] {
    return this.getStorage<CateringRequest[]>('catering_requests', INITIAL_CATERING_REQUESTS);
  }

  createCateringRequest(request: CateringRequest): void {
    const reqs = [request, ...this.getCateringRequests()];
    this.setStorage('catering_requests', reqs);
  }

  updateCateringStatus(requestId: string, status: CateringRequest['status'], quote?: number): void {
    const reqs = this.getCateringRequests().map(r => {
      if (r.id === requestId) {
        return { ...r, status, estimatedQuote: quote !== undefined ? quote : r.estimatedQuote };
      }
      return r;
    });
    this.setStorage('catering_requests', reqs);
  }

  // Training Enquiries
  getTrainingEnquiries(): TrainingEnquiry[] {
    return this.getStorage<TrainingEnquiry[]>('training_enquiries', INITIAL_TRAINING_ENQUIRIES);
  }

  createTrainingEnquiry(enquiry: TrainingEnquiry): void {
    const enquiries = [enquiry, ...this.getTrainingEnquiries()];
    this.setStorage('training_enquiries', enquiries);
  }

  // Partnership Enquiries
  getPartnershipEnquiries(): PartnershipEnquiry[] {
    return this.getStorage<PartnershipEnquiry[]>('partnership_enquiries', INITIAL_PARTNERSHIP_ENQUIRIES);
  }

  createPartnershipEnquiry(enquiry: PartnershipEnquiry): void {
    const enquiries = [enquiry, ...this.getPartnershipEnquiries()];
    this.setStorage('partnership_enquiries', enquiries);
  }

  // Reviews
  getReviews(): Review[] {
    return this.getStorage<Review[]>('reviews', INITIAL_REVIEWS);
  }

  // Gallery
  getGallery(): GalleryItem[] {
    const items = this.getStorage<GalleryItem[]>('gallery_v2', INITIAL_GALLERY);
    return items.map(item => {
      const canonical = INITIAL_GALLERY.find(g => g.id === item.id);
      if (!canonical) return item;
      if (
        item.image.includes('photo-1535141192574-5d4897c13136') ||
        item.image.includes('photo-1621236378699-8597fee6a1ce')
      ) {
        return { ...item, image: canonical.image };
      }
      return item;
    });
  }

  // Current User Session
  getCurrentUser(): UserProfile | null {
    const user = this.getStorage<UserProfile | null>('user', null);
    // Automatically purge old demo customer session (Chioma Adebayo) if lingering in localStorage
    if (user && user.id === 'usr-customer-01') {
      this.setStorage('user', null);
      return null;
    }
    return user;
  }

  setCurrentUser(user: UserProfile | null): void {
    this.setStorage('user', user);
  }

  // ===================== MULTI-ADMIN & CREDENTIAL MANAGEMENT =====================
  getAdmins(): UserProfile[] {
    const admins = this.getStorage<UserProfile[]>('admins_v1', INITIAL_ADMINS);
    let updated = [...admins];
    if (!updated.some((a) => a.email.toLowerCase() === 'lanivick555@gmail.com')) {
      updated.unshift(INITIAL_ADMINS[0]);
    }
    if (!updated.some((a) => a.email.toLowerCase() === 'ayubafyohanna@gmail.com')) {
      updated.push(INITIAL_ADMINS[1]);
    }
    return updated;
  }

  addAdmin(admin: { name: string; email: string; phone: string; title?: string }): UserProfile {
    const admins = this.getAdmins();
    const cleanEmail = admin.email.trim().toLowerCase();
    const existing = admins.find((a) => a.email.toLowerCase() === cleanEmail);
    if (existing) {
      return existing;
    }
    const newAdmin: UserProfile = {
      id: `usr-admin-${Date.now()}`,
      name: admin.name,
      email: cleanEmail,
      phone: admin.phone,
      role: 'admin',
      title: admin.title || 'Store Administrator',
      savedAddresses: [],
      favorites: [],
      createdAt: new Date().toISOString(),
    };
    const updated = [...admins, newAdmin];
    this.setStorage('admins_v1', updated);
    return newAdmin;
  }

  removeAdmin(id: string): boolean {
    const admins = this.getAdmins();
    // Prevent removing primary proprietor or Ayuba
    const filtered = admins.filter(
      (a) =>
        a.id !== id ||
        a.email.toLowerCase() === 'lanivick555@gmail.com' ||
        a.email.toLowerCase() === 'ayubafyohanna@gmail.com'
    );
    this.setStorage('admins_v1', filtered);
    return true;
  }

  isAdminEmail(email: string): boolean {
    if (!email) return false;
    const clean = email.trim().toLowerCase();
    if (
      clean === 'admin@lanivick.ng' ||
      clean.includes('admin') ||
      clean === 'lanivick555@gmail.com' ||
      clean === 'ayubafyohanna@gmail.com'
    ) {
      return true;
    }
    return this.getAdmins().some((a) => a.email.toLowerCase() === clean);
  }

  getAdminPasswords(): Record<string, string> {
    const passwords = this.getStorage<Record<string, string>>('admin_passwords', DEFAULT_ADMIN_PASSWORDS);
    if (!passwords['lanivick555@gmail.com']) {
      passwords['lanivick555@gmail.com'] = this.getSettings().adminPassword || 'lanivick2026';
    }
    if (!passwords['ayubafyohanna@gmail.com']) {
      passwords['ayubafyohanna@gmail.com'] = 'ayvick@123';
    }
    return passwords;
  }

  getAdminPassword(email?: string): string {
    const passwords = this.getAdminPasswords();
    if (!email) {
      return passwords['lanivick555@gmail.com'] || 'lanivick2026';
    }
    const clean = email.trim().toLowerCase();
    if (clean === 'ayubafyohanna@gmail.com') {
      return passwords['ayubafyohanna@gmail.com'] || 'ayvick@123';
    }
    return passwords['lanivick555@gmail.com'] || this.getSettings().adminPassword || 'lanivick2026';
  }

  verifyAdminPassword(password: string, email?: string): boolean {
    if (!password) return false;
    const trimmed = password.trim();
    const passwords = this.getAdminPasswords();

    if (email) {
      const clean = email.trim().toLowerCase();
      if (clean === 'ayubafyohanna@gmail.com') {
        const expected = passwords['ayubafyohanna@gmail.com'] || 'ayvick@123';
        return trimmed === expected.trim();
      }
      const vicExpected = passwords['lanivick555@gmail.com'] || this.getSettings().adminPassword || 'lanivick2026';
      return trimmed === vicExpected.trim();
    }

    return Object.values(passwords).some((p) => p.trim() === trimmed);
  }

  findAdminByPassword(password: string): UserProfile | null {
    if (!password) return null;
    const trimmed = password.trim();
    const passwords = this.getAdminPasswords();

    // Check Ayuba's password
    const ayubaPass = (passwords['ayubafyohanna@gmail.com'] || 'ayvick@123').trim();
    if (trimmed === ayubaPass) {
      return (
        this.getAdmins().find((a) => a.email.toLowerCase() === 'ayubafyohanna@gmail.com') ||
        AYUBA_ADMIN_USER
      );
    }

    // Check Victoria's password
    const vicPass = (passwords['lanivick555@gmail.com'] || this.getSettings().adminPassword || 'lanivick2026').trim();
    if (trimmed === vicPass) {
      return (
        this.getAdmins().find((a) => a.email.toLowerCase() === 'lanivick555@gmail.com') ||
        ADMIN_USER
      );
    }

    return null;
  }

  findAdminByEmail(email: string): UserProfile | null {
    const clean = email.trim().toLowerCase();
    return this.getAdmins().find((a) => a.email.toLowerCase() === clean) || null;
  }

  updateAdminPassword(email: string, newPassword: string): void {
    const clean = email.trim().toLowerCase();
    const passwords = this.getAdminPasswords();
    passwords[clean] = newPassword.trim();
    this.setStorage('admin_passwords', passwords);

    // Keep settings.adminPassword in sync for Victoria
    if (clean === 'lanivick555@gmail.com' || clean.includes('admin')) {
      const settings = this.getSettings();
      this.updateSettings({ ...settings, adminPassword: newPassword.trim() });
    }
  }

  purgeDemoData(): void {
    this.setStorage('user', null);
    try {
      localStorage.removeItem('lanivick_user');
      localStorage.removeItem('lanivick_install_dismissed_until');
    } catch (e) {
      console.error(e);
    }
  }
}

export const dataService = new DataStorageService();
