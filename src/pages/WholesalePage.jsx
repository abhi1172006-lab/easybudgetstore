import React from 'react';
import { ArrowUpRight, MessageCircle, FileText, CheckCircle2, ShieldCheck, Box, Send } from 'lucide-react';
import siteConfig from '../config/siteConfig';
import EnquiryForm from '../components/EnquiryForm';

export default function WholesalePage() {
  const processSteps = [
    {
      step: "01",
      title: "EXPLORE STYLES",
      desc: "Browse our collections across Men, Women, and Kids winterwear and everyday basics."
    },
    {
      step: "02",
      title: "REQUEST PRICING",
      desc: "Submit your requirement through our B2B form or connect on WhatsApp for current lot rates."
    },
    {
      step: "03",
      title: "CONFIRM ASSORTMENT",
      desc: "Align on color ratios, size sets (S to XXL), and batch requirements tailored to your retail shop."
    },
    {
      step: "04",
      title: "DISPATCH FROM DELHI",
      desc: "Direct coordination and dispatch from our Gandhi Nagar, Delhi wholesale base."
    }
  ];

  return (
    <div className="bg-white py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-ultra uppercase text-brand-muted block mb-3 font-editorial">
            B2B PURCHASING &amp; SUPPLY
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-[0.1em] uppercase text-brand-text font-editorial leading-tight">
            WHOLESALE SOURCING MADE SIMPLE.
          </h1>
          <p className="mt-4 text-base text-brand-muted leading-relaxed">
            Supplying clothing retailers, resellers, boutiques and online clothing entrepreneurs across India with dependable fashion inventory.
          </p>
          <div className="w-12 h-[2px] bg-brand-dark mx-auto mt-6" />
        </div>

        {/* 4-Step Wholesale Process */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-xs font-bold tracking-ultra uppercase text-brand-muted font-editorial">
              HOW SOURCING WORKS WITH EASYBUDGETSTORE
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="p-6 bg-brand-surface border border-brand-border rounded-lg flex flex-col justify-between"
              >
                <div>
                  <span className="text-sm font-mono font-bold tracking-wider text-brand-muted block mb-3">
                    {step.step}
                  </span>
                  <h3 className="text-xs font-bold tracking-[0.14em] uppercase text-brand-text mb-2 font-editorial">
                    {step.title}
                  </h3>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wholesale Form Box */}
        <div className="max-w-4xl mx-auto mb-20">
          <EnquiryForm />
        </div>

        {/* Wholesale FAQ Section (Genuine, No Fake Promises) */}
        <div className="max-w-4xl mx-auto border-t border-brand-border pt-16">
          <div className="text-center mb-10">
            <span className="text-xs font-bold tracking-ultra uppercase text-brand-muted block mb-1 font-editorial">
              CLARIFICATIONS
            </span>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-brand-text font-editorial">
              WHOLESALE BUYER FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-5 bg-brand-surface border border-brand-border rounded-lg">
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-text mb-1.5 font-editorial">
                Why are product prices not published directly on the website?
              </h4>
              <p className="text-xs text-brand-muted leading-relaxed">
                As a dedicated B2B supplier, our pricing depends on order volumes, seasonal market inputs in Gandhi Nagar, and packaging assortment sets. We quote directly to business owners to protect retail margins for our buyer network.
              </p>
            </div>

            <div className="p-5 bg-brand-surface border border-brand-border rounded-lg">
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-text mb-1.5 font-editorial">
                Can new businesses or boutique owners request sample pieces?
              </h4>
              <p className="text-xs text-brand-muted leading-relaxed">
                Yes. We understand the importance of examining fabric feel, stitching, and finish before placing larger seasonal stock orders. Connect directly on WhatsApp with our sourcing coordinator to discuss sample piece arrangements.
              </p>
            </div>

            <div className="p-5 bg-brand-surface border border-brand-border rounded-lg">
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-text mb-1.5 font-editorial">
                What categories are currently ready for wholesale dispatch?
              </h4>
              <p className="text-xs text-brand-muted leading-relaxed">
                We currently specialize in Men's T-Shirts, Sweatshirts, Hoodies, and Jackets, as well as dedicated winter jacket lines for Women and Kids.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
