import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';
import { useCms } from '../context/CmsContext';
import { filterProducts } from '../lib/cms';
import { SafeImage } from './SafeImage';

export default function SearchModal() {
  const { isSearchOpen, closeSearch } = useEnquiry();
  const { categories, store } = useCms();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSearchOpen) setQuery('');
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isSearchOpen) closeSearch();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  const matchingProducts = useMemo(
    () => (query.trim() ? filterProducts({ search: query.trim() }, store) : []),
    [query, store]
  );
  const matchingCategories = useMemo(() => {
    if (!query.trim()) return [];
    const t = query.toLowerCase();
    return categories.filter((c) => c.name.toLowerCase().includes(t) || c.slug.includes(t));
  }, [query, categories]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto" onClick={closeSearch}>
      <div className="relative bg-white rounded-xl shadow-modal max-w-2xl w-full p-6" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Search products">
        <div className="relative flex items-center border-b border-brand-border pb-4">
          <Search className="w-5 h-5 text-brand-muted mr-3" />
          <input
            autoFocus
            type="search"
            placeholder="Search by name, SKU, category or tag"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-base focus:outline-none placeholder:text-neutral-400"
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} className="p-1 mr-2" aria-label="Clear search"><X className="w-4 h-4" /></button>
          )}
          <button type="button" onClick={closeSearch} className="text-xs font-semibold uppercase tracking-wider px-2 py-1 bg-brand-surface rounded border border-brand-border">Esc</button>
        </div>

        {!query.trim() && (
          <div className="py-6">
            <span className="text-[11px] font-bold tracking-wider uppercase text-brand-muted block mb-3">Popular</span>
            <div className="flex flex-wrap gap-2">
              {['Hoodie', 'Jacket', 'Sweatshirt', 'T-Shirt'].map((term) => (
                <button key={term} type="button" onClick={() => setQuery(term)} className="text-xs font-semibold uppercase px-3 py-1.5 rounded-full border border-brand-border bg-brand-surface">{term}</button>
              ))}
            </div>
          </div>
        )}

        {query.trim() && (
          <div className="py-4 max-h-[60vh] overflow-y-auto space-y-6">
            {matchingCategories.length > 0 && (
              <div>
                <span className="text-[11px] font-bold uppercase text-brand-muted block mb-2">Categories</span>
                {matchingCategories.map((cat) => (
                  <button key={cat.id} type="button" onClick={() => { closeSearch(); navigate(`/shop/${cat.slug}`); }} className="w-full text-left p-3 rounded border border-brand-border mb-2 flex justify-between">
                    <span className="text-xs font-bold uppercase">{cat.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>
            )}
            <div>
              <span className="text-[11px] font-bold uppercase text-brand-muted block mb-2">Products ({matchingProducts.length})</span>
              {matchingProducts.length === 0 && matchingCategories.length === 0 ? (
                <p className="text-sm text-brand-muted py-6 text-center">No results for “{query}”.</p>
              ) : matchingProducts.map((p) => (
                <button key={p.id} type="button" onClick={() => { closeSearch(); navigate(`/product/${p.slug}`); }} className="w-full text-left p-2.5 rounded border border-brand-border mb-2 flex items-center gap-3">
                  <SafeImage src={p.image_url} alt="" className="w-12 h-14 object-cover rounded" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase text-brand-muted">{p.sku} · {p.categoryName}</p>
                    <h4 className="text-sm font-bold truncate">{p.name}</h4>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
