import React, { useState, useEffect } from 'react';
import ProductGrid from '../components/ProductGrid';
import { api } from '../services/api';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import siteConfig from '../config/siteConfig';
import { useEnquiry } from '../context/EnquiryContext';

export default function WomenPage() {
  const { openEnquiry } = useEnquiry();
  const [womenJackets, setWomenJackets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await api.getProducts({ category: 'Women' });
        setWomenJackets(res.products);
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
                OUTERWEAR COLLECTION
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-[0.1em] uppercase text-brand-text font-editorial">
                WOMEN'S JACKETS
              </h1>
              <p className="mt-3 text-sm sm:text-base text-brand-muted max-w-2xl">
                Contemporary women's winter jackets tailored with clean lines, thermal insulation, and versatile neutral palettes for boutiques and fashion retailers.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={siteConfig.getWhatsAppLink("Hi EasyBudgetStore, I'd like to enquire about wholesale Women's Jackets availability & rates.")}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 border border-brand-border text-xs font-semibold uppercase tracking-wider text-brand-text rounded hover:bg-brand-surface inline-flex items-center gap-2 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp Catalog</span>
              </a>
              <button
                onClick={() => openEnquiry({ category: 'Women', subcategory: 'Jackets', name: "Women's Jackets" })}
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
          products={womenJackets}
          emptyMessage="No women's wholesale jackets found."
        />

        {/* B2B Guidance note */}
        <div className="mt-16 bg-brand-surface border border-brand-border rounded-lg p-6 sm:p-8">
          <div className="max-w-3xl">
            <span className="text-[10px] font-bold tracking-ultra uppercase text-brand-muted block mb-1">
              RETAILER SPECIFICATION NOTE
            </span>
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-text font-editorial mb-2">
              Sizing &amp; Packing Information for Women's Outerwear
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Our women's jacket models are cut for commercial retail fit across standard size sets (S to XL). For boutique owners and e-commerce sellers requiring detailed measurements, carton packing ratios, or color assortments, please submit an enquiry or chat directly with our team on WhatsApp.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
