import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  getStore,
  subscribeCms,
  getWhatsAppLink,
  DEFAULT_SETTINGS,
} from '../lib/cms';

const CmsContext = createContext(null);

export function CmsProvider({ children }) {
  const [store, setStore] = useState(() => getStore());

  useEffect(() => {
    const unsub = subscribeCms(setStore);
    const refresh = () => setStore(getStore());
    window.addEventListener('ebs-cms-updated', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      unsub();
      window.removeEventListener('ebs-cms-updated', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  const site = useMemo(() => {
    const s = { ...DEFAULT_SETTINGS, ...(store.settings || {}) };
    return {
      ...s,
      brandName: s.siteName,
      fullAddress: s.address,
      address: { full: s.address },
      getWhatsAppLink: (msg) => getWhatsAppLink(s, msg),
      getProductWhatsAppLink: (name, category, price = '') => {
        const priceStr = price ? ` (Rate: ${price})` : '';
        return getWhatsAppLink(
          s,
          `Hi ${s.ownerName || 'EasyBudgetStore'}, I want to place a wholesale order for: ${name}${priceStr} [${category}]. Please share current stock availability and size curves.`
        );
      },
    };
  }, [store.settings]);

  const visibleCategories = useMemo(
    () => [...(store.categories || [])].filter((c) => c.visible !== false).sort((a, b) => a.order - b.order),
    [store.categories]
  );

  const value = {
    store,
    site,
    homepage: store.homepage,
    categories: visibleCategories,
    allCategories: store.categories || [],
    products: store.products || [],
    refresh: () => setStore(getStore()),
  };

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}

export function useCms() {
  const ctx = useContext(CmsContext);
  if (!ctx) throw new Error('useCms must be used within CmsProvider');
  return ctx;
}
