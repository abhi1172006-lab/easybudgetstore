/**
 * Default business details. Live values come from CMS settings via useCms().
 */
export const siteConfig = {
  brandName: 'EasyBudgetStore',
  wordmark: 'EASYBUDGETSTORE',
  tagline: 'WHOLESALE, AT YOUR DOORSTEP',
  subtitle: 'Manufacturer & Wholesaler of T-shirts, jackets, winterwear and more.',
  ownerName: 'Abhi Gupta',
  phone: '+91 9289981449',
  whatsappNumber: '919289981449',
  whatsappDisplay: '+91 92899 81449',
  email: 'contact@easybudgetstore.com',
  address: {
    full: 'IX/502, Shop No. 1, Ram Lakha Mal Market, Near Tikona Park, Subhash Road, Gandhi Nagar, Delhi-110031',
  },
  fullAddress: 'IX/502, Shop No. 1, Ram Lakha Mal Market, Near Tikona Park, Subhash Road, Gandhi Nagar, Delhi-110031',
  logoUrl: '/logo.png',
  googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Ram+Lakha+Mal+Market+Gandhi+Nagar+Delhi+110031&z=16&output=embed',
  businessHours: 'Mon - Sat: 10:30 AM - 7:30 PM IST (Sunday Closed)',
  getWhatsAppLink: (customMessage = '') => {
    const defaultMsg = `Hi Abhi ji (EasyBudgetStore), I am a clothing retailer/reseller and would like to enquire about wholesale rates and bulk orders.`;
    return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(customMessage || defaultMsg)}`;
  },
  getProductWhatsAppLink: (productName, category, price = '') => {
    const priceStr = price ? ` (Rate: ${price})` : '';
    const msg = `Hi Abhi ji, I want to place a wholesale order for: ${productName}${priceStr} [${category}]. Please share current stock availability and size curves.`;
    return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  },
};

export default siteConfig;
