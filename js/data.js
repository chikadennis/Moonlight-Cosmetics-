/* =========================================================
   MOONLIGHT COSMETICS — PRODUCT & SERVICE DATA
   Single source of truth for names, prices and images.
   Loaded first on every page (before cart.js / main.js).
   ========================================================= */

const PRODUCT_CATEGORIES = [
  { id: "soaps", label: "Soaps" },
  { id: "scrubs", label: "Body Scrubs" },
  { id: "wax", label: "Body Wax" },
  { id: "serums", label: "Serums" },
  { id: "oils", label: "Body Oils" }
];

const PRODUCTS = [
  {
    id: "black-soap",
    name: "African Black Soap",
    filterCategory: "soaps",
    tagline: "Natural & Cleansing",
    description: "Gentle, natural cleansing care for your everyday skincare routine.",
    features: ["Deeply cleanses", "Fights acne", "Nourishes skin"],
    badge: "Best Seller",
    image: "images/small%20size.jpg",
    gallery: [
      "images/Big%20Size.jpg",
      "images/photo_2026-09-21_16-17-31.jpg",
      "images/photo_2026-09-21_16-17-35.jpg"
    ],
    variants: [
      { id: "small", label: "Small", price: 18000 },
      { id: "big", label: "Big", price: 30000 }
    ]
  },
  {
    id: "body-scrub",
    name: "Body Scrub",
    filterCategory: "scrubs",
    tagline: "Purify & Detoxify",
    description: "Coconut & turmeric body scrub for a smooth, refreshed skin feel.",
    features: ["Exfoliates dead skin", "Softens & smooths", "Boosts natural glow"],
    badge: "Popular",
    image: "images/photo_2026-09-21_16-17-57.jpg",
    gallery: ["images/photo_2026-09-21_16-17-40.jpg"],
    variants: [
      { id: "small", label: "Small", price: 15000 },
      { id: "big", label: "Big", price: 25000 }
    ]
  },
  {
    id: "body-wax",
    name: "Body Wax Hair Removal",
    filterCategory: "wax",
    tagline: "Gentle & Effective",
    description: "Gentle, fast and effective waxing for soft, smooth-looking skin.",
    features: ["Gentle hair removal", "Fast & effective", "Soft & smooth skin"],
    image: "images/Wax.jpg",
    gallery: [],
    variants: [
      { id: "std", label: "Standard", price: 10000 }
    ]
  },
  {
    id: "face-serum",
    name: "Face Serum",
    filterCategory: "serums",
    tagline: "Daily Essential",
    description: "A skincare essential for your daily beauty routine.",
    features: ["Lightweight formula", "Daily hydration", "Easy application"],
    placeholder: true,
    image: "images/photo_2026-09-21_16-18-11.jpg",
    imagePosition: "8% 22%",
    gallery: [],
    variants: [
      { id: "std", label: "Standard", price: 8000 }
    ]
  },
  {
    id: "face-soap",
    name: "Face Soap",
    filterCategory: "soaps",
    tagline: "Gentle Facial Care",
    description: "Simple, natural cleansing care for your everyday facial routine.",
    features: ["Gentle on skin", "Everyday cleansing", "Non-drying formula"],
    placeholder: true,
    image: "images/photo_2026-09-21_16-17-35.jpg",
    imagePosition: "center 42%",
    gallery: [],
    variants: [
      { id: "std", label: "Standard", price: 5000 }
    ]
  },
  {
    id: "body-oil",
    name: "Body Oil",
    filterCategory: "oils",
    tagline: "Nourishing Care",
    description: "Nourishing body-care oil for soft, cared-for skin.",
    features: ["Nourishes skin", "Soft, silky feel", "Everyday body care"],
    placeholder: true,
    image: "images/photo_2026-09-21_16-18-02.jpg",
    gallery: [],
    variants: [
      { id: "std", label: "Standard", price: 10000 }
    ]
  }
];

const SERVICES = [
  {
    id: "full-body-wash",
    name: "Full Body Wash",
    category: "services",
    description: "A complete body-care service designed to leave you feeling fresh and cared for.",
    variants: [{ id: "std", label: "Standard", price: 60000 }]
  },
  {
    id: "small-set",
    name: "Small Set",
    category: "services",
    description: "A convenient combination of selected Moonlight Cosmetics products.",
    variants: [{ id: "std", label: "Standard", price: 56000 }]
  },
  {
    id: "big-set",
    name: "Big Set",
    category: "services",
    description: "A larger skincare package for customers who want more from their beauty routine.",
    variants: [{ id: "std", label: "Standard", price: 88000 }]
  }
];

function findProductById(productId) {
  return PRODUCTS.find(function (p) { return p.id === productId; }) ||
    SERVICES.find(function (s) { return s.id === productId; }) ||
    null;
}

function findVariant(product, variantId) {
  if (!product) return null;
  return product.variants.find(function (v) { return v.id === variantId; }) || product.variants[0] || null;
}

function formatNaira(amount) {
  return "₦" + Number(amount || 0).toLocaleString("en-NG");
}
