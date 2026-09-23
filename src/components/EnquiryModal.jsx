import React from 'react';
import { X } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';
import EnquiryForm from './EnquiryForm';

export default function EnquiryModal() {
  const { isEnquiryOpen, closeEnquiry, selectedProduct } = useEnquiry();

  if (!isEnquiryOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in"
      onClick={closeEnquiry}
    >
      <div
        className="relative bg-white rounded-xl shadow-modal max-w-2xl w-full my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          onClick={closeEnquiry}
          className="absolute top-4 right-4 p-2 text-brand-muted hover:text-brand-text bg-brand-surface rounded-full transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        <div className="p-1 sm:p-2">
          {selectedProduct && (
            <div className="bg-brand-surface/70 border-b border-brand-border p-4 sm:p-6 rounded-t-xl flex items-center gap-4">
              <img
                src={selectedProduct.images[0]}
                alt={selectedProduct.name}
                className="w-16 h-20 object-cover rounded border border-brand-border bg-white"
              />
              <div>
                <span className="text-[10px] font-bold tracking-ultra uppercase text-brand-muted block">
                  SELECTED FOR WHOLESALE PRICING
                </span>
                <h4 className="text-base font-bold text-brand-text font-editorial">
                  {selectedProduct.name}
                </h4>
                <p className="text-xs text-brand-muted">
                  Category: {selectedProduct.category} • {selectedProduct.subcategory}
                </p>
              </div>
            </div>
          )}

          <EnquiryForm prefilledProduct={selectedProduct} onSuccess={closeEnquiry} />
        </div>
      </div>
    </div>
  );
}
