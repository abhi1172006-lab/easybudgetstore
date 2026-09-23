import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, MessageCircle, ArrowUpRight } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';
import { useCms } from '../context/CmsContext';
import { filterProducts } from '../lib/cms';
import TrustStrip from '../components/TrustStrip';
import CategoryGrid from '../components/CategoryGrid';
import ProductGrid from '../components/ProductGrid';
import BusinessSection from '../components/BusinessSection';
import WhyEasyBudgetStore from '../components/WhyEasyBudgetStore';
import GandhiNagarSection from '../components/GandhiNagarSection';
import InstagramSection from '../components/InstagramSection';
import EnquiryForm from '../components/EnquiryForm';
import { SafeImage } from '../components/SafeImage';
import Seo from '../components/Seo';
import { SkeletonGrid } from '../components/EmptyState';

export default function HomePage() {
  const { openEnquiry } = useEnquiry();
  const { site, homepage, store } = useCms();
  const hero = homepage?.hero || {};
  const featured = homepage?.featuredSection || {};
  const banner = (homepage?.banners || []).find((b) => b.enabled);

  const winterEditProducts = filterProducts(
    featured.mode === 'new' ? { isNew: true } : { featured: 'true' },
    store
  ).slice(0, 8);

  const scrollToCategories = () => {
    document.getElementById('collection-categories')?.scrollIntoView({ behavior: 'smooth' });
  };

  const secondaryHref = hero.secondaryCtaUrl === 'whatsapp' ? site.getWhatsAppLink() : (hero.secondaryCtaUrl || '/contact');

  return (
    <div className="bg-white">
      <Seo title={site.seoTitle} description={site.seoDescription} path="/" />
      {hero.enabled !== false && (
        <section className="relative min-h-[78vh] flex items-center bg-white border-b border-brand-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-brand-dark" />
                  <span className="text-xs font-bold tracking-ultra uppercase text-brand-muted">
                    {hero.eyebrow}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[0.08em] uppercase text-brand-text leading-[1.1] font-editorial">
                  {hero.heading}
                </h1>
                <p className="mt-6 text-base sm:text-lg text-brand-muted max-w-xl leading-relaxed">
                  {hero.subtitle}
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  {hero.primaryCtaUrl?.startsWith('/') ? (
                    <Link
                      to={hero.primaryCtaUrl}
                      className="px-7 py-3.5 bg-brand-dark hover:bg-black text-white text-xs font-bold tracking-[0.18em] uppercase rounded flex items-center justify-center gap-2"
                    >
                      {hero.primaryCta} <ArrowDown className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <button
                      onClick={scrollToCategories}
                      className="px-7 py-3.5 bg-brand-dark hover:bg-black text-white text-xs font-bold tracking-[0.18em] uppercase rounded flex items-center justify-center gap-2"
                    >
                      {hero.primaryCta || 'Shop Collection'} <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <a
                    href={secondaryHref}
                    target={secondaryHref.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="px-7 py-3.5 border border-brand-border text-brand-text text-xs font-bold tracking-[0.18em] uppercase rounded flex items-center justify-center gap-2 hover:bg-brand-surface"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    {hero.secondaryCta}
                  </a>
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="relative rounded-xl overflow-hidden border border-brand-border bg-brand-surface shadow-elevated group">
                  <SafeImage
                    src={hero.image}
                    alt={hero.imageCaption || site.brandName}
                    className="w-full h-auto aspect-[4/5] object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-5 inset-x-5 text-white flex items-end justify-between">
                    <div>
                      <span className="text-[10px] tracking-ultra uppercase text-neutral-300 font-bold block mb-1">
                        {site.tagline}
                      </span>
                      <span className="text-base font-bold tracking-wider uppercase font-editorial">
                        {hero.imageCaption}
                      </span>
                    </div>
                    <button onClick={() => openEnquiry(null)} className="p-2.5 bg-white text-brand-dark rounded-full" aria-label="Enquire">
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <TrustStrip />
      {homepage?.categoriesSection?.enabled !== false && <CategoryGrid />}

      {featured.enabled !== false && (
        <section className="py-16 sm:py-24 bg-brand-surface/40 border-y border-brand-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="text-xs font-bold tracking-ultra uppercase text-brand-muted block mb-2">Curated showcase</span>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-[0.12em] uppercase font-editorial">{featured.title}</h2>
                <p className="mt-3 text-sm text-brand-muted max-w-xl">{featured.subtitle}</p>
              </div>
              <Link to="/shop" className="mt-6 md:mt-0 inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.18em] uppercase border-b border-brand-text pb-1">
                View all products <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            {winterEditProducts.length ? <ProductGrid products={winterEditProducts} /> : <SkeletonGrid />}
          </div>
        </section>
      )}

      {banner && (
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-xl border border-brand-border bg-brand-surface p-8 sm:p-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <h2 className="text-xl font-extrabold uppercase tracking-widest font-editorial">{banner.title}</h2>
                <p className="text-sm text-brand-muted mt-2">{banner.text}</p>
              </div>
              <Link to={banner.link || '/contact'} className="px-5 py-2.5 bg-brand-dark text-white text-xs font-bold uppercase tracking-wider rounded">
                {banner.cta}
              </Link>
            </div>
          </div>
        </section>
      )}

      <BusinessSection />
      {homepage?.whyChooseUs?.enabled !== false && <WhyEasyBudgetStore />}
      {homepage?.about?.enabled !== false && <GandhiNagarSection />}

      <section className="py-20 sm:py-28 bg-white border-t border-brand-border" id="wholesale-enquiry">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <EnquiryForm />
        </div>
      </section>
      <InstagramSection />
    </div>
  );
}
