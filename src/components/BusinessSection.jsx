import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BusinessSection() {
  const cards = [
    {
      num: "01",
      title: "WHOLESALE FOCUSED",
      desc: "Products presented for business buyers."
    },
    {
      num: "02",
      title: "TREND-LED COLLECTION",
      desc: "Modern styles suitable for today's customers."
    },
    {
      num: "03",
      title: "MULTIPLE CUSTOMER SEGMENTS",
      desc: "Men, women and kids collections."
    },
    {
      num: "04",
      title: "DIRECT ENQUIRY",
      desc: "Connect with the EasyBudgetStore team for product and order details."
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-brand-surface/60 border-y border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14 sm:mb-16">
          <span className="text-xs font-bold tracking-ultra uppercase text-brand-muted block mb-3 font-editorial">
            FOR RETAILERS &amp; RESELLERS
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-[0.12em] uppercase text-brand-text leading-tight font-editorial">
            BUILT FOR PEOPLE WHO SELL FASHION.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-brand-muted leading-relaxed font-normal">
            EasyBudgetStore brings together everyday fashion and winter essentials for retailers, resellers, boutiques and online sellers looking for commercially relevant products at wholesale-focused pricing.
          </p>
        </div>

        {/* Four Value Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div
              key={card.num}
              className="bg-white border border-brand-border rounded-lg p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-subtle hover:border-neutral-400"
            >
              <div>
                <span className="text-xs font-mono font-bold tracking-widest text-brand-muted block mb-4">
                  {card.num}
                </span>
                <h3 className="text-sm font-bold tracking-[0.14em] uppercase text-brand-text mb-2 font-editorial">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                  {card.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-brand-border/60">
                <Link
                  to="/wholesale"
                  className="inline-flex items-center text-[11px] font-semibold uppercase tracking-wider text-brand-dark hover:text-black group"
                >
                  <span>Learn More</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
