import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="bg-white min-h-[70vh] flex items-center justify-center py-20 px-4">
      <div className="text-center max-w-md">
        <span className="text-xs font-mono font-bold tracking-widest text-brand-muted block mb-3">
          ERROR 404
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-[0.1em] uppercase text-brand-text font-editorial mb-4">
          PAGE NOT FOUND
        </h1>
        <p className="text-xs sm:text-sm text-brand-muted mb-8 leading-relaxed">
          The requested wholesale page does not exist or has been moved. Explore our catalog or return to the main hub.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 bg-brand-dark text-white text-xs font-bold tracking-widest uppercase rounded inline-flex items-center justify-center gap-2 hover:bg-black transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/winter"
            className="w-full sm:w-auto px-6 py-3 border border-brand-border text-brand-text text-xs font-bold tracking-widest uppercase rounded hover:bg-brand-surface inline-flex items-center justify-center gap-2 transition-colors"
          >
            <span>Winter Collection</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
