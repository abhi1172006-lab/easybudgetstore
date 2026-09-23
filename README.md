# EasyBudgetStore — Premium B2B Fashion Wholesale Platform

A modern, high-end white-theme B2B fashion wholesale web application built for **EasyBudgetStore**, operating out of Gandhi Nagar, Delhi — India's major garment and wholesale trading hub.

Designed specifically for B2B buyers:
- Clothing Retailers
- Regional Wholesalers
- Boutiques
- Resellers & Instagram Sellers
- Online Apparel Brands & E-commerce Sellers
- Local Garment Shops

---

## 💎 Brand Design Principles

- **Predominantly White Palette**: `#FFFFFF` canvas, `#F7F7F5` surfaces, `#111111` typography, `#666666` secondary text, `#E8E8E8` borders.
- **Modern Editorial Sans-Serif**: Plus Jakarta Sans typography with generous letter-spacing for uppercase badges (`tracking-widest`).
- **B2B Sourcing Integrity**: Zero fake claims, zero fake statistics, and no fabricated prices. Every item is clearly labelled with **"Get Wholesale Price"** and connected to the B2B Wholesale Enquiry System and WhatsApp.
- **Clean Component Architecture**: Built with React 18, Vite, Tailwind CSS, Lucide Icons, and React Router DOM.

---

## 📁 Central Configuration (`src/config/siteConfig.js`)

All business credentials and contact links are centralized in a single configuration file. Updating this file instantly updates the entire website:

```javascript
export const siteConfig = {
  brandName: "EasyBudgetStore",
  wordmark: "EASYBUDGETSTORE",
  tagline: "Premium Styles. Wholesale Prices.",
  supportingTagline: "Fashion made easier for modern retailers.",
  
  // Location
  location: "Gandhi Nagar, Delhi",
  fullAddress: "Gandhi Nagar Wholesale Garment Hub, Delhi - 110031, India",

  // Central contact
  whatsappNumber: "919876543210", // Primary business WhatsApp (digits only)
  whatsappDisplay: "+91 98765 43210",
  email: "contact@easybudgetstore.com",
  instagramHandle: "@easybudgetstore",
  instagramUrl: "https://instagram.com/easybudgetstore",
  
  businessHours: "Mon - Sat: 10:30 AM - 7:30 PM IST (Market Schedule)"
};
```

---

## 🛍️ Collections & Catalog Structure (`src/data/products.js`)

Current product inventory specialized across three key segments:

1. **MEN**:
   - T-Shirts (Everyday Basics & Round Neck)
   - Sweatshirts (Crewnecks)
   - Hoodies (Heavyweight Fleece)
   - Jackets (Insulated & Quilted Winter Jackets)
2. **WOMEN**:
   - Jackets (Quilted, Puffer & Winter Outerwear)
3. **KIDS**:
   - Jackets (Thermal Insulated Children's Outerwear)

### CMS-Ready Product Schema
```javascript
{
  id: "ebs-m-hoodie-01",
  slug: "mens-hooded-sweatshirt",
  name: "Men's Hooded Sweatshirt",
  category: "Men",
  subcategory: "Hoodies",
  gender: "Men",
  featuredWinter: true,
  isNewDrop: true,
  description: "...",
  images: [...],
  sizes: ["M", "L", "XL", "XXL"],
  colors: ["Charcoal Grey", "Jet Black", "Heather Grey", "Navy"],
  wholesalePrice: null, // "Get Wholesale Price"
  moq: null,
  available: true,
  careInfo: "..."
}
```

---

## 🗺️ Route Architecture

| Route | Page | Purpose |
|---|---|---|
| `/` | `HomePage` | Full 11-section editorial landing experience |
| `/men` | `MenPage` | Filterable Men's collection (T-Shirts, Sweatshirts, Hoodies, Jackets) |
| `/women` | `WomenPage` | Women's Jackets collection & boutique sourcing guidelines |
| `/kids` | `KidsPage` | Kids' Jackets collection with age-set guidance |
| `/winter` | `WinterPage` | The Winter Edit across Men, Women & Kids |
| `/product/:slug` | `ProductDetailPage` | Multi-image gallery, neutral specs, and B2B enquiry form |
| `/about` | `AboutPage` | Authentic Delhi wholesale hub heritage & category breakdown |
| `/contact` | `ContactPage` | Location map, market hours, and direct desk contact |
| `/wholesale` | `WholesalePage` | 4-step B2B sourcing guide & buyer qualification form |
| `*` | `NotFoundPage` | Minimal editorial 404 page |

---

## 🚀 Running & Building

### Development Server
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```
