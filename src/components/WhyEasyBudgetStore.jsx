import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';
import { useCms } from '../context/CmsContext';
import { SafeImage } from './SafeImage';

export default function WhyEasyBudgetStore() {
  const { openEnquiry } = useEnquiry();
  const { homepage } = useCms();
  const why = homepage?.whyChooseUs || {};
  const points = (why.items || []).map((item) => ({
    num: item.icon,
    title: item.heading,
    desc: item.description,
  }));

  return (
    <section className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT: Large Fashion Editorial Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-lg overflow-hidden border border-brand-border bg-brand-surface shadow-elevated">
              <SafeImage
                src={why.image}
                alt="EasyBudgetStore winterwear"
                className="w-full h-auto aspect-[4/5] object-cover object-center"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded border border-brand-border flex items-center justify-between">
                <div>
                  <span className="text-[10px] tracking-ultra uppercase text-brand-muted font-bold block">
                    Gandhi Nagar, Delhi
                  </span>
                  <span className="text-xs font-bold tracking-wider uppercase text-brand-text">
                    Curated Wholesale Winterwear
                  </span>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-widest bg-brand-surface px-2 py-1 rounded border border-brand-border">
                  B2B Supply
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Text & 4 Points */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs font-bold tracking-ultra uppercase text-brand-muted block mb-2 font-editorial">
              WHOLESALE ADVANTAGE
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-[0.12em] uppercase text-brand-text mb-6 font-editorial">
              {why.heading || 'Why EasyBudgetStore?'}
            </h2>
            <p className="text-sm sm:text-base text-brand-muted mb-8 leading-relaxed">
              {why.description}
            </p>

            {/* 4 Points */}
            <div className="space-y-6">
              {points.map((pt) => (
                <div key={pt.num} className="flex items-start space-x-4 pb-5 border-b border-brand-border last:border-0 last:pb-0">
                  <span className="text-xs font-mono font-bold text-brand-muted bg-brand-surface px-2 py-1 rounded border border-brand-border flex-shrink-0 mt-0.5">
                    {pt.num}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold tracking-[0.14em] uppercase text-brand-text mb-1 font-editorial">
                      {pt.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-normal">
                      {pt.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Action */}
            <div className="mt-8 pt-4">
              <button
                onClick={() => openEnquiry(null)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-dark hover:bg-black text-white rounded text-xs font-semibold tracking-[0.16em] uppercase transition-all shadow-sm"
              >
                <span>Connect With Sourcing Team</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
