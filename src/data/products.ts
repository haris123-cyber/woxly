export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified?: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  longDescription?: string;
  image?: string;
  images: string[];
  category: string;
  inStock: boolean;
  stockCount: number;
  colors?: { name: string; class?: string; hex: string }[];
  sizes?: string[];
  details: string[];
  specs: { name: string; value: string }[];
  weight?: string;
  vendor?: string;
  featured?: boolean;
  reviews?: Review[];
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "g1",
    name: "Beetroot",
    slug: "beetroot-organic",
    price: 27.29,
    originalPrice: 30.99,
    rating: 4.8,
    reviewCount: 342,
    description: "Fresh Organic Beetroot from local farms.",
    images: ["/images/products/grocery_beetroot.png"],
    category: "Vegetables",
    inStock: true,
    stockCount: 150,
    details: [
      "100% Organic",
      "Locally sourced",
      "Rich in vitamins and minerals",
      "Perfect for salads and juices"
    ],
    specs: [
      { name: "Origin", value: "Local Farm" },
      { name: "Type", value: "Organic" },
      { name: "Packaging", value: "Eco-friendly" }
    ],
    weight: "500 gm",
    vendor: "Local shop"
  },
  {
    id: "g2",
    name: "Italian Avocado",
    slug: "italian-avocado",
    price: 32.29,
    rating: 4.9,
    reviewCount: 890,
    description: "Premium grade Italian avocados with perfect ripeness.",
    images: ["/images/products/grocery_avocado.png"],
    category: "Fruits",
    inStock: true,
    stockCount: 85,
    details: [
      "Imported premium quality",
      "Rich and creamy texture",
      "High in healthy fats"
    ],
    specs: [
      { name: "Origin", value: "Italy" },
      { name: "Type", value: "Hass" }
    ],
    weight: "500 gm",
    vendor: "Local shop"
  },
  {
    id: "g3",
    name: "Scented Soy Candles",
    slug: "scented-soy-candles",
    price: 34.00,
    originalPrice: 45.00,
    rating: 4.9,
    reviewCount: 215,
    description: "Premium minimalist scented soy candles in frosted glass.",
    images: ["/images/products/home_candles.png"],
    category: "Home",
    inStock: true,
    stockCount: 42,
    details: [
      "100% natural soy wax",
      "Lead-free cotton wicks",
      "60 hour burn time",
      "Hand poured"
    ],
    specs: [
      { name: "Material", value: "Soy Wax" },
      { name: "Scent", value: "Sandalwood & Vanilla" }
    ],
    weight: "200 gm",
    vendor: "Home goods"
  },
  {
    id: "g4",
    name: "Plush Bath Towels",
    slug: "plush-bath-towels",
    price: 75.00,
    rating: 4.8,
    reviewCount: 1205,
    description: "Ultra-soft and absorbent premium cotton bath towels.",
    images: ["/images/products/home_towel.png"],
    category: "Home",
    inStock: true,
    stockCount: 300,
    details: [
      "100% Egyptian cotton",
      "Highly absorbent",
      "Quick drying"
    ],
    specs: [
      { name: "Material", value: "Cotton" },
      { name: "Size", value: "30x54 inches" }
    ],
    weight: "800 gm",
    vendor: "Home goods"
  },
  {
    id: "g5",
    name: "Deshi Gajor (Local Carrot)",
    slug: "deshi-gajor-carrot",
    price: 29.29,
    rating: 4.8,
    reviewCount: 412,
    description: "Sweet and crunchy local carrots.",
    images: ["/images/products/grocery_carrot.png"],
    category: "Vegetables",
    inStock: true,
    stockCount: 110,
    details: [
      "Farm fresh",
      "Naturally sweet",
      "Great for cooking and snacking"
    ],
    specs: [
      { name: "Origin", value: "Local Farm" },
      { name: "Type", value: "Organic" }
    ],
    weight: "500 gm",
    vendor: "Local shop"
  },
  {
    id: "g6",
    name: "Deshi Shosha (Local Cucumb)",
    slug: "deshi-shosha-cucumber",
    price: 10.29,
    originalPrice: 24.99,
    rating: 4.6,
    reviewCount: 189,
    description: "Crisp and hydrating local cucumbers.",
    images: ["/images/products/grocery_cucumber.png"],
    category: "Vegetables",
    inStock: true,
    stockCount: 200,
    details: [
      "Hydrating and refreshing",
      "Perfect for salads",
      "Locally grown"
    ],
    specs: [
      { name: "Origin", value: "Local Farm" }
    ],
    weight: "500 gm",
    vendor: "Local shop"
  },
  {
    id: "g7",
    name: "Artisan Hand Soap",
    slug: "artisan-hand-soap",
    price: 22.00,
    rating: 4.7,
    reviewCount: 843,
    description: "Premium organic artisan hand soap.",
    images: ["/images/products/home_soap.png"],
    category: "Home",
    inStock: true,
    stockCount: 55,
    details: [
      "Organic ingredients",
      "Cold pressed",
      "Sulfate free"
    ],
    specs: [
      { name: "Type", value: "Bar Soap" },
      { name: "Scent", value: "Lavender" }
    ],
    weight: "150 gm",
    vendor: "Home goods"
  },
  {
    id: "g8",
    name: "Badhakopi (Local Cabbage)",
    slug: "badhakopi-cabbage",
    price: 19.29,
    rating: 4.9,
    reviewCount: 310,
    description: "Fresh, tightly packed local green cabbage.",
    images: ["/images/products/grocery_cabbage.png"],
    category: "Vegetables",
    inStock: true,
    stockCount: 75,
    details: [
      "Locally harvested",
      "Rich in nutrients",
      "Perfect for stir-fry or salads"
    ],
    specs: [
      { name: "Origin", value: "Local Farm" },
      { name: "Color", value: "Green" }
    ],
    weight: "500 gm",
    vendor: "Local shop"
  },
  {
    id: "g9",
    name: "Fresh Beef Cuts",
    slug: "fresh-beef-cuts",
    price: 250.00,
    rating: 4.8,
    reviewCount: 156,
    description: "Premium quality fresh beef cuts.",
    images: ["/images/products/grocery_beef.png"],
    category: "Meat",
    inStock: true,
    stockCount: 40,
    details: ["Locally sourced", "Grass-fed"],
    specs: [{ name: "Type", value: "Beef" }],
    weight: "1 kg",
    vendor: "Local butcher"
  },
  {
    id: "g10",
    name: "Lays Classic Potato Chips",
    slug: "lays-classic",
    price: 25.00,
    rating: 4.5,
    reviewCount: 523,
    description: "Classic salted potato chips.",
    images: ["/images/products/grocery_lays.png"],
    category: "Snacks",
    inStock: true,
    stockCount: 120,
    details: ["Classic flavor", "Crispy texture"],
    specs: [{ name: "Brand", value: "Lays" }],
    weight: "150 gm",
    vendor: "Supermarket"
  },
  {
    id: "g11",
    name: "Sprite Lemon-Lime Soda",
    slug: "sprite-soda",
    price: 30.00,
    rating: 4.7,
    reviewCount: 342,
    description: "Refreshing lemon-lime flavored soda.",
    images: ["/images/products/grocery_sprite.png"],
    category: "Beverages",
    inStock: true,
    stockCount: 250,
    details: ["Caffeine-free", "Crisp taste"],
    specs: [{ name: "Brand", value: "Sprite" }],
    weight: "500 ml",
    vendor: "Supermarket"
  },
  {
    id: "g12",
    name: "Ceramic Coffee Mug",
    slug: "ceramic-coffee-mug",
    price: 35.00,
    rating: 4.9,
    reviewCount: 88,
    description: "Handcrafted ceramic mug for your daily coffee.",
    images: ["/images/products/product_mug.png"],
    category: "Home",
    inStock: true,
    stockCount: 35,
    details: ["Handcrafted", "Microwave safe"],
    specs: [{ name: "Material", value: "Ceramic" }],
    weight: "300 gm",
    vendor: "Home goods"
  }
];

const uniqueCategories = Array.from(new Set(MOCK_PRODUCTS.map(p => p.category)));

export const MOCK_CATEGORIES = [
  { name: "All Products", count: MOCK_PRODUCTS.length },
  ...uniqueCategories.map(category => ({
    name: category,
    count: MOCK_PRODUCTS.filter(p => p.category === category).length
  }))
];
