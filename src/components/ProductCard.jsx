import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';
import { useCms } from '../context/CmsContext';
import { SafeImage } from './SafeImage';

export default function ProductCard({ product }) {
  const { openEnquiry } = useEnquiry();
  const { site } = useCms();
  const imageUrl = product.image_url || product.thumbnail || product.images?.[0];
  const sizes = product.sizes || [];
  const href = `/product/${product.slug || product.id}`;
  const categoryLabel = product.categoryName || product.category;

  return (
    <article className="group bg-white border border-brand-border rounded-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-elevated">
      <Link to={href} className="block relative">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-brand-surface">
          <SafeImage src={imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          {(product.isNewDrop || product.isNew) && (
            <span className="absolute top-3 left-3 bg-white/95 border border-brand-border text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded">New</span>
          )}
          <span className="absolute top-3 right-3 bg-brand-dark text-white text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded">
            {categoryLabel}
          </span>
        </div>
      </Link>
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between text-[11px] text-brand-muted tracking-wider uppercase mb-1.5">
          <span>{product.subcategory}</span>
          <span>{product.price_display || `₹${product.wholesalePrice} / pc`}</span>
        </div>
        <Link to={href}>
          <h3 className="text-sm sm:text-base font-bold tracking-[0.06em] font-editorial line-clamp-1">{product.name}</h3>
        </Link>
        {sizes.length > 0 && (
          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
            {sizes.map((s) => (
              <span key={s} className="text-[10px] text-neutral-600 bg-brand-surface border border-brand-border px-1.5 py-0.5 rounded">{s}</span>
            ))}
          </div>
        )}
        <div className="mt-4 pt-3 border-t border-brand-border grid grid-cols-2 gap-2 mt-auto">
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); openEnquiry(product); }}
            className="py-2 bg-brand-dark text-white rounded text-[11px] font-semibold tracking-wider uppercase"
          >
            Enquire
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              window.open(site.getProductWhatsAppLink(product.name, categoryLabel, product.price_display), '_blank');
            }}
            className="py-2 border border-brand-border rounded text-[11px] font-semibold tracking-wider uppercase inline-flex items-center justify-center gap-1"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" /> WhatsApp
          </button>
        </div>
      </div>
    </article>
  );
}
