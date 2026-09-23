import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Search, Menu, X, MessageCircle, ChevronDown } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';
import { useCms } from '../context/CmsContext';
import { SafeImage } from './SafeImage';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [catsOpen, setCatsOpen] = useState(false);
  const { openSearch, openEnquiry } = useEnquiry();
  const { site, categories } = useCms();
  const location = useLocation();
  const drawerRef = useRef(null);

  const waNumber = site.whatsappNumber || site.settings?.whatsappNumber || '919289981449';
  const waLink = `https://wa.me/${String(waNumber).replace(/[^0-9]/g, '')}`;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setCatsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { setMobileMenuOpen(false); setCatsOpen(false); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const navFontSize = Number(site.navFontSize) || 14;

  const logoHDesktop = Number(site.logoHeightDesktop) || 80;
  const logoHMobile = Number(site.logoHeightMobile) || 50;
  const headerHDesktop = Number(site.headerHeightDesktop) || 110;
  const headerHMobile = Number(site.headerHeightMobile) || 80;

  // On scroll compact dimensions
  const scrolledLogoHDesktop = Math.round(logoHDesktop * 0.72);
  const scrolledLogoHMobile = Math.round(logoHMobile * 0.85);
  const scrolledHeaderHDesktop = Math.max(70, Math.round(headerHDesktop * 0.75));
  const scrolledHeaderHMobile = Math.max(60, Math.round(headerHMobile * 0.88));

  const navClass = ({ isActive }) =>
    `relative group inline-flex items-center py-2.5 px-3.5 xl:px-4 uppercase tracking-[0.12em] font-extrabold whitespace-nowrap transition-colors duration-200 ${
      isActive ? 'text-brand-dark' : 'text-neutral-600 hover:text-black'
    }`;

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full bg-white border-b border-brand-border transition-all duration-300 ${
          isScrolled ? 'shadow-md' : 'shadow-none'
        }`}
        style={{
          height: 'var(--header-bar-h)',
        }}
      >
        <style>{`
          :root {
            --header-bar-h: ${isScrolled ? scrolledHeaderHMobile : headerHMobile}px;
            --header-logo-h: ${isScrolled ? scrolledLogoHMobile : logoHMobile}px;
            --header-nav-size: ${navFontSize}px;
          }
          @media (min-width: 1024px) {
            :root {
              --header-bar-h: ${isScrolled ? scrolledHeaderHDesktop : headerHDesktop}px;
              --header-logo-h: ${isScrolled ? scrolledLogoHDesktop : logoHDesktop}px;
              --header-nav-size: ${navFontSize}px;
            }
          }
        `}</style>
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 h-full flex items-center justify-between gap-6">

          {/* LOGO */}
          <Link
            to="/"
            className="group flex items-center shrink-0 focus:outline-none transition-transform duration-300 hover:scale-[1.02]"
            aria-label={`${site.brandName || 'EasyBudgetStore'} — Home`}
          >
            <SafeImage
              src={site.logoUrl || '/logo.png'}
              alt={site.brandName || 'EasyBudgetStore'}
              style={{ height: 'var(--header-logo-h)' }}
              className="w-auto object-contain object-left transition-all duration-300"
            />
          </Link>

          {/* DESKTOP NAV - Larger text & animated underline */}
          <nav className="hidden lg:flex items-center flex-1 justify-center gap-1 xl:gap-2" aria-label="Main navigation">
            {[
              { to: '/', name: 'Home', end: true },
              { to: '/shop', name: 'Shop All' },
            ].map((link) => (
              <NavLink key={link.to} to={link.to} end={link.end} className={navClass} style={{ fontSize: 'var(--header-nav-size)' }}>
                {({ isActive }) => (
                  <>
                    <span className="relative z-10 transition-transform duration-200 group-hover:-translate-y-0.5">{link.name}</span>
                    <span
                      className={`absolute bottom-0 left-3 right-3 h-[2.5px] bg-brand-dark rounded-full transition-transform duration-300 ease-out origin-center ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}

            {/* Categories Dropdown with smooth hover & click animations */}
            <div className="relative group">
              <button
                type="button"
                onClick={() => setCatsOpen((v) => !v)}
                aria-expanded={catsOpen}
                className="relative inline-flex items-center gap-1.5 py-2.5 px-3.5 xl:px-4 uppercase tracking-[0.12em] font-extrabold text-neutral-600 hover:text-black whitespace-nowrap transition-colors duration-200"
                style={{ fontSize: 'var(--header-nav-size)' }}
              >
                <span className="relative z-10 transition-transform duration-200 group-hover:-translate-y-0.5">Categories</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${catsOpen ? 'rotate-180 text-brand-dark' : 'group-hover:translate-y-0.5'}`} />
                <span
                  className={`absolute bottom-0 left-3 right-3 h-[2.5px] bg-brand-dark rounded-full transition-transform duration-300 ease-out origin-center ${
                    catsOpen ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </button>
              {catsOpen && (
                <div className="absolute left-0 top-full mt-2 w-64 bg-white border border-brand-border rounded-xl shadow-2xl py-2.5 z-50 animate-fade-in origin-top">
                  {visibleCategories.map((c) => (
                    <Link
                      key={c.id}
                      to={`/shop/${c.slug}`}
                      className="group/item flex items-center justify-between px-5 py-2.5 text-xs uppercase tracking-wider font-bold text-neutral-600 hover:text-brand-dark hover:bg-neutral-50 transition-all duration-200"
                    >
                      <span className="transition-transform duration-200 group-hover/item:translate-x-1.5">{c.name}</span>
                      <span className="opacity-0 group-hover/item:opacity-100 text-brand-dark text-xs transition-opacity duration-200">→</span>
                    </Link>
                  ))}
                  <div className="border-t border-brand-border mt-2 pt-2">
                    <Link
                      to="/shop"
                      className="group/item flex items-center justify-between px-5 py-2.5 text-xs uppercase tracking-wider font-extrabold text-brand-dark hover:bg-neutral-50 transition-colors"
                    >
                      <span>View All Collections</span>
                      <span className="transition-transform duration-200 group-hover/item:translate-x-1.5">→</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {[
              { to: '/winter', name: 'Winter' },
              { to: '/wholesale', name: 'Wholesale' },
              { to: '/about', name: 'About' },
            ].map((link) => (
              <NavLink key={link.to} to={link.to} className={navClass} style={{ fontSize: 'var(--header-nav-size)' }}>
                {({ isActive }) => (
                  <>
                    <span className="relative z-10 transition-transform duration-200 group-hover:-translate-y-0.5">{link.name}</span>
                    <span
                      className={`absolute bottom-0 left-3 right-3 h-[2.5px] bg-brand-dark rounded-full transition-transform duration-300 ease-out origin-center ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* DESKTOP ACTIONS - Bigger buttons with premium lift & shine animations */}
          <div className="hidden lg:flex items-center shrink-0 gap-3 xl:gap-4">
            <button
              onClick={openSearch}
              aria-label="Search"
              className="group p-3 rounded-full text-neutral-600 hover:text-black hover:bg-neutral-100 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Search className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
            </button>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-3 text-xs font-extrabold tracking-[0.14em] uppercase border-2 border-emerald-500/40 text-emerald-800 bg-emerald-50/60 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => openEnquiry(null)}
              className="group relative inline-flex items-center justify-center px-6 py-3 bg-brand-dark text-white text-xs font-extrabold tracking-[0.18em] uppercase rounded-lg hover:bg-black transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap overflow-hidden"
            >
              <span className="relative z-10">Bulk Enquiry</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
            </button>
          </div>

          {/* MOBILE ACTIONS */}
          <div className="flex items-center gap-1 lg:hidden shrink-0">
            <button onClick={openSearch} aria-label="Search" className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-brand-text rounded hover:bg-brand-surface transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-brand-text rounded hover:bg-brand-surface transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-label="Close menu" onClick={() => setMobileMenuOpen(false)} />
          <div ref={drawerRef} className="absolute right-0 inset-y-0 w-[min(100%,340px)] sm:w-[400px] bg-white shadow-2xl flex flex-col overflow-y-auto">

            <div className="flex items-center justify-between px-6 py-5 border-b border-brand-border shrink-0">
              <SafeImage src={site.logoUrl || '/logo.png'} alt="" style={{ height: `${Math.min(logoHMobile, 56)}px` }} className="w-auto object-contain" />
              <button onClick={() => setMobileMenuOpen(false)} aria-label="Close" className="p-2.5 bg-brand-surface rounded-full text-brand-dark hover:bg-neutral-200 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-0.5">
              {[
                { name: 'Home', to: '/' },
                { name: 'Shop All', to: '/shop' },
                { name: 'Winter Collection', to: '/winter' },
                { name: 'Wholesale Info', to: '/wholesale' },
                { name: 'About Us', to: '/about' },
              ].map((l) => (
                <Link key={l.to} to={l.to} className="flex items-center py-3.5 px-4 text-sm font-extrabold uppercase tracking-widest text-brand-text hover:bg-brand-surface rounded-lg transition-colors">
                  {l.name}
                </Link>
              ))}

              {visibleCategories.length > 0 && (
                <div className="pt-5 mt-4 border-t border-brand-border">
                  <p className="px-4 mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted">Categories</p>
                  {visibleCategories.map((c) => (
                    <Link key={c.id} to={`/shop/${c.slug}`} className="block py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-brand-muted hover:text-brand-text hover:bg-brand-surface rounded-lg transition-colors">
                      {c.name}
                    </Link>
                  ))}
                </div>
              )}
            </nav>

            <div className="shrink-0 px-4 py-5 space-y-3 border-t border-brand-border">
              <button
                onClick={() => { setMobileMenuOpen(false); openEnquiry(null); }}
                className="w-full py-4 bg-brand-dark text-white text-xs font-bold uppercase tracking-[0.2em] rounded-lg hover:bg-black transition-colors"
              >
                Wholesale Enquiry
              </button>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 border border-brand-border text-brand-text text-xs font-bold uppercase tracking-[0.15em] rounded-lg flex items-center justify-center gap-2 hover:bg-brand-surface transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
