/**
 * Product Data with Wholesale Pricing & MOQs for EasyBudgetStore
 */

export const products = [
  // ------------------- MEN'S HOODIES -------------------
  {
    id: "ebs-m-hoodie-01",
    slug: "mens-hooded-sweatshirt",
    name: "Heavyweight Fleece Hooded Sweatshirt",
    category: "Men",
    subcategory: "Hoodies",
    gender: "Men",
    wholesalePrice: 420,
    priceDisplay: "₹420 / pc",
    retailMarginDisplay: "Suggested Retail: ₹899 - ₹1,199",
    moq: 10,
    featuredWinter: true,
    isNewDrop: true,
    isBestseller: true,
    description: "Premium heavy brushed winter fleece hoodie with kangaroo pocket, reinforced drawcord, and ribbed cuffs. High-demand staple for casual clothing stores and Instagram resellers.",
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Charcoal Grey", "Jet Black", "Heather Grey", "Olive Green"],
    stockStatus: "Ready Stock in Gandhi Nagar"
  },
  {
    id: "ebs-m-hoodie-02",
    slug: "mens-oversized-fleece-hoodie",
    name: "Men's Oversized Streetwear Hoodie",
    category: "Men",
    subcategory: "Hoodies",
    gender: "Men",
    wholesalePrice: 460,
    priceDisplay: "₹460 / pc",
    retailMarginDisplay: "Suggested Retail: ₹999 - ₹1,499",
    moq: 12,
    featuredWinter: true,
    isNewDrop: false,
    isBestseller: true,
    description: "Relaxed drop-shoulder fleece hoodie with double-needle hems. High visual commercial appeal for youth boutiques and retail racks.",
    images: [
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Oatmeal Beige", "Sage Olive", "Jet Black"],
    stockStatus: "Ready Stock"
  },

  // ------------------- MEN'S SWEATSHIRTS -------------------
  {
    id: "ebs-m-sweat-01",
    slug: "mens-crewneck-sweatshirt",
    name: "Classic Winter Crewneck Sweatshirt",
    category: "Men",
    subcategory: "Sweatshirts",
    gender: "Men",
    wholesalePrice: 340,
    priceDisplay: "₹340 / pc",
    retailMarginDisplay: "Suggested Retail: ₹749 - ₹999",
    moq: 12,
    featuredWinter: true,
    isNewDrop: true,
    isBestseller: true,
    description: "Clean minimal crewneck winter sweatshirt with reinforced neckline and durable ribbed finish. Fast-moving turnover item for regional retailers.",
    images: [
      "https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Jet Black", "Light Grey", "Forest Green", "Navy"],
    stockStatus: "Ready Stock"
  },
  {
    id: "ebs-m-sweat-02",
    slug: "mens-basic-winter-sweatshirt",
    name: "Solid Fleece Winter Pullover",
    category: "Men",
    subcategory: "Sweatshirts",
    gender: "Men",
    wholesalePrice: 320,
    priceDisplay: "₹320 / pc",
    retailMarginDisplay: "Suggested Retail: ₹699 - ₹899",
    moq: 15,
    featuredWinter: false,
    isNewDrop: false,
    isBestseller: false,
    description: "Comfort-fit solid crewneck engineered for dependable warmth and daily wear. High repeatable wholesale volume.",
    images: [
      "https://images.unsplash.com/photo-1578768079052-aa76e520028b?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Navy Blue", "Charcoal", "Burgundy"],
    stockStatus: "Ready Stock"
  },

  // ------------------- MEN'S JACKETS -------------------
  {
    id: "ebs-m-jacket-01",
    slug: "mens-winter-jacket",
    name: "Men's Insulated Thermal Winter Jacket",
    category: "Men",
    subcategory: "Jackets",
    gender: "Men",
    wholesalePrice: 650,
    priceDisplay: "₹650 / pc",
    retailMarginDisplay: "Suggested Retail: ₹1,499 - ₹1,999",
    moq: 8,
    featuredWinter: true,
    isNewDrop: true,
    isBestseller: true,
    description: "Full-zip weather-resistant outer jacket built with padded thermal polyfill insulation, high-stand collar, and side zippered pockets.",
    images: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Matte Black", "Deep Navy", "Olive Drab"],
    stockStatus: "Ready Stock in Delhi Hub"
  },
  {
    id: "ebs-m-jacket-02",
    slug: "mens-puffer-winter-jacket",
    name: "Men's Horizontal Quilted Puffer Jacket",
    category: "Men",
    subcategory: "Jackets",
    gender: "Men",
    wholesalePrice: 590,
    priceDisplay: "₹590 / pc",
    retailMarginDisplay: "Suggested Retail: ₹1,299 - ₹1,799",
    moq: 10,
    featuredWinter: true,
    isNewDrop: false,
    isBestseller: true,
    description: "Padded winter puffer jacket with wind-stop elasticated cuffs and lightweight interior lining.",
    images: [
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Black", "Steel Grey", "Dark Khaki"],
    stockStatus: "Ready Stock"
  },

  // ------------------- MEN'S T-SHIRTS -------------------
  {
    id: "ebs-m-tshirt-01",
    slug: "mens-premium-cotton-tshirt",
    name: "Everyday Combed Cotton T-Shirt",
    category: "Men",
    subcategory: "T-Shirts",
    gender: "Men",
    wholesalePrice: 195,
    priceDisplay: "₹195 / pc",
    retailMarginDisplay: "Suggested Retail: ₹449 - ₹599",
    moq: 20,
    featuredWinter: false,
    isNewDrop: true,
    isBestseller: true,
    description: "Breathable knitted cotton construction with ribbed collar detailing. High repeating wholesale volume for clothing stores and e-commerce sellers.",
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Crisp White", "Jet Black", "Navy", "Melange Grey"],
    stockStatus: "Ready Stock"
  },
  {
    id: "ebs-m-tshirt-02",
    slug: "mens-oversized-cotton-tshirt",
    name: "Oversized Streetwear Cotton T-Shirt",
    category: "Men",
    subcategory: "T-Shirts",
    gender: "Men",
    wholesalePrice: 220,
    priceDisplay: "₹220 / pc",
    retailMarginDisplay: "Suggested Retail: ₹499 - ₹799",
    moq: 15,
    featuredWinter: false,
    isNewDrop: true,
    isBestseller: true,
    description: "Drop shoulder trendy streetwear t-shirt crafted for boutique stores and online fashion retailers.",
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["M", "L", "XL"],
    colors: ["White", "Black", "Charcoal", "Sage"],
    stockStatus: "Ready Stock"
  },

  // ------------------- WOMEN'S JACKETS -------------------
  {
    id: "ebs-w-jacket-01",
    slug: "womens-winter-jacket",
    name: "Women's Structured Winter Parka Jacket",
    category: "Women",
    subcategory: "Jackets",
    gender: "Women",
    wholesalePrice: 680,
    priceDisplay: "₹680 / pc",
    retailMarginDisplay: "Suggested Retail: ₹1,599 - ₹2,199",
    moq: 8,
    featuredWinter: true,
    isNewDrop: true,
    isBestseller: true,
    description: "Tailored women's winter jacket with structured silhouette, premium front zip, and insulated inner lining for boutiques.",
    images: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Ivory Cream", "Midnight Black", "Camel Beige"],
    stockStatus: "Ready Stock in Delhi Hub"
  },
  {
    id: "ebs-w-jacket-02",
    slug: "womens-quilted-puffer-jacket",
    name: "Women's Lightweight Quilted Puffer Jacket",
    category: "Women",
    subcategory: "Jackets",
    gender: "Women",
    wholesalePrice: 580,
    priceDisplay: "₹580 / pc",
    retailMarginDisplay: "Suggested Retail: ₹1,299 - ₹1,799",
    moq: 10,
    featuredWinter: true,
    isNewDrop: false,
    isBestseller: false,
    description: "Contemporary lightweight quilted puffer jacket with elevated high collar and sleek side entry pockets.",
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Onyx Black", "Soft Beige", "Mocha Brown"],
    stockStatus: "Ready Stock"
  },

  // ------------------- KIDS' JACKETS -------------------
  {
    id: "ebs-k-jacket-01",
    slug: "kids-winter-jacket",
    name: "Kids' Thermal Insulated Winter Jacket",
    category: "Kids",
    subcategory: "Jackets",
    gender: "Kids",
    wholesalePrice: 380,
    priceDisplay: "₹380 / pc",
    retailMarginDisplay: "Suggested Retail: ₹799 - ₹1,199",
    moq: 12,
    featuredWinter: true,
    isNewDrop: true,
    isBestseller: true,
    description: "Warm, durable children's winter jacket with smooth zip-front, elasticated cuff guards, and thermal padding.",
    images: [
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["Age 4-5", "Age 6-7", "Age 8-9", "Age 10-12"],
    colors: ["Navy Blue", "Deep Red", "Jet Black", "Teal"],
    stockStatus: "Ready Stock"
  },
  {
    id: "ebs-k-jacket-02",
    slug: "kids-hooded-puffer-jacket",
    name: "Kids' Hooded Winter Puffer Jacket",
    category: "Kids",
    subcategory: "Jackets",
    gender: "Kids",
    wholesalePrice: 395,
    priceDisplay: "₹395 / pc",
    retailMarginDisplay: "Suggested Retail: ₹899 - ₹1,299",
    moq: 12,
    featuredWinter: true,
    isNewDrop: false,
    isBestseller: false,
    description: "Lightweight quilted hooded puffer jacket for boys and girls with snag-free zipper for easy wearing.",
    images: [
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["Age 4-5", "Age 6-7", "Age 8-9", "Age 10-12"],
    colors: ["Cobalt Blue", "Charcoal", "Bright Yellow"],
    stockStatus: "Ready Stock"
  }
];

export const categoryCardsData = [
  {
    id: "cat-m-tshirts",
    title: "MEN'S T-SHIRTS",
    category: "Men",
    subcategory: "T-Shirts",
    path: "/men?category=t-shirts",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop",
    countText: "From ₹195/pc • MOQ 20"
  },
  {
    id: "cat-m-sweatshirts",
    title: "MEN'S SWEATSHIRTS",
    category: "Men",
    subcategory: "Sweatshirts",
    path: "/men?category=sweatshirts",
    image: "https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?q=80&w=1000&auto=format&fit=crop",
    countText: "From ₹320/pc • MOQ 12"
  },
  {
    id: "cat-m-hoodies",
    title: "MEN'S HOODIES",
    category: "Men",
    subcategory: "Hoodies",
    path: "/men?category=hoodies",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop",
    countText: "From ₹420/pc • MOQ 10"
  },
  {
    id: "cat-m-jackets",
    title: "MEN'S JACKETS",
    category: "Men",
    subcategory: "Jackets",
    path: "/men?category=jackets",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop",
    countText: "From ₹590/pc • MOQ 8"
  },
  {
    id: "cat-w-jackets",
    title: "WOMEN'S JACKETS",
    category: "Women",
    subcategory: "Jackets",
    path: "/women",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop",
    countText: "From ₹580/pc • MOQ 8"
  },
  {
    id: "cat-k-jackets",
    title: "KIDS' JACKETS",
    category: "Kids",
    subcategory: "Jackets",
    path: "/kids",
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1000&auto=format&fit=crop",
    countText: "From ₹380/pc • MOQ 12"
  }
];

export const instagramTiles = [
  {
    id: "ig-1",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop",
    caption: "Heavy fleece winter hoodies ready for showroom inspection."
  },
  {
    id: "ig-2",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=600&auto=format&fit=crop",
    caption: "Men's insulated winter jackets packed for wholesale dispatch."
  },
  {
    id: "ig-3",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop",
    caption: "Minimalist women's outerwear cut with tailored precision."
  },
  {
    id: "ig-4",
    image: "https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?q=80&w=600&auto=format&fit=crop",
    caption: "Daily crewneck sweatshirts in core commercial neutrals."
  },
  {
    id: "ig-5",
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=600&auto=format&fit=crop",
    caption: "Kids' winter jacket collection built for active comfort."
  },
  {
    id: "ig-6",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop",
    caption: "Everyday cotton basics for commercial retail racks."
  }
];
