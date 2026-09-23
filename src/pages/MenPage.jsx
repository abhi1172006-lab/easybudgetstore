import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { api } from '../services/api';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import siteConfig from '../config/siteConfig';
import { useEnquiry } from '../context/EnquiryContext';

export default function MenPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { openEnquiry } = useEnquiry();
  const [menProducts, setMenProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const subcategoryParam = searchParams.get('category'); // e.g. "hoodies", "jackets", "t-shirts", "sweatshirts"

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await api.getProducts({ category: 'Men' });
        setMenProducts(res.products);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filterTabs = [
    { label: 'All Men', value: 'all' },
    { label: 'T-Shirts', value: 't-shirts' },
    { label: 'Sweatshirts', value: 'sweatshirts' },
    { label: 'Hoodies', value: 'hoodies' },
    { label: 'Jackets', value: 'jackets' },
  ];

  const currentTab = subcategoryParam || 'all';

  const filteredProducts = currentTab === 'all'
    ? menProducts
    : menProducts.filter((p) => p.subcategory && p.subcategory.toLowerCase().replace(/\s+/g, '-') === currentTab.toLowerCase());

  const handleTabChange = (val) => {
    if (val === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: val });
    }
  };

  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="border-b border-brand-border pb-8 mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-bold tracking-ultra uppercase text-brand-muted block mb-2 font-editorial">
                WHOLESALE APPAREL • DELHI
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-[0.1em] uppercase text-brand-text font-editorial">
                MEN'S COLLECTION
              </h1>
              <p className="mt-3 text-sm sm:text-base text-brand-muted max-w-2xl">
                Commercial wholesale styles across T-shirts, crewneck sweatshirts, heavyweight hoodies, and insulated winter jackets. Ready for retailer orders.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={siteConfig.getWhatsAppLink("Hi EasyBudgetStore, I'd like to enquire about your wholesale Men's Collection catalog.")}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 border border-brand-border text-xs font-semibold uppercase tracking-wider text-brand-text rounded hover:bg-brand-surface inline-flex items-center gap-2 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp Catalog</span>
              </a>
              <button
                onClick={() => openEnquiry({ category: 'Men', subcategory: 'Collection', name: "Men's Wholesale Range" })}
                className="px-4 py-2.5 bg-brand-dark hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded inline-flex items-center gap-2 transition-colors"
              >
                <span>Bulk Enquiry</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Subcategory Filter Tabs */}
          <div className="flex items-center gap-2 mt-8 overflow-x-auto pb-2 scrollbar-none">
            {filterTabs.map((tab) => {
              const active = currentTab.toLowerCase() === tab.value.toLowerCase();
              return (
                <button
                  key={tab.value}
                  onClick={() => handleTabChange(tab.value)}
                  className={`px-4 py-2 text-xs font-bold tracking-widest uppercase rounded transition-all whitespace-nowrap ${
                    active
                      ? 'bg-brand-dark text-white shadow-sm'
                      : 'bg-brand-surface border border-brand-border text-brand-muted hover:text-brand-text hover:border-neutral-400'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        <ProductGrid
          products={filteredProducts}
          emptyMessage="No wholesale products found matching this filter."
        />

        {/* Wholesale Advisory Strip */}
        <div className="mt-16 p-6 sm:p-8 bg-brand-surface border border-brand-border rounded-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-text font-editorial mb-1">
              Looking for customized assortment or carton breakdown?
            </h3>
            <p className="text-xs text-brand-muted">
              Connect directly with our Gandhi Nagar wholesale team to confirm bundle combinations, delivery lead times, and current production runs.
            </p>
          </div>
          <button
            onClick={() => openEnquiry(null)}
            className="flex-shrink-0 px-5 py-2.5 bg-brand-dark hover:bg-black text-white text-xs font-bold tracking-wider uppercase rounded"
          >
            Request Sourcing Sheet
          </button>
        </div>

      </div>
    </div>
  );
}
