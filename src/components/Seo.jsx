import { useEffect } from 'react';
import { useCms } from '../context/CmsContext';

export default function Seo({ title, description, path = '' }) {
  const { site } = useCms();

  useEffect(() => {
    const nextTitle = title || site.seoTitle || site.siteName;
    const nextDesc = description || site.seoDescription;
    document.title = nextTitle;
    const setMeta = (selector, attr, value) => {
      if (!value) return;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (selector.includes('property=')) el.setAttribute('property', selector.match(/property="([^"]+)"/)[1]);
        else el.setAttribute('name', selector.match(/name="([^"]+)"/)[1]);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };
    setMeta('meta[name="description"]', 'content', nextDesc);
    setMeta('meta[property="og:title"]', 'content', nextTitle);
    setMeta('meta[property="og:description"]', 'content', nextDesc);
    if (site.logoUrl) {
      let link = document.querySelector("link[rel~='icon']");
      if (link) link.href = site.faviconUrl || site.logoUrl;
    }
    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${window.location.origin}${path || window.location.pathname}`;
  }, [title, description, path, site]);

  return null;
}
