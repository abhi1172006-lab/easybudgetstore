import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Mail, MapPin } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { SafeImage } from './SafeImage';

export default function Footer() {
  const { site, categories } = useCms();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-brand-border pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-brand-border">
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block mb-4">
              <SafeImage src={site.logoUrl || '/logo.png'} alt={site.brandName} className="h-16 w-auto max-w-[240px] object-contain object-left" />
            </Link>
            <p className="text-xs font-semibold text-brand-text uppercase tracking-wider">{site.tagline}</p>
            <p className="mt-3 text-sm text-brand-muted leading-relaxed max-w-sm">{site.footerText}</p>
            <div className="mt-4 p-3 bg-brand-surface rounded-md border border-brand-border text-xs">
              <p className="font-bold text-brand-text">{site.ownerName}</p>
              <p className="text-brand-muted mt-1">{site.address?.full || site.fullAddress}</p>
              <p className="mt-1 font-semibold">{site.phone}</p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold tracking-ultra uppercase mb-4">Categories</h4>
            <ul className="space-y-2.5 text-xs">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link to={`/shop/${c.slug}`} className="text-brand-muted hover:text-brand-text uppercase tracking-wider">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold tracking-ultra uppercase mb-4">Quick links</h4>
            <ul className="space-y-2.5 text-xs uppercase tracking-wider">
              <li><Link to="/" className="text-brand-muted hover:text-brand-text">Home</Link></li>
              <li><Link to="/shop" className="text-brand-muted hover:text-brand-text">Shop</Link></li>
              <li><Link to="/about" className="text-brand-muted hover:text-brand-text">About</Link></li>
              <li><Link to="/contact" className="text-brand-muted hover:text-brand-text">Contact</Link></li>
              <li><Link to="/wholesale" className="text-brand-muted hover:text-brand-text">Wholesale</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold tracking-ultra uppercase mb-4">Contact</h4>
            <div className="space-y-3 text-xs text-brand-muted">
              <p className="flex gap-2"><MapPin className="w-4 h-4 shrink-0" />{site.fullAddress || site.address?.full}</p>
              <p className="flex gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <a href={site.getWhatsAppLink()} target="_blank" rel="noopener noreferrer">WhatsApp: {site.whatsappDisplay}</a>
              </p>
              <p className="flex gap-2"><Mail className="w-4 h-4 shrink-0" /><a href={`mailto:${site.email}`}>{site.email}</a></p>
              {site.instagram && <p><a href={site.instagram} target="_blank" rel="noreferrer">Instagram</a></p>}
              {site.facebook && <p><a href={site.facebook} target="_blank" rel="noreferrer">Facebook</a></p>}
            </div>
          </div>
        </div>
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-muted gap-3">
          <p>{site.copyright?.replace('2026', String(year)) || `© ${year} ${site.brandName}`}</p>
          <p>Gandhi Nagar, Delhi</p>
        </div>
      </div>
    </footer>
  );
}
