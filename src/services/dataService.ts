import {
  Product,
  HairService,
  Order,
  HairBooking,
  CateringRequest,
  Review,
  GalleryItem,
  StoreSettings,
  UserProfile,
} from '../types';

export const INITIAL_SETTINGS: StoreSettings = {
  whatsappNumber: '2349162226176',
  callPhone: '+234 916 222 6176',
  lokojaAddress: 'Phase 2, Ganaja Junction / Lokongoma, Lokoja, Kogi State',
  abujaAddress: 'Gwarinpa Estate / Wuse II Pickup Hub, Abuja, FCT',
  bankName: 'Guaranty Trust Bank (GTBank)',
  accountNumber: '0123456789',
  accountName: 'Lanivick Confectionary & Beauty',
  announcement: '✨ Life is what you bake it. We just make it sweeter! — Orders & Vikky\'s Hairplace appointments open in Lokoja & Abuja.',
  deliveryFeeLokoja: 1500,
  deliveryFeeAbuja: 2500,
  homeServiceHairSurcharge: 5000,
  ceoName: 'Danladi Victoria Lanishe',
  ceoTitle: 'CEO Lanishe',
  ceoQuote: 'Life is what you bake it. We just make it sweeter! ❤️',
  hairTagline: 'Transforming your hair, Revealing your beauty.',
  facebookPage: 'Danladi Victoria Lanishe',
};

export const INITIAL_PRODUCTS: Product[] = [
  // CAKES
  {
    id: 'cake-vanilla-luxury',
    name: 'Vanilla Celebration Crown Cake',
    category: 'cakes',
    price: 28000,
    originalPrice: 32000,
    description: 'Ultra-moist Madagascar vanilla sponge layered with fluffy buttercream and gold leaf accents. Perfect for intimate birthdays and milestones.',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=700&auto=format&fit=crop&q=80',
    emoji: '🎂',
    isPopular: true,
    isBestSeller: true,
    inStock: true,
    preparationTime: '24-48 hours',
    dietary: ['Vegetarian', 'Nut-Free option'],
    allowCakeCustomization: true,
  },
  {
    id: 'cake-belgian-chocolate',
    name: 'Decadent Belgian Chocolate Drip Cake',
    category: 'cakes',
    price: 34000,
    description: 'Deep cocoa fudge layers drenched with 70% dark chocolate ganache, crisp chocolate pearls, and artisan piping.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=700&auto=format&fit=crop&q=80',
    emoji: '🍫',
    isPopular: true,
    inStock: true,
    preparationTime: '24 hours',
    allowCakeCustomization: true,
  },
  {
    id: 'cake-royal-redvelvet',
    name: 'Royal Velvet Supreme',
    category: 'cakes',
    price: 35000,
    description: 'Rich scarlet buttermilk sponge filled with tangy cream cheese frosting and white chocolate curls. A showstopper.',
    image: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=700&auto=format&fit=crop&q=80',
    emoji: '❤️',
    isPopular: true,
    isBestSeller: true,
    inStock: true,
    preparationTime: '24 hours',
    allowCakeCustomization: true,
  },
  {
    id: 'cake-2tier-wedding',
    name: 'Grand 2-Tier Celebration Cake',
    category: 'cakes',
    price: 95000,
    originalPrice: 110000,
    description: 'Two magnificent tiers (8" & 10") tailored with exquisite floral artistry, custom color scheme, and personalized edible plaque.',
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=700&auto=format&fit=crop&q=80',
    emoji: '👑',
    inStock: true,
    preparationTime: '48-72 hours',
    allowCakeCustomization: true,
  },
  {
    id: 'cake-bento-chic',
    name: 'Korean Aesthetic Bento Cake',
    category: 'cakes',
    price: 14000,
    description: 'Adorable 4-inch mini cake packaged in an eco-friendly clamshell box with candle. Ideal for surprises, anniversaries, and personal treats.',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=700&auto=format&fit=crop&q=80',
    emoji: '🎁',
    isPopular: true,
    inStock: true,
    preparationTime: '12-24 hours',
    allowCakeCustomization: true,
  },
  {
    id: 'cake-cupcake-box-6',
    name: 'Artisan Cupcakes (Box of 6)',
    category: 'cakes',
    price: 12000,
    description: 'Assorted luxury cupcakes featuring Red Velvet Cream Cheese, Salted Caramel, and Double Chocolate ganache swirls.',
    image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=700&auto=format&fit=crop&q=80',
    emoji: '🧁',
    inStock: true,
    preparationTime: '12 hours',
  },
  {
    id: 'cake-cupcake-box-12',
    name: 'Luxury Cupcakes (Box of 12)',
    category: 'cakes',
    price: 22000,
    description: 'A grand celebration dozen: Strawberry Swirl, Red Velvet Cream Cheese, Chocolate Ganache, and Coconut Crunch.',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=700&auto=format&fit=crop&q=80',
    emoji: '🧁',
    inStock: true,
    preparationTime: '12 hours',
  },
  {
    id: 'cake-foil-chocolate',
    name: 'Signature Chocolate Foil Container Cake',
    category: 'cakes',
    price: 6500,
    description: 'Lanivick signature foil-pan cake! Slow-baked rich chocolate sponge drenched in fudgy ganache and chocolate curls. Perfectly portable comfort.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=700&auto=format&fit=crop&q=80',
    emoji: '🍫',
    isPopular: true,
    isBestSeller: true,
    inStock: true,
    preparationTime: 'Same day / Fresh',
    allowCakeCustomization: true,
  },
  {
    id: 'cake-foil-vanilla',
    name: 'Signature Vanilla & Fruit Foil Cake',
    category: 'cakes',
    price: 6000,
    description: 'Tender vanilla sponge in a foil pan, soaked with light syrup and topped with whipped cream and fresh berry slices.',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=700&auto=format&fit=crop&q=80',
    emoji: '🍰',
    inStock: true,
    preparationTime: 'Same day / Fresh',
    allowCakeCustomization: true,
  },
  {
    id: 'cake-strawberry-drip',
    name: 'Strawberry Sweetness Drip Cake',
    category: 'cakes',
    price: 32000,
    description: 'As featured in CEO Lanishe\'s weekend special! Fluffy strawberry sponge layered with strawberry compote, pink white-chocolate drip, and fresh garden strawberries.',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=700&auto=format&fit=crop&q=80',
    emoji: '🍓',
    isPopular: true,
    isBestSeller: true,
    inStock: true,
    preparationTime: '24 hours',
    allowCakeCustomization: true,
  },
  {
    id: 'cake-naked-berry',
    name: 'Artisanal Naked Berry Cake',
    category: 'cakes',
    price: 30000,
    description: 'Rustic exposed-layer sponge adorned with fresh strawberries, blueberries, vanilla chantilly rosettes, and subtle gold dusting.',
    image: 'https://images.unsplash.com/photo-1542826438-bd32f43d626f?w=700&auto=format&fit=crop&q=80',
    emoji: '🎂',
    inStock: true,
    preparationTime: '24 hours',
    allowCakeCustomization: true,
  },

  // PASTRIES & SNACKS
  {
    id: 'pastry-meat-pie',
    name: 'Flaky Golden Meat Pie',
    category: 'pastries',
    price: 1500,
    description: 'Our pride! Melt-in-your-mouth buttery crust packed with generously seasoned minced beef, potatoes, and fragrant herbs.',
    image: 'https://images.unsplash.com/photo-1621236378699-8597fee6a1ce?w=700&auto=format&fit=crop&q=80',
    emoji: '🥧',
    isPopular: true,
    isBestSeller: true,
    inStock: true,
    preparationTime: 'Instant / Hot',
  },
  {
    id: 'pastry-egg-roll',
    name: 'Crisp Jumbo Egg Roll',
    category: 'pastries',
    price: 1200,
    description: 'Golden, subtly sweetened crisp exterior wrapped around a perfectly boiled whole egg. Satisfying and classic.',
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=700&auto=format&fit=crop&q=80',
    emoji: '🥚',
    inStock: true,
    preparationTime: 'Hot & Fresh',
  },
  {
    id: 'pastry-fish-roll',
    name: 'Savory Spiced Fish Roll',
    category: 'pastries',
    price: 1000,
    description: 'Crunchy golden pastry roll filled with aromatic seasoned mackerel fish and peppery goodness.',
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=700&auto=format&fit=crop&q=80',
    emoji: '🐟',
    inStock: true,
    preparationTime: 'Hot & Fresh',
  },
  {
    id: 'pastry-small-chops',
    name: 'Lanivick VIP Small Chops Platter',
    category: 'pastries',
    price: 12500,
    description: 'Generous party platter featuring 15 fluffy puff-puffs, 6 crispy spring rolls, 6 samosas, and spicy peppered gizzards.',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=700&auto=format&fit=crop&q=80',
    emoji: '🍢',
    isPopular: true,
    inStock: true,
    preparationTime: '1 hour',
  },

  // MEALS
  {
    id: 'meal-party-jollof',
    name: 'Smoky Firewood Party Jollof Rice',
    category: 'meals',
    price: 5500,
    description: 'Authentic Nigerian party jollof with signature firewood aroma, served with sweet fried dodo (plantain) and peppered quarter chicken.',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=700&auto=format&fit=crop&q=80',
    emoji: '🍚',
    isPopular: true,
    isBestSeller: true,
    inStock: true,
    preparationTime: 'Freshly prepared daily',
  },
  {
    id: 'meal-fried-rice-chicken',
    name: 'Lanivick Special Fried Rice & Chicken',
    category: 'meals',
    price: 6000,
    description: 'Wok-tossed seasoned basmati rice with sweet corn, carrots, liver bits, and runner beans, paired with golden grilled chicken.',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=700&auto=format&fit=crop&q=80',
    emoji: '🍗',
    inStock: true,
    preparationTime: 'Freshly prepared daily',
  },
  {
    id: 'meal-chicken-alfredo',
    name: 'Continental Creamy Chicken Alfredo',
    category: 'meals',
    price: 8500,
    description: 'Penne pasta tossed in rich garlic parmesan cream sauce with grilled herb chicken breast and toasted garlic bread.',
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=700&auto=format&fit=crop&q=80',
    emoji: '🍝',
    inStock: true,
    preparationTime: '45 mins',
  },

  // TREATS
  {
    id: 'treat-berry-parfait',
    name: 'Supreme Greek Berry Parfait',
    category: 'treats',
    price: 3800,
    description: 'Creamy unsweetened Greek yogurt layered with organic honey, crunchy oat granola, fresh strawberries, grapes, and chia seeds.',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=700&auto=format&fit=crop&q=80',
    emoji: '🍓',
    isPopular: true,
    isBestSeller: true,
    inStock: true,
    preparationTime: 'Chilled & Ready',
  },
  {
    id: 'treat-banana-bread',
    name: 'Moist Walnut Banana Bread Loaf',
    category: 'treats',
    price: 5500,
    description: 'Slow-baked with ripe caramelized bananas, toasted crushed walnuts, and semi-sweet dark chocolate chips. Heavily aromatic.',
    image: 'https://images.unsplash.com/photo-1605698802008-8e6d97c3666d?w=700&auto=format&fit=crop&q=80',
    emoji: '🍌',
    inStock: true,
    preparationTime: 'Baked daily',
  },
  {
    id: 'treat-waffles-chicken',
    name: 'Golden Buttermilk Waffles & Hot Honey',
    category: 'treats',
    price: 6800,
    description: 'Fluffy Belgian waffle with crisp edges, served with crisp fried chicken strips, whipped butter, and spiced maple syrup.',
    image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=700&auto=format&fit=crop&q=80',
    emoji: '🧇',
    inStock: true,
    preparationTime: '25 mins',
  }
];

export const INITIAL_HAIR_SERVICES: HairService[] = [
  {
    id: 'hair-knotless-braids',
    name: 'Nut-less Braids (Knotless Box Braids)',
    description: 'Painless, scalp-friendly, and lightweight braids starting with your natural hair and seamlessly feeding in extensions. Highly versatile, durable, and tension-free.',
    category: 'braids',
    startingPrice: 18000,
    duration: '4 - 6 hours',
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=700&auto=format&fit=crop&q=80',
    lengthsAvailable: ['Shoulder Length', 'Mid-Back Length', 'Waist Length', 'Butt/Knee Length'],
    sizesAvailable: ['Jumbo', 'Medium', 'Smedium', 'Small'],
    homeServiceEligible: true,
    popular: true,
  },
  {
    id: 'hair-nutted-braids',
    name: 'Nutted Braids (Classic Box Braids)',
    description: 'Traditional African box braids crafted with secure neat base knots for exceptional longevity and full, thick volume.',
    category: 'braids',
    startingPrice: 16000,
    duration: '4 - 5.5 hours',
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=700&auto=format&fit=crop&q=80',
    lengthsAvailable: ['Shoulder Length', 'Mid-Back Length', 'Waist Length'],
    sizesAvailable: ['Jumbo', 'Medium', 'Small'],
    homeServiceEligible: true,
    popular: true,
  },
  {
    id: 'hair-passion-twists',
    name: 'Twisting (Passion & Senegalese Twists)',
    description: 'Romantic, textured two-strand twists using bohemian water-wave or silky Kanekalon hair for a carefree, bouncy, goddess vibe.',
    category: 'twists',
    startingPrice: 20000,
    duration: '3.5 - 5 hours',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=700&auto=format&fit=crop&q=80',
    lengthsAvailable: ['Shoulder Length', 'Mid-Back Length', 'Waist Length'],
    sizesAvailable: ['Medium', 'Small'],
    homeServiceEligible: true,
    popular: true,
  },
  {
    id: 'hair-kinky-twists',
    name: 'Kinky Twist & Natural Styling',
    description: 'Authentic afro-textured protective twists crafted with kinky extensions for high volume, lightweight feel, and natural look.',
    category: 'twists',
    startingPrice: 18000,
    duration: '4 - 5 hours',
    image: 'https://images.unsplash.com/photo-1584297091622-af8e5bd81b21?w=700&auto=format&fit=crop&q=80',
    lengthsAvailable: ['Shoulder Length', 'Bra-Strap Length'],
    sizesAvailable: ['Medium', 'Slim'],
    homeServiceEligible: true,
  },
  {
    id: 'hair-ghana-weaving',
    name: 'Ganna Weaving (Ghana Weaving & Feed-Ins)',
    description: 'Sleek, sharp, and architectural feed-in cornrows. Styled with intricate zig-zag, curved, or straight-back precision patterns.',
    category: 'weaving',
    startingPrice: 12000,
    duration: '2.5 - 4 hours',
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=700&auto=format&fit=crop&q=80',
    lengthsAvailable: ['Classic Back', 'Waist Long'],
    sizesAvailable: ['2 - 4 Big Braids', '6 - 8 Medium Braids', 'All-Back Tribal'],
    homeServiceEligible: true,
    popular: true,
  },
  {
    id: 'hair-cornrows',
    name: 'Cornrows (All-Back & Designer Patterns)',
    description: 'Neat, scalp-clinging cornrows crafted without extensions or with subtle feed-ins. Ideal as protective styles or under-wig bases.',
    category: 'weaving',
    startingPrice: 10000,
    duration: '1.5 - 3 hours',
    image: 'https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?w=700&auto=format&fit=crop&q=80',
    lengthsAvailable: ['Natural Length', 'Feed-In Extended'],
    sizesAvailable: ['4 Braids', '6 Braids', '8-12 Designer Braids'],
    homeServiceEligible: true,
  },
  {
    id: 'hair-locs-maintenance',
    name: 'Locs Retwist & Styling',
    description: 'Deep scalp cleansing, detox wash, palm-roll or interlocking loc retwist, followed by barrel rolls, petal buns, or rope twist styling.',
    category: 'locs',
    startingPrice: 16000,
    duration: '2.5 - 3.5 hours',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=700&auto=format&fit=crop&q=80',
    lengthsAvailable: ['Short Locs', 'Medium Locs', 'Waist Locs'],
    sizesAvailable: ['Micro Locs', 'Standard Locs', 'Thick Locs'],
    homeServiceEligible: true,
  },
  {
    id: 'hair-dread-relock',
    name: 'Dreads Relock & Repair Treatment',
    description: 'Expert crotchet re-attachment for thinning or broken locs, root tightening, and matted loc rehabilitation.',
    category: 'locs',
    startingPrice: 22000,
    duration: '3 - 5 hours',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=700&auto=format&fit=crop&q=80',
    lengthsAvailable: ['Any Length'],
    sizesAvailable: ['Custom Repair Assessment'],
    homeServiceEligible: true,
  },
  {
    id: 'hair-wig-making',
    name: 'Making Wigs & Wig Revamp',
    description: 'Machine-sewn custom closure or frontal wig crafted to your exact head measurement. Includes bleaching knots, plucking, styling, and revitalizing old wigs.',
    category: 'wigs',
    startingPrice: 25000,
    duration: '48 hours turnaround',
    image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=700&auto=format&fit=crop&q=80',
    lengthsAvailable: ['10" to 32"'],
    sizesAvailable: ['Closure Wig', 'Frontal Wig', 'U-Part Wig'],
    homeServiceEligible: false,
    popular: true,
  },
  {
    id: 'hair-ponytail',
    name: 'Ponytail (Sleek Extended & Barbie Bun)',
    description: 'Ultra-flat sleek high or low ponytail with silky or curly extensions, swooped frontal edges, and high-shine gloss.',
    category: 'natural',
    startingPrice: 14000,
    duration: '2 hours',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=700&auto=format&fit=crop&q=80',
    lengthsAvailable: ['Extended Ponytail', 'Barbie Bun'],
    sizesAvailable: ['High Ponytail', 'Low Sleek Bun'],
    homeServiceEligible: true,
  },
  {
    id: 'hair-packing-gel',
    name: 'Packing Gel (Bridal & Formal Styling)',
    description: 'Smooth bridal-grade packing gel styling with laid baby hairs, side swoop, and elegant sculpted bun or hair piece attachment.',
    category: 'natural',
    startingPrice: 15000,
    duration: '2 - 2.5 hours',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=700&auto=format&fit=crop&q=80',
    lengthsAvailable: ['Sculpted Bun', 'Bridal Updo'],
    sizesAvailable: ['Standard Bun', 'Elaborate Bridal'],
    homeServiceEligible: true,
  },
  {
    id: 'hair-threading',
    name: 'Threading (Traditional African Threading)',
    description: 'Ancient African protective hair threading technique for maximum hair length retention, heat-free stretching, and distinctive crown silhouettes.',
    category: 'natural',
    startingPrice: 10000,
    duration: '2 hours',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=700&auto=format&fit=crop&q=80',
    lengthsAvailable: ['Short Natural Hair', 'Medium/Long Hair'],
    sizesAvailable: ['Classic African Style', 'Modern Threaded Crown'],
    homeServiceEligible: true,
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Hajia Fatima Abdullahi',
    role: 'Bride & Host',
    city: 'Abuja',
    category: 'Catering',
    rating: 5,
    text: 'Lanivick catered our 350-guest wedding banquet in Abuja. The smoky jollof and small chops were the talk of the evening! Punctual, neat, and highly professional staff.',
    date: 'August 2026',
    verified: true,
  },
  {
    id: 'rev-2',
    author: 'Dr. Nkechi Okafor',
    role: 'Resident Physician',
    city: 'Lokoja',
    category: 'Hair',
    rating: 5,
    text: 'Vicky is a blessing to Lokoja! She did my waist-length knotless braids with zero tension on my edges. Booking the home-service made it effortless after my hospital shift.',
    date: 'July 2026',
    verified: true,
  },
  {
    id: 'rev-3',
    author: 'Tunde Adeleke',
    role: 'Brand Manager',
    city: 'Abuja',
    category: 'Cakes',
    rating: 5,
    text: 'Ordered the 2-Tier Red Velvet & Vanilla cake for my daughter\'s 5th birthday. The customized inscription and edible bear were breathtaking. The cake was fresh, moist, and delicious!',
    date: 'August 2026',
    verified: true,
  },
  {
    id: 'rev-4',
    author: 'Blessing Oladipo',
    role: 'Entrepreneur',
    city: 'Lokoja',
    category: 'Pastries',
    rating: 5,
    text: 'Their meat pie crust is unmatched in all of Kogi State! Flaky, buttery, full meat filling, and no hollow pockets. Plus their parfaits are addictive.',
    date: 'June 2026',
    verified: true,
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-ceo-main',
    title: 'CEO Lanishe & Confectionery Showcase',
    category: 'cakes',
    image: '/images/ceo-lanishe-main.jpg',
    caption: 'Danladi Victoria Lanishe (CEO Lanishe) presenting the full cake menu: Naked, Decorated, Bento & Foil pan cakes.',
  },
  {
    id: 'gal-ceo-pink',
    title: 'CEO Lanishe - Strawberry Sweetness',
    category: 'cakes',
    image: '/images/ceo-lanishe-pink.jpg',
    caption: '"Life is what you bake it. We just make it sweeter! ❤️" CEO Lanishe with handcrafted strawberry drip celebration cake.',
  },
  {
    id: 'gal-ceo-chocolate',
    title: 'CEO Lanishe - 8 Signature Cake Flavours',
    category: 'cakes',
    image: '/images/ceo-lanishe-chocolate.jpg',
    caption: 'Coconut, Strawberry, Banana Bread, Banana Cake, Red Velvet, Vanilla, Chocolate & Marble handcrafted by CEO Lanishe.',
  },
  {
    id: 'gal-bento-foil',
    title: 'Bento, Foil Pan Cakes & Parfaits',
    category: 'cakes',
    image: '/images/lanivick-bento-flyer.jpg',
    caption: 'Korean aesthetic bento cakes, convenient foil tray cakes, cupcakes, and creamy Greek yogurt fruit parfaits.',
  },
  {
    id: 'gal-vikkys-flyer',
    title: "Vikky's Hairplace - 12 Signature Services",
    category: 'hair',
    image: '/images/vikkys-hairplace-flyer.jpg',
    caption: '"Transforming your hair, Revealing your beauty." Nutted/Nut-less braids, twists, locs, weaving & wigs.',
  },
  {
    id: 'gal-1',
    title: 'Custom Golden 30th Birthday Cake',
    category: 'cakes',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=800&auto=format&fit=crop&q=80',
    caption: 'Madagascar vanilla sponge with gold leaf and handcrafted sugar flowers.',
  },
  {
    id: 'gal-2',
    title: 'Waist-Length Bohemian Knotless Braids',
    category: 'hair',
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&auto=format&fit=crop&q=80',
    caption: 'Painless, featherweight knotless braids with curly human-hair curls.',
  },
  {
    id: 'gal-3',
    title: 'Abuja Corporate Buffet Service',
    category: 'catering',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&auto=format&fit=crop&q=80',
    caption: 'Full buffet station with smoky jollof, fried rice, roast beef, and salads.',
  },
  {
    id: 'gal-4',
    title: 'Freshly Baked Flaky Meat Pies & Snacks',
    category: 'pastries',
    image: 'https://images.unsplash.com/photo-1621236378699-8597fee6a1ce?w=800&auto=format&fit=crop&q=80',
    caption: 'Golden brown pastries straight from the oven at our Lokoja bakery.',
  },
  {
    id: 'gal-5',
    title: 'Sleek Ponytail with Swoop Frontal',
    category: 'hair',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&auto=format&fit=crop&q=80',
    caption: 'High bridal ponytail with smooth high-shine finish.',
  },
  {
    id: 'gal-6',
    title: 'Rich Chocolate Ganache Celebration Cake',
    category: 'cakes',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80',
    caption: 'Belgian chocolate sponge layered with salted caramel filling.',
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'LAN-89241',
    customerName: 'Amina Bello',
    customerEmail: 'amina.bello@example.com',
    customerPhone: '0803 445 2219',
    subtotal: 35000,
    deliveryFee: 1500,
    total: 36500,
    fulfillmentType: 'delivery',
    deliveryAddress: {
      fullName: 'Amina Bello',
      phone: '0803 445 2219',
      city: 'Lokoja',
      streetAddress: 'House 14, Commissioners Quarters, Gadumo',
      landmark: 'Near Confluence Beach Hotel',
      fulfillmentType: 'delivery'
    },
    preferredDate: '2026-09-08',
    preferredTime: '2:00 PM',
    paymentMethod: 'bank_transfer',
    paymentStatus: 'paid',
    paymentReference: 'GTB-TRF-992019',
    status: 'Preparing',
    notes: 'Please add birthday candle and extra serviettes.',
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    updatedAt: new Date().toISOString(),
    items: [
      {
        id: 'item-1',
        productId: 'cake-royal-redvelvet',
        product: INITIAL_PRODUCTS[2],
        quantity: 1,
        unitPrice: 35000,
        totalPrice: 35000,
        cakeCustomization: {
          flavour: 'Royal Red Velvet',
          size: '8 inches (12-16 slices)',
          filling: 'Cream Cheese Swirl',
          frosting: 'Silky Whipped Cream',
          inscription: 'Happy 25th Birthday Amina!',
          eventDate: '2026-09-08',
          deliveryWindow: '1:00 PM - 3:00 PM',
          additionalPrice: 0
        }
      }
    ]
  },
  {
    id: 'LAN-89190',
    customerName: 'Emeka Eze',
    customerEmail: 'emeka.eze@example.com',
    customerPhone: '0812 778 9901',
    subtotal: 18500,
    deliveryFee: 2500,
    total: 21000,
    fulfillmentType: 'delivery',
    deliveryAddress: {
      fullName: 'Emeka Eze',
      phone: '0812 778 9901',
      city: 'Abuja',
      streetAddress: 'Plot 402, 3rd Avenue, Gwarinpa Estate',
      landmark: 'Opposite Dominoes',
      fulfillmentType: 'delivery'
    },
    preferredDate: '2026-09-07',
    preferredTime: '5:30 PM',
    paymentMethod: 'paystack',
    paymentStatus: 'paid',
    paymentReference: 'PST_TEST_78199248',
    status: 'Out for Delivery',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    updatedAt: new Date().toISOString(),
    items: [
      {
        id: 'item-2',
        productId: 'pastry-small-chops',
        product: INITIAL_PRODUCTS[9],
        quantity: 1,
        unitPrice: 12500,
        totalPrice: 12500,
      },
      {
        id: 'item-3',
        productId: 'meal-fried-rice-chicken',
        product: INITIAL_PRODUCTS[11],
        quantity: 1,
        unitPrice: 6000,
        totalPrice: 6000,
      }
    ]
  },
  {
    id: 'LAN-88902',
    customerName: 'Grace Danjuma',
    customerEmail: 'grace.d@example.com',
    customerPhone: '0703 112 8844',
    subtotal: 28000,
    deliveryFee: 0,
    total: 28000,
    fulfillmentType: 'pickup-lokoja',
    preferredDate: '2026-09-05',
    preferredTime: '11:00 AM',
    paymentMethod: 'delivery',
    paymentStatus: 'pay_on_delivery',
    status: 'Completed',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date().toISOString(),
    items: [
      {
        id: 'item-4',
        productId: 'cake-vanilla-luxury',
        product: INITIAL_PRODUCTS[0],
        quantity: 1,
        unitPrice: 28000,
        totalPrice: 28000,
      }
    ]
  }
];

export const INITIAL_HAIR_BOOKINGS: HairBooking[] = [
  {
    id: 'HB-5491',
    serviceId: 'hair-knotless-braids',
    serviceName: 'Knotless Box Braids',
    customerName: 'Zainab Mohammed',
    customerEmail: 'zainab.m@example.com',
    customerPhone: '0809 332 1109',
    appointmentDate: '2026-09-09',
    appointmentTime: '10:00 AM',
    locationType: 'home_service',
    studioCity: 'Abuja',
    homeAddress: 'Apartment 3B, Katampe Extension, Abuja',
    hairLength: 'Waist Length',
    hairSize: 'Medium',
    estimatedPrice: 23000,
    status: 'Confirmed',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    specialNotes: 'I prefer color 1/27 blend. Natural hair is washed and blow dried.'
  },
  {
    id: 'HB-5480',
    serviceId: 'hair-locs-maintenance',
    serviceName: 'Locs Retwist & Styling',
    customerName: 'Kelechi Nwosu',
    customerEmail: 'kelechi.n@example.com',
    customerPhone: '0814 559 2201',
    appointmentDate: '2026-09-10',
    appointmentTime: '2:30 PM',
    locationType: 'salon',
    studioCity: 'Lokoja',
    hairLength: 'Medium Locs',
    estimatedPrice: 16000,
    status: 'Pending',
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    specialNotes: 'Needs rope twist styling at the end.'
  }
];

export const INITIAL_CATERING_REQUESTS: CateringRequest[] = [
  {
    id: 'CAT-3180',
    customerName: 'Barrister Aliyu Ibrahim',
    customerEmail: 'aliyu.ibrahim@example.com',
    customerPhone: '0803 700 8821',
    eventType: 'Birthday Party',
    eventDate: '2026-09-20',
    eventLocation: 'Grand Ballroom, Lokoja City Center',
    city: 'Lokoja',
    guestCount: 120,
    cuisinePreference: ['Smoky Party Jollof', 'Fried Rice', 'Small Chops & Cocktail Bites', 'Beef & Fish Assortment'],
    budgetRange: '₦500,000 - ₦1,200,000',
    dietaryRequirements: 'Halal beef and chicken only',
    status: 'Reviewing',
    estimatedQuote: 780000,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    specialRequests: 'Need buffet warmers and 2 uniform service stewards.'
  },
  {
    id: 'CAT-3175',
    customerName: 'Mrs. Stella Adele',
    customerEmail: 'stella.adele@example.com',
    customerPhone: '0818 223 9940',
    eventType: 'Corporate Event',
    eventDate: '2026-09-28',
    eventLocation: 'Central Business District, Abuja',
    city: 'Abuja',
    guestCount: 65,
    cuisinePreference: ['Continental Pasta', 'Mini Pastry Boxes', 'Fruit Parfaits'],
    budgetRange: '₦350,000 - ₦600,000',
    status: 'Quoted',
    estimatedQuote: 450000,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
  }
];

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
      city: 'Lokoja',
      streetAddress: 'No. 8 Confluence Boulevard, Lokoja',
      landmark: 'Near Govt House Roundabout',
      fulfillmentType: 'delivery'
    }
  ],
  favorites: ['cake-vanilla-luxury', 'pastry-meat-pie', 'hair-knotless-braids'],
  createdAt: '2026-01-15T10:00:00Z',
};

export const ADMIN_USER: UserProfile = {
  id: 'usr-admin-01',
  name: 'Danladi Victoria Lanishe (CEO Lanishe)',
  email: 'admin@lanivick.ng',
  phone: '0916 222 6176',
  role: 'admin',
  savedAddresses: [],
  favorites: [],
  createdAt: '2025-01-01T00:00:00Z',
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
      // Dispatch custom event for cross-component reactive updates
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
    return this.getStorage<Product[]>('products', INITIAL_PRODUCTS);
  }

  updateProduct(updated: Product): void {
    const products = this.getProducts().map(p => p.id === updated.id ? updated : p);
    this.setStorage('products', products);
  }

  addProduct(newProd: Product): void {
    const products = [newProd, ...this.getProducts()];
    this.setStorage('products', products);
  }

  toggleProductStock(productId: string): void {
    const products = this.getProducts().map(p => {
      if (p.id === productId) {
        return { ...p, inStock: !p.inStock };
      }
      return p;
    });
    this.setStorage('products', products);
  }

  // Hair Services
  getHairServices(): HairService[] {
    return this.getStorage<HairService[]>('hair_services', INITIAL_HAIR_SERVICES);
  }

  updateHairService(updated: HairService): void {
    const services = this.getHairServices().map(s => s.id === updated.id ? updated : s);
    this.setStorage('hair_services', services);
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

  // Hair Bookings
  getHairBookings(): HairBooking[] {
    return this.getStorage<HairBooking[]>('hair_bookings', INITIAL_HAIR_BOOKINGS);
  }

  createHairBooking(booking: HairBooking): void {
    const bookings = [booking, ...this.getHairBookings()];
    this.setStorage('hair_bookings', bookings);
  }

  updateHairBookingStatus(bookingId: string, status: HairBooking['status']): void {
    const bookings = this.getHairBookings().map(b => {
      if (b.id === bookingId) {
        return { ...b, status };
      }
      return b;
    });
    this.setStorage('hair_bookings', bookings);
  }

  // Catering Requests
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

  // Reviews
  getReviews(): Review[] {
    return this.getStorage<Review[]>('reviews', INITIAL_REVIEWS);
  }

  // Gallery
  getGallery(): GalleryItem[] {
    return this.getStorage<GalleryItem[]>('gallery', INITIAL_GALLERY);
  }

  // Current User Session
  getCurrentUser(): UserProfile | null {
    return this.getStorage<UserProfile | null>('user', null);
  }

  setCurrentUser(user: UserProfile | null): void {
    this.setStorage('user', user);
  }
}

export const dataService = new DataStorageService();
