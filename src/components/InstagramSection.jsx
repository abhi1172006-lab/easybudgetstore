import React from 'react';
import { Instagram, ArrowUpRight } from 'lucide-react';
import siteConfig from '../config/siteConfig';
import { instagramTiles } from '../data/products';

export default function InstagramSection() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold tracking-ultra uppercase text-brand-muted block mb-2 font-editorial">
            SOCIAL DROPS &amp; UPDATES
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-[0.12em] uppercase text-brand-text font-editorial">
            FOLLOW THE LATEST DROPS
          </h2>
          <p className="mt-3 text-sm sm:text-base text-brand-muted font-normal">
            New styles, product videos and collection updates.
          </p>
        </div>

        {/* 6 Square Image Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {instagramTiles.map((tile) => (
            <a
              key={tile.id}
              href="https://www.instagram.com/easybudgetstore"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-lg overflow-hidden border border-brand-border bg-brand-surface block"
              aria-label={tile.caption}
            >
              <img
                src={tile.image}
                alt="EasyBudgetStore Latest Drop"
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 text-center text-white">
                <Instagram className="w-5 h-5 mb-2 text-white" />
                <p className="text-[11px] leading-tight line-clamp-3 text-neutral-200">
                  {tile.caption}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center">
          <a
            href="https://www.instagram.com/easybudgetstore"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-brand-border hover:border-brand-dark text-brand-text text-xs font-semibold tracking-[0.16em] uppercase rounded transition-all hover:bg-brand-surface"
          >
            <Instagram className="w-4 h-4 text-brand-dark" />
            <span>FOLLOW @EASYBUDGETSTORE</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
