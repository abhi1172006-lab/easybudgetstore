import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CategoryCard({ category }) {
  return (
    <Link
      to={category.path}
      className="group block relative bg-white border border-brand-border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-elevated hover:border-neutral-400"
    >
      {/* Image Container with smooth zoom */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-brand-surface">
        <img
          src={category.image}
          alt={category.title}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-102"
        />
        {/* Subtle gradient overlay at the bottom for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-60 group-hover:opacity-75 transition-opacity" />
        
        {/* Category Information inside card */}
        <div className="absolute bottom-0 inset-x-0 p-5 text-white flex flex-col justify-end">
          <span className="text-[10px] tracking-ultra uppercase text-neutral-300 font-semibold mb-1">
            {category.countText}
          </span>
          <h3 className="text-base sm:text-lg font-bold tracking-[0.14em] uppercase text-white font-editorial">
            {category.title}
          </h3>
          <div className="mt-3 flex items-center text-xs font-semibold tracking-widest uppercase text-white/90 group-hover:text-white transition-colors">
            <span>View Collection</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
