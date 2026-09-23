import React from 'react';
import { Store, MapPin, Layers, MessageSquare } from 'lucide-react';

export default function TrustStrip() {
  const trustItems = [
    {
      icon: Store,
      title: "WHOLESALE FOCUSED",
      desc: "Built for retailers and resellers"
    },
    {
      icon: MapPin,
      title: "GANDHI NAGAR, DELHI",
      desc: "Fashion wholesale hub"
    },
    {
      icon: Layers,
      title: "MULTIPLE CATEGORIES",
      desc: "Men • Women • Kids"
    },
    {
      icon: MessageSquare,
      title: "EASY BUSINESS ENQUIRY",
      desc: "Connect directly with our team"
    }
  ];

  return (
    <section className="border-y border-brand-border bg-brand-surface/70 py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center space-x-4 p-2 transition-transform hover:translate-x-1 duration-200"
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-full bg-white border border-brand-border flex items-center justify-center text-brand-dark shadow-subtle">
                  <Icon className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div>
                  <h3 className="text-xs font-bold tracking-[0.16em] uppercase text-brand-text">
                    {item.title}
                  </h3>
                  <p className="text-xs text-brand-muted mt-0.5 font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
