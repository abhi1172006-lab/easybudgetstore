import React from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid({ products, title, subtitle, emptyMessage = "No products found." }) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16 border border-dashed border-brand-border rounded-lg bg-brand-surface/40 my-8">
        <p className="text-sm font-medium text-brand-muted tracking-wider uppercase">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div>
      {(title || subtitle) && (
        <div className="mb-8 sm:mb-10 text-center sm:text-left">
          {subtitle && (
            <span className="text-xs font-bold tracking-ultra uppercase text-brand-muted block mb-1 font-editorial">
              {subtitle}
            </span>
          )}
          {title && (
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[0.12em] uppercase text-brand-text font-editorial">
              {title}
            </h2>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
