import React from 'react';
import { useCms } from '../context/CmsContext';
import { filterProducts } from '../lib/cms';
import CategoryCard from './CategoryCard';

export default function CategoryGrid() {
  const { categories, homepage, store } = useCms();
  const section = homepage?.categoriesSection || {};
  const counts = Object.fromEntries(
    categories.map((c) => [c.slug, filterProducts({ category: c.slug }, store).length])
  );

  return (
    <section className="py-16 sm:py-24 bg-white" id="collection-categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold tracking-ultra uppercase text-brand-muted block mb-2">Wholesale catalogue</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-[0.12em] uppercase font-editorial">
            {section.title || 'Shop the Collection'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-brand-muted">{section.subtitle}</p>
          <div className="w-12 h-[2px] bg-brand-dark mx-auto mt-5" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={{
                ...category,
                title: category.name,
                path: `/shop/${category.slug}`,
                countText: `${counts[category.slug] || 0} styles`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
