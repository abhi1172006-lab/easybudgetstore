import React from 'react';
import { Link } from 'react-router-dom';
import { PackageSearch } from 'lucide-react';

export default function EmptyState({ title, message, actionTo, actionLabel }) {
  return (
    <div className="text-center py-16 px-6 border border-dashed border-brand-border rounded-xl bg-brand-surface/50">
      <PackageSearch className="w-10 h-10 mx-auto text-brand-muted mb-4" />
      <h3 className="text-sm font-bold uppercase tracking-widest text-brand-text mb-2">{title}</h3>
      <p className="text-sm text-brand-muted max-w-md mx-auto mb-6">{message}</p>
      {actionTo && actionLabel && (
        <Link
          to={actionTo}
          className="inline-flex items-center px-5 py-2.5 bg-brand-dark text-white text-xs font-semibold uppercase tracking-wider rounded-md"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

export function SkeletonGrid({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="border border-brand-border rounded-lg overflow-hidden animate-pulse">
          <div className="aspect-[3/4] bg-brand-surface" />
          <div className="p-4 space-y-2">
            <div className="h-3 bg-brand-surface rounded w-1/3" />
            <div className="h-4 bg-brand-surface rounded w-2/3" />
            <div className="h-8 bg-brand-surface rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
