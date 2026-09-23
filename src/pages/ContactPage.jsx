import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, ArrowUpRight } from 'lucide-react';
import siteConfig from '../config/siteConfig';
import EnquiryForm from '../components/EnquiryForm';

export default function ContactPage() {
  return (
    <div className="bg-white py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-ultra uppercase text-brand-muted block mb-3 font-editorial">
            GET IN TOUCH
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-[0.1em] uppercase text-brand-text font-editorial">
            CONTACT OUR WHOLESALE DESK
          </h1>
          <p className="mt-4 text-sm sm:text-base text-brand-muted">
            Have questions about product availability, wholesale lot sizes, or Delhi dispatch schedules? Connect with our team directly.
          </p>
          <div className="w-12 h-[2px] bg-brand-dark mx-auto mt-6" />
        </div>

        {/* Contact Info & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          
          {/* Contact Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 bg-brand-surface border border-brand-border rounded-lg">
              <div className="flex items-center gap-3 text-brand-text font-bold text-xs uppercase tracking-wider mb-2 font-editorial">
                <MapPin className="w-4 h-4 text-brand-dark" />
                <span>Wholesale Hub Location</span>
              </div>
              <p className="text-sm text-brand-muted pl-7 leading-relaxed">
                {siteConfig.fullAddress}
              </p>
              <span className="inline-block ml-7 mt-2 text-[10px] font-bold uppercase tracking-widest text-brand-muted bg-white px-2 py-0.5 rounded border border-brand-border">
                Delhi Garment Market
              </span>
            </div>

            <div className="p-6 bg-brand-surface border border-brand-border rounded-lg">
              <div className="flex items-center gap-3 text-brand-text font-bold text-xs uppercase tracking-wider mb-2 font-editorial">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Wholesale Support</span>
              </div>
              <p className="text-sm text-brand-muted pl-7 mb-3">
                {siteConfig.whatsappDisplay}
              </p>
              <a
                href={siteConfig.getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-7 inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-semibold tracking-wider uppercase transition-colors"
              >
                <span>Start Chat</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="p-6 bg-brand-surface border border-brand-border rounded-lg">
              <div className="flex items-center gap-3 text-brand-text font-bold text-xs uppercase tracking-wider mb-2 font-editorial">
                <Mail className="w-4 h-4 text-brand-dark" />
                <span>Email Enquiries</span>
              </div>
              <p className="text-sm text-brand-muted pl-7 mb-1">
                {siteConfig.email}
              </p>
              <p className="text-[11px] text-neutral-400 pl-7">
                Expect catalog reply within standard business hours.
              </p>
            </div>

            <div className="p-6 bg-brand-surface border border-brand-border rounded-lg">
              <div className="flex items-center gap-3 text-brand-text font-bold text-xs uppercase tracking-wider mb-2 font-editorial">
                <Clock className="w-4 h-4 text-brand-dark" />
                <span>Operating Schedule</span>
              </div>
              <p className="text-sm text-brand-muted pl-7">
                {siteConfig.businessHours}
              </p>
            </div>
          </div>

          {/* Map Embed (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-brand-border p-2 shadow-elevated">
            <div className="aspect-[16/11] w-full rounded-lg overflow-hidden bg-neutral-100">
              <iframe
                title="Gandhi Nagar Delhi Wholesale Hub Map"
                src={siteConfig.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>

        </div>

        {/* Wholesale Form */}
        <div className="max-w-4xl mx-auto border-t border-brand-border pt-16">
          <EnquiryForm />
        </div>

      </div>
    </div>
  );
}
