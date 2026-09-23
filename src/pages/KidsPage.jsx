import React, { useState, useEffect } from 'react';
import ProductGrid from '../components/ProductGrid';
import { api } from '../services/api';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import siteConfig from '../config/siteConfig';
import { useEnquiry } from '../context/EnquiryContext';

export default function KidsPage() {
  const { openEnquiry } = useEnquiry();
  const [kidsJackets, setKidsJackets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await api.getProducts({ category: 'Kids' });
        setKidsJackets(res.products);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-brand-border pb-8 mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-bold tracking-ultra uppercase text-brand-muted block mb-2 font-editorial">
                CHILDREN'S WHOLESALE WEAR
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-[0.1em] uppercase text-brand-text font-editorial">
                KIDS' JACKETS
              </h1>
              <p className="mt-3 text-sm sm:text-base text-brand-muted max-w-2xl">
                Warm, durable, and commercially designed kids' winter jackets. Sized across standard children's age groups for local garment shops and family apparel stores.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={siteConfig.getWhatsAppLink("Hi EasyBudgetStore, I'd like to enquire about wholesale Kids' Jackets availability & rates.")}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 border border-brand-border text-xs font-semibold uppercase tracking-wider text-brand-text rounded hover:bg-brand-surface inline-flex items-center gap-2 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp Catalog</span>
              </a>
              <button
                onClick={() => openEnquiry({ category: 'Kids', subcategory: 'Jackets', name: "Kids' Jackets" })}
                className="px-4 py-2.5 bg-brand-dark hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded inline-flex items-center gap-2 transition-colors"
              >
                <span>Wholesale Enquiry</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <ProductGrid
          products={kidsJackets}
          emptyMessage="No kids' wholesale jackets found."
        />

        {/* Wholesale Advisory Strip */}
        <div className="mt-16 bg-brand-surface border border-brand-border rounded-lg p-6 sm:p-8">
          <div className="max-w-3xl">
            <span className="text-[10px] font-bold tracking-ultra uppercase text-brand-muted block mb-1">
              STORE OWNERS &amp; DISTRIBUTORS
            </span>
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-text font-editorial mb-2">
              Age Sets &amp; Assortment Guidelines
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Kids' jacket orders are organized in balanced age bundles (Age 4-5 through 10-12) to ensure consistent retail display across sizes. Connect directly with our Gandhi Nagar wholesale team for complete packaging breakdowns.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
