import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MessageCircle, SlidersHorizontal } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { useEnquiry } from '../context/EnquiryContext';
import { filterProducts, withPrice } from '../lib/cms';
import ProductGrid from '../components/ProductGrid';
import EmptyState, { SkeletonGrid } from '../components/EmptyState';
import Seo from '../components/Seo';

export default function ShopPage({ gender, featured, title, subtitle }) {
  const { slug } = useParams();
  const { categories, site, store } = useCms();
  const { openEnquiry } = useEnquiry();
  const [sort, setSort] = useState('newest');
  const [availability, setAvailability] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [ready] = useState(true);

  const activeCategory = categories.find((c) => c.slug === slug);

  const products = useMemo(() => {
    return filterProducts({
      category: slug || undefined,
      gender: gender || undefined,
      featured: featured ? 'true' : undefined,
      sort,
      availability: availability || undefined,
      size: size || undefined,
      color: color || undefined,
    }, store);
  }, [slug, gender, featured, sort, availability, size, color, store]);

  const sizes = [...new Set((store.products || []).flatMap((p) => p.sizes || []))];
  const colors = [...new Set((store.products || []).flatMap((p) => p.colors || []))];

  const heading =
    title ||
    activeCategory?.name ||
    (gender ? `${gender}'s Collection` : featured ? 'The Winter Edit' : 'Shop Collection');
  const lead =
    subtitle ||
    activeCategory?.description ||
    'Wholesale clothing and winterwear for retailers, resellers and boutiques.';

  return (
    <div className="bg-white py-12 sm:py-16">
      <Seo title={`${heading} | ${site.brandName}`} description={lead} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-brand-border pb-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-bold tracking-ultra uppercase text-brand-muted block mb-2">
                Wholesale apparel · Delhi
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-[0.1em] uppercase text-brand-text font-editorial">
                {heading}
              </h1>
              <p className="mt-3 text-sm sm:text-base text-brand-muted max-w-2xl">{lead}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={site.getWhatsAppLink(`Hi ${site.ownerName}, I would like the wholesale catalogue for ${heading}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 border border-brand-border text-xs font-semibold uppercase tracking-wider rounded inline-flex items-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" /> WhatsApp
              </a>
              <button
                onClick={() => openEnquiry({ name: heading, category: heading })}
                className="px-4 py-2.5 bg-brand-dark text-white text-xs font-semibold uppercase tracking-wider rounded"
              >
                Bulk enquiry
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-col lg:flex-row lg:items-center gap-3">
            <p className="text-[11px] uppercase tracking-widest text-brand-muted inline-flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5" /> {products.length} styles
            </p>
            <div className="flex flex-wrap gap-2">
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="border border-brand-border rounded px-3 py-2 text-xs">
                <option value="newest">Newest</option>
                <option value="price-asc">Price low to high</option>
                <option value="price-desc">Price high to low</option>
                <option value="name">Name A–Z</option>
              </select>
              <select value={availability} onChange={(e) => setAvailability(e.target.value)} className="border border-brand-border rounded px-3 py-2 text-xs">
                <option value="">Availability</option>
                <option value="in">In stock</option>
                <option value="out">Out of stock</option>
              </select>
              {sizes.length > 0 && (
                <select value={size} onChange={(e) => setSize(e.target.value)} className="border border-brand-border rounded px-3 py-2 text-xs">
                  <option value="">Size</option>
                  {sizes.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              )}
              {colors.length > 0 && (
                <select value={color} onChange={(e) => setColor(e.target.value)} className="border border-brand-border rounded px-3 py-2 text-xs">
                  <option value="">Colour</option>
                  {colors.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              )}
            </div>
          </div>
        </div>

        {!ready ? (
          <SkeletonGrid />
        ) : products.length === 0 ? (
          <EmptyState
            title="No products found"
            message="Try another filter, or send a wholesale enquiry for custom lots."
            actionTo="/contact"
            actionLabel="Contact sales"
          />
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </div>
  );
}
