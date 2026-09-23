import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, ArrowUpRight } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';
import { useCms } from '../context/CmsContext';

export default function GandhiNagarSection() {
  const { openEnquiry } = useEnquiry();
  const { site, homepage } = useCms();
  const about = homepage?.about || {};

  return (
    <section className="py-20 sm:py-28 bg-brand-surface/70 border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* LEFT: Info & Details */}
          <div className="lg:col-span-6">
            <span className="text-xs font-bold tracking-ultra uppercase text-brand-muted block mb-2 font-editorial">
              WHOLESALE SOURCING HUB
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-[0.12em] uppercase text-brand-text mb-6 font-editorial">
              {about.heading || 'From Gandhi Nagar, Delhi'}
            </h2>
            <p className="text-sm sm:text-base text-brand-muted mb-8 leading-relaxed font-normal">
              {about.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-white rounded border border-brand-border">
                <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-brand-text mb-1">
                  <MapPin className="w-4 h-4 text-brand-dark flex-shrink-0" />
                  <span>Market Location</span>
                </div>
                <p className="text-xs text-brand-muted pl-6.5">
                  {site.fullAddress}
                </p>
              </div>

              <div className="p-4 bg-white rounded border border-brand-border">
                <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-brand-text mb-1">
                  <Clock className="w-4 h-4 text-brand-dark flex-shrink-0" />
                  <span>Market Schedule</span>
                </div>
                <p className="text-xs text-brand-muted pl-6.5">
                  {site.businessHours}
                </p>
              </div>

              <div className="p-4 bg-white rounded border border-brand-border">
                <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-brand-text mb-1">
                  <MessageCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>WhatsApp Enquiry</span>
                </div>
                <p className="text-xs text-brand-muted pl-6.5">
                  {site.whatsappDisplay}
                </p>
              </div>

              <div className="p-4 bg-white rounded border border-brand-border">
                <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-brand-text mb-1">
                  <Mail className="w-4 h-4 text-brand-dark flex-shrink-0" />
                  <span>Wholesale Email</span>
                </div>
                <p className="text-xs text-brand-muted pl-6.5">
                  {site.email}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => openEnquiry(null)}
                className="px-6 py-3 bg-brand-dark hover:bg-black text-white text-xs font-semibold tracking-[0.16em] uppercase rounded transition-colors shadow-sm inline-flex items-center gap-2"
              >
                <span>Wholesale Business Enquiry</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href={site.getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-brand-border hover:border-brand-dark text-brand-text text-xs font-semibold tracking-[0.16em] uppercase rounded transition-colors inline-flex items-center gap-2 hover:bg-white"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* RIGHT: Map Placeholder / Visual Sourcing Hub */}
          <div className="lg:col-span-6">
            <div className="relative rounded-lg overflow-hidden border border-brand-border bg-white shadow-elevated p-2">
              <div className="aspect-[4/3] w-full rounded overflow-hidden relative bg-neutral-100">
                <iframe
                  title="Gandhi Nagar Delhi Wholesale Market Hub"
                  src={site.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="p-4 flex items-center justify-between text-xs text-brand-muted">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Delhi Wholesale Trade Center</span>
                </div>
                <span className="font-semibold uppercase tracking-wider text-brand-text">
                  Gandhi Nagar, Delhi
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
