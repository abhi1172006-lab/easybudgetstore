/**
 * EasyBudgetStore CMS — persistent catalog & content store.
 * Works on static Netlify hosting via localStorage, and hydrates from seed data once.
 */
import { products as seedProducts } from '../data/products';

export const STORE_KEY = 'ebs_cms_v5';
const LISTENERS = new Set();

const PLACEHOLDER =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000"><rect fill="#F7F7F5" width="800" height="1000"/><text x="50%" y="50%" text-anchor="middle" fill="#666" font-family="Arial" font-size="28">EasyBudgetStore</text></svg>`
  );
// ... [keeping DEFAULT_CATEGORIES etc the same below]

export const DEFAULT_CATEGORIES = [
  {
    id: 'cat-winter-tshirts',
    name: 'Winter T-Shirts',
    slug: 'winter-t-shirts',
    description: 'Seasonal cotton tees for retail racks and everyday wholesale volume.',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
    visible: true,
    order: 1,
  },
  {
    id: 'cat-sweatshirts',
    name: 'Sweatshirts',
    slug: 'sweatshirts',
    description: 'Crewneck fleece sweatshirts for winter wholesale programmes.',
    image: 'https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?q=80&w=1000&auto=format&fit=crop',
    visible: true,
    order: 2,
  },
  {
    id: 'cat-hoodies',
    name: 'Hoodies',
    slug: 'hoodies',
    description: 'Heavyweight fleece hoodies for boutiques and resellers.',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop',
    visible: true,
    order: 3,
  },
  {
    id: 'cat-mens-jackets',
    name: "Men's Jackets",
    slug: 'mens-jackets',
    description: 'Insulated and quilted outerwear for menswear wholesale.',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop',
    visible: true,
    order: 4,
  },
  {
    id: 'cat-womens-jackets',
    name: "Women's Jackets",
    slug: 'womens-jackets',
    description: 'Structured parkas and puffers for women’s wholesale.',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop',
    visible: true,
    order: 5,
  },
  {
    id: 'cat-kids-jackets',
    name: "Kids' Jackets",
    slug: 'kids-jackets',
    description: 'Warm kids’ outerwear sized for retail age curves.',
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1000&auto=format&fit=crop',
    visible: true,
    order: 6,
  },
];

export const DEFAULT_SETTINGS = {
  siteName: 'EasyBudgetStore',
  wordmark: 'EASYBUDGETSTORE',
  tagline: 'WHOLESALE, AT YOUR DOORSTEP',
  subtitle: 'Manufacturer & Wholesaler of T-shirts, jackets, winterwear and more.',
  ownerName: 'Abhi Gupta',
  phone: '+91 9289981449',
  whatsappNumber: '919289981449',
  whatsappDisplay: '+91 92899 81449',
  email: 'contact@easybudgetstore.com',
  address: 'IX/502, Shop No. 1, Ram Lakha Mal Market, Near Tikona Park, Subhash Road, Gandhi Nagar, Delhi-110031',
  businessHours: 'Mon - Sat: 10:30 AM - 7:30 PM IST (Sunday Closed)',
  logoUrl: '/logo.png',
  faviconUrl: '/logo.png',
  logoHeightDesktop: 80,
  logoHeightMobile: 50,
  headerHeightDesktop: 110,
  headerHeightMobile: 80,
  navFontSize: 14,
  accentColor: '#111111',
  footerText: 'Delhi-based B2B apparel partner specialising in accessible fashion and cold-weather collections for retailers, resellers and online clothing businesses.',
  instagram: '',
  facebook: '',
  copyright: '© 2026 EasyBudgetStore. All rights reserved.',
  googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Ram+Lakha+Mal+Market+Gandhi+Nagar+Delhi+110031&z=16&output=embed',
  seoTitle: 'EasyBudgetStore | Wholesale Clothing & Winterwear in Gandhi Nagar Delhi',
  seoDescription:
    'Wholesale clothing and winterwear from Gandhi Nagar, Delhi. Hoodies, sweatshirts, winter T-shirts and jackets for retailers and resellers.',
  seoKeywords:
    'wholesale clothing Gandhi Nagar, wholesale clothes Delhi, winterwear wholesale Delhi, hoodies wholesale Gandhi Nagar, sweatshirts wholesale Delhi, jackets wholesale Delhi, wholesale T-shirts Gandhi Nagar, B2B clothing supplier Delhi',
};

export const DEFAULT_HOMEPAGE = {
  hero: {
    enabled: true,
    eyebrow: 'GANDHI NAGAR • DELHI',
    heading: 'Wholesale Clothing & Winterwear',
    subtitle: 'Quality wholesale fashion, delivered to your business.',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop',
    imageCaption: 'Winter outerwear for retailers',
    primaryCta: 'Shop Collection',
    primaryCtaUrl: '/shop',
    secondaryCta: 'Enquire on WhatsApp',
    secondaryCtaUrl: 'whatsapp',
  },
  categoriesSection: {
    enabled: true,
    title: 'Shop the Collection',
    subtitle: 'Everyday styles. Winter essentials. Wholesale-ready.',
  },
  featuredSection: {
    enabled: true,
    title: 'The Winter Edit',
    subtitle: 'Cold-weather essentials selected for retailers looking for trend, versatility and value.',
    mode: 'featured',
  },
  banners: [
    {
      id: 'banner-1',
      enabled: true,
      title: 'Wholesale winterwear, ready for your store',
      text: 'Request a catalogue and MOQ sheet from our Gandhi Nagar desk.',
      cta: 'Contact Sales',
      link: '/contact',
      image: '',
    },
  ],
  about: {
    enabled: true,
    heading: 'Gandhi Nagar wholesale clothing',
    description:
      'EasyBudgetStore is a Gandhi Nagar, Delhi based clothing business focused on accessible fashion and winterwear for retailers, resellers and growing businesses.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop',
  },
  whyChooseUs: {
    enabled: true,
    heading: 'Why EasyBudgetStore?',
    description:
      'We specialise in bridging accessible wholesale fashion with modern commercial designs for growing clothing businesses.',
    image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1200&auto=format&fit=crop',
    items: [
      { id: 'w1', icon: '01', heading: 'Affordable', description: 'Products positioned for value-conscious businesses.' },
      { id: 'w2', icon: '02', heading: 'Modern', description: 'Contemporary styles for everyday retail.' },
      { id: 'w3', icon: '03', heading: 'Versatile', description: 'Collections covering men, women and kids.' },
      { id: 'w4', icon: '04', heading: 'Business ready', description: 'Designed around the needs of retailers and resellers.' },
    ],
  },
};

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function mapSeedCategory(product) {
  const sub = (product.subcategory || '').toLowerCase();
  const cat = (product.category || '').toLowerCase();
  if (sub.includes('t-shirt') || sub.includes('tshirt')) return 'winter-t-shirts';
  if (sub.includes('sweat')) return 'sweatshirts';
  if (sub.includes('hood')) return 'hoodies';
  if (cat === 'women') return 'womens-jackets';
  if (cat === 'kids') return 'kids-jackets';
  if (sub.includes('jacket') || cat === 'men') return 'mens-jackets';
  return 'hoodies';
}

function normalizeProduct(raw, categories) {
  const categorySlug = raw.categorySlug || mapSeedCategory(raw);
  const category = categories.find((c) => c.slug === categorySlug) || categories.find((c) => c.name === raw.category);
  const images = Array.isArray(raw.images) && raw.images.length
    ? raw.images.filter(Boolean)
    : raw.image_url
      ? [raw.image_url]
      : [PLACEHOLDER];
  const price = Number(raw.wholesalePrice ?? raw.price_slab_a ?? 0);
  
  // Variant Schema Upgrades
  const rawColors = raw.colors || ['Black', 'White', 'Grey'];
  const colors = rawColors.map((c, i) => 
    typeof c === 'string' ? { id: `c${i+1}`, name: c, code: c.toLowerCase() === 'black' ? '#000000' : c.toLowerCase() === 'white' ? '#ffffff' : '#9ca3af', visible: true } : c
  );
  const sizes = raw.sizes || ['S', 'M', 'L', 'XL', 'XXL'];
  
  const stockMatrix = raw.stockMatrix || {};
  if (!raw.stockMatrix) {
    // Generate default matrix dividing original stock equally
    const initialTotal = Number(raw.stockQuantity ?? raw.stock ?? 100);
    const perCombo = Math.max(1, Math.floor(initialTotal / (colors.length * sizes.length)));
    colors.forEach(c => {
      sizes.forEach(s => {
        stockMatrix[`${c.id}_${s}`] = perCombo;
      });
    });
  }
  
  const totalStock = Object.values(stockMatrix).reduce((a, b) => a + Number(b), 0);
  const stockStatus = totalStock > 0 ? 'In stock' : 'Out of stock';

  return {
    id: raw.id || `prod-${Date.now()}-${Math.random().toString(36).substring(2,7)}`,
    sku: raw.sku || `SKU-${String(raw.id || Date.now()).slice(-6).toUpperCase()}`,
    name: raw.name || 'Untitled product',
    slug: raw.slug || slugify(raw.name),
    categoryId: category?.id || '',
    categorySlug: category?.slug || categorySlug,
    categoryName: category?.name || raw.category || '',
    subcategory: raw.subcategory || category?.name || '',
    description: raw.description || '',
    shortDescription: raw.shortDescription || raw.short_description || '',
    wholesalePrice: price,
    salePrice: raw.salePrice ? Number(raw.salePrice) : null,
    moq: Number(raw.moq || 10),
    stockQuantity: totalStock,
    stockStatus: stockStatus,
    sizes: sizes,
    colors: colors,
    stockMatrix: stockMatrix,
    images,
    thumbnail: raw.thumbnail || images[0] || PLACEHOLDER,
    tags: raw.tags || [],
    featured: Boolean(raw.featured ?? raw.featuredWinter ?? raw.is_featured),
    isNew: Boolean(raw.isNew ?? raw.isNewDrop ?? raw.is_new_arrival),
    isBestseller: Boolean(raw.isBestseller ?? raw.is_bestseller),
    visibility: raw.visibility || (raw.status === 'ARCHIVED' ? 'archived' : raw.status === 'HIDDEN' ? 'hidden' : 'visible'),
    status: raw.status || 'ACTIVE',
    seoTitle: raw.seoTitle || raw.name || '',
    seoDescription: raw.seoDescription || raw.description || '',
    seoKeywords: raw.seoKeywords || (raw.tags || []).join(', '),
    fabric: raw.fabric || raw.details?.fabric || '',
    fit: raw.fit || raw.details?.fit || '',
    gender: raw.gender || '',
    createdAt: raw.createdAt || raw.created_at || new Date().toISOString(),
    updatedAt: raw.updatedAt || new Date().toISOString(),
  };
}

function getSeedStore() {
  const categories = DEFAULT_CATEGORIES.map((c) => ({ ...c }));
  const products = seedProducts.map((p) => normalizeProduct(p, categories));
  return {
    version: 5,
    products,
    categories,
    homepage: structuredClone(DEFAULT_HOMEPAGE),
    settings: { ...DEFAULT_SETTINGS },
    media: [],
    orders: [],
    quotes: [],
    customers: [],
    audit: [],
  };
}

function readRaw() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function writeRaw(store) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
  } catch (err) {
    throw new Error('Could not save data. Images may be too large for this browser. Try smaller files.');
  }
  LISTENERS.forEach((fn) => {
    try { fn(store); } catch {}
  });
  window.dispatchEvent(new CustomEvent('ebs-cms-updated'));
}

export function subscribeCms(fn) {
  LISTENERS.add(fn);
  return () => LISTENERS.delete(fn);
}

export function getStore() {
  let store = readRaw();
  if (!store || store.version !== 5) {
    const seeded = getSeedStore();
    
    // Migrate from older version without losing custom data
    if (store?.orders?.length) seeded.orders = store.orders;
    if (store?.quotes?.length) seeded.quotes = store.quotes;
    if (store?.bulk_quotes?.length) seeded.quotes = store.bulk_quotes;
    if (store?.settings) seeded.settings = { ...seeded.settings, ...store.settings };
    if (store?.homepage) seeded.homepage = { ...seeded.homepage, ...store.homepage };
    if (store?.categories?.length) seeded.categories = store.categories;
    if (store?.media?.length) seeded.media = store.media;
    
    if (store?.products?.length) {
      seeded.products = store.products.map(p => normalizeProduct(p, seeded.categories));
    }
    
    writeRaw(seeded);
    return seeded;
  }
  
  store.categories = store.categories || DEFAULT_CATEGORIES.map((c) => ({ ...c }));
  store.products = (store.products || []).map((p) => normalizeProduct(p, store.categories));
  const hp = store.homepage || {};
  store.homepage = {
    ...structuredClone(DEFAULT_HOMEPAGE),
    ...hp,
    hero: { ...DEFAULT_HOMEPAGE.hero, ...(hp.hero || {}) },
    categoriesSection: { ...DEFAULT_HOMEPAGE.categoriesSection, ...(hp.categoriesSection || {}) },
    featuredSection: { ...DEFAULT_HOMEPAGE.featuredSection, ...(hp.featuredSection || {}) },
    about: { ...DEFAULT_HOMEPAGE.about, ...(hp.about || {}) },
    whyChooseUs: { ...DEFAULT_HOMEPAGE.whyChooseUs, ...(hp.whyChooseUs || {}) },
    banners: hp.banners?.length ? hp.banners : DEFAULT_HOMEPAGE.banners,
  };
  store.settings = { ...DEFAULT_SETTINGS, ...(store.settings || {}) };
  store.quotes = store.quotes || store.bulk_quotes || [];
  store.orders = store.orders || [];
  store.media = store.media || [];
  store.audit = store.audit || [];
  return store;
}

export function saveStore(mutator) {
  const current = getStore();
  const next = typeof mutator === 'function' ? mutator(current) : { ...current, ...mutator };
  writeRaw(next);
  return next;
}

export function logAudit(action, details) {
  saveStore((store) => {
    store.audit = [{ id: Date.now(), action, details, createdAt: new Date().toISOString() }, ...(store.audit || [])].slice(0, 80);
    return store;
  });
}

export async function initCms() {
  return getStore();
}

export function withPrice(product) {
  const pA = Number(product.wholesalePrice || 0);
  const images = product.images?.length ? product.images : [product.thumbnail || PLACEHOLDER];
  return {
    ...product,
    category: product.categoryName,
    image_url: images[0],
    images,
    price_slab_a: pA,
    price_slab_b: Math.round(pA * 0.9),
    price_slab_c: Math.round(pA * 0.82),
    price_display: pA ? `₹${pA} / pc` : 'Get wholesale price',
    featuredWinter: product.featured,
    isNewDrop: product.isNew,
    is_featured: product.featured ? 1 : 0,
    is_new_arrival: product.isNew ? 1 : 0,
    is_bestseller: product.isBestseller ? 1 : 0,
  };
}

export function visibleProducts(store = getStore()) {
  return store.products.filter((p) => p.visibility === 'visible' && p.status !== 'ARCHIVED');
}

export function filterProducts(params = {}, store = getStore()) {
  let list = [...store.products];
  const includeArchived = params.includeArchived === true;
  if (!includeArchived) list = list.filter((p) => p.status !== 'ARCHIVED' && p.visibility !== 'archived');
  if (params.visibility) list = list.filter((p) => p.visibility === params.visibility);
  if (params.category && params.category !== 'all') {
    const q = String(params.category).toLowerCase();
    list = list.filter(
      (p) =>
        p.categorySlug === q ||
        p.categoryName.toLowerCase() === q ||
        p.subcategory?.toLowerCase() === q ||
        p.gender?.toLowerCase() === q
    );
  }
  if (params.gender) {
    const g = String(params.gender).toLowerCase();
    list = list.filter((p) => (p.gender || '').toLowerCase() === g);
  }
  if (params.featured === 'true' || params.featured === true) list = list.filter((p) => p.featured);
  if (params.new_arrivals === 'true' || params.isNew) list = list.filter((p) => p.isNew);
  if (params.bestseller === 'true') list = list.filter((p) => p.isBestseller);
  if (params.availability === 'in') list = list.filter((p) => p.stockQuantity > 0 && p.stockStatus !== 'Out of stock');
  if (params.availability === 'out') list = list.filter((p) => p.stockQuantity <= 0 || p.stockStatus === 'Out of stock');
  if (params.size) list = list.filter((p) => (p.sizes || []).some((s) => String(s).toLowerCase() === String(params.size).toLowerCase()));
  if (params.color) list = list.filter((p) => (p.colors || []).some((c) => String(c).toLowerCase() === String(params.color).toLowerCase()));
  if (params.minPrice) list = list.filter((p) => p.wholesalePrice >= Number(params.minPrice));
  if (params.maxPrice) list = list.filter((p) => p.wholesalePrice <= Number(params.maxPrice));
  if (params.search) {
    const t = params.search.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(t) ||
        p.sku.toLowerCase().includes(t) ||
        p.categoryName.toLowerCase().includes(t) ||
        p.subcategory.toLowerCase().includes(t) ||
        (p.tags || []).join(' ').toLowerCase().includes(t)
    );
  }
  const sort = params.sort || 'newest';
  if (sort === 'price-asc') list.sort((a, b) => a.wholesalePrice - b.wholesalePrice);
  else if (sort === 'price-desc') list.sort((a, b) => b.wholesalePrice - a.wholesalePrice);
  else if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
  else list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return list.map(withPrice);
}

export function getProduct(idOrSlug, store = getStore()) {
  return store.products.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
}

export function upsertProduct(data) {
  let saved;
  saveStore((store) => {
    const normalized = normalizeProduct(
      {
        ...data,
        id: data.id || `prod-${Date.now()}`,
        slug: data.slug || slugify(data.name),
        updatedAt: new Date().toISOString(),
        createdAt: data.createdAt || new Date().toISOString(),
      },
      store.categories
    );
    const idx = store.products.findIndex((p) => p.id === normalized.id);
    if (idx >= 0) store.products[idx] = { ...store.products[idx], ...normalized };
    else store.products.unshift(normalized);
    saved = idx >= 0 ? store.products[idx] : store.products[0];
    return store;
  });
  logAudit(data.id ? 'UPDATE_PRODUCT' : 'CREATE_PRODUCT', saved?.name);
  return saved;
}

export function duplicateProduct(id) {
  const product = getProduct(id);
  if (!product) throw new Error('Product not found.');
  return upsertProduct({
    ...product,
    id: `prod-${Date.now()}`,
    name: `${product.name} (Copy)`,
    slug: `${product.slug}-copy-${Date.now().toString().slice(-4)}`,
    sku: `${product.sku}-C`,
    createdAt: new Date().toISOString(),
  });
}

export function archiveProduct(id) {
  saveStore((store) => {
    const p = store.products.find((x) => x.id === id);
    if (p) {
      p.status = 'ARCHIVED';
      p.visibility = 'archived';
      p.updatedAt = new Date().toISOString();
    }
    return store;
  });
}

export function restoreProduct(id) {
  saveStore((store) => {
    const p = store.products.find((x) => x.id === id);
    if (p) {
      p.status = 'ACTIVE';
      p.visibility = 'visible';
      p.updatedAt = new Date().toISOString();
    }
    return store;
  });
}

export function deleteProduct(id) {
  saveStore((store) => {
    store.products = store.products.filter((p) => p.id !== id);
    return store;
  });
  logAudit('DELETE_PRODUCT', id);
}

export function upsertCategory(data) {
  let saved;
  saveStore((store) => {
    const item = {
      id: data.id || `cat-${Date.now()}`,
      name: data.name,
      slug: data.slug || slugify(data.name),
      description: data.description || '',
      image: data.image || PLACEHOLDER,
      visible: data.visible !== false,
      order: data.order ?? store.categories.length + 1,
    };
    const idx = store.categories.findIndex((c) => c.id === item.id);
    const oldSlug = idx >= 0 ? store.categories[idx].slug : null;
    if (idx >= 0) store.categories[idx] = { ...store.categories[idx], ...item };
    else store.categories.push(item);
    if (oldSlug && oldSlug !== item.slug) {
      store.products.forEach((p) => {
        if (p.categoryId === item.id || p.categorySlug === oldSlug) {
          p.categorySlug = item.slug;
          p.categoryName = item.name;
          p.subcategory = item.name;
        }
      });
    } else {
      store.products.forEach((p) => {
        if (p.categoryId === item.id) {
          p.categoryName = item.name;
          p.categorySlug = item.slug;
        }
      });
    }
    saved = item;
    return store;
  });
  return saved;
}

export function deleteCategory(id) {
  saveStore((store) => {
    store.categories = store.categories.filter((c) => c.id !== id);
    return store;
  });
}

export function reorderCategories(ids) {
  saveStore((store) => {
    store.categories = ids
      .map((id, i) => {
        const cat = store.categories.find((c) => c.id === id);
        return cat ? { ...cat, order: i + 1 } : null;
      })
      .filter(Boolean);
    return store;
  });
}

export function updateHomepage(partial) {
  saveStore((store) => {
    store.homepage = { ...store.homepage, ...partial };
    return store;
  });
}

export function updateSettings(partial) {
  saveStore((store) => {
    store.settings = { ...store.settings, ...partial };
    return store;
  });
}

export function addMedia(item) {
  saveStore((store) => {
    store.media.unshift({ id: `media-${Date.now()}`, createdAt: new Date().toISOString(), ...item });
    return store;
  });
}

export function addQuote(quote) {
  const saved = { id: Date.now(), status: 'NEW', created_at: new Date().toISOString(), ...quote };
  saveStore((store) => {
    store.quotes.unshift(saved);
    return store;
  });
  return saved;
}

export function updateQuote(id, status) {
  saveStore((store) => {
    const q = store.quotes.find((x) => String(x.id) === String(id));
    if (q) q.status = status;
    return store;
  });
}

export function addOrder(order) {
  const saved = { id: `ORD-${Date.now()}`, order_status: 'PENDING', created_at: new Date().toISOString(), ...order };
  saveStore((store) => {
    store.orders.unshift(saved);
    return store;
  });
  return saved;
}

export function updateOrder(id, status) {
  saveStore((store) => {
    const o = store.orders.find((x) => x.id === id);
    if (o) o.order_status = status;
    return store;
  });
}

export function getWhatsAppLink(settings, customMessage = '') {
  const number = settings.whatsappNumber || DEFAULT_SETTINGS.whatsappNumber;
  const defaultMsg = `Hi ${settings.ownerName || 'EasyBudgetStore'}, I am a clothing retailer/reseller and would like to enquire about wholesale rates and bulk orders.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(customMessage || defaultMsg)}`;
}

export { PLACEHOLDER, slugify };
