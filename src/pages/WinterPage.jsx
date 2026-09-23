import React, { useState, useEffect } from 'react';
import ProductGrid from '../components/ProductGrid';
import { api } from '../services/api';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import siteConfig from '../config/siteConfig';
import { useEnquiry } from '../context/EnquiryContext';

export default function WinterPage() {
  const { openEnquiry } = useEnquiry();
  const [filter, setFilter] = useState('all');
  const [winterProducts, setWinterProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await api.getProducts({ featured: 'true' });
        setWinterProducts(res.products);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filtered = filter === 'all'
    ? winterProducts
    : winterProducts.filter((p) => p.category.toLowerCase() === filter.toLowerCase());

  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-brand-border pb-8 mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-bold tracking-ultra uppercase text-brand-muted block mb-2 font-editorial">
                SEASONAL SPECIAL • GANDHI NAGAR
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-[0.1em] uppercase text-brand-text font-editorial">
                WINTER COLLECTION
              </h1>
              <p className="mt-3 text-sm sm:text-base text-brand-muted max-w-2xl">
                Cold-weather essentials selected for retailers looking for trend, versatility and value. Featuring men's hoodies, sweatshirts, and winter jackets across men, women and kids.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={siteConfig.getWhatsAppLink("Hi EasyBudgetStore, I'd like to receive your Winter Collection wholesale catalog.")}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 border border-brand-border text-xs font-semibold uppercase tracking-wider text-brand-text rounded hover:bg-brand-surface inline-flex items-center gap-2 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp Winter Catalog</span>
              </a>
              <button
                onClick={() => openEnquiry({ category: 'Winter', subcategory: 'All', name: 'Winter Collection' })}
                className="px-4 py-2.5 bg-brand-dark hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded inline-flex items-center gap-2 transition-colors"
              >
                <span>Bulk Winter Enquiry</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 mt-8 overflow-x-auto pb-2 scrollbar-none">
            {[
              { label: 'All Winterwear', val: 'all' },
              { label: "Men's Winterwear", val: 'men' },
              { label: "Women's Jackets", val: 'women' },
              { label: "Kids' Jackets", val: 'kids' },
            ].map((tab) => (
              <button
                key={tab.val}
                onClick={() => setFilter(tab.val)}
                className={`px-4 py-2 text-xs font-bold tracking-widest uppercase rounded transition-all whitespace-nowrap ${
                  filter === tab.val
                    ? 'bg-brand-dark text-white shadow-sm'
                    : 'bg-brand-surface border border-brand-border text-brand-muted hover:text-brand-text hover:border-neutral-400'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <ProductGrid
          products={filtered}
          emptyMessage="No winterwear products found."
        />

        {/* Sourcing Banner */}
        <div className="mt-16 p-8 bg-brand-surface border border-brand-border rounded-lg text-center max-w-3xl mx-auto">
          <span className="text-[10px] font-bold tracking-ultra uppercase text-brand-muted block mb-2">
            DELHI WHOLESALE ADVANTAGE
          </span>
          <h3 className="text-base sm:text-lg font-bold tracking-[0.1em] uppercase text-brand-text font-editorial mb-2">
            Stock Your Racks Ahead of Peak Winter Demand
          </h3>
          <p className="text-xs sm:text-sm text-brand-muted mb-6 max-w-xl mx-auto">
            Early wholesale booking allows retailers and resellers to secure preferred color combinations, size curves, and scheduled dispatch directly from Delhi's garment hub.
          </p>
          <button
            onClick={() => openEnquiry(null)}
            className="px-6 py-3 bg-brand-dark hover:bg-black text-white text-xs font-semibold tracking-wider uppercase rounded shadow-sm"
          >
            Get Winter Wholesale Rates
          </button>
        </div>

      </div>
    </div>
  );
}
