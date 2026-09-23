import React, { createContext, useContext, useState } from 'react';

const EnquiryContext = createContext(null);

export function EnquiryProvider({ children }) {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  const openEnquiry = (product = null) => {
    setSelectedProduct(product);
    setIsEnquiryOpen(true);
  };

  const closeEnquiry = () => {
    setIsEnquiryOpen(false);
    setSelectedProduct(null);
  };

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast({ visible: false, message: '', type: 'success' });
    }, 4000);
  };

  return (
    <EnquiryContext.Provider
      value={{
        isEnquiryOpen,
        selectedProduct,
        openEnquiry,
        closeEnquiry,
        isSearchOpen,
        openSearch,
        closeSearch,
        toast,
        showToast
      }}
    >
      {children}
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error('useEnquiry must be used within an EnquiryProvider');
  }
  return context;
}
