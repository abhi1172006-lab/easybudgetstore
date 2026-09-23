import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageCircle, MapPin, Store, Check, Layers } from 'lucide-react';
import siteConfig from '../config/siteConfig';
import { useEnquiry } from '../context/EnquiryContext';

export default function AboutPage() {
  const { openEnquiry } = useEnquiry();

  return (
    <div className="bg-white py-14 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-ultra uppercase text-brand-muted block mb-3 font-editorial">
            ABOUT EASYBUDGETSTORE
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-[0.1em] uppercase text-brand-text font-editorial leading-tight">
            MADE FOR MODERN CLOTHING BUSINESSES.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-brand-muted leading-relaxed font-normal">
            EasyBudgetStore is a Gandhi Nagar, Delhi based clothing business focused on accessible fashion and winterwear for retailers, resellers and growing businesses.
          </p>
          <div className="w-12 h-[2px] bg-brand-dark mx-auto mt-6" />
        </div>

        {/* Editorial Feature Split */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center mb-20">
          <div className="md:col-span-6">
            <div className="rounded-xl overflow-hidden border border-brand-border bg-brand-surface shadow-elevated">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop"
                alt="EasyBudgetStore Delhi Wholesale"
                className="w-full h-auto aspect-[4/5] object-cover object-center"
              />
            </div>
          </div>

          <div className="md:col-span-6 space-y-6 text-sm text-brand-muted leading-relaxed">
            <div>
              <span className="text-[11px] font-bold tracking-ultra uppercase text-brand-dark block mb-2 font-editorial">
                OUR SOURCING PRINCIPLE
              </span>
              <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-[0.08em] text-brand-text font-editorial mb-3">
                Transparent Wholesale Fashion
              </h2>
              <p>
                Operating directly out of Gandhi Nagar, Delhi — one of India's prominent wholesale textile and garment hubs — we focus on eliminating unnecessary friction for independent clothing sellers.
              </p>
            </div>

            <p>
              Whether you are running a regional storefront, stocking a boutique, or retailing clothing through social channels and e-commerce platforms, having consistent access to commercial designs at wholesale rates is essential to building a profitable retail business.
            </p>

            <div className="p-4 bg-brand-surface border border-brand-border rounded-lg space-y-2 text-xs">
              <div className="flex items-center gap-2 text-brand-text font-semibold uppercase tracking-wider">
                <Store className="w-4 h-4 text-brand-dark" />
                <span>Who We Serve:</span>
              </div>
              <p className="text-brand-muted pl-6">
                Clothing Retailers • Wholesalers • Boutiques • Resellers • Instagram Sellers • Online Stores • Local Garment Shops
              </p>
            </div>
          </div>
        </div>

        {/* Categories We Sell */}
        <div className="border-t border-brand-border pt-16 mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold tracking-ultra uppercase text-brand-muted block mb-2 font-editorial">
              CURRENT WHOLESALE LINEUP
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[0.1em] uppercase text-brand-text font-editorial">
              WHAT WE SELL
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-brand-muted">
              Our inventory is currently specialized across three dedicated categories:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* MEN */}
            <div className="p-6 bg-brand-surface border border-brand-border rounded-lg">
              <span className="text-xs font-bold tracking-ultra uppercase text-brand-dark block mb-2">
                01 • MEN
              </span>
              <h3 className="text-base font-bold uppercase tracking-wider text-brand-text mb-4 font-editorial">
                Men's Collection
              </h3>
              <ul className="space-y-2 text-xs text-brand-muted">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-brand-dark" />
                  <span>T-Shirts (Round neck, everyday basics)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-brand-dark" />
                  <span>Sweatshirts (Crewneck pullovers)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-brand-dark" />
                  <span>Hoodies (Heavyweight fleece)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-brand-dark" />
                  <span>Jackets (Insulated &amp; quilted winter wear)</span>
                </li>
              </ul>
              <div className="mt-6 pt-4 border-t border-brand-border">
                <Link to="/men" className="text-xs font-semibold uppercase tracking-wider text-brand-text inline-flex items-center gap-1 hover:underline">
                  <span>View Men's Wholesale</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* WOMEN */}
            <div className="p-6 bg-brand-surface border border-brand-border rounded-lg">
              <span className="text-xs font-bold tracking-ultra uppercase text-brand-dark block mb-2">
                02 • WOMEN
              </span>
              <h3 className="text-base font-bold uppercase tracking-wider text-brand-text mb-4 font-editorial">
                Women's Collection
              </h3>
              <ul className="space-y-2 text-xs text-brand-muted">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-brand-dark" />
                  <span>Jackets (Quilted, parka, &amp; winter outerwear)</span>
                </li>
                <li className="text-[11px] text-neutral-400 pl-5 pt-1">
                  Tailored commercial fit designed for boutiques and specialty apparel stores.
                </li>
              </ul>
              <div className="mt-12 pt-4 border-t border-brand-border">
                <Link to="/women" className="text-xs font-semibold uppercase tracking-wider text-brand-text inline-flex items-center gap-1 hover:underline">
                  <span>View Women's Jackets</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* KIDS */}
            <div className="p-6 bg-brand-surface border border-brand-border rounded-lg">
              <span className="text-xs font-bold tracking-ultra uppercase text-brand-dark block mb-2">
                03 • KIDS
              </span>
              <h3 className="text-base font-bold uppercase tracking-wider text-brand-text mb-4 font-editorial">
                Kids' Collection
              </h3>
              <ul className="space-y-2 text-xs text-brand-muted">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-brand-dark" />
                  <span>Jackets (Insulated &amp; hooded children's outerwear)</span>
                </li>
                <li className="text-[11px] text-neutral-400 pl-5 pt-1">
                  Balanced age-group size runs (Age 4 through 12) for family retail counters.
                </li>
              </ul>
              <div className="mt-12 pt-4 border-t border-brand-border">
                <Link to="/kids" className="text-xs font-semibold uppercase tracking-wider text-brand-text inline-flex items-center gap-1 hover:underline">
                  <span>View Kids' Jackets</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Location & Sourcing Commitment */}
        <div className="bg-brand-surface p-8 sm:p-12 rounded-xl border border-brand-border text-center">
          <span className="text-xs font-bold tracking-ultra uppercase text-brand-muted block mb-2 font-editorial">
            DIRECT TRADE
          </span>
          <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-[0.1em] text-brand-text font-editorial mb-3">
            GANDHI NAGAR WHOLESALE HUB • DELHI
          </h3>
          <p className="text-xs sm:text-sm text-brand-muted max-w-xl mx-auto mb-8 leading-relaxed">
            We operate with straightforward business principles: genuine product specifications, clear sizing, and direct communication over WhatsApp or phone for order planning.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openEnquiry(null)}
              className="w-full sm:w-auto px-8 py-3.5 bg-brand-dark hover:bg-black text-white text-xs font-bold tracking-[0.18em] uppercase rounded shadow-sm"
            >
              Start Wholesale Partnership
            </button>
            <a
              href={siteConfig.getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 border border-brand-border text-brand-text text-xs font-bold tracking-[0.18em] uppercase rounded hover:bg-white inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Chat with Team</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
